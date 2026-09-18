"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  storyRef: React.RefObject<HTMLElement | null>;
  frameRef: React.RefObject<HTMLDivElement | null>;
}

/** The glyph the zoom dives into — the "I" in "TWILE". */
const TARGET_GLYPH = "I";

/** How much deeper than "the stroke exactly covers the viewport" we dive in. */
const INSIDE = 1.35;

interface LetterMetrics {
  /** Centre of the glyph's stroke, in un-scaled frame px. */
  x: number;
  /** Centre of the glyph's line box, in un-scaled frame px. */
  y: number;
  /** Width of the stroke itself (not of the whole glyph), in un-scaled frame px. */
  stemWidth: number;
  /** Full ink height of the glyph, in un-scaled frame px. */
  inkHeight: number;
}

/**
 * `canvas.font` needs quoted family names, so rebuild the computed
 * `font-family` list with quotes on anything that isn't a generic keyword.
 */
const GENERIC_FAMILIES = new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "emoji",
  "math",
  "fangsong",
]);

function cssFontFamilies(fontFamily: string) {
  return fontFamily
    .split(",")
    .map((name) => {
      const trimmed = name.trim();
      if (!trimmed) return "";
      const unquoted = trimmed.replace(/^["']|["']$/g, "");
      return GENERIC_FAMILIES.has(unquoted.toLowerCase()) ? unquoted : `"${unquoted}"`;
    })
    .filter(Boolean)
    .join(", ");
}

/**
 * Finds where the "I" sits inside the frame and how wide its stroke is, so the
 * zoom can land *inside* the letter instead of just filling the screen with the
 * whole word. Everything comes back in frame-local px with any transform GSAP
 * has put on the frame divided out, so it stays valid while the timeline scrubs.
 */
function measureLetterI(frame: HTMLDivElement): LetterMetrics | null {
  const span = frame.querySelector<HTMLSpanElement>("span");
  const textNode = span?.firstChild;
  if (!span || !textNode || textNode.nodeType !== Node.TEXT_NODE) return null;

  const text = textNode.textContent ?? "";
  const index = text.indexOf(TARGET_GLYPH);
  if (index < 0) return null;

  const style = getComputedStyle(span);
  const fontSize = parseFloat(style.fontSize);
  if (!fontSize) return null;

  // Where the glyph starts: a Range reports real layout, so clamp()ed font
  // sizes and letter-spacing are already baked in.
  const range = document.createRange();
  range.setStart(textNode, index);
  range.setEnd(textNode, index + 1);
  const glyphRect = range.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  const visualScale = frameRect.width / (frame.offsetWidth || 1) || 1;
  const toLocal = (value: number) => value / visualScale;
  const glyphLeft = toLocal(glyphRect.left - frameRect.left);
  const glyphTop = toLocal(glyphRect.top - frameRect.top);
  const glyphHeight = toLocal(glyphRect.height);

  // The glyph itself: draw it on a throwaway canvas with the exact same font and
  // read the pixels back, so we know how wide the stroke really is.
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(fontSize * 1.6);
  canvas.height = Math.ceil(fontSize * 2.4);
  const canvasCtx = canvas.getContext("2d");
  if (!canvasCtx) return null;

  canvasCtx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${cssFontFamilies(
    style.fontFamily
  )}`;
  canvasCtx.textAlign = "left";
  canvasCtx.textBaseline = "alphabetic";
  canvasCtx.fillStyle = "#ffffff";
  canvasCtx.fillText(TARGET_GLYPH, 0, Math.ceil(fontSize * 1.2));

  const pixels = canvasCtx.getImageData(0, 0, canvas.width, canvas.height).data;
  const isFilled = (x: number, y: number) => pixels[(y * canvas.width + x) * 4 + 3] > 40;

  let minX = canvas.width;
  let maxX = -1;
  let minY = canvas.height;
  let maxY = -1;
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      if (!isFilled(x, y)) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) return null; // nothing rendered — most likely the font isn't ready

  // The stroke = the columns that stay solid through the middle of the glyph.
  // The "I" also has top/bottom bars, which are wider but not full height, so
  // scaling until those cover the viewport would still leave gaps beside them.
  const bandTop = Math.round(minY + (maxY - minY) * 0.35);
  const bandBottom = Math.round(minY + (maxY - minY) * 0.65);
  let stemLeft = -1;
  let stemRight = -1;
  for (let x = minX; x <= maxX; x += 1) {
    let solid = true;
    for (let y = bandTop; y <= bandBottom; y += 1) {
      if (!isFilled(x, y)) {
        solid = false;
        break;
      }
    }
    if (solid) {
      if (stemLeft < 0) stemLeft = x;
      stemRight = x;
    }
  }
  if (stemLeft < 0) {
    // a font whose "I" has no bars at all — fall back to the whole ink box
    stemLeft = minX;
    stemRight = maxX;
  }

  return {
    x: glyphLeft + (stemLeft + stemRight + 1) / 2,
    // Vertically the cap sits on the line box's centre (±1px), which is plenty
    // precise here: at cover scale the stroke is ~10x taller than the viewport.
    y: glyphTop + glyphHeight / 2,
    stemWidth: Math.max(stemRight - stemLeft + 1, 1),
    inkHeight: Math.max(maxY - minY + 1, 1),
  };
}

export function useStoryToDashboardZoom({ storyRef, frameRef }: Options) {
  useLayoutEffect(() => {
    const story = storyRef.current;
    const frame = frameRef.current;
    if (!story || !frame) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(frame, { opacity: 1, scale: 1 });
      return;
    }

    let stopWatchingRefresh: (() => void) | null = null;
    let cancelled = false;

    const ctx = gsap.context(() => {
      // The scattered code chars live in a layer above this frame (z-index 50),
      // so they get faded out while we dive in — otherwise they'd sit on the white.
      const scatterLayer =
        story.parentElement?.querySelector<HTMLElement>("[data-code-scatter]") ?? null;

      // Aim the whole zoom at the middle of the "I" instead of the frame centre.
      const applyTransformOrigin = () => {
        const metrics = measureLetterI(frame);
        if (!metrics) return;
        gsap.set(frame, { transformOrigin: `${metrics.x}px ${metrics.y}px` });
      };
      applyTransformOrigin();

      // Font sizes are clamp()ed, so re-measure whenever ScrollTrigger re-reads the page.
      ScrollTrigger.addEventListener("refreshInit", applyTransformOrigin);
      stopWatchingRefresh = () =>
        ScrollTrigger.removeEventListener("refreshInit", applyTransformOrigin);

      // The scale at which the stroke of the "I" covers the viewport edge to edge.
      const coverScale = () => {
        const metrics = measureLetterI(frame);
        if (!metrics) {
          // no measurable "I" — keep the old behaviour and fill the screen with the word
          const rect = frame.getBoundingClientRect();
          return Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height) * 1.05;
        }
        return Math.max(
          window.innerWidth / metrics.stemWidth,
          window.innerHeight / metrics.inkHeight
        );
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top top", // exactly where the char-scatter timeline ends
          end: "+=120%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true, // re-read viewport size (and glyph metrics) on resize
        },
      });

      // Reveal the frame small and centered first...
      tl.to(frame, { opacity: 1, scale: 0.75, duration: 0.3, ease: "power1.out" }, 0)
        // ...then dive into the "I" until its stroke covers the screen...
        .to(
          frame,
          {
            scale: coverScale,
            borderRadius: 0,
            boxShadow: "none",
            duration: 0.6,
            ease: "power2.in",
          },
          0.3
        )
        // ...sink a little deeper so the view really sits inside the stroke...
        .to(frame, { scale: () => coverScale() * INSIDE, duration: 0.1, ease: "none" }, 0.9)
        // ...and land on a solid white frame, whatever the glyph metrics did.
        // (from a *white* transparent, so the alpha ramp can't tint the screen grey)
        .fromTo(
          frame,
          { backgroundColor: "rgba(255, 255, 255, 0)" },
          {
            backgroundColor: "rgba(255, 255, 255, 1)",
            duration: 0.1,
            ease: "none",
            immediateRender: false,
          },
          0.9
        );

      if (scatterLayer) {
        tl.to(scatterLayer, { opacity: 0, duration: 0.15, ease: "none" }, 0.7);
      }
    }, storyRef);

    // The web font can land after mount, which changes the metrics we measured.
    document.fonts?.ready.then(() => {
      if (cancelled) return;
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      stopWatchingRefresh?.();
      ctx.revert();
    };
  }, [storyRef, frameRef]);
}