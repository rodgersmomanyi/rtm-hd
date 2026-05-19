"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";

function LocalClock({ timezone, label }: { timezone: string; label: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <div className="text-center">
      <div className="eyebrow text-off-white/40 mb-1">{label}</div>
      <div
        className="font-mono font-bold text-off-white tabular-nums"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)" }}
      >
        {time || "--:--:--"}
      </div>
    </div>
  );
}

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@RTM-HD",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    highlight: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rodgers-momanyi-40033866/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/RTM-HD", // TODO: verify handle
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/RTM_HD", // TODO: verify handle
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/rtm.hd", // TODO: verify handle
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:rodgers.momanyi@outlook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const footerMarqueeItems = [
  "AVAILABLE FOR COLLABORATIONS",
  "CURRENTLY IN NAIROBI",
  "INCOMING NOOGLER",
  "GOOGLE HAMINA · FINLAND 2026",
  "NETWORK ENGINEERING",
  "OPEN SOURCE ADVOCATE",
];

export function Footer() {
  return (
    <footer className="section-dark pt-20 pb-8" aria-label="Site footer">
      {/* Footer marquee strip */}
      <div className="mb-16 border-t border-b border-off-white/10 py-4">
        <Marquee
          items={footerMarqueeItems}
          className="py-1"
          itemClassName="eyebrow text-off-white/50 hover:text-off-white transition-colors"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Giant logotype */}
          <div className="md:col-span-2">
            <div
              className="font-display font-black text-brand-orange"
              style={{
                fontSize: "clamp(4rem, 14vw, 12rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
              }}
            >
              RTM-HD
            </div>
            <p
              className="text-off-white/50 mt-4 max-w-sm"
              style={{ fontSize: "0.95rem", lineHeight: 1.6 }}
            >
              Senior Network Engineer. Incoming Noogler.
              Building resilient networks from Nairobi to the world.
            </p>
          </div>

          {/* Clocks */}
          <div className="flex flex-col justify-end gap-2">
            <p className="eyebrow text-off-white/30 mb-2">LOCAL TIME</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <LocalClock timezone="Africa/Nairobi" label="NAIROBI" />
              <LocalClock timezone="Europe/Helsinki" label="HAMINA" />
              <LocalClock timezone="Asia/Shanghai" label="HANGZHOU" />
              <LocalClock timezone="Australia/Melbourne" label="MELBOURNE" />
            </div>
          </div>
        </div>

        {/* Social icons row */}
        <div className="flex flex-wrap gap-4 items-center mb-12">
          {socials.map((s) => (
            <MagneticButton key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={s.label}
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
                  s.highlight
                    ? "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white scale-110"
                    : "border-off-white/20 text-off-white/50 hover:border-brand-orange hover:text-brand-orange"
                }`}
              >
                {s.icon}
              </a>
            </MagneticButton>
          ))}

          <a
            href="https://www.youtube.com/@RTM-HD"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow text-brand-orange hover:underline underline-offset-4 ml-2"
          >
            RTM-HD CHANNEL ↗
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-off-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="eyebrow text-off-white/30">
            Built in Nairobi · Heading to Hamina · © 2026 Rodgers T. Momanyi
          </p>
          <div className="flex gap-6">
            <a href="/blog" className="eyebrow text-off-white/30 hover:text-off-white/70 transition-colors">
              Blog
            </a>
            <a href="#about" className="eyebrow text-off-white/30 hover:text-off-white/70 transition-colors">
              About
            </a>
            <a href="#contact" className="eyebrow text-off-white/30 hover:text-off-white/70 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
