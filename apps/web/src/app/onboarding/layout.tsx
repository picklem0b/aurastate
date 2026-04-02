export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-void relative overflow-hidden">
      {/* Deep space radiance */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,142,247,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
