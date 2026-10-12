import { ImageResponse } from "next/og";
import { DIE_BODY, DIE_PIPS, LOGO_RED } from "@/components/ui/logo-paths";
import { toSrgb } from "@/lib/color";

// Generated once at build time (required by the static export).
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: toSrgb("oklch(96.68% 0.0054 95.1)") }}>
        <svg width="128" height="128" viewBox="-2 -2 58 58">
          <path d={DIE_BODY.d} fill={toSrgb(LOGO_RED)} />
          <path d={DIE_PIPS.d} fill={toSrgb("oklch(100% 0 0)")} />
        </svg>
      </div>
    ),
    size,
  );
}
