"use client";

import ParticleHero from "@/components/ParticleHero";
import ContactFormClient from "@/components/ContactFormClient";
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

export default function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: C.surface }}>
      <StructuredData type="contact" />

      {/* ── HERO ── */}
      <section style={{ width: "100%", paddingTop: "8rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }} className="px-margin-mobile lg:px-margin hero-grid-bg">
        <ParticleHero />
        <div style={{ position: "absolute", top: "-8rem", left: "50%", transform: "translateX(-50%)", width: "720px", height: "520px", background: "rgba(208,188,255,0.06)", borderRadius: "50%", filter: "blur(140px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "20%", left: "-10rem", width: "400px", height: "400px", background: "rgba(94,223,129,0.05)", borderRadius: "50%", filter: "blur(120px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "4px 16px 4px 4px", borderRadius: "9999px", backgroundColor: C.surfaceLow, boxShadow: "0 0 24px -4px rgba(208,188,255,0.15)", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "9999px", backgroundColor: C.surfaceContainer, color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.primary, display: "inline-block", animation: "pulse 2s infinite" }} />
              {t("contact.label")}
            </span>
            <span style={{ color: C.onSurfaceVariant, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("common.getInTouch")}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif", fontSize: "clamp(36px, 5vw, 56px)", lineHeight: "1.05", fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 1.5rem", maxWidth: "900px" }}>
            <span className="text-shimmer">{t("contact.title")}</span>
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "28px", color: C.onSurfaceVariant, maxWidth: "640px", marginBottom: "2rem" }}>
            {t("contact.subtitle")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1.5rem", color: C.onSurface, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {[
              { icon: "verified_user", color: C.primary, text: t("contact.hero.f1") },
              { icon: "timer", color: C.tertiary, text: t("contact.hero.f2") },
              { icon: "apartment", color: C.secondary, text: t("contact.hero.f3") },
            ].map((item) => (
              <span key={item.text} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="material-symbols-outlined" style={{ color: item.color, fontSize: "16px" }}>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN 2-COL ── */}
      <section style={{ width: "100%", paddingBottom: "4rem" }} className="px-margin-mobile lg:px-margin">
        <div style={{ maxWidth: "80rem", margin: "0 auto", gap: "3rem" }} className="grid grid-cols-1 lg:grid-cols-12">

          {/* LEFT SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }} className="lg:col-span-5">
            <div style={{ borderRadius: "1rem", backgroundColor: C.surfaceLowest, border: `1px solid rgba(73,68,84,0.25)`, padding: "1.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "9999px", backgroundColor: C.surfaceContainer, marginBottom: "1rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.primary, animation: "ping 2s infinite" }} />
                <span style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t("contact.sidebar.discovery")}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "20px", fontWeight: 600, color: C.onSurface, margin: "0 0 6px" }}>{t("contact.sidebar.discovery.title")}</h3>
              <p style={{ color: C.onSurfaceVariant, fontSize: "13px", margin: "0 0 1rem" }}>{t("contact.sidebar.discovery.desc")}</p>
              <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 16px", borderRadius: "9999px", border: `1px solid rgba(73,68,84,0.4)`, backgroundColor: "rgba(31,31,36,0.5)", color: C.onSurface, fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>calendar_month</span>
                {t("nav.bookCall")}
                <span className="material-symbols-outlined" style={{ fontSize: "16px", color: C.outline }}>arrow_forward</span>
              </a>
            </div>

            <div style={{ borderRadius: "1rem", backgroundColor: C.surfaceLowest, border: `1px solid rgba(73,68,84,0.25)`, padding: "1rem", display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { icon: "alternate_email", color: C.primary, label: t("contact.sidebar.email.label"), value: "contact@avenore.tech", href: "mailto:contact@avenore.tech" },
                { icon: "call", color: C.secondary, label: t("contact.sidebar.phone.label"), value: "+965 6763 4440", href: "tel:+96567634440" },
              ].map((ch) => (
                <div key={ch.icon} style={{ padding: "0.75rem", borderRadius: "12px", backgroundColor: C.surfaceLow, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: C.surfaceContainerHigh, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ color: ch.color, fontSize: "18px" }}>{ch.icon}</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ display: "block", color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{ch.label}</span>
                      <a href={ch.href} style={{ display: "block", color: C.onSurface, fontSize: "15px", fontWeight: 600, textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.value}</a>
                    </div>
                  </div>
                </div>
              ))}
              <a href="https://wa.me/96567634440" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", borderRadius: "12px", backgroundColor: C.surfaceLow, textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "rgba(94,223,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "18px" }}>chat</span>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ color: C.onSurface, fontSize: "15px", fontWeight: 600 }}>{t("contact.sidebar.wa.title")}</span>
                      <span style={{ padding: "2px 6px", borderRadius: "9999px", backgroundColor: "rgba(94,223,129,0.15)", color: C.tertiary, fontSize: "9px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t("contact.sidebar.wa.badge")}</span>
                    </div>
                    <span style={{ color: C.tertiary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{t("contact.sidebar.wa.desc")}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "18px" }}>arrow_forward</span>
              </a>
            </div>

            <div style={{ borderRadius: "1rem", backgroundColor: C.surfaceLowest, border: `1px solid rgba(73,68,84,0.25)`, padding: "1.25rem" }}>
              <span style={{ display: "block", color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{t("contact.sidebar.ops.label")}</span>
              {[
                { icon: "apartment", color: C.primary, title: t("contact.sidebar.ops.1.title"), addr: t("contact.sidebar.ops.1.addr") },
                { icon: "precision_manufacturing", color: C.secondary, title: t("contact.sidebar.ops.2.title"), addr: t("contact.sidebar.ops.2.addr") },
              ].map((loc, i) => (
                <div key={loc.title}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "6px 0" }}>
                    <span className="material-symbols-outlined" style={{ color: loc.color, fontSize: "18px", flexShrink: 0, marginTop: "2px" }}>{loc.icon}</span>
                    <div>
                      <div style={{ color: C.onSurface, fontSize: "14px", fontWeight: 600 }}>{loc.title}</div>
                      <div style={{ color: C.onSurfaceVariant, fontSize: "13px" }}>{loc.addr}</div>
                    </div>
                  </div>
                  {i === 0 && <div style={{ height: "1px", backgroundColor: "rgba(73,68,84,0.2)", margin: "6px 0" }} />}
                </div>
              ))}
            </div>

            <div style={{ borderRadius: "1rem", backgroundColor: C.surfaceLow, border: `1px solid rgba(208,188,255,0.15)`, padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
                <span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "16px" }}>verified_user</span>
                {t("contact.sidebar.nda.title")}
              </div>
              <p style={{ color: C.onSurface, fontSize: "13px", margin: 0 }}>{t("contact.sidebar.nda.desc")}</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-7">
            <ContactFormClient />
          </div>
        </div>

        {/* SLA Timeline */}
        <div style={{ maxWidth: "80rem", margin: "3rem auto 0", paddingTop: "2.5rem", borderTop: `1px solid rgba(73,68,84,0.2)` }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div>
              <span style={{ color: C.secondary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block" }}>{t("contact.protocol.label")}</span>
              <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "28px", fontWeight: 700, color: C.onSurface, margin: "4px 0 0" }}>{t("contact.protocol.title")}</h3>
            </div>
            <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t("contact.protocol.desc")}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1rem" }}>
            {[
              { badge: t("contact.protocol.1.badge"), color: C.primary, icon: "terminal", title: t("contact.protocol.1.title"), desc: t("contact.protocol.1.desc") },
              { badge: t("contact.protocol.2.badge"), color: C.secondary, icon: "data_object", title: t("contact.protocol.2.title"), desc: t("contact.protocol.2.desc") },
              { badge: t("contact.protocol.3.badge"), color: C.tertiary, icon: "rocket", title: t("contact.protocol.3.title"), desc: t("contact.protocol.3.desc") },
            ].map((s) => (
              <div key={s.badge} style={{ borderRadius: "1rem", backgroundColor: C.surfaceLowest, border: `1px solid rgba(73,68,84,0.25)`, padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ color: s.color, fontSize: "10px", fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: "9999px", backgroundColor: `${s.color}18` }}>{s.badge}</span>
                  <span className="material-symbols-outlined" style={{ color: C.outlineVariant, fontSize: "24px" }}>{s.icon}</span>
                </div>
                <h4 style={{ fontFamily: "var(--font-outfit)", fontSize: "20px", fontWeight: 600, color: C.onSurface, margin: "0 0 0.5rem" }}>{s.title}</h4>
                <p style={{ color: C.onSurfaceVariant, fontSize: "13px", lineHeight: "20px", margin: 0 }}>{s.desc}</p>
              </div>
            ))}
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
