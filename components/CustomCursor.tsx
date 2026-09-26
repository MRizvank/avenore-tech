"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Elements that switch the cursor into its "interactive" state.
const HOVER_TARGETS = "a, button, input, textarea, select, [role='button'], [role='tab']";
// Elements that can be dragged (e.g. the capabilities orbit).
const GRAB_TARGETS = "[data-cursor='grab']";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Only take over the cursor on devices with a real pointer.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // globals.css hides the native cursor while this class is present.
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50, opacity: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;
    let revealed = false;

    const xSet = gsap.quickSetter(follower, "x", "px");
    const ySet = gsap.quickSetter(follower, "y", "px");

    const show = () => gsap.to([cursor, follower], { opacity: 1, duration: 0.25, overwrite: "auto" });
    const hide = () => gsap.to([cursor, follower], { opacity: 0, duration: 0.2, overwrite: "auto" });

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!revealed) {
        // First movement: snap everything to the pointer, then fade in.
        revealed = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        xSet(pos.x);
        ySet(pos.y);
        show();
        return;
      }
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const tick = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    };

    // Hover states via event delegation.
    const setInteractive = (on: boolean) => {
      gsap.to(cursor, { scale: on ? 0 : 1, duration: 0.2 });
      gsap.to(follower, {
        scale: on ? 1.5 : 1,
        backgroundColor: on ? "rgba(208,188,255,0.1)" : "transparent",
        border: on ? "1px solid #8b5cf6" : "1px solid rgba(160,120,255,0.3)",
        duration: 0.2,
      });
    };
    const setGrab = (on: boolean) => {
      gsap.to(cursor, { scale: on ? 0.6 : 1, duration: 0.2 });
      gsap.to(follower, {
        scale: on ? 1.3 : 1,
        backgroundColor: "transparent",
        border: on ? "1px dashed rgba(160,120,255,0.8)" : "1px solid rgba(160,120,255,0.3)",
        duration: 0.2,
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_TARGETS)) setInteractive(true);
      else if (target.closest(GRAB_TARGETS)) setGrab(true);
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const next = e.relatedTarget as HTMLElement | null;
      if (target.closest(HOVER_TARGETS) && !next?.closest(HOVER_TARGETS)) {
        if (next?.closest(GRAB_TARGETS)) setGrab(true);
        else setInteractive(false);
      } else if (target.closest(GRAB_TARGETS) && !next?.closest(GRAB_TARGETS)) {
        setGrab(false);
      }
    };

    // Hide when the pointer leaves the window (and while over an iframe).
    const onLeave = () => hide();
    const onEnter = () => {
      if (revealed) show();
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("mouseenter", onEnter);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("mouseenter", onEnter);
      gsap.ticker.remove(tick);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          backgroundColor: "#8b5cf6",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
        }}
        className="hidden lg:block mix-blend-screen"
      />
      <div
        ref={followerRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "1px solid rgba(160,120,255,0.3)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
        }}
        className="hidden lg:block mix-blend-screen"
      />
    </>
  );
}
