import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { FocusSessionStartSchema, FocusSessionEndSchema } from "@aurastate/shared";

const focus = new Hono();

focus.post("/session/start", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const body = await c.req.json();
  const data = FocusSessionStartSchema.parse(body);

  const session = await prisma.focusSession.create({
    data: {
      userId,
      subject: data.subject,
      elapsedSecs: 0,
      xpEarned: 0,
      xpLost: 0,
      meltdowns: 0,
      voided: false,
    },
  });

  return c.json({ sessionId: session.id, status: "active" });
});

focus.post("/session/end", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const body = await c.req.json();
  const data = FocusSessionEndSchema.parse(body);

  const session = await prisma.focusSession.update({
    where: { id: data.sessionId },
    data: {
      elapsedSecs: data.elapsedS,
      xpEarned: data.xpEarned,
      xpLost: data.xpLost,
      meltdowns: data.meltdowns,
      voided: data.voided,
      endedAt: new Date(),
    },
  });

  // Update streak if session was valid
  if (!data.voided && data.elapsedS > 0) {
    const today = new Date().toISOString().split("T")[0];
    const streak = await prisma.streak.findUnique({
      where: { userId },
    });

    if (streak) {
      const lastDate = new Date(streak.lastStudyDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      let newStreak = streak.currentStreak;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      await prisma.streak.update({
        where: { userId },
        data: {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, streak.longestStreak),
          lastStudyDate: today,
          totalStudyDays: streak.totalStudyDays + (diffDays >= 1 ? 1 : 0),
        },
      });
    }
  }

  return c.json({
    status: "saved",
    xpNet: data.xpEarned - data.xpLost,
  });
});

focus.get("/sessions", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;

  const sessions = await prisma.focusSession.findMany({
    where: { userId },
    orderBy: { startedAt: "desc" },
    take: 50,
  });

  return c.json({ sessions });
});

export default focus;
