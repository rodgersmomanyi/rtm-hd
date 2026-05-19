"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] hover:border-brand-orange transition-colors duration-200 text-[var(--fg)] hover:text-brand-orange"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: isDark ? 0 : 180 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
    </motion.button>
  );
}
