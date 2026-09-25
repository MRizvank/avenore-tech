"use client";

import { useState } from "react";

const C = {
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#d0bcff",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

const faqs = [
  { question: "What does a typical engagement cost?", answer: "Full-scope venture MVPs generally range between $45,000 to $75,000 based on technical complexity and native hardware hooks. Multi-tier enterprise systems with dedicated SRE support start at $120,000+. We operate on fixed-fee transparent sprint structures with zero hidden overheads." },
  { question: "How long does an MVP take to reach production?", answer: "Our standard rapid MVP sprint cycle is 8 to 12 weeks from initial architectural sign-off to App Store and Google Play submissions. Because our team builds concurrently with a battle-tested Flutter boilerplate, you launch months ahead of standard agencies." },
  { question: "Why Flutter instead of separate iOS and Android native apps?", answer: "Flutter compiles natively to ARM machine code on both platforms while utilizing the modern Impeller rendering engine. You achieve true 120 FPS performance, identical business logic, and reduce long-term engineering maintenance costs by more than 40%." },
  { question: "Who owns the intellectual property and code?", answer: "You own 100% of the intellectual property, git repositories, architectural schematics, and design files from day one. All code is transferred into your corporate GitHub or GitLab organization upon each milestone completion." },
  { question: "How do you manage regional Gulf data residency compliance?", answer: "We deploy sovereign cloud infrastructure located natively inside AWS Bahrain, AWS UAE, and Microsoft Azure Qatar regions with end-to-end local data residency compliance matching Central Bank of Kuwait (CBK) and UAE TDRA regulatory standards." },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
          style={{
            padding: "1.5rem",
            borderRadius: "1rem",
            backgroundColor: openIndex === i ? C.surfaceContainer : C.surfaceLow,
            cursor: "pointer",
            transition: "background 0.15s",
            border: `1px solid ${openIndex === i ? C.outline + "44" : "transparent"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: "20px", lineHeight: "28px", fontWeight: 600, letterSpacing: "-0.015em", color: C.onSurface, margin: 0, paddingRight: "1rem" }}>
              {faq.question}
            </h3>
            <span className="material-symbols-outlined" style={{ color: C.outline, flexShrink: 0, transition: "transform 0.2s", transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)", fontSize: "24px" }}>
              add
            </span>
          </div>
          {openIndex === i && (
            <p style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px", marginTop: "1rem", paddingTop: "1rem", borderTop: `1px solid rgba(73,68,84,0.2)` }}>
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
