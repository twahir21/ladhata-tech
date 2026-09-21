"use client";

import { COLORS } from "@/const/colors";

const SERVICES = [
  { name: "auth-service", status: "healthy", latency: "42ms" },
  { name: "payments-gateway", status: "healthy", latency: "88ms" },
  { name: "sync-worker", status: "healthy", latency: "12ms" },
  { name: "vicoba-ledger", status: "degraded", latency: "310ms" },
  { name: "notifications", status: "healthy", latency: "56ms" },
];

const LOG_LINES = [
  "POST /api/v1/sales 201 created",
  "GET /api/v1/inventory 200 ok",
  "POST /api/v1/vicoba/contribute 201 created",
  "SYNC offline-queue → cleared 14 items",
  "POST /api/v1/payments/charge 200 ok",
];

export function BackendSmallMock() {
  return (
    <div
      style={{
        width: "280px",
        height: "580px",
        borderRadius: "44px",
        border: `10px solid ${COLORS.night}`,
        background: COLORS.night,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-jetbrains-mono), monospace",
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
        <div
          style={{
            fontSize: "0.7rem",
            color: COLORS.muted,
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
          }}
        >
          SERVICES · TZ-EAST
        </div>

        {/* Services */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "0.75rem" }}>
          {SERVICES.map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                padding: "0.5rem 0.65rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: s.status === "healthy" ? COLORS.cyan : COLORS.amber,
                  }}
                />
                <span style={{ fontSize: "0.65rem", color: COLORS.paper }}>{s.name}</span>
              </div>
              <span style={{ fontSize: "0.6rem", color: COLORS.muted }}>{s.latency}</span>
            </div>
          ))}
        </div>

        {/* Log stream */}
        <div
          style={{
            fontSize: "0.65rem",
            color: COLORS.muted,
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
          }}
        >
          LIVE REQUEST LOG
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            marginBottom: "0.6rem",
          }}
        >
          {LOG_LINES.map((line, i) => (
            <div key={i} style={{ fontSize: "0.65rem", color: COLORS.muted }}>
              <span style={{ color: COLORS.cyan }}>❯</span> {line}
            </div>
          ))}
        </div>

        {/* Uptime */}
        <div
          style={{
            padding: "0.6rem 0.75rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
          }}
        >
          <div style={{ fontSize: "0.6rem", color: COLORS.muted }}>Uptime (30 days)</div>
          <div
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: COLORS.paper,
              marginTop: "0.2rem",
            }}
          >
            99.94%
          </div>
        </div>
      </div>
    </div>
  );
}
