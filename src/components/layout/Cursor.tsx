"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorVariant = "default" | "hover" | "play" | "arrow";

export function Cursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 32, mass: 0.4 };
  const dotX = useSpring(rawX, springConfig);
  const dotY = useSpring(rawY, springConfig);

  const ringConfig = { stiffness: 180, damping: 24, mass: 0.6 };
  const ringX = useSpring(rawX, ringConfig);
  const ringY = useSpring(rawY, ringConfig);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnterInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (el.dataset.cursorPlay) setVariant("play");
      else if (el.dataset.cursorArrow) setVariant("arrow");
      else setVariant("hover");
    };

    const onLeaveInteractive = () => setVariant("default");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", () => setIsVisible(true));
    window.addEventListener("mouseleave", () => setIsVisible(false));

    const addListeners = () => {
      document
        .querySelectorAll<HTMLElement>(
          "a, button, [data-magnetic], [data-cursor-play], [data-cursor-arrow]"
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnterInteractive);
          el.addEventListener("mouseleave", onLeaveInteractive);
        });
    };

    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [rawX, rawY, isVisible]);

  const dotSize = variant === "hover" ? 6 : 10;
  const ringSize =
    variant === "hover" ? 56 : variant === "play" || variant === "arrow" ? 52 : 38;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full bg-brand-orange mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.18 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full border border-brand-orange mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ duration: 0.22 }}
      >
        {variant === "play" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="#ff6a1a">
              <path d="M0 0l14 8L0 16V0z" />
            </svg>
          </motion.div>
        )}
        {variant === "arrow" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#ff6a1a" strokeWidth="1.5">
              <path d="M3 13L13 3M13 3H5M13 3v8" />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
