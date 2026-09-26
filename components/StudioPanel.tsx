"use client";

import { useRef, useSyncExternalStore, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/contexts/translations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const C = {
  surfaceLow: "#1b1b20",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#8b5cf6",
  tertiary: "#5edf81",
  outline: "#958ea0",
};

const mono: CSSProperties = {
  fontSize: "10px",
  fontFamily: "monospace",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

type Hub = {
  badge: TranslationKey;
  city: TranslationKey;
  role: TranslationKey;
  /** Fixed UTC offset in hours; neither hub observes DST. */
  utcOffset: number;
  tzLabel: string;
  /** Local working days, 0 = Sunday. */
  workDays: number[];
  /** Local working hours (24h clock), matching the contact page. */
  opens: number;
  closes: number;
  accent: string;
};

const HUBS: Hub[] = [
  {
    badge: "whoWeAre.hub1.badge",
    city: "whoWeAre.hub1.city",
    role: "whoWeAre.hub1.role",
    utcOffset: 3,
    tzLabel: "AST · GMT+3",
    workDays: [0, 1, 2, 3, 4], // Kuwait: Sunday–Thursday
    opens: 9,
    closes: 18,
    accent: C.primary,
  },
  {
    badge: "whoWeAre.hub2.badge",
    city: "whoWeAre.hub2.city",
    role: "whoWeAre.hub2.role",
    utcOffset: 5.5,
    tzLabel: "IST · GMT+5:30",
    workDays: [1, 2, 3, 4, 5], // Noida: Monday–Friday
    opens: 9,
    closes: 18,
    accent: C.tertiary,
  },
];

function subscribeToClock(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

const pad = (n: number) => String(n).padStart(2, "0");

function hubClock(now: Date, hub: Hub) {
  const d = new Date(now.getTime() + hub.utcOffset * 3_600_000);
  return { h: d.getUTCHours(), m: d.getUTCMinutes(), day: d.getUTCDay() };
}

function hubIsOpen(now: Date, hub: Hub) {
  const { h, m, day } = hubClock(now, hub);
  const t = h + m / 60;
  return hub.workDays.includes(day) && t >= hub.opens && t < hub.closes;
}

/** Days until the hub next opens: 0 = later today, 1 = tomorrow, 2+ = after a weekend. */
function daysUntilOpen(now: Date, hub: Hub) {
  const { h, m, day } = hubClock(now, hub);
  const beforeOpening = h + m / 60 < hub.opens;
  for (let d = 0; d < 7; d++) {
    if (hub.workDays.includes((day + d) % 7) && (d > 0 || beforeOpening)) return d;
  }
  return 0;
}

/**
 * Studio panel for the Who We Are section: a live status line and the two hubs,
 * each with its local clock and whether it is open right now.
 */
export default function StudioPanel() {
  const { t, lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  // One-second clock. The server snapshot is null so server HTML and the first
  // client render match; the real time fills in right after hydration.
  const seconds = useSyncExternalStore(
    subscribeToClock,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
  const now = seconds === null ? null : new Date(seconds * 1000);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(root.querySelectorAll("[data-reveal]"), {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "1.5rem",
        border: "1px solid rgba(73,68,84,0.35)",
        backgroundColor: C.surfaceLow,
        padding: "clamp(16px, 2.2vw, 28px)",
      }}
    >
      <style>{`
        @keyframes swa-ping { 75%, 100% { transform: scale(2.6); opacity: 0; } }
        @keyframes swa-blink { 50% { opacity: 0.25; } }
        .swa-colon { animation: swa-blink 1s steps(1) infinite; }
        .swa-hub { transition: border-color 0.25s ease, background-color 0.25s ease; }
        .swa-hub:hover { border-color: rgba(139,92,246,0.45); background-color: #121216; }
        .swa-ltr { direction: ltr; unicode-bidi: isolate; }
        @media (prefers-reduced-motion: reduce) {
          .swa-colon, .swa-ping { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(520px circle at 100% 0%, rgba(139,92,246,0.12), transparent 55%)",
        }}
      />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Live status */}
        <div
          data-reveal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              aria-hidden
              style={{ position: "relative", width: "8px", height: "8px", display: "inline-block", flexShrink: 0 }}
            >
              <span
                className="swa-ping"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: C.tertiary,
                  opacity: 0.7,
                  animation: "swa-ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: C.tertiary }} />
            </span>
            <span style={{ ...mono, color: C.tertiary }}>{t("whoWeAre.panel.label")}</span>
            <span style={{ fontSize: "12.5px", fontWeight: 500, color: C.onSurfaceVariant }}>
              {t("whoWeAre.panel.status")}
            </span>
          </div>
          <span style={{ ...mono, color: C.outline }}>{t("whoWeAre.panel.est")}</span>
        </div>

        {/* Hubs with live local clocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "10px" }}>
          {HUBS.map((hub) => {
            const clock = now ? hubClock(now, hub) : null;
            const open = now ? hubIsOpen(now, hub) : false;
            let status = "—";
            if (now && open) status = t("whoWeAre.open");
            if (now && !open) {
              status = t("whoWeAre.closed");
              const days = daysUntilOpen(now, hub);
              if (days >= 2) {
                // Name the day when the hub is off for a weekend, in the visitor's language.
                const weekday = new Intl.DateTimeFormat(lang, { weekday: "short", timeZone: "UTC" }).format(
                  new Date(now.getTime() + (hub.utcOffset + days * 24) * 3_600_000),
                );
                status += ` · ${weekday}`;
              }
            }
            return (
              <div
                key={hub.tzLabel}
                data-reveal
                className="swa-hub"
                style={{
                  borderRadius: "18px",
                  backgroundColor: C.surfaceLowest,
                  border: "1px solid rgba(73,68,84,0.3)",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "6px 8px",
                  }}
                >
                  <span style={{ ...mono, color: hub.accent, whiteSpace: "nowrap" }}>{t(hub.badge)}</span>
                  <span
                    style={{
                      ...mono,
                      letterSpacing: "0.06em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      border: `1px solid ${open ? "rgba(94,223,129,0.35)" : "rgba(73,68,84,0.5)"}`,
                      backgroundColor: open ? "rgba(94,223,129,0.08)" : "transparent",
                      color: open ? C.tertiary : C.outline,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: open ? C.tertiary : C.outline,
                      }}
                    />
                    {status}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-outfit)",
                      fontSize: "22px",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: C.onSurface,
                    }}
                  >
                    {t(hub.city)}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: "2px",
                      fontSize: "12.5px",
                      lineHeight: 1.45,
                      color: C.onSurfaceVariant,
                    }}
                  >
                    {t(hub.role)}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "2px" }}>
                  <span
                    className="swa-ltr"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "clamp(28px, 2.6vw, 34px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: C.onSurface,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {clock ? (
                      <>
                        {pad(clock.h)}
                        <span className="swa-colon">:</span>
                        {pad(clock.m)}
                      </>
                    ) : (
                      "--:--"
                    )}
                  </span>
                  <span className="swa-ltr" style={{ ...mono, color: C.outline }}>
                    {hub.tzLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
