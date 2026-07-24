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
  rootRef: React.RefObject<HTMLElement | null>; // add this
}

export function useCodeDropScatter({
  heroRef,
  codePanelRef,
  codeBlockRef,
  storyRef,
  rootRef,
}: Options) {
  useLayoutEffect(() => {
    if (
      !heroRef.current ||
      !codePanelRef.current ||
      !codeBlockRef.current ||
      !storyRef.current ||
      !rootRef.current
    ) {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let layer: HTMLDivElement | null = null;

    const ctx = gsap.context(() => {
      const chars = splitChars(codeBlockRef.current!);
      const story = storyRef.current!;
      const root = rootRef.current!;

      layer = document.createElement("div");
      layer.style.position = "absolute";
      layer.style.inset = "0";
      layer.style.pointerEvents = "none";
      layer.style.zIndex = "50"; // clears Hero's 1 AND Story's 2
      root.appendChild(layer);   // shared ancestor, not story

      // Coordinates now anchored to ROOT's page position, not story's
      const rootRect = root.getBoundingClientRect();
      const rootPageX = rootRect.left + window.scrollX;
      const rootPageY = rootRect.top + window.scrollY;

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
        clone.style.left = `${pageX - rootPageX}px`; // relative to root, not story
        clone.style.top = `${pageY - rootPageY}px`;
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
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      });

      tl.to(codePanelRef.current, { opacity: 0, y: -40, duration: 0.2, ease: "power1.in" }, 0)
        .set(chars, { opacity: 0 }, 0.15);

      // Scatter targets: story's box, but expressed in ROOT-relative coords
      // since that's the coordinate space the clones now live in
      clones.forEach((clone, i) => {
        const targetX = storyPageX - rootPageX + gsap.utils.random(0, Math.max(story.clientWidth - 20, 0));
        const targetY = storyPageY - rootPageY + gsap.utils.random(story.clientHeight * 0.15, story.clientHeight * 0.85);
        const rotate = gsap.utils.random(-50, 50);
        const startDelay = (i / clones.length) * 0.5;

        tl.to(
          clone,
          { left: targetX, top: targetY, rotate, opacity: 0.9, duration: 1, ease: "power2.in" },
          startDelay
        );
      });
    }, heroRef);

    return () => {
      ctx.revert();
      layer?.remove();
    };
  }, [heroRef, codePanelRef, codeBlockRef, storyRef, rootRef]);
}