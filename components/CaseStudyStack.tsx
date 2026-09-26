"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type CaseStudy = {
  id: string;
  name: string;
  sub: string;
  tags: string[];
  tagColor: string;
  stats: string[][];
  statColor: string;
  img: string;
  desc: string;
  imgRight: boolean;
  badge: { icon: string; text: string; color: string };
  links?: { label: string; href: string; icon: string }[];
};

type Props = {
  cases: CaseStudy[];
  labels: { caseStudy: string; appStore: string; viewCaseStudy: string };
};

/* ── Tuning ──────────────────────────────────────────────────────────────── */
const STACK_TOP = 96; // px from the viewport top where cards pin (header is 80px)
const STACK_STEP = 12; // each card pins a little lower so the deck edges peek out
const STACK_SCALE = 0.035; // how much a covered card shrinks per card on top of it
const STACK_DIM = 0.32; // veil opacity added per card on top
const CARD_GAP = 32; // px between cards in normal flow (the sentinel sits this far above each card)

const C = {
  surface: "#131317",
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#8b5cf6",
  outline: "#958ea0",
};

const primaryBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 18px",
  borderRadius: "9999px",
  backgroundColor: C.onSurface,
  color: "#131317",
  fontSize: "13px",
  fontWeight: 700,
  textDecoration: "none",
};

const secondaryBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 18px",
  borderRadius: "9999px",
  backgroundColor: "rgba(208,188,255,0.15)",
  color: C.primary,
  fontSize: "13px",
  fontWeight: 600,
  textDecoration: "none",
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
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/** "8,000+" → prefix "", number 8000, grouped, suffix "+". Returns null for non-numeric values. */
function parseStat(raw: string) {
  const m = raw.trim().match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  if (!m) return null;
  const numStr = m[2];
  const num = parseFloat(numStr.replace(/,/g, ""));
  if (!Number.isFinite(num)) return null;
  return {
    prefix: m[1],
    num,
    decimals: (numStr.split(".")[1] || "").length,
    grouped: numStr.includes(","),
    suffix: m[3],
  };
}

function formatStat(p: NonNullable<ReturnType<typeof parseStat>>, value: number) {
  const [int, dec] = value.toFixed(p.decimals).split(".");
  const intFmt = p.grouped ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : int;
  return `${p.prefix}${intFmt}${dec ? "." + dec : ""}${p.suffix}`;
}

