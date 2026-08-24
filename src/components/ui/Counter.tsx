"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Runs before paint on the client so the reset to 0 never flashes the real value,
// and falls back to useEffect on the server where layout effects are a no-op.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  // Start at the real value so the server-rendered HTML carries the true number —
  // crawlers and no-JS visitors must never see "0 Engineers Led". The client drops
  // it to 0 on mount and animates back up.
  const [count, setCount] = useState(value);

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    if (!isInView) {
      setCount(0);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
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
