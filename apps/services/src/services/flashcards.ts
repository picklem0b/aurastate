import { chatCompletion, FREE_MODELS } from "../lib/ai.js";

interface GeneratedFlashcard {
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

export async function generateFlashcards(
  topicName: string,
  subjectName: string,
  count: number = 5
): Promise<GeneratedFlashcard[]> {
  const prompt = `Generate exactly ${count} study flashcards for "${topicName}" in ${subjectName}.

Format your response as a JSON array. Each flashcard should have:
- "front": A question or term (concise, exam-focused)
- "back": The answer or definition (clear, accurate)
- "difficulty": "easy", "medium", or "hard"

Focus on:
- Key definitions and formulas
- Common exam questions
- Concepts students often confuse

Return ONLY the JSON array, no other text. Example:
[{"front": "What is X?", "back": "X is...", "difficulty": "easy"}]`;

  const response = await chatCompletion({
    model: FREE_MODELS.flashcards,
    messages: [
      { role: "system", content: "You are an expert South African curriculum tutor. Generate exam-focused study material." },
      { role: "user", content: prompt },
    ],
    maxTokens: 1024,
    temperature: 0.7,
  });

  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonStr = response.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    const cards = JSON.parse(jsonStr);

    if (Array.isArray(cards)) {
      return cards.slice(0, count).map((card) => ({
        front: String(card.front ?? ""),
        back: String(card.back ?? ""),
        difficulty: ["easy", "medium", "hard"].includes(card.difficulty)
          ? card.difficulty
          : "medium",
      }));
    }
  } catch {
    // Fallback: return basic card
    return [
      {
        front: `What is ${topicName}?`,
        back: `Study material for ${topicName} in ${subjectName}`,
        difficulty: "medium" as const,
      },
    ];
  }

  return [];
}
