import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brandProps, getPost, postCategories, posts, resolve, products } from "@/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PostBody } from "@/components/sections/PostBody";
import { formatDate } from "@/components/sections/Cards";
import { pageMeta } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import styles from "./article.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: `/blog/${post.slug}/opengraph-image`,
    type: "article",
    publishedTime: post.published,
    modifiedTime: post.updated ?? post.published,
  });
}

export default async function ArticlePage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const category = postCategories[post.category];
  const toc = post.body.filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2");
  const mentioned = resolve(products, post.products);

  return (
    <>
      <div className={styles.progress} aria-hidden="true" />
      <article>
        <header className={styles.header}>
          <div className="container">
            <Breadcrumbs
              items={[
                { name: "Blog", path: "/blog" },
                { name: category.label, path: `/blog/category/${post.category}` },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />
            <h1 className={`t-h1 ${styles.title}`}>{post.title}</h1>
            <p className={`t-lead ${styles.lead}`}>{post.description}</p>
            <dl className={styles.meta}>
              <div>
                <dt>Written by</dt>
                <dd>{post.author}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>
                  <time dateTime={post.published}>{formatDate(post.published)}</time>
                </dd>
              </div>
              {post.updated && (
                <div>
                  <dt>Updated</dt>
                  <dd>
                    <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </dd>
                </div>
              )}
              <div>
                <dt>Reading time</dt>
                <dd>{post.readingMinutes} min</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className={`container ${styles.layout}`}>
          <div className={styles.side}>
            {toc.length > 2 && (
              <nav aria-label="On this page" className={styles.toc}>
                <p className="t-label t-muted">On this page</p>
                <ol role="list">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
          <div className={styles.body}>
            <PostBody blocks={post.body} />

            {mentioned.length > 0 && (
              <section className={styles.mentioned} aria-labelledby="mentioned-title">
                <p id="mentioned-title" className="t-label t-muted">
                  Mentioned in this article
                </p>
                <ul role="list">
                  {mentioned.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        className={styles.mention}
                        {...brandProps(p.brand)}
                        data-track="product_explore"
                        data-track-label={`article_${post.slug}_${p.slug}`}
                      >
                        <span className={styles.mentionDot} aria-hidden="true" />
                        <span>
                          <span className={styles.mentionName}>{p.name}</span>
                          <span className={styles.mentionText}>{p.category}</span>
                        </span>
                        <Icon name="arrow" size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      {post.faqs && <Faq items={post.faqs} title="Common questions" />}


      <JsonLd data={articleSchema(post)} />
    </>
  );
}
