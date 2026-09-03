import { Context, Next } from "hono";
import { ZodError } from "zod";

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    console.error(`[Error] ${c.req.method} ${c.req.path}:`, err);

    if (err instanceof ZodError) {
      return c.json(
        {
          error: "Validation error",
          details: err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        400
      );
    }

    if (err instanceof Error) {
      if (err.message.includes("not found") || err.message.includes("Not found")) {
        return c.json({ error: err.message }, 404);
      }
      return c.json({ error: err.message }, 500);
    }

    return c.json({ error: "Internal server error" }, 500);
  }
}
