import { describe, it, expect } from "vitest";
import { SUBJECTS, REGIONS, GRADES, UI_LANGUAGES, MASTERY_THRESHOLD } from "../constants.js";

describe("Constants", () => {
  it("should have 14 subjects", () => {
    expect(Object.keys(SUBJECTS)).toHaveLength(14);
  });

  it("should have 9 regions", () => {
    expect(Object.keys(REGIONS)).toHaveLength(9);
  });

  it("should have 3 grades", () => {
    expect(GRADES).toEqual([10, 11, 12]);
  });

  it("should have 6 UI languages", () => {
    expect(Object.keys(UI_LANGUAGES)).toHaveLength(6);
  });

  it("should have correct mastery threshold", () => {
    expect(MASTERY_THRESHOLD).toBe(34.85);
  });

  it("should have Western Cape with 4 mandatory subjects", () => {
    expect(REGIONS.ZA_WC.mandatory).toHaveLength(4);
  });
});
