"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  const navLinks = [
    { labelKey: "nav.home" as const, href: "/" },
    { labelKey: "nav.work" as const, href: "/work" },
    { labelKey: "nav.services" as const, href: "/services" },
    { labelKey: "nav.about" as const, href: "/about" },
    { labelKey: "nav.contact" as const, href: "/contact" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    const t = setTimeout(() => setIsMobileMenuOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(19, 19, 23, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(73, 68, 84, 0.25)",
          height: "80px",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            direction: isRTL ? "rtl" : "ltr",
          }}
          className="px-margin-mobile lg:px-margin"
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "0", textDecoration: "none" }}
          >
            <Image
              src="/logo.png"
              alt="Avenore Logo"
              width={86}
              height={86}
              priority={true}
              style={{ height: "86px", width: "auto", flexShrink: 0, margin: "0 -12px 0 -8px" }}
            />
            <span
              className="font-headline-sm text-headline-sm"
              style={{ color: "#e4e1e8", fontWeight: 700, letterSpacing: "-0.015em", fontSize: "20px", marginTop: "14px", marginLeft: "-5px" }}
            >
              AVENORE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ alignItems: "center", gap: "1.5rem" }} className="hidden lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? "#e4e1e8" : "#cbc3d7",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* CTAs, Language Switcher & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            {/* Language Switcher — always visible */}
            <LanguageSwitcher />

            <Link
              href="/contact"
              className="hidden md:inline-flex"
              style={{
                alignItems: "center",
                gap: "6px",
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "1px solid rgba(73, 68, 84, 0.4)",
                backgroundColor: "rgba(31, 31, 36, 0.4)",
                color: "#cbc3d7",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>calendar_today</span>
              <span>{t("nav.bookCall")}</span>
            </Link>

            <Link
              href="/contact"
              className="glow-border hidden sm:inline-flex"
              style={{
                alignItems: "center",
                gap: "6px",
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(31, 31, 36, 0.4)",
                color: "#e4e1e8",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.15s",
                position: "relative",
                zIndex: 1
              }}
            >
              <span>{t("nav.startProject")}</span>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>north_east</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              style={{ color: "#e4e1e8", cursor: "pointer", border: "none", background: "transparent" }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden"
          style={{
            position: "fixed",
            top: "80px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#131317",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            padding: "2rem 1.25rem",
            gap: "2rem",
            overflowY: "auto",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    color: isActive ? "#e4e1e8" : "#cbc3d7",
                    fontSize: "24px",
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: "none",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link
              href="/contact"
              className="glow-border"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "16px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(31, 31, 36, 0.4)",
                color: "#e4e1e8",
                fontSize: "16px",
                fontWeight: 700,
                textDecoration: "none",
                position: "relative",
                zIndex: 1,
                width: "100%"
              }}
            >
              <span>{t("nav.startProject")}</span>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>north_east</span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#cbc3d7", fontSize: "13px", marginTop: "1rem" }}>
              <a href="mailto:contact@avenore.tech" style={{ color: "#d0bcff", textDecoration: "none" }}>contact@avenore.tech</a>
              <span>•</span>
              <a href="https://wa.me/96567634440" style={{ color: "inherit", textDecoration: "none" }}>WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
