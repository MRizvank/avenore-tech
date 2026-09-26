"use client";

import { useEffect } from "react";

type CalFn = ((...args: unknown[]) => void) & {
  q?: unknown[][];
  ns?: Record<string, unknown>;
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

// Loads the official Cal.com embed once. It intercepts clicks on any [data-cal-link]
// element (see CalButton) and opens the booking modal; until it loads, or if it is
// blocked, those buttons stay plain links to the same booking page.
export default function CalEmbed() {
  useEffect(() => {
    if (window.Cal) return;
    const cal: CalFn = function (...args: unknown[]) {
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const s = document.createElement("script");
        s.src = "https://app.cal.com/embed/embed.js";
        s.async = true;
        document.head.appendChild(s);
        cal.loaded = true;
      }
      cal.q!.push(args);
    };
    window.Cal = cal;
    cal("init", { origin: "https://cal.com" });
    cal("ui", {
      theme: "dark",
      styles: { branding: { brandColor: "#8b5cf6" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return null;
}
