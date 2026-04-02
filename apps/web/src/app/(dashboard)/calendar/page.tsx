import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chronos Calendar" };

export default function CalendarPage() {
  return (
    <section className="p-4 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-primary">
          Chronos
        </h1>
        <p className="text-ink-secondary text-sm mt-1">
          Your predictive study calendar.
        </p>
      </header>
      {/* TODO: ChronosCalendar component */}
      <div className="rounded-xl border border-border bg-surface p-8 text-center text-ink-muted text-sm">
        Calendar engine loading…
      </div>
    </section>
  );
}
