"use client";

import { useState } from "react";

const C = {
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  surfaceContainerHigh: "#2a292e",
  surfaceContainerHighest: "#353439",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#8b5cf6",
  primaryContainer: "#8b5cf6",
  onPrimaryContainer: "#340080",
  secondary: "#8b5cf6",
  tertiary: "#5edf81",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

const options = [
  {
    value: "mvp",
    icon: "rocket_launch",
    color: C.primary,
    label: "Launch Rapid Venture MVP",
    sub: "Validate market demand, raise venture funding, 8–12 week sprint.",
  },
  {
    value: "scale",
    icon: "phone_iphone",
    color: C.secondary,
    label: "Full-Scale Flagship Mobile App",
    sub: "Bespoke Flutter/Native iOS & Android for 100k+ MAU.",
  },
  {
    value: "reengineer",
    icon: "published_with_changes",
    color: C.tertiary,
    label: "Modernize Existing Codebase",
    sub: "Rescue legacy apps, convert to clean modular Flutter.",
  },
  {
    value: "backend",
    icon: "dns",
    color: C.primary,
    label: "GCC Backend & Infrastructure",
    sub: "Sub-second services, K-NET, Apple Pay, UAE Pass.",
  },
];

export default function ContactFormClient() {
  const [selected, setSelected] = useState("mvp");
  const [btnState, setBtnState] = useState<"idle" | "loading" | "done">("idle");

  const handleContinue = () => {
    setBtnState("loading");
    setTimeout(() => {
      setBtnState("done");
      setTimeout(() => setBtnState("idle"), 1200);
    }, 600);
  };

  return (
    <div
      style={{
        borderRadius: "1rem",
        backgroundColor: C.surfaceLowest,
        border: `1px solid rgba(73,68,84,0.35)`,
        padding: "2rem",
        boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
      }}
    >
      {/* Step header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            color: C.primary,
            fontSize: "10px",
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          STEP 01 OF 05
        </span>
        <span
          style={{
            color: C.outline,
            fontSize: "10px",
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          PROJECT DISCOVERY & SCOPE
        </span>
      </div>

      {/* Progress */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "4px",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            height: "6px",
            borderRadius: "9999px",
            backgroundColor: C.primaryContainer,
            boxShadow: "0 0 12px rgba(160,120,255,0.6)",
          }}
        />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              height: "6px",
              borderRadius: "9999px",
              backgroundColor: C.surfaceContainerHighest,
            }}
          />
        ))}
      </div>

      {/* Question */}
      <h2
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: "28px",
          lineHeight: "36px",
          fontWeight: 700,
          color: C.onSurface,
          margin: "0 0 4px",
        }}
      >
        What is the primary goal of your mobile product?
      </h2>
      <p
        style={{
          color: C.onSurfaceVariant,
          fontSize: "15px",
          margin: "0 0 1.5rem",
        }}
      >
        Select the objective that best matches your immediate roadmap phase:
      </p>

      {/* Options */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        {options.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <div
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              style={{
                cursor: "pointer",
                borderRadius: "12px",
                padding: "1rem",
                border: isActive
                  ? `1px solid rgba(208,188,255,0.3)`
                  : `1px solid rgba(73,68,84,0.25)`,
                backgroundColor: isActive
                  ? "rgba(208,188,255,0.08)"
                  : C.surfaceLow,
                transition: "all 0.15s",
                boxShadow: isActive
                  ? "0 0 24px -4px rgba(160,120,255,0.2)"
                  : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: opt.color, fontSize: "24px" }}
                >
                  {opt.icon}
                </span>
                <span
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    border: `2px solid ${isActive ? C.primary : C.outlineVariant}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: C.primary,
                      }}
                    />
                  )}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: C.onSurface,
                  margin: "0 0 4px",
                }}
              >
                {opt.label}
              </h3>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                {opt.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Email */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            color: C.outline,
            fontSize: "10px",
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
          htmlFor="lead-email"
        >
          Work Email (Optional for Step 1)
        </label>
        <input
          id="lead-email"
          type="email"
          placeholder="founder@yourdomain.com"
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: C.surfaceLow,
            border: `1px solid rgba(73,68,84,0.35)`,
            color: C.onSurface,
            fontSize: "15px",
            fontFamily: "inherit",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "1rem",
          borderTop: `1px solid rgba(73,68,84,0.2)`,
        }}
      >
        <button
          disabled
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            borderRadius: "9999px",
            border: `1px solid rgba(73,68,84,0.2)`,
            backgroundColor: "transparent",
            color: C.outline,
            fontSize: "14px",
            fontFamily: "inherit",
            cursor: "not-allowed",
            opacity: 0.4,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "16px" }}
          >
            arrow_back
          </span>{" "}
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={btnState !== "idle"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "12px 24px",
            borderRadius: "9999px",
            backgroundColor: C.primaryContainer,
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 700,
            border: "none",
            cursor: btnState !== "idle" ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            boxShadow: "0 0 24px rgba(160,120,255,0.4)",
            opacity: btnState !== "idle" ? 0.75 : 1,
            transition: "all 0.15s",
          }}
        >
          {btnState === "loading"
            ? "Routing Scope..."
            : btnState === "done"
              ? "Step 2 Loaded ✓"
              : "Continue to Step 2"}
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "16px" }}
          >
            north_east
          </span>
        </button>
      </div>

      {/* Footer */}
      <p
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: C.outline,
          fontSize: "10px",
          fontFamily: "monospace",
          fontWeight: 600,
          marginTop: "1rem",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ color: C.tertiary, fontSize: "14px" }}
        >
          lock
        </span>
        Your requirements remain strictly confidential under NDA.
      </p>
    </div>
  );
}
