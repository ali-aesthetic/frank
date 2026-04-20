import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { transcript } = await req.json();
  if (!transcript) return NextResponse.json({ error: "No transcript" }, { status: 400 });

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: `You are Frank, a direct and honest personal accountability AI. Classify this brain dump into structured items.

Transcript: "${transcript}"

Return ONLY valid JSON, no explanation:
{
  "items": [
    { "type": "TASK" | "MOOD" | "HABIT", "text": "concise description" }
  ],
  "frank_comment": "One sharp, honest sentence from Frank about what you just heard. Be direct, not mean. Max 20 words."
}`,
    }],
  });

  const raw = (message.content[0] as { type: string; text: string }).text;
  const parsed = JSON.parse(raw);

  // Save brain dump and items
  const { data: dump, error: dumpErr } = await supabase
    .from("brain_dumps")
    .insert({ user_id: user.id, transcript, status: "classified" })
    .select()
    .single();

  if (dumpErr) return NextResponse.json({ error: dumpErr.message }, { status: 500 });

  if (parsed.items?.length) {
    await supabase.from("brain_dump_items").insert(
      parsed.items.map((item: { type: string; text: string }) => ({
        dump_id: dump.id,
        user_id: user.id,
        type: item.type,
        content: item.text,
      }))
    );
  }

  return NextResponse.json({ ...parsed, dump_id: dump.id });
}
