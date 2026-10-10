import type { Metadata } from "next";
import Link from "next/link";
import { brandProps, posts, products } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/sections/Cards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import styles from "./resources.module.css";

export const metadata: Metadata = pageMeta({
  title: "Resources — Guides, Developer Docs & Glossary",
  description:
    "Guides, developer documentation and plain-language definitions from Walkover: OTP, RCS, workflow automation, AI agents, MCP, RAG, bank reconciliation and GST.",
  path: "/resources",
});

/** Developer entry points, all public and maintained by the product teams. */
const developer = [
  { title: "MSG91 API documentation", body: "Reference for SMS, WhatsApp, email, voice and OTP APIs.", href: "https://docs.msg91.com" },
  { title: "viaSocket MCP", body: "Connected apps as tools for AI agents, through MCP.", href: "https://viasocket.com/mcp" },
  { title: "Walkover on GitHub", body: "Public repositories from Walkover's teams.", href: "https://github.com/Walkover-Web-Solution" },
  { title: "DocStar", body: "Build API docs with an interactive playground.", href: "https://docstar.io" },
];

const glossary = [
  { term: "OTP", def: "A one-time password: a short code sent to a phone or inbox to prove the user controls it.", href: "/blog/otp-verification-sms-whatsapp-email" },
  { term: "RCS", def: "Rich Communication Services: richer business messaging, with branding and buttons, in the phone's native messaging app.", href: "/solutions/customer-communication" },
  { term: "Omnichannel", def: "Serving customers across channels, such as WhatsApp, email, chat and voice, with one shared history.", href: "/solutions/customer-support" },
  { term: "Workflow automation", def: "Software carrying out the repeatable steps of a process, like moving data between apps or creating records.", href: "/blog/what-is-workflow-automation" },
  { term: "AI agent", def: "An AI system that can take actions, such as calling an API or creating a record, using tools it has been given.", href: "/blog/ai-agents-vs-workflows" },
  { term: "MCP", def: "The Model Context Protocol: an open standard that lets AI clients discover and call external tools consistently.", href: "/blog/what-is-mcp-model-context-protocol" },
  { term: "RAG", def: "Retrieval-augmented generation: an AI model answers using documents retrieved for the question, not memory alone.", href: "/products/gtwy-ai" },
  { term: "Bank reconciliation", def: "Matching accounting records against the bank statement so both agree.", href: "/blog/automated-bank-reconciliation-gst" },
  { term: "GST", def: "India's Goods and Services Tax. Businesses file returns based on the invoices they issue and receive.", href: "/solutions/accounting-and-compliance" },
  { term: "Knowledge base", def: "A searchable library of how-to and troubleshooting articles for customers or staff.", href: "/blog/documentation-that-gets-read" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Resources", path: "/resources" }]}
        eyebrow="Resources"
        title="Learn the problem before you pick the tool."
        lead="Practical guides, developer entry points and a glossary of the terms our products deal with every day."
      />

      <section className="section-tight" aria-labelledby="guides-title">
        <div className="container">
          <SectionHeader id="guides-title" eyebrow="Guides" title="Latest from the blog" align="split">
            <ArrowLink href="/blog">All articles</ArrowLink>
          </SectionHeader>
          <div className={styles.grid}>
            {posts.slice(0, 6).map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="dev-title">
        <div className="container">
          <SectionHeader
            id="dev-title"
            eyebrow="For developers"
            title="APIs, MCP and source."
            lead="Where to start if you are integrating a Walkover product."
            align="split"
          />
          <ul role="list" className={styles.devList}>
            {developer.map((d, i) => (
              <li key={d.href} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener"
                  className={styles.dev}
                  data-track="outbound_click"
                  data-track-label={d.href}
                >
                  <span className={styles.devTitle}>{d.title}</span>
                  <span className={styles.devBody}>{d.body}</span>
                  <span className={styles.devHost}>
                    {new URL(d.href).host}
                    <Icon name="arrowUpRight" size={14} />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="glossary-title" id="glossary">
        <div className="container">
          <SectionHeader id="glossary-title" eyebrow="Glossary" title="Terms, in plain language." align="split" />
          <dl className={styles.glossary}>
            {glossary.map((g) => (
              <div key={g.term} className={styles.term} data-reveal>
                <dt>{g.term}</dt>
                <dd>
                  {g.def}{" "}
                  <Link href={g.href} className={styles.more}>
                    Learn more<span className="sr-only"> about {g.term}</span>
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="sites-title">
        <div className="container">
          <SectionHeader id="sites-title" eyebrow="Product websites" title="Go straight to the source." />
          <ul role="list" className={styles.sites}>
            {products.map((p) => (
              <li key={p.slug}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  className={styles.site}
                  {...brandProps(p.brand)}
                >
                  <span className={styles.siteDot} aria-hidden="true" />
                  <span className={styles.siteName}>{p.name}</span>
                  <span className={styles.siteHost}>{new URL(p.url).host}</span>
                  <Icon name="arrowUpRight" size={16} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a href="https://walkover.in/happiness" target="_blank" rel="noopener" className={styles.site}>
                <span className={styles.siteDot} aria-hidden="true" />
                <span className={styles.siteName}>Happiness newsletter</span>
                <span className={styles.siteHost}>walkover.in</span>
                <Icon name="arrowUpRight" size={16} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </section>


      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Walkover glossary",
          hasDefinedTerm: glossary.map((g) => ({ "@type": "DefinedTerm", name: g.term, description: g.def })),
        }}
      />
    </>
  );
}
