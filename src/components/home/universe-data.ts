import { brandInk, families, products } from "@/content";
import type { UniverseProduct } from "./ProductUniverse";

/** Minimal product data for the interactive map (keeps the client payload small). */
export function universeItems(): UniverseProduct[] {
  return products.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    summary: p.summary,
    color: p.brand.color,
    ink: brandInk(p.brand),
    familyLabel: families[p.family].label,
    connections: p.connections,
  }));
}
