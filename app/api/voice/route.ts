import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Voice STT + classification — not implemented" },
    { status: 501 },
  );
}
