"use client";

import { BottomNav } from "@/components/shared/bottom-nav";
import { AuraOverlay } from "@/components/shared/aura-overlay";
import { useAuraEngine } from "@/hooks/use-aura-engine";
import { useFocusIntegrity } from "@/hooks/use-focus-integrity";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auraColor, auraIntensity } = useAuraEngine();
  useFocusIntegrity(); // Mount the global focus watcher

  return (
    <div className="relative min-h-screen bg-void pb-24">
      {/* Global Aura Overlay */}
      <AuraOverlay color={auraColor} intensity={auraIntensity} />

      {/* Page Content */}
      <main className="relative z-10">{children}</main>

      {/* Persistent Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
