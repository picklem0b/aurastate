import { Context, Next } from "hono";
import { verifyToken } from "../lib/clerk.js";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid authorization header" }, 401);
  }

  const token = authHeader.slice(7);
  const verified = await verifyToken(token);

  if (!verified) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("userId", verified.sub);
  c.set("sessionId", verified.sid);

  await next();
}
