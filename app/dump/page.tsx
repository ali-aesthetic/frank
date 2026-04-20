"use client";

import { useEffect, useState } from "react";

import { DS, FrankBubble, PrimaryBtn, ScreenShell } from "@/components/ui/frank-ui";

const TRANSCRIPT = "I need to reply to Nitin's email about the assignment. Also I've been feeling really overwhelmed with—";
const CLASSIFIED = [
  { type: "TASK", text: "Reply to Nitin's email about the assignment" },
  { type: "MOOD", text: "Feeling overwhelmed with deadlines" },
  { type: "HABIT", text: "Skipped gym — overslept" },
] as const;

const TYPE_COLOR = { TASK: DS.accent, MOOD: "#555", HABIT: "#555" } as const;

export default function DumpPage() {
  const [dumpState, setDumpState] = useState<"idle" | "recording" | "review">("review");
  const [transcriptShown, setTranscriptShown] = useState(false);

  useEffect(() => {
    if (dumpState === "recording") {
      const timer = setTimeout(() => setTranscriptShown(true), 800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [dumpState]);

  return (
    <ScreenShell nav="dump">
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 32 }}>Brain Dump</div>

        {dumpState !== "review" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
            <button
              onClick={() => setDumpState((s) => (s === "idle" ? "recording" : "review"))}
              className={dumpState === "recording" ? "record-pulse" : ""}
              style={{ width: 80, height: 80, borderRadius: 6, background: DS.elevated, border: `2px solid ${DS.accent}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
            >
              <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                <rect x="8" y="1" width="12" height="22" rx="6" stroke={DS.accent} strokeWidth="2" />
                <path d="M4 18c0 5.5 4.5 10 10 10s10-4.5 10-10" stroke={DS.accent} strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="28" x2="14" y2="34" stroke={DS.accent} strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="34" x2="19" y2="34" stroke={DS.accent} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div style={{ marginTop: 14, fontFamily: DS.fontFrank, fontSize: 12, color: dumpState === "recording" ? DS.accent : "#444", letterSpacing: "0.04em", transition: "color 0.2s" }}>
              {dumpState === "recording" ? "Tap to stop" : "Tap to dump your brain"}
            </div>
            {dumpState === "idle" && (
              <div style={{ marginTop: 8, fontFamily: DS.fontFrank, fontSize: 11, color: DS.textMuted, textAlign: "center", maxWidth: 240 }}>
                Say anything. Tasks, thoughts, how you&apos;re feeling.
              </div>
            )}
            {dumpState === "recording" && transcriptShown && (
              <div style={{ width: "100%", marginTop: 20, background: DS.card, border: `1px solid ${DS.border}`, borderRadius: 4, padding: 16 }}>
                <div style={{ fontFamily: DS.fontFrank, fontSize: 14, color: "#e0e0e0", lineHeight: 1.65 }}>
                  {TRANSCRIPT}
                  <span className="cursor-blink" style={{ display: "inline-block", width: 2, height: 14, background: DS.accent, marginLeft: 2, verticalAlign: "middle" }} />
                </div>
              </div>
            )}
          </div>
        )}

        {dumpState === "review" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${DS.border}` }}>
              <span style={{ fontSize: 11, color: "#444", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Recording</span>
              <span style={{ fontSize: 12, color: "#555", cursor: "pointer", fontFamily: DS.fontFrank }}>View transcript →</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#444", marginBottom: 12 }}>Frank classified this:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {CLASSIFIED.map((item, i) => (
                <div key={i} style={{ background: DS.card, border: `1px solid ${DS.border}`, borderRadius: 4, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TYPE_COLOR[item.type], minWidth: 42 }}>{item.type}</span>
                  <span style={{ fontSize: 14, color: "#d0d0d0", flex: 1, lineHeight: 1.4 }}>{item.text}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M9.5 1.5l3 3-8 8H1.5v-3l8-8z" stroke="#333" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
            <FrankBubble text="You mentioned the gym. That's twice this week you've brought it up without going." style={{ marginBottom: 20 }} />
            <PrimaryBtn onClick={() => setDumpState("idle")}>Confirm &amp; Save</PrimaryBtn>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <span onClick={() => setDumpState("idle")} style={{ fontSize: 12, color: "#444", cursor: "pointer", letterSpacing: "0.04em" }}>
                Discard
              </span>
            </div>
          </div>
        )}
        {dumpState === "review" && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <span onClick={() => setDumpState("idle")} style={{ fontSize: 11, color: "#333", cursor: "pointer", fontFamily: DS.fontFrank }}>
              ← Record again
            </span>
          </div>
        )}
      </div>
    </ScreenShell>
  );
}
