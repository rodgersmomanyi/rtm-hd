"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import type { PodcastEpisode } from "@/lib/podcasts";
import { formatTime, podcastEpisodes } from "@/lib/podcasts";

// ── Context ────────────────────────────────────────────────────

interface PlayerState {
  episode: PodcastEpisode | null;
  playing: boolean;
  play: (ep: PodcastEpisode) => void;
  pause: () => void;
  resume: () => void;
  close: () => void;
  playNext: () => void;
  playPrev: () => void;
  currentId: string | null;
  hasNext: boolean;
  hasPrev: boolean;
}

const PlayerCtx = createContext<PlayerState>({
  episode: null,
  playing: false,
  play: () => {},
  pause: () => {},
  resume: () => {},
  close: () => {},
  playNext: () => {},
  playPrev: () => {},
  currentId: null,
  hasNext: false,
  hasPrev: false,
});

export function usePodcastPlayer() {
  return useContext(PlayerCtx);
}

// ── Sticky player ──────────────────────────────────────────────

function StickyPlayer({
  episode,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: {
  episode: PodcastEpisode;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speeds = [0.75, 1, 1.25, 1.5, 2];

  // Keep latest onNext in a ref so the 'ended' listener never goes stale
  const onNextRef = useRef(onNext);
  useEffect(() => { onNextRef.current = onNext; }, [onNext]);

  // Load + auto-play when episode changes (stable component, no remount)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setLoading(true);
    setCurrentTime(0);
    setDuration(0);
    audio.playbackRate = speed;
    audio.load();
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode.audio]);

  // Wire all persistent audio events once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime    = () => setCurrentTime(audio.currentTime);
    const onMeta    = () => setDuration(audio.duration);
    const onWait    = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onPlay    = () => setPlaying(true);
    const onPause   = () => setPlaying(false);
    const onEnded   = () => onNextRef.current();   // ← autoplay next

    audio.addEventListener("timeupdate",     onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("waiting",        onWait);
    audio.addEventListener("canplay",        onCanPlay);
    audio.addEventListener("play",           onPlay);
    audio.addEventListener("pause",          onPause);
    audio.addEventListener("ended",          onEnded);
    return () => {
      audio.removeEventListener("timeupdate",     onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("waiting",        onWait);
      audio.removeEventListener("canplay",        onCanPlay);
      audio.removeEventListener("play",           onPlay);
      audio.removeEventListener("pause",          onPause);
      audio.removeEventListener("ended",          onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause(); else audio.play();
  };

  const skip = (secs: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + secs, audio.duration));
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = parseFloat(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const cycleSpeed = () => {
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Shared icon-button style
  const iconBtn = (active = true) =>
    `p-1.5 rounded-full transition-colors duration-150 ${
      active
        ? "text-off-white/60 hover:text-brand-orange"
        : "text-off-white/20 cursor-not-allowed"
    }`;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="fixed bottom-0 left-0 right-0 z-[5000] bg-brand-blue-deep/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_40px_rgba(0,0,0,0.5)]"
    >
      {/* Seek bar — top edge */}
      <div className="relative h-1 w-full bg-white/10 group cursor-pointer">
        <div
          className="absolute inset-y-0 left-0 bg-brand-orange transition-none"
          style={{ width: `${progress}%` }}
        />
        {/* Thumb dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
        <input
          type="range" min={0} max={duration || 100} step={0.5}
          value={currentTime} onChange={seek}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ height: "100%" }}
          aria-label="Seek"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-3 md:px-8 py-2.5 flex items-center gap-3">

        {/* Artwork */}
        <div className="relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden ring-1 ring-white/10">
          <Image
            src={episode.image} alt={episode.title} fill
            className="object-cover" sizes="(max-width:640px) 40px, 44px"
          />
        </div>

        {/* Episode info */}
        <div className="flex-1 min-w-0">
          <div className="eyebrow text-brand-orange truncate" style={{ fontSize: "0.58rem" }}>
            S{episode.season} · WHERE THE INTERNET LIVES
            {episode.isTrailer && (
              <span className="ml-1.5 px-1 rounded bg-brand-orange/20 text-brand-orange" style={{ fontSize: "0.55rem" }}>
                TRAILER
              </span>
            )}
          </div>
          <div
            className="font-display font-bold text-off-white truncate leading-tight mt-0.5"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.92rem)", letterSpacing: "-0.01em" }}
          >
            {episode.title}
          </div>
        </div>

        {/* Time display */}
        <div className="hidden sm:flex items-center gap-1 shrink-0 tabular-nums">
          <span className="font-mono text-off-white/60" style={{ fontSize: "0.72rem" }}>
            {formatTime(currentTime)}
          </span>
          <span className="text-off-white/20 text-xs">/</span>
          <span className="font-mono text-off-white/30" style={{ fontSize: "0.72rem" }}>
            {duration ? formatTime(duration) : episode.duration.replace(/^00:/, "")}
          </span>
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center gap-0.5 shrink-0">

          {/* Prev episode */}
          <button
            onClick={onPrev} disabled={!hasPrev}
            className={iconBtn(hasPrev)}
            aria-label="Previous episode"
            title="Previous episode"
          >
            <SkipBack size={17} />
          </button>

          {/* Rewind 15 s */}
          <button
            onClick={() => skip(-15)}
            className={`${iconBtn()} relative`}
            aria-label="Rewind 15 seconds"
            title="−15 s"
          >
            <RotateCcw size={16} />
            <span
              className="absolute inset-0 flex items-center justify-center font-bold text-off-white/60"
              style={{ fontSize: "6.5px", paddingTop: "7px" }}
            >
              15
            </span>
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="mx-1 w-10 h-10 rounded-full bg-brand-orange hover:bg-brand-orange/85 active:scale-95 transition-all flex items-center justify-center text-white shrink-0 shadow-md shadow-brand-orange/30"
            aria-label={playing ? "Pause" : "Play"}
          >
            {loading
              ? <Loader2 size={18} className="animate-spin" />
              : playing
                ? <Pause size={18} fill="white" />
                : <Play  size={18} fill="white" className="ml-0.5" />
            }
          </button>

          {/* Forward 30 s */}
          <button
            onClick={() => skip(30)}
            className={`${iconBtn()} relative`}
            aria-label="Forward 30 seconds"
            title="+30 s"
          >
            <RotateCw size={16} />
            <span
              className="absolute inset-0 flex items-center justify-center font-bold text-off-white/60"
              style={{ fontSize: "6.5px", paddingTop: "7px" }}
            >
              30
            </span>
          </button>

          {/* Next episode */}
          <button
            onClick={onNext} disabled={!hasNext}
            className={iconBtn(hasNext)}
            aria-label="Next episode"
            title="Next episode"
          >
            <SkipForward size={17} />
          </button>
        </div>

        {/* Speed */}
        <button
          onClick={cycleSpeed}
          className="hidden sm:flex items-center shrink-0 px-2 py-1 rounded border border-white/15 hover:border-brand-orange text-off-white/50 hover:text-brand-orange transition-colors"
          style={{ fontSize: "0.7rem", fontWeight: 700, minWidth: "2.8rem" }}
          aria-label="Playback speed"
        >
          {speed}×
        </button>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className="text-off-white/50 hover:text-brand-orange transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range" min={0} max={1} step={0.05}
            value={muted ? 0 : volume} onChange={changeVolume}
            className="w-16 accent-brand-orange" aria-label="Volume"
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="p-1.5 text-off-white/30 hover:text-brand-orange transition-colors rounded-full shrink-0 ml-1"
          aria-label="Close player"
        >
          <X size={15} />
        </button>
      </div>

      <audio ref={audioRef} src={episode.audio} preload="metadata" />
    </motion.div>
  );
}

// ── Provider ──────────────────────────────────────────────────

export function PodcastPlayerProvider({ children }: { children: React.ReactNode }) {
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null);
  const [playing, setPlaying] = useState(false);

  // Compute position in full episode list
  const currentIndex = episode
    ? podcastEpisodes.findIndex((ep) => ep.id === episode.id)
    : -1;
  const hasNext = currentIndex >= 0 && currentIndex < podcastEpisodes.length - 1;
  const hasPrev = currentIndex > 0;

  const play = useCallback((ep: PodcastEpisode) => {
    setEpisode(ep);
    setPlaying(true);
  }, []);

  const pause  = useCallback(() => setPlaying(false), []);
  const resume = useCallback(() => setPlaying(true),  []);
  const close  = useCallback(() => { setEpisode(null); setPlaying(false); }, []);

  // Navigate by index — functional setEpisode avoids stale closure
  const playNext = useCallback(() => {
    setEpisode((prev) => {
      if (!prev) return prev;
      const idx = podcastEpisodes.findIndex((ep) => ep.id === prev.id);
      if (idx >= 0 && idx < podcastEpisodes.length - 1)
        return podcastEpisodes[idx + 1];
      return prev;
    });
    setPlaying(true);
  }, []);

  const playPrev = useCallback(() => {
    setEpisode((prev) => {
      if (!prev) return prev;
      const idx = podcastEpisodes.findIndex((ep) => ep.id === prev.id);
      if (idx > 0) return podcastEpisodes[idx - 1];
      return prev;
    });
    setPlaying(true);
  }, []);

  const ctx = {
    episode, playing, play, pause, resume, close,
    playNext, playPrev,
    currentId: episode?.id ?? null,
    hasNext, hasPrev,
  };

  return (
    <PlayerCtx.Provider value={ctx}>
      {children}

      {/*
        Page spacer — pushes footer above the fixed player so nothing is hidden.
        Matches the player height (~72 px) and animates in/out with the player.
      */}
      <AnimatePresence>
        {episode && (
          <motion.div
            key="player-spacer"
            initial={{ height: 0 }}
            animate={{ height: 72 }}
            exit={{ height: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/*
        Stable key "sticky-player" — player mounts once and stays mounted.
        Episode changes are handled internally via useEffect([episode.audio]).
        This prevents the slide-down/slide-up animation on every episode switch.
      */}
      <AnimatePresence>
        {episode && (
          <StickyPlayer
            key="sticky-player"
            episode={episode}
            onClose={close}
            onNext={playNext}
            onPrev={playPrev}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        )}
      </AnimatePresence>
    </PlayerCtx.Provider>
  );
}
