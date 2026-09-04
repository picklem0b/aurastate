import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Dashboard" };

// /dashboard -> /dashboard/calendar (primary landing)
export default function DashboardIndexPage() {
  redirect("/dashboard/calendar");
}
