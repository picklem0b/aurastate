import { describe, it, expect } from "vitest";
import { getStreakInfo, calculateStreakXp, isStreakAtRisk } from "../services/streak.js";

describe("Streak Service", () => {
  describe("getStreakInfo", () => {
    it("should return 1.0x multiplier for new streak", () => {
      const info = getStreakInfo(0, 0, 0);
      expect(info.multiplier).toBe(1.0);
      expect(info.bonusLabel).toBeNull();
    });

    it("should return 1.1x at 3-day streak", () => {
      const info = getStreakInfo(3, 3, 3);
      expect(info.multiplier).toBe(1.1);
      expect(info.bonusLabel).toBe("3-day streak");
    });

    it("should return 2.0x at 30-day streak", () => {
      const info = getStreakInfo(30, 30, 30);
      expect(info.multiplier).toBe(2.0);
      expect(info.bonusLabel).toBe("Monthly master");
    });

    it("should show next milestone", () => {
      const info = getStreakInfo(5, 5, 5);
      expect(info.nextMilestone?.days).toBe(7);
    });
  });

  describe("calculateStreakXp", () => {
    it("should apply multiplier to base XP", () => {
      expect(calculateStreakXp(100, 1.5)).toBe(150);
    });
  });

  describe("isStreakAtRisk", () => {
    it("should detect at-risk streak", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isStreakAtRisk(yesterday.toISOString())).toBe(true);
    });
  });
});
