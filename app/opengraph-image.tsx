import { ImageResponse } from "next/og";

export const alt = "Cognimind — An AI co-worker for industrial distributors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f6",
          border: "1px solid rgba(26,24,21,0.12)",
          padding: "76px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#211e1a",
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
            <polygon
              points="20,3 35.5,11.75 35.5,28.25 20,37 4.5,28.25 4.5,11.75"
              stroke="#211e1a"
              strokeWidth="2"
            />
            <polygon
              points="20,10 28,14.6 28,25.4 20,30 12,25.4 12,14.6"
              stroke="#211e1a"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <circle cx="20" cy="18.5" r="2.4" fill="#211e1a" />
          </svg>
          Cognimind
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#1a1815",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            An AI co-worker for industrial distributors
          </div>
          <div style={{ marginTop: 26, fontSize: 34, color: "#45413a" }}>
            It takes the busywork. The decisions stay with your team.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 60,
              height: 6,
              background: "#211e1a",
              borderRadius: 3,
            }}
          />
          <div style={{ fontSize: 26, color: "#6f6a61" }}>cognimind.ai</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
