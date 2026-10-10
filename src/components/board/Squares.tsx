import Link from "next/link";
import { brandInk, getProduct, industries, postCategories, posts, ProductCount, productCount, products } from "@/content";
import { careers, principles, timeline, values } from "@/content/company";
import { site } from "@/content/site";
import type { Product } from "@/content/types";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Magnetic } from "@/components/motion/Magnetic";
import { Problems } from "@/components/home/Problems";
import { formatDate } from "@/components/sections/Cards";
import s from "./Squares.module.css";

const v = (vars: Record<string, string | number>) => vars as React.CSSProperties;

/** Small label at the top of every square: "Square 03 · Who we are". */
function SquareLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className={s.label}>
      <span className={s.labelNum}>Square {n}</span>
      <span aria-hidden="true">·</span>
      <span>{children}</span>
    </p>
  );
}

/* ── Start ─────────────────────────────────────────── */

export function HeroSquare() {
  return (
    <div className={s.hero}>
      <p className={s.heroPill}>
        <span className={s.heroDot} aria-hidden="true" />
        {site.name} · Since {site.foundingYear} · Indore, India
      </p>
      <h1 className={s.heroTitle}>
        <span className={s.heroLine}>
          <span>Every move,</span>
        </span>
        <span className={s.heroLine}>
          <span>
            a <em className={s.walk}>walkover.</em>
          </span>
        </span>
      </h1>
      <p className={s.heroLead}>
        Walkover builds {productCount} products for the moves every business has to make: reaching customers, automating
        work, running the books, putting AI to work and shipping what you build. Scroll to play the board.
      </p>
      <div className={s.heroActions}>
        <Magnetic>
          <ButtonLink href="/products" size="lg" track="hero_products">
            Explore the products
          </ButtonLink>
        </Magnetic>
        <ButtonLink href="/contact" variant="secondary" size="lg" track="hero_contact">
          Talk to us
        </ButtonLink>
      </div>
    </div>
  );
}

/* ── Who we are ────────────────────────────────────── */

export function IntroSquare({ n }: { n: string }) {
  return (
    <div className={s.block} data-reveal>
      <SquareLabel n={n}>Who we are</SquareLabel>
      <h2 className={s.statement}>
        A product company from Indore. Since {site.foundingYear} we have built software for the moments every
        business has to get right.
      </h2>
      <dl className={s.facts}>
        <div>
          <dt>Founded in Indore, starting with MSG91</dt>
          <dd>{site.foundingYear}</dd>
        </div>
        <div>
          <dt>People, working remotely</dt>
          <dd>{site.teamSize}</dd>
        </div>
        <div>
          <dt>Products on the board</dt>
          <dd>{products.length}</dd>
        </div>
      </dl>
      <p className={s.source}>Source: walkover.in</p>
    </div>
  );
}

/* ── Products ──────────────────────────────────────── */

/** Pip layout for a die face (positions 0–8 on a 3×3 grid). */
const FACE: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

export function ProductSquare({ product, n, index }: { product: Product; n: string; index: number }) {
  const ink = brandInk(product.brand);
  const claim = product.claims?.[0];
  const partners = product.connections.map((c) => getProduct(c.to)!).filter(Boolean);
  const face = FACE[(index % 6) + 1];

  return (
    <article
      className={s.product}
      data-reveal
      style={v({ "--c": product.brand.color, "--ink": ink })}
      aria-labelledby={`sq-${product.slug}`}
    >
      <span className={s.face} aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i}>{face.includes(i) && <span className={s.pip} />}</span>
        ))}
      </span>

      <p className={s.productLabel}>
        Square {n} · {product.category}
      </p>
      <h2 id={`sq-${product.slug}`} className={s.productName}>
        {product.name}
      </h2>
      <p className={s.productTagline}>{product.tagline}</p>

      <ul role="list" className={s.chips}>
        {product.capabilities.slice(0, 4).map((c) => (
          <li key={c.title}>{c.title}</li>
        ))}
      </ul>

      <div className={s.productFoot}>
        {claim ? (
          <p className={s.claim}>
            <span className={s.claimValue}>{claim.value}</span>
            <span className={s.claimLabel}>
              {claim.label}
              <span className={s.claimSource}>{product.claimsSource}</span>
            </span>
          </p>
        ) : (
          <p className={s.claim}>
            <span className={s.claimLabel}>{product.pricingNote}</span>
          </p>
        )}
        {partners.length > 0 && (
          <p className={s.partners}>
            <span className={s.partnersLabel}>Works with</span>
            {partners.map((p) => (
              <span key={p.slug} className={s.partner}>
                <span className={s.partnerDot} style={v({ background: p.brand.color })} aria-hidden="true" />
                {p.name}
              </span>
            ))}
          </p>
        )}
        <Link
          href={`/products/${product.slug}`}
          className={s.productCta}
          data-track="product_explore"
          data-track-label={`board_${product.slug}`}
        >
          Explore {product.name}
          <Icon name="arrow" size={16} strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

