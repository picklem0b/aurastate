import type { Metadata } from "next";

export const metadata: Metadata = { title: "Focus Session" };

export default function FocusPage() {
  return (
    <section className="p-4 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-primary">
          Pulse Focus
        </h1>
        <p className="text-ink-secondary text-sm mt-1">
          Your aura is at stake.
        </p>
      </header>
      {/* TODO: MeltdownTimer + HeartbeatMonitor */}
      <div className="rounded-xl border border-border bg-surface p-8 text-center text-ink-muted text-sm">
        Focus engine loading…
      </div>
    </section>
  );
}
