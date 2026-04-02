"use client";

import { useEffect, useRef } from "react";
import { Zap, ZapOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusStore } from "@/store/focus-store";

/**
 * MeltdownTimer
 * Displays elapsed focus time and handles the Meltdown UI feedback.
 * The exponential decay logic lives in use-focus-integrity.ts
 */
export function MeltdownTimer({ className }: { className?: string }) {
  const { elapsed, isActive, isMelting, meltProgress, auraOpacity } = useFocusStore();

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-6 transition-all duration-300",
        isActive && !isMelting && "border-aura-green/30 bg-aura-green/5",
        isMelting && "border-aura-red/30 bg-aura-red/5 animate-meltdown-shake",
        !isActive && "border-border bg-surface",
        className
      )}
    >
      {/* Aura opacity indicator */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, rgba(255,194,0,${auraOpacity * 0.15}) 0%, transparent 70%)`,
        }}
      />

      <div className="relative text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-ink-muted uppercase tracking-widest">
          {isActive ? (
            <Zap size={12} className="text-aura-green" />
          ) : (
            <ZapOff size={12} />
          )}
          {isMelting ? "MELTDOWN" : isActive ? "ACTIVE" : "IDLE"}
        </div>

        <div
          className={cn(
            "font-numeric font-bold tracking-tight transition-colors duration-300",
            "text-5xl tabular-nums",
            isMelting ? "text-aura-red" : isActive ? "text-solar-400" : "text-ink-muted"
          )}
        >
          {hours > 0 && `${fmt(hours)}:`}
          {fmt(minutes)}:{fmt(seconds)}
        </div>

        {isMelting && (
          <div className="space-y-1">
            <p className="text-xs text-aura-red font-mono">
              RETURN IN {Math.max(0, 10 - Math.floor(meltProgress))}s OR LOSE XP
            </p>
            <div className="h-1 bg-aura-red/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-aura-red rounded-full transition-all"
                style={{ width: `${(meltProgress / 10) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
