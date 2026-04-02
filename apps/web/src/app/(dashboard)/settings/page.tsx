import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <section className="p-4 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-primary">
          Settings
        </h1>
        <p className="text-ink-secondary text-sm mt-1">
          Full control. No compromises.
        </p>
      </header>
    </section>
  );
}
