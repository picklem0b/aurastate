"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DynamicSubjectCard } from "@/components/onboarding/dynamic-subject-card";
import { RegionalSelector } from "@/components/onboarding/regional-selector";
import { useUserStore } from "@/store/user-store";

/**
 * The 13-Card Gatekeeper
 * State machine with sequential card progression.
 */
const TOTAL_CARDS = 13;

type OnboardingCard =
  | "welcome"
  | "region"
  | "school"
  | "grade"
  | "stream"
  | "subjects"
  | "goals"
  | "study_style"
  | "weak_points"
  | "focus_mode"
  | "aura_setup"
  | "notification"
  | "complete";

const CARD_ORDER: OnboardingCard[] = [
  "welcome",
  "region",
  "school",
  "grade",
  "stream",
  "subjects",
  "goals",
  "study_style",
  "weak_points",
  "focus_mode",
  "aura_setup",
  "notification",
  "complete",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboardingData } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<Record<string, unknown>>({});

  const currentCard = CARD_ORDER[currentIndex];
  const progress = ((currentIndex + 1) / TOTAL_CARDS) * 100;

  const advance = (cardData?: Record<string, unknown>) => {
    if (cardData) {
      setData((prev) => ({ ...prev, ...cardData }));
    }
    if (currentIndex < TOTAL_CARDS - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setOnboardingData(data);
      router.push("/dashboard/calendar");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Progress Bar */}
      <div className="w-full max-w-sm mb-8">
        <div className="flex justify-between text-xs text-ink-muted mb-2">
          <span>Setup</span>
          <span>{currentIndex + 1} / {TOTAL_CARDS}</span>
        </div>
        <div className="h-1 bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-solar-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card Router */}
      <div className="w-full max-w-sm">
        {currentCard === "region" && (
          <RegionalSelector onComplete={(d) => advance(d)} />
        )}
        {currentCard === "subjects" && (
          <DynamicSubjectCard
            region={data.region as string}
            stream={data.stream as string}
            onComplete={(d) => advance(d)}
          />
        )}
        {!["region", "subjects"].includes(currentCard) && (
          <GenericCard
            card={currentCard}
            index={currentIndex}
            onAdvance={() => advance()}
          />
        )}
      </div>
    </div>
  );
}

function GenericCard({
  card,
  index,
  onAdvance,
}: {
  card: OnboardingCard;
  index: number;
  onAdvance: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8 space-y-6 shadow-panel">
      <div>
        <p className="text-xs font-mono text-solar-400 uppercase tracking-widest">
          Card {index + 1}
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-ink-primary capitalize">
          {card.replace(/_/g, " ")}
        </h2>
      </div>
      <button
        onClick={onAdvance}
        className="w-full py-3 rounded-xl bg-solar-400 text-void font-display font-semibold text-sm hover:bg-solar-300 transition-colors"
      >
        Continue →
      </button>
    </div>
  );
}
