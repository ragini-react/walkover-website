import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brandPageProps, brandProps, getProduct, getSolution, solutionBrand, solutions } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { WorkflowPath } from "@/components/visuals/WorkflowPath";
import { ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { pageMeta } from "@/lib/seo";
import styles from "../../detail.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  return pageMeta({ absoluteTitle: true, title: solution.seo.title, description: solution.seo.description, path: `/solutions/${solution.slug}` });
}

export default async function SolutionPage({ params }: Params) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();
  const primary = getProduct(solution.products[0].slug)!;

  return (
    <div {...brandPageProps(solutionBrand(solution))}>
      <PageHero
        accent
        crumbs={[
          { name: "Solutions", path: "/solutions" },
          { name: solution.name, path: `/solutions/${solution.slug}` },
        ]}
        eyebrow={solution.name}
        title={solution.headline}
        lead={solution.summary}
        actions={
          <>
            <ButtonLink href={`/products/${primary.slug}`} size="lg" track={`solution_product_${solution.slug}`}>
              Explore {primary.name}
            </ButtonLink>
            <ButtonLink href={`/contact?interest=${solution.slug}`} variant="secondary" size="lg">
              Talk to us
            </ButtonLink>
          </>
        }
        aside={<WorkflowPath steps={solution.workflow} title="How it flows" />}
      />

      <section className="section-tight" aria-labelledby="challenges-title">
        <div className={`container ${styles.split}`}>
          <div data-reveal>
            <p className="eyebrow" style={{ "--eyebrow-color": "var(--accent)" } as React.CSSProperties}>
              Sound familiar?
            </p>
            <h2 id="challenges-title" className="t-h2">
              What gets in the way
            </h2>
          </div>
          <ul role="list" className={styles.challenges}>
            {solution.challenges.map((c, i) => (
              <li key={c} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <span className={styles.challengeMark} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="approach-title">
        <div className="container">
          <div className={styles.head} data-reveal>
            <p className="eyebrow" style={{ "--eyebrow-color": "var(--accent)" } as React.CSSProperties}>
              Our approach
            </p>
            <h2 id="approach-title" className="t-h2">
              How Walkover solves it
            </h2>
          </div>
          <ol role="list" className={styles.approach}>
            {solution.approach.map((a, i) => (
              <li key={a.title} className={styles.approachItem} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                <span className={styles.approachNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3">{a.title}</h3>
                <p>{a.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="products-title">
        <div className="container">
          <div className={styles.head} data-reveal>
            <p className="eyebrow" style={{ "--eyebrow-color": "var(--accent)" } as React.CSSProperties}>
              The products involved
            </p>
            <h2 id="products-title" className="t-h2">
              Who does what
            </h2>
          </div>
          <ul role="list" className={styles.roles}>
            {solution.products.map((ref, i) => {
              const p = getProduct(ref.slug)!;
              return (
                <li key={p.slug} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                  <Link
                    href={`/products/${p.slug}`}
                    className={styles.role}
                    {...brandProps(p.brand)}
                    data-track="product_explore"
                    data-track-label={`solution_${solution.slug}_${p.slug}`}
                  >
                    <span className={styles.roleDot} aria-hidden="true" />
                    <span className={styles.roleName}>{p.name}</span>
                    <span className={styles.roleText}>{ref.role}</span>
                    <Icon name="arrow" size={18} className={styles.roleArrow} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Faq items={solution.faqs} />


    </div>
  );
}
