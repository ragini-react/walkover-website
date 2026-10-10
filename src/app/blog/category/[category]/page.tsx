import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { postCategories, posts } from "@/content";
import type { PostCategorySlug } from "@/content/types";
import { PageHero } from "@/components/sections/PageHero";
import { BlogListing } from "@/components/sections/BlogListing";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ category: string }> };

export const dynamicParams = false;

const isCategory = (c: string): c is PostCategorySlug => c in postCategories;

/** Only categories that actually contain articles get a page. */
export function generateStaticParams() {
  return [...new Set(posts.map((p) => p.category))].map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const c = postCategories[category];
  return pageMeta({
    title: `${c.label} articles`,
    description: `Walkover articles on ${c.label.toLowerCase()}: ${c.description} Practical guides from the teams behind MSG91, viaSocket and more.`,
    path: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const c = postCategories[category];
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: c.label, path: `/blog/category/${category}` },
        ]}
        eyebrow="Blog"
        title={c.label}
        lead={c.description}
      />
      <BlogListing category={category} />
    </>
  );
}
