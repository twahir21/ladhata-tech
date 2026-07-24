"use client";

import { forwardRef } from "react";
import { DashboardMock } from "./DashboardMock";

const COLORS = {
  night: "#0B0F1A",
  surface: "#131A2B",
  amber: "#FFB84D",
  cyan: "#4DD0E1",
  paper: "#F4F1EA",
  muted: "#7C8598",
};

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
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          transform: "scale(0.5)",
          opacity: 0,
        }}
      >
        <DashboardMock />
      </div>
    </section>
  );
});