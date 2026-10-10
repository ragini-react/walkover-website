import { ImageResponse } from "next/og";
import { DIE_BODY, DIE_PIPS, LOGO_RED } from "@/components/ui/logo-paths";
import { toSrgb } from "@/lib/color";

export const ogSize = { width: 1200, height: 630 };

/** Branded social card: ink board, die mark, eyebrow and title.
 *  Colours are OKLCH; toSrgb() converts them because next/og cannot read OKLCH. */
export function renderOg({
  eyebrow,
  title,
  accent = "oklch(57.77% 0.2148 29.08)",
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
          background: toSrgb("oklch(14% 0.0069 269.65)"),
          color: toSrgb("oklch(96.36% 0.0027 106.45)"),
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
                background: toSrgb(lit.has(i) ? accent : "oklch(100% 0 0 / 0.06)"),
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%" }}>
          <svg width="64" height="64" viewBox="-2 -2 58 58">
            <path d={DIE_BODY.d} fill={toSrgb(LOGO_RED)} />
            <path d={DIE_PIPS.d} fill={toSrgb("oklch(100% 0 0)")} />
          </svg>
          <div
            style={{
              marginTop: 40,
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: toSrgb("oklch(78.28% 0.0162 269.94)"),
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
