"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-[var(--border)]"
      role="progressbar"
      aria-label="Reading progress"
    >
      <div
        ref={barRef}
        className="h-full bg-brand-orange transition-none"
        style={{ width: "0%" }}
      />
    </div>
  );
}
