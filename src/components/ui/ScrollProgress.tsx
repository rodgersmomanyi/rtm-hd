"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      transformOrigin: "left",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });

    // Init at 0
    gsap.set(bar, { scaleX: 0 });
  }, []);

  return <div id="scroll-progress" />;
}
