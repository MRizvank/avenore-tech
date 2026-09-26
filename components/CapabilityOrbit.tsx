"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Observer, useGSAP);

export type OrbitItem = {
  id: string;
  /** Material Symbols icon name */
  icon: string;
  title: string;
  desc: string;
  badge?: string;
  /** Hex accent colour, e.g. "#8b5cf6" */
  accent: string;
};

type Props = {
  items: OrbitItem[];
  prevLabel: string;
  nextLabel: string;
  hint: string;
};

/* ── Tuning ──────────────────────────────────────────────────────────────── */
const MOUSE_TILT_X = 5; // extra tilt driven by cursor (deg)
const MOUSE_TILT_Y = 9;
const CARD_FOLLOW = 0.45; // 0 = cards always face the camera, 1 = rigidly welded to the ring
const TWIST = 22; // side cards angle inward by up to this many degrees
const AUTO_SPEED = 360 / (58 * 60); // deg per frame @ 60 fps  → one lap ≈ 58 s
const DRAG_GAIN = 0.3; // deg per dragged px
const FRICTION = 0.92; // per-frame velocity decay
const SCROLL_GAIN = 14; // spin impulse from page scroll
const IDLE_RESUME_MS = 5000; // auto-orbit resumes this long after the last interaction

type Geometry = {
  cardW: number;
  radius: number;
  perspective: number;
  stageH: number;
  /** camera elevation: negative rotateX = looking down onto the orbit */
  tilt: number;
  /** vertical offset of the orbit's origin inside the stage */
  ringY: number;
  /** how far the core floats above the orbit plane */
  coreY: number;
  compact: boolean;
};

const DEFAULT_GEOMETRY: Geometry = {
  cardW: 352,
  radius: 330,
  perspective: 1600,
  stageH: 640,
  tilt: -27,
  ringY: -56,
  coreY: -78,
  compact: false,
};

function computeGeometry(w: number): Geometry {
  if (w < 640) {
    const cardW = Math.round(Math.min(300, Math.max(232, w * 0.74)));
    return {
      cardW,
      radius: Math.round(cardW * 0.72),
      perspective: 1100,
      stageH: 440,
      tilt: -19,
      ringY: -44,
      coreY: -60,
      compact: true,
    };
  }
  if (w < 1024) {
    return {
      cardW: 304,
      radius: 250,
      perspective: 1450,
      stageH: 600,
      tilt: -24,
      ringY: -48,
      coreY: -70,
      compact: false,
    };
  }
  return {
    cardW: 352,
    radius: Math.round(Math.min(340, Math.max(280, w * 0.27))),
    perspective: 1600,
    stageH: 640,
    tilt: -27,
    ringY: -56,
    coreY: -78,
    compact: false,
  };
}

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
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

const GYRO_RINGS = [
  { size: 150, tilt: "rotateX(74deg) rotateZ(12deg)", color: "rgba(139,92,246,0.42)", dot: "#c4b5fd", duration: 11, dir: 1 },
  { size: 204, tilt: "rotateX(62deg) rotateY(52deg)", color: "rgba(94,223,129,0.30)", dot: "#5edf81", duration: 17, dir: -1 },
  { size: 262, tilt: "rotateX(80deg) rotateY(-38deg)", color: "rgba(208,188,255,0.20)", dot: "#e9ddff", duration: 26, dir: 1 },
];

type OrbitState = {
  rot: number;
  vel: number;
  intro: number;
  tiltX: number;
  tiltY: number;
  targetTiltX: number;
  targetTiltY: number;
  lift: number[];
  liftTarget: number[];
  hover: boolean;
  dragging: boolean;
  moved: boolean;
  snapping: boolean;
  paused: boolean;
  visible: boolean;
  reduced: boolean;
  front: number;
};

