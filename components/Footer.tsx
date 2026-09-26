"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const C = {
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#d0bcff",
  tertiary: "#5edf81",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Studio: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "#" },
    { label: "Case Studies", href: "/work" },
  ],
  Resources: [
    { label: "Methodology", href: "#" },
    { label: "Tech Radar", href: "#" },
    { label: "Stack", href: "/services" },
    { label: "Open Source", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ width: "100%", backgroundColor: C.surfaceLowest, borderTop: `1px solid rgba(73,68,84,0.2)`, paddingTop: "4rem", paddingBottom: "2.5rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }} className="px-margin-mobile lg:px-margin">
        <div style={{ gap: "2.5rem", paddingBottom: "2.5rem", borderBottom: `1px solid rgba(73,68,84,0.2)`, marginBottom: "1.5rem" }} className="grid grid-cols-1 lg:grid-cols-12">
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} className="lg:col-span-4">
            <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
              <Image
                src="/logo.png"
                alt="Avenore Logo"
                width={86}
                height={86}
                style={{ height: "86px", width: "auto", flexShrink: 0, margin: "0 -12px 0 -8px" }}
              />
              <span style={{ fontFamily: "var(--font-outfit)", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.015em", color: C.onSurface, marginTop: "14px", marginLeft: "-5px" }}>AVENORE</span>
            </div>
            <p style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px", maxWidth: "320px" }}>
              WE BUILD PRODUCTS PEOPLE COME BACK TO. Mobile apps. Digital products. Serious engineering.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <span className="material-symbols-outlined" style={{ color: C.tertiary, fontSize: "14px" }}>location_on</span>
              Kuwait City • GCC Region • Global Delivery
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:col-span-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>{section}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} style={{ color: C.onSurfaceVariant, fontSize: "13px", textDecoration: "none", transition: "color 0.15s" }}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Connect</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li><Link href="/contact" style={{ color: C.onSurfaceVariant, fontSize: "13px", textDecoration: "none" }}>Book a Call</Link></li>
                <li><a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" style={{ color: C.onSurfaceVariant, fontSize: "13px", textDecoration: "none" }}>WhatsApp</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: C.onSurfaceVariant, fontSize: "13px", textDecoration: "none" }}>LinkedIn</a></li>
                <li style={{ marginTop: "6px" }}>
                  <a href="mailto:contact@avenore.tech" style={{ color: C.primary, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none", display: "block" }}>contact@avenore.tech</a>
                </li>
                <li>
                  <span style={{ color: C.outline, fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", display: "block" }}>+965 6763 4440</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.75rem" }} className="md:flex-row md:items-center md:justify-between">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: C.outline, fontSize: "13px" }}>
            <span>© 2026 Avenore Studio. All rights reserved.</span>
            <span>•</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>EST. 2026</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/privacy" style={{ color: C.outline, fontSize: "13px", textDecoration: "none", transition: "color 0.15s" }}>{t("nav.privacy")}</Link>
            <Link href="/terms" style={{ color: C.outline, fontSize: "13px", textDecoration: "none", transition: "color 0.15s" }}>{t("nav.terms")}</Link>
            <Link href="/security" style={{ color: C.outline, fontSize: "13px", textDecoration: "none", transition: "color 0.15s" }}>{t("nav.security")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
