import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

  const [habits, latestMood, latestBriefing, recentTasks] = await Promise.all([
    supabase.from("habits").select("*, habit_logs(logged_at)").eq("user_id", user.id).eq("is_active", true),
    supabase.from("mood_logs").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single(),
    supabase.from("briefings").select("*").eq("user_id", user.id).order("generated_at", { ascending: false }).limit(1).single(),
    supabase.from("tasks").select("*").eq("user_id", user.id).eq("status", "pending").limit(5),
  ]);

  const habitsWithStatus = (habits.data ?? []).map((h) => ({
    id: h.id,
    name: h.name,
    done_today: h.habit_logs?.some((l: { logged_at: string }) => l.logged_at.startsWith(today)) ?? false,
  }));

  const weekHabitLogs = await supabase
    .from("habit_logs")
    .select("logged_at")
    .eq("user_id", user.id)
    .gte("logged_at", weekAgo);

  return NextResponse.json({
    habits: habitsWithStatus,
    habit_streak: weekHabitLogs.data?.length ?? 0,
    mood: latestMood.data ?? null,
    briefing: latestBriefing.data ?? null,
    tasks: recentTasks.data ?? [],
  });
}
