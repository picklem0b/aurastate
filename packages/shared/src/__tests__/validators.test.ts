import { describe, it, expect } from "vitest";
import { OnboardingSchema, FocusSessionStartSchema, MasteryUpdateSchema } from "../validators.js";

describe("Validators", () => {
  describe("OnboardingSchema", () => {
    it("should validate correct onboarding data", () => {
      const data = {
        region: "ZA_WC",
        province: "WC",
        grade: "12",
        stream: "science",
        subjects: ["MATH", "PHY_SCI", "LIFE_SCI", "ENG_HL", "AFRI_FAL", "ACCT", "LIFE_ORI"],
        goals: ["Pass matric"],
        studyStyle: "visual",
        weakPoints: ["MATH: Algebra"],
        language: "en",
      };
      expect(() => OnboardingSchema.parse(data)).not.toThrow();
    });

    it("should reject invalid region", () => {
      const data = { region: "INVALID", province: "X", grade: "12", stream: "science", subjects: ["MATH"], goals: ["Test"], studyStyle: "visual", weakPoints: [], language: "en" };
      expect(() => OnboardingSchema.parse(data)).toThrow();
    });
  });

  describe("FocusSessionStartSchema", () => {
    it("should validate focus session start", () => {
      const data = { subject: "MATH", plannedDurationMinutes: 60 };
      expect(() => FocusSessionStartSchema.parse(data)).not.toThrow();
    });

    it("should reject duration below 5 minutes", () => {
      const data = { subject: "MATH", plannedDurationMinutes: 3 };
      expect(() => FocusSessionStartSchema.parse(data)).toThrow();
    });
  });

  describe("MasteryUpdateSchema", () => {
    it("should validate mastery update", () => {
      const data = { subject: "MATH", concept: "Algebra", correct: 8, total: 10 };
      expect(() => MasteryUpdateSchema.parse(data)).not.toThrow();
    });
  });
});
