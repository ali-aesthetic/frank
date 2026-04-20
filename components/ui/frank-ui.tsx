"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo } from "react";
import Link from "next/link";

export const DS = {
  bg: "#0d0d0d",
  card: "#131313",
  card2: "#121212",
  elevated: "#171717",
  border: "#232323",
  borderSubtle: "#1d1d1d",
  textMuted: "#555",
  accent: "#7C8FBB",
  fontUI: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
  fontFrank: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
};

const navItems = [
  { href: "/dashboard", id: "dashboard", label: "Dashboard" },
  { href: "/briefing", id: "briefing", label: "Briefing" },
  { href: "/dump", id: "dump", label: "Dump" },
  { href: "/profile", id: "profile", label: "Profile" },
] as const;

export function AppStage({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}>
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          overflow: "hidden",
          position: "relative",
          background: "#000",
          boxShadow: "0 0 0 1px #222, 0 40px 80px rgba(0,0,0,0.6), 0 0 0 10px #0d0d0d, 0 0 0 11px #1a1a1a",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
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
  );
}

function Notch() {
  return <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, borderRadius: 20, background: "#000", zIndex: 100 }} />;
}

function BottomNav({ active }: { active: (typeof navItems)[number]["id"] }) {
  return (
    <div style={{ height: 62, borderTop: `1px solid ${DS.border}`, background: DS.bg, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", alignItems: "center", padding: "0 12px" }}>
      {navItems.map((item) => {
        const isActive = item.id === active;
        return (
          <Link
            key={item.id}
            href={item.href}
            style={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: isActive ? 700 : 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isActive ? DS.accent : "#3d3d3d",
              textDecoration: "none",
              transition: "color 0.12s",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function ScreenShell({ nav, children }: { nav: (typeof navItems)[number]["id"]; children: ReactNode }) {
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      inset: 0,
      background: DS.bg,
      display: "flex",
      flexDirection: "column",
      fontFamily: DS.fontUI,
    }),
    [],
  );

  return (
    <AppStage>
      <div style={containerStyle}>
        <StatusBar />
        <Notch />
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 0 }}>{children}</div>
        <BottomNav active={nav} />
      </div>
    </AppStage>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#444", marginBottom: 10 }}>{children}</div>;
}

export function FrankBubble({ text, style }: { text: string; style?: CSSProperties }) {
  return (
    <div style={{ background: DS.elevated, border: `1px solid ${DS.border}`, borderRadius: "4px 16px 16px 16px", padding: "16px 18px", ...style }}>
      <div style={{ fontFamily: DS.fontFrank, fontSize: 14, lineHeight: 1.65, color: "#e0e0e0" }}>{text}</div>
    </div>
  );
}

export function PrimaryBtn({
  children,
  onClick,
  disabled,
  style,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        border: "none",
        background: disabled ? "#1d2535" : DS.accent,
        color: "#000",
        fontFamily: DS.fontUI,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "13px 16px",
        borderRadius: 3,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
