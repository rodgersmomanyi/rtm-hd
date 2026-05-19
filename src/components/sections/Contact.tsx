"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setFormState("error");
      } else {
        setFormState("success");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputClass =
    "w-full glass rounded-xl px-5 py-3.5 text-[var(--fg)] placeholder:text-[var(--fg)]/40 focus:outline-none focus:border-brand-orange focus:bg-[var(--glass-bg-hover)] transition-all duration-200";

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 md:py-36 bg-[var(--bg)] relative overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="orb w-[500px] h-[500px] bg-brand-orange -top-20 -right-32 opacity-15 dark:opacity-20" />
      <div className="orb w-[400px] h-[400px] bg-brand-blue bottom-0 left-0 opacity-10 dark:opacity-15" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow text-brand-orange block mb-4">Contact</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-display font-black text-[var(--fg)] mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              LET&apos;S<br />
              <span className="text-brand-orange">TALK.</span>
            </h2>

            <div className="space-y-6 mb-10">
              <a
                href="mailto:rodgers.momanyi@outlook.com"
                className="flex items-center gap-4 group glass rounded-2xl p-4 hover:glass-hover transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full glass-orange flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={18} className="text-brand-orange" />
                </div>
                <div>
                  <div className="eyebrow text-[var(--fg)] opacity-40 mb-0.5">Email</div>
                  <div
                    className="font-display font-bold text-[var(--fg)] group-hover:text-brand-orange transition-colors"
                    style={{ fontSize: "1rem" }}
                  >
                    rodgers.momanyi@outlook.com
                  </div>
                </div>
              </a>

<div className="flex items-center gap-4 glass rounded-2xl p-4">
                <div className="w-10 h-10 rounded-full glass-orange flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-brand-orange" />
                </div>
                <div>
                  <div className="eyebrow text-[var(--fg)] opacity-40 mb-0.5">Location</div>
                  <div
                    className="font-display font-bold text-[var(--fg)]"
                    style={{ fontSize: "1rem" }}
                  >
                    Nairobi, Kenya → Hamina, Finland
                  </div>
                  <div className="eyebrow text-[var(--fg)] opacity-40">July 2026</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/rodgers-momanyi-40033866/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow text-[var(--fg)] opacity-50 hover:opacity-100 hover:text-brand-orange transition-all"
                >
                  LINKEDIN ↗
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://www.youtube.com/@RTM-HD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow text-[var(--fg)] opacity-50 hover:opacity-100 hover:text-brand-orange transition-all"
                >
                  YOUTUBE ↗
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16"
                >
                  <CheckCircle size={56} className="text-brand-orange mb-6" />
                  <h3
                    className="font-display font-black text-[var(--fg)] mb-3"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.03em" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-[var(--fg)] opacity-60" style={{ fontSize: "1rem" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        required
                        className={inputClass}
                        aria-label="Your name"
                      />
                      {errors.name && (
                        <p className="text-brand-orange text-xs mt-1.5">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        required
                        className={inputClass}
                        aria-label="Email address"
                      />
                      {errors.email && (
                        <p className="text-brand-orange text-xs mt-1.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      required
                      className={inputClass}
                      aria-label="Subject"
                    />
                    {errors.subject && (
                      <p className="text-brand-orange text-xs mt-1.5">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your message…"
                      required
                      rows={6}
                      className={`${inputClass} resize-none`}
                      aria-label="Message"
                    />
                    {errors.message && (
                      <p className="text-brand-orange text-xs mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  {formState === "error" && !Object.keys(errors).length && (
                    <div className="flex items-center gap-2 text-brand-orange text-sm">
                      <AlertCircle size={16} />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}

                  <MagneticButton className="w-full">
                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="w-full bg-brand-orange text-white font-display font-bold py-4 rounded-xl hover:bg-brand-orange/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
                    >
                      {formState === "loading" ? "Sending…" : "Send Message →"}
                    </button>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
