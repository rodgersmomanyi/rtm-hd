"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Day one at Google — Hamina. Before this the clock counts down; after it, up. */
const START = new Date("2026-07-27T00:00:00+03:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Flips the digit in place when the value changes */
function TickDigit({ value, large }: { value: string; large?: boolean }) {
  return (
    <div
      className="relative overflow-hidden tabular-nums font-display font-black text-brand-orange"
      style={{
        fontSize: large
          ? "clamp(2rem, 5vw, 3.5rem)"
          : "clamp(1.4rem, 3.5vw, 2.6rem)",
        lineHeight: 1,
        letterSpacing: "-0.04em",
        minWidth: large ? "2.4ch" : "2ch",
        textAlign: "center",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "-60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "60%", opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState<{
    mode: "until" | "since";
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = START - Date.now();
      const mode = diff > 0 ? "until" : "since";
      const ms = Math.abs(diff);
      const days    = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);
      setTimeLeft({ mode, days, hours, minutes, seconds });
    };

    // Only tick while the tab is visible. Backgrounded tabs stall rAF, so the
    // digit flip's exit animations never complete and the discarded spans pile
    // up — one per second — until the tab is focused again.
    let id: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      if (id === undefined) id = setInterval(calc, 1000);
    };
    const stop = () => {
      if (id !== undefined) {
        clearInterval(id);
        id = undefined;
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        calc();
        start();
      }
    };

    calc();
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!timeLeft) {
    return <div className="h-16" />;
  }

  const Colon = ({ dim }: { dim?: boolean }) => (
    <span
      className={`font-black text-brand-orange self-end mb-0.5 select-none ${dim ? "opacity-40" : ""}`}
      style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
      aria-hidden="true"
    >
      :
    </span>
  );

  return (
    <div>
      <div className="eyebrow text-brand-orange mb-2">
        {timeLeft.mode === "since"
          ? "TIME AT GOOGLE HAMINA 🚀"
          : "COUNTDOWN TO DAY ONE"}
      </div>
      <div className="flex items-end gap-1.5 md:gap-2">
      {/* Days */}
      <div className="text-center">
        <TickDigit value={pad(timeLeft.days)} large />
        <div className="eyebrow opacity-50 mt-1">DAYS</div>
      </div>

      <Colon />

      {/* Hours */}
      <div className="text-center">
        <TickDigit value={pad(timeLeft.hours)} large />
        <div className="eyebrow opacity-50 mt-1">HRS</div>
      </div>

      <Colon />

      {/* Minutes */}
      <div className="text-center">
        <TickDigit value={pad(timeLeft.minutes)} large />
        <div className="eyebrow opacity-50 mt-1">MIN</div>
      </div>

      <Colon dim />

      {/* Seconds — slightly smaller to give hierarchy */}
      <div className="text-center">
        <TickDigit value={pad(timeLeft.seconds)} />
        <div className="eyebrow opacity-50 mt-1">SEC</div>
      </div>
      </div>
    </div>
  );
}
