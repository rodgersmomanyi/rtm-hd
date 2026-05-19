"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { experience } from "@/lib/experience";

export function Experience() {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      aria-label="Experience timeline"
      className="py-24 md:py-36 section-dark"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="eyebrow text-brand-orange block mb-4">Experience</span>
          <h2
            className="display-h2 text-off-white"
            style={{ maxWidth: "14ch" }}
          >
            A decade of<br />
            <span className="text-brand-orange">infrastructure at scale.</span>
          </h2>
        </motion.div>

        {/* Timeline — center line on desktop */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-off-white/10 -translate-x-px" />

          <div className="space-y-8">
            {experience.map((entry, i) => (
              <TimelineItem key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
