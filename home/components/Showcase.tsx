"use client";

import { forwardRef } from "react";
import { DashboardMock } from "./mocks/DashboardMock";
import { MobileMock } from "./mocks/MobileMock";
import { BackendMock } from "./mocks/BackendMock";
import { COLORS } from "@/const/colors";

interface Props {
  trackRef: React.RefObject<HTMLDivElement | null>;
}

// `card: true` marks the mocks that are full-bleed (they paint their own dark
// background across the whole panel), so they get inset + rounded on the white.
const PANELS = [
  { tag: "01 — WEB", title: "Dashibodi ya Simamia", card: true },
  { tag: "02 — MOBILE", title: "Programu ya mfanyabiashara", card: false },
  { tag: "03 — BACKEND", title: "Miundombinu inayotegemewa", card: true },
];

export const HorizontalShowcaseSection = forwardRef<HTMLElement, Props>(
  function HorizontalShowcaseSection({ trackRef }, ref) {
    return (
      <section
        ref={ref}
        id="showcase"
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          // continues the solid white the TWILE zoom lands on
          background: "#ffffff",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100%",
            width: "300vw", // 3 panels × 100vw
          }}
        >
          {[DashboardMock, MobileMock, BackendMock].map((Mock, i) => {
            const { tag, title, card } = PANELS[i];
            return (
              <div
                key={tag}
                style={{
                  width: "100vw",
                  height: "100%",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "clamp(1.25rem, 3vw, 2.5rem)",
                  gap: "clamp(0.9rem, 2vw, 1.5rem)",
                }}
              >
                {/* the mock floats as an inset card on the white background */}
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: card ? "18px" : 0,
                    overflow: card ? "hidden" : "visible",
                    boxShadow: card ? "0 24px 60px rgba(11, 15, 26, 0.16)" : "none",
                  }}
                >
                  <Mock />
                </div>

                {/* caption sits on the white now, so it has to be dark to stay readable */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: "0.75rem",
                      letterSpacing: "0.18em",
                      color: COLORS.night,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
                      color: COLORS.night,
                    }}
                  >
                    {title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
);