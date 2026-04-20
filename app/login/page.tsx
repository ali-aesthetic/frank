"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DS, PrimaryBtn } from "@/components/ui/frank-ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function signIn() {
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setSent(true);
    setLoading(false);
  }

  return (
    <div style={{
      position: "absolute", inset: 0, background: DS.bg,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "0 32px",
    }}>
      <div style={{ fontFamily: DS.fontFrank, fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
        Frank
      </div>
      <div style={{ fontFamily: DS.fontUI, fontSize: 13, color: DS.textSecondary, marginBottom: 48 }}>
        Your accountability partner. No sugarcoating.
      </div>

      {sent ? (
        <div style={{ fontFamily: DS.fontFrank, fontSize: 14, color: DS.textPrimary, textAlign: "center", lineHeight: 1.7 }}>
          Check your email.<br />
          <span style={{ color: DS.textSecondary }}>Magic link sent to {email}</span>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 320 }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn()}
            style={{
              width: "100%", padding: "14px 16px", marginBottom: 12,
              background: DS.card, border: `1px solid ${DS.border}`,
              borderRadius: 4, color: DS.textPrimary, fontFamily: DS.fontUI,
              fontSize: 14, outline: "none", boxSizing: "border-box",
            }}
          />
          <PrimaryBtn onClick={signIn} disabled={!email || loading}>
            {loading ? "Sending..." : "Continue with email"}
          </PrimaryBtn>
        </div>
      )}
    </div>
  );
}
