import { Clerk } from "@clerk/backend";

const clerk = new Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export { clerk };

export async function verifyToken(token: string) {
  try {
    const verified = await clerk.verifyToken(token);
    return verified;
  } catch {
    return null;
  }
}
