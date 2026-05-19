"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import type { VideoCard as VideoCardType } from "@/lib/youtube";

export function VideoCard({ video }: { video: VideoCardType }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.25 }}
        className="group relative rounded-2xl overflow-hidden bg-brand-blue-deep aspect-video cursor-pointer"
        onClick={() => setLightboxOpen(true)}
        data-cursor-play
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Orange overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-brand-orange/70 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Play size={22} fill="white" className="text-white ml-1" />
          </div>
        </motion.div>

        {/* Meta */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent px-4 py-4">
          {video.viewCount && (
            <div className="eyebrow text-brand-orange mb-1">{video.viewCount} views</div>
          )}
          <h3
            className="font-display font-bold text-white line-clamp-2"
            style={{ fontSize: "0.92rem", lineHeight: 1.35, letterSpacing: "-0.01em" }}
          >
            {video.title}
          </h3>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-ink/95 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full border border-white/20 text-white hover:border-brand-orange hover:text-brand-orange transition-colors"
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
