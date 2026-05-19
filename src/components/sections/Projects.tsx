"use client";

import { useRef } from "react";
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
