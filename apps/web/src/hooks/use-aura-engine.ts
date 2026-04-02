"use client";

import { useMemo } from "react";
import { useFocusStore } from "@/store/focus-store";
import { useXPStore } from "@/store/xp-store";

const AURA_COLORS = {
  idle:     "#4F8EF7", // Blue  — resting
  active:   "#FFC200", // Solar — studying
  melting:  "#EF4444", // Red   — meltdown
  mastery:  "#10B981", // Green — post-mastery
  voided:   "#55556A", // Gray  — session dead
} as const;

/**
 * useAuraEngine
 * Derives the ambient aura color and intensity from system state.
 * Drives AuraOverlay + VideoStreamer overlays.
 */
export function useAuraEngine() {
  const { isActive, isMelting, sessionVoided, auraOpacity } = useFocusStore();
  const { currentXP, maxXP } = useXPStore();

  const auraColor = useMemo(() => {
    if (sessionVoided) return AURA_COLORS.voided;
    if (isMelting)     return AURA_COLORS.melting;
    if (isActive)      return AURA_COLORS.active;
    if (currentXP / maxXP > 0.9) return AURA_COLORS.mastery;
    return AURA_COLORS.idle;
  }, [isActive, isMelting, sessionVoided, currentXP, maxXP]);

  const auraIntensity = useMemo(() => {
    if (sessionVoided) return 0.1;
    if (isMelting)     return 0.9;
    if (isActive)      return auraOpacity;
    return 0.3;
  }, [isActive, isMelting, sessionVoided, auraOpacity]);

  return { auraColor, auraIntensity };
}
