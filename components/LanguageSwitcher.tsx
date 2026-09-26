"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, LANGUAGES, LangCode } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang, currentLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current language: ${currentLang.label}. Click to change language.`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "9999px",
          border: "1px solid rgba(73, 68, 84, 0.4)",
          backgroundColor: "rgba(31, 31, 36, 0.6)",
          color: "#cbc3d7",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.15s",
          backdropFilter: "blur(8px)",
          fontFamily: "var(--font-geist), sans-serif",
        }}
      >
        <span style={{ fontSize: "16px", lineHeight: 1 }}>{currentLang.flag}</span>
        <span style={{ maxWidth: "60px", overflow: "hidden", whiteSpace: "nowrap" }}>
          {currentLang.nativeLabel}
        </span>
        <span
          style={{
            fontSize: "12px",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.6,
          }}
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: "180px",
            backgroundColor: "#1b1b20",
            border: "1px solid rgba(73, 68, 84, 0.4)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            zIndex: 100,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "8px 14px",
              borderBottom: "1px solid rgba(73, 68, 84, 0.2)",
              color: "#958ea0",
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            SELECT LANGUAGE
          </div>

          {LANGUAGES.map((language) => {
            const isActive = language.code === lang;
            return (
              <button
                key={language.code}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setLang(language.code as LangCode);
                  setIsOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "10px 14px",
                  border: "none",
                  backgroundColor: isActive
                    ? "rgba(208, 188, 255, 0.1)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.1s",
                  textAlign: "left",
                  color: isActive ? "#8b5cf6" : "#cbc3d7",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "transparent";
                }}
              >
                <span style={{ fontSize: "18px", flexShrink: 0 }}>{language.flag}</span>
                <span style={{ flex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 400,
                      fontFamily: "var(--font-geist), sans-serif",
                    }}
                  >
                    {language.nativeLabel}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#958ea0",
                      fontFamily: "monospace",
                    }}
                  >
                    {language.label}
                  </span>
                </span>
                {isActive && (
                  <span style={{ color: "#5edf81", fontSize: "16px", flexShrink: 0 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
