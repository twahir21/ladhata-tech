"use client";

const COLORS = {
  night: "#0B0F1A",
  surface: "#131A2B",
  amber: "#FFB84D",
  cyan: "#4DD0E1",
  paper: "#F4F1EA",
  muted: "#7C8598",
};

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

export function BackendMock() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: COLORS.night,
        fontFamily: "var(--font-jetbrains-mono), monospace",
      }}
    >
      {/* Services panel */}
      <div style={{ width: "38%", padding: "1.5rem", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: "0.7rem", color: COLORS.muted, marginBottom: "1rem", letterSpacing: "0.08em" }}>
          SERVICES · TZ-EAST
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
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
                padding: "0.6rem 0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: s.status === "healthy" ? COLORS.cyan : COLORS.amber,
                  }}
                />
                <span style={{ fontSize: "0.72rem", color: COLORS.paper }}>{s.name}</span>
              </div>
              <span style={{ fontSize: "0.65rem", color: COLORS.muted }}>{s.latency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Log stream panel */}
      <div style={{ flex: 1, padding: "1.5rem" }}>
        <div style={{ fontSize: "0.7rem", color: COLORS.muted, marginBottom: "1rem", letterSpacing: "0.08em" }}>
          LIVE REQUEST LOG
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {LOG_LINES.map((line, i) => (
            <div key={i} style={{ fontSize: "0.72rem", color: COLORS.muted }}>
              <span style={{ color: COLORS.cyan }}>❯</span> {line}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
          }}
        >
          <div style={{ fontSize: "0.65rem", color: COLORS.muted }}>Uptime (30 days)</div>
          <div
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: COLORS.paper,
              marginTop: "0.25rem",
            }}
          >
            99.94%
          </div>
        </div>
      </div>
    </div>
  );
}