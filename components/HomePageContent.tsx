"use client";

import Link from "next/link";
import InteractiveTechMarquee from "@/components/InteractiveTechMarquee";
import FaqAccordion from "@/components/FaqAccordion";
import InquiryForm from "@/components/InquiryForm";
import CalButton from "@/components/CalButton";
import ParticleHero from "@/components/ParticleHero";
import CapabilityOrbit from "@/components/CapabilityOrbit";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import ScrollRevealText from "@/components/ScrollRevealText";
import UrgencyCards from "@/components/UrgencyCards";
import StructuredData from "@/components/StructuredData";
import StudioPanel from "@/components/StudioPanel";
import TestimonialShowcase from "@/components/TestimonialShowcase";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildCaseStudies } from "@/lib/caseStudies";

// ─── Shared inline style tokens ───────────────────────────────────────────────
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

export default function HomePageContent() {
  const { t, isRTL } = useLanguage();

  return (
    <div style={{ backgroundColor: C.surface }}>
      <StructuredData type="home" />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          paddingTop: "4rem",
          paddingBottom: "5rem",
          backgroundColor: C.surface,
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
            top: "33%",
            right: "-6rem",
            width: "380px",
            height: "380px",
            background: "rgba(160,120,255,0.04)",
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
          {/* Badge */}
          <>
            <style>{`
    .hero-badge-pill {
      display: inline-flex;
    }
    @media (max-width: 640px) {
      .hero-badge-pill {
        display: block; /* or "flex" / "none" depending on what you want on mobile */
      }
    }
  `}</style>

            <div
              className="hero-badge-pill"
              style={{
                alignItems: "center",
                gap: "0.5rem",
                padding: "4px 16px 4px 4px",
                borderRadius: "9999px",
                backgroundColor: C.surfaceLow,
                boxShadow: "0 0 24px -4px rgba(208,188,255,0.2)",
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
                {t("hero.badge")}
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
                {t("hero.location")}
              </span>
            </div>
          </>

          {/* Headline */}
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
            <span className="hero-title-shimmer">{t("hero.headline")}</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              color: C.onSurfaceVariant,
              maxWidth: "640px",
              marginBottom: "2rem",
            }}
          >
            {t("hero.subheadline")}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <Link
              href="#inquiry"
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
                boxShadow: "0 0 28px rgba(160,120,255,0.5)",
                transition: "all 0.2s",
                position: "relative",
                zIndex: 1,
              }}
              className="animate-glow-ring"
            >
              <span>{t("hero.cta.primary")}</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                north_east
              </span>
            </Link>
            <Link
              href="#work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "14px 28px",
                borderRadius: "9999px",
                backgroundColor: C.surfaceLow,
                color: C.onSurface,
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s",
                position: "relative",
                zIndex: 1,
              }}
              className="glow-border"
            >
              <span>{t("hero.cta.secondary")}</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                south
              </span>
            </Link>
          </div>

          {/* Proof */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: C.outline,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                width: "8px",
                height: "8px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: C.tertiary,
                  opacity: 0.6,
                  animation: "ping 1.5s infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: C.tertiary,
                }}
              />
            </span>
            {t("hero.proof")}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE TECH MARQUEE ─────────────────────────────────────────── */}
      <InteractiveTechMarquee />

      {/* ── MANIFESTO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          width: "100%",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          backgroundColor: C.surfaceLowest,
        }}
        className="px-margin-mobile lg:px-margin"
      >
        <div
          style={{ maxWidth: "80rem", margin: "0 auto", gap: "2.5rem" }}
          className="grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-3">
            <span
              style={{
                color: C.primary,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "block",
              }}
            >
              {t("manifesto.label")}
            </span>
            <span
              style={{
                color: C.outline,
                fontSize: "20px",
                fontFamily: "var(--font-outfit)",
                fontWeight: 600,
                display: "block",
                marginTop: "8px",
              }}
            >
              {t("manifesto.sectionTitle")}
            </span>
          </div>
          <div className="lg:col-span-9">
            <ScrollRevealText
              as="h2"
              text={t("manifesto.headline")}
              highlight={t("manifesto.highlight")}
              highlightColor={C.primary}
              start="top 85%"
              end="bottom 60%"
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: "1.15",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            />
            <ScrollRevealText
              as="p"
              text={t("manifesto.body")}
              start="top 80%"
              end="bottom 45%"
              style={{
                fontSize: "clamp(17px, 1.4vw, 20px)",
                lineHeight: "1.6",
                color: C.onSurface,
                maxWidth: "760px",
              }}
            />

            {/* Proof points pulled from the copy */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "10px",
                marginTop: "2rem",
              }}
            >
              {(
                [
                  ["block", t("manifesto.point1")],
                  ["verified", t("manifesto.point2")],
                  ["cloud_done", t("manifesto.point3")],
                ] as const
              ).map(([icon, label]) => (
                <span
                  key={icon}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 16px 9px 12px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(73,68,84,0.4)",
                    backgroundColor: "rgba(31,31,36,0.6)",
                    color: C.onSurfaceVariant,
                    fontSize: "13px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px", color: C.tertiary }}
                  >
                    {icon}
                  </span>
                  {label}
                </span>
              ))}

              <Link
                href="/about"
                className="manifesto-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginInlineStart: "auto",
                  color: C.onSurface,
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {t("manifesto.cta")}
                <span
                  className="material-symbols-outlined manifesto-link__arrow"
                  style={{ fontSize: "18px", color: C.primary }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>

            <UrgencyCards
              heading={t("manifesto.whyNow")}
              cards={[
                {
                  icon: "trending_up",
                  viz: "race",
                  tag: t("manifesto.urgency1.tag"),
                  title: t("manifesto.urgency1.title"),
                  desc: t("manifesto.urgency1.desc"),
                },
                {
                  icon: "reviews",
                  viz: "review",
                  tag: t("manifesto.urgency2.tag"),
                  title: t("manifesto.urgency2.title"),
                  desc: t("manifesto.urgency2.desc"),
                },
                {
                  icon: "rocket_launch",
                  viz: "timeline",
                  tag: t("manifesto.urgency3.tag"),
                  title: t("manifesto.urgency3.title"),
                  desc: t("manifesto.urgency3.desc"),
                },
                {
                  icon: "bolt",
                  viz: "clock",
                  tag: t("manifesto.urgency4.tag"),
                  title: t("manifesto.urgency4.title"),
                  desc: t("manifesto.urgency4.desc"),
                },
              ]}
              labels={{
                you: t("manifesto.viz.you"),
                competitor: t("manifesto.viz.competitor"),
                shipped: t("manifesto.viz.shipped"),
                waiting: t("manifesto.viz.waiting"),
                review1: t("manifesto.viz.review1"),
                review2: t("manifesto.viz.review2"),
                week: t("manifesto.viz.week"),
                launch: t("manifesto.viz.launch"),
                briefSent: t("manifesto.viz.briefSent"),
                estimateSent: t("manifesto.viz.estimateSent"),
              }}
            />
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ──────────────────────────────────────────────────── */}
      <section
        style={{
          width: "100%",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          backgroundColor: C.surface,
        }}
        className="px-margin-mobile lg:px-margin"
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "2.5rem",
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
              {t("capabilities.label")}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: "1.2",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {t("capabilities.title")}
            </h2>
            <p
              style={{
                color: C.onSurfaceVariant,
                fontSize: "15px",
                maxWidth: "480px",
              }}
            >
              {t("capabilities.subtitle")}
            </p>
          </div>

          <CapabilityOrbit
            items={[
              {
                id: "mobile",
                icon: "smartphone",
                accent: "#8b5cf6",
                title: t("capabilities.1.title"),
                desc: t("capabilities.1.desc"),
                badge: t("capabilities.1.badge"),
              },
              {
                id: "backend",
                icon: "dns",
                accent: "#5edf81",
                title: t("capabilities.2.title"),
                desc: t("capabilities.2.desc"),
              },
              {
                id: "ergonomics",
                icon: "touch_app",
                accent: "#d0bcff",
                title: t("capabilities.3.title"),
                desc: t("capabilities.3.desc"),
              },
              {
                id: "mvp",
                icon: "rocket_launch",
                accent: "#00a6e0",
                title: t("capabilities.4.title"),
                desc: t("capabilities.4.desc"),
              },
              {
                id: "web",
                icon: "desktop_mac",
                accent: "#e4e1e8",
                title: t("capabilities.5.title"),
                desc: t("capabilities.5.desc"),
              },
            ]}
            prevLabel={t("capabilities.prev")}
            nextLabel={t("capabilities.next")}
            hint={t("capabilities.hint")}
          />
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────────────────────── */}
      <section
        id="work"
        style={{
          width: "100%",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          backgroundColor: C.surfaceLowest,
        }}
        className="px-margin-mobile lg:px-margin"
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1.25rem 2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ maxWidth: "40rem" }}>
              <span
                style={{
                  color: C.primary,
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {t("portfolio.label")}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  lineHeight: "1.2",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: C.onSurface,
                  textTransform: "uppercase",
                  margin: "0 0 0.75rem",
                }}
              >
                {t("portfolio.title")}
              </h2>
              <p
                style={{
                  color: C.onSurfaceVariant,
                  fontSize: "15px",
                  lineHeight: "24px",
                  margin: 0,
                }}
              >
                {t("work.subtitle")}
              </p>
            </div>
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 24px",
                borderRadius: "9999px",
                backgroundColor: C.surfaceLow,
                color: C.onSurface,
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                border: `1px solid ${C.outlineVariant}`,
                flexShrink: 0,
              }}
            >
              <span>{t("work.viewAll")}</span>
              <span
                className="material-symbols-outlined rtl:-scale-x-100"
                style={{ fontSize: "18px" }}
              >
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Compact teaser: the first three cases. Full stories live on /work. */}
          <CaseStudyPreview
            cases={buildCaseStudies(t).slice(0, 3)}
            href="/work"
            labels={{
              caseStudy: t("work.caseStudy"),
              viewCaseStudy: t("common.viewCaseStudy"),
            }}
          />
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section
        style={{
          width: "100%",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          backgroundColor: C.surface,
        }}
        className="px-margin-mobile lg:px-margin"
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <TestimonialShowcase
            rtl={isRTL}
            heading={{
              label: t("testimonials.label"),
              title: t("testimonials.title"),
              subtitle: t("testimonials.subtitle"),
            }}
            labels={{ prev: t("testimonials.prev"), next: t("testimonials.next") }}
            items={[
              {
                id: "01",
                quote: t("testimonials.1.quote"),
                name: t("testimonials.1.name"),
                role: t("testimonials.1.role"),
                accent: C.primary,
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1_JXnyTYhX3i5FQLeh2YprTOKI_uVu1oOOy9AWM-SWk1SH_A7frNUl3ZBWeht7QxrzvvBuMmPsfRUnHcVQ6nNXTlE3JrfL4EY3PQNwepPXakFQb7mLLFr6oY6rgjzWVOxaX3UElwtfIsxcIMIlsVndDMFGOp8gkRnNRVcNy7ViiHUBQzBjAIdSstrUgoW_q0dEmIJ71qeTLUsjJ8PrcaaK2XRI9dOr3AdYwlcrvME5-rcALynnSRxtQ",
                stat: { value: t("testimonials.1.stat"), label: t("testimonials.1.statLabel") },
              },
              {
                id: "02",
                quote: t("testimonials.2.quote"),
                name: t("testimonials.2.name"),
                role: t("testimonials.2.role"),
                accent: "#00a6e0",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWBRllosaFiRkSzdwvRsaN3-pZRw6cndBVEnMTRx5RLJPI9Zlyvqfb0Mebil4hkf1RlHENM7FBYk0-9udn1we-_OQi7fVhZ52A3bxzvMfaQvOsoti6McfSIohpuzCVYtjnkFdKjY32KRVBsOzwh0q9Cvb8jsHEVWfX4pxs9V1jiRXFRi_nZtnwg1zuuPy8KhiHaKzTmWfr1fV6YI7tTnP3knyXfngrUu9oJ4JiZsWu1w8uIz07kHF65Q",
                stat: { value: t("testimonials.2.stat"), label: t("testimonials.2.statLabel") },
              },
              {
                id: "03",
                quote: t("testimonials.3.quote"),
                name: t("testimonials.3.name"),
                role: t("testimonials.3.role"),
                accent: C.tertiary,
                stat: { value: t("testimonials.3.stat"), label: t("testimonials.3.statLabel") },
              },
              {
                id: "04",
                quote: t("testimonials.4.quote"),
                name: t("testimonials.4.name"),
                role: t("testimonials.4.role"),
                accent: "#d0bcff",
                stat: { value: t("testimonials.4.stat"), label: t("testimonials.4.statLabel") },
              },
              {
                id: "05",
                quote: t("testimonials.5.quote"),
                name: t("testimonials.5.name"),
                role: t("testimonials.5.role"),
                accent: "#f5a97f",
                stat: { value: t("testimonials.5.stat"), label: t("testimonials.5.statLabel") },
              },
            ]}
          />
        </div>
      </section>

      {/* ── WHO WE ARE ────────────────────────────────────────────────────── */}
      <section
        style={{
          width: "100%",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          backgroundColor: C.surfaceLowest,
          position: "relative",
          overflow: "hidden",
        }}
        className="px-margin-mobile lg:px-margin"
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-8rem",
            right: "-6rem",
            width: "460px",
            height: "460px",
            background: "rgba(208,188,255,0.06)",
            borderRadius: "50%",
            filter: "blur(140px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            gap: "3rem",
            position: "relative",
          }}
          className="grid grid-cols-1 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-5">
            <span
              style={{
                color: C.primary,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              {t("whoWeAre.label")}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: "1.2",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                textTransform: "uppercase",
                margin: "0 0 1rem",
              }}
            >
              {t("whoWeAre.title")}
            </h2>
            <p
              style={{
                color: C.onSurfaceVariant,
                fontSize: "15px",
                lineHeight: "24px",
                margin: 0,
              }}
            >
              {t("whoWeAre.body")}
            </p>

            {/* The commitments a buyer actually cares about */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "1.75rem 0 0",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {(
                [
                  ["verified_user", "whoWeAre.c1.title", "whoWeAre.c1.desc"],
                  ["key", "whoWeAre.c2.title", "whoWeAre.c2.desc"],
                  ["forum", "whoWeAre.c3.title", "whoWeAre.c3.desc"],
                  ["monitoring", "whoWeAre.c4.title", "whoWeAre.c4.desc"],
                ] as const
              ).map(([icon, title, desc]) => (
                <li
                  key={icon}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: "38px",
                      height: "38px",
                      borderRadius: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(139,92,246,0.12)",
                      border: "1px solid rgba(139,92,246,0.25)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px", color: C.primary }}
                    >
                      {icon}
                    </span>
                  </span>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-outfit)",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: C.onSurface,
                      }}
                    >
                      {t(title)}
                    </p>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontSize: "13px",
                        lineHeight: 1.5,
                        color: C.onSurfaceVariant,
                      }}
                    >
                      {t(desc)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px 22px",
                marginTop: "2rem",
              }}
            >
              <CalButton
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 22px",
                  borderRadius: "9999px",
                  backgroundColor: C.primaryContainer,
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 0 24px rgba(160,120,255,0.35)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  calendar_month
                </span>
                {t("nav.bookCall")}
              </CalButton>
              <Link
                href="/about"
                className="manifesto-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: C.onSurface,
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {t("whoWeAre.team")}
                <span
                  className="material-symbols-outlined manifesto-link__arrow"
                  style={{ fontSize: "18px", color: C.primary }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <StudioPanel />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          width: "100%",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          backgroundColor: C.surface,
        }}
        className="px-margin-mobile lg:px-margin"
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              style={{
                color: C.primary,
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "8px",
              }}
            >
              {t("faq.label")}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: "1.2",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {t("faq.title")}
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── PROJECT INQUIRY ───────────────────────────────────────────────── */}
      <section
        id="inquiry"
        style={{
          width: "100%",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          backgroundColor: C.surfaceLowest,
          position: "relative",
          overflow: "hidden",
        }}
        className="px-margin-mobile lg:px-margin"
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: "rgba(208,188,255,0.07)",
            borderRadius: "50%",
            filter: "blur(140px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ maxWidth: "80rem", margin: "0 auto", gap: "3rem" }}
          className="grid grid-cols-1 lg:grid-cols-12"
        >
          <div
            className="lg:col-span-5"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
              {t("inquiry.label")}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: "1.2",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                textTransform: "uppercase",
                margin: 0,
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
            <div style={{ marginTop: "0.5rem" }}>
              <CalButton
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  borderRadius: "9999px",
                  backgroundColor: C.surfaceLow,
                  color: C.onSurface,
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: C.primary, fontSize: "18px" }}
                >
                  calendar_month
                </span>
                {t("inquiry.cta")}
              </CalButton>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginTop: "0.5rem",
              }}
            >
              {[t("inquiry.check1"), t("inquiry.check2")].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: C.outline,
                    fontSize: "10px",
                    fontFamily: "monospace",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: C.tertiary, fontSize: "16px" }}
                  >
                    check
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .manifesto-link__arrow {
          transition: transform 0.25s ease;
        }
        .manifesto-link:hover .manifesto-link__arrow,
        .manifesto-link:focus-visible .manifesto-link__arrow {
          transform: translateX(4px);
        }
        [dir="rtl"] .manifesto-link__arrow {
          transform: scaleX(-1);
        }
        [dir="rtl"] .manifesto-link:hover .manifesto-link__arrow,
        [dir="rtl"] .manifesto-link:focus-visible .manifesto-link__arrow {
          transform: scaleX(-1) translateX(4px);
        }
      `}</style>
    </div>
  );
}
