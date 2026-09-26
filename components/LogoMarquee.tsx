"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  items: string[];
  /** Seconds for one full loop. */
  duration?: number;
};

/**
 * Infinite, edge-faded logo/name marquee. Slows down while hovered.
 * Content is rendered twice so a -50% translation loops seamlessly.
 */
export default function LogoMarquee({ items, duration = 38 }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const loop = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration,
        repeat: -1,
      });
      const slow = () => gsap.to(loop, { timeScale: 0.12, duration: 0.8 });
      const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.6 });
      root.addEventListener("pointerenter", slow);
      root.addEventListener("pointerleave", fast);
      return () => {
        root.removeEventListener("pointerenter", slow);
        root.removeEventListener("pointerleave", fast);
      };
    },
    { scope: rootRef, dependencies: [duration] },
  );

  const fade =
    "linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)";

  return (
    <div
      ref={rootRef}
      dir="ltr"
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage: fade,
        WebkitMaskImage: fade,
        userSelect: "none",
      }}
    >
      <div
        ref={trackRef}
        style={{ display: "flex", width: "max-content", willChange: "transform" }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            {items.map((brand) => (
              <div
                key={`${copy}-${brand}`}
                className="logo-marquee-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2.25rem",
                  paddingInline: "1.125rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    whiteSpace: "nowrap",
                    color: "rgba(228,225,232,0.5)",
                    transition: "color .35s ease",
                  }}
                >
                  {brand}
                </span>
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 1,
                    transform: "rotate(45deg)",
                    backgroundColor: "rgba(139,92,246,0.45)",
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
