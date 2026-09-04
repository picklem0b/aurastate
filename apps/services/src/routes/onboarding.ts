import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { OnboardingSchema } from "@aurastate/shared";
import { REGIONS } from "@aurastate/shared";
import type { AppEnv } from "../types.js";

const onboarding = new Hono<AppEnv>();

onboarding.get("/region/:regionCode", async (c) => {
  const regionCode = c.req.param("regionCode");
  const config = REGIONS[regionCode as keyof typeof REGIONS];

  if (!config) {
    return c.json({ error: "Region not found" }, 404);
  }

  return c.json({ config });
});

onboarding.post("/complete", authMiddleware, async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const data = OnboardingSchema.parse(body);

  // Update user profile
  await prisma.user.update({
    where: { clerkId: userId },
    data: {
      region: data.region,
      province: data.province,
      grade: parseInt(data.grade),
      stream: data.stream,
      language: data.language,
      isOnboarded: true,
    },
  });

  // Create user subjects
  const regionConfig = REGIONS[data.region as keyof typeof REGIONS];
  const subjectPromises = data.subjects.map((subjectCode) =>
    prisma.userSubject.upsert({
      where: {
        userId_subjectCode: { userId, subjectCode },
      },
      update: {},
      create: {
        userId,
        subjectCode,
        subjectName: subjectCode,
        isMandatory: regionConfig?.mandatory.includes(subjectCode as any) ?? false,
      },
    })
  );

  await Promise.all(subjectPromises);

  // Create weak points
  if (data.weakPoints.length > 0) {
    await prisma.weakPoint.createMany({
      data: data.weakPoints.map((wp) => ({
        userId,
        subject: wp.split(":")[0] ?? "",
        concept: wp.split(":")[1] ?? wp,
        masteryPct: 20,
      })),
    });
  }

  // Initialize streak
  await prisma.streak.create({
    data: {
      userId,
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: new Date().toISOString().split("T")[0],
      totalStudyDays: 0,
    },
  });

  return c.json({ status: "onboarded" });
});

export default onboarding;
