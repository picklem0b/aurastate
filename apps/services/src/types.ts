import type { Context } from "hono";

/**
 * Typed Hono environment for routes that require authentication.
 * The auth middleware sets `userId` and `sessionId` on the context.
 */
export type AppEnv = {
  Variables: {
    userId: string;
    sessionId: string;
  };
};

/** Convenience type for authenticated Hono context */
export type AuthenticatedContext = Context<AppEnv>;
