"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCodeDropScatter } from "@/hooks/useCodeDropScatter";
import { useStoryToDashboardZoom } from "@/hooks/useStoryToDashboardZoom";
import { useHorizontalShowcase } from "@/hooks/useHorizontalShow";
import { HeroSection } from "./components/Hero";
import { StorySection } from "./components/Story";
import { HorizontalShowcaseSection } from "./components/Showcase";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  night: "#0B0F1A",
  surface: "#131A2B",
  amber: "#FFB84D",
  cyan: "#4DD0E1",
  paper: "#F4F1EA",
  muted: "#7C8598",
};

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const glowARef = useRef<SVGCircleElement | null>(null);
  const glowBRef = useRef<SVGCircleElement | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const codeBlockRef = useRef<HTMLParagraphElement | null>(null);
  const codePanelRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useCodeDropScatter({ heroRef, codePanelRef, codeBlockRef, storyRef, rootRef });
  useStoryToDashboardZoom({ storyRef, frameRef });
  useHorizontalShowcase({ sectionRef: showcaseRef, trackRef });

  return (
    <div ref={rootRef} style={{ position: "relative", background: COLORS.night, color: COLORS.paper }}>
      <HeroSection
        heroRef={heroRef}
        COLORS={COLORS}
        glowARef={glowARef}
        glowBRef={glowBRef}
        headlineRef={headlineRef}
        subRef={subRef}
        codeBlockRef={codeBlockRef}
        codePanelRef={codePanelRef}
      />
      <StorySection ref={storyRef} frameRef={frameRef} />
      <HorizontalShowcaseSection ref={showcaseRef} trackRef={trackRef} />
    </div>
  );
}