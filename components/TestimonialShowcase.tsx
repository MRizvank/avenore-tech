"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  /** "Title · Company" — the company is shown on its own in the client rail */
  role: string;
  accent: string;
  img?: string;
  stat: { value: string; label: string };
};

type Props = {
  items: Testimonial[];
  heading: { label: string; title: string; subtitle: string };
  labels: { prev: string; next: string };
  rtl?: boolean;
  /** how long one testimonial stays on screen before the next one slides in (autoplay mode) */
  autoplayMs?: number;
};

/**
 * "scroll": desktop — the block sticks in the viewport and the page scroll steps through every client.
 * "auto":   smaller screens / reduced motion — autoplay, tap and swipe.
 */
type Mode = "auto" | "scroll";

/* ── Tuning ──────────────────────────────────────────────────────────────── */
const STICKY_MIN_TOP = 88; // px; the fixed site header is 80px
const STEP_VH = 0.55; // scroll distance per client, as a fraction of the viewport height
const STEP_MIN = 340; // px

const C = {
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#8b5cf6",
  outline: "#958ea0",
  outlineVariant: "#494454",
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
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/** The big decorative glyph already frames the quote, so drop the typographic quotes. */
function stripQuotes(text: string) {
  return text.replace(/^[\s"“”„«»「『]+/, "").replace(/[\s"“”„«»」』]+$/, "");
}

type Segmenter = {
  segment(input: string): Iterable<{ segment: string; isWordLike?: boolean }>;
};
type SegmenterCtor = new (
  locale?: string,
  opts?: { granularity: "word" },
) => Segmenter;

/** Split into animatable tokens. Space-delimited scripts split on spaces; CJK falls back to word segmentation. */
function splitWords(text: string): { tokens: string[]; joiner: string } {
  const tokens = text.split(/\s+/).filter(Boolean);
  if (tokens.length >= 4) return { tokens, joiner: " " };
  const Seg = (Intl as unknown as { Segmenter?: SegmenterCtor }).Segmenter;
  if (Seg) {
    const parts = Array.from(
      new Seg(undefined, { granularity: "word" }).segment(text),
      (s) => s.segment,
    ).filter((s) => s.trim().length > 0);
    if (parts.length > 1) return { tokens: parts, joiner: "" };
  }
  return { tokens: Array.from(text), joiner: "" };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => Array.from(w)[0] ?? "")
    .join("");
}

function splitRole(role: string) {
  const [title, ...rest] = role.split("·").map((s) => s.trim());
  return { title, company: rest.join(" · ") };
}

function Avatar({ item, size }: { item: Testimonial; size: number }) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: item.img
          ? C.surfaceContainer
          : `linear-gradient(135deg, ${hexA(item.accent, 0.32)}, ${hexA(item.accent, 0.08)})`,
        boxShadow: `0 0 0 1px ${hexA(item.accent, 0.55)}, 0 0 0 4px ${hexA(item.accent, 0.12)}`,
        color: item.accent,
        fontFamily: "var(--font-outfit)",
        fontWeight: 700,
        fontSize: Math.round(size * 0.34),
        letterSpacing: "0.02em",
      }}
    >
      {item.img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.img}
          alt=""
          width={size * 2}
          height={size * 2}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        initials(item.name)
      )}
    </span>
  );
}

