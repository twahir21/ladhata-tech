"use client";

import { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "@/components/SplitChars";
import { HeroSection } from "@/components/Hero";


gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  night: "#0B0F1A",
  surface: "#131A2B",
  amber: "#FFB84D",
  cyan: "#4DD0E1",
  paper: "#F4F1EA",
  muted: "#7C8598",
};

const CODE_GLYPHS = "01{}<>/=+;()[]$#&".split("");

function phoneOutlinePoints(count: number) {
  const pts: { x: number; y: number }[] = [];
  const w = 220,
    h = 440,
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
  return pts;
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const glowARef = useRef<SVGCircleElement | null>(null);
  const glowBRef = useRef<SVGCircleElement | null>(null);

  const codeBlockRef = useRef<HTMLParagraphElement | null>(null);
  const codePanelRef = useRef<HTMLDivElement | null>(null);

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
      const lines = headlineRef.current?.querySelectorAll<HTMLElement>(".line-inner");
      const tlIntro = gsap.timeline({ defaults: { ease: "power4.out" } });

      tlIntro
        .set([lines, subRef.current], { visibility: "visible" })
        .from(lines ?? [], { yPercent: 130, rotate: 4, duration: 1.1, stagger: 0.09 })
        .from(subRef.current, { opacity: 0, y: 24, duration: 0.8 }, "-=0.55")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 }, "-=0.5");

      gsap.to(glowARef.current, {
        y: -120,
        x: 40,
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(glowBRef.current, {
        y: 90,
        x: -60,
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(headlineRef.current, {
        yPercent: -18,
        opacity: 0.4,
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      /* ---- Code panel: characters fall & scatter as the user scrolls
         from the hero into the pinned sequence below. scrub: true ties
         progress 1:1 to scroll position, so speed always matches however
         fast/slow the user scrolls. Widen start/end to spread it out more. */
      const chars = codeBlockRef.current ? splitChars(codeBlockRef.current) : [];
      if (chars.length) {
        const seeded = chars.map((_, i) => {
          const a = Math.sin(i * 12.9898) * 43758.5453;
          const rand = a - Math.floor(a);
          return {
            y: 140 + rand * 260,
            x: (rand - 0.5) * 220,
            rot: (rand - 0.5) * 220,
          };
        });

        const scatterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sequenceRef.current,
            start: "top bottom",
            end: "top 55%",
            scrub: true,
          },
        });

        chars.forEach((char, i) => {
          scatterTl.to(
            char,
            { y: seeded[i].y, x: seeded[i].x, rotate: seeded[i].rot, opacity: 0, ease: "power1.in", duration: 1 },
            i * 0.006
          );
        });

        scatterTl.to(codePanelRef.current, { opacity: 0.15, duration: 0.4 }, ">-0.2");
      }

      const stEl = sequenceRef.current!;
      const stages = ["Andika Code", "App Yako", "Dashibodi Yako", "Kwenye Wingu"];

      const seqTl = gsap.timeline({
        scrollTrigger: { trigger: stEl, start: "top top", end: "+=3200", scrub: 1, pin: true, anticipatePin: 1 },
      });

      particles.forEach((p, i) => {
        seqTl.to(
          `.particle-${p.id}`,
          { left: `${p.target.x}px`, top: `${p.target.y}px`, opacity: 0.9, duration: 1, ease: "power2.inOut" },
          i * 0.008
        );
      });
      seqTl.to(particlesWrapRef.current, { opacity: 0, duration: 0.4 }, "+=0.1");

      seqTl.fromTo(
        phoneRef.current,
        { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        "<"
      );
      seqTl.fromTo(phoneScreenGroupRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
      seqTl.to(stageLabelRef.current, { text: stages[1] } as any, "<");

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

      seqTl.fromTo(cloudRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=0.2");
      seqTl.fromTo(
        beamRef.current,
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" },
        "-=0.4"
      );
      seqTl.to(".cloud-node", { scale: 1.15, duration: 0.5, repeat: 3, yoyo: true, stagger: 0.15, transformOrigin: "50% 50%" });
    }, rootRef);

    return () => ctx.revert();
  }, [particles]);

  return (
    <div ref={rootRef} style={{ background: COLORS.night, color: COLORS.paper }}>
      <HeroSection
        COLORS={COLORS}
        glowARef={glowARef}
        glowBRef={glowBRef}
        headlineRef={headlineRef}
        subRef={subRef}
        codeBlockRef={codeBlockRef}
        codePanelRef={codePanelRef}
      />
      <section
        id="sequence"
        ref={sequenceRef}
        style={{ position: "relative", height: "100svh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          ref={stageLabelRef}
          style={{
            position: "absolute",
            top: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.cyan,
          }}
        >
          Andika Code
        </div>

        <div ref={particlesWrapRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {particles.map((p) => (
            <span
              key={p.id}
              className={`particle-${p.id}`}
              style={{
                position: "absolute",
                left: `${p.startX}%`,
                top: `${p.startY}%`,
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.85rem",
                color: p.id % 3 === 0 ? COLORS.amber : COLORS.cyan,
                opacity: 0.5,
              }}
            >
              {p.glyph}
            </span>
          ))}
        </div>

        <svg viewBox="0 0 900 600" style={{ width: "min(90vw, 900px)", height: "auto", overflow: "visible" }}>
          <g ref={phoneRef} transform="translate(340,80)" opacity={0}>
            <rect x="0" y="0" width="220" height="440" rx="28" fill={COLORS.surface} stroke={COLORS.muted} strokeWidth="1.5" />
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

          <g ref={dashboardRef} transform="translate(30,140)" opacity={0}>
            <rect width="260" height="300" rx="14" fill={COLORS.surface} stroke={COLORS.muted} strokeWidth="1.5" />
            <text x="20" y="34" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="14" fill={COLORS.paper}>
              Dashibodi
            </text>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} className="dash-bar" x={26 + i * 55} y={230 - i * 24} width="34" height={40 + i * 24} rx="4" fill={i % 2 === 0 ? COLORS.amber : COLORS.cyan} />
            ))}
          </g>

          <line ref={beamRef} x1="450" y1="520" x2="450" y2="560" stroke={COLORS.cyan} strokeWidth="2" strokeDasharray="6 6" strokeDashoffset={300} />

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