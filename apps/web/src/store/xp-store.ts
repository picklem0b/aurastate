import { create } from "zustand";
import { persist } from "zustand/middleware";

interface XPStore {
  currentXP: number;
  maxXP: number;
  level: number;
  campusPoints: number; // CP for avatar cosmetics
  addXP: (amount: number) => void;
  deductXP: (amount: number) => void;
  addCP: (amount: number) => void;
  levelUp: () => void;
}

const XP_PER_LEVEL = 1000;

export const useXPStore = create<XPStore>()(
  persist(
    (set) => ({
      currentXP: 0,
      maxXP: XP_PER_LEVEL,
      level: 1,
      campusPoints: 0,

      addXP: (amount) =>
        set((s) => {
          let xp = s.currentXP + amount;
          let level = s.level;
          const maxXP = level * XP_PER_LEVEL;
          if (xp >= maxXP) {
            xp = xp - maxXP;
            level += 1;
          }
          return { currentXP: xp, level, maxXP: level * XP_PER_LEVEL };
        }),

      deductXP: (amount) =>
        set((s) => ({
          currentXP: Math.max(0, s.currentXP - amount),
        })),

      addCP: (amount) =>
        set((s) => ({ campusPoints: s.campusPoints + amount })),

      levelUp: () =>
        set((s) => ({
          level: s.level + 1,
          currentXP: 0,
          maxXP: (s.level + 1) * XP_PER_LEVEL,
        })),
    }),
    { name: "aurastate:xp" }
  )
);
