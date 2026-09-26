"use client";

import Link from "next/link";
import ScopeEstimator from "@/components/ScopeEstimator";
import ParticleHero from "@/components/ParticleHero";
import StructuredData from "@/components/StructuredData";
import { useLanguage } from "@/contexts/LanguageContext";

const C = {
  surface: "#131317",
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

export default function ServicesPageContent() {
  const { t } = useLanguage();

  const buildServices = [
    {
      num: t("services.build.1.num"),
      icon: "sync",
      title: t("services.build.1.title"),
      desc: t("services.build.1.desc"),
    },
    {
      num: t("services.build.2.num"),
      icon: "terminal",
      title: t("services.build.2.title"),
      desc: t("services.build.2.desc"),
    },
    {
      num: t("services.build.3.num"),
      icon: "memory",
      title: t("services.build.3.title"),
      desc: t("services.build.3.desc"),
    },
    {
      num: t("services.build.4.num"),
      icon: "hub",
      title: t("services.build.4.title"),
      desc: t("services.build.4.desc"),
    },
  ];

  const techRadar = [
    {
      label: "CLIENT COMPUTE",
      title: "Mobile & Edge",
      items: [
        ["Flutter 3.x / Dart", "ADOPT"],
        ["SwiftUI & Metal", "ADOPT"],
        ["Kotlin Compose", "ADOPT"],
        ["Riverpod 2.x", "ADOPT"],
      ],
      footer: "120 FPS UI THREAD",
    },
    {
      label: "SERVER RUNTIME",
      title: "Services & APIs",
      items: [
        ["Python FastAPI", "ADOPT"],
        ["Node.js / TypeScript", "ADOPT"],
        ["Go (High Concurrency)", "TRIAL"],
        ["gRPC / Protobuf", "ADOPT"],
      ],
      footer: "ASYNC IO SUBSYSTEMS",
    },
    {
      label: "PERSISTENCE",
      title: "Data & Memory",
      items: [
        ["PostgreSQL (pgvector)", "ADOPT"],
        ["Redis Cluster", "ADOPT"],
        ["ClickHouse", "TRIAL"],
        ["Supabase Sovereign", "ADOPT"],
      ],
      footer: "ACID RESTRICTED",
    },
    {
      label: "INFRASTRUCTURE",
      title: "Cloud & Security",
      items: [
        ["AWS Middle East", "ADOPT"],
        ["Terraform (IaC)", "ADOPT"],
        ["Cloudflare Edge", "ADOPT"],
        ["Docker / K8s", "ADOPT"],
      ],
      footer: "ZERO-TRUST SECURED",
    },
  ];

  return (
    <div style={{ backgroundColor: C.surface }}>
      <StructuredData type="services" />

      {/* ── HERO ── */}
      <section
        style={{
          width: "100%",
          paddingTop: "8rem",
          paddingBottom: "6rem",
          position: "relative",
          overflow: "hidden",
        }}
        className="px-margin-mobile lg:px-margin hero-grid-bg"
      >
        <ParticleHero />
        <div
          style={{
            position: "absolute",
            top: "-8rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "720px",
            height: "520px",
            background: "rgba(123,208,255,0.06)",
            borderRadius: "50%",
            filter: "blur(140px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-10rem",
            width: "400px",
            height: "400px",
            background: "rgba(208,188,255,0.05)",
            borderRadius: "50%",
            filter: "blur(120px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "4px 16px 4px 4px",
              borderRadius: "9999px",
              backgroundColor: C.surfaceLow,
              boxShadow: "0 0 24px -4px rgba(123,208,255,0.15)",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 10px",
                borderRadius: "9999px",
                backgroundColor: C.surfaceContainer,
                color: C.secondary,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: C.secondary,
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              {t("services.label")}
            </span>
            <span
              style={{
                color: C.onSurfaceVariant,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t("services.hero.badge")}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-outfit), Outfit, sans-serif",
              fontSize: "clamp(40px, 7vw, 72px)",
              lineHeight: "1.05",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: "0 0 1.5rem",
              maxWidth: "900px",
            }}
          >
            <span className="hero-title-shimmer">{t("services.title")}</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              color: C.onSurfaceVariant,
              maxWidth: "640px",
              marginBottom: "2rem",
            }}
          >
            {t("services.subtitle")}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              color: C.onSurface,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {[
              { dot: C.primary, label: t("services.hero.tag1") },
              { dot: C.secondary, label: t("services.hero.tag2") },
              { dot: C.tertiary, label: t("services.hero.tag3") },
            ].map((p) => (
              <span
                key={p.label}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: p.dot,
                  }}
                />
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLAR 01: BUILD ── */}
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
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: C.outline,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: C.primary,
                }}
              />
              {t("services.build.badge")}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "28px",
                lineHeight: "36px",
                fontWeight: 700,
                color: C.onSurface,
                margin: 0,
              }}
            >
              {t("services.build.title")}
            </h2>
          </div>
          <p
            style={{
              color: C.onSurfaceVariant,
              fontSize: "13px",
              maxWidth: "400px",
              margin: 0,
            }}
          >
            {t("services.build.desc")}
          </p>
        </div>

        {/* Featured service */}
        <div
          style={{
            borderRadius: "1rem",
            backgroundColor: C.surfaceLowest,
            padding: "2rem",
            boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1rem",
            }}
          >
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
              {t("services.build.f.badge")}
            </span>
            <span
              className="material-symbols-outlined"
              style={{ color: C.primary, fontSize: "20px" }}
            >
              devices
            </span>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(24px, 3vw, 40px)",
              lineHeight: "1.2",
              fontWeight: 700,
              color: C.onSurface,
              margin: "0 0 0.75rem",
            }}
          >
            {t("services.build.f.title")}
          </h3>
          <p
            style={{
              color: C.onSurfaceVariant,
              fontSize: "15px",
              lineHeight: "24px",
              marginBottom: "1.5rem",
              maxWidth: "680px",
            }}
          >
            {t("services.build.f.desc")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
              gap: "1rem",
              padding: "1rem",
              borderRadius: "12px",
              backgroundColor: C.surfaceContainer,
              marginBottom: "1.5rem",
            }}
          >
            {[
              [t("services.build.f.p1.t"), t("services.build.f.p1.d")],
              [t("services.build.f.p2.t"), t("services.build.f.p2.d")],
              [t("services.build.f.p3.t"), t("services.build.f.p3.d")],
            ].map(([k, v]) => (
              <div key={k}>
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
                  {k}
                </span>
                <span
                  style={{
                    color: C.secondary,
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              t("services.build.f.tag1"),
              t("services.build.f.tag2"),
              t("services.build.f.tag3"),
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  backgroundColor: C.surfaceContainerHighest,
                  color: C.onSurfaceVariant,
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Smaller service cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {buildServices.map((s) => (
            <div
              key={s.num}
              style={{
                borderRadius: "1rem",
                backgroundColor: C.surfaceLowest,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "240px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
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
                    {s.num}
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: C.primary, fontSize: "20px" }}
                  >
                    {s.icon}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "20px",
                    lineHeight: "28px",
                    fontWeight: 600,
                    color: C.onSurface,
                    margin: "0 0 0.5rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: C.onSurfaceVariant,
                    fontSize: "13px",
                    lineHeight: "20px",
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PILLAR 02: DESIGN ── */}
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
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: C.outline,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: C.secondary,
                }}
              />
              PILLAR 02
            </div>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "28px",
                lineHeight: "36px",
                fontWeight: 700,
                color: C.onSurface,
                margin: 0,
              }}
            >
              Design &amp; Ergonomics
            </h2>
          </div>
        </div>
        <div
          style={{ gap: "1.5rem" }}
          className="grid grid-cols-1 lg:grid-cols-2"
        >
          <div
            style={{
              borderRadius: "1rem",
              backgroundColor: C.surfaceLowest,
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  backgroundColor: C.surfaceContainer,
                  color: C.secondary,
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                PHYSICAL INTERFACE PRECISION
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "28px",
                  lineHeight: "36px",
                  fontWeight: 700,
                  color: C.onSurface,
                  margin: "0 0 0.75rem",
                }}
              >
                Product Design &amp; UX Ergonomics
              </h3>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  fontSize: "15px",
                  lineHeight: "24px",
                  marginBottom: "1.5rem",
                }}
              >
                We eliminate cognitive friction. Every interface is tested for
                seamless native Arabic right-to-left typographic alignment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  [
                    "Tokenized Systems",
                    "Direct Figma to Flutter code variable synchronization.",
                  ],
                  [
                    "Ergonomic Specs",
                    "Thumb-reachable command sheets, momentum-based drag sheets.",
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    style={{
                      padding: "1rem",
                      borderRadius: "12px",
                      backgroundColor: C.surfaceContainer,
                    }}
                  >
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
                      {title}
                    </span>
                    <p
                      style={{
                        color: C.onSurface,
                        fontSize: "13px",
                        margin: 0,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              borderRadius: "1rem",
              backgroundColor: C.surfaceLow,
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
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
                Ergonomic Architecture Index
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(94,223,129,0.15)",
                  color: C.tertiary,
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              >
                AA Accessible
              </span>
            </div>
            <div
              style={{
                padding: "1rem",
                borderRadius: "12px",
                backgroundColor: C.surfaceLowest,
                fontFamily: "monospace",
                fontSize: "12px",
                lineHeight: "22px",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", gap: "6px" }}>
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#ff5f56",
                    }}
                  />
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: C.secondary,
                    }}
                  />
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: C.tertiary,
                    }}
                  />
                </div>
                <span style={{ color: C.outline }}>token_pipeline.swift</span>
              </div>
              <p
                style={{ color: C.primary, margin: "4px 0" }}
              >{`// GCC Regional Typographic Hierarchy`}</p>
              <p style={{ color: C.onSurface, margin: "4px 0" }}>
                <span style={{ color: C.secondary }}>let</span> typography =
                DesignTokens.arabicKufi(scale: 1.25)
              </p>
              <p style={{ color: C.tertiary, margin: "4px 0" }}>
                system.optimizeGestureBounds(reachability: .oneHanded)
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                ["60–72mm", "Thumb Arc"],
                ["100%", "RTL"],
                ["0ms", "Sync Lag"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: C.surfaceContainer,
                  }}
                >
                  <span
                    style={{
                      color: C.onSurface,
                      fontSize: "20px",
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    {v}
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
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLAR 03: SCALE ── */}
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
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: C.outline,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: C.tertiary,
                }}
              />
              PILLAR 03
            </div>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "28px",
                lineHeight: "36px",
                fontWeight: 700,
                color: C.onSurface,
                margin: 0,
              }}
            >
              Launch &amp; Scale
            </h2>
          </div>
        </div>
        <div
          style={{ gap: "1.5rem" }}
          className="grid grid-cols-1 lg:grid-cols-2"
        >
          {[
            {
              badge: "8 TO 12 WEEK ACCELERATOR",
              title: "Rapid Venture MVP Build",
              desc: "We engineer first editions that secure venture capital. No discardable prototype code — we write clean, production-ready systems architected so your internal tech team can scale them seamlessly post-launch.",
              points: [
                "Hyper-focused product scope definition",
                "Pre-built auth, payment & telemetry pipelines",
                "App Store approval guarantee",
              ],
              footer: ["Timeline Window", "8 – 12 Weeks"],
              color: C.primary,
            },
            {
              badge: "MISSION CRITICAL",
              title: "Product Maintenance & SRE",
              desc: "Enterprise peace of mind. Continuous automated security patches, real-time APM telemetry, zero-downtime database upgrades, and rapid compatibility updates for annual iOS and Android releases.",
              points: [
                "Automated alerting via PagerDuty & Datadog",
                "Quarterly security vulnerabilities audit",
                "Database replication & backup recovery drill",
              ],
              footer: ["Response Protocol", "< 15 min P1 SLA"],
              color: C.secondary,
            },
          ].map((s) => (
            <div
              key={s.title}
              style={{
                borderRadius: "1rem",
                backgroundColor: C.surfaceLowest,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      backgroundColor: C.surfaceContainer,
                      color: C.tertiary,
                      fontSize: "10px",
                      fontFamily: "monospace",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.badge}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "28px",
                    lineHeight: "36px",
                    fontWeight: 700,
                    color: C.onSurface,
                    margin: "0 0 0.75rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: C.onSurfaceVariant,
                    fontSize: "15px",
                    lineHeight: "24px",
                    marginBottom: "1.5rem",
                  }}
                >
                  {s.desc}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {s.points.map((p) => (
                    <li
                      key={p}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        color: C.onSurface,
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ color: s.color, fontSize: "18px" }}
                      >
                        verified
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "12px",
                  backgroundColor: C.surfaceContainer,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                    }}
                  >
                    {s.footer[0]}
                  </span>
                  <span
                    style={{
                      color: C.onSurface,
                      fontSize: "20px",
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 600,
                    }}
                  >
                    {s.footer[1]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH RADAR ── */}
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
            backgroundColor: C.surfaceLowest,
            padding: "2rem",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
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
              RADAR &amp; PRODUCTION STACK
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "28px",
                lineHeight: "36px",
                fontWeight: 700,
                color: C.onSurface,
                margin: 0,
              }}
            >
              Calibrated Technology Matrix
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: "1rem",
            }}
          >
            {techRadar.map((col) => (
              <div
                key={col.label}
                style={{
                  padding: "1rem",
                  borderRadius: "12px",
                  backgroundColor: C.surfaceContainer,
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
                    {col.label}
                  </span>
                  <h4
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: C.onSurface,
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {col.title}
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {col.items.map(([name, status]) => (
                      <li
                        key={name}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "13px",
                        }}
                      >
                        <span style={{ color: C.onSurface }}>{name}</span>
                        <span
                          style={{
                            color:
                              status === "ADOPT" ? C.tertiary : C.secondary,
                            fontSize: "10px",
                            fontFamily: "monospace",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                          }}
                        >
                          {status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ paddingTop: "1rem" }}>
                  <span
                    style={{
                      color: C.outline,
                      fontSize: "10px",
                      fontFamily: "monospace",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {col.footer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCOPE ESTIMATOR ── */}
      <ScopeEstimator />

      {/* ── CTA ── */}
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
            borderRadius: "1.5rem",
            padding: "3rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(to bottom, ${C.surfaceContainerHigh}, ${C.surfaceLowest})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at top, rgba(160,120,255,0.12), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <span
            style={{
              color: C.primary,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            DIRECT ENGAGEMENT
          </span>
          <h2
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(28px, 5vw, 48px)",
              lineHeight: "1.1",
              fontWeight: 800,
              color: C.onSurface,
              margin: "0 0 1rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {t("inquiry.title")}
          </h2>
          <p
            style={{
              color: C.onSurfaceVariant,
              fontSize: "18px",
              lineHeight: "28px",
              maxWidth: "500px",
              margin: "0 auto 2rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {t("inquiry.body")}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "14px 28px",
                borderRadius: "9999px",
                backgroundColor: C.primaryContainer,
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(160,120,255,0.5)",
              }}
            >
              {t("nav.startProject")}{" "}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                north_east
              </span>
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "14px 28px",
                borderRadius: "9999px",
                backgroundColor: C.surfaceContainer,
                color: C.onSurface,
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                calendar_today
              </span>
              {t("nav.bookCall")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
