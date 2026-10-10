import type { Metadata } from "next";
import Link from "next/link";
import { brandProps, getProduct, solutionBrand, solutions } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { collectionSchema } from "@/lib/schema";
import styles from "../detail.module.css";

export const metadata: Metadata = pageMeta({
  title: "Walkover Solutions — Communication, Automation, AI & Finance",
  absoluteTitle: true,
  description:
    "Find the right Walkover software by problem: customer messaging, OTP verification, workflow automation, AI agents, support, GST accounting, docs and brand assets.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
        eyebrow="Solutions"
        title="Tell us what needs to happen. We will show you how."
        lead="Every solution below starts from a real business problem and shows which Walkover products solve it, and how they work together."
      />
      <section className="section-tight" aria-label="All solutions">
        <div className="container">
          <ul role="list" className={styles.indexList}>
            {solutions.map((s, i) => (
              <li key={s.slug} data-reveal style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as React.CSSProperties}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className={styles.indexRow}
                  {...brandProps(solutionBrand(s))}
                  data-track="solution_explore"
                  data-track-label={s.slug}
                >
                  <span className={styles.indexNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className={styles.indexName}>{s.name}</h2>
                  <span className={styles.indexText}>
                    {s.summary}
                    <span className={styles.indexMeta}>
                      {s.products.map((p) => getProduct(p.slug)?.name).join(" · ")}
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
          "Walkover solutions",
          "/solutions",
          solutions.map((s) => ({ name: s.name, path: `/solutions/${s.slug}` })),
        )}
      />
    </>
  );
}
