"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type UrgencyViz = "race" | "review" | "timeline" | "clock";

export type UrgencyCard = {
  /** Material Symbols icon name */
  icon: string;
  tag: string;
  title: string;
  desc: string;
  viz: UrgencyViz;
};

export type UrgencyLabels = {
  you: string;
  competitor: string;
  shipped: string;
  waiting: string;
  review1: string;
  review2: string;
  week: string;
  launch: string;
  briefSent: string;
  estimateSent: string;
};

type Props = {
  heading: string;
  cards: UrgencyCard[];
  labels: UrgencyLabels;
};

const C = {
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#8b5cf6",
  tertiary: "#5edf81",
  danger: "#ff6b6b",
  outline: "#958ea0",
  dim: "rgba(255,255,255,0.12)",
  line: "rgba(73,68,84,0.28)",
};

const mono: CSSProperties = {
  fontSize: "10px",
  fontFamily: "monospace",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const RING_R = 16;
const RING_LEN = 2 * Math.PI * RING_R;

/* ── Scene builders. Each returns a looping, paused timeline. ─────────────── */

function buildRace(root: HTMLElement): gsap.core.Timeline {
  const themFill = root.querySelector<HTMLElement>(".uc-lane--them .uc-lane__fill")!;
  const themStatus = root.querySelector<HTMLElement>(".uc-lane--them .uc-lane__status")!;
  const youFill = root.querySelector<HTMLElement>(".uc-lane--you .uc-lane__fill")!;
  const youStatus = root.querySelector<HTMLElement>(".uc-lane--you .uc-lane__status")!;

  const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5 });
  tl.set([themFill, youFill], { width: "0%" })
    .set(themStatus, { opacity: 0, y: 4 })
    .set(youStatus, { opacity: 0.9 })
    .to(themFill, { width: "100%", duration: 2.2, ease: "power2.inOut" }, 0)
    .to(youFill, { width: "14%", duration: 2.2, ease: "power1.out" }, 0)
    .to(youStatus, { opacity: 0.3, duration: 0.45, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0)
    .to(themStatus, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 2.1)
    .to({}, { duration: 1.6 })
    .to([themFill, youFill], { width: "0%", duration: 0.5, ease: "power2.in" })
    .to(themStatus, { opacity: 0, duration: 0.2 }, "<");
  return tl;
}

