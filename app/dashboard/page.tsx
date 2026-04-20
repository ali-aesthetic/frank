"use client";

import { useState } from "react";

import { DS, ScreenShell, SectionLabel } from "@/components/ui/frank-ui";

type Habit = {
  id: number;
  name: string;
  sub: string;
  status: "done" | "grace" | "skip" | null;
};

function HabitRow({ habit, onSet, isLast }: { habit: Habit; onSet: (status: "done" | "grace" | "skip") => void; isLast: boolean }) {
  const isDone = habit.status === "done";
  const isGrace = habit.status === "grace";
  const isSkip = habit.status === "skip";

  return (
    <div style={{ background: DS.card2, border: `1px solid ${DS.borderSubtle}`, borderRadius: 4, padding: "14px 16px", marginBottom: isLast ? 0 : 2, opacity: isSkip ? 0.45 : 1, transition: "opacity 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: isDone ? "#444" : "#d0d0d0", textDecoration: isSkip ? "line-through" : "none", transition: "color 0.2s" }}>{habit.name}</div>
          <div style={{ fontSize: 12, color: "#383838", fontWeight: 500, marginTop: 2 }}>{habit.sub}</div>
        </div>
        {isDone && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: DS.accent }}>Done</span>}
        {isGrace && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666" }}>Grace</span>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          ["Done", "done", { background: DS.accent, color: "#000" }],
          ["Grace", "grace", { background: "#2a2a2a", color: "#888", borderColor: "#333" }],
          ["Skip", "skip", { background: "#1a1a1a", color: "#555", borderColor: "#222" }],
        ].map(([label, id, activeStyles]) => (
          <button
            key={id}
            onClick={() => onSet(id as "done" | "grace" | "skip")}
            style={{
              fontFamily: DS.fontUI,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "7px 14px",
              borderRadius: 3,
              border: `1px solid ${DS.border}`,
              background: habit.status === id ? undefined : "#141414",
              color: habit.status === id ? undefined : "#3a3a3a",
              cursor: "pointer",
              transition: "all 0.12s",
              ...(habit.status === id ? (activeStyles as Record<string, string>) : {}),
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "5am run", sub: "30 min minimum", status: null },
    { id: 2, name: "No alcohol", sub: "Day 12 of streak", status: null },
    { id: 3, name: "Journal", sub: "10 min, pen on paper", status: null },
  ]);
  const [read, setRead] = useState(false);
  const done = habits.filter((h) => h.status === "done").length;

  return (
    <ScreenShell nav="dashboard">
      <div style={{ background: "#141414", borderBottom: `1px solid ${DS.border}`, padding: "8px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#555", fontWeight: 500, letterSpacing: "0.02em" }}>11 days left in trial</span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: DS.accent, textTransform: "uppercase" }}>Upgrade</span>
      </div>

      <div style={{ padding: "24px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#444", marginBottom: 4 }}>Sunday, Apr 20</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>Dashboard</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1c1c1c", border: "1px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 15, fontWeight: 700 }}>A</div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ background: DS.card, border: `1px solid ${DS.border}`, borderLeft: `3px solid ${DS.accent}`, borderRadius: 4, padding: "20px 20px 20px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: DS.accent, marginBottom: 12 }}>True North</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 14, letterSpacing: "-0.02em" }}>Run a marathon before I turn 40. No asterisks.</div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              ["Deadline", "Nov 14, 2025"],
              ["Progress", "Week 7 of 24"],
              ["Long run", "12 mi"],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 11, color: "#444", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>{l}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#888" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <SectionLabel>Frank</SectionLabel>
        <div style={{ background: DS.elevated, border: `1px solid ${DS.border}`, borderRadius: "4px 16px 16px 16px", padding: "16px 18px", cursor: "pointer" }} onClick={() => setRead(true)}>
          <div style={{ fontFamily: DS.fontFrank, fontSize: 14, lineHeight: 1.65, color: read ? "#888" : "#e0e0e0", transition: "color 0.3s" }}>
            You skipped your run three times this week. That&apos;s not a bad day. That&apos;s a pattern. What are you telling yourself to make that okay?
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: "#333", fontFamily: DS.fontFrank }}>8:03 AM</span>
            <span style={{ fontSize: 11, color: read ? DS.accent : "#333", fontWeight: read ? 600 : 400, letterSpacing: "0.04em" }}>{read ? "Read" : "● Unread"}</span>
          </div>
        </div>
        <div style={{ marginTop: 8, textAlign: "right" }}>
          <span style={{ fontSize: 12, color: "#333", fontWeight: 500, letterSpacing: "0.04em", borderBottom: "1px solid #222", paddingBottom: 1, cursor: "pointer" }}>Reply to Frank →</span>
        </div>
      </div>

      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <SectionLabel>Today&apos;s Habits</SectionLabel>
          <div style={{ fontSize: 12, fontWeight: 600, color: done === 3 ? DS.accent : "#444" }}>
            {done}/3 {done === 3 ? "— done." : "complete"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {habits.map((habit, index) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              onSet={(status) => setHabits((prev) => prev.map((h) => (h.id === habit.id ? { ...h, status: h.status === status ? null : status } : h)))}
              isLast={index === habits.length - 1}
            />
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
