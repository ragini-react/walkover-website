import { ImageResponse } from "next/og";
import { DIE_BODY, DIE_PIPS, LOGO_RED } from "@/components/ui/logo-paths";

export const ogSize = { width: 1200, height: 630 };

/** Branded social card: ink board, die mark, eyebrow and title. */
export function renderOg({
  eyebrow,
  title,
  accent = "#dc281e",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  const cells = Array.from({ length: 6 * 10 }, (_, i) => i);
  const lit = new Set([3, 14, 25, 26, 37, 48]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#08090c",
          color: "#f3f3f1",
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 56,
            top: 56,
            display: "flex",
            flexWrap: "wrap",
            width: 10 * 34,
            gap: 6,
          }}
        >
          {cells.map((i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: lit.has(i) ? accent : "rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%" }}>
          <svg width="64" height="64" viewBox="-2 -2 58 58">
            <path d={DIE_BODY.d} fill={LOGO_RED} />
            <path d={DIE_PIPS.d} fill="#fff" />
          </svg>
          <div
            style={{
              marginTop: 40,
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#b4b8c3",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
