import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Morning briefing — not implemented" },
    { status: 501 },
  );
}
