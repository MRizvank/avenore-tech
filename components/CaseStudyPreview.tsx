"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { CaseStudy } from "@/components/CaseStudyStack";

type Props = {
  cases: CaseStudy[];
  /** Where each card sends the visitor. */
  href: string;
  labels: { caseStudy: string; viewCaseStudy: string };
};

const C = {
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  outline: "#958ea0",
};

const mono: CSSProperties = {
  fontSize: "10px",
  fontFamily: "monospace",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

function hexA(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/**
 * Compact portfolio teaser for the home page: image, tags, name and one-line
 * pitch per case. The full story (stats, description, store links) lives on
 * the /work page, which every card links to.
 */
export default function CaseStudyPreview({ cases, href, labels }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {cases.map((c) => (
        <Link
          key={c.id}
          href={href}
          aria-label={`${c.name} – ${labels.viewCaseStudy}`}
          className="group border-white/5 transition-colors duration-300 hover:border-white/15"
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "1.25rem",
            overflow: "hidden",
            backgroundColor: C.surfaceLow,
            borderWidth: "1px",
            borderStyle: "solid",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {/* media */}
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 3",
              overflow: "hidden",
              backgroundColor: C.surfaceContainer,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.img}
              alt={c.name}
              width="800"
              height="600"
              loading="lazy"
              className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(14,14,18,0) 55%, rgba(14,14,18,0.6) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                insetInlineStart: "12px",
                padding: "4px 10px",
                borderRadius: "9999px",
                backgroundColor: "rgba(14,14,18,0.9)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${hexA(c.badge.color, 0.25)}`,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: c.badge.color, fontSize: "13px" }}
              >
                {c.badge.icon}
              </span>
              <span style={{ ...mono, color: c.badge.color, letterSpacing: "0.08em" }}>
                {c.badge.text}
              </span>
            </div>
          </div>

          {/* body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              padding: "1.25rem 1.25rem 1.35rem",
              flex: 1,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {c.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "3px 9px",
                    borderRadius: "9999px",
                    backgroundColor: C.surfaceContainer,
                    color: c.tagColor,
                    fontSize: "10px",
                    fontFamily: "monospace",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span style={{ ...mono, color: C.outline, marginTop: "0.15rem" }}>
              {c.id} / {labels.caseStudy}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "26px",
                lineHeight: "1.1",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                margin: 0,
              }}
            >
              {c.name}
            </h3>
            <p
              style={{
                color: c.tagColor,
                fontSize: "15px",
                lineHeight: "22px",
                fontFamily: "var(--font-outfit)",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {c.sub}
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "auto",
                paddingTop: "0.75rem",
                color: C.onSurface,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {labels.viewCaseStudy}
              <span
                className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                style={{ fontSize: "16px" }}
              >
                arrow_forward
              </span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
