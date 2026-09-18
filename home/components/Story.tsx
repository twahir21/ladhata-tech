"use client";

import { forwardRef } from "react";
import { COLORS } from "@/const/colors";

interface StoryProps {
  frameRef: React.RefObject<HTMLDivElement | null>;
}

export const StorySection = forwardRef<HTMLElement, StoryProps>(function StorySection(
  { frameRef },
  ref
) {
  return (
    <section
      ref={ref}
      id="sequence"
      style={{
        position: "relative",
        minHeight: "140vh",
        background: COLORS.surface,
        color: COLORS.paper,
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* scattered chars land here — layer is appended to rootRef by
          useCodeDropScatter, so nothing extra needed in this section for that */}

      <div
        ref={frameRef}
        style={{
          position: "relative",
          zIndex: 20,
          width: "60%",
          maxWidth: "760px",
          aspectRatio: "16 / 10",
          borderRadius: "20px",
          overflow: "hidden",
          transform: "scale(0.5)",
          opacity: 0,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 800,
            fontSize: "clamp(6rem, 16vw, 14rem)",
            color: "#ffffff",
            lineHeight: 1,
            userSelect: "none",
            letterSpacing: "-0.04em",
          }}
        >
          TWILE
        </span>
      </div>
    </section>
  );
});