import { verifyToken as clerkVerifyToken } from "@clerk/backend";

/** Shape of a verified Clerk JWT payload (subset we use) */
export interface VerifiedToken {
  sub: string;
  sid: string;
  [key: string]: unknown;
}

export async function verifyToken(token: string): Promise<VerifiedToken | null> {
  try {
    const result = await clerkVerifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    if (result.data) {
      return result.data as VerifiedToken;
    }
    return null;
  } catch {
    return null;
  }
}
