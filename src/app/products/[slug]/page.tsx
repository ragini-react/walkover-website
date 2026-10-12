import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  brandPageProps,
  brandProps,
  families,
  getProduct,
  products,
} from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { ProductDemo } from "@/components/visuals/ProductDemo";
import { ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { softwareSchema } from "@/lib/schema";
import styles from "./product.module.scss";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return pageMeta({
    title: product.seo.title,
    absoluteTitle: true,
    description: product.seo.description,
    path: `/products/${product.slug}`,
    image: `/products/${product.slug}/opengraph-image`,
  });
}

const hostOf = (url: string) => new URL(url).host.replace(/^www\./, "");

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const fam = families[product.family];
  const connected = product.connections
    .map((c) => ({ ...c, product: getProduct(c.to) }))
    .filter((c) => c.product);
  // Products that declare a connection *to* this one, not already listed.
  const inbound = products
    .filter((p) => p.slug !== product.slug && !product.connections.some((c) => c.to === p.slug))
    .flatMap((p) => p.connections.filter((c) => c.to === product.slug).map((c) => ({ how: c.how, product: p })));
  const allConnections = [...connected, ...inbound];
  const site = hostOf(product.url);

  return (
    <div {...brandPageProps(product.brand)}>
      <PageHero
        tone="dark"
        accent
        crumbs={[
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ]}
        eyebrow={`${fam.label} · ${product.category}`}
        title={
          <>
            <span className={styles.name}>{product.name}</span>
            <span className={styles.tagline}>{product.tagline}</span>
          </>
        }
        lead={product.summary}
        actions={
          <>
            <ButtonLink href={product.url} variant="brand" size="lg" track={`product_visit_${product.slug}`}>
              Visit {site}
            </ButtonLink>
            <ButtonLink href={`/contact?interest=${product.slug}`} variant="secondary" size="lg" track={`product_contact_${product.slug}`}>
              Talk to us
            </ButtonLink>
          </>
        }
        aside={<ProductDemo kind={product.demo} label={`${product.name} · how it works`} />}
      />

      {/* The problem */}
      <section className="section" aria-labelledby="problem-title">
        <div className={`container ${styles.problem}`}>
          <p className="eyebrow" style={{ "--eyebrow-color": "var(--accent)" } as React.CSSProperties}>
            The problem
          </p>
          <h2 id="problem-title" className={`t-display ${styles.problemTitle}`} data-reveal>
            {product.problem.heading}
          </h2>
          <div className={styles.problemBody} data-reveal>
            <p>{product.problem.body}</p>
            <div className={styles.audience}>
              <h3 className="t-label t-muted">Built for</h3>
              <ul role="list">
                {product.audience.map((a) => (
                  <li key={a}>
                    <Icon name="check" size={16} strokeWidth={2.25} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={`section surface-dark ${styles.capSection}`} aria-labelledby="cap-title">
        <div className="container">
          <div className={styles.capHead} data-reveal>
            <p className="eyebrow" style={{ "--eyebrow-color": "var(--accent)" } as React.CSSProperties}>
              What it does
            </p>
            <h2 id="cap-title" className="t-h2">
              {product.capabilities.length} things {product.name} takes off your plate.
            </h2>
          </div>
          <ol role="list" className={styles.caps}>
            {product.capabilities.map((c, i) => (
              <li key={c.title} className={styles.cap} data-reveal style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <span className={styles.capNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h4">{c.title}</h3>
                <p>{c.body}</p>
              </li>
            ))}
          </ol>

          {product.modules && (
            <div className={styles.modules} data-reveal>
              {product.modules.map((m) => (
                <div key={m.group} className={styles.moduleGroup}>
                  <h3 className="t-label t-muted">{m.group}</h3>
                  <ul role="list" className={styles.moduleList}>
                    {m.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Use cases */}
      <section className="section" aria-labelledby="uses-title">
        <div className="container">
          <div className={styles.usesHead} data-reveal>
            <p className="eyebrow" style={{ "--eyebrow-color": "var(--accent)" } as React.CSSProperties}>
              In practice
            </p>
            <h2 id="uses-title" className="t-h2">
              Where teams use {product.name}
            </h2>
          </div>
          <ul role="list" className={styles.uses}>
            {product.useCases.map((u, i) => (
              <li key={u.title} className={styles.use} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <span className={styles.useIndex} aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <h3 className="t-h4">{u.title}</h3>
                <p>{u.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technical + trust + claims */}
      {(product.technical || product.trust || product.claims) && (
        <section className={`section-tight ${styles.specSection}`} aria-labelledby="spec-title">
          <div className="container">
            <h2 id="spec-title" className="sr-only">
              Technical details and trust
            </h2>
            {product.claims && (
              <div className={styles.claims} data-reveal>
                <dl className={styles.claimList}>
                  {product.claims.map((c) => (
                    <div key={c.label} className={styles.claim}>
                      <dt>{c.label}</dt>
                      <dd>{c.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className={styles.claimSource}>{product.claimsSource}</p>
              </div>
            )}
            <div className={styles.specs}>
              {product.technical && (
                <div className={styles.spec} data-reveal>
                  <h3 className="t-h4">Under the hood</h3>
                  <ul role="list">
                    {product.technical.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
              {product.trust && (
                <div className={styles.spec} data-reveal>
                  <h3 className="t-h4">Security & compliance</h3>
                  <ul role="list">
                    {product.trust.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <p className={styles.specNote}>As published by {product.name}. Ask the team for current reports.</p>
                </div>
              )}
              <div className={styles.spec} data-reveal>
                <h3 className="t-h4">Pricing</h3>
                <p>{product.pricingNote}</p>
                <Link href={product.url} className={styles.specLink} target="_blank" rel="noopener">
                  Current plans on {site}
                  <Icon name="arrowUpRight" size={15} strokeWidth={2} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Connections */}
      {allConnections.length > 0 && (
        <section className="section" aria-labelledby="connect-title">
          <div className="container">
            <div className={styles.usesHead} data-reveal>
              <p className="eyebrow" style={{ "--eyebrow-color": "var(--accent)" } as React.CSSProperties}>
                Better together
              </p>
              <h2 id="connect-title" className="t-h2">
                How {product.name} connects to the rest of Walkover
              </h2>
            </div>
            <ul role="list" className={styles.connections}>
              {allConnections.map(({ how, product: other }, i) => (
                <li key={other!.slug + how} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                  <Link
                    href={`/products/${other!.slug}`}
                    className={styles.connection}
                    {...brandProps(other!.brand)}
                  >
                    <span className={styles.connLink} aria-hidden="true">
                      <span className={styles.connA} />
                      <span className={styles.connLine} />
                      <span className={styles.connB} />
                    </span>
                    <span className={styles.connName}>{other!.name}</span>
                    <span className={styles.connHow}>{how}</span>
                    <Icon name="arrow" size={18} className={styles.connArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Faq items={product.faqs} title={`${product.name}, answered`} />



      <JsonLd data={softwareSchema(product)} />
    </div>
  );
}
