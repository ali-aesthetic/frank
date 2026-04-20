"use client";

import { useState } from "react";
import Link from "next/link";

import { AppStage, DS, PrimaryBtn } from "@/components/ui/frank-ui";

const PRESETS = ["Daily run", "No social media before 10am", "Journal (10 min)", "No alcohol", "Cold shower", "Read before bed"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const toggleHabit = (habit: string) => setSelected((prev) => (prev.includes(habit) ? prev.filter((item) => item !== habit) : [...prev, habit]));

  return (
    <AppStage>
      <div style={{ position: "absolute", inset: 0, background: DS.bg, display: "flex", flexDirection: "column", fontFamily: DS.fontUI }}>
        <div style={{ height: 50, flexShrink: 0, display: "flex", alignItems: "flex-end", paddingBottom: 6, paddingLeft: 20, paddingRight: 20, justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "-apple-system, system-ui" }}>9:41</span>
          <div style={{ display: "flex", gap: 5 }}>
            <svg width="16" height="11" viewBox="0 0 17 12">
              <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill="white" />
              <circle cx="8.5" cy="10.5" r="1.5" fill="white" />
            </svg>
            <svg width="24" height="12" viewBox="0 0 27 13">
              <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="white" strokeOpacity="0.35" fill="none" />
              <rect x="2" y="2" width="18" height="9" rx="2" fill="white" />
            </svg>
          </div>
        </div>
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, borderRadius: 20, background: "#000", zIndex: 100 }} />

        <div style={{ display: "flex", gap: 8, justifyContent: "center", paddingTop: 16, paddingBottom: 8 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? DS.accent : "#222", transition: "all 0.25s" }} />
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px 0" }}>
          {step === 1 && (
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>Hey. I&apos;m Frank.</div>
              <div style={{ fontSize: 20, fontWeight: 400, color: "#555", marginBottom: 40 }}>What do I call you?</div>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={{ width: "100%", background: "#141414", border: `1px solid ${DS.border}`, borderRadius: 4, padding: "16px", fontFamily: DS.fontUI, fontSize: 16, color: "#fff", outline: "none", caretColor: DS.accent }} />
            </div>
          )}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 12 }}>What&apos;s the one thing you&apos;re trying to build or become?</div>
              <div style={{ fontSize: 14, fontWeight: 400, color: "#444", marginBottom: 32 }}>One sentence. Be honest, not aspirational.</div>
              <textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} placeholder="e.g. Run a marathon before I turn 40." style={{ width: "100%", background: "#141414", border: `1px solid ${DS.border}`, borderRadius: 4, padding: "16px", fontFamily: DS.fontFrank, fontSize: 14, color: "#e0e0e0", lineHeight: 1.65, outline: "none", resize: "none", caretColor: DS.accent }} />
            </div>
          )}
          {step === 3 && (
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>Pick 2–3 habits.</div>
              <div style={{ fontSize: 14, color: "#444", marginBottom: 28 }}>Not what you wish you did. What you&apos;ll actually do.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {PRESETS.map((habit) => {
                  const sel = selected.includes(habit);
                  return (
                    <div
                      key={habit}
                      onClick={() => toggleHabit(habit)}
                      style={{
                        background: DS.card,
                        border: `1px solid ${DS.border}`,
                        borderLeft: sel ? `3px solid ${DS.accent}` : `1px solid ${DS.border}`,
                        borderRadius: 4,
                        padding: sel ? "14px 16px 14px 14px" : "14px 16px",
                        cursor: "pointer",
                        transition: "border 0.15s",
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: sel ? 600 : 400, color: sel ? "#e0e0e0" : "#888", transition: "all 0.15s" }}>{habit}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 14, fontSize: 12, color: DS.accent, cursor: "pointer", fontWeight: 600, letterSpacing: "0.04em" }}>+ Add your own</div>
            </div>
          )}
        </div>

        <div style={{ padding: "20px 24px 40px", flexShrink: 0 }}>
          {step < 3 ? (
            <PrimaryBtn onClick={() => setStep((s) => s + 1)}>{step === 1 ? "Continue →" : "That’s my north star →"}</PrimaryBtn>
          ) : (
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <PrimaryBtn disabled={selected.length === 0}>Let&apos;s go →</PrimaryBtn>
            </Link>
          )}
          {step > 1 && (
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <span onClick={() => setStep((s) => s - 1)} style={{ fontSize: 12, color: "#444", cursor: "pointer", fontFamily: DS.fontFrank }}>
                ← Back
              </span>
            </div>
          )}
        </div>
      </div>
    </AppStage>
  );
}
