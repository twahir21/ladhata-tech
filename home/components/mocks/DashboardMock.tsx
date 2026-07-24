"use client";

import { COLORS } from "@/const/colors";

const NAV_ITEMS = ["Dashibodi", "Mauzo", "Stoki", "VICOBA", "Ripoti", "Mipangilio"];
const STATS = [
  { label: "Mauzo ya leo", value: "TZS 1.4M", delta: "+12%" },
  { label: "Wateja wapya", value: "38", delta: "+4%" },
  { label: "Bidhaa stoki", value: "612", delta: "-2%" },
];
const BARS = [40, 65, 50, 80, 55, 90, 70];
const TABLE_ROWS = [
  { name: "Duka la Amani", type: "Simamia", status: "Active" },
  { name: "Kikundi cha Umoja", type: "VICOBA", status: "Active" },
  { name: "Shule ya Tumaini", type: "Malipo", status: "Pending" },
];

export function DashboardMock() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: COLORS.surface,
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "22%",
          minWidth: "140px",
          background: COLORS.night,
          padding: "1.25rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: COLORS.paper,
            marginBottom: "1rem",
          }}
        >
          Simamia
        </div>
        {NAV_ITEMS.map((item, i) => (
          <div
            key={item}
            style={{
              fontSize: "0.7rem",
              padding: "0.5rem 0.6rem",
              borderRadius: "8px",
              color: i === 0 ? COLORS.night : COLORS.muted,
              background: i === 0 ? COLORS.amber : "transparent",
              fontWeight: i === 0 ? 600 : 400,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "1.25rem 1.5rem", overflow: "hidden" }}>
        {/* Stat cards */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "0.75rem",
              }}
            >
              <div style={{ fontSize: "0.65rem", color: COLORS.muted }}>{s.label}</div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: COLORS.paper,
                  marginTop: "0.25rem",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: s.delta.startsWith("+") ? COLORS.cyan : "#f7768e",
                  marginTop: "0.2rem",
                }}
              >
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "0.75rem",
            marginBottom: "1.25rem",
            height: "35%",
            display: "flex",
            alignItems: "flex-end",
            gap: "0.5rem",
          }}
        >
          {BARS.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                background: i === BARS.length - 2 ? COLORS.amber : COLORS.cyan,
                opacity: i === BARS.length - 2 ? 1 : 0.5,
                borderRadius: "3px 3px 0 0",
              }}
            />
          ))}
        </div>

        {/* Table */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {TABLE_ROWS.map((row) => (
            <div
              key={row.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.7rem",
                color: COLORS.paper,
                padding: "0.4rem 0.6rem",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "6px",
              }}
            >
              <span>{row.name}</span>
              <span style={{ color: COLORS.muted }}>{row.type}</span>
              <span style={{ color: row.status === "Active" ? COLORS.cyan : COLORS.amber }}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}