"use client";

const C = {
  surfaceLow: "#1b1b20",
  surfaceContainer: "#1f1f24",
  surfaceLowest: "#0e0e12",
  onSurface: "#e4e1e8",
  onSurfaceVariant: "#cbc3d7",
  primary: "#d0bcff",
  secondary: "#a078ff",
  tertiary: "#5edf81",
  outline: "#958ea0",
  outlineVariant: "#494454",
};

export default function SocialSidebar() {
  const links = [
    { href: "https://linkedin.com", icon: "share", color: C.primary, title: "LinkedIn" },
    { href: "https://wa.me/96567634440", icon: "chat", color: C.tertiary, title: "WhatsApp" },
    { href: "https://instagram.com", icon: "photo_camera", color: C.secondary, title: "Instagram" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "6px",
        borderRadius: "9999px",
        backgroundColor: "rgba(27, 27, 32, 0.92)",
        backdropFilter: "blur(12px)",
        border: `1px solid rgba(73, 68, 84, 0.3)`,
        boxShadow: "0 0 24px rgba(0,0,0,0.5)",
      }}
      className="hidden sm:flex"
    >
      {links.map(({ href, icon, color, title }) => (
        <a
          key={title}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: C.onSurfaceVariant,
            transition: "all 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = C.surfaceContainer;
            (e.currentTarget as HTMLElement).style.color = color;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLElement).style.color = C.onSurfaceVariant;
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{icon}</span>
        </a>
      ))}
    </div>
  );
}
