// ─── User ─────────────────────────────────────────────────
export interface User {
  id: string;
  clerkId: string;
  email: string;
  username: string;
  fullName: string;
  region: string;
  province: string;
  grade: number;
  stream: "science" | "commerce" | "humanities";
  language: string;
  isOnboarded: boolean;
  auraColor: "blue" | "purple" | "green" | "solar";
  createdAt: Date;
  updatedAt: Date;
}

// ─── Subjects ─────────────────────────────────────────────
export interface UserSubject {
  id: string;
  userId: string;
  subjectCode: string;
  subjectName: string;
  masteryPct: number;
  isMandatory: boolean;
  createdAt: Date;
}

export interface WeakPoint {
  id: string;
  userId: string;
  subject: string;
  concept: string;
  masteryPct: number;
  flaggedAt: Date;
  resolved: boolean;
}

// ─── Focus Sessions ──────────────────────────────────────
export interface FocusSession {
  id: string;
  userId: string;
  subject: string;
  elapsedSecs: number;
  xpEarned: number;
  xpLost: number;
  meltdowns: number;
  voided: boolean;
  startedAt: Date;
  endedAt?: Date;
}

// ─── Streaks ─────────────────────────────────────────────
export interface Streak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string; // YYYY-MM-DD
  totalStudyDays: number;
  updatedAt: Date;
}

// ─── Curriculum ───────────────────────────────────────────
export interface CurriculumTopic {
  id: string;
  subjectCode: string;
  grade: number;
  topicName: string;
  topicIndex: number;
  examWeight: number;
  description: string;
}

export interface StudyMaterial {
  id: string;
  topicId: string;
  title: string;
  summary: string;
  formulas: string[];
  examples: string[];
  examTips: string[];
  difficultyRating: number; // 1-5 average from community
  pastPaperLinks: PastPaperLink[];
}

export interface PastPaperLink {
  year: number;
  examType: "june" | "november" | "february-march" | "trial";
  url: string;
}

// ─── Study Progress ──────────────────────────────────────
export interface StudyProgress {
  id: string;
  userId: string;
  topicId: string;
  completed: boolean;
  quizScore?: number;
  lastStudied: Date;
}

// ─── Social / War Rooms ──────────────────────────────────
export interface WarRoom {
  id: string;
  name: string;
  description?: string;
  subjectCode?: string;
  grade?: number;
  isPublic: boolean;
  memberCount: number;
  createdAt: Date;
}

export interface WarRoomMessage {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  threadId?: string;
  createdAt: Date;
  editedAt?: Date;
  deleted: boolean;
}

// ─── Flashcards ──────────────────────────────────────────
export interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: Date;
}

// ─── Quiz ────────────────────────────────────────────────
export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  concept: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  subject: string;
  topic: string;
  score: number;
  total: number;
  masteryPct: number;
  weakConcepts: string[];
  takenAt: Date;
}

// ─── API Responses ───────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}
