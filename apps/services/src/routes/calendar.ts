import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { generateSchedule } from "../services/scheduler.js";

const calendar = new Hono();

calendar.get("/schedule", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;

  // Get user's subjects with mastery data
  const subjects = await prisma.userSubject.findMany({
    where: { userId },
  });

  // TODO: Get exam dates from curriculum data
  const examDates: { subject: string; date: string }[] = [];

  const blocks = generateSchedule({
    subjects: subjects.map((s) => ({
      code: s.subjectCode,
      masteryPct: s.masteryPct,
      weakConcepts: [], // TODO: fetch from weak_points
    })),
    examDates,
    studyStyle: "reading",
    availableHoursPerDay: 4,
    startDate: new Date().toISOString().split("T")[0],
  });

  return c.json({ blocks });
});

calendar.post("/generate", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
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