function buildReview(root: HTMLElement): gsap.core.Timeline {
  const stars = Array.from(root.querySelectorAll<HTMLElement>(".uc-star"));
  const bad = root.querySelector<HTMLElement>(".uc-review__text--bad")!;
  const good = root.querySelector<HTMLElement>(".uc-review__text--good")!;

  const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 });
  tl.set(stars, { color: C.dim, scale: 1 })
    .set(stars[0], { color: C.danger })
    .set(bad, { opacity: 1, y: 0 })
    .set(good, { opacity: 0, y: 6 })
    .to({}, { duration: 1.8 })
    .to(bad, { opacity: 0, y: -6, duration: 0.3, ease: "power2.in" })
    .to(stars, { color: C.tertiary, duration: 0.25, stagger: 0.12 }, "<")
    .to(
      stars,
      { scale: 1.3, duration: 0.16, stagger: 0.12, yoyo: true, repeat: 1, ease: "power2.out" },
      "<",
    )
    .to(good, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.2")
    .to({}, { duration: 2.2 })
    .to(good, { opacity: 0, y: -6, duration: 0.3, ease: "power2.in" })
    .to(stars, { color: C.dim, duration: 0.3 }, "<")
    .to(stars[0], { color: C.danger, duration: 0.3 }, "<")
    .to(bad, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1");
  return tl;
}

function buildTimeline(root: HTMLElement): gsap.core.Timeline {
  const fill = root.querySelector<HTMLElement>(".uc-tl__fill")!;
  const dots = Array.from(root.querySelectorAll<HTMLElement>(".uc-tl__dot"));
  const counter = root.querySelector<HTMLElement>(".uc-tl__counter b")!;
  const launch = root.querySelector<HTMLElement>(".uc-tl__launch")!;
  const state = { week: 1 };
  const D = 3;

  const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5 });
  tl.set(fill, { width: "0%" })
    .set(dots, { backgroundColor: C.dim, boxShadow: "none" })
    .set(launch, { opacity: 0.4 })
    .set(state, { week: 1, onComplete: () => (counter.textContent = "1") })
    .to(fill, { width: "100%", duration: D, ease: "power1.inOut" }, 0)
    .to(
      state,
      {
        week: 12,
        duration: D,
        ease: "power1.inOut",
        snap: { week: 1 },
        onUpdate: () => (counter.textContent = String(state.week)),
      },
      0,
    );
  dots.forEach((dot, i) => {
    tl.to(
      dot,
      { backgroundColor: C.primary, boxShadow: `0 0 0 3px rgba(139,92,246,0.25)`, duration: 0.2 },
      (D * i) / (dots.length - 1),
    );
  });
  tl.to(launch, { opacity: 1, duration: 0.3 }, D - 0.1)
    .fromTo(
      launch,
      { textShadow: "0 0 0 rgba(94,223,129,0)" },
      { textShadow: "0 0 14px rgba(94,223,129,0.8)", duration: 0.5, yoyo: true, repeat: 3 },
      D,
    )
    .to({}, { duration: 1.2 })
    .to(fill, {
      width: "0%",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => (counter.textContent = "1"),
    })
    .to(dots, { backgroundColor: C.dim, boxShadow: "none", duration: 0.3 }, "<")
    .to(launch, { opacity: 0.4, duration: 0.3 }, "<");
  return tl;
}

function buildClock(root: HTMLElement): gsap.core.Timeline {
  const prog = root.querySelector<SVGCircleElement>(".uc-ring__prog")!;
  const num = root.querySelector<HTMLElement>(".uc-clock__num")!;
  const sent = root.querySelector<HTMLElement>(".uc-clock__state--sent")!;
  const done = root.querySelector<HTMLElement>(".uc-clock__state--done")!;
  const state = { h: 24 };
  const D = 2.6;

  const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5 });
  tl.set(prog, { attr: { "stroke-dashoffset": 0 }, stroke: C.primary })
    .set(num, { color: C.onSurface })
    .set(sent, { opacity: 1, y: 0 })
    .set(done, { opacity: 0, scale: 0.9 })
    .set(state, { h: 24, onComplete: () => (num.textContent = "24h") })
    .to(prog, { attr: { "stroke-dashoffset": RING_LEN * 0.72 }, duration: D, ease: "power1.inOut" }, 0)
    .to(
      state,
      {
        h: 7,
        duration: D,
        ease: "power1.inOut",
        snap: { h: 1 },
        onUpdate: () => (num.textContent = `${state.h}h`),
      },
      0,
    )
    .to(prog, { stroke: C.tertiary, duration: 0.3 }, D)
    .to(num, { color: C.tertiary, duration: 0.3 }, D)
    .to(sent, { opacity: 0, y: -6, duration: 0.25 }, D)
    .to(done, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, D + 0.05)
    .to({}, { duration: 1.8 })
    .to(done, { opacity: 0, duration: 0.25 })
    .to(
      prog,
      {
        attr: { "stroke-dashoffset": 0 },
        stroke: C.primary,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => (num.textContent = "24h"),
      },
      "<",
    )
    .to(num, { color: C.onSurface, duration: 0.3 }, "<")
    .to(sent, { opacity: 1, y: 0, duration: 0.3 }, "-=0.1");
  return tl;
}

const BUILDERS: Record<UrgencyViz, (root: HTMLElement) => gsap.core.Timeline> = {
  race: buildRace,
  review: buildReview,
  timeline: buildTimeline,
  clock: buildClock,
};

