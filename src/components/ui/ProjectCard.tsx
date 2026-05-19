"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen(true)}
        data-cursor-arrow
        className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
        style={{ backgroundColor: project.color }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-brand-orange/90 flex flex-col justify-end p-6 md:p-8"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <div className="eyebrow text-white/70 mb-2">{project.year}</div>
          <h3
            className="font-display font-bold text-white mb-2"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>
          <p className="text-white/80" style={{ fontSize: "0.85rem", lineHeight: 1.55 }}>
            {project.result}
          </p>
          <div className="mt-3 flex items-center gap-1 text-white eyebrow">
            VIEW CASE STUDY <ExternalLink size={12} className="ml-1" />
          </div>
        </motion.div>

        {/* Default state */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 group-hover:opacity-0 transition-opacity duration-25">
          <div className="eyebrow text-white/50 mb-2">{project.client} · {project.year}</div>
          <h3
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/20 rounded text-white"
                style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-ink/80 backdrop-blur-sm flex items-end md:items-center justify-center p-4 md:p-8"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--bg)] rounded-3xl p-8 md:p-10 max-w-2xl w-full max-h-[85dvh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="eyebrow text-brand-orange mb-2">
                    {project.client} · {project.year}
                  </div>
                  <h2
                    className="font-display font-black text-[var(--fg)]"
                    style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", letterSpacing: "-0.03em" }}
                  >
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full border border-[var(--border)] hover:border-brand-orange transition-colors ml-4 shrink-0"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <p
                className="text-[var(--fg)] opacity-80 mb-6"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                {project.description}
              </p>

              <div className="bg-brand-orange/10 rounded-xl p-4 mb-6">
                <div className="eyebrow text-brand-orange mb-2">Key Result</div>
                <div
                  className="font-display font-bold text-[var(--fg)]"
                  style={{ fontSize: "1rem" }}
                >
                  {project.result}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--fg)] opacity-70"
                    style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 eyebrow text-brand-orange hover:underline underline-offset-4"
                >
                  CLIENT WEBSITE <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
