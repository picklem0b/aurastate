import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";

const auth = new Hono();

auth.get("/me", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ user });
});

auth.post("/sync", authMiddleware, async (c) => {
  const userId = c.get("userId") as string;
  const body = await c.req.json();

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      fullName: body.fullName,
      email: body.email,
      username: body.username,
    },
    create: {
      clerkId: userId,
      email: body.email,
      username: body.username,
      fullName: body.fullName,
    },
  });

  return c.json({ user });
});

export default auth;
