"use client";

import { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Design tokens (kept local so this file is a drop-in single unit)  */
/* ------------------------------------------------------------------ */
const COLORS = {
  night: "#0B0F1A",
  surface: "#131A2B",
  amber: "#FFB84D",
  cyan: "#4DD0E1",
  paper: "#F4F1EA",
  muted: "#7C8598",
};

const CODE_GLYPHS = "01{}<>/=+;()[]$#&".split("");

/* Sample points roughly outlining a phone silhouette (400x600 viewbox) */
function phoneOutlinePoints(count: number) {
  const pts: { x: number; y: number }[] = [];
  const w = 220,
    h = 440,
    r = 28,
    cx = 200,
    cy = 300;
  const left = cx - w / 2,
    top = cy - h / 2;
  const perim = 2 * (w + h);
  for (let i = 0; i < count; i++) {
    const d = (i / count) * perim;
    let x = 0,
      y = 0;
    if (d < w) {
      x = left + d;
      y = top;
    } else if (d < w + h) {
      x = left + w;
      y = top + (d - w);
    } else if (d < 2 * w + h) {
      x = left + w - (d - w - h);
      y = top + h;
    } else {
      x = left;
      y = top + h - (d - 2 * w - h);
    }
    pts.push({ x, y });
  }
  return pts.map((p) => ({ x: p.x, y: p.y, r }));
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const glowARef = useRef<SVGCircleElement | null>(null);
  const glowBRef = useRef<SVGCircleElement | null>(null);

  const sequenceRef = useRef<HTMLDivElement | null>(null);
  const particlesWrapRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<SVGGElement | null>(null);
  const phoneScreenGroupRef = useRef<SVGGElement | null>(null);
  const dashboardRef = useRef<SVGGElement | null>(null);
  const cloudRef = useRef<SVGGElement | null>(null);
  const beamRef = useRef<SVGLineElement | null>(null);
  const stageLabelRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo(() => {
    const count = 48;
    const targets = phoneOutlinePoints(count);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      glyph: CODE_GLYPHS[i % CODE_GLYPHS.length],
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      target: targets[i],
    }));
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ---------------- Load-in: headline text reveal + parallax ---------------- */
      const lines = headlineRef.current?.querySelectorAll<HTMLElement>(".line-inner");
      const tlIntro = gsap.timeline({ defaults: { ease: "power4.out" } });

      tlIntro
        .set([lines, subRef.current], { visibility: "visible" })
        .from(lines ?? [], {
          yPercent: 130,
          rotate: 4,
          duration: 1.1,
          stagger: 0.09,
        })
        .from(
          subRef.current,
          { opacity: 0, y: 24, duration: 0.8 },
          "-=0.55"
        )
        .from(
          ".hero-cta",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 },
          "-=0.5"
        );

      /* Ambient parallax glows drifting with scroll */
      gsap.to(glowARef.current, {
        y: -120,
        x: 40,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(glowBRef.current, {
        y: 90,
        x: -60,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* Headline itself drifts slightly slower than scroll = parallax depth */
      gsap.to(headlineRef.current, {
        yPercent: -18,
        opacity: 0.4,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ---------------- Pinned build sequence ----------------
         code particles assemble -> phone appears -> dashboard appears -> cloud
      */
      const stEl = sequenceRef.current!;
      const stages = ["Andika Code", "App Yako", "Dashibodi Yako", "Kwenye Wingu"];

      const seqTl = gsap.timeline({
        scrollTrigger: {
          trigger: stEl,
          start: "top top",
          end: "+=3200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* Stage labels driven by progress */
      seqTl.eventCallback = undefined;

      // Stage 1: particles converge into the phone outline
      particles.forEach((p, i) => {
        seqTl.to(
          `.particle-${p.id}`,
          {
            left: `${p.target.x}px`,
            top: `${p.target.y}px`,
            opacity: 0.9,
            duration: 1,
            ease: "power2.inOut",
          },
          i * 0.008
        );
      });
      seqTl.to(particlesWrapRef.current, { opacity: 0, duration: 0.4 }, "+=0.1");

      // Stage 2: phone body draws in, screen lights up
      seqTl.fromTo(
        phoneRef.current,
        { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        "<"
      );
      seqTl.fromTo(
        phoneScreenGroupRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );
      seqTl.to(stageLabelRef.current, { text: stages[1] } as any, "<");

      // Stage 3: dashboard slides out from beside the phone, bars grow
      seqTl.fromTo(
        dashboardRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
        "+=0.2"
      );
      seqTl.fromTo(
        ".dash-bar",
        { scaleY: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.5"
      );

      // Stage 4: cloud/server rises, beam connects phone -> cloud, nodes pulse
      seqTl.fromTo(
        cloudRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "+=0.2"
      );
      seqTl.fromTo(
        beamRef.current,
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" },
        "-=0.4"
      );
      seqTl.to(".cloud-node", {
        scale: 1.15,
        duration: 0.5,
        repeat: 3,
        yoyo: true,
        stagger: 0.15,
        transformOrigin: "50% 50%",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [particles]);

  return (
    <div ref={rootRef} style={{ background: COLORS.night, color: COLORS.paper }}>
      {/* ---------------------------- HERO ---------------------------- */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexWrap: "wrap", // Allows stacking on mobile, side-by-side on wide screens
          alignItems: "center",
          overflow: "hidden",
          padding: "0 clamp(1.5rem, 6vw, 6rem)",
          gap: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        {/* Background Glows */}
        <svg
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <circle ref={glowARef} cx="12%" cy="20%" r="260" fill={COLORS.amber} opacity={0.14} style={{ filter: "blur(80px)" }} />
          <circle ref={glowBRef} cx="88%" cy="70%" r="320" fill={COLORS.cyan} opacity={0.1} style={{ filter: "blur(90px)" }} />
        </svg>

        {/* LEFT COLUMN: Text Content */}
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <p
            className="hero-cta"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: COLORS.amber,
              marginBottom: "1.25rem",
            }}
          >
            Ladhata Tech Solution — Dar es Salaam
          </p>

          <h1
            ref={headlineRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2.4rem, 7vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            {["Tunabadilisha", "biashara za Tanzania", "kuwa dijitali."].map((line, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden" }}>
                <span className="line-inner" style={{ display: "block", visibility: "hidden" }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            style={{
              visibility: "hidden",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
              color: COLORS.muted,
              maxWidth: "42ch",
              marginTop: "1.75rem",
              lineHeight: 1.6,
            }}
          >
            Kuanzia Simamia — programu ya mauzo na stoki — hadi mifumo ya VICOBA, shule, na
            malipo. Tunajenga teknolojia inayoeleweka na wafanyabiashara wa kweli.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
            <a
              href="https://simamia.co.tz"
              className="hero-cta"
              style={{
                background: COLORS.amber,
                color: COLORS.night,
                padding: "0.85rem 1.75rem",
                borderRadius: "999px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Angalia Simamia App
            </a>
            <a
              href="#sequence"
              className="hero-cta"
              style={{
                border: `1px solid ${COLORS.muted}`,
                color: COLORS.paper,
                padding: "0.85rem 1.75rem",
                borderRadius: "999px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Tunavyojenga
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Code Snippet */}
        <div style={{ flex: "1 1 320px", maxWidth: "700px", minWidth: "280px" }}>
          <div
            style={{
              background: "#0d0f12",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: "#a9b1d6",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Window Buttons */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "1.25rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
            </div>

            {/* Expanded Code Content (~4x original size) */}
            <p style={{ margin: 0, color: COLORS.amber }}>\\ Enterprise Solution Architecture for Tanzania</p>
            <p style={{ margin: "0.5rem 0 0 0", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              <span style={{ color: COLORS.cyan }}>import</span> {`{ SystemConfig, PaymentGateway }`} <span style={{ color: COLORS.cyan }}>from</span> <span style={{ color: "#9ece6a" }}>&quot;@biashara/core&quot;</span>;{"\n\n"}
              <span style={{ color: COLORS.cyan }}>const</span> config: SystemConfig = {`{\n`}
              {"  "}region: <span style={{ color: "#9ece6a" }}>&quot;TZ-EAST&quot;</span>,{"\n"}
              {"  "}currency: <span style={{ color: "#9ece6a" }}>&quot;TZS&quot;</span>,{"\n"}
              {"  "}localization: {`{\n`}
              {"    "}primaryLanguage: <span style={{ color: "#9ece6a" }}>&quot&quot;sw_TZ&quot;</span>,{"\n"}
              {"    "}fallbackLanguage: <span style={{ color: "#9ece6a" }}>&quot;en_US&quot;</span>{"\n"}
              {"  "}{`}`}{"\n"}
              {`}`};{"\n\n"}
              <span style={{ color: COLORS.cyan }}>const</span> app = <span style={{ color: "#f7768e" }}>createSystem</span>({`{\n`}
              {"  "}client: <span style={{ color: "#9ece6a" }}>&quot;Biashara Tanzania&quot;</span>,{"\n"}
              {"  "}config,{"\n"}
              {"  "}modules: [
              {"\n    "}<span style={{ color: "#9ece6a" }}>&quot;Sales & Inventory&quot;</span>,
              {"\n    "}<span style={{ color: "#9ece6a" }}>&quot;VICOBA Group Ledger&quot;</span>,
              {"\n  "}],{"\n"}
              {"  "}integrations: {`{\n`}
              {"    "}offlineSync: <span style={{ color: "#f7768e" }}>true</span>{"\n"}
              {"  "}{`}`},{"\n"}
              {"  "}status: <span style={{ color: "#9ece6a" }}>&quot;Deploying to production...&quot;</span>{"\n"}
              {`}`});{"\n\n"}
              <span style={{ color: COLORS.cyan }}>await</span> app.<span style={{ color: "#7aa2f7" }}>initialize</span>();{"\n"}
              <span style={{ color: "#73daca" }}>console</span>.<span style={{ color: "#7aa2f7" }}>log</span>(<span style={{ color: "#9ece6a" }}>&quot;System live across 26 regions.&quot;</span>);
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------- PINNED BUILD SEQUENCE ---------------------- */}
      <section
        id="sequence"
        ref={sequenceRef}
        style={{
          position: "relative",
          height: "100svh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={stageLabelRef}
          style={{
            position: "absolute",
            top: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.cyan,
          }}
        >
          Andika Code
        </div>

        {/* Floating code particles that converge into the phone outline */}
        <div
          ref={particlesWrapRef}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {particles.map((p) => (
            <span
              key={p.id}
              className={`particle-${p.id}`}
              style={{
                position: "absolute",
                left: `${p.startX}%`,
                top: `${p.startY}%`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.85rem",
                color: p.id % 3 === 0 ? COLORS.amber : COLORS.cyan,
                opacity: 0.5,
              }}
            >
              {p.glyph}
            </span>
          ))}
        </div>

        <svg
          viewBox="0 0 900 600"
          style={{ width: "min(90vw, 900px)", height: "auto", overflow: "visible" }}
        >
          {/* Phone */}
          <g ref={phoneRef} transform="translate(340,80)" opacity={0}>
            <rect
              x="0"
              y="0"
              width="220"
              height="440"
              rx="28"
              fill={COLORS.surface}
              stroke={COLORS.muted}
              strokeWidth="1.5"
            />
            <g ref={phoneScreenGroupRef} opacity={0}>
              <rect x="14" y="34" width="192" height="372" rx="10" fill="#0E1524" />
              <rect x="30" y="54" width="90" height="10" rx="3" fill={COLORS.amber} />
              <rect x="30" y="80" width="160" height="8" rx="3" fill={COLORS.muted} opacity={0.5} />
              <rect x="30" y="98" width="130" height="8" rx="3" fill={COLORS.muted} opacity={0.35} />
              <rect x="30" y="130" width="160" height="60" rx="8" fill="#182238" />
              <rect x="30" y="200" width="160" height="60" rx="8" fill="#182238" />
              <circle cx="200" cy="60" r="4" fill={COLORS.cyan} />
            </g>
          </g>

          {/* Dashboard panel (desktop-style) sliding in beside the phone */}
          <g ref={dashboardRef} transform="translate(30,140)" opacity={0}>
            <rect width="260" height="300" rx="14" fill={COLORS.surface} stroke={COLORS.muted} strokeWidth="1.5" />
            <text x="20" y="34" fontFamily="'Space Grotesk', sans-serif" fontSize="14" fill={COLORS.paper}>
              Dashibodi
            </text>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                className="dash-bar"
                x={26 + i * 55}
                y={230 - i * 24}
                width="34"
                height={40 + i * 24}
                rx="4"
                fill={i % 2 === 0 ? COLORS.amber : COLORS.cyan}
              />
            ))}
          </g>

          {/* Connecting beam from phone down to cloud */}
          <line
            ref={beamRef}
            x1="450"
            y1="520"
            x2="450"
            y2="560"
            stroke={COLORS.cyan}
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeDashoffset={300}
          />

          {/* Cloud / server cluster */}
          <g ref={cloudRef} transform="translate(330,560)" opacity={0}>
            <ellipse cx="120" cy="10" rx="140" ry="34" fill={COLORS.surface} stroke={COLORS.muted} strokeWidth="1.2" />
            <circle className="cloud-node" cx="60" cy="10" r="6" fill={COLORS.amber} />
            <circle className="cloud-node" cx="120" cy="10" r="6" fill={COLORS.cyan} />
            <circle className="cloud-node" cx="180" cy="10" r="6" fill={COLORS.amber} />
          </g>
        </svg>
      </section>
    </div>
  );
}