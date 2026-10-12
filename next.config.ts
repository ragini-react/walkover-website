import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/**
 * The site is a static export (`next build` writes plain files to `out/`) so
 * it can be hosted on GitHub Pages or any static file server.
 *
 * BASE_PATH is the URL prefix the site is served under: empty for a domain
 * root (custom domain, USERNAME.github.io, local preview) or "/repo" for a
 * GitHub Pages project site. The deploy workflow sets it from
 * actions/configure-pages, so the same code builds for every target.
 */
function normaliseBasePath(value = ""): string {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "";
}

const basePath = normaliseBasePath(process.env.BASE_PATH);

// Security headers (nosniff, referrer policy, frame options, permissions
// policy, HSTS) used to be sent by `next start`. A static export has no server,
// and GitHub Pages cannot set custom response headers, so they now belong to
// whatever sits in front of the files (e.g. a CDN on the custom domain).

export default function config(phase: string): NextConfig {
  return {
    output: "export",
    // Emit about/index.html rather than about.html, so every route resolves on
    // any static host without rewrite rules.
    trailingSlash: true,
    basePath,
    // There is no image optimisation server in a static export.
    images: { unoptimized: true },
    // Exposes the normalised value to code that builds URLs next/link cannot
    // (next/image src strings, plain <a>, the web manifest). See lib/base-path.
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
    // `next build` with output: "export" always works in `.next` and writes to
    // `out/`, so a separate folder is only honoured for `next dev`. Start dev
    // with NEXT_DIST_DIR=.next-dev to build while it is running.
    ...(phase === PHASE_DEVELOPMENT_SERVER && { distDir: process.env.NEXT_DIST_DIR || ".next" }),
    poweredByHeader: false,
    // Hide the floating Next.js "N" badge in development.
    devIndicators: false,
  };
}
