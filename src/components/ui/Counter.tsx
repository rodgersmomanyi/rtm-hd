"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-black text-brand-orange tabular-nums"
        style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
      >
        {prefix}{count}{suffix}
      </div>
      <div className="eyebrow text-[var(--fg)] opacity-60 mt-3">{label}</div>
    </div>
  );
}
