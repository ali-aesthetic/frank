import { type NextRequest, NextResponse } from "next/server";

/**
 * Supabase auth callback — exchange code for session in feature work.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  return NextResponse.redirect(requestUrl.origin);
}
