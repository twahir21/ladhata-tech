"use client";

import { COLORS } from "@/const/colors";
import { forwardRef } from "react";

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