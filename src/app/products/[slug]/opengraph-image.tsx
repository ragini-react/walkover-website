import { getProduct, products } from "@/content";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Walkover product";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug)!;
  return renderOg({ eyebrow: `${p.name} · by Walkover`, title: p.tagline, accent: p.brand.color });
}
