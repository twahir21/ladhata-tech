"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  storyRef: React.RefObject<HTMLElement | null>;
  frameRef: React.RefObject<HTMLDivElement | null>;
}

export function useStoryToDashboardZoom({ storyRef, frameRef }: Options) {
  useLayoutEffect(() => {
    if (!storyRef.current || !frameRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(frameRef.current, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const story = storyRef.current!;
      const frame = frameRef.current!;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top top", // exactly where the char-scatter timeline ends
          end: "+=120%",
          scrub: 1,
          pin: true,
        },
      });

      // Reveal the frame small and centered first...
      tl.to(frame, { opacity: 1, scale: 0.75, duration: 0.3, ease: "power1.out" }, 0)
        // ...then scale it up until it fully covers the viewport, edges included.
        .to(
          frame,
          {
            scale: () => {
              const rect = frame.getBoundingClientRect();
              const scaleX = window.innerWidth / rect.width;
              const scaleY = window.innerHeight / rect.height;
              return Math.max(scaleX, scaleY) * 1.05; // slight overscale for a clean edge-to-edge fill
            },
            borderRadius: 0,
            boxShadow: "none",
            duration: 0.7,
            ease: "power2.in",
          },
          0.3
        );
    }, storyRef);

    return () => ctx.revert();
  }, [storyRef, frameRef]);
}