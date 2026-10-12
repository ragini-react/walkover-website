import type { Metadata } from "next";
import { site } from "@/content/site";

/** Absolute URL for a file or asset on the site origin ("/sitemap.xml",
 *  "/brand/walkover-logo.svg", ".../opengraph-image"). Use canonicalUrl for pages. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

/**
 * Canonical URL of a page: absolute, on the production origin, and in the
 * trailing-slash form the static export serves (next.config trailingSlash, so
 * "/about" redirects to "/about/"). Query strings and fragments are dropped:
 * no page on this site varies its content by query, and a fragment is never a
 * separate page. Repeated slashes from joined segments are collapsed.
 */
export function canonicalUrl(path = "/"): string {
  const url = new URL(path.replace(/\/{2,}/g, "/"), site.url);
  url.search = "";
  url.hash = "";
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.toString();
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is rather than appending the brand suffix. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  image?: string;
};

/** Single source of truth for per-page metadata: canonical, OG and Twitter. */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
  image,
}: PageMetaInput): Metadata {
  const url = canonicalUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} — ${site.name}`;
  // Defining openGraph replaces inherited images, so default to the site card.
  // Route-level opengraph-image files still take precedence where they exist.
  const images = [{ url: image ?? "/opengraph-image", width: 1200, height: 630, alt: title }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    // A noindex page gets no canonical: the two signals would contradict each other.
    alternates: noindex ? undefined : { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_IN",
      images,
      ...(type === "article" && { publishedTime, modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
