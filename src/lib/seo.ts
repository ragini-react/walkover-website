import type { Metadata } from "next";
import { site } from "@/content/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
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
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} — ${site.name}`;
  // Defining openGraph replaces inherited images, so default to the site card.
  // Route-level opengraph-image files still take precedence where they exist.
  const images = [{ url: image ?? "/opengraph-image", width: 1200, height: 630, alt: title }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
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
