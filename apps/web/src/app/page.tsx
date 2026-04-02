import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

/**
 * Root: redirect authenticated users to dashboard,
 * unauthenticated to login.
 */
export default async function RootPage() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }
  redirect("/login");
}
