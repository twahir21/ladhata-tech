"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "@/components/SplitChars";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  heroRef: React.RefObject<HTMLElement | null>;      // outer <section> to pin
  codePanelRef: React.RefObject<HTMLElement | null>; // the dark code card (fades on release)
  codeBlockRef: React.RefObject<HTMLElement | null>; // the <p> holding the code text
  storyRef: React.RefObject<HTMLElement | null>;     // #sequence section (drop target)
}

export function useCodeDropScatter({
  heroRef,
  codePanelRef,
  codeBlockRef,
  storyRef,
}: Options) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!heroRef.current || !codePanelRef.current || !codeBlockRef.current || !storyRef.current) {
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Split into individual char spans. Because each char span sits inside
      // the same colored <span> the JSX already uses (cyan keywords, green
      // strings, etc.), it inherits `color` from its parent — no re-coloring needed.
      const chars = splitChars(codeBlockRef.current!);

      // 2. Overlay layer, fixed to viewport, unaffected by any section's
      // overflow:hidden or the Hero's pin transform.
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.pointerEvents = "none";
      overlay.style.zIndex = "40";
      document.body.appendChild(overlay);
      overlayRef.current = overlay;

      // 3. Clone each char exactly where it currently sits on screen, with the
      // same computed color/font, so swapping original -> clone is invisible.
      const clones = chars.map((char) => {
        const rect = char.getBoundingClientRect();
        const style = getComputedStyle(char);
        const clone = document.createElement("span");
        clone.textContent = char.textContent;
        clone.style.position = "fixed";
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.color = style.color;
        clone.style.font = style.font;
        clone.style.opacity = "0";
        clone.style.willChange = "transform, opacity";
        overlay.appendChild(clone);
        return clone;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%", // distance the pin holds while the drop plays out
          scrub: 1,
          pin: true,
        },
      });

      // Release: card lifts slightly and fades, live chars vanish, clones take over
      tl.to(codePanelRef.current, { opacity: 0, y: -60, duration: 0.25, ease: "power1.in" }, 0)
        .set(chars, { opacity: 0 }, 0.2)
        .set(clones, { opacity: 1 }, 0.2);

      // Scatter each clone into a random spot inside the story section
      const storyRect = storyRef.current!.getBoundingClientRect();

      clones.forEach((clone) => {
        const start = clone.getBoundingClientRect();
        const targetX = storyRect.left + Math.random() * storyRect.width - start.left;
        const targetY = storyRect.top + Math.random() * (storyRect.height * 0.7) - start.top;
        const rotate = gsap.utils.random(-50, 50);
        const delay = gsap.utils.random(0, 0.5); // staggers the "rain" naturally

        tl.to(
          clone,
          {
            x: targetX,
            y: targetY,
            rotate,
            duration: 1,
            ease: "power2.in", // accelerating fall, like gravity
          },
          0.25 + delay
        );
      });

      // Optional: settle — slight dim once landed
      tl.to(clones, { opacity: 0.85, duration: 0.2 }, "-=0.1");
    }, heroRef);

    return () => {
      ctx.revert();
      overlayRef.current?.remove();
    };
  }, [heroRef, codePanelRef, codeBlockRef, storyRef]);
}