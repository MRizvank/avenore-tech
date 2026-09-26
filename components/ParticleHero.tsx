"use client";

import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleHero() {
  const particlesLoaded = useCallback(async () => {}, []);

  const options: ISourceOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: ["grab", "bubble"] },
        onClick: { enable: true, mode: "repulse" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.5 } },
        bubble: { distance: 200, size: 4, opacity: 1, duration: 0.4 },
        repulse: { distance: 180, duration: 0.8 },
      },
    },
    particles: {
      color: { value: ["#8b5cf6", "#8b5cf6", "#5edf81", "#ffffff"] },
      links: {
        color: "#8b5cf6",
        distance: 130,
        enable: true,
        opacity: 0.07,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: { density: { enable: true }, value: 120 },
      opacity: {
        value: { min: 0.1, max: 0.45 },
        animation: { enable: true, speed: 0.6, sync: false },
      },
      shape: { type: ["circle"] },
      size: {
        value: { min: 1, max: 2.5 },
        animation: { enable: true, speed: 1, sync: false },
      },
    },
    detectRetina: true,
  };

  return (
    <ParticlesProvider init={loadSlim}>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
    </ParticlesProvider>
  );
}
