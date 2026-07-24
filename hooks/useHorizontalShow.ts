"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  sectionRef: React.RefObject<HTMLElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
}

export function useHorizontalShowcase({ sectionRef, trackRef }: Options) {
  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // falls back to normal vertical stacking — fine since track is just a flex row

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const track = trackRef.current!;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true, // recomputes scrollWidth on resize
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, trackRef]);
}