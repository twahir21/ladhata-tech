"use client";

import { forwardRef } from "react";

const COLORS = {
  night: "#0B0F1A",
  paper: "#F4F1EA",
};

export const DashboardSection = forwardRef<HTMLElement>(function DashboardSection(_props, ref) {
  return (
    <section
      ref={ref}
      id="dashboard"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: COLORS.night,
        color: COLORS.paper,
      }}
    >
    </section>
  );
});