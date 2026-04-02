import type { Metadata } from "next";

export const metadata: Metadata = { title: "The Vault" };

export default function EducationPage() {
  return (
    <section className="p-4 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-primary">
          The Vault
        </h1>
        <p className="text-ink-secondary text-sm mt-1">
          Your curriculum. Your pace.
        </p>
      </header>
      {/* TODO: EducationEngine component */}
      <div className="rounded-xl border border-border bg-surface p-8 text-center text-ink-muted text-sm">
        Education engine loading…
      </div>
    </section>
  );
}