export default function CaseStudyStack({ cases, labels }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
      const sentinels = gsap.utils.toArray<HTMLElement>("[data-sentinel]", root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(pointer: fine)",
          desktop: "(min-width: 1024px)",
        },
        (ctx) => {
          const { motion, fine, desktop } = ctx.conditions as {
            motion: boolean;
            fine: boolean;
            desktop: boolean;
          };
          const cleanups: (() => void)[] = [];

          if (motion) {
            /* ── Deck stacking (desktop): covered cards shrink and dim ─────── */
            const arrival = cards.map(() => 0);
            const applyStack = () => {
              cards.forEach((card, i) => {
                let depth = 0;
                for (let j = i + 1; j < cards.length; j++) depth += arrival[j];
                gsap.set(card, { scale: 1 - depth * STACK_SCALE, transformOrigin: "50% 0%" });
                const veil = card.querySelector<HTMLElement>("[data-veil]");
                if (veil) veil.style.opacity = String(Math.min(0.72, depth * STACK_DIM));
              });
            };
            if (desktop) {
              cards.forEach((_, j) => {
                if (j === 0) return;
                ScrollTrigger.create({
                  trigger: sentinels[j],
                  // from the moment this card's top edge touches the pinned card above it…
                  start: () =>
                    `top ${STACK_TOP + (j - 1) * STACK_STEP + cards[j - 1].offsetHeight - CARD_GAP}px`,
                  // …until it pins itself
                  end: `top ${STACK_TOP + j * STACK_STEP}px`,
                  scrub: true,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => {
                    arrival[j] = self.progress;
                    applyStack();
                  },
                  onRefresh: (self) => {
                    arrival[j] = self.progress;
                    applyStack();
                  },
                });
              });
            }

            cards.forEach((card, i) => {
              const sentinel = sentinels[i];
              const textCol = card.querySelector<HTMLElement>("[data-text]");
              const media = card.querySelector<HTMLElement>("[data-media]");
              const img = card.querySelector<HTMLElement>("[data-media] img");
              const title = card.querySelector<HTMLElement>("[data-title]");
              const watermark = card.querySelector<HTMLElement>("[data-watermark]");
              const badge = card.querySelector<HTMLElement>("[data-badge]");
              const stats = gsap.utils.toArray<HTMLElement>("[data-stat]", card);
              const revealItems = textCol
                ? gsap.utils.toArray<HTMLElement>(":scope > [data-reveal]", textCol)
                : [];

              if (img) gsap.set(img, { scale: 1.18 });

              /* ── Entrance ─────────────────────────────────────────────── */
              const tl = gsap.timeline({
                scrollTrigger: { trigger: sentinel, start: "top 78%", once: true },
              });
              tl.from(
                revealItems,
                { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
                0,
              );
              if (title) tl.from(title, { yPercent: 115, duration: 1.1, ease: "power4.out" }, 0.08);
              if (stats.length)
                tl.from(
                  stats,
                  { scale: 0.9, opacity: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.08 },
                  0.4,
                );
              if (media)
                tl.from(
                  media,
                  { clipPath: "inset(14% 10% 14% 10% round 24px)", duration: 1.3, ease: "power4.inOut" },
                  0,
                );
              if (img) tl.from(img, { scale: 1.5, duration: 1.8, ease: "power3.out" }, 0);

              /* ── Count-ups ────────────────────────────────────────────── */
              stats.forEach((stat) => {
                const valueEl = stat.querySelector<HTMLElement>("[data-value]");
                if (!valueEl) return;
                ScrollTrigger.create({
                  trigger: stat,
                  start: "top 92%",
                  once: true,
                  onEnter: () => {
                    const parsed = parseStat(valueEl.dataset.value ?? valueEl.textContent ?? "");
                    if (!parsed) return;
                    const counter = { v: 0 };
                    gsap.to(counter, {
                      v: parsed.num,
                      duration: 1.8,
                      ease: "power2.out",
                      onUpdate: () => {
                        valueEl.textContent = formatStat(parsed, counter.v);
                      },
                    });
                  },
                });
              });

              /* ── Scroll parallax: image drifts, watermark drifts opposite ── */
              const journey = {
                trigger: sentinel,
                start: "top bottom",
                end: () => `+=${card.offsetHeight + window.innerHeight}`,
                scrub: true,
              };
              if (img) gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: journey });
              if (watermark)
                gsap.fromTo(watermark, { yPercent: 35 }, { yPercent: -35, ease: "none", scrollTrigger: journey });

              /* ── Status badge floats ──────────────────────────────────── */
              if (badge)
                gsap.to(badge, { y: -4, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" });

              /* ── Pointer: spotlight, 3D tilt, glare ───────────────────── */
              if (fine) {
                const spot = card.querySelector<HTMLElement>("[data-spot]");
                const glare = card.querySelector<HTMLElement>("[data-glare]");
                const onMove = (e: PointerEvent) => {
                  const r = card.getBoundingClientRect();
                  card.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  card.style.setProperty("--my", `${e.clientY - r.top}px`);
                  if (!media) return;
                  const mr = media.getBoundingClientRect();
                  const px = (e.clientX - mr.left) / mr.width - 0.5;
                  const py = (e.clientY - mr.top) / mr.height - 0.5;
                  const inside = Math.abs(px) <= 0.5 && Math.abs(py) <= 0.5;
                  gsap.to(media, {
                    rotateY: inside ? px * 10 : 0,
                    rotateX: inside ? -py * 8 : 0,
                    transformPerspective: 1000,
                    duration: 0.7,
                    ease: "power2.out",
                  });
                  if (glare) {
                    glare.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
                    glare.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
                    gsap.to(glare, { opacity: inside ? 1 : 0, duration: 0.4 });
                  }
                };
                const onEnter = () => {
                  if (spot) gsap.to(spot, { opacity: 1, duration: 0.5 });
                };
                const onLeave = () => {
                  if (spot) gsap.to(spot, { opacity: 0, duration: 0.5 });
                  if (glare) gsap.to(glare, { opacity: 0, duration: 0.4 });
                  if (media)
                    gsap.to(media, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "power3.out" });
                };
                card.addEventListener("pointermove", onMove);
                card.addEventListener("pointerenter", onEnter);
                card.addEventListener("pointerleave", onLeave);
                cleanups.push(() => {
                  card.removeEventListener("pointermove", onMove);
                  card.removeEventListener("pointerenter", onEnter);
                  card.removeEventListener("pointerleave", onLeave);
                });
              }
            });
          }

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="case-stack"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {cases.map((c, i) => (
        <div key={c.id} style={{ display: "contents" }}>
          {/* Non-sticky marker: gives ScrollTrigger the card's natural position */}
          <div data-sentinel aria-hidden style={{ height: 0, margin: 0 }} />
          <article
            data-card
            style={
              {
                "--stack-top": `${STACK_TOP + i * STACK_STEP}px`,
                marginTop: i === 0 ? 0 : CARD_GAP,
                borderRadius: "1.5rem",
                backgroundColor: C.surfaceLowest,
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 -20px 60px -30px rgba(0,0,0,0.9)",
                padding: "2.5rem",
                gap: "2.5rem",
                overflow: "hidden",
                willChange: "transform",
              } as CSSProperties
            }
            className="grid grid-cols-1 lg:grid-cols-2"
          >
            {/* cursor spotlight */}
            <div
              data-spot
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(720px circle at var(--mx, 50%) var(--my, 50%), ${hexA(c.tagColor, 0.11)}, transparent 45%)`,
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            {/* accent aura */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -160,
                [c.imgRight ? "left" : "right"]: -120,
                width: 420,
                height: 420,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${hexA(c.tagColor, 0.14)} 0%, ${hexA(c.tagColor, 0)} 68%)`,
                pointerEvents: "none",
              }}
            />

            <div
              data-text
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                order: c.imgRight ? 1 : 2,
                position: "relative",
              }}
              className={c.imgRight ? "lg:order-1" : "lg:order-2"}
            >
              {/* big index watermark */}
              <span
                data-watermark
                aria-hidden
                style={{
                  position: "absolute",
                  top: "-0.35em",
                  insetInlineEnd: 0,
                  fontFamily: "var(--font-outfit)",
                  fontSize: "clamp(96px, 12vw, 160px)",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.035)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {c.id}
              </span>

              <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", position: "relative" }}>
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "3px 10px",
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
              <span data-reveal style={{ ...mono, color: C.outline, position: "relative" }}>
                {c.id} / {labels.caseStudy}
              </span>
              <div style={{ overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
                <h2
                  data-title
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "clamp(32px, 5vw, 48px)",
                    lineHeight: "1.1",
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                    color: C.onSurface,
                    margin: 0,
                    position: "relative",
                  }}
                >
                  {c.name}
                </h2>
              </div>
              <p
                data-reveal
                style={{
                  color: c.tagColor,
                  fontSize: "20px",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 600,
                  margin: 0,
                  position: "relative",
                }}
              >
                {c.sub}
              </p>
              <p
                data-reveal
                style={{ color: C.onSurfaceVariant, fontSize: "15px", lineHeight: "24px", margin: 0, position: "relative" }}
              >
                {c.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ position: "relative" }}>
                {c.stats.map(([v, l]) => (
                  <div
                    key={l}
                    data-stat
                    style={{
                      padding: "0.75rem",
                      borderRadius: "12px",
                      backgroundColor: C.surfaceLow,
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <span
                      data-value={v}
                      style={{
                        color: c.statColor,
                        fontSize: "20px",
                        fontFamily: "var(--font-outfit)",
                        fontWeight: 700,
                        display: "block",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {v}
                    </span>
                    <span style={{ ...mono, color: C.outline, marginTop: "4px", display: "block" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div
                data-reveal
                style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem", position: "relative" }}
              >
                {c.links ? (
                  c.links.map((link, li) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={li === 0 ? primaryBtn : secondaryBtn}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                        {link.icon}
                      </span>
                      {link.label}
                    </a>
                  ))
                ) : (
                  <>
                    <a href="#" style={primaryBtn}>
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                        file_download
                      </span>
                      {labels.appStore}
                    </a>
                    <a href="#" style={secondaryBtn}>
                      {labels.viewCaseStudy}
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                        arrow_forward
                      </span>
                    </a>
                  </>
                )}
              </div>
            </div>

            <div
              data-media
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                backgroundColor: C.surfaceLow,
                minHeight: "360px",
                order: c.imgRight ? 2 : 1,
                boxShadow: "0 30px 60px -30px rgba(0,0,0,0.8)",
                transformStyle: "preserve-3d",
              }}
              className={c.imgRight ? "lg:order-2" : "lg:order-1"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.name}
                width="800"
                height="600"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  willChange: "transform",
                }}
              />
              {/* glare that follows the pointer */}
              <div
                data-glare
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.16), transparent 60%)",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              {/* bottom gradient for legibility of the badge */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(14,14,18,0) 60%, rgba(14,14,18,0.55) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                data-badge
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(14,14,18,0.9)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${hexA(c.badge.color, 0.25)}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span className="material-symbols-outlined" style={{ color: c.badge.color, fontSize: "14px" }}>
                  {c.badge.icon}
                </span>
                <span style={{ ...mono, color: c.badge.color, letterSpacing: "0.08em" }}>{c.badge.text}</span>
              </div>
            </div>

            {/* veil: darkens the card as the next one stacks on top (desktop) */}
            <div
              data-veil
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#0b0b0f",
                opacity: 0,
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
          </article>
        </div>
      ))}
    </div>
  );
}
