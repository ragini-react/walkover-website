import { families, ProductCount, products } from "@/content";
import { companyNav, resourceNav } from "@/content/site";

export type MenuItem = {
  label: string;
  href: string;
  description?: string;
  /** Product logo path, shown before the label. Only products have one. */
  logo?: string;
};
export type MenuSection = {
  /** Brand colours shown on the feature card's mini board. */
  featureColors?: string[];
  id: string;
  label: string;
  href: string;
  intro: string;
  groups: { title: string; items: MenuItem[] }[];
  feature?: { title: string; body: string; href: string; cta: string };
};

/** Navigation tree, derived from content so new entries appear automatically. */
export function buildNav(): MenuSection[] {
  const productGroups = (Object.keys(families) as (keyof typeof families)[]).map((f) => ({
    title: families[f].label,
    items: products
      .filter((p) => p.family === f)
      .map((p) => ({
        label: p.name,
        href: `/products/${p.slug}`,
        description: p.category,
        logo: p.logo,
      })),
  }));

  return [
    {
      id: "products",
      label: "Products",
      href: "/products",
      intro: `${ProductCount} products. One connected system.`,
      groups: productGroups,
      featureColors: products.map((p) => p.brand.color),
      feature: {
        title: "Better together",
        body: "See how messages, workflows, agents and docs connect across the Walkover ecosystem.",
        href: "/products",
        cta: "Explore all products",
      },
    },
    {
      id: "resources",
      label: "Resources",
      href: "/resources",
      intro: "Guides and notes from the teams who build the products.",
      groups: [{ title: "Learn", items: resourceNav }],
    },
    {
      id: "company",
      label: "Company",
      href: "/about",
      intro: "Built in Indore since 2010.",
      groups: [{ title: "Company", items: companyNav }],
    },
  ];
}
