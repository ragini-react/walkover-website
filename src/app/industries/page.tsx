import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, industries, inLaunchOrder } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { collectionSchema } from "@/lib/schema";
import styles from "../detail.module.scss";

export const metadata: Metadata = pageMeta({
  title: "Industries Walkover Serves — SaaS, E-commerce, Fintech & More",
  absoluteTitle: true,
  description:
    "How Walkover's communication, automation, AI and accounting software serves SaaS, e-commerce, financial services, healthcare, education and manufacturing.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }]}
        eyebrow="Industries"
        title="The same building blocks, arranged for how your industry runs."
        lead="We only list industries our products explicitly serve today. Each page shows the problems we see there and the workflows that solve them."
      />
      <section className="section-tight" aria-label="All industries">
        <div className="container">
          <ul role="list" className={styles.indexList}>
            {industries.map((ind, i) => (
              <li key={ind.slug} data-reveal style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as React.CSSProperties}>
                <Link href={`/industries/${ind.slug}`} className={styles.indexRow}>
                  <span className={styles.indexNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className={styles.indexName}>{ind.name}</h2>
                  <span className={styles.indexText}>
                    {ind.headline}
                    <span className={styles.indexMeta}>
                      {inLaunchOrder(ind.products).map((p) => getProduct(p.slug)?.name).join(" · ")}
                    </span>
                  </span>
                  <span className={styles.indexArrow} aria-hidden="true">
                    <Icon name="arrow" size={20} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd
        data={collectionSchema(
          "Industries Walkover serves",
          "/industries",
          industries.map((i) => ({ name: i.name, path: `/industries/${i.slug}` })),
        )}
      />
    </>
  );
}
