"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function IntroOverlay() {
  const [show, setShow] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Use sessionStorage flag — React state only, no localStorage
    const hasPlayed =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("intro-played");

    if (hasPlayed || prefersReducedMotion) {
      setShow(false);
      return;
    }

    const overlay = overlayRef.current;
    const letters = lettersRef.current;
    if (!overlay || !letters) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false);
        sessionStorage.setItem("intro-played", "1");
      },
    });

    const letterEls = letters.querySelectorAll<HTMLSpanElement>(".intro-letter");

    // Stagger letters in
    tl.fromTo(
      letterEls,
      { y: (i) => (i % 2 === 0 ? -80 : 80), opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
      }
    )
      .to(letterEls, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.in",
        delay: 0.5,
      })
      .to(
        overlay,
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.1"
      );
  }, []);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      id="intro-overlay"
    >
      <div ref={lettersRef} className="flex items-center gap-1 md:gap-2">
        {"RTM-HD".split("").map((char, i) => (
          <span
            key={i}
            className="intro-letter inline-block font-display font-black text-off-white opacity-0"
            style={{
              fontSize: "clamp(3rem, 10vw, 9rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
