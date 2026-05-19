"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { certs, skills } from "@/lib/certs";

export function Skills() {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-80px" });

  const certLabels = certs.map((c) => `${c.name} — ${c.issuer} ${c.year}`);

  return (
    <section
      id="skills"
      aria-label="Certifications and skills"
      className="py-24 md:py-36 bg-[var(--bg)] overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <span className="eyebrow text-brand-orange block mb-4">Certifications &amp; Skills</span>
          <h2 className="display-h2 text-[var(--fg)]">
            Certified across<br />
            <span className="text-brand-orange">four vendors.</span>
          </h2>
        </motion.div>
      </div>

      {/* Cert marquees — full-bleed */}
      <div className="space-y-4 mb-16">
        <Marquee
          items={certLabels}
          className="py-3"
          itemClassName="font-display font-bold text-[var(--fg)] opacity-70 hover:opacity-100 transition-opacity"
        />
        <Marquee
          items={certLabels}
          reverse
          className="py-3"
          itemClassName="font-display font-bold text-[var(--fg)] opacity-40 hover:opacity-80 transition-opacity"
        />
      </div>

      {/* Skill tag cloud */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.025 }}
              whileHover={{ y: -3, color: "#FF6A1A" }}
              className="px-4 py-2 rounded-full border border-[var(--border)] font-display font-bold text-[var(--fg)] hover:border-brand-orange transition-all duration-200"
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)", letterSpacing: "0.04em" }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
