"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Brain, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  concept: string;
}

interface QuizGeneratorProps {
  questions: Question[];
  subject: string;
  onComplete?: (results: { score: number; weakConcepts: string[] }) => void;
}

type QuizState = "idle" | "active" | "reviewing" | "complete";

/**
 * AuraState Adaptive Quiz Engine
 * Tracks weak concepts and feeds them to the mastery algorithm.
 */
export function QuizGenerator({ questions, subject, onComplete }: QuizGeneratorProps) {
  const [state, setState] = useState<QuizState>("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const question = questions[currentQ];
  const isCorrect = selected === question?.correctIndex;
  const score = Object.entries(answers).filter(
    ([id, ans]) => ans === questions.find((q) => q.id === id)?.correctIndex
  ).length;

  const choose = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    setAnswers((prev) => ({ ...prev, [question.id]: idx }));
  };

  const next = () => {
    setSelected(null);
    setRevealed(false);
    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1);
    } else {
      setState("complete");
      const weakConcepts = questions
        .filter((q) => answers[q.id] !== q.correctIndex)
        .map((q) => q.concept);
      onComplete?.({ score, weakConcepts });
    }
  };

  if (state === "idle") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center space-y-4">
        <Brain size={32} className="mx-auto text-solar-400" />
        <div>
          <h3 className="font-display text-lg font-bold text-ink-primary">{subject} Quiz</h3>
          <p className="text-sm text-ink-secondary mt-1">{questions.length} questions · Adaptive</p>
        </div>
        <button
          onClick={() => setState("active")}
          className="w-full py-3 rounded-xl bg-solar-400 text-void font-display font-semibold text-sm hover:bg-solar-300 transition-colors"
        >
          Begin Quiz
        </button>
      </div>
    );
  }

  if (state === "complete") {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 space-y-4">
        <div className="text-center">
          <p className="font-mono text-xs text-solar-400 uppercase tracking-widest">Result</p>
          <p className="font-display text-5xl font-bold text-ink-primary mt-2">{pct}%</p>
          <p className="text-sm text-ink-secondary mt-1">
            {score} / {questions.length} correct
          </p>
          {pct < 34.85 && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-aura-red/10 border border-aura-red/30 text-xs text-aura-red">
              ⚠ Below mastery threshold. Review sprints injected into Chronos.
            </div>
          )}
        </div>
        <button
          onClick={() => {
            setCurrentQ(0);
            setAnswers({});
            setState("idle");
          }}
          className="w-full py-3 rounded-xl border border-border text-ink-secondary flex items-center justify-center gap-2 hover:text-ink-primary transition-colors"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex justify-between text-xs text-ink-muted font-mono">
        <span>Question {currentQ + 1} / {questions.length}</span>
        <span>{subject}</span>
      </div>
      <div className="h-0.5 bg-elevated rounded-full">
        <div
          className="h-full bg-solar-400 rounded-full transition-all duration-300"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
        <p className="font-display text-base font-semibold text-ink-primary leading-snug">
          {question.prompt}
        </p>

        <div className="space-y-2">
          {question.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isRight = revealed && idx === question.correctIndex;
            const isWrong = revealed && isSelected && !isRight;

            return (
              <button
                key={idx}
                onClick={() => choose(idx)}
                className={cn(
                  "w-full text-left rounded-xl border px-4 py-3 text-sm transition-all duration-200",
                  !revealed && "border-border bg-elevated hover:border-solar-400/50 hover:bg-surface text-ink-secondary hover:text-ink-primary",
                  isRight && "border-aura-green bg-aura-green/10 text-aura-green",
                  isWrong && "border-aura-red bg-aura-red/10 text-aura-red",
                  revealed && !isSelected && idx !== question.correctIndex && "opacity-40 border-border bg-elevated text-ink-muted"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs opacity-60">{String.fromCharCode(65 + idx)}</span>
                  {opt}
                  {isRight && <CheckCircle2 size={14} className="ml-auto" />}
                  {isWrong && <XCircle size={14} className="ml-auto" />}
                </span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-ink-secondary">{question.explanation}</p>
            <button
              onClick={next}
              className="mt-3 w-full py-2.5 rounded-xl bg-solar-400 text-void font-display font-semibold text-sm hover:bg-solar-300 transition-colors"
            >
              {currentQ < questions.length - 1 ? "Next Question →" : "See Results →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
