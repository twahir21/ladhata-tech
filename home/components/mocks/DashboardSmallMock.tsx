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

export function DashboardSmallMock() {
  return (
    <div
      style={{
        width: "280px",
        height: "580px",
        borderRadius: "44px",
        border: `10px solid ${COLORS.night}`,
        background: COLORS.surface,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Dynamic Island */}
      <div
        style={{
          height: "36px",
          background: COLORS.night,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "28px",
            background: "#000",
            borderRadius: "20px",
          }}
        />
      </div>

      {/* Status Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.2rem 1.5rem 0",
          fontSize: "0.65rem",
          color: COLORS.paper,
          fontWeight: 600,
        }}
      >
        <span>9:41</span>
        <span style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
          <span>5G</span>
          <span>●●●</span>
        </span>
      </div>

      {/* Header */}
      <div style={{ padding: "0.5rem 1.25rem 0.6rem" }}>
        <div style={{ fontSize: "0.7rem", color: COLORS.muted }}>Habari,</div>
        <div
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: COLORS.paper,
            marginBottom: "0.6rem",
          }}
        >
          Dashibodi
        </div>

        {/* Compact nav */}
        <div
          style={{
            display: "flex",
            gap: "0.35rem",
            overflowX: "auto",
            paddingBottom: "0.25rem",
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <div
              key={item}
              style={{
                fontSize: "0.6rem",
                padding: "0.35rem 0.5rem",
                borderRadius: "6px",
                color: i === 0 ? COLORS.night : COLORS.muted,
                background: i === 0 ? COLORS.amber : "transparent",
                fontWeight: i === 0 ? 700 : 500,
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          padding: "0 1.25rem",
          marginBottom: "0.6rem",
        }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "0.5rem",
            }}
          >
            <div style={{ fontSize: "0.55rem", color: COLORS.muted }}>{s.label}</div>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: COLORS.paper,
                marginTop: "0.15rem",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: "0.55rem",
                color: s.delta.startsWith("+") ? COLORS.cyan : "#f7768e",
                marginTop: "0.1rem",
                fontWeight: 600,
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
          padding: "0.5rem",
          margin: "0 1.25rem 0.6rem",
          height: "90px",
          display: "flex",
          alignItems: "flex-end",
          gap: "0.35rem",
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          padding: "0 1.25rem",
        }}
      >
        {TABLE_ROWS.map((row) => (
          <div
            key={row.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.65rem",
              color: COLORS.paper,
              padding: "0.35rem 0.5rem",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "6px",
            }}
          >
            <span>{row.name}</span>
            <span style={{ color: COLORS.muted }}>{row.type}</span>
            <span
              style={{ color: row.status === "Active" ? COLORS.cyan : COLORS.amber, fontWeight: 600 }}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
