import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { MasteryUpdateSchema } from "@aurastate/shared";
import type { AppEnv } from "../types.js";

const mastery = new Hono<AppEnv>();

mastery.get("/tree", authMiddleware, async (c) => {
  const userId = c.get("userId");

  const subjects = await prisma.userSubject.findMany({
    where: { userId },
  });

  const weakPoints = await prisma.weakPoint.findMany({
    where: { userId, resolved: false },
  });

  return c.json({
    subjects: subjects.map((s) => ({
      code: s.subjectCode,
      name: s.subjectName,
      masteryPct: s.masteryPct,
      isMandatory: s.isMandatory,
    })),
    weakPoints: weakPoints.map((w) => ({
      subject: w.subject,
      concept: w.concept,
      masteryPct: w.masteryPct,
    })),
  });
});

mastery.post("/update", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const data = MasteryUpdateSchema.parse(body);

  // Update subject mastery
  const subject = await prisma.userSubject.findFirst({
    where: { userId, subjectCode: data.subject },
  });

  if (!subject) {
    return c.json({ error: "Subject not found" }, 404);
  }

  const newPct = data.total > 0 ? (data.correct / data.total) * 100 : 0;
  const updatedPct = Math.round((0.3 * subject.masteryPct + 0.7 * newPct) * 100) / 100;

  await prisma.userSubject.update({
    where: { id: subject.id },
    data: { masteryPct: updatedPct },
  });

  // Check if concept should be flagged as weak
  const MASTERY_THRESHOLD = 34.85;
  if (updatedPct < MASTERY_THRESHOLD) {
    // Find existing weak point or create new one
    const existing = await prisma.weakPoint.findFirst({
      where: { userId, subject: data.subject, concept: data.concept },
    });

    if (existing) {
      await prisma.weakPoint.update({
        where: { id: existing.id },
        data: { masteryPct: updatedPct },
      });
    } else {
      await prisma.weakPoint.create({
        data: {
          userId,
          subject: data.subject,
          concept: data.concept,
          masteryPct: updatedPct,
        },
      });
    }
  } else {
    // Resolve weak point if above threshold
    await prisma.weakPoint
      .deleteMany({
        where: {
          userId,
          subject: data.subject,
          concept: data.concept,
        },
      })
      .catch(() => {}); // Ignore if not found
  }

  return c.json({
    subject: data.subject,
    newMasteryPct: updatedPct,
    isWeak: updatedPct < MASTERY_THRESHOLD,
  });
});

export default mastery;
