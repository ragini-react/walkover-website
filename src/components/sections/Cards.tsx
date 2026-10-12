import Link from "next/link";
import { brandProps, families, postCategories } from "@/content";
import type { Post, Product } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { ProductLogo } from "@/components/ui/ProductLogo";
import styles from "./Cards.module.scss";

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** `launch` is the product's place in launch order (1 = built first), shown beside its family. */
export function ProductCard({
  product,
  note,
  index = 0,
  launch,
}: {
  product: Product;
  note?: string;
  index?: number;
  launch?: number;
}) {
  const fam = families[product.family];
  return (
    <div data-reveal className={styles.cell} style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}>
    <Link
      href={`/products/${product.slug}`}
      className={styles.product}
      {...brandProps(product.brand)}
      data-track="product_explore"
      data-track-label={product.slug}
    >
      <span className={styles.productTop}>
        <ProductLogo product={product} className={styles.badge} />
        <span className={styles.productFamily}>
          {launch !== undefined && (
            <>
              <span className="sr-only">Launch order {launch}, </span>
              <span aria-hidden="true">{String(launch).padStart(2, "0")} · </span>
            </>
          )}
          {fam.label}
        </span>
      </span>
      <span className={styles.productName}>{product.name}</span>
      <span className={styles.productCategory}>{product.category}</span>
      <span className={styles.productText}>{note ?? product.tagline}</span>
      <span className={styles.more}>
        Explore {product.name} <Icon name="arrow" size={16} strokeWidth={2} />
      </span>
    </Link>
    </div>
  );
}

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <div data-reveal className={styles.cell} style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}>
    <Link
      href={`/blog/${post.slug}`}
      className={styles.post}
      data-track="resource_click"
      data-track-label={post.slug}
    >
      <span className={styles.postMeta}>
        <span>{postCategories[post.category].label}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.published}>{formatDate(post.published)}</time>
      </span>
      <span className={styles.postTitle}>{post.title}</span>
      <span className={styles.postText}>{post.description}</span>
      <span className={styles.more}>
        Read · {post.readingMinutes} min <Icon name="arrow" size={16} strokeWidth={2} />
      </span>
    </Link>
    </div>
  );
}
