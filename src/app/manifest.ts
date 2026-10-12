import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { toSrgb } from "@/lib/color";
import { withBasePath } from "@/lib/base-path";

// Generated once at build time (required by the static export).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.legalName}`,
    short_name: site.name,
    description: site.description,
    start_url: withBasePath("/"),
    display: "browser",
    background_color: toSrgb("oklch(96.68% 0.0054 95.1)"),
    theme_color: toSrgb("oklch(57.77% 0.2148 29.08)"),
    icons: [
      { src: withBasePath("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: withBasePath("/apple-icon"), sizes: "180x180", type: "image/png" },
    ],
  };
}
