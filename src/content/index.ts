import { products } from "./products";
import { solutions } from "./solutions";
import { industries } from "./industries";
import { posts } from "./posts";
import { toSrgb } from "@/lib/color";
import type { Brand, Family, PostCategorySlug, ProductSlug, Solution, SolutionSlug } from "./types";

export { products, solutions, industries, posts };

/** Family metadata, used to label what each product is for. */
export const families: Record<Family, { label: string; description: string }> = {
  communicate: { label: "Communicate", description: "Reach, verify and support customers" },
  automate: { label: "Automate", description: "Connect apps and run processes" },
  intelligence: { label: "Intelligence", description: "Agents that understand and act" },
  operate: { label: "Operate", description: "Run finance and knowledge" },
  create: { label: "Create", description: "Make, upload and share images" },
  build: { label: "Build", description: "Host and ship the apps you make" },
};

const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

/** The product count as a word ("eight"), so copy stays right as the catalogue grows. */
export const productCount = numberWords[products.length] ?? String(products.length);
export const ProductCount = productCount.charAt(0).toUpperCase() + productCount.slice(1);

/** Relative luminance (WCAG) of a #rrggbb colour. */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Text colour for content sitting on a brand-coloured fill: white or ink,
 *  whichever has the higher contrast against that exact colour. */
export function brandInk(brand: Brand): string {
  const l = luminance(toSrgb(brand.color));
  const onWhite = 1.05 / (l + 0.05);
  const onInk = (l + 0.05) / 0.0545;
  return onWhite >= onInk ? "var(--white)" : "var(--ink-950)";
}

/** Inline style + attribute that paint an element in a product's brand
 *  colour (exposed to CSS as --c). */
export function brandProps(brand: Brand) {
  return {
    "data-brand": "",
    style: { "--c": brand.color, "--c-ink": brandInk(brand) } as React.CSSProperties,
  };
}

/** Sets the page-level --accent to a product's brand colour. */
export function brandPageProps(brand: Brand) {
  return {
    "data-brand-page": "",
    style: { "--accent": brand.color, "--accent-ink": brandInk(brand) } as React.CSSProperties,
  };
}

/** A solution takes the brand of the product that leads it. */
export function solutionBrand(solution: Solution): Brand {
  return bySlug(products, solution.products[0].slug)!.brand;
}

export const postCategories: Record<PostCategorySlug, { label: string; description: string }> = {
  communication: {
    label: "Communication",
    description: "Messaging, verification and customer conversations.",
  },
  automation: {
    label: "Automation",
    description: "Workflows, integrations and getting work done between apps.",
  },
  ai: { label: "AI", description: "Agents, retrieval and the protocols that connect them." },
  "finance-operations": {
    label: "Finance operations",
    description: "Accounting, reconciliation and compliance.",
  },
  documentation: {
    label: "Documentation",
    description: "Knowledge bases, help centres and docs people read.",
  },
};

function bySlug<T extends { slug: string }>(list: T[], slug: string): T | undefined {
  return list.find((item) => item.slug === slug);
}

export const getProduct = (slug: string) => bySlug(products, slug);
export const getSolution = (slug: string) => bySlug(solutions, slug);
export const getIndustry = (slug: string) => bySlug(industries, slug);
export const getPost = (slug: string) => bySlug(posts, slug);

/** Resolve slug references, silently dropping unknown ones. */
export function resolve<S extends string, T extends { slug: string }>(
  list: T[],
  slugs: readonly S[],
): T[] {
  return slugs.map((s) => bySlug(list, s)).filter((x): x is T => Boolean(x));
}

/** Product references sorted into launch order (the order of `products`).
 *  Solutions and industries list their products by role, lead first; this is
 *  for displaying those lists, so products always appear in the same sequence. */
export function inLaunchOrder<T extends { slug: ProductSlug }>(refs: readonly T[]): T[] {
  const rank = (slug: ProductSlug) => products.findIndex((p) => p.slug === slug);
  return [...refs].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export const postsForProduct = (slug: ProductSlug) =>
  posts.filter((p) => p.products.includes(slug));
export const postsForSolution = (slug: SolutionSlug) =>
  posts.filter((p) => p.solutions.includes(slug));

/** Related posts: shared solutions first, then shared category. */
export function relatedPosts(slug: string, limit = 3) {
  const post = getPost(slug);
  if (!post) return [];
  const score = (p: (typeof posts)[number]) =>
    p.solutions.filter((s) => post.solutions.includes(s)).length * 2 +
    p.products.filter((s) => post.products.includes(s)).length +
    (p.category === post.category ? 1 : 0);
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}
