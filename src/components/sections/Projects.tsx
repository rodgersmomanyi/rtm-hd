"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";

export function Projects() {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="py-24 md:py-36 bg-[var(--bg)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="eyebrow text-brand-orange block mb-4">Featured Work</span>
            <h2 className="display-h2 text-[var(--fg)]">
              Projects that<br />
              <span className="text-brand-orange">matter at scale.</span>
            </h2>
          </div>
          <p
            className="text-[var(--fg)] opacity-60 max-w-sm"
            style={{ fontSize: "1rem", lineHeight: 1.6 }}
          >
            Real infrastructure deployments across Kenya — from smart-grid backbones to
            national ISP cores.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Side project — Sandglass */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-12"
        >
          <Link
            href="/sandglass"
            data-cursor-arrow
            className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-[var(--border)] rounded-2xl p-7 md:p-8 hover:border-brand-orange transition-colors duration-300"
          >
            <div>
              <span className="eyebrow text-brand-orange block mb-2">
                Side Project · Android + Chrome
              </span>
              <h3
                className="font-display font-bold text-[var(--fg)] group-hover:text-brand-orange transition-colors mb-1"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", letterSpacing: "-0.02em" }}
              >
                Sandglass
              </h3>
              <p
                className="text-[var(--fg)] opacity-60"
                style={{ fontSize: "0.95rem", lineHeight: 1.6 }}
              >
                A calendar-driven hourglass — your next event as live falling sand.
              </p>
            </div>
            <span className="eyebrow text-[var(--fg)] opacity-40 group-hover:text-brand-orange group-hover:opacity-100 transition-all shrink-0">
              GET THE APP →
            </span>
          </Link>
        </motion.div>

        {/* PeeringDB reference */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.peeringdb.com/org/33486"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow text-[var(--fg)] opacity-40 hover:opacity-80 hover:text-brand-orange transition-all duration-200"
          >
            VIEW VILCOM ON PEERINGDB ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
