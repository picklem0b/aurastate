"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuraEngine } from "@/hooks/use-aura-engine";

interface VideoStreamerProps {
  src: string;
  title: string;
  subject?: string;
  onComplete?: () => void;
  className?: string;
}

/**
 * AuraState Video Streamer
 * Custom high-aesthetic video player with toggleable Aura overlays.
 */
export function VideoStreamer({
  src,
  title,
  subject,
  onComplete,
  className,
}: VideoStreamerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAura, setShowAura] = useState(true);
  const { auraColor } = useAuraEngine();

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(p);
    if (p >= 99 && onComplete) onComplete();
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden bg-abyss border border-border group",
        className
      )}
    >
      {/* Aura overlay (toggleable) */}
      {showAura && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to bottom, transparent 60%, ${auraColor}18 100%)`,
          }}
        />
      )}

      <video
        ref={videoRef}
        src={src}
        muted={muted}
        onTimeUpdate={handleTimeUpdate}
        className="w-full aspect-video object-cover"
        playsInline
      />

      {/* Controls */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-void/90 to-transparent">
        {/* Progress bar */}
        <div className="h-0.5 bg-elevated rounded-full mb-3">
          <div
            className="h-full bg-solar-400 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-full bg-solar-400 text-void flex items-center justify-center hover:bg-solar-300 transition-colors"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause size={14} strokeWidth={2.5} /> : <Play size={14} strokeWidth={2.5} />}
            </button>
            <button
              onClick={() => setMuted(!muted)}
              className="text-ink-secondary hover:text-ink-primary transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAura(!showAura)}
              className={cn(
                "text-xs font-mono px-2 py-0.5 rounded border transition-colors",
                showAura
                  ? "border-solar-400 text-solar-400"
                  : "border-border text-ink-muted"
              )}
            >
              AURA
            </button>
            <button
              onClick={() => videoRef.current?.requestFullscreen()}
              className="text-ink-secondary hover:text-ink-primary transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Subject + Title header */}
      {(subject || title) && (
        <div className="absolute top-0 inset-x-0 z-20 p-4 bg-gradient-to-b from-void/80 to-transparent">
          {subject && (
            <p className="text-xs font-mono text-solar-400 uppercase tracking-widest">{subject}</p>
          )}
          <p className="text-sm font-display font-semibold text-ink-primary mt-0.5">{title}</p>
        </div>
      )}
    </div>
  );
}
