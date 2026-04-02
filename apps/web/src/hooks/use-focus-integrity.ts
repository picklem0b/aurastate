"use client";

import { useEffect, useCallback, useRef } from "react";
import { useFocusStore } from "@/store/focus-store";
import { useXPStore } from "@/store/xp-store";

const GRACE_PERIOD_S = 10;
const VOID_THRESHOLD_S = 600; // 10 minutes
const HEARTBEAT_KEY = "aurastate:focus_heartbeat";

/**
 * useFocusIntegrity
 * The Pulse Focus Engine — Anti-Cheat Core
 *
 * 1. Tracks visibility / focus state
 * 2. Triggers the 10s Meltdown grace period on blur
 * 3. Applies exponential XP decay: loss = decayRate * speed²
 * 4. Writes heartbeats to localStorage for crash recovery
 * 5. Voids session if recovered gap > VOID_THRESHOLD_S
 */
export function useFocusIntegrity() {
  const {
    isActive,
    isMelting,
    meltProgress,
    elapsed,
    setMelting,
    setMeltProgress,
    setSessionVoided,
    incrementElapsed,
  } = useFocusStore();

  const { deductXP } = useXPStore();

  const decayRateRef = useRef(1);
  const meltIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(elapsed);

  // Keep ref in sync
  useEffect(() => { elapsedRef.current = elapsed; }, [elapsed]);

  // ── Heartbeat writer ──────────────────────────────────────────────────────
  const writeHeartbeat = useCallback(() => {
    if (!isActive) return;
    try {
      localStorage.setItem(
        HEARTBEAT_KEY,
        JSON.stringify({ ts: Date.now(), elapsed: elapsedRef.current })
      );
    } catch {}
  }, [isActive]);

  // ── Crash recovery ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive) return;
    try {
      const raw = localStorage.getItem(HEARTBEAT_KEY);
      if (!raw) return;
      const { ts, elapsed: savedElapsed } = JSON.parse(raw);
      const gapSeconds = (Date.now() - ts) / 1000;
      if (gapSeconds > VOID_THRESHOLD_S) {
        setSessionVoided(true);
        console.warn(`[Integrity] Session voided: ${Math.round(gapSeconds)}s gap detected.`);
      }
    } catch {}
  }, [isActive, setSessionVoided]);

  // ── Main ticker ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => {
      incrementElapsed();
      writeHeartbeat();
    }, 1000);
    heartbeatRef.current = id;
    return () => clearInterval(id);
  }, [isActive, incrementElapsed, writeHeartbeat]);

  // ── Meltdown handler ──────────────────────────────────────────────────────
  const handleFocusMeltdown = useCallback(() => {
    if (!isActive) return;
    setMelting(true);
    decayRateRef.current = 1;

    let progress = 0;
    meltIntervalRef.current = setInterval(() => {
      progress += 1;
      setMeltProgress(progress);

      if (progress > GRACE_PERIOD_S) {
        // Exponential XP decay: loss = decayRate * speed²
        const loss = Math.round(decayRateRef.current * Math.pow(decayRateRef.current, 2));
        deductXP(loss);
        decayRateRef.current *= 1.5;
      }
    }, 1000);
  }, [isActive, setMelting, setMeltProgress, deductXP]);

  const handleFocusReturn = useCallback(() => {
    if (meltIntervalRef.current) {
      clearInterval(meltIntervalRef.current);
      meltIntervalRef.current = null;
    }
    setMelting(false);
    setMeltProgress(0);
    decayRateRef.current = 1;
  }, [setMelting, setMeltProgress]);

  // ── Visibility / blur listeners ───────────────────────────────────────────
  useEffect(() => {
    if (!isActive) return;

    const onHide = () => handleFocusMeltdown();
    const onShow = () => handleFocusReturn();

    document.addEventListener("visibilitychange", () => {
      document.hidden ? onHide() : onShow();
    });
    window.addEventListener("blur", onHide);
    window.addEventListener("focus", onShow);

    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("blur", onHide);
      window.removeEventListener("focus", onShow);
      if (meltIntervalRef.current) clearInterval(meltIntervalRef.current);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, [isActive, handleFocusMeltdown, handleFocusReturn]);
}
