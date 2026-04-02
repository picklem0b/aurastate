"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface AuraOverlayProps {
  color: string;
  intensity: number; // 0–1
  className?: string;
}

/**
 * AuraOverlay
 * Full-screen ambient glow that reflects session state.
 * Rendered at z-0 behind all page content.
 */
export function AuraOverlay({ color, intensity, className }: AuraOverlayProps) {
  const style = useMemo(
    () => ({
      background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${color}${Math.round(intensity * 20).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
      opacity: intensity,
      transition: "opacity 2s ease, background 2s ease",
    }),
    [color, intensity]
  );

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
      style={style}
    />
  );
}