export default function CapabilityOrbit({
  items,
  prevLabel,
  nextLabel,
  hint,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const coreFaceRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geomRef = useRef<Geometry>(DEFAULT_GEOMETRY);
  const trackYRef = useRef(176);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [geom, setGeom] = useState<Geometry>(DEFAULT_GEOMETRY);
  const [trackY, setTrackY] = useState(176);
  const [front, setFront] = useState(0);

  const count = items.length;
  const step = 360 / count;

  const state = useRef<OrbitState>({
    rot: 0,
    vel: 0,
    intro: 0,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    lift: items.map(() => 0),
    liftTarget: items.map(() => 0),
    hover: false,
    dragging: false,
    moved: false,
    snapping: false,
    paused: false,
    visible: false,
    reduced: false,
    front: -1,
  });

  /* ── Interaction helpers (all ref-based, safe to capture once) ────────── */
  const schedulePause = useCallback(() => {
    const s = state.current;
    s.paused = true;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      s.paused = false;
    }, IDLE_RESUME_MS);
  }, []);

  const nearestSnap = useCallback(
    (rot: number) => Math.round(rot / step) * step,
    [step],
  );

  const snapTo = useCallback(
    (target: number, duration = 0.9, ease = "power3.out") => {
      const s = state.current;
      s.vel = 0;
      s.snapping = true;
      gsap.killTweensOf(s, "rot");
      gsap.to(s, {
        rot: target,
        duration: s.reduced ? 0.01 : duration,
        ease,
        overwrite: "auto",
        onComplete: () => {
          s.snapping = false;
        },
      });
      schedulePause();
    },
    [schedulePause],
  );

  const goTo = useCallback(
    (index: number) => {
      const s = state.current;
      const want = -index * step;
      const laps = Math.round((s.rot - want) / 360);
      snapTo(want + laps * 360, 1.1, "power3.inOut");
    },
    [snapTo, step],
  );

  const stepBy = useCallback(
    (dir: 1 | -1) => {
      const s = state.current;
      const base = s.snapping ? nearestSnap(s.rot) : nearestSnap(s.rot);
      snapTo(base - dir * step);
    },
    [nearestSnap, snapTo, step],
  );

  /* ── Geometry: follow the container width ─────────────────────────────── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const apply = () => {
      const next = computeGeometry(root.clientWidth || window.innerWidth);
      geomRef.current = next;
      setGeom((prev) =>
        prev.cardW === next.cardW &&
        prev.radius === next.radius &&
        prev.perspective === next.perspective &&
        prev.stageH === next.stageH &&
        prev.compact === next.compact
          ? prev
          : next,
      );
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  // Once the cards have their width, measure the tallest one so the orbit
  // track sits just under them.
  useLayoutEffect(() => {
    const tallest = cardRefs.current.reduce(
      (max, el) => Math.max(max, el?.offsetHeight ?? 0),
      0,
    );
    if (!tallest) return;
    const y = Math.round(tallest / 2 + (geom.compact ? 18 : 24));
    trackYRef.current = y;
    setTrackY(y);
  }, [geom, items]);

  /* ── Accent glow cross-fade when the front card changes ───────────────── */
  useEffect(() => {
    glowRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === front ? 1 : 0,
        duration: 1.2,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, [front]);

  /* ── The 3D engine ────────────────────────────────────────────────────── */
  useGSAP(
    () => {
      const stage = stageRef.current;
      const ring = ringRef.current;
      const root = rootRef.current;
      if (!stage || !ring || !root) return;

      const s = state.current;
      s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (s.reduced) s.intro = 1;

      const veils = cardRefs.current.map(
        (c) => c?.querySelector<HTMLDivElement>("[data-veil]") ?? null,
      );
      const halos = cardRefs.current.map(
        (c) => c?.querySelector<HTMLDivElement>("[data-halo]") ?? null,
      );

      const render = () => {
        const g = geomRef.current;
        const introE = s.intro;
        const radius = g.radius * (0.35 + 0.65 * introE);
        const spin = s.rot + (1 - introE) * 150;
        const tiltX = g.tilt + s.tiltX;
        const tiltY = s.tiltY;
        const cardRx = -(g.tilt + s.tiltX * CARD_FOLLOW);
        const cardRy = -s.tiltY * CARD_FOLLOW;

        ring.style.transform = `translate3d(0,${g.ringY}px,0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

        const trackScale = radius / g.radius;
        const trackTf = `translate(-50%,-50%) translate3d(0,${trackYRef.current}px,0) rotateX(90deg) scale(${trackScale})`;
        if (trackRef.current) {
          trackRef.current.style.transform = trackTf;
          trackRef.current.style.opacity = String(introE);
        }
        if (floorRef.current) {
          floorRef.current.style.transform = trackTf;
          floorRef.current.style.opacity = String(introE);
        }
        if (coreRef.current) {
          const k = s.reduced ? 1 : gsap.parseEase("back.out(1.6)")(introE);
          coreRef.current.style.transform = `translate3d(0,${g.coreY * introE}px,0) scale(${Math.max(0.001, k)})`;
        }
        if (coreFaceRef.current) {
          // keep the sphere a perfect circle whatever the camera does
          coreFaceRef.current.style.transform = `rotateY(${-tiltY}deg) rotateX(${-tiltX}deg)`;
        }

        let best = -1;
        let bestDepth = -2;
        for (let i = 0; i < count; i++) {
          const card = cardRefs.current[i];
          if (!card) continue;
          const a = (((spin + i * step) % 360) + 360) % 360;
          const rad = (a * Math.PI) / 180;
          const depth = Math.cos(rad); // 1 = front, -1 = back
          const d01 = (depth + 1) / 2;
          const lift = s.lift[i];
          const x = Math.sin(rad) * radius;
          const z = Math.cos(rad) * radius + lift * 34;
          const y = -lift * 6;
          const twist = -Math.sin(rad) * TWIST;

          card.style.transform =
            `translate(-50%,-50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(2)}px) ` +
            `rotateY(${cardRy.toFixed(3)}deg) rotateX(${cardRx.toFixed(3)}deg) rotateY(${twist.toFixed(3)}deg)`;
          card.style.opacity = String(0.2 + 0.8 * introE);
          card.style.zIndex = String(100 + Math.round(d01 * 100));

          const veil = veils[i];
          if (veil) veil.style.opacity = String((1 - d01) * 0.62);
          const halo = halos[i];
          if (halo) halo.style.opacity = String(Math.max(0, (d01 - 0.72) / 0.28));

          if (depth > bestDepth) {
            bestDepth = depth;
            best = i;
          }
        }
        if (best !== s.front) {
          s.front = best;
          setFront(best);
        }
      };

      const tick = () => {
        if (!s.visible) return;
        const dt = gsap.ticker.deltaRatio(60);
        const idle =
          !s.dragging && !s.snapping && !s.paused && !s.hover && !s.reduced;
        if (idle) s.rot += AUTO_SPEED * dt;

        if (!s.dragging && !s.snapping && s.vel !== 0) {
          s.rot += s.vel * dt;
          s.vel *= Math.pow(FRICTION, dt);
          if (Math.abs(s.vel) < 0.002) {
            s.vel = 0;
            // Settled after a scroll/flick while the user is "looking": land on a card.
            if (s.paused || s.hover || s.reduced) {
              snapTo(nearestSnap(s.rot), 0.8);
            }
          }
        }

        const ease = 1 - Math.pow(0.88, dt);
        s.tiltX += (s.targetTiltX - s.tiltX) * ease;
        s.tiltY += (s.targetTiltY - s.tiltY) * ease;
        for (let i = 0; i < count; i++) {
          s.lift[i] += (s.liftTarget[i] - s.lift[i]) * ease;
        }
        render();
      };

      render();
      gsap.ticker.add(tick);

      /* Visibility gate: only animate while the section is on screen */
      const visibility = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          s.visible = self.isActive;
        },
      });

      /* Entrance: the orbit assembles once it scrolls into view */
      const intro = ScrollTrigger.create({
        trigger: stage,
        start: "top 82%",
        once: true,
        onEnter: () => {
          if (s.reduced) return;
          gsap.to(s, { intro: 1, duration: 1.7, ease: "power3.out" });
        },
      });

      /* Scroll impulse: scrolling past the section gives the wheel a spin */
      let lastProgress: number | null = null;
      const impulse = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (lastProgress === null) {
            lastProgress = self.progress;
            return;
          }
          const delta = self.progress - lastProgress;
          lastProgress = self.progress;
          if (s.reduced || s.snapping || s.dragging) return;
          s.vel = gsap.utils.clamp(-6, 6, s.vel + delta * SCROLL_GAIN);
        },
      });

      /* Drag / swipe */
      const observer = Observer.create({
        target: stage,
        type: "touch,pointer",
        dragMinimum: 4,
        lockAxis: true,
        preventDefault: false,
        onPress: () => {
          s.moved = false;
          gsap.killTweensOf(s, "rot");
          s.snapping = false;
        },
        onDragStart: () => {
          s.dragging = true;
          s.vel = 0;
          stage.style.cursor = "grabbing";
        },
        onDrag: (self) => {
          if (self.axis === "y") return;
          s.moved = true;
          s.rot += self.deltaX * DRAG_GAIN;
        },
        onDragEnd: (self) => {
          s.dragging = false;
          stage.style.cursor = "grab";
          if (!s.moved) return;
          const fling = gsap.utils.clamp(
            -step * 1.5,
            step * 1.5,
            self.velocityX * DRAG_GAIN * 0.12,
          );
          snapTo(nearestSnap(s.rot + fling));
        },
      });

      /* Cursor parallax */
      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || s.reduced) return;
        const r = stage.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        s.targetTiltY = -nx * MOUSE_TILT_Y * 2;
        s.targetTiltX = ny * MOUSE_TILT_X * 2;
      };
      const onPointerEnter = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        s.hover = true;
      };
      const onPointerLeave = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        s.hover = false;
        s.targetTiltX = 0;
        s.targetTiltY = 0;
      };
      stage.addEventListener("pointermove", onPointerMove);
      stage.addEventListener("pointerenter", onPointerEnter);
      stage.addEventListener("pointerleave", onPointerLeave);

      /* Core gyroscope */
      if (!s.reduced) {
        gsap.utils.toArray<HTMLElement>("[data-gyro]", root).forEach((el, i) => {
          const cfg = GYRO_RINGS[i % GYRO_RINGS.length];
          gsap.to(el, {
            rotate: 360 * cfg.dir,
            duration: cfg.duration,
            ease: "none",
            repeat: -1,
          });
        });
        gsap.to("[data-core-sphere]", {
          scale: 1.08,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      return () => {
        gsap.ticker.remove(tick);
        visibility.kill();
        intro.kill();
        impulse.kill();
        observer.kill();
        stage.removeEventListener("pointermove", onPointerMove);
        stage.removeEventListener("pointerenter", onPointerEnter);
        stage.removeEventListener("pointerleave", onPointerLeave);
        if (idleTimer.current) clearTimeout(idleTimer.current);
      };
    },
    { scope: rootRef },
  );

  /* ── Styles ───────────────────────────────────────────────────────────── */
  const mono: CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 600,
  };

  const navButton: CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: 9999,
    display: "grid",
    placeItems: "center",
    backgroundColor: "#1b1b20",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e4e1e8",
    cursor: "pointer",
    transition: "border-color .3s, background-color .3s, transform .3s",
  };

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      {/* Stage: the 3D viewport */}
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        data-cursor="grab"
        style={{
          position: "relative",
          height: geom.stageH,
          marginLeft: geom.compact ? "-1.25rem" : 0,
          marginRight: geom.compact ? "-1.25rem" : 0,
          perspective: geom.perspective,
          perspectiveOrigin: "50% 48%",
          overflow: "hidden",
          cursor: "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "pan-y",
        }}
      >
        {/* Accent glow (2D, behind the orbit) */}
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {items.map((it, i) => (
            <div
              key={it.id}
              ref={(el) => {
                glowRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "56%",
                width: geom.compact ? 420 : 720,
                height: geom.compact ? 300 : 440,
                transform: "translate(-50%,-50%)",
                background: `radial-gradient(ellipse at center, ${hexA(it.accent, 0.2)} 0%, ${hexA(it.accent, 0.06)} 38%, ${hexA(it.accent, 0)} 70%)`,
                opacity: i === 0 ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Ring: everything inside shares one 3D space */}
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `translate3d(0,${geom.ringY}px,0) rotateX(${geom.tilt}deg)`,
          }}
        >
          {/* Floor glow lying flat under the orbit */}
          <div
            ref={floorRef}
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: geom.radius * 2.6,
              height: geom.radius * 2.6,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.16) 0%, rgba(139,92,246,0.05) 40%, rgba(139,92,246,0) 68%)",
              transform: `translate(-50%,-50%) translate3d(0,${trackY}px,0) rotateX(90deg)`,
              pointerEvents: "none",
            }}
          />
          {/* Orbit track */}
          <div
            ref={trackRef}
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: geom.radius * 2,
              height: geom.radius * 2,
              borderRadius: "50%",
              border: "1px dashed rgba(208,188,255,0.28)",
              boxShadow:
                "0 0 0 24px rgba(139,92,246,0.04), inset 0 0 0 1px rgba(139,92,246,0.08)",
              transform: `translate(-50%,-50%) translate3d(0,${trackY}px,0) rotateX(90deg)`,
              pointerEvents: "none",
            }}
          />

          {/* Core: glowing sphere + gyroscope rings */}
          <div
            ref={coreRef}
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 0,
              height: 0,
              transformStyle: "preserve-3d",
              pointerEvents: "none",
            }}
          >
            <div
              ref={coreFaceRef}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                transform: `rotateX(${-geom.tilt}deg)`,
              }}
            >
              <div
                data-core-sphere
                style={{
                  position: "absolute",
                  left: -36,
                  top: -36,
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 34% 30%, #e9ddff 0%, #a78bfa 30%, #8b5cf6 52%, #2b1461 100%)",
                  boxShadow:
                    "0 0 42px 8px rgba(139,92,246,0.42), 0 0 120px 36px rgba(139,92,246,0.14)",
                }}
              />
            </div>
            {GYRO_RINGS.map((r, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: -r.size / 2,
                  top: -r.size / 2,
                  width: r.size,
                  height: r.size,
                  transform: r.tilt,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  data-gyro
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `1px solid ${r.color}`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: -3,
                      width: 6,
                      height: 6,
                      marginLeft: -3,
                      borderRadius: "50%",
                      background: r.dot,
                      boxShadow: `0 0 10px 2px ${r.dot}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Capability cards */}
          {items.map((it, i) => (
            <div
              key={it.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              onClick={() => {
                if (!state.current.moved) goTo(i);
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") state.current.liftTarget[i] = 1;
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") state.current.liftTarget[i] = 0;
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: geom.cardW,
                minHeight: geom.compact ? 236 : 268,
                padding: geom.compact ? "22px 22px 26px" : "28px 28px 32px",
                borderRadius: 24,
                background:
                  "linear-gradient(160deg, rgba(31,31,36,0.97) 0%, rgba(14,14,18,0.99) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow:
                  "0 40px 80px -36px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)",
                overflow: "hidden",
                transform: "translate(-50%,-50%)",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                textAlign: "start",
              }}
            >
              {/* accent aura */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -110,
                  right: -70,
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${hexA(it.accent, 0.22)} 0%, ${hexA(it.accent, 0)} 68%)`,
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: geom.compact ? 18 : 24,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: hexA(it.accent, 0.12),
                    border: `1px solid ${hexA(it.accent, 0.3)}`,
                    boxShadow: `0 0 28px -6px ${hexA(it.accent, 0.55)}`,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 26, color: it.accent }}
                  >
                    {it.icon}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  <span style={{ ...mono, color: "rgba(203,195,215,0.55)" }}>
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(count).padStart(2, "0")}
                  </span>
                  {it.badge && (
                    <span
                      style={{
                        ...mono,
                        padding: "4px 10px",
                        borderRadius: 9999,
                        backgroundColor: hexA(it.accent, 0.12),
                        color: it.accent,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {it.badge}
                    </span>
                  )}
                </div>
              </div>

              <h3
                style={{
                  position: "relative",
                  fontFamily: "var(--font-outfit)",
                  fontSize: geom.compact ? 21 : 25,
                  lineHeight: 1.15,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#e4e1e8",
                  margin: "0 0 10px",
                }}
              >
                {it.title}
              </h3>
              <p
                style={{
                  position: "relative",
                  color: "#cbc3d7",
                  fontSize: geom.compact ? 13 : 14,
                  lineHeight: geom.compact ? "20px" : "22px",
                  margin: 0,
                }}
              >
                {it.desc}
              </p>

              {/* accent underline */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: geom.compact ? 22 : 28,
                  right: geom.compact ? 22 : 28,
                  bottom: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${it.accent}, ${hexA(it.accent, 0)})`,
                  opacity: 0.8,
                }}
              />
              {/* depth veil: darkens cards as they travel to the back */}
              <div
                data-veil
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#0f0f13",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              {/* halo: lights up on the front card */}
              <div
                data-halo
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 24,
                  boxShadow: `inset 0 0 0 1px ${hexA(it.accent, 0.55)}, inset 0 0 60px -30px ${hexA(it.accent, 0.5)}`,
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div
        dir="ltr"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginTop: geom.compact ? 4 : 8,
        }}
      >
        <span
          style={{
            ...mono,
            color: "rgba(203,195,215,0.5)",
            display: geom.compact ? "none" : "flex",
            alignItems: "center",
            gap: 8,
            minWidth: 0,
          }}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden
            style={{ fontSize: 16, color: "#8b5cf6" }}
          >
            drag_pan
          </span>
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {hint}
          </span>
        </span>

        <div
          role="tablist"
          aria-label={hint}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-label={it.title}
              aria-selected={front === i}
              onClick={() => goTo(i)}
              style={{
                width: front === i ? 28 : 8,
                height: 8,
                padding: 0,
                border: 0,
                borderRadius: 9999,
                backgroundColor:
                  front === i ? it.accent : "rgba(255,255,255,0.18)",
                boxShadow: front === i ? `0 0 12px ${hexA(it.accent, 0.6)}` : "none",
                cursor: "pointer",
                transition:
                  "width .45s cubic-bezier(.2,.8,.2,1), background-color .3s, box-shadow .3s",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => stepBy(-1)}
            style={navButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#8b5cf6";
              e.currentTarget.style.backgroundColor = "#2a292e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.backgroundColor = "#1b1b20";
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              chevron_left
            </span>
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => stepBy(1)}
            style={navButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#8b5cf6";
              e.currentTarget.style.backgroundColor = "#2a292e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.backgroundColor = "#1b1b20";
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
