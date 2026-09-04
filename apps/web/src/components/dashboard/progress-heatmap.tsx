"use client";

import { useMemo } from "react";
import { cn } from "@aurastate/ui";

interface ProgressHeatmapProps {
  studyDays: string[]; // Array of YYYY-MM-DD strings
  className?: string;
}

export function ProgressHeatmap({ studyDays, className }: ProgressHeatmapProps) {
  const weeks = useMemo(() => {
    const today = new Date();
    const weeksData: { date: Date; count: number; level: 0 | 1 | 2 | 3 | 4 }[][] = [];

    // Go back 15 weeks (about 3.5 months)
    for (let w = 14; w >= 0; w--) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay() - w * 7);

      const week: { date: Date; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + d);
        const dateStr = date.toISOString().split("T")[0];
        const count = studyDays.filter((d) => d === dateStr).length;
        const level = count === 0 ? 0 : count <= 1 ? 1 : count <= 2 ? 2 : count <= 3 ? 3 : 4;
        week.push({ date, count, level });
      }
      weeksData.push(week);
    }

    return weeksData;
  }, [studyDays]);

  const levelColors = [
    "bg-elevated",
    "bg-solar-400/20",
    "bg-solar-400/40",
    "bg-solar-400/70",
    "bg-solar-400",
  ];

  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-4", className)}>
      <p className="text-xs font-mono text-ink-muted uppercase tracking-widest mb-3">
        Study Activity
      </p>
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                className={cn(
                  "w-3 h-3 rounded-sm transition-colors",
                  levelColors[day.level]
                )}
                title={`${day.date.toLocaleDateString("en-ZA")} — ${day.count} sessions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-ink-muted">
        <span>Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={cn("w-3 h-3 rounded-sm", color)} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
