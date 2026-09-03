import { MASTERY_THRESHOLD } from "@aurastate/shared";

interface ScheduleBlock {
  date: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  type: "study" | "review_sprint" | "exam_prep";
  priority: "high" | "medium" | "low";
}

interface SchedulerInput {
  subjects: { code: string; masteryPct: number; weakConcepts: string[] }[];
  examDates: { subject: string; date: string }[];
  studyStyle: "visual" | "auditory" | "reading" | "kinesthetic";
  availableHoursPerDay: number;
  startDate: string;
}

export function generateSchedule(input: SchedulerInput): ScheduleBlock[] {
  const blocks: ScheduleBlock[] = [];
  const startDate = new Date(input.startDate);

  // Sort subjects by mastery (lowest first = highest priority)
  const sorted = [...input.subjects].sort((a, b) => a.masteryPct - b.masteryPct);

  // Calculate time allocation per subject based on weakness
  const totalWeakness = sorted.reduce((sum, s) => sum + (100 - s.masteryPct), 0);

  for (let day = 0; day < 14; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day);
    const dateStr = date.toISOString().split("T")[0];

    let remainingMinutes = input.availableHoursPerDay * 60;

    for (const subject of sorted) {
      if (remainingMinutes <= 0) break;

      const weight = totalWeakness > 0 ? (100 - subject.masteryPct) / totalWeakness : 1 / sorted.length;
      const allocated = Math.min(remainingMinutes, Math.round(input.availableHoursPerDay * 60 * weight));

      if (allocated < 15) continue; // Minimum 15 min blocks

      // Check for review sprints (below threshold)
      if (subject.masteryPct < MASTERY_THRESHOLD) {
        blocks.push({
          date: dateStr,
          subject: subject.code,
          topic: subject.weakConcepts[0] ?? "Review",
          durationMinutes: Math.min(allocated, 30),
          type: "review_sprint",
          priority: "high",
        });
        remainingMinutes -= Math.min(allocated, 30);
      }

      // Regular study block
      const studyMinutes = allocated - (subject.masteryPct < MASTERY_THRESHOLD ? 30 : 0);
      if (studyMinutes >= 15) {
        blocks.push({
          date: dateStr,
          subject: subject.code,
          topic: subject.weakConcepts[0] ?? "General Study",
          durationMinutes: studyMinutes,
          type: "study",
          priority: subject.masteryPct < 50 ? "high" : "medium",
        });
        remainingMinutes -= studyMinutes;
      }
    }
  }

  return blocks;
}

export function getNextReviewDate(lastStudied: string, masteryPct: number): string {
  // Spaced repetition: lower mastery = sooner review
  const baseDays = masteryPct < 30 ? 1 : masteryPct < 50 ? 2 : masteryPct < 70 ? 4 : 7;
  const date = new Date(lastStudied);
  date.setDate(date.getDate() + baseDays);
  return date.toISOString().split("T")[0];
}
