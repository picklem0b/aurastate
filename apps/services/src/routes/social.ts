import { Hono } from "hono";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { WarRoomCreateSchema, MessageSendSchema } from "@aurastate/shared";

const social = new Hono();

social.get("/rooms", authMiddleware, async (c) => {
  const rooms = await prisma.warRoom.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
  });

  return c.json({ rooms });
});

social.post("/rooms", authMiddleware, async (c) => {
  const body = await c.req.json();
  const data = WarRoomCreateSchema.parse(body);

  const room = await prisma.warRoom.create({
    data: {
      name: data.name,
      description: data.description,
      subjectCode: data.subjectCode,
      grade: data.grade,
      isPublic: data.isPublic,
    },
  });

  return c.json({ room });
});

social.get("/rooms/:roomId/messages", authMiddleware, async (c) => {
  const roomId = c.req.param("roomId");
  const limit = parseInt(c.req.query("limit") ?? "50");

  const messages = await prisma.warRoomMessage.findMany({
    where: { roomId, deleted: false },
    orderBy: { createdAt: "desc" },
    take: Math.min(limit, 100),
  });

  return c.json({ messages: messages.reverse() });
});

social.post("/rooms/:roomId/messages", authMiddleware, async (c) => {
  const roomId = c.req.param("roomId");
  const userId = c.get("userId") as string;
  const body = await c.req.json();
  const data = MessageSendSchema.parse({ ...body, roomId });

  const message = await prisma.warRoomMessage.create({
    data: {
      roomId: data.roomId,
      userId,
      content: data.content,
      threadId: data.threadId,
    },
  });

  return c.json({ message });
});

export default social;
