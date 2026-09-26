"use client";

import {
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = Omit<HTMLAttributes<HTMLDivElement>, "style"> & {
  /** Hex accent used by the cursor spotlight. */
  accent?: string;
  /** Maximum tilt (deg) on each axis while the pointer is over the card. */
  tilt?: number;
  /** How far (px) the card lifts on hover. */
  lift?: number;
  /** Outer layout wrapper — this is what entrance animations should target. */
  style?: CSSProperties;
  /** The visual card that tilts (background, radius, padding go here). */
  cardStyle?: CSSProperties;
  cardClassName?: string;
  /** The content container inside the card (flex column by default). */
  contentStyle?: CSSProperties;
  children: ReactNode;
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

/**
 * A card that tilts toward the pointer in 3D, with a soft accent spotlight and
 * a glare that follow the cursor. Pointer-driven effects only run on fine
 * pointers and when the user has not asked for reduced motion.
 */
export default function TiltCard({
  accent = "#8b5cf6",
  tilt = 6,
  lift = 6,
  style,
  cardStyle,
  cardClassName,
  contentStyle,
  children,
  ...rest
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          fine: "(pointer: fine)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { fine, motion } = ctx.conditions as {
            fine: boolean;
            motion: boolean;
          };
          if (!fine || !motion) return;

          const overlays = [spotRef.current, glareRef.current].filter(
            Boolean,
          ) as HTMLDivElement[];

          gsap.set(card, { transformPerspective: 1100 });
          const rx = gsap.quickTo(card, "rotationX", {
            duration: 0.7,
            ease: "power3.out",
          });
          const ry = gsap.quickTo(card, "rotationY", {
            duration: 0.7,
            ease: "power3.out",
          });
          const ty = gsap.quickTo(card, "y", {
            duration: 0.7,
            ease: "power3.out",
          });

          const onMove = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            rx(-py * tilt * 2);
            ry(px * tilt * 2);
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
          };
          const onEnter = () => {
            ty(-lift);
            gsap.to(overlays, { opacity: 1, duration: 0.45, overwrite: "auto" });
          };
          const onLeave = () => {
            rx(0);
            ry(0);
            ty(0);
            gsap.to(overlays, { opacity: 0, duration: 0.6, overwrite: "auto" });
          };

          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerenter", onEnter);
          card.addEventListener("pointerleave", onLeave);
          return () => {
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerenter", onEnter);
            card.removeEventListener("pointerleave", onLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [tilt, lift] },
  );

  return (
    <div ref={wrapRef} style={style} {...rest}>
      <div
        ref={cardRef}
        className={cardClassName}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          willChange: "transform",
          ...cardStyle,
        }}
      >
        {/* accent spotlight following the pointer */}
        <div
          ref={spotRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0,
            pointerEvents: "none",
            background: `radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), ${hexA(accent, 0.14)}, transparent 46%)`,
          }}
        />
        {/* specular glare */}
        <div
          ref={glareRef}
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0,
            pointerEvents: "none",
            mixBlendMode: "screen",
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.075), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            ...contentStyle,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
