/** URL prefix the site is deployed under: "" at a domain root, "/repo" for a
 *  GitHub Pages project site. Set at build time from BASE_PATH (next.config.ts). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a root-relative URL with the base path. next/link, metadata files
 *  and /_next assets get it automatically; next/image src strings, plain <a>
 *  tags and the web manifest do not. */
export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
