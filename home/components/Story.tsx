"use client";

import { forwardRef } from "react";

const COLORS = {
  night: "#0B0F1A",
  surface: "#131A2B",
  amber: "#FFB84D",
  cyan: "#4DD0E1",
  paper: "#F4F1EA",
  muted: "#7C8598",
};

const STORY_ITEMS = [
  {
    tag: "Simamia",
    title: "Mauzo na stoki, wakati halisi.",
    body: "Programu ya kila siku kwa maduka na wafanyabiashara — mauzo, stoki, ripoti — bila mtandao wa kuaminika kila wakati.",
  },
  {
    tag: "VICOBA",
    title: "Vikundi vya kuweka na kukopa, kidijitali.",
    body: "Daftari la kielektroniki kwa vikundi vya kuweka akiba — mchango, mikopo, na taarifa kwa wanachama wote.",
  },
  {
    tag: "Shule & Malipo",
    title: "Mifumo ya shule na malipo, imeunganishwa.",
    body: "Kutoka ada za shule hadi malipo ya kila siku — mifumo inayozungumza lugha ya mfanyabiashara wa Tanzania.",
  },
];

export const StorySection = forwardRef<HTMLElement>(function StorySection(_props, ref) {
  return (
    <section
      ref={ref}
      id="sequence"
      style={{
        position: "relative",
        minHeight: "140vh",
        background: COLORS.surface,
        color: COLORS.paper,
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
      }}
    >
      {/* Faint background glow so scattered chars have some depth to land on */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 30% 20%, ${COLORS.amber}14, transparent 60%),
                       radial-gradient(circle at 80% 70%, ${COLORS.cyan}14, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: COLORS.cyan,
          marginBottom: "1.5rem",
        }}
      >
        Tunavyojenga
      </p>

      <h2
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          lineHeight: 1.1,
          maxWidth: "20ch",
          margin: 0,
        }}
      >
        Kila mstari wa code, unabeba biashara halisi.
      </h2>

      <div
        style={{
          marginTop: "clamp(3rem, 8vw, 6rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(1.5rem, 3vw, 3rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {STORY_ITEMS.map((item) => (
          <div
            key={item.tag}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "clamp(1.5rem, 3vw, 2rem)",
              backdropFilter: "blur(2px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.75rem",
                color: COLORS.amber,
                letterSpacing: "0.08em",
              }}
            >
              {item.tag}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 600,
                fontSize: "1.25rem",
                margin: "0.75rem 0 0.5rem",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.95rem",
                color: COLORS.muted,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
});