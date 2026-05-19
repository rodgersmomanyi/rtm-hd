"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountdownClock } from "@/components/ui/CountdownClock";
import { ChevronDown } from "lucide-react";

const HeroBlob = dynamic(
  () => import("@/components/three/HeroBlob").then((m) => m.HeroBlob),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const LINES = [["RODGERS", "T."], ["MOMANYI"]];

export function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const countdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const spans =
      headlineRef.current?.querySelectorAll<HTMLSpanElement>(".hero-word");
    if (!spans?.length) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      spans,
      { y: (i) => (i % 2 === 0 ? "110%" : "-110%"), opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
      }
    )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        countdownRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
  }, []);

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[var(--bg)] pt-24 pb-16"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* R3F Blob — top-right corner */}
      <div className="absolute top-0 right-0 w-[min(55vw,600px)] h-[min(55vw,600px)] pointer-events-none opacity-90">
        <HeroBlob />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-10">
        {/* Eyebrow */}
        <div ref={subRef} className="opacity-0 mb-6 md:mb-8">
          <span className="eyebrow text-brand-orange">
            NETWORK ENGINEER · OPTICAL INFRASTRUCTURE · CYBERSECURITY
          </span>
        </div>

        {/* Giant headline */}
        <div ref={headlineRef} className="mb-8">
          {LINES.map((words, li) => (
            <div key={li} className="overflow-hidden">
              <div className="flex flex-wrap gap-x-[0.15em]">
                {words.map((word, wi) => (
                  <span
                    key={wi}
                    className="hero-word inline-block opacity-0 font-display font-black text-[var(--fg)]"
                    style={{
                      fontSize: "clamp(3.2rem, 11.5vw, 13rem)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* RTM-HD accent */}
          <div className="overflow-hidden mt-2">
            <span
              className="hero-word inline-block opacity-0 font-display font-black"
              style={{
                fontSize: "clamp(2rem, 6vw, 7rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#FF6A1A",
                WebkitTextStroke: "1px #FF6A1A",
              }}
            >
              RTM-HD
            </span>
          </div>
        </div>

        {/* Google countdown */}
        <div ref={countdownRef} className="opacity-0 mb-10">
          <div className="inline-flex items-center gap-5 border border-[var(--border)] rounded-2xl px-5 py-4 backdrop-blur-sm">
            {/* Noogler portrait avatar */}
            <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-brand-orange/40">
              {/* Fallback initials */}
              <div className="absolute inset-0 bg-brand-blue flex items-center justify-center">
                <span className="font-display font-black text-off-white text-xl">RT</span>
              </div>
              {!imgError && (
                <Image
                  src="/rodgers.jpg"
                  alt="Rodgers — Incoming Noogler"
                  fill
                  className="object-cover object-top z-10"
                  onError={() => setImgError(true)}
                  sizes="80px"
                  priority
                />
              )}
            </div>

            <div>
              <div className="eyebrow text-brand-orange mb-2">
                INCOMING NOOGLER — DATA CENTER TECHNICIAN III
              </div>
              <div className="eyebrow text-[var(--fg)] opacity-60 mb-4">
                GOOGLE LPP · HAMINA DATA CENTER FSA1 · HAMINA, FINLAND 🇫🇮
              </div>
              <CountdownClock />
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4">
          <MagneticButton>
            <a
              href="#projects"
              data-cursor-arrow
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-display font-bold px-7 py-3.5 rounded-full hover:bg-brand-orange/90 transition-colors duration-200"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              View My Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              data-cursor-arrow
              className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--fg)] font-display font-bold px-7 py-3.5 rounded-full hover:border-brand-blue hover:text-brand-blue transition-colors duration-200"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              Get in Touch
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--fg)] font-display font-bold px-5 py-3.5 opacity-60 hover:opacity-100 transition-opacity duration-200"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              Download CV ↗
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://www.linkedin.com/in/rodgers-momanyi-40033866"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--fg)] font-display font-bold px-5 py-3.5 opacity-60 hover:opacity-100 hover:text-brand-blue transition-all duration-200"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              LinkedIn ↗
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="eyebrow" style={{ fontSize: "0.65rem" }}>SCROLL</span>
        <ChevronDown
          size={20}
          className="animate-bounce"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
