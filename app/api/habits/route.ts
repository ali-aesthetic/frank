import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().split("T")[0];
  const { data: habits } = await supabase
    .from("habits")
    .select("*, habit_logs(logged_at)")
    .eq("user_id", user.id)
    .eq("is_active", true);

  const withStatus = (habits ?? []).map((h) => ({
    ...h,
    done_today: h.habit_logs?.some((l: { logged_at: string }) => l.logged_at.startsWith(today)) ?? false,
    habit_logs: undefined,
  }));

  return NextResponse.json(withStatus);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { action, habit_id, name, frequency } = body;

  if (action === "log") {
    const { error } = await supabase.from("habit_logs").insert({
      user_id: user.id,
      habit_id,
      logged_at: new Date().toISOString(),
    });
    return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json({ ok: true });
  }

  if (action === "create") {
    const { data, error } = await supabase.from("habits").insert({
      user_id: user.id,
      name,
      frequency: frequency ?? "daily",
    }).select().single();
    return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json(data);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
