import { renderOg, ogSize } from "@/lib/og";

// Generated once at build time (required by the static export).
export const dynamic = "force-static";

export const alt = "Walkover — communication, automation and AI software";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Walkover · Since 2010", title: "Software that makes the hard part a walkover." });
}
