"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BlobMesh({ mouseX, mouseY }: { mouseX: React.MutableRefObject<number>; mouseY: React.MutableRefObject<number> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);

  const { vertexShader, fragmentShader } = useMemo(() => ({
    vertexShader: `
      uniform float u_time;
      uniform vec2 u_mouse;
      varying vec2 vUv;
      varying vec3 vNormal;

      // Simplex-like noise helpers
      vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
      vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
      vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.853133978309897*r;}
      float snoise(vec3 v){
        const vec2 C=vec2(1./6.,1./3.);
        const vec4 D=vec4(0.,.5,1.,2.);
        vec3 i=floor(v+dot(v,C.yyy));
        vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz);
        vec3 l=1.-g;
        vec3 i1=min(g.xyz,l.zxy);
        vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx;
        vec3 x2=x0-i2+C.yyy;
        vec3 x3=x0-D.yyy;
        i=mod289(i);
        vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
        float n_=.142857142857;
        vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z);
        vec4 y_=floor(j-7.*x_);
        vec4 x=x_*ns.x+ns.yyyy;
        vec4 y=y_*ns.x+ns.yyyy;
        vec4 h=1.-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy);
        vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.+1.;
        vec4 s1=floor(b1)*2.+1.;
        vec4 sh=-step(h,vec4(0.));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
        vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x);
        vec3 p1=vec3(a0.zw,h.y);
        vec3 p2=vec3(a1.xy,h.z);
        vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
        vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
        m=m*m;
        return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }

      void main(){
        vUv=uv;
        vec3 pos=position;
        float noise=snoise(pos*1.4+u_time*0.35+vec3(u_mouse*0.3,0.));
        pos+=normal*(noise*0.32);
        vNormal=normalize(normalMatrix*normal);
        gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
      }
    `,
    fragmentShader: `
      uniform float u_time;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main(){
        vec3 blue=vec3(0.039,0.302,1.0);
        vec3 orange=vec3(1.0,0.416,0.102);
        float t=smoothstep(-0.3,1.1,vUv.y+sin(u_time*0.5)*0.15);
        vec3 col=mix(blue,orange,t);
        float rim=1.-max(dot(vNormal,vec3(0.,0.,1.)),0.);
        col+=rim*0.18*orange;
        gl_FragColor=vec4(col,0.82);
      }
    `,
  }), []);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uniforms.u_time.value = clock.getElapsedTime();
      mat.current.uniforms.u_mouse.value.set(mouseX.current, mouseY.current);
    }
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.08;
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.15) * 0.05;
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.4, 6]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function HeroBlob() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.current = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY.current = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#FF6A1A" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#0A4DFF" />
        <BlobMesh mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
}
