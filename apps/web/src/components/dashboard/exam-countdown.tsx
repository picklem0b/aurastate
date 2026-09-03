"use client";

import { useMemo } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@aurastate/ui";

interface ExamCountdownProps {
  examDate: string;
  subject?: string;
  className?: string;
}

export function ExamCountdown({ examDate, subject, className }: ExamCountdownProps) {
  const countdown = useMemo(() => {
    const now = new Date();
    const exam = new Date(examDate);
    const diffMs = exam.getTime() - now.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return {
      days,
      isUrgent: days <= 14,
      isCritical: days <= 7,
      label: days <= 0 ? "EXAM DAY" : days === 1 ? "TOMORROW" : `${days} DAYS`,
    };
  }, [examDate]);

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all",
        countdown.isCritical
          ? "border-aura-red/30 bg-aura-red/5"
          : countdown.isUrgent
          ? "border-solar-400/30 bg-solar-400/5"
          : "border-border bg-surface",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {countdown.isCritical ? (
          <AlertTriangle size={18} className="text-aura-red" />
        ) : (
          <Clock size={18} className={countdown.isUrgent ? "text-solar-400" : "text-ink-muted"} />
        )}
        <div>
          <p className={cn(
            "font-numeric text-2xl font-bold",
            countdown.isCritical ? "text-aura-red" : countdown.isUrgent ? "text-solar-400" : "text-ink-primary"
          )}>
            {countdown.label}
          </p>
          {subject && (
            <p className="text-xs text-ink-secondary mt-0.5">{subject}</p>
          )}
        </div>
      </div>
    </div>
  );
}
