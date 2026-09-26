"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

export type HubNode = {
  id: string;
  /** e.g. "HEADQUARTERS" */
  badge: string;
  /** e.g. "KUWAIT CITY // SHARQ" */
  city: string;
  /** Hex accent */
  accent: string;
  /** IANA time zone, e.g. "Asia/Kuwait" */
  timeZone: string;
  /** Short offset label, e.g. "GMT+3" */
  offset: string;
};

/* ── Shared bits ─────────────────────────────────────────────────────────── */
const mono: CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: "10px",
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

/* ── Geometry of the 3D floor plane ──────────────────────────────────────── */
const TILT = 58; // deg: the floor is viewed from above
const VB_W = 1000;
const VB_H = 360;
const NODE_X = [25, 75]; // % of the plane width
const NODE_Y = 50; // % of the plane height
// A great-circle style arc between the two nodes (bulges toward the far edge)
const ARC = `M${VB_W * 0.25},${VB_H * 0.5} C${VB_W * 0.4},${VB_H * 0.1} ${VB_W * 0.6},${VB_H * 0.1} ${VB_W * 0.75},${VB_H * 0.5}`;
const APEX = { x: 50, y: 20 }; // % — the arc's midpoint

/* ═══════════════════════════════════════════════════════════════════════════
   HubBridge — a tilted 3D "map table" linking the two hubs. Data packets
   travel along the arc, each node has a pulsing beacon and a floating label
   with that city's live local time. The table tilts/yaws with the pointer.
   ═══════════════════════════════════════════════════════════════════════════ */
