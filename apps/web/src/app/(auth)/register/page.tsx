import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-ink-primary tracking-tight">
          Begin your ascent.
        </h1>
        <p className="mt-2 text-ink-secondary text-sm">
          13 steps to your student operating system.
        </p>
      </div>
      <SignUp
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
