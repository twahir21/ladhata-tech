"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "@/components/SplitChars";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  heroRef: React.RefObject<HTMLElement | null>;
  codePanelRef: React.RefObject<HTMLElement | null>;
  codeBlockRef: React.RefObject<HTMLElement | null>;
  storyRef: React.RefObject<HTMLElement | null>;
}

export function useCodeDropScatter({
  heroRef,
  codePanelRef,
  codeBlockRef,
  storyRef,
}: Options) {
  useLayoutEffect(() => {
    if (!heroRef.current || !codePanelRef.current || !codeBlockRef.current || !storyRef.current) {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let layer: HTMLDivElement | null = null;

    const ctx = gsap.context(() => {
      const chars = splitChars(codeBlockRef.current!);
      const story = storyRef.current!;

      // Layer lives INSIDE the story section — a real DOM child, not a
      // viewport-fixed overlay. It scrolls with the page like everything else.
      layer = document.createElement("div");
      layer.style.position = "absolute";
      layer.style.inset = "0";
      layer.style.pointerEvents = "none";
      layer.style.zIndex = "5";
      story.appendChild(layer);

      // Capture positions in PAGE coordinates (rect + current scroll offset).
      // This is what makes the offset scroll-independent: it's a fixed point
      // in the document, not a snapshot of "where things are on screen right now."
      const storyRect = story.getBoundingClientRect();
      const storyPageX = storyRect.left + window.scrollX;
      const storyPageY = storyRect.top + window.scrollY;

      const clones = chars.map((char) => {
        const rect = char.getBoundingClientRect();
        const style = getComputedStyle(char);
        const pageX = rect.left + window.scrollX;
        const pageY = rect.top + window.scrollY;

        const clone = document.createElement("span");
        clone.textContent = char.textContent;
        clone.style.position = "absolute";
        // Relative to story's own top-left, in document space — lands the
        // clone exactly where the hero char visually sits, whatever the
        // current scroll position is.
        clone.style.left = `${pageX - storyPageX}px`;
        clone.style.top = `${pageY - storyPageY}px`;
        clone.style.color = style.color;
        clone.style.font = style.font;
        clone.style.opacity = "0";
        clone.style.willChange = "transform, opacity";
        layer!.appendChild(clone);
        return clone;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top bottom", // story's top hits viewport bottom — it's just starting to enter
          end: "top top",      // story's top hits viewport top — it now fully fills the viewport
          scrub: 1,
        },
      });

      // Release: hero's card and live chars fade as the "handoff" happens
      tl.to(codePanelRef.current, { opacity: 0, y: -40, duration: 0.2, ease: "power1.in" }, 0)
        .set(chars, { opacity: 0 }, 0.15);

      // Scatter each clone to a random resting spot inside the story section
      clones.forEach((clone, i) => {
        const targetX = gsap.utils.random(0, Math.max(story.clientWidth - 20, 0));
        const targetY = gsap.utils.random(story.clientHeight * 0.15, story.clientHeight * 0.85);
        const rotate = gsap.utils.random(-50, 50);
        const startDelay = (i / clones.length) * 0.5; // rain-like stagger

        tl.to(
          clone,
          {
            left: targetX,
            top: targetY,
            rotate,
            opacity: 0.9,
            duration: 1,
            ease: "power2.in", // accelerating, gravity-like fall
          },
          startDelay
        );
      });
    }, heroRef);

    return () => {
      ctx.revert();
      layer?.remove();
    };
  }, [heroRef, codePanelRef, codeBlockRef, storyRef]);
}