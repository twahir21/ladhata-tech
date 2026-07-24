"use client";

import { COLORS } from "@/const/colors";

const TX = [
  { name: "Mteja: John M.", amount: "+TZS 45,000", time: "10:24" },
  { name: "Ununuzi: Sukari", amount: "-TZS 12,000", time: "09:58" },
  { name: "Mteja: Fatuma K.", amount: "+TZS 78,500", time: "09:15" },
  { name: "Mchango VICOBA", amount: "+TZS 20,000", time: "08:40" },
];

export function MobileMock() {
  return (
    <div
      style={{
        width: "280px",
        height: "580px",
        borderRadius: "36px",
        border: `8px solid ${COLORS.night}`,
        background: COLORS.surface,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Status bar */}
      <div style={{ height: "28px", background: COLORS.night }} />

      {/* Header */}
      <div style={{ padding: "1.25rem 1.25rem 1rem" }}>
        <div style={{ fontSize: "0.7rem", color: COLORS.muted }}>Habari,</div>
        <div
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 600,
            fontSize: "1.1rem",
            color: COLORS.paper,
          }}
        >
          Duka la Amani
        </div>
        <div
          style={{
            marginTop: "0.9rem",
            background: `linear-gradient(135deg, ${COLORS.amber}, #ff8a4d)`,
            borderRadius: "14px",
            padding: "1rem",
          }}
        >
          <div style={{ fontSize: "0.65rem", color: COLORS.night, opacity: 0.75 }}>
            Salio la leo
          </div>
          <div
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "1.4rem",
              color: COLORS.night,
            }}
          >
            TZS 1,432,000
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div style={{ flex: 1, padding: "0 1.25rem", overflow: "hidden" }}>
        <div style={{ fontSize: "0.7rem", color: COLORS.muted, marginBottom: "0.5rem" }}>
          Miamala ya hivi karibuni
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {TX.map((t) => (
            <div
              key={t.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "10px",
                padding: "0.6rem 0.7rem",
              }}
            >
              <div>
                <div style={{ fontSize: "0.7rem", color: COLORS.paper }}>{t.name}</div>
                <div style={{ fontSize: "0.6rem", color: COLORS.muted }}>{t.time}</div>
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: t.amount.startsWith("+") ? COLORS.cyan : "#f7768e",
                }}
              >
                {t.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "0.9rem 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {["Nyumbani", "Mauzo", "Stoki", "Wasifu"].map((tab, i) => (
          <div
            key={tab}
            style={{
              fontSize: "0.6rem",
              color: i === 0 ? COLORS.amber : COLORS.muted,
              fontWeight: i === 0 ? 600 : 400,
            }}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}