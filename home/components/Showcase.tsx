"use client";

import { forwardRef, useEffect, useState } from "react";
import { DashboardMock } from "./mocks/DashboardMock";
import { DashboardSmallMock } from "./mocks/DashboardSmallMock";
import { MobileMock } from "./mocks/MobileMock";
import { BackendMock } from "./mocks/BackendMock";
import { BackendSmallMock } from "./mocks/BackendSmallMock";
import { COLORS } from "@/const/colors";

interface Props {
  trackRef: React.RefObject<HTMLDivElement | null>;
}

const PANELS_LARGE = [
  { tag: "01 — WEB", title: "Dashibodi ya Simamia", card: true, Mock: DashboardMock },
  { tag: "02 — MOBILE", title: "Programu ya mfanyabiashara", card: false, Mock: MobileMock },
  { tag: "03 — BACKEND", title: "Miundombinu inayotegemewa", card: true, Mock: BackendMock },
];

const PANELS_SMALL = [
  { tag: "01 — WEB", title: "Dashibodi ya Simamia", card: false, Mock: DashboardSmallMock },
  { tag: "02 — MOBILE", title: "Programu ya mfanyabiashara", card: false, Mock: MobileMock },
  { tag: "03 — BACKEND", title: "Miundombinu inayotegemewa", card: false, Mock: BackendSmallMock },
];

export const HorizontalShowcaseSection = forwardRef<HTMLElement, Props>(
  function HorizontalShowcaseSection({ trackRef }, ref) {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
      const mq = window.matchMedia("(max-width: 768px)");
      setIsSmall(mq.matches);
      const handler = (event: MediaQueryListEvent) => setIsSmall(event.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }, []);

    const panels = isSmall ? PANELS_SMALL : PANELS_LARGE;

    return (
      <section
        ref={ref}
        id="showcase"
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100%",
            width: `${panels.length * 100}vw`,
          }}
        >
          {panels.map(({ tag, title, card, Mock }) => {
            const isDashboard = Mock === DashboardMock || Mock === DashboardSmallMock;
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
                {isDashboard && (
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      color: COLORS.night,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {title}
                  </div>
                )}

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
