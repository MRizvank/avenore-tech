"use client";

import Link from "next/link";
import InteractiveTechMarquee from "@/components/InteractiveTechMarquee";
import FaqAccordion from "@/components/FaqAccordion";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import ParticleHero from "@/components/ParticleHero";
import StructuredData from "@/components/StructuredData";
import { useLanguage } from "@/contexts/LanguageContext";

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
  primary: "#d0bcff",
  primaryContainer: "#a078ff",
  onPrimaryContainer: "#340080",
  secondary: "#a078ff",
  tertiary: "#5edf81",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

const card = {
  backgroundColor: C.surfaceLowest,
  borderRadius: "1.5rem",
  padding: "2rem",
};

export default function HomePageContent() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: C.surface }}>
      <StructuredData type="home" />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          paddingTop: "4rem", paddingBottom: "5rem",
          backgroundColor: C.surface,
        }}
        className="px-margin-mobile lg:px-margin hero-grid-bg"
      >
        <ParticleHero />
        <div style={{ position: "absolute", top: "-8rem", left: "50%", transform: "translateX(-50%)", width: "720px", height: "520px", background: "rgba(208,188,255,0.06)", borderRadius: "50%", filter: "blur(140px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "33%", right: "-6rem", width: "380px", height: "380px", background: "rgba(160,120,255,0.04)", borderRadius: "50%", filter: "blur(120px)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "4px 16px 4px 4px", borderRadius: "9999px", backgroundColor: C.surfaceLow, boxShadow: "0 0 24px -4px rgba(208,188,255,0.2)", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "9999px", backgroundColor: C.surfaceContainer, color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.primary, display: "inline-block", animation: "pulse 2s infinite" }} />
              {t("hero.badge")}
            </span>
            <span style={{ color: C.onSurfaceVariant, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {t("hero.location")}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontSize: "clamp(40px, 7vw, 72px)", lineHeight: "1.05", fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 1.5rem", maxWidth: "900px" }}>
            <span className="text-shimmer">{t("hero.headline")}</span>
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: "18px", lineHeight: "28px", color: C.onSurfaceVariant, maxWidth: "640px", marginBottom: "2rem" }}>
            {t("hero.subheadline")}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
            <Link href="#inquiry" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "14px 28px", borderRadius: "9999px", backgroundColor: C.primaryContainer, color: C.onPrimaryContainer, fontSize: "14px", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 28px rgba(160,120,255,0.5)", transition: "all 0.2s", position: "relative", zIndex: 1 }} className="animate-glow-ring">
              <span>{t("hero.cta.primary")}</span>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>north_east</span>
            </Link>
            <Link href="#work" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "14px 28px", borderRadius: "9999px", backgroundColor: C.surfaceLow, color: C.onSurface, fontSize: "14px", fontWeight: 500, textDecoration: "none", transition: "all 0.2s", position: "relative", zIndex: 1 }} className="glow-border">
              <span>{t("hero.cta.secondary")}</span>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>south</span>
            </Link>
          </div>

          {/* Proof */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: C.tertiary, opacity: 0.6, animation: "ping 1.5s infinite" }} />
              <span style={{ position: "relative", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: C.tertiary }} />
            </span>
            {t("hero.proof")}
          </div>

          {/* ── Phone Mockups ── */}
          <div style={{ marginTop: "4rem", width: "100%", maxWidth: "900px", position: "relative", minHeight: "440px", display: "flex", alignItems: "center", justifyContent: "center" }} className="scale-75 sm:scale-100 origin-top">
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "80px", background: "rgba(160,120,255,0.15)", filter: "blur(40px)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", left: 0, top: "40px", width: "220px", padding: "16px", backgroundColor: C.surfaceLowest, borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.6)", transform: "rotate(-8deg) translateY(20px)", zIndex: 5, display: "none" }} className="lg:block">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ color: C.secondary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("home.mockup.seq.badge")}</span>
                <span style={{ color: C.tertiary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{t("home.mockup.seq.growth")}</span>
              </div>
              <svg style={{ width: "100%", height: "60px", marginBottom: "8px" }} viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,35 Q20,10 40,25 T70,5 T100,12" stroke={C.secondary} strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M0,35 Q20,10 40,25 T70,5 T100,12 L100,40 L0,40 Z" fill="rgba(123,208,255,0.08)" />
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontFamily: "monospace", color: C.outline }}>
                <span>{t("home.mockup.seq.batch")}</span>
                <span style={{ color: C.onSurface, fontWeight: 600 }}>{t("home.mockup.seq.amount")}</span>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 20, width: "240px", padding: "8px", backgroundColor: C.surfaceLowest, borderRadius: "40px", boxShadow: "0 20px 50px rgba(0,0,0,0.8)", transform: "translateX(-40px)", flexShrink: 0 }}>
              <div style={{ width: "100%", height: "380px", borderRadius: "32px", backgroundColor: C.surfaceLow, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px", position: "relative" }}>
                <div style={{ width: "80px", height: "14px", backgroundColor: C.surfaceContainerHighest, borderRadius: "9999px", margin: "0 auto 8px" }} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <div>
                      <div style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>{t("home.mockup.fash.studio")}</div>
                      <div style={{ color: C.onSurface, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 600, letterSpacing: "-0.015em" }}>{t("home.mockup.fash.drop")}</div>
                    </div>
                    <div style={{ padding: "4px", borderRadius: "50%", backgroundColor: C.surfaceContainer }}>
                      <span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "16px" }}>verified</span>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, margin: "8px 0", borderRadius: "12px", overflow: "hidden", backgroundColor: C.surfaceContainer, position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcRd4xP-f6BE_lVtnv8zfNPaDXMdc2jvocAMVuK7HvODPYWk0d5BUq3IR8A9cXz8bZAN15U49OZynL4gaOpP252NU6ELuF9Jg0aohWa65K8gItjAp9j5bdOJAeY8GSEBMbgVhnIyByMz5XvmFsuVr5Vq5_kgi-IB9p5FWyM1ORbkuYpkhKAv2D_bg8rGh_SUXbikjoQjRMlL7xJQLioMmuXeQ7kUF1KVur3FPIpZRBFj1KuujeLYCQNw" alt="FASH" style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: "8px", left: "8px", padding: "3px 8px", borderRadius: "9999px", backgroundColor: "rgba(14,14,18,0.8)", backdropFilter: "blur(8px)", color: C.onSurface, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{t("home.mockup.fash.remaining")}</div>
                </div>
                <div style={{ padding: "6px 12px", borderRadius: "9999px", backgroundColor: C.surfaceContainerHighest, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: C.onSurface, fontSize: "14px", fontWeight: 600 }}>{t("home.mockup.fash.price")}</span>
                  <span style={{ padding: "4px 14px", borderRadius: "9999px", backgroundColor: C.primary, color: C.onPrimaryContainer, fontSize: "10px", fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t("home.mockup.fash.reserve")}</span>
                </div>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 10, width: "240px", padding: "8px", backgroundColor: C.surfaceLowest, borderRadius: "40px", boxShadow: "0 20px 50px rgba(0,0,0,0.7)", transform: "translateX(8px) translateY(-16px)", flexShrink: 0 }}>
              <div style={{ width: "100%", height: "380px", borderRadius: "32px", backgroundColor: C.surfaceLow, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px" }}>
                <div style={{ width: "80px", height: "14px", backgroundColor: C.surfaceContainerHighest, borderRadius: "9999px", margin: "0 auto 8px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: C.tertiary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("home.mockup.mcc.badge")}</span>
                  <span style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(94,223,129,0.15)", color: C.tertiary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{t("home.mockup.mcc.status")}</span>
                </div>
                <div style={{ fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 600, color: C.onSurface, letterSpacing: "-0.015em" }}>{t("home.mockup.mcc.title")}</div>
                <div style={{ flex: 1, margin: "8px 0", padding: "16px", borderRadius: "16px", backgroundColor: C.surfaceContainer, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: "48px" }}>fingerprint</span>
                  <span style={{ marginTop: "8px", color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("home.mockup.mcc.token")}</span>
                  <span style={{ color: C.onSurfaceVariant, fontSize: "13px", marginTop: "4px" }}>{t("home.mockup.mcc.session")}</span>
                </div>
                <div style={{ width: "100%", padding: "8px 0", borderRadius: "9999px", backgroundColor: C.surfaceContainerHighest, textAlign: "center", color: C.onSurface, fontSize: "14px", fontWeight: 500 }}>{t("home.mockup.mcc.monitoring")}</div>
              </div>
            </div>

            <div style={{ position: "absolute", right: 0, top: "40px", width: "200px", padding: "16px", backgroundColor: C.surfaceLowest, borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.6)", transform: "rotate(8deg) translateY(20px)", zIndex: 5, display: "none" }} className="lg:block">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("home.mockup.telemetry.badge")}</span>
                <span style={{ color: C.tertiary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{t("home.mockup.telemetry.uptime")}</span>
              </div>
              {[[t("home.mockup.telemetry.flutter"), "v3.27.1"], [t("home.mockup.telemetry.api"), "24ms GCC"], [t("home.mockup.telemetry.cold"), "410ms"], [t("home.mockup.telemetry.fps"), "120 FPS"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{k}</span>
                  <span style={{ color: C.onSurface, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ width: "100%", height: "4px", backgroundColor: C.surfaceContainer, borderRadius: "9999px", marginTop: "8px", overflow: "hidden" }}>
                <div style={{ width: "90%", height: "100%", backgroundColor: C.primary, borderRadius: "9999px" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE TECH MARQUEE ─────────────────────────────────────────── */}
      <InteractiveTechMarquee />

      {/* ── MANIFESTO ─────────────────────────────────────────────────────── */}
      <section style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: C.surfaceLowest }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "80rem", margin: "0 auto", gap: "2.5rem" }} className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block" }}>{t("manifesto.label")}</span>
            <span style={{ color: C.outline, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 600, display: "block", marginTop: "8px" }}>{t("manifesto.sectionTitle")}</span>
          </div>
          <div className="lg:col-span-9">
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: "1.2", fontWeight: 700, letterSpacing: "-0.025em", color: C.onSurface, textTransform: "uppercase", marginBottom: "1rem" }}>
              {t("manifesto.headline").split("just an app").length > 1 ? (
                <>
                  {t("manifesto.headline").split("just an app")[0]}
                  <span style={{ color: C.primary }}>just an app.</span>
                </>
              ) : t("manifesto.headline")}
            </h2>
            <p style={{ fontSize: "18px", lineHeight: "28px", color: C.onSurfaceVariant, maxWidth: "720px" }}>
              {t("manifesto.body")}
            </p>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ──────────────────────────────────────────────────── */}
      <section style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: C.surface }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2.5rem" }}>
            <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("capabilities.label")}</span>
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: "1.2", fontWeight: 700, letterSpacing: "-0.025em", color: C.onSurface, textTransform: "uppercase", margin: 0 }}>{t("capabilities.title")}</h2>
            <p style={{ color: C.onSurfaceVariant, fontSize: "15px", maxWidth: "480px" }}>{t("capabilities.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div style={{ backgroundColor: C.surfaceLow, borderRadius: "1.5rem", padding: "2.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "320px" }} className="md:col-span-2">
              <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(208,188,255,0.15) 0%, rgba(208,188,255,0) 70%)", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "40px", color: C.primary }}>smartphone</span>
                  <span style={{ padding: "4px 12px", borderRadius: "9999px", backgroundColor: "rgba(208,188,255,0.1)", color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em" }}>{t("capabilities.1.badge")}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "36px", lineHeight: "1.1", fontWeight: 800, color: C.onSurface, marginBottom: "0.75rem" }}>{t("capabilities.1.title")}</h3>
                <p style={{ color: C.onSurfaceVariant, fontSize: "16px", lineHeight: "24px", maxWidth: "420px" }}>{t("capabilities.1.desc")}</p>
              </div>
            </div>
            <div style={{ backgroundColor: C.surfaceLow, borderRadius: "1.5rem", padding: "2.5rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "320px" }}>
              <div style={{ position: "absolute", bottom: "-20%", left: "-20%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(94,223,129,0.12) 0%, rgba(94,223,129,0) 70%)", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "32px", color: C.tertiary, marginBottom: "1.5rem", display: "block" }}>dns</span>
                <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "24px", lineHeight: "1.2", fontWeight: 700, color: C.onSurface, marginBottom: "0.75rem" }}>{t("capabilities.2.title")}</h3>
                <p style={{ color: C.onSurfaceVariant, fontSize: "14px", lineHeight: "22px" }}>{t("capabilities.2.desc")}</p>
              </div>
            </div>
            <div style={{ backgroundColor: C.surfaceLow, borderRadius: "1.5rem", padding: "2rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "240px" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "28px", color: C.secondary, marginBottom: "1rem", display: "block" }}>touch_app</span>
                <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "20px", fontWeight: 700, color: C.onSurface, marginBottom: "0.5rem" }}>{t("capabilities.3.title")}</h3>
                <p style={{ color: C.onSurfaceVariant, fontSize: "14px", lineHeight: "20px" }}>{t("capabilities.3.desc")}</p>
              </div>
            </div>
            <div style={{ backgroundColor: C.surfaceLow, borderRadius: "1.5rem", padding: "2rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "240px" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "28px", color: C.primary, marginBottom: "1rem", display: "block" }}>rocket_launch</span>
                <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "20px", fontWeight: 700, color: C.onSurface, marginBottom: "0.5rem" }}>{t("capabilities.4.title")}</h3>
                <p style={{ color: C.onSurfaceVariant, fontSize: "14px", lineHeight: "20px" }}>{t("capabilities.4.desc")}</p>
              </div>
            </div>
            <div style={{ backgroundColor: C.surfaceLow, borderRadius: "1.5rem", padding: "2rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "240px" }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "28px", color: C.onSurface, marginBottom: "1rem", display: "block" }}>desktop_mac</span>
                <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "20px", fontWeight: 700, color: C.onSurface, marginBottom: "0.5rem" }}>{t("capabilities.5.title")}</h3>
                <p style={{ color: C.onSurfaceVariant, fontSize: "14px", lineHeight: "20px" }}>{t("capabilities.5.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────────────────────── */}
      <section id="work" style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: C.surfaceLowest }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>{t("portfolio.label")}</span>
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: "1.2", fontWeight: 700, letterSpacing: "-0.025em", color: C.onSurface, textTransform: "uppercase", margin: "0 0 0.75rem" }}>{t("portfolio.title")}</h2>
          </div>

          {/* Sequifi Case Study */}
          <div style={{ ...card, gap: "2.5rem", marginBottom: "2rem" }} className="grid grid-cols-1 lg:grid-cols-2">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {[t("portfolio.seq.badge1"), t("portfolio.seq.badge2"), t("portfolio.seq.badge3")].map((tag) => (
                  <span key={tag} style={{ padding: "3px 10px", borderRadius: "9999px", backgroundColor: C.surfaceContainer, color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em" }}>{tag}</span>
                ))}
              </div>
              <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("portfolio.seq.num")}</span>
              <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "40px", lineHeight: "48px", fontWeight: 800, letterSpacing: "-0.025em", color: C.onSurface, margin: 0 }}>{t("portfolio.seq.title")}</h3>
              <p style={{ color: C.primary, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 600 }}>{t("portfolio.seq.sub")}</p>
              <p style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px" }}>{t("portfolio.seq.desc")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[[t("portfolio.seq.stat1v"), t("portfolio.seq.stat1l"), C.primary], [t("portfolio.seq.stat2v"), t("portfolio.seq.stat2l"), C.secondary], [t("portfolio.seq.stat3v"), t("portfolio.seq.stat3l"), C.tertiary]].map(([v, l, color]) => (
                  <div key={l as string} style={{ padding: "0.75rem", borderRadius: "12px", backgroundColor: C.surfaceLow }}>
                    <span style={{ color: color as string, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 700, display: "block" }}>{v}</span>
                    <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px", display: "block" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", backgroundColor: C.surfaceLow, minHeight: "320px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDsxBnxeCD6XDptNQo2JCgCh3T-sId2JpjS9dKMHALua8QOvBiaOjnXbzXG0dYXnSvGJALYukPCDK9kWLz0-eJ7ZVAheoLUyCOk3S_bllfrCYK28H3t5kHgKnFlHsjr-vA73FV7DnrlEi8FG_x0Ct_4mCJGb0LJgjmvt1dqeWfy4o6Pg-S3LI44NDKOvLRKyPTCabV6XqBbx40GLpuJXUmd3YYd37VUNjVeWxa9Zu1hPmcyrbOiciQsQ" alt="Sequifi" />
              <div style={{ position: "absolute", bottom: "12px", left: "12px", padding: "4px 12px", borderRadius: "9999px", backgroundColor: "rgba(14,14,18,0.9)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.tertiary, display: "inline-block" }} />
                <span style={{ color: C.tertiary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("portfolio.seq.status")}</span>
              </div>
            </div>
          </div>

          {/* FASH Case Study */}
          <div style={{ ...card, gap: "2.5rem" }} className="grid grid-cols-1 lg:grid-cols-2">
            <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", backgroundColor: C.surfaceLow, minHeight: "320px", order: 2 }} className="lg:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRUufcqmMh4VWWuVpcOwi-famrfx-2kUusGrhkklJJ8pM8YiI-UOTejpzJKZPDHyI-yPjKzCzp3QdH6F4qRyVMs15PWK05oKXBQEx-Y3Rdt4V-T3aPKPvdPZlKH5xIZsV7ROgTsf8lxsUJqEXx2dCfW78934MLP-06C_rGaH0Z4v8sArSQnbLF1MrwiAOJvk_rLobTtSWkmE-lXgn9W2q6cPI9JtVw_DVs4U1WfxCzL2JGhmWk2_ftag" alt="FASH" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", order: 1 }} className="lg:order-2">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {[t("portfolio.fash.badge1"), t("portfolio.fash.badge2"), t("portfolio.fash.badge3")].map((tag) => (
                  <span key={tag} style={{ padding: "3px 10px", borderRadius: "9999px", backgroundColor: C.surfaceContainer, color: C.secondary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em" }}>{tag}</span>
                ))}
              </div>
              <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("portfolio.fash.num")}</span>
              <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "40px", lineHeight: "48px", fontWeight: 800, letterSpacing: "-0.025em", color: C.onSurface, margin: 0 }}>{t("portfolio.fash.title")}</h3>
              <p style={{ color: C.secondary, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 600 }}>{t("portfolio.fash.sub")}</p>
              <p style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px" }}>{t("portfolio.fash.desc")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[[t("portfolio.fash.stat1v"), t("portfolio.fash.stat1l"), C.secondary], [t("portfolio.fash.stat2v"), t("portfolio.fash.stat2l"), C.onSurface], [t("portfolio.fash.stat3v"), t("portfolio.fash.stat3l"), C.tertiary]].map(([v, l, color]) => (
                  <div key={l as string} style={{ padding: "0.75rem", borderRadius: "12px", backgroundColor: C.surfaceLow }}>
                    <span style={{ color: color as string, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 700, display: "block" }}>{v}</span>
                    <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px", display: "block" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "12px 24px", borderRadius: "9999px", backgroundColor: C.surfaceLow, color: C.onSurface, fontSize: "14px", fontWeight: 500, textDecoration: "none", border: `1px solid ${C.outlineVariant}` }}>
              <span>{t("work.viewAll")}</span>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: C.surface }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>{t("testimonials.label")}</span>
          <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: "1.2", fontWeight: 700, letterSpacing: "-0.025em", color: C.onSurface, textTransform: "uppercase", margin: "0 0 2rem" }}>{t("testimonials.title")}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>
            {[
              { stars: C.primary, quote: t("testimonials.1.quote"), name: t("testimonials.1.name"), role: t("testimonials.1.role"), img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1_JXnyTYhX3i5FQLeh2YprTOKI_uVu1oOOy9AWM-SWk1SH_A7frNUl3ZBWeht7QxrzvvBuMmPsfRUnHcVQ6nNXTlE3JrfL4EY3PQNwepPXakFQb7mLLFr6oY6rgjzWVOxaX3UElwtfIsxcIMIlsVndDMFGOp8gkRnNRVcNy7ViiHUBQzBjAIdSstrUgoW_q0dEmIJ71qeTLUsjJ8PrcaaK2XRI9dOr3AdYwlcrvME5-rcALynnSRxtQ" },
              { stars: C.secondary, quote: t("testimonials.2.quote"), name: t("testimonials.2.name"), role: t("testimonials.2.role"), img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWBRllosaFiRkSzdwvRsaN3-pZRw6cndBVEnMTRx5RLJPI9Zlyvqfb0Mebil4hkf1RlHENM7FBYk0-9udn1we-_OQi7fVhZ52A3bxzvMfaQvOsoti6McfSIohpuzCVYtjnkFdKjY32KRVBsOzwh0q9Cvb8jsHEVWfX4pxs9V1jiRXFRi_nZtnwg1zuuPy8KhiHaKzTmWfr1fV6YI7tTnP3knyXfngrUu9oJ4JiZsWu1w8uIz07kHF65Q" },
            ].map((testimonial) => (
              <div key={testimonial.name} style={{ ...card, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}>
                <div>
                  <div style={{ display: "flex", gap: "3px", marginBottom: "1rem" }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ color: testimonial.stars, fontSize: "20px", fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p style={{ fontSize: "18px", lineHeight: "28px", color: C.onSurface, fontStyle: "italic" }}>{testimonial.quote}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1rem", borderTop: `1px solid rgba(73,68,84,0.2)` }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", backgroundColor: C.surfaceContainer, flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={testimonial.img} alt={testimonial.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <span style={{ color: C.onSurface, fontSize: "20px", fontFamily: "var(--font-outfit)", fontWeight: 600, display: "block" }}>{testimonial.name}</span>
                    <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ────────────────────────────────────────────────────── */}
      <section style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: C.surfaceLowest }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ gap: "2.5rem", marginBottom: "2.5rem" }} className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>{t("whoWeAre.label")}</span>
              <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: "1.2", fontWeight: 700, letterSpacing: "-0.025em", color: C.onSurface, textTransform: "uppercase", margin: "0 0 1rem" }}>{t("whoWeAre.title")}</h2>
              <p style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px" }}>{t("whoWeAre.body")}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[[t("whoWeAre.stat1v"), t("whoWeAre.stat1l"), C.primary], [t("whoWeAre.stat2v"), t("whoWeAre.stat2l"), C.secondary], [t("whoWeAre.stat3v"), t("whoWeAre.stat3l"), C.tertiary], [t("whoWeAre.stat4v"), t("whoWeAre.stat4l"), C.onSurface]].map(([v, l, color]) => (
                <div key={l as string} style={{ padding: "1.5rem", borderRadius: "1.5rem", backgroundColor: C.surfaceLow, textAlign: "center" }}>
                  <span style={{ color: color as string, fontFamily: "var(--font-outfit)", fontSize: "40px", fontWeight: 800, display: "block" }}>{v}</span>
                  <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px", display: "block" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: C.surface }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>{t("faq.label")}</span>
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: "1.2", fontWeight: 700, letterSpacing: "-0.025em", color: C.onSurface, textTransform: "uppercase", margin: 0 }}>{t("faq.title")}</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── PROJECT INQUIRY ───────────────────────────────────────────────── */}
      <section id="inquiry" style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: C.surfaceLowest, position: "relative", overflow: "hidden" }} className="px-margin-mobile lg:px-margin">
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "500px", height: "500px", background: "rgba(208,188,255,0.07)", borderRadius: "50%", filter: "blur(140px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "80rem", margin: "0 auto", gap: "3rem" }} className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("inquiry.label")}</span>
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: "1.2", fontWeight: 700, letterSpacing: "-0.025em", color: C.onSurface, textTransform: "uppercase", margin: 0 }}>{t("inquiry.title")}</h2>
            <p style={{ color: C.onSurfaceVariant, fontSize: "18px", lineHeight: "28px" }}>{t("inquiry.body")}</p>
            <div style={{ marginTop: "0.5rem" }}>
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 18px", borderRadius: "9999px", backgroundColor: C.surfaceLow, color: C.onSurface, fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
                <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: "18px" }}>calendar_month</span>
                {t("inquiry.cta")}
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "0.5rem" }}>
              {[t("inquiry.check1"), t("inquiry.check2")].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px", color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em" }}>
                  <span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "16px" }}>check</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProjectInquiryForm />
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
      `}</style>
    </div>
  );
}
