"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Counter } from "@/components/ui/Counter";

const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 19, suffix: "", label: "Engineers Led" },
  { value: 99, suffix: ".99%", label: "Uptime Delivered" },
  { value: 100, suffix: "K+", label: "Customers Connected" },
  { value: 45, suffix: "+", label: "Network Nodes Deployed" },
  { value: 300, suffix: "G", label: "BGP Traffic Optimised" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Rodgers"
      className="py-24 md:py-36 bg-[var(--bg)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-16"
        >
          <span className="eyebrow text-brand-orange">About</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden group"
          >
            {/* Placeholder — shown when image absent or errors */}
            <div className="absolute inset-0 bg-brand-blue flex items-center justify-center">
              <span
                className="font-display font-black text-off-white opacity-20 select-none"
                style={{ fontSize: "clamp(5rem, 18vw, 14rem)", letterSpacing: "-0.04em" }}
              >
                RTM
              </span>
            </div>

            {/* Actual portrait */}
            {!imgError && (
              <Image
                src="/rodgers.jpg"
                alt="Rodgers T. Momanyi — Senior Network Engineer, Incoming Google Noogler"
                fill
                className="object-cover object-top z-10 group-hover:scale-[1.03] transition-transform duration-700"
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}

            {/* Subtle gradient overlay at bottom so badge stays readable */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-blue-deep/80 to-transparent z-20 pointer-events-none" />

            {/* Floating Noogler badge */}
            <div className="absolute bottom-5 left-5 right-5 bg-brand-blue-deep/90 backdrop-blur-md rounded-xl p-4 z-30 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🎓</span>
                <div className="eyebrow text-brand-orange">Incoming Noogler</div>
              </div>
              <div className="font-display font-bold text-off-white" style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
                Google · Hamina Data Center · Finland 🇫🇮
              </div>
              <div className="eyebrow text-off-white opacity-50 mt-1">Data Center Technician III · July 2026</div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="display-h2 text-[var(--fg)] mb-8">
              Building Networks.<br />
              <span className="text-brand-orange">Leading Teams.</span>
            </h2>

            <div className="space-y-5 text-[var(--fg)]" style={{ fontSize: "1.05rem", lineHeight: 1.65, opacity: 0.85 }}>
              <p>
                Strategic Network Core Systems &amp; Solutions Manager with 8+ years delivering
                resilient ISP, enterprise, and cloud networks. I lead a 19-member multidisciplinary
                team across Network Engineering, Cybersecurity, Systems, Development, and Data —
                driving 99.99% service availability, infrastructure scalability, and secure service
                delivery.
              </p>
              <p>
                I blend deep technical expertise with senior leadership, SLA ownership, automation,
                and vendor management — overseeing core IP, transmission, OSS/BSS, and
                cloud-integrated platforms. Certified across Juniper, Huawei, Azure, and Google
                technologies, I focus on building high-performing teams and future-ready networks
                that power SaaS and SECaaS solutions.
              </p>
              <p>
                In July 2026 I&apos;m joining Google as a Data Center Technician III at the LPP Hamina
                Data Center in Finland — bringing African ISP-scale operations experience into
                hyperscale infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://www.linkedin.com/in/rodgers-momanyi-40033866"
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow text-brand-orange hover:underline transition-all underline-offset-4"
              >
                LINKEDIN ↗
              </a>
              <a
                href="#contact"
                className="eyebrow text-[var(--fg)] opacity-60 hover:opacity-100 hover:text-brand-orange transition-all"
              >
                GET IN TOUCH →
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow text-[var(--fg)] opacity-40 hover:opacity-100 transition-opacity"
              >
                DOWNLOAD RESUME ↗
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stat counters */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 border-t border-[var(--border)] pt-12">
          {stats.map((stat) => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
