"use client";

import { useState } from "react";

import { DS, ScreenShell } from "@/components/ui/frank-ui";

export default function ProfilePage() {
  const [open, setOpen] = useState<Record<string, boolean>>({ sleep: true });
  const [values] = useState(["Discipline", "Family", "Impact"]);
  const completedCount = 3;
  const totalCount = 4;
  const pct = Math.round((completedCount / totalCount) * 100);

  const sections = [
    {
      id: "sleep",
      label: "Sleep Schedule",
      question: "When do you usually sleep?",
      done: true,
      content: (
        <div style={{ display: "flex", gap: 10 }}>
          {[
            ["Sleep", "11:00 PM"],
            ["Wake", "5:00 AM"],
          ].map(([l, v]) => (
            <div key={l} style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#444", marginBottom: 6, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</div>
              <div style={{ background: "#141414", border: `1px solid ${DS.border}`, borderRadius: 3, padding: "10px 12px", fontSize: 14, color: "#d0d0d0", fontFamily: DS.fontFrank }}>{v}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "work",
      label: "Work / Study Hours",
      question: "When are you usually working?",
      done: true,
      content: (
        <div style={{ display: "flex", gap: 10 }}>
          {[
            ["Start", "9:00 AM"],
            ["End", "6:00 PM"],
          ].map(([l, v]) => (
            <div key={l} style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#444", marginBottom: 6, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</div>
              <div style={{ background: "#141414", border: `1px solid ${DS.border}`, borderRadius: 3, padding: "10px 12px", fontSize: 14, color: "#d0d0d0", fontFamily: DS.fontFrank }}>{v}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "life",
      label: "Life Context",
      question: "What's going on in your life right now?",
      done: true,
      content: <textarea defaultValue="Sem 6, building Frank, trying to stay sane." style={{ width: "100%", background: "#141414", border: `1px solid ${DS.border}`, borderRadius: 4, padding: "12px 14px", fontFamily: DS.fontFrank, fontSize: 13, color: "#e0e0e0", lineHeight: 1.6, resize: "none", outline: "none" }} rows={3} />,
    },
    {
      id: "values",
      label: "Core Values",
      question: "What actually matters to you?",
      done: false,
      content: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          {values.map((t) => (
            <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "5px 10px", border: `1px solid ${DS.accent}`, borderRadius: 3, color: DS.accent, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {t}
            </span>
          ))}
          <span style={{ fontSize: 11, fontWeight: 600, color: "#444", padding: "5px 10px", border: "1px solid #222", borderRadius: 3, cursor: "pointer", letterSpacing: "0.04em" }}>+ Add</span>
        </div>
      ),
    },
  ];

  return (
    <ScreenShell nav="profile">
      <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>Profile</div>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1c1c1c", border: "1px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 15, fontWeight: 700 }}>A</div>
      </div>
      <div style={{ padding: "0 20px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#444" }}>Frank Knows You</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>{pct}% — keep going</div>
        </div>
        <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: DS.accent, borderRadius: 2, transition: "width 0.5s ease" }} />
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: "#333", fontStyle: "italic" }}>Fill in more → Frank&apos;s briefings get more specific</div>
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 2 }}>
        {sections.map((sec) => (
          <div key={sec.id} style={{ background: DS.card, border: `1px solid ${DS.border}`, borderRadius: 4, overflow: "hidden" }}>
            <div onClick={() => setOpen((p) => ({ ...p, [sec.id]: !p[sec.id] }))} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#d0d0d0" }}>{sec.label}</div>
                <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{sec.question}</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: sec.done ? DS.accent : "transparent", border: `1.5px solid ${sec.done ? DS.accent : "#333"}`, flexShrink: 0 }} />
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{ transform: open[sec.id] ? "rotate(90deg)" : "", transition: "transform 0.2s", flexShrink: 0 }}>
                <path d="M1 1l4 4-4 4" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {open[sec.id] && (
              <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${DS.borderSubtle}` }}>
                <div style={{ height: 12 }} />
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", padding: "32px 20px 16px" }}>
        <span style={{ fontSize: 12, color: "#333", cursor: "pointer", letterSpacing: "0.02em" }}>Delete all my data</span>
      </div>
    </ScreenShell>
  );
}
