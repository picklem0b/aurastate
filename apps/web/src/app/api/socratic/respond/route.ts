import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Proxy to FastAPI backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/socratic/respond`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, clerk_user_id: userId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json({ error: err.detail ?? "Backend error" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
