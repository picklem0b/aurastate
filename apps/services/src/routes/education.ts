import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { SocraticRequestSchema } from "@aurastate/shared";
import { chatCompletion } from "../lib/ai.js";
import type { AppEnv } from "../types.js";

const education = new Hono<AppEnv>();

education.post("/socratic/respond", authMiddleware, async (c) => {
  const body = await c.req.json();
  const data = SocraticRequestSchema.parse(body);

  const systemPrompt =
    data.mode === "full_detail"
      ? `You are the AuraState Socratic Interviewer. Your job is to deeply probe a student's understanding of "${data.topic}" in ${data.subject}. Ask ONE focused question at a time. Build on their previous answer. If they are wrong, do not correct — ask a guiding follow-up question. Use real exam-level language. Never give away the answer directly.`
      : `You are the AuraState Exam Prep Interviewer. Your job is to rapidly test key facts about "${data.topic}" in ${data.subject}. Ask ONE short, direct exam-style question. Focus on the most likely exam content. Keep questions under 30 words.`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...data.history.map((m) => ({
      role: m.role === "student" ? ("user" as const) : ("assistant" as const),
      content: m.content,
    })),
    { role: "user" as const, content: data.response },
  ];

  const question = await chatCompletion({
    model: "meta-llama/llama-3-8b-instruct:free",
    messages,
    maxTokens: 256,
    temperature: 0.7,
  });

  return c.json({ question });
});

education.get("/topics/:subjectCode/:grade", authMiddleware, async (c) => {
  const subjectCode = c.req.param("subjectCode");
  const gradeParam = c.req.param("grade");
  const grade = parseInt(gradeParam ?? "10");

  const topics = await prisma.curriculumTopic.findMany({
    where: { subjectCode, grade },
    orderBy: { topicIndex: "asc" },
  });

  return c.json({ topics });
});

education.get("/material/:topicId", authMiddleware, async (c) => {
  const topicId = c.req.param("topicId");

  const material = await prisma.studyMaterial.findUnique({
    where: { id: topicId },
  });

  if (!material) {
    return c.json({ error: "Material not found" }, 404);
  }

  return c.json({
    ...material,
    formulas: JSON.parse(material.formulas),
    examples: JSON.parse(material.examples),
    examTips: JSON.parse(material.examTips),
    pastPaperLinks: JSON.parse(material.pastPaperLinks),
  });
});

export default education;
