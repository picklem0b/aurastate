import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight">
          Welcome back.
        </h1>
        <p className="mt-2 text-ink-secondary text-sm">
          Your aura continues where you left off.
        </p>
      </div>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#FFC200",
            colorBackground: "#1A1A24",
            colorText: "#F0F0F8",
            colorTextSecondary: "#9090A8",
            colorInputBackground: "#22222F",
            colorInputText: "#F0F0F8",
            borderRadius: "0.5rem",
          },
        }}
      />
    </div>
  );
}
