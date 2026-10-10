import { ImageResponse } from "next/og";
import { DIE_BODY, DIE_PIPS, LOGO_RED } from "@/components/ui/logo-paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f4f0" }}>
        <svg width="128" height="128" viewBox="-2 -2 58 58">
          <path d={DIE_BODY.d} fill={LOGO_RED} />
          <path d={DIE_PIPS.d} fill="#fff" />
        </svg>
      </div>
    ),
    size,
  );
}
