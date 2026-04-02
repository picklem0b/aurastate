import type { Metadata } from "next";

export const metadata: Metadata = { title: "War Rooms" };

export default function SocialPage() {
  return (
    <section className="p-4 space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink-primary">
          War Rooms
        </h1>
        <p className="text-ink-secondary text-sm mt-1">
          Study together. Win together.
        </p>
      </header>
      {/* TODO: WarRoomsList + ChatInterface */}
      <div className="rounded-xl border border-border bg-surface p-8 text-center text-ink-muted text-sm">
        Social engine loading…
      </div>
    </section>
  );
}