export function HubBridge({
  hubs,
  apexLabel,
  liveLabel = "LIVE",
  rtl = false,
}: {
  hubs: [HubNode, HubNode];
  /** Floating chip shown at the arc's apex, e.g. "OVERLAP: 6.5 HRS/DAY" */
  apexLabel: string;
  liveLabel?: string;
  /** Mirrors the arc's colour/flow direction to match the mirrored node positions */
  rtl?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const flowRef = useRef<SVGPathElement>(null);
  const packetRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [times, setTimes] = useState<string[] | null>(null);
  const [compact, setCompact] = useState(false);

  /* Phone layout: shorter pins, two-line labels, no apex chip */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Live clocks */
  const tzKey = hubs.map((h) => h.timeZone).join("|");
  useEffect(() => {
    const zones = tzKey.split("|");
    const formatters = zones.map(
      (timeZone) =>
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
    );
    const tick = () => {
      const now = new Date();
      setTimes(formatters.map((f) => f.format(now)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tzKey]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const plane = planeRef.current;
      const path = pathRef.current;
      const flow = flowRef.current;
      if (!root || !plane || !path || !flow) return;

      const pinSpaces = gsap.utils.toArray<HTMLElement>("[data-pin-space]", root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(pointer: fine)",
        },
        (ctx) => {
          const { motion, fine } = ctx.conditions as {
            motion: boolean;
            fine: boolean;
          };
          if (!motion) return;

          /* The plane's transform is composed by hand so the yaw happens
             around the table's own normal (rotateX first, then rotateZ). */
          const s = { tilt: TILT + 28, yaw: 0, y: 70 };
          const apply = () => {
            plane.style.transform = `translate(-50%,-50%) translate3d(0,${s.y.toFixed(2)}px,0) rotateX(${s.tilt.toFixed(3)}deg) rotateZ(${s.yaw.toFixed(3)}deg)`;
            // Billboards: undo the table's rotation so labels face the camera.
            const counter = `rotateZ(${(-s.yaw).toFixed(3)}deg) rotateX(${(-s.tilt).toFixed(3)}deg)`;
            for (const pin of pinSpaces) pin.style.transform = counter;
          };
          apply();
          gsap.set(plane, { opacity: 0 });

          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.set(flow, { opacity: 0 });

          let armed = false;
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
            onComplete: () => {
              armed = true;
            },
          });
          const dots = gsap.utils.toArray<HTMLElement>("[data-node-dot]", root);
          const pins = gsap.utils.toArray<HTMLElement>("[data-pin]", root);
          const chips = gsap.utils.toArray<HTMLElement>("[data-chip]", root);
          gsap.set(dots, { scale: 0 });
          gsap.set(pins, { scaleY: 0, transformOrigin: "50% 100%" });
          gsap.set(chips, { y: 12, opacity: 0 });

          tl.to(s, { tilt: TILT, y: 0, duration: 1.7, ease: "power3.out", onUpdate: apply }, 0)
            .to(plane, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0)
            .to(dots, { scale: 1, duration: 0.7, ease: "back.out(2.2)", stagger: 0.18 }, 0.55)
            .to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 0.7)
            .to(pins, { scaleY: 1, duration: 0.8, ease: "power3.out", stagger: 0.18 }, 1.0)
            .to(chips, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.18 }, 1.35)
            .to(flow, { opacity: 0.75, duration: 0.8 }, 2.0);

          /* Data packets travelling along the arc, one each way */
          packetRefs.current.forEach((packet, i) => {
            if (!packet) return;
            gsap.set(packet, { opacity: 0 });
            gsap
              .timeline({ repeat: -1, delay: 2.2 + i * 2.6 })
              .to(packet, { opacity: 1, duration: 0.35 }, 0)
              .to(
                packet,
                {
                  motionPath: {
                    path: ARC,
                    start: (i === 0) !== rtl ? 0 : 1,
                    end: (i === 0) !== rtl ? 1 : 0,
                  },
                  duration: 5.2,
                  ease: "sine.inOut",
                },
                0,
              )
              .to(packet, { opacity: 0, duration: 0.35 }, 4.85)
              .to({}, { duration: 1.2 });
          });

          /* Beacon glow breathing */
          gsap.to("[data-node-glow]", {
            scale: 1.25,
            opacity: 0.55,
            duration: 2.4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            stagger: { each: 0.6 },
          });

          /* Pointer parallax: tilt + yaw the table */
          if (fine) {
            const tiltTo = gsap.quickTo(s, "tilt", { duration: 1, ease: "power3.out", onUpdate: apply });
            const yawTo = gsap.quickTo(s, "yaw", { duration: 1, ease: "power3.out", onUpdate: apply });
            const onMove = (e: PointerEvent) => {
              if (!armed) return;
              const r = root.getBoundingClientRect();
              const nx = (e.clientX - r.left) / r.width - 0.5;
              const ny = (e.clientY - r.top) / r.height - 0.5;
              tiltTo(TILT + ny * 7);
              yawTo(nx * 6);
            };
            const onLeave = () => {
              if (!armed) return;
              tiltTo(TILT);
              yawTo(0);
            };
            root.addEventListener("pointermove", onMove);
            root.addEventListener("pointerleave", onLeave);
            return () => {
              root.removeEventListener("pointermove", onMove);
              root.removeEventListener("pointerleave", onLeave);
            };
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [tzKey, apexLabel, compact, rtl], revertOnUpdate: true },
  );

  const chip: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: compact ? "6px 9px" : "8px 12px",
    borderRadius: 12,
    backgroundColor: "rgba(14,14,18,0.82)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 40px -18px rgba(0,0,0,0.9)",
    whiteSpace: "nowrap",
  };

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: "relative",
        height: compact ? 300 : "clamp(320px, 30vw, 400px)",
        perspective: 1300,
        perspectiveOrigin: "50% 30%",
        overflow: "hidden",
      }}
    >
      {/* soft haze under the table */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "64%",
          width: "72%",
          height: "52%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.16) 0%, rgba(139,92,246,0.04) 45%, rgba(139,92,246,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* The table */}
      <div
        ref={planeRef}
        style={{
          position: "absolute",
          left: "50%",
          top: compact ? "64%" : "60%",
          width: "min(100%, 1100px)",
          aspectRatio: `${VB_W} / ${VB_H}`,
          transform: `translate(-50%,-50%) rotateX(${TILT}deg)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* grid floor */}
        <div
          style={{
            position: "absolute",
            inset: "-12% -6%",
            backgroundImage:
              "linear-gradient(rgba(208,188,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(208,188,255,0.13) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            backgroundPosition: "center",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, #000 30%, rgba(0,0,0,0.5) 55%, transparent 76%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, #000 30%, rgba(0,0,0,0.5) 55%, transparent 76%)",
          }}
        />
        {/* dashed straight route on the floor */}
        <div
          style={{
            position: "absolute",
            left: `${NODE_X[0]}%`,
            right: `${100 - NODE_X[1]}%`,
            top: `${NODE_Y}%`,
            height: 0,
            borderTop: "1px dashed rgba(208,188,255,0.22)",
          }}
        />

        {/* arc + packets */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="hub-arc-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={rtl ? hubs[1].accent : hubs[0].accent} />
              <stop offset="100%" stopColor={rtl ? hubs[0].accent : hubs[1].accent} />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={ARC}
            fill="none"
            stroke="url(#hub-arc-grad)"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.85}
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={flowRef}
            d={ARC}
            fill="none"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            className="hub-flow"
            style={{ animationDirection: rtl ? "reverse" : "normal" }}
            vectorEffect="non-scaling-stroke"
          />
          {hubs.map((hub, i) => (
            <circle
              key={hub.id}
              ref={(el) => {
                packetRefs.current[i] = el;
              }}
              r={5}
              cx={0}
              cy={0}
              fill={hub.accent}
              style={{ filter: `drop-shadow(0 0 6px ${hub.accent})` }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {hubs.map((hub, i) => (
          <div
            key={hub.id}
            style={{
              position: "absolute",
              insetInlineStart: `${NODE_X[i]}%`,
              top: `${NODE_Y}%`,
              width: 0,
              height: 0,
              transformStyle: "preserve-3d",
            }}
          >
            {/* floor glow */}
            <div
              data-node-glow
              style={{
                position: "absolute",
                left: -70,
                top: -70,
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${hexA(hub.accent, 0.35)} 0%, ${hexA(hub.accent, 0)} 65%)`,
                opacity: 0.9,
              }}
            />
            {/* pulse rings */}
            {[0, 1].map((k) => (
              <div
                key={k}
                className="hub-ping"
                style={{
                  position: "absolute",
                  left: -9,
                  top: -9,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `1px solid ${hexA(hub.accent, 0.8)}`,
                  animationDelay: `${k * 1.3}s`,
                }}
              />
            ))}
            {/* beacon */}
            <div
              data-node-dot
              style={{
                position: "absolute",
                left: -7,
                top: -7,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${hub.accent} 45%, ${hexA(hub.accent, 0.6)} 100%)`,
                boxShadow: `0 0 18px 4px ${hexA(hub.accent, 0.55)}`,
              }}
            />
            {/* billboard: pin + floating label */}
            <div
              data-pin-space
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: 0,
                height: compact ? 58 : "clamp(80px, 8vw, 104px)",
                transformOrigin: "50% 100%",
                transform: `rotateX(${-TILT}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                data-pin
                style={{
                  position: "absolute",
                  left: -0.5,
                  bottom: 0,
                  width: 1,
                  height: "100%",
                  background: `linear-gradient(to top, ${hub.accent}, ${hexA(hub.accent, 0)})`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "100%",
                  width: 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div data-chip style={chip}>
                  <span
                    style={{
                      ...mono,
                      color: hub.accent,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: hub.accent,
                        boxShadow: `0 0 8px ${hub.accent}`,
                      }}
                    />
                    {hub.badge}
                  </span>
                  <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-outfit)",
                        fontSize: compact ? 15 : 18,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: "#e4e1e8",
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1,
                      }}
                    >
                      {times ? times[i] : "--:--:--"}
                    </span>
                    <span style={{ ...mono, color: "#958ea0", letterSpacing: "0.06em" }}>
                      {hub.offset}
                    </span>
                  </span>
                  {!compact && (
                    <span style={{ ...mono, color: "rgba(203,195,215,0.6)", letterSpacing: "0.06em", fontSize: 9 }}>
                      {hub.city}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Apex chip: the overlap */}
        <div
          style={{
            position: "absolute",
            left: `${APEX.x}%`,
            top: `${APEX.y}%`,
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            display: compact ? "none" : "block",
          }}
        >
          <div
            data-pin-space
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: 0,
              height: 26,
              transformOrigin: "50% 100%",
              transform: `rotateX(${-TILT}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              data-pin
              style={{
                position: "absolute",
                left: -0.5,
                bottom: 0,
                width: 1,
                height: "100%",
                background: "linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0))",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: "100%",
                width: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                data-chip
                style={{
                  ...chip,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 10px",
                  borderColor: "rgba(208,188,255,0.28)",
                }}
              >
                <span
                  style={{
                    ...mono,
                    fontSize: 9,
                    padding: "2px 6px",
                    borderRadius: 6,
                    backgroundColor: "rgba(94,223,129,0.14)",
                    color: "#5edf81",
                  }}
                >
                  {liveLabel}
                </span>
                <span style={{ ...mono, color: "#e4e1e8", letterSpacing: "0.08em" }}>
                  {apexLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OverlapBand — a 24h UTC strip showing each hub's working window and the
   shared overlap, with a live "now" marker.
   ═══════════════════════════════════════════════════════════════════════════ */
export function OverlapBand({
  windows,
  caption,
  nowLabel = "NOW",
}: {
  windows: { code: string; accent: string; startUtc: number; endUtc: number }[];
  caption: string;
  nowLabel?: string;
}) {
  const [nowUtc, setNowUtc] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNowUtc(d.getUTCHours() + d.getUTCMinutes() / 60);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const start = Math.max(...windows.map((w) => w.startUtc));
  const end = Math.min(...windows.map((w) => w.endUtc));
  const overlap = Math.max(0, end - start);
  const pct = (h: number) => `${(h / 24) * 100}%`;

  return (
    <div
      data-overlap
      style={{
        borderRadius: 16,
        backgroundColor: "#1b1b20",
        border: "1px solid rgba(255,255,255,0.05)",
        padding: "16px 18px 14px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <span style={{ ...mono, color: "#958ea0" }}>{caption}</span>
        <span
          style={{
            ...mono,
            color: "#5edf81",
            padding: "3px 8px",
            borderRadius: 9999,
            backgroundColor: "rgba(94,223,129,0.12)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {overlap % 1 === 0 ? overlap : overlap.toFixed(1)}H
        </span>
      </div>

      <div style={{ position: "relative", height: 52 }}>
        {/* hour ticks */}
        {Array.from({ length: 25 }, (_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: pct(i),
              top: i % 6 === 0 ? 0 : "auto",
              bottom: 0,
              width: 1,
              height: i % 6 === 0 ? "100%" : 6,
              backgroundColor: i % 6 === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
            }}
          />
        ))}
        {/* shared window */}
        {overlap > 0 && (
          <div
            style={{
              position: "absolute",
              left: pct(start),
              width: pct(overlap),
              top: 0,
              bottom: 0,
              backgroundColor: "rgba(208,188,255,0.08)",
              borderLeft: "1px dashed rgba(208,188,255,0.45)",
              borderRight: "1px dashed rgba(208,188,255,0.45)",
            }}
          />
        )}
        {/* working windows */}
        {windows.map((w, i) => (
          <div
            key={w.code}
            style={{
              position: "absolute",
              left: pct(w.startUtc),
              width: pct(w.endUtc - w.startUtc),
              top: 9 + i * 18,
              height: 12,
              borderRadius: 6,
              background: `linear-gradient(90deg, ${hexA(w.accent, 0.95)}, ${hexA(w.accent, 0.65)})`,
              boxShadow: `0 0 14px -2px ${hexA(w.accent, 0.6)}`,
              display: "flex",
              alignItems: "center",
              paddingInline: 6,
            }}
          >
            <span style={{ ...mono, fontSize: 8, color: "#0e0e12", letterSpacing: "0.12em" }}>
              {w.code}
            </span>
          </div>
        ))}
        {/* now marker */}
        {nowUtc !== null && (
          <div
            style={{
              position: "absolute",
              left: pct(nowUtc),
              top: -6,
              bottom: -6,
              width: 1,
              backgroundColor: "#e4e1e8",
              boxShadow: "0 0 8px rgba(255,255,255,0.6)",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: -14,
                left: "50%",
                transform: "translateX(-50%)",
                ...mono,
                fontSize: 8,
                color: "#e4e1e8",
              }}
            >
              {nowLabel}
            </span>
          </div>
        )}
      </div>

      <div style={{ position: "relative", height: 14, marginTop: 8 }}>
        {[0, 6, 12, 18, 24].map((h) => (
          <span
            key={h}
            style={{
              position: "absolute",
              left: pct(h),
              transform: h === 0 ? "none" : h === 24 ? "translateX(-100%)" : "translateX(-50%)",
              ...mono,
              fontSize: 9,
              color: "#958ea0",
            }}
          >
            {String(h).padStart(2, "0")}
            {h === 24 ? " UTC" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
