"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticButton } from "@/components/ui/MagneticButton";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "YouTube", href: "#youtube" },
  { label: "Podcasts", href: "#podcasts" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]"
          : "py-6"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 flex items-center justify-between">
        {/* Logo */}
        <MagneticButton>
          <a
            href="/"
            className="font-display font-black text-brand-orange tracking-tight"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", letterSpacing: "-0.04em" }}
          >
            RTM-HD
          </a>
        </MagneticButton>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((link) => (
            <MagneticButton key={link.href}>
              <a
                href={link.href}
                className="eyebrow text-[var(--fg)] hover:text-brand-orange transition-colors duration-200"
              >
                {link.label}
              </a>
            </MagneticButton>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-6 h-0.5 bg-[var(--fg)] origin-center"
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-[var(--fg)]"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-[var(--fg)] origin-center"
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[var(--bg)] border-t border-[var(--border)]"
          >
            <nav className="px-6 py-6 flex flex-col gap-5" aria-label="Mobile navigation">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="eyebrow text-[var(--fg)] hover:text-brand-orange transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
