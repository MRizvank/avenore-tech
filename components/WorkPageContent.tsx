"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CalButton from "@/components/CalButton";
import CaseStudyStack from "@/components/CaseStudyStack";
import ParticleHero from "@/components/ParticleHero";
import StructuredData from "@/components/StructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildCaseStudies } from "@/lib/caseStudies";

const C = {
  surface: "#131317",
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  surfaceContainerHigh: "#2a292e",
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

export default function WorkPageContent() {
  const { t, lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero-badge]", { y: -16, opacity: 0, duration: 0.8 }, 0.05)
        .from("[data-hero-word]", { yPercent: 115, duration: 1.1, stagger: 0.07 }, 0.15)
        .from("[data-hero-sub]", { y: 24, opacity: 0, duration: 0.9 }, 0.55)
        .from("[data-hero-tag]", { y: 12, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.75);

      gsap.from("[data-cta] > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-cta]", start: "top 80%", once: true },
      });
    },
    { scope: rootRef, dependencies: [lang], revertOnUpdate: true },
  );

  const cases = buildCaseStudies(t);

  return (
    <div ref={rootRef} style={{ backgroundColor: C.surface }}>
      <StructuredData type="work" />

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
            background: "rgba(160,120,255,0.05)",
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
            data-hero-badge
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
              {t("work.label")}
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
              {t("work.hero.badge")}
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
            <span
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                columnGap: "0.22em",
              }}
            >
              {t("work.title")
                .split(" ")
                .map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    style={{
                      display: "inline-block",
                      overflow: "hidden",
                      paddingBottom: "0.08em",
                      marginBottom: "-0.08em",
                    }}
                  >
                    <span
                      data-hero-word
                      className="hero-title-shimmer"
                      style={{ display: "inline-block" }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
            </span>
          </h1>
          <p
            data-hero-sub
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              color: C.onSurfaceVariant,
              maxWidth: "640px",
              marginBottom: "2rem",
            }}
          >
            {t("work.subtitle")}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              color: C.outline,
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span data-hero-tag style={{ color: C.onSurface }}>{t("work.hero.tag1")}</span>
            <span data-hero-tag style={{ color: C.onSurface }}>{t("work.hero.tag2")}</span>
            <span data-hero-tag style={{ color: C.onSurface }}>{t("work.hero.tag3")}</span>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section
        style={{ width: "100%", paddingBottom: "4rem" }}
        className="px-margin-mobile lg:px-margin"
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <CaseStudyStack
            cases={cases}
            labels={{
              caseStudy: t("work.caseStudy"),
              appStore: t("work.appStore"),
              viewCaseStudy: t("common.viewCaseStudy"),
            }}
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{ width: "100%", paddingBottom: "4rem" }}
        className="px-margin-mobile lg:px-margin"
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div
            data-cta
            style={{
              borderRadius: "1.5rem",
              backgroundColor: C.surfaceContainerHigh,
              padding: "3rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
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
                color: C.tertiary,
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
              {t("work.cta.badge")}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 5vw, 56px)",
                lineHeight: "1.05",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: C.onSurface,
                textTransform: "uppercase",
                margin: "0 0 1rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              {t("inquiry.title").toUpperCase()}
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
                alignItems: "center",
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
                <span>{t("nav.startProject")}</span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  north_east
                </span>
              </Link>
              <CalButton
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
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  calendar_today
                </span>
                {t("nav.bookCall")}
              </CalButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
