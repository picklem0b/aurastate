import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FocusStore {
  isActive: boolean;
  isMelting: boolean;
  sessionVoided: boolean;
  elapsed: number;       // seconds
  meltProgress: number;  // 0–10 (grace period countdown)
  auraOpacity: number;   // 0–1
  sessionId: string | null;

  startSession: (id: string) => void;
  endSession: () => void;
  setMelting: (v: boolean) => void;
  setMeltProgress: (v: number) => void;
  setSessionVoided: (v: boolean) => void;
  incrementElapsed: () => void;
  setAuraOpacity: (v: number) => void;
  reset: () => void;
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set) => ({
      isActive: false,
      isMelting: false,
      sessionVoided: false,
      elapsed: 0,
      meltProgress: 0,
      auraOpacity: 1,
      sessionId: null,

      startSession: (id) =>
        set({ isActive: true, sessionId: id, elapsed: 0, sessionVoided: false, auraOpacity: 1 }),

      endSession: () =>
        set({ isActive: false, isMelting: false, meltProgress: 0, sessionId: null }),

      setMelting: (v) => set({ isMelting: v }),
      setMeltProgress: (v) => set({ meltProgress: v }),
      setSessionVoided: (v) => set({ sessionVoided: v }),

      incrementElapsed: () =>
        set((s) => ({ elapsed: s.elapsed + 1 })),

      setAuraOpacity: (v) => set({ auraOpacity: Math.max(0, Math.min(1, v)) }),

      reset: () =>
        set({
          isActive: false,
          isMelting: false,
          sessionVoided: false,
          elapsed: 0,
          meltProgress: 0,
          auraOpacity: 1,
          sessionId: null,
        }),
    }),
    { name: "aurastate:focus" }
  )
);
