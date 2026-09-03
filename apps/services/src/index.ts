import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import { errorHandler } from "./middleware/error-handler.js";

import auth from "./routes/auth.js";
import onboarding from "./routes/onboarding.js";
import calendar from "./routes/calendar.js";
import education from "./routes/education.js";
import focus from "./routes/focus.js";
import mastery from "./routes/mastery.js";
import social from "./routes/social.js";

const app = new Hono();

// ── Middleware ────────────────────────────────────────────
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") ?? ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("*", errorHandler);

// ── Health ───────────────────────────────────────────────
app.get("/health", (c) =>
  c.json({ status: "ok", version: "1.0.0-alpha", service: "aurastate-services" })
);

// ── Routes ───────────────────────────────────────────────
app.route("/auth", auth);
app.route("/onboarding", onboarding);
app.route("/calendar", calendar);
app.route("/education", education);
app.route("/focus", focus);
app.route("/mastery", mastery);
app.route("/social", social);

// ── Start ────────────────────────────────────────────────
const port = parseInt(process.env.PORT ?? "4000");

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`AuraState Services running on http://localhost:${info.port}`);
});

export default app;
