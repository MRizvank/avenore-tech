"use client";

import { useState } from "react";

const C = {
  surface: "#131317",
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  surfaceContainerHigh: "#2a292e",
  surfaceContainerHighest: "#353439",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#d0bcff",
  primaryContainer: "#8b5cf6",
  onPrimaryContainer: "#340080",
  secondary: "#8b5cf6",
  tertiary: "#5edf81",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

const options = [
  { value: "mvp", icon: "rocket_launch", color: C.primary, label: "Venture MVP (8-12 wks)", sub: "First release · Seed round" },
  { value: "mobile", icon: "devices", color: C.secondary, label: "Full Mobile Application", sub: "iOS & Android · Scale" },
  { value: "redesign", icon: "published_with_changes", color: C.tertiary, label: "Re-Architecture & V2", sub: "Migrating legacy apps" },
  { value: "enterprise", icon: "corporate_fare", color: C.primary, label: "Enterprise System", sub: "GovTech, Banks, Multi-region" },
];

export default function ProjectInquiryForm() {
  const [selected, setSelected] = useState<string>("mvp");

  return (
    <div style={{ backgroundColor: C.surfaceContainerHigh, borderRadius: "1.5rem", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}>
      {/* Step indicator */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>STEP 01 OF 05</span>
          <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>PROJECT DISCOVERY</span>
        </div>
        <div style={{ width: "100%", height: "4px", backgroundColor: C.surfaceContainerHighest, borderRadius: "9999px", overflow: "hidden", display: "flex" }}>
          <div style={{ width: "20%", height: "100%", backgroundColor: C.primary, borderRadius: "9999px" }} />
        </div>
      </div>

      {/* Question */}
      <div>
        <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "28px", lineHeight: "36px", fontWeight: 700, letterSpacing: "-0.02em", color: C.onSurface, margin: "0 0 6px" }}>What are you looking to engineer?</h3>
        <p style={{ color: C.onSurfaceVariant, fontSize: "15px", margin: 0 }}>Select the option that best mirrors your primary product roadmap milestone.</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <div
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              style={{
                padding: "1rem",
                borderRadius: "1rem",
                backgroundColor: isSelected ? C.surfaceContainerHighest : C.surfaceContainerHigh,
                border: isSelected ? `1px solid ${C.primary}44` : `1px solid transparent`,
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                minHeight: "100px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="material-symbols-outlined" style={{ color: opt.color, fontSize: "24px" }}>{opt.icon}</span>
                <span style={{ width: "14px", height: "14px", borderRadius: "50%", backgroundColor: isSelected ? C.primary : "transparent", border: `2px solid ${isSelected ? C.primary : C.outlineVariant}`, display: "block", transition: "all 0.15s" }} />
              </div>
              <div>
                <span style={{ color: C.onSurface, fontSize: "15px", fontWeight: 600, display: "block" }}>{opt.label}</span>
                <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{opt.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Email + CTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input
          type="email"
          placeholder="Enter your work email (e.g. founder@domain.com)"
          style={{ width: "100%", padding: "12px 16px", borderRadius: "9999px", backgroundColor: C.surfaceContainerHighest, border: `1px solid ${C.outlineVariant}44`, color: C.onSurface, fontSize: "15px", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
        />
        <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px 24px", borderRadius: "9999px", backgroundColor: C.primaryContainer, color: C.onPrimaryContainer, fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 0 20px rgba(160,120,255,0.4)", transition: "all 0.15s", fontFamily: "inherit" }}>
          <span>Continue to Step 2</span>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Confidentiality Guaranteed</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: C.tertiary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.tertiary, display: "inline-block" }} />
          2 Studio Spots Remaining
        </span>
      </div>
    </div>
  );
}
