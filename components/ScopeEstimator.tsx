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
  outline: "#958ea0",
  outlineVariant: "#494454",
};

const scopeOptions = [
  {
    label: "Mobile App Build",
    sub: "iOS + Android via Flutter, 120 FPS",
    defaultOn: true,
  },
  {
    label: "Cloud & APIs",
    sub: "FastAPI, PostgreSQL & Redis Cache",
    defaultOn: true,
  },
  {
    label: "Design & Tokens",
    sub: "Tactile UX, Arabic RTL, Figma Design Tokens",
    defaultOn: false,
  },
  {
    label: "SRE & 24/7 SLA",
    sub: "PagerDuty monitoring, zero-downtime maintenance",
    defaultOn: false,
  },
];

const baseWeeks = 4;
const weeksPer = [6, 4, 3, 2];

export default function ScopeEstimator() {
  const [selected, setSelected] = useState<boolean[]>(
    scopeOptions.map((o) => o.defaultOn),
  );

  const totalWeeks = selected.reduce(
    (acc, on, i) => (on ? acc + weeksPer[i] : acc),
    baseWeeks,
  );

  return (
    <section
      style={{
        maxWidth: "80rem",
        margin: "0 auto",
        paddingBottom: "4rem",
        width: "100%",
      }}
      className="px-margin-mobile lg:px-margin"
    >
      <div
        style={{
          borderRadius: "1rem",
          backgroundColor: C.surfaceLow,
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "560px", marginBottom: "1.5rem" }}>
          <span
            style={{
              color: C.primary,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            QUICK SCOPING PROTOCOL
          </span>
          <h2
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "28px",
              lineHeight: "36px",
              fontWeight: 700,
              color: C.onSurface,
              margin: "0 0 0.5rem",
            }}
          >
            Configure your engineering sprint
          </h2>
          <p style={{ color: C.onSurfaceVariant, fontSize: "15px", margin: 0 }}>
            Select capability modules to simulate estimated delivery timeline.
          </p>
        </div>

        <div
          style={{ gap: "1.5rem", alignItems: "center" }}
          className="grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scopeOptions.map((opt, i) => (
              <button
                key={opt.label}
                onClick={() =>
                  setSelected((prev) => {
                    const n = [...prev];
                    n[i] = !n[i];
                    return n;
                  })
                }
                style={{
                  textAlign: "left",
                  padding: "1rem",
                  borderRadius: "12px",
                  backgroundColor: selected[i]
                    ? C.surfaceContainerHigh
                    : C.surfaceContainer,
                  border: selected[i]
                    ? `1px solid ${C.primary}44`
                    : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                  color: C.onSurface,
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
                  <span style={{ fontSize: "15px", fontWeight: 600 }}>
                    {opt.label}
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      color: selected[i] ? C.primary : C.outline,
                      fontSize: "20px",
                    }}
                  >
                    {selected[i] ? "check_circle" : "radio_button_unchecked"}
                  </span>
                </div>
                <p
                  style={{
                    color: C.onSurfaceVariant,
                    fontSize: "13px",
                    margin: 0,
                  }}
                >
                  {opt.sub}
                </p>
              </button>
            ))}
          </div>

          <div
            className="lg:col-span-5"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              backgroundColor: C.surfaceLowest,
              boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  color: C.outline,
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                ESTIMATED ARCHITECTURE CYCLE
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "56px",
                    fontWeight: 800,
                    color: C.onSurface,
                    lineHeight: 1,
                  }}
                >
                  {totalWeeks}
                </span>
                <span
                  style={{
                    color: C.onSurfaceVariant,
                    fontSize: "20px",
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 600,
                  }}
                >
                  Weeks
                </span>
              </div>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  fontSize: "13px",
                  marginBottom: "1rem",
                }}
              >
                Dedicated sprint squad: 1 Lead Architect, 2 Senior Engineers, 1
                Product Ergonomist.
              </p>
            </div>
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "12px 20px",
                borderRadius: "9999px",
                backgroundColor: C.primaryContainer,
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(160,120,255,0.4)",
              }}
            >
              Lock in Sprint Schedule
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                north_east
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
