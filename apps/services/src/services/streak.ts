import { STREAK_BONUSES } from "@aurastate/shared";

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
  multiplier: number;
  bonusLabel: string | null;
  nextMilestone: { days: number; label: string; multiplier: number } | null;
}

export function getStreakInfo(
  currentStreak: number,
  longestStreak: number,
  totalStudyDays: number
): StreakInfo {
  const milestones = Object.entries(STREAK_BONUSES)
    .map(([days, bonus]) => ({
      days: parseInt(days),
      label: bonus.label,
      multiplier: bonus.multiplier,
    }))
    .sort((a, b) => a.days - b.days);

  // Find current multiplier
  let multiplier = 1.0;
  let bonusLabel: string | null = null;

  for (const milestone of milestones) {
    if (currentStreak >= milestone.days) {
      multiplier = milestone.multiplier;
      bonusLabel = milestone.label;
    }
  }

  // Find next milestone
  const nextMilestone = milestones.find((m) => m.days > currentStreak) ?? null;

  return {
    currentStreak,
    longestStreak,
    totalStudyDays,
    multiplier,
    bonusLabel,
    nextMilestone,
  };
}

export function calculateStreakXp(baseXp: number, multiplier: number): number {
  return Math.round(baseXp * multiplier);
}

export function isStreakAtRisk(lastStudyDate: string): boolean {
  const last = new Date(lastStudyDate);
  const now = new Date();
  const diffHours = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
  return diffHours > 20; // Less than 4 hours left in the day
}
