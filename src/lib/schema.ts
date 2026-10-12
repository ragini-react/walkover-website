/**
 * JSON-LD builders. Only properties we can state truthfully are emitted:
 * no ratings, reviews, prices or offers.
 *
 * Entities are linked by stable @ids: the Organization and WebSite live at
 * `${site.url}/#organization` and `/#website` (emitted once, by the root
 * layout); page-level nodes use their canonical URL plus a fragment.
 * Every page URL goes through canonicalUrl so it matches the canonical tag
 * and the sitemap.
 */
import { site } from "@/content/site";
import type { Faq, Post, Product } from "@/content/types";
import { absoluteUrl, canonicalUrl } from "./seo";

const homeUrl = canonicalUrl("/");
const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

/** Reference to the Walkover Organization node, with its name so a consumer
 *  that reads one script block alone still knows who it is. */
function orgRef() {
  return { "@type": "Organization", "@id": orgId, name: site.name, url: homeUrl };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: homeUrl,
    logo: absoluteUrl("/brand/walkover-logo.svg"),
    description: site.description,
    foundingDate: String(site.foundingYear),
    email: site.email,
    telephone: site.phone.href.replace(/^tel:/, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    sameAs: site.social.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: homeUrl,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

/** A page that is about Walkover itself (AboutPage) or how to reach it (ContactPage). */
export function webPageSchema({
  type,
  path,
  name,
  description,
}: {
  type: "AboutPage" | "ContactPage";
  path: string;
  name: string;
  description: string;
}) {
  const url = canonicalUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    inLanguage: "en",
  };
}

/** Items run from Home to the current page, which is always last. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const current = canonicalUrl(items[items.length - 1]?.path ?? "/");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${current}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * A Walkover product, described on its walkover.in page. `url` is the
 * product's own website (where the software is used); the walkover.in page
 * about it is `mainEntityOfPage`. No operatingSystem: several products also
 * ship mobile apps, so a single value would be wrong for some of them.
 */
export function softwareSchema(product: Product) {
  const page = canonicalUrl(`/products/${product.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${page}#software`,
    name: product.name,
    description: product.summary,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: product.category,
    url: product.url,
    mainEntityOfPage: page,
    image: absoluteUrl(product.logo),
    publisher: orgRef(),
    featureList: product.capabilities.map((c) => c.title).join(", "),
  };
}

export function articleSchema(post: Post) {
  const url = canonicalUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    // The byline shown on the page (e.g. "Walkover Editorial").
    author: { "@type": "Organization", name: post.author, url: homeUrl },
    publisher: orgRef(),
    isPartOf: { "@id": websiteId },
    inLanguage: "en",
  };
}

/** A listing page. Item paths may carry a #fragment pointing at an entry on a listing page. */
export function collectionSchema(name: string, path: string, items: { name: string; path: string }[]) {
  const url = canonicalUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    name,
    url,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => {
        const [itemPath, hash] = item.path.split("#");
        return {
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: canonicalUrl(itemPath) + (hash ? `#${hash}` : ""),
        };
      }),
    },
  };
}

/** Shared by pages that build their own article node (e.g. Our Story). */
export const schemaIds = { org: orgId, website: websiteId, orgRef };
