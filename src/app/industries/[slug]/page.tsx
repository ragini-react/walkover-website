import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brandProps, getIndustry, getProduct, industries } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { WorkflowPath } from "@/components/visuals/WorkflowPath";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { pageMeta } from "@/lib/seo";
import styles from "../../detail.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};
  return pageMeta({ absoluteTitle: true, title: industry.seo.title, description: industry.seo.description, path: `/industries/${industry.slug}` });
}

export default async function IndustryPage({ params }: Params) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();
  const accent = "var(--signal)";

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
        eyebrow={industry.name}
        title={industry.headline}
        lead={industry.summary}
        actions={
          <ButtonLink href={`/contact?interest=${industry.slug}`} size="lg">
            Talk to us about {industry.name.toLowerCase()}
          </ButtonLink>
        }
        aside={<WorkflowPath steps={industry.workflows[0].steps} accent={accent} title={industry.workflows[0].title} />}
      />

      <section className="section-tight" aria-labelledby="ind-challenges">
        <div className="container">
          <div className={styles.head} data-reveal>
            <p className="eyebrow">The challenges</p>
            <h2 id="ind-challenges" className="t-h2">
              What we hear from {industry.name.toLowerCase()} teams
            </h2>
          </div>
          <ul role="list" className={styles.cards}>
            {industry.challenges.map((c, i) => (
              <li key={c.title} className={styles.card} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                <h3 className="t-h4">{c.title}</h3>
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="ind-products">
        <div className="container">
          <div className={styles.head} data-reveal>
            <p className="eyebrow">The toolkit</p>
            <h2 id="ind-products" className="t-h2">
              Products that fit
            </h2>
          </div>
          <ul role="list" className={styles.roles}>
            {industry.products.map((ref, i) => {
              const p = getProduct(ref.slug)!;
              return (
                <li key={p.slug} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                  <Link
                    href={`/products/${p.slug}`}
                    className={styles.role}
                    {...brandProps(p.brand)}
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
          <p className={styles.basis}>Why this industry: {industry.basis}</p>
        </div>
      </section>

      {industry.workflows.length > 1 && (
        <section className="section-tight" aria-labelledby="ind-workflows">
          <div className="container">
            <div className={styles.head} data-reveal>
              <p className="eyebrow">Workflows</p>
              <h2 id="ind-workflows" className="t-h2">
                How it fits together
              </h2>
            </div>
            <div className={styles.workflows}>
              {industry.workflows.map((w) => (
                <WorkflowPath key={w.title} steps={w.steps} accent={accent} title={w.title} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
