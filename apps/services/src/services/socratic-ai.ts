import { chatCompletion, FREE_MODELS } from "../lib/ai.js";

interface HistoryEntry {
  role: "interviewer" | "student";
  content: string;
}

const SYSTEM_PROMPTS = {
  full_detail: `You are the AuraState Socratic Interviewer. Your job is to deeply probe a student's understanding of a topic through targeted questions.
- Ask ONE focused question at a time.
- Build on their previous answer.
- If they are wrong, do not correct — ask a guiding follow-up question.
- Use real exam-level language for the subject.
- Never give away the answer directly.
- Keep responses under 100 words.`,

  exam_summary: `You are the AuraState Exam Prep Interviewer. Your job is to rapidly test key facts and definitions.
- Ask ONE short, direct exam-style question.
- Focus on the most likely exam content.
- Keep questions under 30 words.
- Be direct and concise.`,
} as const;

export async function generateSocraticQuestion(
  topic: string,
  subject: string,
  mode: "full_detail" | "exam_summary",
  history: HistoryEntry[],
  studentResponse: string
): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[mode];

  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...history.map((m) => ({
      role: m.role === "student" ? ("user" as const) : ("assistant" as const),
      content: m.content,
    })),
    {
      role: "user" as const,
      content: `[Topic: ${topic} | Subject: ${subject}]\nStudent: ${studentResponse}`,
    },
  ];

  const question = await chatCompletion({
    model: FREE_MODELS.socratic,
    messages,
    maxTokens: 256,
    temperature: 0.7,
  });

  return question;
}
