import type { RefObject } from "react";

type HeroProps = {
  glowARef: RefObject<SVGCircleElement | null>;
  glowBRef: RefObject<SVGCircleElement | null>;
  COLORS: Record<string, string>;
  headlineRef: RefObject<HTMLHeadingElement | null>;
  subRef: RefObject<HTMLParagraphElement | null>;
  codeBlockRef: RefObject<HTMLParagraphElement | null>;
  codePanelRef: RefObject<HTMLDivElement | null>;
  heroRef:  RefObject<HTMLElement | null>;
};

export const HeroSection = ({
  heroRef, // add this prop
  glowARef,
  glowBRef,
  COLORS,
  headlineRef,
  subRef,
  codeBlockRef,
  codePanelRef,
}: HeroProps) => (
  <section
    ref={heroRef}
    style={{
      position: "relative",
      minHeight: "100svh",
      display: "flex",
      flexWrap: "wrap", // Allows stacking on mobile, side-by-side on wide screens
      alignItems: "center",
      overflow: "hidden",
      padding: "clamp(6rem, 12vh, 8rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vh, 4rem)",
      gap: "clamp(1rem, 2vw, 2rem)",
    }}
  >
    {/* Background Glows */}
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <circle
        ref={glowARef}
        cx="12%"
        cy="20%"
        r="260"
        fill={COLORS.amber}
        opacity={0.14}
        style={{ filter: "blur(80px)" }}
      />
      <circle
        ref={glowBRef}
        cx="88%"
        cy="70%"
        r="320"
        fill={COLORS.cyan}
        opacity={0.1}
        style={{ filter: "blur(90px)" }}
      />
    </svg>

    {/* LEFT COLUMN: Text Content */}
    <div style={{ flex: "1 1 320px", minWidth: 0 }}>
      <p
        className="hero-cta"
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: COLORS.amber,
          marginBottom: "1.25rem",
        }}
      >
        Build. Launch. Scale.
      </p>

      <h1
        ref={headlineRef}
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "clamp(2.4rem, 7vw, 6rem)",
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          margin: 0,
          maxWidth: "18ch",
        }}
      >
        We turn ideas into Systems.
      </h1>

      <p
        ref={subRef}
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
          color: COLORS.muted,
          maxWidth: "42ch",
          marginTop: "1.75rem",
          lineHeight: 1.6,
        }}
      >
        We design and engineer complete software solutions—from SaaS platforms and web applications to mobile apps, APIs, cloud infrastructure, and hosting in Tanzania
      </p>

      {/* Creator Attribution Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          marginTop: "1.75rem",
          padding: "0.4rem 0.9rem",
          borderRadius: "999px",
          background: "rgba(19, 26, 43, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
          width: "fit-content",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: COLORS.cyan,
            boxShadow: `0 0 10px ${COLORS.cyan}`,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "0.75rem",
            color: COLORS.muted,
            letterSpacing: "0.02em",
          }}
        >
          By
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: COLORS.cyan,
            borderRadius: "6px",
            letterSpacing: "0.02em",
          }}
        >
          BlackCoder
        </span>
        <span
          style={{
            color: COLORS.amber,
            fontWeight: 700,
            fontSize: "0.75rem",
          }}
        >
          &times;
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#818cf8",
            letterSpacing: "0.02em",
          }}
        >
          BlueHacker 🇹🇿
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        <a
          href="https://simamia.co.tz"
          className="hero-cta"
          style={{
            background: COLORS.amber,
            color: COLORS.night,
            padding: "0.85rem 1.75rem",
            borderRadius: "999px",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Start a Project
        </a>
        <a
          href="#sequence"
          className="hero-cta"
          style={{
            border: `1px solid ${COLORS.muted}`,
            color: COLORS.paper,
            padding: "0.85rem 1.75rem",
            borderRadius: "999px",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Explore Our Work
        </a>
      </div>
    </div>

    {/* RIGHT COLUMN: Code Snippet */}
    <div
      ref={codePanelRef}
      style={{ flex: "1 1 320px", maxWidth: "700px", minWidth: "280px" }}
    >
      <div
        style={{
          background: "#0d0f12",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "0.85rem",
          color: "#a9b1d6",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Window Buttons */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.25rem" }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f56",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#27c93f",
            }}
          />
        </div>

        <p
          ref={codeBlockRef}
          style={{
            margin: "0.5rem 0 0 0",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <span style={{ color: COLORS.cyan }}>import</span>{" "}
          {`{ SystemConfig, PaymentGateway }`}{" "}
          <span style={{ color: COLORS.cyan }}>from</span>{" "}
          <span style={{ color: "#9ece6a" }}>&quot;@biashara/core&quot;</span>;
          {"\n\n"}
          <span style={{ color: COLORS.cyan }}>const</span> config: SystemConfig
          = {`{\n`}
          {"  "}region:{" "}
          <span style={{ color: "#9ece6a" }}>&quot;TZ-EAST&quot;</span>,{"\n"}
          {"  "}currency:{" "}
          <span style={{ color: "#9ece6a" }}>&quot;TZS&quot;</span>,{"\n"}
          {"  "}localization: {`{\n`}
          {"    "}primaryLanguage:{" "}
          <span style={{ color: "#9ece6a" }}>&quot;sw_TZ&quot;</span>,{"\n"}
          {"    "}fallbackLanguage:{" "}
          <span style={{ color: "#9ece6a" }}>&quot;en_US&quot;</span>
          {"\n"}
          {"  "}
          {`}`}
          {"\n"}
          {`}`};{"\n\n"}
          <span style={{ color: COLORS.cyan }}>const</span> app ={" "}
          <span style={{ color: "#f7768e" }}>createSystem</span>({`{\n`}
          {"  "}client:{" "}
          <span style={{ color: "#9ece6a" }}>
            &quot;Biashara Tanzania&quot;
          </span>
          ,{"\n"}
          {"  "}config,{"\n"}
          {"  "}modules: [{"\n    "}
          <span style={{ color: "#9ece6a" }}>
            &quot;Sales & Inventory&quot;
          </span>
          ,{"\n    "}
          <span style={{ color: "#9ece6a" }}>
            &quot;VICOBA Group Ledger&quot;
          </span>
          ,{"\n  "}],{"\n"}
          {"  "}integrations: {`{\n`}
          {"    "}offlineSync: <span style={{ color: "#f7768e" }}>true</span>
          {"\n"}
          {"  "}
          {`}`},{"\n"}
          {"  "}status:{" "}
          <span style={{ color: "#9ece6a" }}>
            &quot;Deploying to production...&quot;
          </span>
          {"\n"}
          {`}`});{"\n\n"}
          <span style={{ color: COLORS.cyan }}>await</span> app.
          <span style={{ color: "#7aa2f7" }}>initialize</span>();{"\n"}
          <span style={{ color: "#73daca" }}>console</span>.
          <span style={{ color: "#7aa2f7" }}>log</span>(
          <span style={{ color: "#9ece6a" }}>
            &quot;System live across 26 regions.&quot;
          </span>
          );
        </p>
      </div>
    </div>
  </section>
);