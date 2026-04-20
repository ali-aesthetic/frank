import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { score, note } = await req.json();
  if (typeof score !== "number" || score < 1 || score > 10) {
    return NextResponse.json({ error: "score must be 1-10" }, { status: 400 });
  }

  const { data, error } = await supabase.from("mood_logs").insert({
    user_id: user.id,
    score,
    note: note ?? null,
  }).select().single();

  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json(data);
}
