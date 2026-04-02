"use client";

import { useState, useEffect } from "react";
import { Lock, Check } from "lucide-react";
import { getRegionSubjects, type SubjectConfig } from "@/lib/regions";
import { cn } from "@/lib/utils";

interface DynamicSubjectCardProps {
  region: string;
  stream: string;
  onComplete: (data: { subjects: string[] }) => void;
}

/**
 * Dynamic Subject Card — Onboarding Card 6
 * The 7-Subject Lock System.
 * Mandatory subjects are shown as locked, electives are selectable.
 */
export function DynamicSubjectCard({ region, stream, onComplete }: DynamicSubjectCardProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const config = getRegionSubjects(region, stream);
  const slotsRemaining = config.electivesLimit - selected.length;

  const toggle = (subject: string) => {
    if (config.mandatory.includes(subject)) return;
    if (selected.includes(subject)) {
      setSelected((s) => s.filter((x) => x !== subject));
    } else if (slotsRemaining > 0) {
      setSelected((s) => [...s, subject]);
    }
  };

  const allSubjects = [...config.mandatory, ...selected];
  const canSubmit = selected.length === config.electivesLimit;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 space-y-5 shadow-panel">
      <div>
        <p className="text-xs font-mono text-solar-400 uppercase tracking-widest">Card 6 · Subjects</p>
        <h2 className="mt-2 font-display text-xl font-bold text-ink-primary">
          Your 7-Subject Bundle
        </h2>
        <p className="text-sm text-ink-secondary mt-1">
          {config.mandatory.length} locked · {slotsRemaining} slot{slotsRemaining !== 1 ? "s" : ""} remaining
        </p>
      </div>

      {/* Mandatory */}
      <div className="space-y-2">
        <p className="text-xs font-mono text-ink-muted uppercase tracking-widest">Mandatory</p>
        {config.mandatory.map((subj) => (
          <div
            key={subj}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/50 bg-elevated/50 opacity-70"
          >
            <Lock size={12} className="text-solar-400 flex-shrink-0" />
            <span className="text-sm text-ink-secondary">{subj}</span>
          </div>
        ))}
      </div>

      {/* Electives */}
      <div className="space-y-2">
        <p className="text-xs font-mono text-ink-muted uppercase tracking-widest">
          Choose {config.electivesLimit}
        </p>
        {config.electives.map((subj) => {
          const isSelected = selected.includes(subj);
          const isDisabled = !isSelected && slotsRemaining === 0;
          return (
            <button
              key={subj}
              onClick={() => toggle(subj)}
              disabled={isDisabled}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all",
                isSelected
                  ? "border-solar-400/50 bg-solar-400/10 text-ink-primary"
                  : isDisabled
                  ? "border-border/30 bg-elevated/30 text-ink-disabled cursor-not-allowed opacity-40"
                  : "border-border bg-elevated text-ink-secondary hover:border-solar-400/30 hover:text-ink-primary"
              )}
            >
              <div className={cn(
                "w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors",
                isSelected ? "border-solar-400 bg-solar-400" : "border-border"
              )}>
                {isSelected && <Check size={10} strokeWidth={3} className="text-void" />}
              </div>
              <span className="text-sm">{subj}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onComplete({ subjects: [...config.mandatory, ...selected] })}
        disabled={!canSubmit}
        className="w-full py-3 rounded-xl bg-solar-400 text-void font-display font-semibold text-sm hover:bg-solar-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Lock Subjects →
      </button>
    </div>
  );
}
