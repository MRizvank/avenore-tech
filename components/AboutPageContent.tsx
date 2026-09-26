"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParticleHero from "@/components/ParticleHero";
import CalButton from "@/components/CalButton";
import StructuredData from "@/components/StructuredData";
import TiltCard from "@/components/TiltCard";
import LogoMarquee from "@/components/LogoMarquee";
import { HubBridge, OverlapBand } from "@/components/DualHub";
import { useLanguage } from "@/contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  violet: "#d0bcff",
  tertiary: "#5edf81",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

const mono: CSSProperties = {
  fontSize: "10px",
  fontFamily: "var(--font-geist-mono), monospace",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const SECTION_GAP = "clamp(3.5rem, 6vw, 5.5rem)";
const CARD_PAD = "clamp(1.5rem, 3vw, 2rem)";
const hairline = "1px solid rgba(255,255,255,0.06)";

function hexA(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/* ── Section header: index · eyebrow → title → optional copy → hairline ─── */
function SectionHeader({
  index,
  label,
  title,
  desc,
  accent,
  rule = true,
  isRTL,
  children,
}: {
  index: string;
  label: string;
  title: string;
  desc?: string;
  accent: string;
  rule?: boolean;
  isRTL: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      data-reveal-group
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
    >
      <span
        data-reveal
        style={{
          ...mono,
          color: accent,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ color: C.outline }}>{index}</span>
        <span
          aria-hidden
          style={{ width: 22, height: 1, backgroundColor: accent, opacity: 0.7 }}
        />
        {label}
      </span>
      <h2
        data-reveal
        style={{
          fontFamily: "var(--font-outfit)",
          fontSize: "clamp(28px, 4vw, 40px)",
          lineHeight: "1.15",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          color: C.onSurface,
          margin: 0,
          maxWidth: "720px",
        }}
      >
        {title}
      </h2>
      {desc && (
        <p
          data-reveal
          style={{
            color: C.onSurfaceVariant,
            fontSize: "15px",
            lineHeight: "24px",
            maxWidth: "560px",
            margin: 0,
          }}
        >
          {desc}
        </p>
      )}
      {children}
      {rule && (
        <div
          data-rule
          aria-hidden
          style={{
            height: 1,
            marginTop: "0.75rem",
            background: `linear-gradient(${isRTL ? "to left" : "to right"}, rgba(255,255,255,0.16), rgba(255,255,255,0))`,
          }}
        />
      )}
    </div>
  );
}

export default function AboutPageContent() {
  const { t, lang, isRTL } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const q = <T extends Element = HTMLElement>(sel: string, scope: Element = root) =>
        gsap.utils.toArray<T>(sel, scope);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(pointer: fine)",
        },
        (ctx) => {
          const { motion, fine } = ctx.conditions as {
            motion: boolean;
            fine: boolean;
          };
          if (!motion) return;
          const cleanups: (() => void)[] = [];
          const originX = isRTL ? "100% 50%" : "0% 50%";

          /* ── Hero entrance ─────────────────────────────────────────── */
          const hero = gsap.timeline({ defaults: { ease: "power4.out" } });
          hero
            .from("[data-hero-badge]", { y: -16, opacity: 0, duration: 0.8 }, 0.05)
            .from("[data-hero-word]", { yPercent: 115, duration: 1.1, stagger: 0.07 }, 0.15)
            .from("[data-hero-sub]", { y: 24, opacity: 0, duration: 0.9 }, 0.55)
            .from("[data-hero-tag]", { y: 12, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.75)
            .from("[data-hero-cue]", { opacity: 0, y: -8, duration: 0.8 }, 1.05);

          /* Hero glows drift with the pointer, and the whole hero eases up as
             you scroll away from it. */
          const heroEl = root.querySelector<HTMLElement>("[data-hero]");
          const glows = q("[data-hero-glow]");
          if (heroEl && fine && glows.length) {
            const movers = glows.map((g, i) => ({
              x: gsap.quickTo(g, "x", { duration: 1.4, ease: "power3.out" }),
              y: gsap.quickTo(g, "y", { duration: 1.4, ease: "power3.out" }),
              k: i === 0 ? 34 : -52,
            }));
            const onMove = (e: PointerEvent) => {
              const r = heroEl.getBoundingClientRect();
              const nx = (e.clientX - r.left) / r.width - 0.5;
              const ny = (e.clientY - r.top) / r.height - 0.5;
              movers.forEach((m) => {
                m.x(nx * m.k);
                m.y(ny * m.k);
              });
            };
            heroEl.addEventListener("pointermove", onMove);
            cleanups.push(() => heroEl.removeEventListener("pointermove", onMove));
          }
          const heroInner = root.querySelector<HTMLElement>("[data-hero-inner]");
          if (heroEl && heroInner) {
            gsap.to(heroInner, {
              yPercent: -18,
              opacity: 0.25,
              ease: "none",
              scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom top", scrub: true },
            });
          }

          /* ── Generic reveals ───────────────────────────────────────── */
          q("[data-reveal-group]").forEach((group) => {
            const items = q("[data-reveal]", group);
            if (!items.length) return;
            gsap.from(items, {
              y: 30,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.09,
              scrollTrigger: { trigger: group, start: "top 84%", once: true },
            });
          });
          q("[data-rule]").forEach((el) =>
            gsap.from(el, {
              scaleX: 0,
              transformOrigin: originX,
              duration: 1.3,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            }),
          );

          /* ── Stats: panel entrance, count-ups, underline draws ─────── */
          const stats = root.querySelector<HTMLElement>("[data-stats]");
          if (stats) {
            gsap.from(stats, {
              y: 60,
              rotationX: 10,
              rotationY: isRTL ? 8 : -8,
              opacity: 0,
              transformPerspective: 1200,
              transformOrigin: "50% 100%",
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: { trigger: stats, start: "top 82%", once: true },
            });
            gsap.from(q("[data-stat]", stats), {
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: { trigger: stats, start: "top 78%", once: true },
            });
          }
          const counters = q("[data-count]").map((el) => ({
            el,
            target: parseFloat(el.dataset.count ?? "0"),
            suffix: el.dataset.suffix ?? "",
          }));
          counters.forEach((c) => {
            c.el.textContent = `0${c.suffix}`;
          });
          if (counters.length) {
            ScrollTrigger.create({
              trigger: stats ?? counters[0].el,
              start: "top 80%",
              once: true,
              onEnter: () =>
                counters.forEach((c, i) => {
                  const counter = { v: 0 };
                  gsap.to(counter, {
                    v: c.target,
                    duration: 1.9,
                    delay: 0.25 + i * 0.12,
                    ease: "power2.out",
                    onUpdate: () => {
                      c.el.textContent = `${Math.round(counter.v)}${c.suffix}`;
                    },
                  });
                }),
            });
          }
          q("[data-bar]").forEach((el) =>
            gsap.from(el, {
              scaleX: 0,
              transformOrigin: originX,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            }),
          );

          /* ── Principle cards: stand up from the floor, one after another */
          const principles = q("[data-principle]");
          if (principles.length) {
            gsap.from(principles, {
              y: 70,
              rotationX: 16,
              opacity: 0,
              transformOrigin: "50% 100%",
              duration: 1.15,
              ease: "power3.out",
              stagger: 0.13,
              scrollTrigger: { trigger: "[data-principles]", start: "top 80%", once: true },
            });
            principles.forEach((card) => {
              gsap.from(q("[data-check]", card), {
                x: isRTL ? 14 : -14,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.09,
                scrollTrigger: { trigger: card, start: "top 66%", once: true },
              });
              const mark = card.querySelector<HTMLElement>("[data-watermark]");
              if (mark)
                gsap.fromTo(
                  mark,
                  { yPercent: 22 },
                  {
                    yPercent: -22,
                    ease: "none",
                    scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
                  },
                );
            });
          }

          /* ── Icon orbs breathe ─────────────────────────────────────── */
          gsap.to("[data-orb]", {
            y: -5,
            duration: 2.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            stagger: { each: 0.35 },
          });

          /* ── Hub cards ─────────────────────────────────────────────── */
          gsap.from("[data-hub-card]", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { trigger: "[data-hub-cards]", start: "top 84%", once: true },
          });

          /* ── Partners strip ────────────────────────────────────────── */
          gsap.from("[data-partners]", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-partners]", start: "top 88%", once: true },
          });

          /* ── CTA: reveal, pointer spotlight, magnetic buttons ──────── */
          const cta = root.querySelector<HTMLElement>("[data-cta]");
          if (cta) {
            gsap.from(q("[data-cta-item]", cta), {
              y: 28,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: { trigger: cta, start: "top 82%", once: true },
            });
            gsap.to(q("[data-cta-glow]", cta), {
              x: 40,
              y: 30,
              scale: 1.15,
              duration: 6,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
            if (fine) {
              const spot = cta.querySelector<HTMLElement>("[data-cta-spot]");
              const magnets = q("[data-magnetic]", cta).map((el) => ({
                el,
                x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" }),
                y: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" }),
              }));
              const onMove = (e: PointerEvent) => {
                const r = cta.getBoundingClientRect();
                cta.style.setProperty("--mx", `${e.clientX - r.left}px`);
                cta.style.setProperty("--my", `${e.clientY - r.top}px`);
                magnets.forEach((m) => {
                  const b = m.el.getBoundingClientRect();
                  const dx = e.clientX - (b.left + b.width / 2);
                  const dy = e.clientY - (b.top + b.height / 2);
                  const dist = Math.hypot(dx, dy);
                  const reach = 130;
                  if (dist < reach) {
                    const k = (1 - dist / reach) * 0.42;
                    m.x(dx * k);
                    m.y(dy * k);
                  } else {
                    m.x(0);
                    m.y(0);
                  }
                });
              };
              const onEnter = () => spot && gsap.to(spot, { opacity: 1, duration: 0.5 });
              const onLeave = () => {
                if (spot) gsap.to(spot, { opacity: 0, duration: 0.5 });
                magnets.forEach((m) => {
                  m.x(0);
                  m.y(0);
                });
              };
              cta.addEventListener("pointermove", onMove);
              cta.addEventListener("pointerenter", onEnter);
              cta.addEventListener("pointerleave", onLeave);
              cleanups.push(() => {
                cta.removeEventListener("pointermove", onMove);
                cta.removeEventListener("pointerenter", onEnter);
                cta.removeEventListener("pointerleave", onLeave);
              });
            }
          }

          document.fonts?.ready.then(() => ScrollTrigger.refresh());

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [lang, isRTL], revertOnUpdate: true },
  );

  /* ── Content ─────────────────────────────────────────────────────────── */
  const stats = [
    { num: 20, suffix: "+", label: t("about.stats.1.label"), color: C.primary, icon: "rocket_launch" },
    { num: 8, suffix: "+", label: t("about.stats.2.label"), color: C.violet, icon: "public" },
    { num: 100, suffix: "%", label: t("about.stats.3.label"), color: C.tertiary, icon: "layers" },
    { num: 5, suffix: "+", label: t("about.stats.4.label"), color: C.onSurface, icon: "workspace_premium" },
  ];

  const principles = [
    {
      num: "01",
      color: C.primary,
      icon: "sync",
      title: t("about.principles.1.title"),
      desc: t("about.principles.1.desc"),
      checks: [t("about.principles.1.check1"), t("about.principles.1.check2"), t("about.principles.1.check3")],
    },
    {
      num: "02",
      color: C.violet,
      icon: "hub",
      title: t("about.principles.2.title"),
      desc: t("about.principles.2.desc"),
      checks: [t("about.principles.2.check1"), t("about.principles.2.check2"), t("about.principles.2.check3")],
    },
    {
      num: "03",
      color: C.tertiary,
      icon: "terminal",
      title: t("about.principles.3.title"),
      desc: t("about.principles.3.desc"),
      checks: [t("about.principles.3.check1"), t("about.principles.3.check2"), t("about.principles.3.check3")],
    },
  ];

  const hubs = [
    {
      id: "kwi",
      code: "KWI",
      badge: t("about.hubs.1.badge"),
      accent: C.tertiary,
      location: t("about.hubs.1.location"),
      title: t("about.hubs.1.title"),
      desc: t("about.hubs.1.desc"),
      tz: t("about.hubs.1.tz"),
      radius: t("about.hubs.1.radius"),
      timeZone: "Asia/Kuwait",
      offset: "GMT+3",
      // 09:00–18:00 AST expressed in UTC
      startUtc: 6,
      endUtc: 15,
      icon: "account_balance",
    },
    {
      id: "blr",
      code: "BLR",
      badge: t("about.hubs.2.badge"),
      accent: C.primary,
      location: t("about.hubs.2.location"),
      title: t("about.hubs.2.title"),
      desc: t("about.hubs.2.desc"),
      tz: t("about.hubs.2.tz"),
      radius: t("about.hubs.2.radius"),
      timeZone: "Asia/Kolkata",
      offset: "GMT+5:30",
      // 09:00–18:00 IST expressed in UTC
      startUtc: 3.5,
      endUtc: 12.5,
      icon: "memory",
    },
  ] as const;

  const partners = [
    "FASH",
    "SEQUIFI",
    "MCC DUBAI",
    "WEYAHOM",
    "BIM CAREER ACADEMY",
    "SR INNOVATIONS",
    "KAPITAL GCC",
  ];

  const sectionStyle: CSSProperties = {
    maxWidth: "80rem",
    margin: "0 auto",
    paddingBottom: SECTION_GAP,
    width: "100%",
  };

  return (
    <div ref={rootRef} style={{ backgroundColor: C.surface }}>
      <StructuredData type="about" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        data-hero
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
          data-hero-glow
          style={{
            position: "absolute",
            top: "-8rem",
            left: "50%",
            marginLeft: "-360px",
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
          data-hero-glow
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
          data-hero-inner
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
                ...mono,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 10px",
                borderRadius: "9999px",
                backgroundColor: C.surfaceContainer,
                color: C.primary,
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
            <span style={{ ...mono, color: C.onSurfaceVariant }}>
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
              maxWidth: "980px",
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
              {t("about.title")
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
            {t("about.subtitle")}
          </p>
          <div
            style={{
              ...mono,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              color: C.outline,
            }}
          >
            <span data-hero-tag style={{ color: C.onSurface }}>{t("about.mandate.loc1")}</span>
            <span data-hero-tag>·</span>
            <span data-hero-tag style={{ color: C.onSurface }}>{t("about.mandate.loc2")}</span>
            <span data-hero-tag>·</span>
            <span data-hero-tag style={{ color: C.onSurface }}>{t("about.mandate.loc3")}</span>
          </div>
          {/* scroll cue */}
          <div
            data-hero-cue
            aria-hidden
            style={{
              marginTop: "3.5rem",
              width: 1,
              height: 44,
              position: "relative",
              overflow: "hidden",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 1,
                height: 16,
                background: `linear-gradient(to bottom, ${hexA(C.primary, 0)}, ${C.primary})`,
                animation: "cue-drop 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── 01 · MANDATE + STATS ─────────────────────────────────────────── */}
      <section style={sectionStyle} className="px-margin-mobile lg:px-margin">
        <div
          style={{ gap: "clamp(2rem, 4vw, 4rem)", alignItems: "center" }}
          className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]"
        >
          <div data-reveal-group style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span
              data-reveal
              style={{ ...mono, color: C.primary, display: "flex", alignItems: "center", gap: 10 }}
            >
              <span style={{ color: C.outline }}>01</span>
              <span aria-hidden style={{ width: 22, height: 1, backgroundColor: C.primary, opacity: 0.7 }} />
              {t("about.mandate.label")}
            </span>
            <h2
              data-reveal
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(30px, 4.2vw, 44px)",
                lineHeight: "1.12",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                margin: 0,
              }}
            >
              {t("about.mandate.title")}
            </h2>
            <p data-reveal style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "25px", margin: 0 }}>
              {t("about.mandate.p1")}
            </p>
            <p data-reveal style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "25px", margin: 0 }}>
              {t("about.mandate.p2")}
            </p>
            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
              {["Flutter", "Swift", "Kotlin", "Python"].map((tech) => (
                <span
                  key={tech}
                  style={{
                    ...mono,
                    padding: "6px 12px",
                    borderRadius: 9999,
                    border: hairline,
                    backgroundColor: C.surfaceLow,
                    color: C.onSurfaceVariant,
                    letterSpacing: "0.08em",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Stats panel: tilts in 3D, numbers count up */}
          <div data-stats style={{ perspective: 1200 }}>
            <TiltCard
              accent={C.primary}
              tilt={4}
              lift={4}
              cardStyle={{
                borderRadius: "1.5rem",
                backgroundColor: C.surfaceLowest,
                border: hairline,
                padding: "clamp(1rem, 2vw, 1.5rem)",
                boxShadow: "0 40px 80px -40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
              contentStyle={{ gap: "0.85rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingInline: 4 }}>
                <span style={{ ...mono, color: C.outline, display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: C.tertiary,
                      boxShadow: `0 0 10px ${C.tertiary}`,
                    }}
                  />
                  {t("about.label")}
                </span>
                <span style={{ ...mono, color: C.outline }}>{t("about.mandate.loc3")}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.75rem" }}>
                {stats.map((m) => (
                  <div
                    key={m.label}
                    data-stat
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 18,
                      backgroundColor: C.surfaceLow,
                      border: "1px solid rgba(255,255,255,0.04)",
                      padding: "clamp(1rem, 2vw, 1.35rem)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: -70,
                        insetInlineEnd: -50,
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${hexA(m.color, 0.18)} 0%, ${hexA(m.color, 0)} 66%)`,
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      data-orb
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 12,
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: hexA(m.color, 0.12),
                        border: `1px solid ${hexA(m.color, 0.3)}`,
                        boxShadow: `0 0 22px -6px ${hexA(m.color, 0.6)}`,
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ color: m.color, fontSize: 18 }}>
                        {m.icon}
                      </span>
                    </div>
                    <span
                      data-count={m.num}
                      data-suffix={m.suffix}
                      style={{
                        fontFamily: "var(--font-outfit)",
                        fontSize: "clamp(34px, 3.6vw, 46px)",
                        lineHeight: 1,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        color: m.color,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {m.num}
                      {m.suffix}
                    </span>
                    <span style={{ ...mono, color: C.outline, lineHeight: "14px" }}>{m.label}</span>
                    <div aria-hidden style={{ height: 2, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.05)", marginTop: "0.2rem" }}>
                      <div
                        data-bar
                        style={{
                          height: "100%",
                          borderRadius: 2,
                          background: `linear-gradient(${isRTL ? "to left" : "to right"}, ${m.color}, ${hexA(m.color, 0)})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem 1.25rem",
                  paddingInline: 4,
                  paddingTop: "0.25rem",
                  borderTop: hairline,
                  marginTop: "0.15rem",
                }}
              >
                {[
                  { text: t("about.mandate.loc1"), color: C.tertiary },
                  { text: t("about.mandate.loc2"), color: C.primary },
                ].map((chip) => (
                  <span
                    key={chip.text}
                    style={{ ...mono, color: C.onSurfaceVariant, display: "flex", alignItems: "center", gap: 8, paddingTop: "0.5rem" }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: chip.color }} />
                    {chip.text}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ── 02 · THREE PRINCIPLES ───────────────────────────────────────── */}
      <section style={sectionStyle} className="px-margin-mobile lg:px-margin">
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionHeader
            index="02"
            label={t("about.principles.label")}
            title={t("about.principles.title")}
            accent={C.violet}
            isRTL={isRTL}
          />
        </div>
        <div
          data-principles
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1.25rem",
            perspective: 1400,
          }}
        >
          {principles.map((p) => (
            <TiltCard
              key={p.num}
              data-principle
              accent={p.color}
              tilt={6}
              lift={8}
              style={{ transformStyle: "preserve-3d" }}
              cardStyle={{
                borderRadius: "1.5rem",
                backgroundColor: C.surfaceLow,
                border: hairline,
                padding: CARD_PAD,
                boxShadow: "0 30px 60px -40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
              contentStyle={{ justifyContent: "space-between", gap: "1.5rem" }}
            >
              <div>
                <span
                  data-watermark
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-0.55em",
                    insetInlineEnd: "-0.05em",
                    fontFamily: "var(--font-outfit)",
                    fontSize: "clamp(120px, 12vw, 160px)",
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    color: hexA(p.color, 0.07),
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {p.num}
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    position: "relative",
                  }}
                >
                  <div
                    data-orb
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: hexA(p.color, 0.12),
                      border: `1px solid ${hexA(p.color, 0.3)}`,
                      boxShadow: `0 0 28px -6px ${hexA(p.color, 0.6)}`,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ color: p.color, fontSize: 22 }}>
                      {p.icon}
                    </span>
                  </div>
                  <span style={{ ...mono, color: hexA(p.color, 0.9), padding: "4px 10px", borderRadius: 9999, backgroundColor: hexA(p.color, 0.1) }}>
                    {p.num} / 03
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "22px",
                    lineHeight: 1.2,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: C.onSurface,
                    margin: "0 0 0.75rem",
                    position: "relative",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px", margin: 0, position: "relative" }}>
                  {p.desc}
                </p>
              </div>
              <div
                style={{
                  borderTop: hairline,
                  paddingTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {p.checks.map((c) => (
                  <div
                    key={c}
                    data-check
                    style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", lineHeight: "18px", color: C.onSurface }}
                  >
                    <span className="material-symbols-outlined" style={{ color: p.color, fontSize: "18px", flexShrink: 0 }}>
                      check_circle
                    </span>
                    {c}
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── 03 · DUAL HUB ────────────────────────────────────────────────── */}
      <section style={sectionStyle} className="px-margin-mobile lg:px-margin">
        <div
          style={{
            borderRadius: "1.5rem",
            backgroundColor: C.surfaceLowest,
            border: hairline,
            padding: `${CARD_PAD} ${CARD_PAD} ${CARD_PAD}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -220,
              left: "50%",
              marginLeft: -300,
              width: 600,
              height: 420,
              background: "radial-gradient(ellipse, rgba(139,92,246,0.14), rgba(139,92,246,0) 65%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{ gap: "2rem", alignItems: "end", position: "relative" }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,380px)]"
          >
            <SectionHeader
              index="03"
              label={t("about.hubs.label")}
              title={t("about.hubs.title")}
              desc={t("about.hubs.desc")}
              accent={C.tertiary}
              rule={false}
              isRTL={isRTL}
            />
            <div data-reveal-group>
              <div data-reveal>
                <OverlapBand
                  caption="09:00 – 18:00 LOCAL"
                  windows={hubs.map((h) => ({
                    code: h.code,
                    accent: h.accent,
                    startUtc: h.startUtc,
                    endUtc: h.endUtc,
                  }))}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1rem", marginBottom: "0.5rem", marginInline: `calc(-1 * ${CARD_PAD})` }}>
            <HubBridge
              hubs={[
                { id: hubs[0].id, badge: hubs[0].badge, city: hubs[0].location, accent: hubs[0].accent, timeZone: hubs[0].timeZone, offset: hubs[0].offset },
                { id: hubs[1].id, badge: hubs[1].badge, city: hubs[1].location, accent: hubs[1].accent, timeZone: hubs[1].timeZone, offset: hubs[1].offset },
              ]}
              apexLabel={t("about.hubs.2.radius")}
              rtl={isRTL}
            />
          </div>

          <div data-hub-cards style={{ gap: "1.25rem" }} className="grid grid-cols-1 lg:grid-cols-2">
            {hubs.map((hub) => (
              <TiltCard
                key={hub.id}
                data-hub-card
                accent={hub.accent}
                tilt={4}
                lift={6}
                cardStyle={{
                  borderRadius: "1.25rem",
                  backgroundColor: C.surfaceLow,
                  border: hairline,
                  padding: CARD_PAD,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
                contentStyle={{ justifyContent: "space-between", gap: "1.5rem" }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    insetInline: CARD_PAD,
                    height: 1,
                    background: `linear-gradient(${isRTL ? "to left" : "to right"}, ${hub.accent}, ${hexA(hub.accent, 0)})`,
                    opacity: 0.8,
                  }}
                />
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "6px 12px", marginBottom: "1.25rem" }}>
                    <span style={{ ...mono, display: "flex", alignItems: "center", gap: "8px", color: hub.accent, whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: hub.accent,
                          boxShadow: `0 0 10px ${hub.accent}`,
                        }}
                      />
                      {hub.badge}
                    </span>
                    <span style={{ ...mono, color: C.outline, letterSpacing: "0.08em" }}>{hub.location}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div
                      data-orb
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: hexA(hub.accent, 0.12),
                        border: `1px solid ${hexA(hub.accent, 0.3)}`,
                        boxShadow: `0 0 24px -6px ${hexA(hub.accent, 0.6)}`,
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ color: hub.accent, fontSize: 20 }}>
                        {hub.icon}
                      </span>
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-outfit)",
                          fontSize: "21px",
                          lineHeight: 1.2,
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          color: C.onSurface,
                          margin: "0 0 0.6rem",
                        }}
                      >
                        {hub.title}
                      </h3>
                      <p style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px", margin: 0 }}>{hub.desc}</p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    ...mono,
                    paddingTop: "1rem",
                    borderTop: hairline,
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.5rem 1rem",
                    color: C.outline,
                    letterSpacing: "0.08em",
                  }}
                >
                  <span>{hub.tz}</span>
                  <span style={{ color: C.onSurface }}>{hub.radius}</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────────────────────── */}
      <section style={sectionStyle} className="px-margin-mobile lg:px-margin">
        <div
          data-partners
          style={{
            borderRadius: "1.25rem",
            backgroundColor: C.surfaceLowest,
            border: hairline,
            padding: "2rem 0 2.25rem",
            textAlign: "center",
          }}
        >
          <p style={{ ...mono, color: C.outline, marginBottom: "1.5rem", paddingInline: "1.25rem" }}>
            {t("about.partners.label")}
          </p>
          <LogoMarquee items={partners} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={sectionStyle} className="px-margin-mobile lg:px-margin">
        <div
          data-cta
          style={{
            borderRadius: "1.5rem",
            backgroundColor: C.surfaceLow,
            border: hairline,
            padding: "clamp(2rem, 4vw, 3rem)",
            position: "relative",
            overflow: "hidden",
            gap: "2rem",
            alignItems: "center",
            boxShadow: "0 0 60px -15px rgba(160,120,255,0.2)",
          }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto]"
        >
          <div
            data-cta-glow
            aria-hidden
            style={{
              position: "absolute",
              top: "-5rem",
              insetInlineEnd: "-5rem",
              width: "320px",
              height: "320px",
              background: "rgba(208,188,255,0.14)",
              borderRadius: "50%",
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />
          <div
            data-cta-spot
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              pointerEvents: "none",
              background: `radial-gradient(640px circle at var(--mx, 50%) var(--my, 50%), ${hexA(C.primary, 0.12)}, transparent 46%)`,
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "560px" }}>
            <h2
              data-cta-item
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: "1.15",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                margin: "0 0 0.75rem",
              }}
            >
              {t("inquiry.title")}
            </h2>
            <p data-cta-item style={{ color: C.onSurfaceVariant, fontSize: "18px", lineHeight: "28px", margin: 0 }}>
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
              minWidth: "min(100%, 240px)",
            }}
          >
            <div data-cta-item data-magnetic style={{ display: "flex" }}>
              <Link
                href="/contact"
                className="glow-border"
                style={{
                  display: "inline-flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
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
                {t("nav.startProject")} ↗
              </Link>
            </div>
            <div data-cta-item data-magnetic style={{ display: "flex" }}>
              <CalButton
                style={{
                  display: "inline-flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "14px 28px",
                  borderRadius: "9999px",
                  backgroundColor: C.surfaceContainerHigh,
                  border: hairline,
                  color: C.onSurface,
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
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
