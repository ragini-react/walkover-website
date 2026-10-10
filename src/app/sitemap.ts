import type { MetadataRoute } from "next";
import { industries, posts, products, solutions } from "@/content";
import { eventOwners, eventsFor } from "@/content/events";
import { absoluteUrl } from "@/lib/seo";

/** Every indexable route. Detail pages are generated from content, so new
 *  products, solutions or articles are included automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts[0]?.updated ?? posts[0]?.published;
  const entry = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    priority,
    ...(lastModified && { lastModified }),
  });

  const categories = [...new Set(posts.map((p) => p.category))];

  return [
    entry("/", 1),
    entry("/products", 0.9),
    ...products.map((p) => entry(`/products/${p.slug}`, 0.9)),
    entry("/solutions", 0.8),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`, 0.8)),
    entry("/industries", 0.7),
    ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7)),
    entry("/about", 0.7),
    entry("/our-story", 0.7),
    entry("/events", 0.6),
    ...eventOwners.filter((o) => eventsFor(o).length).map((o) => entry(`/events/${o}`, 0.5)),
    entry("/careers", 0.7),
    entry("/contact", 0.6),
    entry("/resources", 0.6),
    entry("/blog", 0.7, latestPost),
    ...categories.map((c) => entry(`/blog/category/${c}`, 0.4)),
    ...posts.map((p) => entry(`/blog/${p.slug}`, 0.6, p.updated ?? p.published)),
    entry("/privacy", 0.2),
  ];
}
