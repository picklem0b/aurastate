import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { generateSchedule } from "../services/scheduler.js";
import type { AppEnv } from "../types.js";

const calendar = new Hono<AppEnv>();

calendar.get("/schedule", authMiddleware, async (c) => {
  const userId = c.get("userId");

  const subjects = await prisma.userSubject.findMany({
    where: { userId },
  });

  const examDates: { subject: string; date: string }[] = [];

  const blocks = generateSchedule({
    subjects: subjects.map((s) => ({
      code: s.subjectCode,
      masteryPct: s.masteryPct,
      weakConcepts: [],
    })),
    examDates,
    studyStyle: "reading",
    availableHoursPerDay: 4,
    startDate: new Date().toISOString().split("T")[0],
  });

  return c.json({ blocks });
});

calendar.post("/generate", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json().catch(() => ({}));

  const subjects = await prisma.userSubject.findMany({
    where: { userId },
  });

  const blocks = generateSchedule({
    subjects: subjects.map((s) => ({
      code: s.subjectCode,
      masteryPct: s.masteryPct,
      weakConcepts: [],
    })),
    examDates: body.examDates ?? [],
    studyStyle: body.studyStyle ?? "reading",
    availableHoursPerDay: body.availableHoursPerDay ?? 4,
    startDate: new Date().toISOString().split("T")[0],
  });

  return c.json({ blocks, generatedAt: new Date().toISOString() });
});

export default calendar;
