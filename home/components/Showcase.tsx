"use client";

import { forwardRef } from "react";
import { DashboardMock } from "./mocks/DashboardMock";
import { MobileMock } from "./mocks/MobileMock";
import { BackendMock } from "./mocks/BackendMock";
import { COLORS } from "@/const/colors";

interface Props {
  trackRef: React.RefObject<HTMLDivElement | null>;
}

const PANELS = [
  { tag: "01 — WEB", title: "Dashibodi ya Simamia" },
  { tag: "02 — MOBILE", title: "Programu ya mfanyabiashara" },
  { tag: "03 — BACKEND", title: "Miundombinu inayotegemewa" },
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
          background: COLORS.night,
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
          {[DashboardMock, MobileMock, BackendMock].map((Mock, i) => (
            <div
              key={PANELS[i].tag}
              style={{
                position: "relative",
                width: "100vw",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Mock />

              <div
                style={{
                  position: "absolute",
                  left: "clamp(1.5rem, 5vw, 4rem)",
                  bottom: "clamp(2rem, 6vw, 4rem)",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    color: COLORS.amber,
                    marginBottom: "0.5rem",
                  }}
                >
                  {PANELS[i].tag}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    color: COLORS.paper,
                  }}
                >
                  {PANELS[i].title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
);