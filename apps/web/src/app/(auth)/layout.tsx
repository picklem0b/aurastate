export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-void flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient solar radiance */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,194,0,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="w-full max-w-md relative z-10">{children}</div>
    </main>
  );
}
