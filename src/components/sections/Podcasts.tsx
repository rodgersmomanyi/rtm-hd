"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Clock, Mic, ChevronDown, ChevronUp } from "lucide-react";
import { podcastEpisodes, formatTime, parseDuration } from "@/lib/podcasts";
import { usePodcastPlayer } from "@/components/ui/PodcastPlayer";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Group episodes by season, latest first
const seasons = [5, 4, 3];

const bySeasonLatestFirst = seasons.map((s) => ({
  season: s,
  episodes: podcastEpisodes.filter((ep) => ep.season === s),
  // already sorted latest→oldest in the data file
}));

function EpisodeRow({ ep, index }: { ep: (typeof podcastEpisodes)[0]; index: number }) {
  const { play, pause, currentId, playing } = usePodcastPlayer();
  const [expanded, setExpanded] = useState(false);
  const isActive = currentId === ep.id;
  const isPlaying = isActive && playing;

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play(ep);
    }
  };

  const durationSecs = parseDuration(ep.duration);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className={`group border rounded-2xl transition-all duration-300 overflow-hidden ${
        isActive
          ? "border-brand-orange bg-brand-orange/5"
          : "border-[var(--border)] hover:border-brand-orange/50"
      }`}
    >
      <div className="flex items-start gap-4 p-4 md:p-5">
        {/* Artwork + Play overlay */}
        <button
          onClick={handlePlay}
          aria-label={isPlaying ? `Pause ${ep.title}` : `Play ${ep.title}`}
          className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange"
        >
          <Image
            src={ep.image}
            alt={ep.title}
            fill
            className="object-cover"
            sizes="56px"
          />
          {/* Hover / active overlay */}
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
              isActive
                ? "bg-black/50"
                : "bg-black/0 group-hover:bg-black/40"
            }`}
          >
            <span
              className={`text-white transition-opacity duration-200 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {isPlaying ? (
                <Pause size={18} fill="white" />
              ) : (
                <Play size={18} fill="white" className="ml-0.5" />
              )}
            </span>
          </span>
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {ep.isTrailer && (
                <span className="inline-block px-2 py-0.5 rounded text-brand-orange border border-brand-orange/30 mr-2 mb-1"
                  style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                  TRAILER
                </span>
              )}
              <h3
                className={`font-display font-bold leading-snug transition-colors ${
                  isActive ? "text-brand-orange" : "text-[var(--fg)] group-hover:text-brand-orange"
                }`}
                style={{ fontSize: "clamp(0.88rem, 1.8vw, 1.05rem)", letterSpacing: "-0.01em" }}
              >
                {ep.title}
              </h3>
            </div>

            {/* Duration + date */}
            <div className="shrink-0 text-right hidden sm:block">
              <div className="flex items-center gap-1 text-[var(--fg)] opacity-40 justify-end"
                style={{ fontSize: "0.72rem" }}>
                <Clock size={11} />
                <span className="font-mono">{formatTime(durationSecs)}</span>
              </div>
              <div className="eyebrow text-[var(--fg)] opacity-30 mt-0.5" style={{ fontSize: "0.6rem" }}>
                {new Date(ep.pubDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </div>
            </div>
          </div>

          {/* Summary — collapsible */}
          <p
            className={`text-[var(--fg)] transition-all duration-200 ${
              expanded ? "opacity-70 mt-2" : "opacity-50 mt-1.5 line-clamp-2"
            }`}
            style={{ fontSize: "0.82rem", lineHeight: 1.55 }}
          >
            {ep.summary}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-2 text-[var(--fg)] opacity-30 hover:opacity-70 hover:text-brand-orange transition-all"
            style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {expanded ? (
              <><ChevronUp size={12} /> LESS</>
            ) : (
              <><ChevronDown size={12} /> MORE</>
            )}
          </button>
        </div>
      </div>

      {/* Active waveform bar */}
      {isActive && (
        <div className="px-5 pb-3 flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-0.5 rounded-full bg-brand-orange"
              animate={
                isPlaying
                  ? { height: ["4px", `${8 + i * 4}px`, "4px"] }
                  : { height: "4px" }
              }
              transition={{
                duration: 0.7 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
              }}
            />
          ))}
          <span className="ml-2 eyebrow text-brand-orange" style={{ fontSize: "0.6rem" }}>
            {isPlaying ? "NOW PLAYING" : "PAUSED"}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export function Podcasts() {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-80px" });
  const [activeSeason, setActiveSeason] = useState(5);

  const currentSeason = bySeasonLatestFirst.find((s) => s.season === activeSeason)!;

  return (
    <section
      id="podcasts"
      aria-label="Where the Internet Lives podcast"
      className="py-24 md:py-36 bg-[var(--bg)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="eyebrow text-brand-orange block mb-4">Podcast</span>
            <h2 className="display-h2 text-[var(--fg)]">
              Where the<br />
              <span className="text-brand-orange">Internet Lives.</span>
            </h2>
            <p className="text-[var(--fg)] opacity-60 mt-4 max-w-md"
              style={{ fontSize: "1rem", lineHeight: 1.6 }}>
              A podcast by Google exploring how data centers power the people and innovations
              changing our world. {seasons.reduce((t, s) => t + bySeasonLatestFirst.find(b => b.season === s)!.episodes.length, 0)} episodes across {seasons.length} seasons.
            </p>
          </div>

          {/* Podcast brand badge */}
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-[var(--border)] shrink-0">
            <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center shrink-0">
              <Mic size={22} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-[var(--fg)]"
                style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
                By Google
              </div>
              <div className="eyebrow text-[var(--fg)] opacity-40">5 Seasons · 2022–2026</div>
              <a
                href="https://feeds.simplecast.com/uq015LLC"
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow text-brand-orange hover:underline underline-offset-2"
                style={{ fontSize: "0.6rem" }}
              >
                RSS FEED ↗
              </a>
            </div>
          </div>
        </motion.div>

        {/* Season tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {bySeasonLatestFirst.map(({ season }) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`px-4 py-2 rounded-full font-display font-bold transition-all duration-200 ${
                activeSeason === season
                  ? "bg-brand-orange text-white"
                  : "border border-[var(--border)] text-[var(--fg)] opacity-50 hover:opacity-100 hover:border-brand-orange"
              }`}
              style={{ fontSize: "0.8rem", letterSpacing: "0.02em" }}
            >
              Season {season}
              {season === 5 && (
                <span className="ml-2 px-1.5 py-0.5 rounded bg-white/20 text-white"
                  style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                  LATEST
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Episode list */}
        <div className="space-y-3">
          {currentSeason.episodes.map((ep, i) => (
            <EpisodeRow key={ep.id} ep={ep} index={i} />
          ))}
        </div>

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-4 items-center"
        >
          <MagneticButton>
            <a
              href="https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5zaW1wbGVjYXN0LmNvbS91cTAxNUxMQw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-display font-bold px-6 py-3 rounded-full hover:bg-brand-orange/90 transition-colors"
              style={{ fontSize: "0.88rem" }}
            >
              Listen on Google Podcasts ↗
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://feeds.simplecast.com/uq015LLC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--fg)] font-display font-bold px-6 py-3 rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors"
              style={{ fontSize: "0.88rem" }}
            >
              RSS Feed ↗
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