/** Final frame of every scene, for reduced-motion users. */
function setResting(root: HTMLElement) {
  gsap.set(root.querySelectorAll(".uc-lane--them .uc-lane__fill"), { width: "100%" });
  gsap.set(root.querySelectorAll(".uc-lane--you .uc-lane__fill"), { width: "14%" });
  gsap.set(root.querySelectorAll(".uc-lane--them .uc-lane__status"), { opacity: 1 });
  gsap.set(root.querySelectorAll(".uc-star"), { color: C.tertiary });
  gsap.set(root.querySelectorAll(".uc-review__text--bad"), { opacity: 0 });
  gsap.set(root.querySelectorAll(".uc-review__text--good"), { opacity: 1 });
  gsap.set(root.querySelectorAll(".uc-tl__fill"), { width: "100%" });
  gsap.set(root.querySelectorAll(".uc-tl__dot"), { backgroundColor: C.primary });
  root.querySelectorAll(".uc-tl__counter b").forEach((b) => (b.textContent = "12"));
  gsap.set(root.querySelectorAll(".uc-ring__prog"), { attr: { "stroke-dashoffset": RING_LEN * 0.72 }, stroke: C.tertiary });
  root.querySelectorAll(".uc-clock__num").forEach((n) => ((n as HTMLElement).textContent = "7h"));
  gsap.set(root.querySelectorAll(".uc-clock__num"), { color: C.tertiary });
  gsap.set(root.querySelectorAll(".uc-clock__state--sent"), { opacity: 0 });
  gsap.set(root.querySelectorAll(".uc-clock__state--done"), { opacity: 1, scale: 1 });
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function UrgencyCards({ heading, cards, labels }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const panel = panelRef.current;
      if (!root || !panel) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cells = gsap.utils.toArray<HTMLElement>(".uc-card", panel);
      const rule = root.querySelector<HTMLElement>(".uc-head__rule");

      if (reduced) {
        setResting(panel);
        return;
      }

      // Entrance: rule draws, cells rise in sequence.
      gsap.set(cells, { y: 28, opacity: 0 });
      if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "0 50%" });
      ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        once: true,
        onEnter: () => {
          if (rule) gsap.to(rule, { scaleX: 1, duration: 0.9, ease: "power3.out" });
          gsap.to(cells, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.1 });
        },
      });

      // Scenes: build once, run only while the panel is on screen.
      const scenes = cells.map((cell) => {
        const viz = cell.querySelector<HTMLElement>(".uc-viz");
        const kind = viz?.dataset.viz as UrgencyViz | undefined;
        return viz && kind ? BUILDERS[kind](viz) : null;
      });
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          scenes.forEach((tl, i) => {
            if (!tl) return;
            if (self.isActive) {
              // Stagger the loops so the four scenes don't tick in lockstep.
              gsap.delayedCall(0.35 + i * 0.25, () => tl.play());
            } else {
              tl.pause();
            }
          });
        },
      });

      // Cursor spotlight.
      const onMove = (e: PointerEvent) => {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty("--mx", `${e.clientX - r.left}px`);
        panel.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      panel.addEventListener("pointermove", onMove);
      return () => panel.removeEventListener("pointermove", onMove);
    },
    { scope: rootRef, dependencies: [cards.length] },
  );

  return (
    <div ref={rootRef} className="uc-root">
      <div className="uc-head">
        <span style={{ ...mono, color: C.tertiary, whiteSpace: "nowrap" }}>{heading}</span>
        <span className="uc-head__rule" />
      </div>

      <div className="uc-frame">
        <div ref={panelRef} className="uc-panel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.viz} className="uc-card">
              <div className="uc-card__tag">
                <span className="material-symbols-outlined" style={{ fontSize: "18px", color: C.primary }}>
                  {card.icon}
                </span>
                <span style={{ ...mono, color: C.outline }}>{card.tag}</span>
              </div>
              <p className="uc-card__title">{card.title}</p>
              <p className="uc-card__desc">{card.desc}</p>

              {card.viz === "race" && (
                <div className="uc-viz" data-viz="race">
                  {(
                    [
                      ["them", labels.competitor, labels.shipped],
                      ["you", labels.you, labels.waiting],
                    ] as const
                  ).map(([key, label, status]) => (
                    <div key={key} className={`uc-lane uc-lane--${key}`}>
                      <div className="uc-lane__row">
                        <span className="uc-lane__label" style={mono}>
                          {label}
                        </span>
                        <span className="uc-lane__status" style={mono}>
                          {status}
                        </span>
                      </div>
                      <span className="uc-lane__track">
                        <span className="uc-lane__fill" />
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {card.viz === "review" && (
                <div className="uc-viz" data-viz="review">
                  <div className="uc-review">
                    <div className="uc-review__stars" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span key={i} className="material-symbols-outlined uc-star">
                          star
                        </span>
                      ))}
                    </div>
                    <div className="uc-review__body">
                      <span className="uc-review__text uc-review__text--bad">{labels.review1}</span>
                      <span className="uc-review__text uc-review__text--good">{labels.review2}</span>
                    </div>
                  </div>
                </div>
              )}

              {card.viz === "timeline" && (
                <div className="uc-viz" data-viz="timeline">
                  <div className="uc-tl__head">
                    <span className="uc-tl__counter" style={mono}>
                      {labels.week} <b>1</b>
                    </span>
                    <span className="uc-tl__launch" style={mono}>
                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                        flag
                      </span>
                      {labels.launch}
                    </span>
                  </div>
                  <div className="uc-tl__track">
                    <span className="uc-tl__fill" />
                    {[0, 33.4, 66.7, 100].map((p) => (
                      <span key={p} className="uc-tl__dot" style={{ insetInlineStart: `${p}%` }} />
                    ))}
                  </div>
                </div>
              )}

              {card.viz === "clock" && (
                <div className="uc-viz" data-viz="clock">
                  <svg className="uc-ring" viewBox="0 0 40 40" aria-hidden="true">
                    <circle cx="20" cy="20" r={RING_R} fill="none" stroke={C.dim} strokeWidth="3" />
                    <circle
                      className="uc-ring__prog"
                      cx="20"
                      cy="20"
                      r={RING_R}
                      fill="none"
                      stroke={C.primary}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={RING_LEN}
                      strokeDashoffset={0}
                    />
                  </svg>
                  <div className="uc-clock__body">
                    <span className="uc-clock__num">24h</span>
                    <span className="uc-clock__states">
                      <span className="uc-clock__state uc-clock__state--sent" style={mono}>
                        {labels.briefSent}
                      </span>
                      <span className="uc-clock__state uc-clock__state--done" style={mono}>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                          check_circle
                        </span>
                        {labels.estimateSent}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="uc-spot" aria-hidden="true" />
        </div>
      </div>

      <style>{`
        .uc-root { margin-top: 2.75rem; }
        .uc-head { display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; }
        .uc-head__rule { flex: 1; height: 1px; background: ${C.line}; }

        /* Light beam sweeping the panel edge (uses --border-angle from globals.css). */
        .uc-frame {
          position: relative;
          padding: 1px;
          border-radius: 17px;
          background: conic-gradient(
            from var(--border-angle),
            ${C.line} 0deg,
            ${C.line} 296deg,
            rgba(139,92,246,0.95) 326deg,
            rgba(94,223,129,0.7) 338deg,
            ${C.line} 360deg
          );
          animation: border-spin 7s linear infinite;
        }
        .uc-panel {
          position: relative;
          gap: 1px;
          background: ${C.line};
          border-radius: 16px;
          overflow: hidden;
          --mx: 50%;
          --my: 50%;
        }
        .uc-spot {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            420px circle at var(--mx) var(--my),
            rgba(139,92,246,0.14),
            rgba(139,92,246,0.05) 40%,
            transparent 65%
          );
        }
        .uc-panel:hover .uc-spot { opacity: 1; }

        .uc-card {
          position: relative;
          background: ${C.surfaceLow};
          padding: 20px 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 250px;
          transition: background-color 0.25s ease;
        }
        .uc-card:hover { background: ${C.surfaceContainer}; }
        .uc-card__tag { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .uc-card__title {
          color: ${C.onSurface};
          font-family: var(--font-outfit);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .uc-card__desc { color: ${C.onSurfaceVariant}; font-size: 13px; line-height: 1.5; margin: 0; }

        .uc-viz {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px dashed rgba(73,68,84,0.45);
        }

        /* Race */
        .uc-lane { display: flex; flex-direction: column; gap: 5px; }
        .uc-lane + .uc-lane { margin-top: 10px; }
        .uc-lane__row { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        .uc-lane__label { color: ${C.outline}; }
        .uc-lane__track { position: relative; display: block; height: 6px; border-radius: 999px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .uc-lane__fill { position: absolute; top: 0; bottom: 0; inset-inline-start: 0; width: 0; border-radius: 999px; }
        .uc-lane--them .uc-lane__fill { background: linear-gradient(90deg, ${C.primary}, #c4b5fd); box-shadow: 0 0 10px rgba(139,92,246,0.6); }
        .uc-lane--you .uc-lane__fill { background: ${C.outline}; opacity: 0.55; }
        .uc-lane__status { white-space: nowrap; }
        .uc-lane--them .uc-lane__status { color: ${C.tertiary}; opacity: 0; }
        .uc-lane--you .uc-lane__status { color: ${C.outline}; }

        /* Review */
        .uc-review { display: flex; flex-direction: column; gap: 6px; }
        .uc-review__stars { display: flex; gap: 2px; }
        .uc-star { font-size: 16px; color: ${C.dim}; font-variation-settings: 'FILL' 1; transform-origin: center; }
        .uc-review__body { position: relative; min-height: 34px; }
        .uc-review__text { position: absolute; inset-inline: 0; top: 0; color: ${C.onSurfaceVariant}; font-size: 12px; line-height: 1.4; font-style: italic; }
        .uc-review__text--good { opacity: 0; }

        /* Timeline */
        .uc-tl__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .uc-tl__counter { color: ${C.onSurfaceVariant}; }
        .uc-tl__counter b { color: ${C.onSurface}; font-size: 13px; }
        .uc-tl__launch { display: inline-flex; align-items: center; gap: 4px; color: ${C.tertiary}; opacity: 0.4; }
        .uc-tl__track { position: relative; height: 6px; margin: 0 4px; border-radius: 999px; background: rgba(255,255,255,0.06); }
        .uc-tl__fill { position: absolute; top: 0; bottom: 0; inset-inline-start: 0; width: 0; border-radius: 999px; background: linear-gradient(90deg, ${C.primary}, ${C.tertiary}); }
        .uc-tl__dot { position: absolute; top: 50%; width: 10px; height: 10px; margin-top: -5px; margin-inline-start: -5px; border-radius: 50%; background: ${C.dim}; border: 2px solid ${C.surfaceLow}; }

        /* Clock */
        [data-viz="clock"] { display: flex; align-items: center; gap: 12px; }
        .uc-ring { width: 44px; height: 44px; flex-shrink: 0; transform: rotate(-90deg); }
        .uc-clock__body { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .uc-clock__num { color: ${C.onSurface}; font-family: monospace; font-size: 18px; font-weight: 700; line-height: 1; }
        .uc-clock__states { position: relative; display: block; height: 14px; }
        .uc-clock__state { position: absolute; inset-inline-start: 0; top: 0; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
        .uc-clock__state--sent { color: ${C.outline}; }
        .uc-clock__state--done { color: ${C.tertiary}; opacity: 0; }

        @media (prefers-reduced-motion: reduce) {
          .uc-frame { animation: none; }
          .uc-spot { display: none; }
        }
      `}</style>
    </div>
  );
}
