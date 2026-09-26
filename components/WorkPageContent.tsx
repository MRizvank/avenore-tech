"use client";

import Link from "next/link";
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
  primary: "#d0bcff",
  primaryContainer: "#a078ff",
  onPrimaryContainer: "#340080",
  secondary: "#a078ff",
  tertiary: "#5edf81",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

export default function WorkPageContent() {
  const { t } = useLanguage();

  const cases = [
    { id: "01", name: "SEQUIFI", sub: t("portfolio.seq.sub"), tags: [t("portfolio.seq.badge1"), t("portfolio.seq.badge2"), "FIELD SALES", "iOS & ANDROID"], tagColor: C.primary, stats: [[t("portfolio.seq.stat1v"), t("portfolio.seq.stat1l")], [t("portfolio.seq.stat2v"), t("portfolio.seq.stat2l")], [t("portfolio.seq.stat3v"), t("portfolio.seq.stat3l")]], statColor: C.primary, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDsxBnxeCD6XDptNQo2JCgCh3T-sId2JpjS9dKMHALua8QOvBiaOjnXbzXG0dYXnSvGJALYukPCDK9kWLz0-eJ7ZVAheoLUyCOk3S_bllfrCYK28H3t5kHgKnFlHsjr-vA73FV7DnrlEi8FG_x0Ct_4mCJGb0LJgjmvt1dqeWfy4o6Pg-S3LI44NDKOvLRKyPTCabV6XqBbx40GLpuJXUmd3YYd37VUNjVeWxa9Zu1hPmcyrbOiciQsQ", desc: t("portfolio.seq.desc"), imgRight: true, badge: { icon: "signal_cellular_alt", text: t("portfolio.seq.status"), color: C.tertiary } },
    { id: "02", name: "FASH", sub: t("portfolio.fash.sub"), tags: [t("portfolio.fash.badge1"), t("portfolio.fash.badge2"), "MULTI-VENDOR", "iOS & ANDROID"], tagColor: C.secondary, stats: [[t("portfolio.fash.stat1v"), t("portfolio.fash.stat1l")], [t("portfolio.fash.stat2v"), t("portfolio.fash.stat2l")], [t("portfolio.fash.stat3v"), t("portfolio.fash.stat3l")]], statColor: C.secondary, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRUufcqmMh4VWWuVpcOwi-famrfx-2kUusGrhkklJJ8pM8YiI-UOTejpzJKZPDHyI-yPjKzCzp3QdH6F4qRyVMs15PWK05oKXBQEx-Y3Rdt4V-T3aPKPvdPZlKH5xIZsV7ROgTsf8lxsUJqEXx2dCfW78934MLP-06C_rGaH0Z4v8sArSQnbLF1MrwiAOJvk_rLobTtSWkmE-lXgn9W2q6cPI9JtVw_DVs4U1WfxCzL2JGhmWk2_ftag", desc: t("portfolio.fash.desc"), imgRight: false, badge: { icon: "local_fire_department", text: t("portfolio.fash.status"), color: C.secondary } },
    { id: "03", name: "MCC DUBAI", sub: t("portfolio.mcc.sub"), tags: [t("portfolio.mcc.badge1"), t("portfolio.mcc.badge2"), t("portfolio.mcc.badge3"), t("portfolio.mcc.badge4")], tagColor: C.tertiary, stats: [[t("portfolio.mcc.stat1v"), t("portfolio.mcc.stat1l")], [t("portfolio.mcc.stat2v"), t("portfolio.mcc.stat2l")], [t("portfolio.mcc.stat3v"), t("portfolio.mcc.stat3l")]], statColor: C.tertiary, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TUquSS2taI4xb72d6MFbkc1rRU99T4xIAlOtVgeTg1u1ZuRa5Gz2KEHq5FjYdGeyD1VXGBz2g7Mj0Wju21uMIN2L3-qvo1NVfzqEhXnsQy9XszIR7a98W5h6wA51OuTghqDdUqP8eAo1QGBbkDfjgCurp7tKPSPDe_BDoyTh-Wrco4e1_fUFYwD2cmcKyMJBlCgYiF-Db3wKIvXimNmeqv_XAzrUTT5BwWoOzu7KhZ8TTVQ-zoJZfw", desc: t("portfolio.mcc.desc"), imgRight: true, badge: { icon: "lock", text: t("portfolio.mcc.status"), color: C.primary } },
  ];

  return (
    <div style={{ backgroundColor: C.surface }}>
      <StructuredData type="work" />

      {/* ── HERO ── */}
      <section style={{ width: "100%", paddingTop: "8rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }} className="px-margin-mobile lg:px-margin hero-grid-bg">
        <ParticleHero />
        <div style={{ position: "absolute", top: "-8rem", left: "50%", transform: "translateX(-50%)", width: "720px", height: "520px", background: "rgba(208,188,255,0.06)", borderRadius: "50%", filter: "blur(140px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "20%", right: "-10rem", width: "400px", height: "400px", background: "rgba(160,120,255,0.05)", borderRadius: "50%", filter: "blur(120px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "4px 16px 4px 4px", borderRadius: "9999px", backgroundColor: C.surfaceLow, boxShadow: "0 0 24px -4px rgba(208,188,255,0.15)", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "9999px", backgroundColor: C.surfaceContainer, color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.primary, display: "inline-block", animation: "pulse 2s infinite" }} />
              {t("work.label")}
            </span>
            <span style={{ color: C.onSurfaceVariant, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("work.hero.badge")}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontSize: "clamp(40px, 7vw, 72px)", lineHeight: "1.05", fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 1.5rem", maxWidth: "900px" }}>
            <span className="text-shimmer">{t("work.title")}</span>
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "28px", color: C.onSurfaceVariant, maxWidth: "640px", marginBottom: "2rem" }}>
            {t("work.subtitle")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1.5rem", color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span style={{ color: C.onSurface }}>{t("work.hero.tag1")}</span>
            <span style={{ color: C.onSurface }}>{t("work.hero.tag2")}</span>
            <span style={{ color: C.onSurface }}>{t("work.hero.tag3")}</span>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section style={{ width: "100%", paddingBottom: "4rem" }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {cases.map((c) => (
            <article key={c.id} style={{ borderRadius: "1.5rem", backgroundColor: C.surfaceLowest, padding: "2.5rem", gap: "2.5rem", position: "relative", overflow: "hidden" }} className="grid grid-cols-1 lg:grid-cols-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", order: c.imgRight ? 1 : 2 }} className={c.imgRight ? "lg:order-1" : "lg:order-2"}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {c.tags.map((tag) => (
                    <span key={tag} style={{ padding: "3px 10px", borderRadius: "9999px", backgroundColor: C.surfaceContainer, color: c.tagColor, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em" }}>{tag}</span>
                  ))}
                </div>
                <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.id} / {t("work.caseStudy")}</span>
                <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px, 5vw, 48px)", lineHeight: "1.1", fontWeight: 800, letterSpacing: "-0.025em", color: C.onSurface, margin: 0 }}>{c.name}</h2>
                <p style={{ color: c.tagColor, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 600 }}>{c.sub}</p>
                <p style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px" }}>{c.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {c.stats.map(([v, l]) => (
                    <div key={l} style={{ padding: "0.75rem", borderRadius: "12px", backgroundColor: C.surfaceLow }}>
                      <span style={{ color: c.statColor, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 700, display: "block" }}>{v}</span>
                      <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px", display: "block" }}>{l}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 18px", borderRadius: "9999px", backgroundColor: C.onSurface, color: "#131317", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>file_download</span>
                    {t("work.appStore")}
                  </a>
                  <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 18px", borderRadius: "9999px", backgroundColor: "rgba(208,188,255,0.15)", color: C.primary, fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                    {t("common.viewCaseStudy")}
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
                  </a>
                </div>
              </div>
              <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", backgroundColor: C.surfaceLow, minHeight: "360px", order: c.imgRight ? 2 : 1 }} className={c.imgRight ? "lg:order-2" : "lg:order-1"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} width="800" height="600" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "12px", right: "12px", padding: "4px 12px", borderRadius: "9999px", backgroundColor: "rgba(14,14,18,0.9)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span className="material-symbols-outlined" style={{ color: c.badge.color, fontSize: "14px" }}>{c.badge.icon}</span>
                  <span style={{ color: c.badge.color, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.badge.text}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ width: "100%", paddingBottom: "4rem" }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ borderRadius: "1.5rem", backgroundColor: C.surfaceContainerHigh, padding: "3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top, rgba(160,120,255,0.12), transparent 70%)", pointerEvents: "none" }} />
            <span style={{ color: C.tertiary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem", position: "relative", zIndex: 1 }}>{t("work.cta.badge")}</span>
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: "1.05", fontWeight: 800, letterSpacing: "-0.03em", color: C.onSurface, textTransform: "uppercase", margin: "0 0 1rem", position: "relative", zIndex: 1 }}>
              {t("inquiry.title").toUpperCase()}
            </h2>
            <p style={{ color: C.onSurfaceVariant, fontSize: "18px", lineHeight: "28px", maxWidth: "500px", margin: "0 auto 2rem", position: "relative", zIndex: 1 }}>
              {t("inquiry.body")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem", position: "relative", zIndex: 1 }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "14px 28px", borderRadius: "9999px", backgroundColor: C.primaryContainer, color: C.onPrimaryContainer, fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 24px rgba(160,120,255,0.5)" }}>
                <span>{t("nav.startProject")}</span>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>north_east</span>
              </Link>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "14px 28px", borderRadius: "9999px", backgroundColor: C.surfaceLow, color: C.onSurface, fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>calendar_today</span>
                {t("nav.bookCall")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
