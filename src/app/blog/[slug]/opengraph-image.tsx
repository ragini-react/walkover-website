import { getPost, postCategories, posts } from "@/content";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Walkover blog article";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)!;
  return renderOg({ eyebrow: `Walkover blog · ${postCategories[post.category].label}`, title: post.title });
}
