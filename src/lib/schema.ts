/**
 * JSON-LD builders. Only properties we can state truthfully are emitted:
 * no ratings, reviews, prices or offers.
 */
import { site } from "@/content/site";
import type { Faq, Post, Product } from "@/content/types";
import { absoluteUrl } from "./seo";

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/brand/walkover-logo.svg"),
    foundingDate: String(site.foundingYear),
    email: site.email,
    telephone: "+91-731-256-0056",
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
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
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

export function softwareSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.summary,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: product.category,
    operatingSystem: "Web",
    url: product.url,
    publisher: { "@id": orgId },
    featureList: product.capabilities.map((c) => c.title).join(", "),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: { "@id": orgId },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: "en",
  };
}

export function collectionSchema(name: string, path: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}
