"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusStore } from "@/store/focus-store";

/**
 * HeartbeatMonitor
 * Visual pulse that reflects active session health.
 * Flatlines if the session becomes void due to >10m gap.
 */
export function HeartbeatMonitor({ className }: { className?: string }) {
  const { isActive, sessionVoided, elapsed } = useFocusStore();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!isActive || sessionVoided) return;
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
    }, 2000);
    return () => clearInterval(id);
  }, [isActive, sessionVoided]);

  return (
    <div className={cn("flex items-center gap-3 px-4 py-3 rounded-xl border", 
      sessionVoided ? "border-aura-red/30 bg-aura-red/5" : "border-border bg-elevated",
      className
    )}>
      <Activity
        size={16}
        className={cn(
          "transition-colors duration-150",
          sessionVoided ? "text-aura-red" :
          pulse ? "text-aura-green" : "text-ink-muted"
        )}
      />
      <div className="flex-1">
        <p className="text-xs font-mono text-ink-muted uppercase tracking-widest">
          {sessionVoided ? "SESSION VOIDED" : isActive ? "HEARTBEAT ACTIVE" : "STANDBY"}
        </p>
        {sessionVoided && (
          <p className="text-xs text-aura-red mt-0.5">
            Gap exceeded 10 minutes. Session not counted.
          </p>
        )}
      </div>
      {!sessionVoided && isActive && (
        <div className={cn(
          "w-2 h-2 rounded-full transition-all duration-150",
          pulse ? "bg-aura-green scale-125" : "bg-aura-green/50"
        )} />
      )}
    </div>
  );
}
