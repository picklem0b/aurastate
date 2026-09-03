import { z } from "zod";
import { SUBJECTS, REGIONS, GRADES, UI_LANGUAGES } from "./constants";

// ─── Onboarding ──────────────────────────────────────────
export const OnboardingSchema = z.object({
  region: z.enum(Object.keys(REGIONS) as [string, ...string[]]),
  province: z.string().min(2).max(4),
  grade: z.enum(GRADES.map(String) as [string, ...string[]]),
  stream: z.enum(["science", "commerce", "humanities"]),
  subjects: z.array(z.string()).min(3).max(7),
  goals: z.array(z.string()).min(1),
  studyStyle: z.enum(["visual", "auditory", "reading", "kinesthetic"]),
  weakPoints: z.array(z.string()),
  language: z.enum(Object.keys(UI_LANGUAGES) as [string, ...string[]]),
});

export type OnboardingInput = z.infer<typeof OnboardingSchema>;

// ─── Focus Session ───────────────────────────────────────
export const FocusSessionStartSchema = z.object({
  subject: z.string().min(1),
  plannedDurationMinutes: z.number().int().min(5).max(480),
});

export const FocusSessionEndSchema = z.object({
  sessionId: z.string().uuid(),
  elapsedS: z.number().int().min(0),
  xpEarned: z.number().int().min(0),
  xpLost: z.number().int().min(0),
  meltdowns: z.number().int().min(0),
  voided: z.boolean(),
});

// ─── Education ───────────────────────────────────────────
export const SocraticRequestSchema = z.object({
  topic: z.string().min(1),
  subject: z.string().min(1),
  mode: z.enum(["full_detail", "exam_summary"]),
  history: z.array(
    z.object({
      role: z.enum(["interviewer", "student"]),
      content: z.string(),
    })
  ),
  response: z.string().min(1),
});

export const QuizSubmissionSchema = z.object({
  subject: z.string().min(1),
  topic: z.string().min(1),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedIndex: z.number().int().min(0),
    })
  ),
});

// ─── Social ──────────────────────────────────────────────
export const WarRoomCreateSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  subjectCode: z.string().optional(),
  grade: z.number().int().min(10).max(12).optional(),
  isPublic: z.boolean().default(true),
});

export const MessageSendSchema = z.object({
  roomId: z.string(),
  content: z.string().min(1).max(2000),
  threadId: z.string().optional(),
});

// ─── User ────────────────────────────────────────────────
export const UserUpdateSchema = z.object({
  fullName: z.string().min(1).max(255).optional(),
  username: z.string().min(3).max(64).optional(),
  language: z.enum(Object.keys(UI_LANGUAGES) as [string, ...string[]]).optional(),
  auraColor: z.enum(["blue", "purple", "green", "solar"]).optional(),
});

// ─── Mastery ─────────────────────────────────────────────
export const MasteryUpdateSchema = z.object({
  subject: z.string().min(1),
  concept: z.string().min(1),
  correct: z.number().int().min(0),
  total: z.number().int().min(1),
});

// ─── Flashcard ───────────────────────────────────────────
export const FlashcardGenerateSchema = z.object({
  topicId: z.string(),
  count: z.number().int().min(1).max(20).default(5),
});
