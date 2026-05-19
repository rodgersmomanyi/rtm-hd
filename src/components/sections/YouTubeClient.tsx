"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VideoCard } from "@/components/ui/VideoCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { VideoCard as VideoCardType } from "@/lib/youtube";

export function YoutubeSection({ videos }: { videos: VideoCardType[] }) {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="youtube"
      aria-label="RTM-HD YouTube channel"
      className="py-24 md:py-36 section-blue"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Brand hero band */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Giant RTM-HD logotype */}
          <div
            className="font-display font-black text-brand-orange mb-4 relative inline-block"
            style={{
              fontSize: "clamp(5rem, 18vw, 16rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            RTM-HD
            {/* Play button cutout effect */}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10"
              aria-hidden="true"
              style={{ fontSize: "0.35em" }}
            >
              ▶
            </span>
          </div>

          <p
            className="text-off-white/70 max-w-lg mx-auto"
            style={{ fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            Network engineering deep-dives, career journeys, and behind-the-scenes
            infrastructure content.
          </p>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
          {videos.slice(0, 6).map((video, i) => (
            <motion.div
              key={`${video.id}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <MagneticButton>
            <a
              href="https://www.youtube.com/@RTM-HD"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-arrow
              className="inline-flex items-center gap-3 bg-brand-orange text-white font-display font-bold px-8 py-4 rounded-full hover:bg-brand-orange/90 transition-colors duration-200"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", letterSpacing: "-0.01em" }}
            >
              SUBSCRIBE TO RTM-HD →
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
