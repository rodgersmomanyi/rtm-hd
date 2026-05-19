"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-27T00:00:00+03:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return <div className="h-16" />;
  }

  if (timeLeft.days <= 0 && timeLeft.hours <= 0) {
    return (
      <div className="eyebrow text-brand-orange">
        NOOGLER JOURNEY HAS BEGUN 🚀
      </div>
    );
  }

  const parts = [
    { value: pad(timeLeft.days), label: "DAYS" },
    { value: pad(timeLeft.hours), label: "HRS" },
    { value: pad(timeLeft.minutes), label: "MIN" },
  ];

  return (
    <div className="flex items-end gap-2 md:gap-3">
      {parts.map((part, i) => (
        <div key={part.label} className="flex items-end gap-2 md:gap-3">
          <div className="text-center">
            <div
              className="font-display font-black text-brand-orange tabular-nums"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
            >
              {part.value}
            </div>
            <div className="eyebrow opacity-50 mt-1">{part.label}</div>
          </div>
          {i < parts.length - 1 && (
            <span
              className="text-brand-orange font-black mb-1"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
