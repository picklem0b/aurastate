import { describe, it, expect } from "vitest";
import { buildMasteryTree, updateMastery, getWeakConcepts } from "../services/mastery.js";

describe("Mastery Service", () => {
  const subjectConcepts = {
    MATH: ["Algebra", "Trigonometry", "Calculus"],
  };

  describe("buildMasteryTree", () => {
    it("should initialize concepts at 50% mastery", () => {
      const tree = buildMasteryTree(["MATH"], [], subjectConcepts);
      expect(tree.MATH).toBeDefined();
      expect(tree.MATH.concepts).toHaveLength(3);
      expect(tree.MATH.concepts[0].masteryPct).toBe(50);
    });

    it("should set weak concepts at 20% mastery", () => {
      const tree = buildMasteryTree(["MATH"], ["Algebra"], subjectConcepts);
      const algebra = tree.MATH.concepts.find((c) => c.concept === "Algebra");
      expect(algebra?.masteryPct).toBe(20);
      expect(algebra?.isFlagged).toBe(true);
    });

    it("should calculate overall mastery", () => {
      const tree = buildMasteryTree(["MATH"], [], subjectConcepts);
      expect(tree.MATH.overallMastery).toBe(50);
    });
  });

  describe("updateMastery", () => {
    it("should update mastery with weighted average", () => {
      const tree = buildMasteryTree(["MATH"], [], subjectConcepts);
      const updated = updateMastery(tree, "MATH", "Algebra", 8, 10);
      // 0.3 * 50 + 0.7 * 80 = 15 + 56 = 71
      expect(updated.MATH.concepts[0].masteryPct).toBe(71);
    });

    it("should flag concepts below threshold", () => {
      const tree = buildMasteryTree(["MATH"], [], subjectConcepts);
      const updated = updateMastery(tree, "MATH", "Algebra", 2, 10);
      expect(updated.MATH.concepts[0].isFlagged).toBe(true);
    });
  });

  describe("getWeakConcepts", () => {
    it("should return concepts below threshold", () => {
      const tree = buildMasteryTree(["MATH"], ["Algebra"], subjectConcepts);
      const weak = getWeakConcepts(tree);
      expect(weak).toContain("MATH: Algebra");
    });
  });
});
