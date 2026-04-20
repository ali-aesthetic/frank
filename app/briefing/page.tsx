"use client";

import { useEffect, useState } from "react";

import { DS, ScreenShell } from "@/components/ui/frank-ui";

const BRIEFING_TEXT =
  "Asadbek. It's Sunday. You've opened this app 6 days in a row, which means you're still in it — that counts for something. Here's what the data says: habits were 2/3 most days this week. The journal habit is solid. The run is the problem — three misses, same pattern as last week. Your mood has been 'low' four of the last five mornings. That's worth paying attention to. It's probably not the runs causing the low mood. It's probably the opposite. One priority today: go for the run. Not 5am. Just go.";

export default function BriefingPage() {
  const [mood, setMood] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(true);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const words = BRIEFING_TEXT.split(" ");
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        setDisplayed(words.slice(0, i + 1).join(" "));
        i += 1;
      } else {
        setStreaming(false);
        clearInterval(interval);
      }
    }, 38);
    return () => clearInterval(interval);
  }, []);

  const moods = ["Rough", "Low", "Okay", "Good", "Solid"];

  return (
    <ScreenShell nav="briefing">
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#444", marginBottom: 4 }}>Sunday, Apr 20</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>Morning Briefing</div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: DS.accent, marginBottom: 12 }}>Frank · Today</div>
        <div style={{ height: 1, background: DS.border, marginBottom: 20 }} />
        {streaming && displayed.length === 0 ? (
          <div style={{ display: "flex", gap: 6, alignItems: "center", height: 40 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={`dot${i + 1}`} style={{ width: 6, height: 6, borderRadius: "50%", background: "#444" }} />
            ))}
          </div>
        ) : (
          <div style={{ fontFamily: DS.fontFrank, fontSize: 14, lineHeight: 1.7, color: "#e0e0e0", letterSpacing: "0.01em" }}>
            {displayed}
            {streaming && <span className="cursor-blink" style={{ display: "inline-block", width: 2, height: 14, background: DS.accent, marginLeft: 2, verticalAlign: "middle" }} />}
          </div>
        )}
      </div>

      <div style={{ position: "sticky", bottom: 0, background: DS.bg, borderTop: `1px solid ${DS.border}`, padding: "16px 20px", marginTop: 24 }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#444", marginBottom: 10, fontWeight: 500 }}>How are you?</div>
          <div style={{ display: "flex", gap: 6 }}>
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                style={{
                  flex: 1,
                  padding: "7px 0",
                  fontFamily: DS.fontUI,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  borderRadius: 3,
                  border: `1px solid ${mood === m ? DS.accent : DS.border}`,
                  background: mood === m ? DS.accent : DS.card,
                  color: mood === m ? "#000" : "#333",
                  cursor: "pointer",
                  transition: "all 0.12s",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px",
            fontFamily: DS.fontUI,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            border: `1px solid ${DS.border}`,
            borderRadius: 3,
            background: "transparent",
            color: "#333",
            cursor: "not-allowed",
          }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="1" width="10" height="12" rx="2" stroke="#333" strokeWidth="1.4" />
            <path d="M4 5h4M4 7.5h3M4 10h2" stroke="#333" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="9.5" cy="10" r="2.5" fill="#0a0a0a" stroke="#333" strokeWidth="1.2" />
            <path d="M8.5 10h2M9.5 9v2" stroke="#333" strokeWidth="1" strokeLinecap="round" />
          </svg>
          Listen (Pro)
        </button>
      </div>
    </ScreenShell>
  );
}
