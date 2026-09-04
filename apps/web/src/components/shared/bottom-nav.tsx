"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  BookOpen,
  Users,
  Settings2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SolarIcon } from "@/components/branding/solar-icon";

type NavItem =
  | { href: string; label: string; Icon: LucideIcon; isBrand?: false }
  | { href: string; label: string; Icon: null; isBrand: true };

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard/calendar", label: "Chronos", Icon: CalendarDays },
  { href: "/dashboard/education", label: "Vault",   Icon: BookOpen },
  { href: "/dashboard",          label: "",         Icon: null, isBrand: true },
  { href: "/dashboard/social",   label: "Rooms",    Icon: Users },
  { href: "/dashboard/settings", label: "Config",   Icon: Settings2 },
];

/**
 * AuraState Bottom Navigation
 * 5-tab persistent nav with solar brand center-piece.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-around px-2 py-2 border-t border-border"
      style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(20px)" }}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        if (item.isBrand) {
          return (
            <Link
              key="brand"
              href="/dashboard/focus"
              className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-solar-400/10 border border-solar-400/20 hover:bg-solar-400/20 transition-colors -mt-4 shadow-aura-solar"
              aria-label="Focus Session"
            >
              <SolarIcon size={22} glowing />
            </Link>
          );
        }

        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors min-w-[52px]",
              isActive ? "text-solar-400" : "text-ink-muted hover:text-ink-secondary"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.Icon && (
              <item.Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
                className="transition-all duration-150"
              />
            )}
            <span className="text-[10px] font-mono tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
