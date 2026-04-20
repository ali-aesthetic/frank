import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Fetch recent context
  const [habits, moods, tasks, patterns] = await Promise.all([
    supabase.from("habit_logs").select("*, habits(name)").eq("user_id", user.id).gte("logged_at", new Date(Date.now() - 7 * 86400000).toISOString()).order("logged_at", { ascending: false }).limit(20),
    supabase.from("mood_logs").select("*").eq("user_id", user.id).gte("created_at", new Date(Date.now() - 3 * 86400000).toISOString()).order("created_at", { ascending: false }).limit(5),
    supabase.from("tasks").select("*").eq("user_id", user.id).eq("status", "pending").limit(10),
    supabase.from("frank_patterns").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
  ]);

  const context = {
    habits: habits.data ?? [],
    moods: moods.data ?? [],
    tasks: tasks.data ?? [],
    patterns: patterns.data ?? [],
  };

  const stream = await anthropic.messages.stream({
    model: "claude-haiku-4-5",
    max_tokens: 600,
    messages: [{
      role: "user",
      content: `You are Frank. Give a sharp morning briefing. Direct, no fluff, a little wit.

User context (last 7 days):
Habits: ${JSON.stringify(context.habits)}
Mood: ${JSON.stringify(context.moods)}
Pending tasks: ${JSON.stringify(context.tasks)}
Known patterns: ${JSON.stringify(context.patterns)}

Write 3-4 sentences. Lead with one honest observation from the data. End with what today should focus on. No greetings, no "Good morning".`,
    }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }

      const finalMsg = await stream.finalMessage();
      const briefingText = finalMsg.content[0].type === "text" ? finalMsg.content[0].text : "";

      await supabase.from("briefings").insert({
        user_id: user.id,
        content: briefingText,
        generated_at: new Date().toISOString(),
      });

      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" },
  });
}
