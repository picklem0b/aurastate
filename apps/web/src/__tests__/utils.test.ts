import { describe, it, expect } from "vitest";
import { formatDuration, MASTERY_THRESHOLD, isBelowMastery } from "../lib/utils.js";

describe("Web Utils", () => {
  describe("formatDuration", () => {
    it("should format seconds to MM:SS", () => {
      expect(formatDuration(65)).toBe("01:05");
    });

    it("should format hours to HH:MM:SS", () => {
      expect(formatDuration(3661)).toBe("01:01:01");
    });

    it("should handle zero", () => {
      expect(formatDuration(0)).toBe("00:00");
    });
  });

  describe("MASTERY_THRESHOLD", () => {
    it("should be 34.85", () => {
      expect(MASTERY_THRESHOLD).toBe(34.85);
    });
  });

  describe("isBelowMastery", () => {
    it("should return true below threshold", () => {
      expect(isBelowMastery(30)).toBe(true);
    });

    it("should return false above threshold", () => {
      expect(isBelowMastery(50)).toBe(false);
    });
  });
});
