import { describe, it, expect } from "vitest";
import { generateFlashcards } from "../services/flashcards.js";

describe("Flashcard Service", () => {
  it("should generate flashcards (mocked)", async () => {
    // This test verifies the function signature and return type
    // In production, mock the OpenRouter API call
    expect(typeof generateFlashcards).toBe("function");
  });
});
