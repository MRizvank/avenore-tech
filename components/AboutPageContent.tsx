"use client";

import ParticleHero from "@/components/ParticleHero";
import Link from "next/link";
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
  primary: "#d0bcff",
  primaryContainer: "#8b5cf6",
  onPrimaryContainer: "#340080",
  secondary: "#8b5cf6",
  tertiary: "#5edf81",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

export default function AboutPageContent() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: C.surface }}>
      <StructuredData type="about" />

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
            background: "rgba(208,188,255,0.06)",
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
            background: "rgba(94,223,129,0.05)",
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
              boxShadow: "0 0 24px -4px rgba(208,188,255,0.15)",
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
                color: C.primary,
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
                  backgroundColor: C.primary,
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              {t("about.label")}
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
              {t("about.mandate.badge")}
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
            <span className="hero-title-shimmer">{t("about.title")}</span>
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
            {t("about.subtitle")}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              color: C.outline,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span>{t("about.mandate.loc1")}</span>
            <span>·</span>
            <span>{t("about.mandate.loc2")}</span>
            <span>·</span>
            <span>{t("about.mandate.loc3")}</span>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO + STATS ── */}
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
          style={{ gap: "3rem", alignItems: "center" }}
          className="grid grid-cols-1 lg:grid-cols-2"
        >
          <div>
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
              }}
            >
              {t("about.mandate.label")}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: "1.2",
                fontWeight: 700,
                color: C.onSurface,
                margin: "0 0 1rem",
              }}
            >
              {t("about.mandate.title")}
            </h2>
            <p
              style={{
                color: C.onSurfaceVariant,
                fontSize: "15px",
                lineHeight: "24px",
                marginBottom: "1rem",
              }}
            >
              {t("about.mandate.p1")}
            </p>
            <p
              style={{
                color: C.onSurfaceVariant,
                fontSize: "15px",
                lineHeight: "24px",
              }}
            >
              {t("about.mandate.p2")}
            </p>
          </div>
          <div
            style={{
              borderRadius: "1.5rem",
              backgroundColor: C.surfaceLowest,
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {[
              { num: "20+", label: t("about.stats.1.label"), color: C.primary },
              {
                num: "8+",
                label: t("about.stats.2.label"),
                color: C.secondary,
              },
              {
                num: "100%",
                label: t("about.stats.3.label"),
                color: C.tertiary,
              },
              {
                num: "5+",
                label: t("about.stats.4.label"),
                color: C.onSurface,
              },
            ].map((m, i) => (
              <div
                key={m.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: i < 3 ? "1.5rem" : 0,
                  borderBottom: i < 3 ? `1px solid rgba(73,68,84,0.2)` : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "clamp(32px, 5vw, 48px)",
                    fontWeight: 800,
                    color: m.color,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.num}
                </span>
                <span
                  style={{
                    color: C.outline,
                    fontSize: "10px",
                    fontFamily: "monospace",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textAlign: "right",
                    maxWidth: "200px",
                  }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PRINCIPLES ── */}
      <section
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          paddingBottom: "4rem",
          width: "100%",
        }}
        className="px-margin-mobile lg:px-margin"
      >
        <div style={{ marginBottom: "2rem" }}>
          <span
            style={{
              color: C.secondary,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            {t("about.principles.label")}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: "1.2",
              fontWeight: 700,
              color: C.onSurface,
              margin: 0,
            }}
          >
            {t("about.principles.title")}
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              num: "01",
              color: C.primary,
              icon: "sync",
              title: t("about.principles.1.title"),
              desc: t("about.principles.1.desc"),
              checks: [
                t("about.principles.1.check1"),
                t("about.principles.1.check2"),
                t("about.principles.1.check3"),
              ],
            },
            {
              num: "02",
              color: C.secondary,
              icon: "hub",
              title: t("about.principles.2.title"),
              desc: t("about.principles.2.desc"),
              checks: [
                t("about.principles.2.check1"),
                t("about.principles.2.check2"),
                t("about.principles.2.check3"),
              ],
            },
            {
              num: "03",
              color: C.tertiary,
              icon: "terminal",
              title: t("about.principles.3.title"),
              desc: t("about.principles.3.desc"),
              checks: [
                t("about.principles.3.check1"),
                t("about.principles.3.check2"),
                t("about.principles.3.check3"),
              ],
            },
          ].map((p) => (
            <div
              key={p.num}
              style={{
                borderRadius: "1.5rem",
                backgroundColor: C.surfaceLow,
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
                      fontFamily: "var(--font-outfit)",
                      fontSize: "40px",
                      fontWeight: 800,
                      color: `${p.color}44`,
                    }}
                  >
                    {p.num}
                  </span>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: C.surfaceContainerHigh,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: p.color, fontSize: "20px" }}
                    >
                      {p.icon}
                    </span>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: C.onSurface,
                    margin: "0 0 0.75rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: C.onSurfaceVariant,
                    fontSize: "15px",
                    lineHeight: "24px",
                    marginBottom: "1.5rem",
                  }}
                >
                  {p.desc}
                </p>
              </div>
              <div
                style={{
                  borderTop: `1px solid rgba(73,68,84,0.2)`,
                  paddingTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {p.checks.map((c) => (
                  <div
                    key={c}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: C.onSurface,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: p.color, fontSize: "18px" }}
                    >
                      check_circle
                    </span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DUAL HUB ── */}
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
            backgroundColor: C.surfaceLowest,
            padding: "2rem",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <span
              style={{
                color: C.secondary,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              {t("about.hubs.label")}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: C.onSurface,
                margin: "0 0 0.5rem",
              }}
            >
              {t("about.hubs.title")}
            </h2>
            <p
              style={{
                color: C.onSurfaceVariant,
                fontSize: "15px",
                maxWidth: "560px",
              }}
            >
              {t("about.hubs.desc")}
            </p>
          </div>
          <div
            style={{ gap: "1.5rem" }}
            className="grid grid-cols-1 lg:grid-cols-2"
          >
            {[
              {
                badge: t("about.hubs.1.badge"),
                badgeColor: C.tertiary,
                location: t("about.hubs.1.location"),
                title: t("about.hubs.1.title"),
                desc: t("about.hubs.1.desc"),
                tz: t("about.hubs.1.tz"),
                radius: t("about.hubs.1.radius"),
              },
              {
                badge: t("about.hubs.2.badge"),
                badgeColor: C.primary,
                location: t("about.hubs.2.location"),
                title: t("about.hubs.2.title"),
                desc: t("about.hubs.2.desc"),
                tz: t("about.hubs.2.tz"),
                radius: t("about.hubs.2.radius"),
              },
            ].map((hub) => (
              <div
                key={hub.badge}
                style={{
                  borderRadius: "1rem",
                  backgroundColor: C.surfaceLow,
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
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: hub.badgeColor,
                        fontSize: "10px",
                        fontFamily: "monospace",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: hub.badgeColor,
                        }}
                      />
                      {hub.badge}
                    </span>
                    <span
                      style={{
                        color: C.outline,
                        fontSize: "10px",
                        fontFamily: "monospace",
                        fontWeight: 600,
                      }}
                    >
                      {hub.location}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: C.onSurface,
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {hub.title}
                  </h3>
                  <p
                    style={{
                      color: C.onSurfaceVariant,
                      fontSize: "15px",
                      lineHeight: "24px",
                    }}
                  >
                    {hub.desc}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1rem",
                    borderTop: `1px solid rgba(73,68,84,0.2)`,
                    display: "flex",
                    justifyContent: "space-between",
                    color: C.outline,
                    fontSize: "10px",
                    fontFamily: "monospace",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  <span>{hub.tz}</span>
                  <span style={{ color: C.onSurface }}>{hub.radius}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
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
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: C.outline,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            {t("about.partners.label")}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
              opacity: 0.7,
            }}
          >
            {[
              "FASH",
              "SEQUIFI",
              "MCC DUBAI",
              "SR INNOVATIONS",
              "KAPITAL GCC",
            ].map((brand) => (
              <span
                key={brand}
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: C.onSurface,
                  letterSpacing: "-0.02em",
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

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
            backgroundColor: C.surfaceLow,
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            boxShadow: "0 0 60px -15px rgba(160,120,255,0.2)",
          }}
          className="lg:flex-row lg:items-center lg:justify-between"
        >
          <div
            style={{
              position: "absolute",
              top: "-5rem",
              right: "-5rem",
              width: "320px",
              height: "320px",
              background: "rgba(208,188,255,0.12)",
              borderRadius: "50%",
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "560px" }}>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: "1.2",
                fontWeight: 700,
                color: C.onSurface,
                margin: "0 0 0.75rem",
              }}
            >
              {t("inquiry.title")}
            </h2>
            <p
              style={{
                color: C.onSurfaceVariant,
                fontSize: "18px",
                lineHeight: "28px",
              }}
            >
              {t("inquiry.body")}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "14px 28px",
                borderRadius: "9999px",
                backgroundColor: C.primaryContainer,
                color: C.onPrimaryContainer,
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(160,120,255,0.5)",
              }}
            >
              {t("nav.startProject")} ↗
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "14px 28px",
                borderRadius: "9999px",
                backgroundColor: C.surfaceContainerHigh,
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
