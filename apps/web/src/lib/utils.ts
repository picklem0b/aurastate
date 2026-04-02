import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function calcMasteryPercent(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 10000) / 100;
}

/** AuraState mastery threshold — <34.85% triggers red flag */
export const MASTERY_THRESHOLD = 34.85;

export function isBelowMastery(pct: number): boolean {
  return pct < MASTERY_THRESHOLD;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
