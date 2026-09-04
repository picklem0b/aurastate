import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
import { Toaster } from "sonner";
import "@/lib/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s · AuraState",
    default: "AuraState — The Student Operating System",
  },
  description:
    "The definitive academic productivity platform for South African students. Predictive calendars, AI-powered study sessions, and gamified focus.",
  keywords: ["study", "matric", "CAPS", "IEB", "South Africa", "student productivity"],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFC200",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&family=Barlow+Condensed:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-void font-body text-ink-primary antialiased">
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-ink-primary)",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
