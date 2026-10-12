import Link from "next/link";
import { postCategories, posts as allPosts } from "@/content";
import type { PostCategorySlug } from "@/content/types";
import { PostCard } from "./Cards";
import styles from "@/app/listing.module.scss";

/** Blog index body: category filters (real links, crawlable) and cards. */
export function BlogListing({ category }: { category?: PostCategorySlug }) {
  const list = category ? allPosts.filter((p) => p.category === category) : allPosts;
  const used = new Set(allPosts.map((p) => p.category));
  return (
    <section className="section-tight" aria-label="Articles">
      <div className="container">
        <nav aria-label="Blog categories">
          <ul role="list" className={styles.filters}>
            <li>
              <Link href="/blog" className={styles.filter} aria-current={!category ? "page" : undefined}>
                All
              </Link>
            </li>
            {(Object.keys(postCategories) as PostCategorySlug[])
              .filter((c) => used.has(c))
              .map((c) => (
                <li key={c}>
                  <Link
                    href={`/blog/category/${c}`}
                    className={styles.filter}
                    aria-current={category === c ? "page" : undefined}
                  >
                    {postCategories[c].label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        {list.length ? (
          <div className={styles.grid}>
            {list.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No articles in this category yet.</p>
        )}
      </div>
    </section>
  );
}
