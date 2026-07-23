"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/**
 * Wrap your app (or just the page) in this. It drives Lenis off the GSAP
 * ticker instead of requestAnimationFrame directly, so Lenis and every
 * ScrollTrigger stay in perfect sync — no scroll jank, no drift between
 * the two libraries.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Create Lenis once during the initial render via lazy state initializer.
  // This avoids calling setState inside an effect, which ESLint flags.
  const [lenis] = useState(() => {
    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // quart-out, weighty but responsive
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    return instance;
  });

  useEffect(() => {
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      lenis.stop();
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}