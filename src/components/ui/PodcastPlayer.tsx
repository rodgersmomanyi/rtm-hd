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
  Volume2,
  VolumeX,
  X,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import type { PodcastEpisode } from "@/lib/podcasts";
import { formatTime } from "@/lib/podcasts";

// ── Context ────────────────────────────────────────────────────

interface PlayerState {
  episode: PodcastEpisode | null;
  playing: boolean;
  play: (ep: PodcastEpisode) => void;
  pause: () => void;
  resume: () => void;
  close: () => void;
  currentId: string | null;
}

const PlayerCtx = createContext<PlayerState>({
  episode: null,
  playing: false,
  play: () => {},
  pause: () => {},
  resume: () => {},
  close: () => {},
  currentId: null,
});

export function usePodcastPlayer() {
  return useContext(PlayerCtx);
}

// ── Mini sticky player ─────────────────────────────────────────

function StickyPlayer({
  episode,
  onClose,
}: {
  episode: PodcastEpisode;
  onClose: () => void;
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

  // Reset when episode changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(false);
    setLoading(true);
    setCurrentTime(0);
    setDuration(0);
    audio.load();
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, [episode.audio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onWait = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("waiting", onWait);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("waiting", onWait);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play();
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

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-[5000] bg-brand-blue-deep border-t border-white/10 backdrop-blur-md"
    >
      {/* Progress bar — top edge */}
      <div className="h-0.5 w-full bg-white/10 relative">
        <div
          className="absolute inset-y-0 left-0 bg-brand-orange transition-none"
          style={{ width: `${progress}%` }}
        />
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.5}
          value={currentTime}
          onChange={seek}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          aria-label="Seek"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-10 py-3 flex items-center gap-4">
        {/* Artwork thumbnail */}
        <div className="relative shrink-0 w-11 h-11 rounded-lg overflow-hidden hidden sm:block">
          <Image
            src={episode.image}
            alt={episode.title}
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>

        {/* Episode info */}
        <div className="flex-1 min-w-0">
          <div className="eyebrow text-brand-orange mb-0.5 truncate" style={{ fontSize: "0.6rem" }}>
            S{episode.season} · WHERE THE INTERNET LIVES
          </div>
          <div
            className="font-display font-bold text-off-white truncate"
            style={{ fontSize: "clamp(0.78rem, 1.5vw, 0.95rem)", letterSpacing: "-0.01em" }}
          >
            {episode.title}
          </div>
        </div>

        {/* Time */}
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          <span className="font-mono text-off-white/50" style={{ fontSize: "0.75rem" }}>
            {formatTime(currentTime)}
          </span>
          <span className="text-off-white/20 text-xs">/</span>
          <span className="font-mono text-off-white/30" style={{ fontSize: "0.75rem" }}>
            {duration ? formatTime(duration) : episode.duration.slice(3)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => skip(-15)}
            className="p-2 text-off-white/60 hover:text-brand-orange transition-colors rounded-full"
            aria-label="Rewind 15 seconds"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-brand-orange hover:bg-brand-orange/80 transition-colors flex items-center justify-center text-white shrink-0"
            aria-label={playing ? "Pause" : "Play"}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : playing ? (
              <Pause size={18} fill="white" />
            ) : (
              <Play size={18} fill="white" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={() => skip(30)}
            className="p-2 text-off-white/60 hover:text-brand-orange transition-colors rounded-full"
            aria-label="Forward 30 seconds"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Speed */}
        <button
          onClick={cycleSpeed}
          className="hidden sm:flex items-center shrink-0 px-2 py-1 rounded border border-white/15 hover:border-brand-orange text-off-white/60 hover:text-brand-orange transition-colors"
          style={{ fontSize: "0.72rem", fontWeight: 700 }}
          aria-label="Playback speed"
        >
          {speed}×
        </button>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button onClick={toggleMute} className="text-off-white/50 hover:text-brand-orange transition-colors" aria-label={muted ? "Unmute" : "Mute"}>
            {muted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={changeVolume}
            className="w-20 accent-brand-orange"
            aria-label="Volume"
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="p-2 text-off-white/40 hover:text-brand-orange transition-colors rounded-full shrink-0"
          aria-label="Close player"
        >
          <X size={16} />
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

  const play = useCallback((ep: PodcastEpisode) => {
    setEpisode(ep);
    setPlaying(true);
  }, []);

  const pause = useCallback(() => setPlaying(false), []);
  const resume = useCallback(() => setPlaying(true), []);
  const close = useCallback(() => { setEpisode(null); setPlaying(false); }, []);

  return (
    <PlayerCtx.Provider value={{ episode, playing, play, pause, resume, close, currentId: episode?.id ?? null }}>
      {children}
      <AnimatePresence>
        {episode && <StickyPlayer key={episode.id} episode={episode} onClose={close} />}
      </AnimatePresence>
    </PlayerCtx.Provider>
  );
}
