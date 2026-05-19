"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ExperienceEntry } from "@/lib/experience";

interface TimelineItemProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative grid md:grid-cols-2 gap-0 md:gap-8 mb-12 md:mb-0`}
    >
      {/* Desktop: left / right layout */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, rotate: isLeft ? -1.5 : 1.5 }}
        animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{ gridColumn: isLeft ? 1 : 2 }}
        className={`glass-dark rounded-2xl p-6 md:p-8 transition-all duration-300 hover:glass-dark-hover hover:scale-[1.01] ${
          entry.isFuture ? "border-brand-orange/30 bg-brand-orange/5" : ""
        }`}
      >
        {entry.isFuture && (
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange" />
            </span>
            <span className="eyebrow text-brand-orange">FUTURE</span>
          </div>
        )}

        <div className="eyebrow text-brand-orange mb-2">{entry.period}</div>
        <h3
          className="font-display font-bold text-[var(--fg)] mb-1"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", letterSpacing: "-0.02em" }}
        >
          {entry.role}
        </h3>
        <div className="eyebrow text-[var(--fg)] opacity-60 mb-1">{entry.company}</div>
        <div className="eyebrow text-[var(--fg)] opacity-40 mb-5">{entry.location}</div>

        <ul className="space-y-2">
          {entry.bullets.map((b, i) => (
            <li
              key={i}
              className="text-[var(--fg)] opacity-75 flex gap-3"
              style={{ fontSize: "0.9rem", lineHeight: 1.55 }}
            >
              <span className="text-brand-orange mt-0.5 shrink-0">▸</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-off-white opacity-60 hover:opacity-100 hover:border-brand-orange hover:text-brand-orange transition-all duration-200"
              style={{ fontSize: "0.7rem", letterSpacing: "0.06em", fontWeight: 700 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Spacer for desktop alternation */}
      {isLeft && <div className="hidden md:block" />}
    </div>
  );
}
