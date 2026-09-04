// ─── Subjects (14 SA core subjects) ──────────────────────
export const SUBJECTS = {
  // Core Academic
  MATH: { code: "MATH", name: "Mathematics", category: "core" as const },
  MATHS_LIT: { code: "MATHS_LIT", name: "Mathematical Literacy", category: "core" as const },
  PHY_SCI: { code: "PHY_SCI", name: "Physical Sciences", category: "core" as const },
  LIFE_SCI: { code: "LIFE_SCI", name: "Life Sciences", category: "core" as const },

  // Languages
  ENG_HL: { code: "ENG_HL", name: "English Home Language", category: "language" as const },
  ENG_FAL: { code: "ENG_FAL", name: "English First Additional Language", category: "language" as const },
  AFRI_HL: { code: "AFRI_HL", name: "Afrikaans Home Language", category: "language" as const },
  AFRI_FAL: { code: "AFRI_FAL", name: "Afrikaans First Additional Language", category: "language" as const },

  // Commerce
  ACCT: { code: "ACCT", name: "Accounting", category: "commerce" as const },
  BIZ_STUD: { code: "BIZ_STUD", name: "Business Studies", category: "commerce" as const },
  ECON: { code: "ECON", name: "Economics", category: "commerce" as const },

  // Humanities
  GEOG: { code: "GEOG", name: "Geography", category: "humanities" as const },
  HIST: { code: "HIST", name: "History", category: "humanities" as const },

  // Compulsory
  LIFE_ORI: { code: "LIFE_ORI", name: "Life Orientation", category: "compulsory" as const },
} as const;

export type SubjectCode = keyof typeof SUBJECTS;

// ─── Grades ──────────────────────────────────────────────
export const GRADES = [10, 11, 12] as const;
export type Grade = (typeof GRADES)[number];

// ─── Regions (South Africa) ──────────────────────────────
export const REGIONS = {
  ZA_WC: {
    code: "ZA_WC",
    name: "Western Cape",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL", "AFRI_FAL"] as SubjectCode[],
    electivesLimit: 3,
    boards: ["CAPS", "IEB"],
    languages: ["en", "af", "xh"],
  },
  ZA_GP: {
    code: "ZA_GP",
    name: "Gauteng",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL"] as SubjectCode[],
    electivesLimit: 4,
    boards: ["CAPS", "IEB"],
    languages: ["en", "af", "zu"],
  },
  ZA_KZN: {
    code: "ZA_KZN",
    name: "KwaZulu-Natal",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL"] as SubjectCode[],
    electivesLimit: 4,
    boards: ["CAPS"],
    languages: ["en", "zu"],
  },
  ZA_EC: {
    code: "ZA_EC",
    name: "Eastern Cape",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL"] as SubjectCode[],
    electivesLimit: 4,
    boards: ["CAPS"],
    languages: ["en", "xh", "af"],
  },
  ZA_FS: {
    code: "ZA_FS",
    name: "Free State",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL"] as SubjectCode[],
    electivesLimit: 4,
    boards: ["CAPS"],
    languages: ["en", "af", "st"],
  },
  ZA_LP: {
    code: "ZA_LP",
    name: "Limpopo",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL"] as SubjectCode[],
    electivesLimit: 4,
    boards: ["CAPS"],
    languages: ["en", "zu", "st"],
  },
  ZA_MP: {
    code: "ZA_MP",
    name: "Mpumalanga",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL"] as SubjectCode[],
    electivesLimit: 4,
    boards: ["CAPS"],
    languages: ["en", "zu"],
  },
  ZA_NW: {
    code: "ZA_NW",
    name: "North West",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL"] as SubjectCode[],
    electivesLimit: 4,
    boards: ["CAPS"],
    languages: ["en", "tn", "af"],
  },
  ZA_NC: {
    code: "ZA_NC",
    name: "Northern Cape",
    country: "South Africa",
    mandatory: ["LIFE_ORI", "MATH", "ENG_HL"] as SubjectCode[],
    electivesLimit: 4,
    boards: ["CAPS"],
    languages: ["en", "af"],
  },
} as const;

export type RegionCode = keyof typeof REGIONS;

// ─── Languages (UI) ──────────────────────────────────────
export const UI_LANGUAGES = {
  en: { code: "en", name: "English", nativeName: "English" },
  af: { code: "af", name: "Afrikaans", nativeName: "Afrikaans" },
  zu: { code: "zu", name: "isiZulu", nativeName: "isiZulu" },
  xh: { code: "xh", name: "isiXhosa", nativeName: "isiXhosa" },
  st: { code: "st", name: "Sesotho", nativeName: "Sesotho" },
  tn: { code: "tn", name: "Setswana", nativeName: "Setswana" },
} as const;

export type UILanguageCode = keyof typeof UI_LANGUAGES;

// ─── Mastery Threshold ───────────────────────────────────
export const MASTERY_THRESHOLD = 34.85;

// ─── Focus Engine ────────────────────────────────────────
export const FOCUS_CONFIG = {
  GRACE_PERIOD_S: 10,
  VOID_THRESHOLD_S: 600,
  XP_PER_LEVEL: 1000,
  XP_PER_MINUTE: 10,
  MELTDOWN_XP_DECAY_BASE: 1,
  MELTDOWN_XP_DECAY_MULTIPLIER: 1.5,
} as const;

// ─── Streak Bonuses ──────────────────────────────────────
export const STREAK_BONUSES = {
  3: { multiplier: 1.1, label: "3-day streak" },
  7: { multiplier: 1.25, label: "Week warrior" },
  14: { multiplier: 1.5, label: "Fortnight fighter" },
  30: { multiplier: 2.0, label: "Monthly master" },
  60: { multiplier: 2.5, label: "Unstoppable" },
  100: { multiplier: 3.0, label: "Century club" },
} as const;

// ─── Aura Colors ─────────────────────────────────────────
export const AURA_COLORS = {
  idle: "#4F8EF7",
  active: "#FFC200",
  melting: "#EF4444",
  mastery: "#10B981",
  voided: "#55556A",
} as const;
