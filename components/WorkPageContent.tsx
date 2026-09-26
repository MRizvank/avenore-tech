"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CalButton from "@/components/CalButton";
import CaseStudyStack, { type CaseStudy } from "@/components/CaseStudyStack";
import ParticleHero from "@/components/ParticleHero";
import StructuredData from "@/components/StructuredData";
import { useLanguage } from "@/contexts/LanguageContext";

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

  const cases: CaseStudy[] = [
    {
      id: "01",
      name: "SEQUIFI",
      sub: t("portfolio.seq.sub"),
      tags: [
        t("portfolio.seq.badge1"),
        t("portfolio.seq.badge2"),
        "FIELD SALES",
        "iOS & ANDROID",
      ],
      tagColor: C.primary,
      stats: [
        [t("portfolio.seq.stat1v"), t("portfolio.seq.stat1l")],
        [t("portfolio.seq.stat2v"), t("portfolio.seq.stat2l")],
        [t("portfolio.seq.stat3v"), t("portfolio.seq.stat3l")],
      ],
      statColor: C.primary,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDsxBnxeCD6XDptNQo2JCgCh3T-sId2JpjS9dKMHALua8QOvBiaOjnXbzXG0dYXnSvGJALYukPCDK9kWLz0-eJ7ZVAheoLUyCOk3S_bllfrCYK28H3t5kHgKnFlHsjr-vA73FV7DnrlEi8FG_x0Ct_4mCJGb0LJgjmvt1dqeWfy4o6Pg-S3LI44NDKOvLRKyPTCabV6XqBbx40GLpuJXUmd3YYd37VUNjVeWxa9Zu1hPmcyrbOiciQsQ",
      desc: t("portfolio.seq.desc"),
      imgRight: true,
      badge: {
        icon: "signal_cellular_alt",
        text: t("portfolio.seq.status"),
        color: C.tertiary,
      },
    },
    {
      id: "02",
      name: "FASH",
      sub: t("portfolio.fash.sub"),
      tags: [
        t("portfolio.fash.badge1"),
        t("portfolio.fash.badge2"),
        "MULTI-VENDOR",
        "iOS & ANDROID",
      ],
      tagColor: C.secondary,
      stats: [
        [t("portfolio.fash.stat1v"), t("portfolio.fash.stat1l")],
        [t("portfolio.fash.stat2v"), t("portfolio.fash.stat2l")],
        [t("portfolio.fash.stat3v"), t("portfolio.fash.stat3l")],
      ],
      statColor: C.secondary,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRUufcqmMh4VWWuVpcOwi-famrfx-2kUusGrhkklJJ8pM8YiI-UOTejpzJKZPDHyI-yPjKzCzp3QdH6F4qRyVMs15PWK05oKXBQEx-Y3Rdt4V-T3aPKPvdPZlKH5xIZsV7ROgTsf8lxsUJqEXx2dCfW78934MLP-06C_rGaH0Z4v8sArSQnbLF1MrwiAOJvk_rLobTtSWkmE-lXgn9W2q6cPI9JtVw_DVs4U1WfxCzL2JGhmWk2_ftag",
      desc: t("portfolio.fash.desc"),
      imgRight: false,
      badge: {
        icon: "local_fire_department",
        text: t("portfolio.fash.status"),
        color: C.secondary,
      },
    },
    {
      id: "03",
      name: "MCC DUBAI",
      sub: t("portfolio.mcc.sub"),
      tags: [
        t("portfolio.mcc.badge1"),
        t("portfolio.mcc.badge2"),
        t("portfolio.mcc.badge3"),
        t("portfolio.mcc.badge4"),
      ],
      tagColor: C.tertiary,
      stats: [
        [t("portfolio.mcc.stat1v"), t("portfolio.mcc.stat1l")],
        [t("portfolio.mcc.stat2v"), t("portfolio.mcc.stat2l")],
        [t("portfolio.mcc.stat3v"), t("portfolio.mcc.stat3l")],
      ],
      statColor: C.tertiary,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TUquSS2taI4xb72d6MFbkc1rRU99T4xIAlOtVgeTg1u1ZuRa5Gz2KEHq5FjYdGeyD1VXGBz2g7Mj0Wju21uMIN2L3-qvo1NVfzqEhXnsQy9XszIR7a98W5h6wA51OuTghqDdUqP8eAo1QGBbkDfjgCurp7tKPSPDe_BDoyTh-Wrco4e1_fUFYwD2cmcKyMJBlCgYiF-Db3wKIvXimNmeqv_XAzrUTT5BwWoOzu7KhZ8TTVQ-zoJZfw",
      desc: t("portfolio.mcc.desc"),
      imgRight: true,
      badge: {
        icon: "lock",
        text: t("portfolio.mcc.status"),
        color: C.primary,
      },
    },
    {
      id: "04",
      name: "WEYAHOM",
      sub: t("portfolio.wey.sub"),
      tags: [
        t("portfolio.wey.badge1"),
        t("portfolio.wey.badge2"),
        "FLUTTER",
        "iOS & ANDROID",
      ],
      tagColor: C.primary,
      stats: [
        ["2", t("portfolio.wey.stat1l")],
        [t("portfolio.wey.stat2v"), t("portfolio.wey.stat2l")],
        ["8", t("portfolio.wey.stat3l")],
      ],
      statColor: C.primary,
      img: "/work/weyahom.webp",
      desc: t("portfolio.wey.desc"),
      imgRight: false,
      badge: {
        icon: "child_care",
        text: t("portfolio.wey.status"),
        color: C.tertiary,
      },
      links: [
        {
          label: t("work.appStore"),
          href: "https://apps.apple.com/app/id6784548076",
          icon: "phone_iphone",
        },
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.apptology.Weyahom",
          icon: "android",
        },
      ],
    },
    {
      id: "05",
      name: "BIM CAREER ACADEMY",
      sub: t("portfolio.bim.sub"),
      tags: [
        t("portfolio.bim.badge1"),
        t("portfolio.bim.badge2"),
        "NEXT.JS",
        t("portfolio.bim.badge3"),
      ],
      tagColor: C.tertiary,
      stats: [
        ["4", t("portfolio.bim.stat1l")],
        ["13", t("portfolio.bim.stat2l")],
        [t("portfolio.bim.stat3v"), t("portfolio.bim.stat3l")],
      ],
      statColor: C.tertiary,
      img: "/work/bim-career-academy.webp",
      desc: t("portfolio.bim.desc"),
      imgRight: true,
      badge: {
        icon: "language",
        text: t("portfolio.bim.status"),
        color: C.tertiary,
      },
      links: [
        {
          label: t("work.visitSite"),
          href: "https://bimcareeracademy.com/",
          icon: "open_in_new",
        },
      ],
    },
  ];

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
