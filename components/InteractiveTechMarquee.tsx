"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const techs = [
  "Flutter", "Swift", "Kotlin", "React Native", "Next.js", "Node.js", "FastAPI",
  "PostgreSQL", "AWS", "Google Cloud", "Figma", "Firebase", "Redis", "Docker"
];

export default function InteractiveTechMarquee() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!marqueeRef.current) return;
    
    // Calculate total width so we know how far to animate
    const tl = gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 35, // Adjust speed
      repeat: -1,
    });

    // Slow down on hover for interactivity
    if (container.current) {
      container.current.addEventListener("mouseenter", () => gsap.to(tl, { timeScale: 0.15, duration: 0.8 }));
      container.current.addEventListener("mouseleave", () => gsap.to(tl, { timeScale: 1, duration: 0.5 }));
    }
  }, { scope: container });

  return (
    <section 
      ref={container} 
      style={{ 
        overflow: "hidden", 
        padding: "3rem 0", 
        backgroundColor: "#0e0e12", 
        borderTop: "1px solid rgba(73,68,84,0.15)", 
        borderBottom: "1px solid rgba(73,68,84,0.15)", 
        cursor: "grab",
        userSelect: "none"
      }}
    >
      <div ref={marqueeRef} style={{ display: "flex", width: "max-content", gap: "1.5rem", padding: "0 1.5rem" }}>
        {[...techs, ...techs, ...techs].map((tech, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2rem",
              borderRadius: "9999px",
              backgroundColor: "rgba(31,31,36,0.5)",
              border: "1px solid rgba(73,68,84,0.3)",
              color: "#cbc3d7",
              fontSize: "20px",
              fontWeight: 800,
              fontFamily: "var(--font-outfit)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              transition: "color 0.4s, border-color 0.4s, transform 0.4s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#d0bcff";
              e.currentTarget.style.borderColor = "#a078ff";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.backgroundColor = "rgba(42,41,46,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#cbc3d7";
              e.currentTarget.style.borderColor = "rgba(73,68,84,0.3)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "rgba(31,31,36,0.5)";
            }}
          >
            <span className="material-symbols-outlined" style={{ color: "#a078ff", fontSize: "24px" }}>terminal</span>
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