/* ── How we build ──────────────────────────────────── */

export function BuildSquare({ n }: { n: string }) {
  return (
    <div className={`${s.block} ${s.ink}`} data-reveal>
      <SquareLabel n={n}>How we build</SquareLabel>
      <h2 className={s.title}>One move at a time, with total focus.</h2>
      <p className={s.sub}>“One move. Total focus.” is the first of Walkover’s ten values. These four habits follow from it.</p>
      <ol role="list" className={s.rules}>
        {principles.map((p, i) => {
          const proof = getProduct(p.product)!;
          return (
            <li key={p.id} className={s.rule}>
              <span className={s.ruleNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={s.ruleTitle}>{p.title}</h3>
                <p className={s.ruleBody}>{p.body}</p>
                <p className={s.proof}>
                  <span className={s.proofChip} style={v({ background: proof.brand.color, color: brandInk(proof.brand) })}>
                    {proof.name}
                  </span>
                  {p.proof}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── Start with the problem ────────────────────────── */

export function ProblemSquare({ n }: { n: string }) {
  return (
    <div className={s.block}>
      <div className={s.intro} data-reveal>
        <SquareLabel n={n}>Solutions</SquareLabel>
        <h2 className={s.title}>Start with the problem.</h2>
        <p className={s.sub}>You don’t need to know our product names. Tell us what needs to happen.</p>
      </div>
      <Problems compact />
      <div className={s.industries} data-reveal>
        <p className={s.miniLabel}>Industries we serve</p>
        <ul role="list" className={s.pills}>
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link href={`/industries/${ind.slug}`} className={s.pill}>
                {ind.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Story ─────────────────────────────────────────── */

export function StorySquare({ n }: { n: string }) {
  return (
    <div className={s.block} data-reveal>
      <SquareLabel n={n}>Our story</SquareLabel>
      <h2 className={s.title}>Version by version, since {site.foundingYear}.</h2>
      <ol role="list" className={s.timeline}>
        {timeline.map((t) => (
          <li key={t.when} className={s.moment}>
            <span className={s.when}>{t.when}</span>
            <div>
              <h3 className={s.momentTitle}>{t.title}</h3>
              <p className={s.momentBody}>{t.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <ArrowLink href="/our-story">Read the full story</ArrowLink>
    </div>
  );
}

/* ── Culture ───────────────────────────────────────── */

export function CultureSquare({ n }: { n: string }) {
  return (
    <div className={s.block} data-reveal>
      <SquareLabel n={n}>Culture & careers</SquareLabel>
      <h2 className={s.motto}>
        {careers.motto.split(". ").map((part, i, arr) => (
          <span key={part}>
            {part}
            {i < arr.length - 1 ? "." : ""}
          </span>
        ))}
      </h2>
      <p className={s.sub}>That is how we hire. These are the rules we play by once you are in.</p>
      <ol role="list" className={s.values}>
        {values.slice(0, 6).map((val, i) => (
          <li key={val.title} className={s.value}>
            <span className={s.valueNum} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={s.valueTitle}>{val.title}</h3>
            <p className={s.valueBody}>{val.body}</p>
          </li>
        ))}
      </ol>
      <div className={s.row}>
        <ButtonLink href="/careers" track="home_careers">
          Life at Walkover
        </ButtonLink>
        <ArrowLink href="/about#values">All ten values</ArrowLink>
      </div>
    </div>
  );
}

/* ── Notes ─────────────────────────────────────────── */

export function NotesSquare({ n }: { n: string }) {
  return (
    <div className={s.block} data-reveal>
      <SquareLabel n={n}>Resources</SquareLabel>
      <h2 className={s.title}>Notes from the people building it.</h2>
      <ul role="list" className={s.notes}>
        {posts.slice(0, 4).map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className={s.note} data-track="resource_click" data-track-label={p.slug}>
              <span className={s.noteMeta}>
                {postCategories[p.category].label} · <time dateTime={p.published}>{formatDate(p.published)}</time>
              </span>
              <span className={s.noteTitle}>{p.title}</span>
              <Icon name="arrow" size={18} className={s.noteArrow} />
            </Link>
          </li>
        ))}
      </ul>
      <ArrowLink href="/blog">All articles</ArrowLink>
    </div>
  );
}

/* ── Home ──────────────────────────────────────────── */

export function HomeCaption() {
  return (
    <div className={s.homeCaption} data-reveal>
      <p className={s.label}>
        <span className={s.labelNum}>Home</span>
      </p>
      <p className={s.homeText}>{ProductCount} products. One home.</p>
    </div>
  );
}