export default function TestimonialShowcase({
  items,
  heading,
  labels,
  rtl = false,
  autoplayMs = 7000,
}: Props) {
  /** tall wrapper the sticky block travels through in scroll mode */
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  /** which client is highlighted in the rail (updates instantly) */
  const [selected, setSelected] = useState(0);
  /** which slide is rendered on the stage (updates once the outgoing quote has left) */
  const [active, setActive] = useState(0);

  const selectedRef = useRef(0);
  const activeRef = useRef(0);
  const firstRun = useRef(true);
  const reducedRef = useRef(false);
  const modeRef = useRef<Mode>("auto");
  const scrollST = useRef<ScrollTrigger | null>(null);
  /** a rail/arrow click in scroll mode moves the page; ignore scroll-driven steps until it lands */
  const jumpRef = useRef<{ y: number; until: number } | null>(null);
  const outTl = useRef<gsap.core.Timeline | null>(null);
  const progress = useRef<gsap.core.Tween | null>(null);
  const play = useRef({ hover: false, focus: false, inView: true });

  const count = items.length;
  const total = String(count).padStart(2, "0");

  const syncPlay = () => {
    const p = play.current;
    const shouldPause = p.hover || p.focus || !p.inView || document.hidden;
    if (shouldPause) progress.current?.pause();
    else progress.current?.resume();
  };

  /** Fade the current quote out, then let React swap the slide. */
  const go = (next: number) => {
    const root = rootRef.current;
    if (!root || count < 2) return;
    const target = ((next % count) + count) % count;
    const cur = activeRef.current;
    selectedRef.current = target;
    setSelected(target);
    if (target === cur) return;

    outTl.current?.kill();
    progress.current?.kill();
    const slide = gsap.utils.toArray<HTMLElement>("[data-slide]", root)[cur];

    if (reducedRef.current || !slide) {
      setActive(target);
      return;
    }

    outTl.current = gsap
      .timeline({ onComplete: () => setActive(target) })
      .to(
        slide.querySelectorAll("[data-word]"),
        {
          y: -10,
          opacity: 0,
          duration: 0.26,
          ease: "power2.in",
          stagger: { each: 0.004 },
          overwrite: "auto",
        },
        0,
      )
      .to(
        slide.querySelectorAll("[data-star]"),
        {
          scale: 0.4,
          opacity: 0,
          duration: 0.22,
          ease: "power2.in",
          stagger: 0.03,
          overwrite: "auto",
        },
        0,
      )
      .to(
        slide.querySelectorAll("[data-meta]"),
        {
          y: -8,
          opacity: 0,
          duration: 0.26,
          ease: "power2.in",
          stagger: 0.04,
          overwrite: "auto",
        },
        0,
      );
  };

  /** User navigation (rail, arrows, keys, swipe). In scroll mode the page moves to that client's step too. */
  const select = (next: number) => {
    const target = ((next % count) + count) % count;
    const st = scrollST.current;
    if (modeRef.current === "scroll" && st) {
      const y = st.start + ((target + 0.5) / count) * (st.end - st.start);
      jumpRef.current = { y, until: performance.now() + 2000 };
      window.scrollTo({
        top: y,
        behavior: reducedRef.current ? "auto" : "smooth",
      });
    }
    go(target);
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      const stage = root.querySelector<HTMLElement>("[data-stage]");
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", root);
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(pointer: fine)",
          scroll:
            "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { motion, fine, scroll } = ctx.conditions as {
            motion: boolean;
            fine: boolean;
            scroll: boolean;
          };
          reducedRef.current = !motion;
          const cleanups: (() => void)[] = [];

          if (motion) {
            /* ── Entrance: header, stage, first quote, rail ─────────────── */
            const first = slides[0];
            const tl = gsap.timeline({
              scrollTrigger: { trigger: root, start: "top 78%", once: true },
            });
            tl.from(root.querySelectorAll("[data-head]"), {
              y: 26,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
            });
            if (stage)
              tl.from(
                stage,
                {
                  y: 44,
                  opacity: 0,
                  scale: 0.985,
                  duration: 1.1,
                  ease: "power3.out",
                  transformOrigin: "50% 100%",
                },
                0.15,
              );
            if (first) {
              tl.from(
                first.querySelectorAll("[data-star]"),
                {
                  scale: 0,
                  opacity: 0,
                  duration: 0.45,
                  ease: "back.out(2.5)",
                  stagger: 0.05,
                },
                0.45,
              );
              tl.from(
                first.querySelectorAll("[data-word]"),
                {
                  y: 16,
                  opacity: 0,
                  duration: 0.6,
                  ease: "power3.out",
                  stagger: 0.012,
                },
                0.5,
              );
              tl.from(
                first.querySelectorAll("[data-meta]"),
                {
                  y: 14,
                  opacity: 0,
                  duration: 0.6,
                  ease: "power3.out",
                  stagger: 0.07,
                },
                0.85,
              );
            }
            // the wrapper is animated, not the button: the button has CSS transitions that would fight GSAP
            tl.from(
              root.querySelectorAll("[data-rail-slot]"),
              {
                y: 20,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.07,
              },
              0.4,
            );
            tl.from(
              root.querySelectorAll("[data-nav]"),
              { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.08 },
              0.7,
            );

            /* ── Decorative glyph drifts with the scroll ─────────────────── */
            const glyph = root.querySelector<HTMLElement>("[data-glyph]");
            if (glyph)
              gsap.fromTo(
                glyph,
                { yPercent: 18 },
                {
                  yPercent: -18,
                  ease: "none",
                  scrollTrigger: {
                    trigger: track,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
          }

          /* ── Pointer spotlight (desktop only) ─────────────────────────── */
          if (fine && stage) {
            const spot = stage.querySelector<HTMLElement>("[data-spot]");
            const onMove = (e: PointerEvent) => {
              const r = stage.getBoundingClientRect();
              stage.style.setProperty("--mx", `${e.clientX - r.left}px`);
              stage.style.setProperty("--my", `${e.clientY - r.top}px`);
            };
            const onEnter = () => {
              if (spot) gsap.to(spot, { opacity: 1, duration: 0.5 });
            };
            const onLeave = () => {
              if (spot) gsap.to(spot, { opacity: 0, duration: 0.5 });
            };
            stage.addEventListener("pointermove", onMove);
            stage.addEventListener("pointerenter", onEnter);
            stage.addEventListener("pointerleave", onLeave);
            cleanups.push(() => {
              stage.removeEventListener("pointermove", onMove);
              stage.removeEventListener("pointerenter", onEnter);
              stage.removeEventListener("pointerleave", onLeave);
            });

            // Only real pointers pause the autoplay on hover: on touch, "hover" never ends.
            const hoverOn = () => {
              play.current.hover = true;
              syncPlay();
            };
            const hoverOff = () => {
              play.current.hover = false;
              syncPlay();
            };
            root.addEventListener("pointerenter", hoverOn);
            root.addEventListener("pointerleave", hoverOff);
            cleanups.push(() => {
              root.removeEventListener("pointerenter", hoverOn);
              root.removeEventListener("pointerleave", hoverOff);
            });
          }

          /* ── Scroll mode: the block sticks while the page scrolls through every client ── */
          if (scroll) {
            modeRef.current = "scroll";
            progress.current?.kill();
            track.classList.add("tst-track--scroll");

            let stickyTop = STICKY_MIN_TOP;
            let travel = 0;
            // sizes the track and centres the sticky block; runs before every ScrollTrigger refresh
            const measure = () => {
              const blockH = root.offsetHeight;
              const step = Math.max(
                STEP_MIN,
                Math.round(window.innerHeight * STEP_VH),
              );
              travel = step * count;
              stickyTop = Math.max(
                STICKY_MIN_TOP,
                Math.round((window.innerHeight - blockH) / 2),
              );
              track.style.setProperty("--tst-track-h", `${blockH + travel}px`);
              track.style.setProperty("--tst-sticky-top", `${stickyTop}px`);
            };
            measure();
            ScrollTrigger.addEventListener("refreshInit", measure);

            // progress → which client is up, and how far through its step we are (the rail bars)
            const paint = (p: number) => {
              const x = Math.min(count - 0.0001, Math.max(0, p * count));
              const idx = Math.floor(x);
              const frac = x - idx;
              bars.forEach((bar, i) =>
                gsap.set(bar, { scaleX: i < idx ? 1 : i === idx ? frac : 0 }),
              );
              const jump = jumpRef.current;
              if (jump) {
                if (
                  performance.now() < jump.until &&
                  Math.abs(window.scrollY - jump.y) > 6
                )
                  return;
                jumpRef.current = null;
              }
              if (idx !== selectedRef.current) go(idx);
            };

            const st = ScrollTrigger.create({
              trigger: track,
              start: () => `top ${stickyTop}px`,
              end: () => `+=${travel}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => paint(self.progress),
              onLeaveBack: () => paint(0),
              onLeave: () => paint(1),
            });
            scrollST.current = st;
            paint(st.progress);

            // the block's height changes with fonts, language and viewport: keep the track in step
            let raf = 0;
            const ro = new ResizeObserver(() => {
              cancelAnimationFrame(raf);
              raf = requestAnimationFrame(() => ScrollTrigger.refresh());
            });
            ro.observe(root);

            cleanups.push(() => {
              ro.disconnect();
              cancelAnimationFrame(raf);
              ScrollTrigger.removeEventListener("refreshInit", measure);
              st.kill();
              scrollST.current = null;
              jumpRef.current = null;
              track.classList.remove("tst-track--scroll");
              track.style.removeProperty("--tst-track-h");
              track.style.removeProperty("--tst-sticky-top");
              modeRef.current = "auto";
            });
          } else {
            modeRef.current = "auto";
          }

          return () => cleanups.forEach((fn) => fn());
        },
      );

      /* ── Autoplay only runs while the section is on screen and the tab is visible ── */
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          play.current.inView = self.isActive;
          syncPlay();
        },
      });
      play.current.inView = st.isActive;

      const onVisibility = () => syncPlay();
      const onFocusIn = () => {
        play.current.focus = true;
        syncPlay();
      };
      const onFocusOut = (e: FocusEvent) => {
        if (root.contains(e.relatedTarget as Node | null)) return;
        play.current.focus = false;
        syncPlay();
      };
      document.addEventListener("visibilitychange", onVisibility);
      root.addEventListener("focusin", onFocusIn);
      root.addEventListener("focusout", onFocusOut);

      return () => {
        outTl.current?.kill();
        mm.revert();
        st.kill();
        document.removeEventListener("visibilitychange", onVisibility);
        root.removeEventListener("focusin", onFocusIn);
        root.removeEventListener("focusout", onFocusOut);
      };
    },
    { scope: rootRef },
  );

  /* ── When the stage swaps slides: animate the new quote in, restart the timer ── */
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      activeRef.current = active;

      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", root);
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", root);
      const auras = gsap.utils.toArray<HTMLElement>("[data-aura]", root);
      const slide = slides[active];
      const reduced = reducedRef.current;

      if (!firstRun.current && slide) {
        if (reduced) {
          gsap.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        } else {
          gsap
            .timeline()
            .fromTo(
              slide.querySelectorAll("[data-star]"),
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.45,
                ease: "back.out(2.5)",
                stagger: 0.05,
                overwrite: "auto",
              },
              0,
            )
            .fromTo(
              slide.querySelectorAll("[data-word]"),
              { y: 16, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: { each: 0.012 },
                overwrite: "auto",
              },
              0.05,
            )
            .fromTo(
              slide.querySelectorAll("[data-meta]"),
              { y: 14, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.07,
                overwrite: "auto",
              },
              0.35,
            );
        }
        gsap.to(auras, {
          opacity: (i: number) => (i === active ? 1 : 0),
          duration: reduced ? 0.3 : 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      firstRun.current = false;

      // in scroll mode the page position owns the rail bars
      if (modeRef.current === "scroll") return;

      /* progress bar under the active client doubles as the autoplay timer */
      progress.current?.kill();
      gsap.to(
        bars.filter((_, i) => i !== active),
        { scaleX: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" },
      );
      if (reduced || count < 2 || !bars[active]) return;
      progress.current = gsap.fromTo(
        bars[active],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: autoplayMs / 1000,
          ease: "none",
          overwrite: "auto",
          onComplete: () => go(activeRef.current + 1),
        },
      );
      syncPlay();
    },
    { scope: rootRef, dependencies: [active, count, autoplayMs] },
  );

  /* ── Mobile: the rail is a horizontal strip, keep the selected client in view ── */
  useEffect(() => {
    const root = rootRef.current;
    const rail = root?.querySelector<HTMLElement>(".tst-rail");
    const slot =
      root?.querySelectorAll<HTMLElement>("[data-rail-slot]")[selected];
    if (!rail || !slot || rail.scrollWidth <= rail.clientWidth + 1) return;
    const r = rail.getBoundingClientRect();
    const sr = slot.getBoundingClientRect();
    const delta = sr.left - r.left - (r.width - sr.width) / 2;
    if (Math.abs(delta) < 2) return;
    rail.scrollBy({
      left: delta,
      behavior: reducedRef.current ? "auto" : "smooth",
    });
  }, [selected]);

  /* ── Keyboard: arrows / Home / End on the client rail ─────────────────── */
  const onRailKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const fwd = rtl ? "ArrowLeft" : "ArrowRight";
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    let next: number | null = null;
    if (e.key === fwd || e.key === "ArrowDown") next = selected + 1;
    else if (e.key === back || e.key === "ArrowUp") next = selected - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next === null) return;
    e.preventDefault();
    select(next);
    const target = ((next % count) + count) % count;
    rootRef.current
      ?.querySelectorAll<HTMLButtonElement>("[data-rail-item]")
      [target]?.focus();
  };

  /* ── Touch: swipe on the stage ────────────────────────────────────────── */
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const forward = rtl ? dx > 0 : dx < 0;
    select(selected + (forward ? 1 : -1));
  };

  const current = items[selected] ?? items[0];
  const barOrigin = rtl ? "100% 50%" : "0% 50%";

  const navBtn: CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: `1px solid ${C.outlineVariant}`,
    backgroundColor: C.surfaceLow,
    color: C.onSurface,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
  };

  return (
    <div ref={trackRef} className="tst-track">
      <div ref={rootRef} className="tst-root">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.25rem 2rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ maxWidth: "42rem" }}>
            <span
              data-head
              style={{
                ...mono,
                color: C.primary,
                display: "block",
                marginBottom: "8px",
              }}
            >
              {heading.label}
            </span>
            <h2
              data-head
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: "1.2",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: C.onSurface,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {heading.title}
            </h2>
            <p
              data-head
              style={{
                color: C.onSurfaceVariant,
                fontSize: "15px",
                lineHeight: "24px",
                margin: "0.75rem 0 0",
              }}
            >
              {heading.subtitle}
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span
              data-head
              style={{
                ...mono,
                color: C.outline,
                fontVariantNumeric: "tabular-nums",
                direction: "ltr",
                unicodeBidi: "isolate",
              }}
            >
              {current.id} / {total}
            </span>
            <button
              type="button"
              data-nav
              aria-label={labels.prev}
              onClick={() => select(selected - 1)}
              style={navBtn}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                {rtl ? "arrow_forward" : "arrow_back"}
              </span>
            </button>
            <button
              type="button"
              data-nav
              aria-label={labels.next}
              onClick={() => select(selected + 1)}
              style={navBtn}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                {rtl ? "arrow_back" : "arrow_forward"}
              </span>
            </button>
          </div>
        </div>

        <div className="tst-grid">
          {/* ── Stage: the featured quote ───────────────────────────────── */}
          <div
            data-stage
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              position: "relative",
              borderRadius: "1.5rem",
              backgroundColor: C.surfaceLowest,
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 30px 80px -40px rgba(0,0,0,0.9)",
              padding: "clamp(1.5rem, 4vw, 3rem)",
              overflow: "hidden",
              minHeight: 360,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {items.map((it, i) => (
              <div
                key={it.id}
                data-aura
                aria-hidden
                style={{
                  position: "absolute",
                  top: -220,
                  insetInlineEnd: -160,
                  width: 560,
                  height: 560,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${hexA(it.accent, 0.18)} 0%, ${hexA(it.accent, 0)} 68%)`,
                  opacity: i === 0 ? 1 : 0,
                  pointerEvents: "none",
                }}
              />
            ))}
            <div
              data-spot
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(640px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.05), transparent 45%)",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            <span
              data-glyph
              aria-hidden
              style={{
                position: "absolute",
                top: "-0.08em",
                insetInlineEnd: "1.5rem",
                fontFamily: "var(--font-outfit)",
                fontSize: "clamp(160px, 22vw, 280px)",
                fontWeight: 800,
                lineHeight: 1,
                color: hexA(current.accent, 0.14),
                transition: "color 0.6s ease",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              ”
            </span>

            <div style={{ display: "grid", position: "relative", flex: 1 }}>
              {items.map((it, i) => {
                const { tokens, joiner } = splitWords(stripQuotes(it.quote));
                const { title, company } = splitRole(it.role);
                return (
                  <div
                    key={it.id}
                    data-slide
                    aria-hidden={i !== active}
                    style={{
                      gridArea: "1 / 1",
                      visibility: i === active ? "visible" : "hidden",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{ display: "flex", gap: "3px" }}
                        role="img"
                        aria-label="5 / 5"
                      >
                        {[...Array(5)].map((_, s) => (
                          <span
                            key={s}
                            data-star
                            className="material-symbols-outlined"
                            style={{
                              color: it.accent,
                              fontSize: "20px",
                              fontVariationSettings: "'FILL' 1",
                              display: "inline-block",
                            }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span
                        data-meta
                        style={{
                          ...mono,
                          color: C.outline,
                          letterSpacing: "0.14em",
                        }}
                      >
                        {company || title}
                      </span>
                    </div>

                    <blockquote
                      className="tst-quote"
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: "clamp(19px, 1.1rem + 0.9vw, 26px)",
                        lineHeight: 1.4,
                        fontWeight: 500,
                        letterSpacing: "-0.012em",
                        color: C.onSurface,
                        maxWidth: "46ch",
                      }}
                    >
                      {tokens.map((w, wi) => (
                        <Fragment key={wi}>
                          <span
                            data-word
                            style={{
                              display: "inline-block",
                              willChange: "transform, opacity",
                            }}
                          >
                            {w}
                          </span>
                          {wi < tokens.length - 1 ? joiner : ""}
                        </Fragment>
                      ))}
                    </blockquote>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem 1.5rem",
                        paddingTop: "1.25rem",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        marginTop: "auto",
                      }}
                    >
                      <div
                        data-meta
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.875rem",
                          minWidth: 0,
                        }}
                      >
                        <Avatar item={it} size={52} />
                        <div style={{ minWidth: 0 }}>
                          <span
                            style={{
                              color: C.onSurface,
                              fontSize: "18px",
                              fontFamily: "var(--font-outfit)",
                              fontWeight: 600,
                              display: "block",
                              lineHeight: 1.2,
                            }}
                          >
                            {it.name}
                          </span>
                          <span
                            style={{
                              ...mono,
                              color: C.outline,
                              display: "block",
                              marginTop: "4px",
                            }}
                          >
                            {it.role}
                          </span>
                        </div>
                      </div>
                      <div
                        data-meta
                        style={{
                          marginInlineStart: "auto",
                          display: "inline-flex",
                          alignItems: "baseline",
                          gap: "0.5rem",
                          padding: "8px 14px",
                          borderRadius: "12px",
                          backgroundColor: C.surfaceLow,
                          border: `1px solid ${hexA(it.accent, 0.28)}`,
                        }}
                      >
                        <span
                          style={{
                            color: it.accent,
                            fontSize: "20px",
                            fontFamily: "var(--font-outfit)",
                            fontWeight: 700,
                            lineHeight: 1,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {it.stat.value}
                        </span>
                        <span style={{ ...mono, color: C.outline }}>
                          {it.stat.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Rail: every client; the bar under each fills as you scroll through it ── */}
          <div
            className="tst-rail"
            role="tablist"
            aria-orientation="vertical"
            aria-label={heading.title}
            onKeyDown={onRailKey}
          >
            {items.map((it, i) => {
              const { title, company } = splitRole(it.role);
              const isSel = i === selected;
              return (
                <div key={it.id} data-rail-slot className="tst-rail-slot">
                  <button
                    type="button"
                    role="tab"
                    data-rail-item
                    data-active={isSel ? "true" : "false"}
                    aria-selected={isSel}
                    tabIndex={isSel ? 0 : -1}
                    onClick={() => select(i)}
                    className="tst-rail-item"
                    style={{ "--accent": it.accent } as CSSProperties}
                  >
                    <Avatar item={it} size={40} />
                    <span
                      style={{
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      <span
                        style={{
                          color: C.onSurface,
                          fontSize: "14px",
                          fontFamily: "var(--font-outfit)",
                          fontWeight: 600,
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {it.name}
                      </span>
                      <span
                        style={{
                          ...mono,
                          color: isSel ? it.accent : C.outline,
                          transition: "color 0.35s ease",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {company || title}
                      </span>
                    </span>
                    <span
                      className="material-symbols-outlined tst-rail-arrow"
                      aria-hidden
                      style={{ fontSize: "18px", color: it.accent }}
                    >
                      {rtl ? "arrow_back" : "arrow_forward"}
                    </span>
                    <span
                      data-bar
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 2,
                        backgroundColor: it.accent,
                        transform: "scaleX(0)",
                        transformOrigin: barOrigin,
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
