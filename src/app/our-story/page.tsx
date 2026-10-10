import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { chapters, milestones, sources, storyMeta } from "@/content/story";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chapter } from "@/components/story/Chapter";
import { ChapterNav } from "@/components/story/ChapterNav";
import {
  Evolution,
  Experiments,
  Figures,
  FoundingDates,
  GiddhPath,
  Lessons,
  People,
  ProductsToday,
  RuleChanges,
  SmsStages,
  Snapshot2013,
  ViasocketPath,
} from "@/components/story/Features";
import { OpenQuestions, Sources } from "@/components/story/Sources";
import { BasisMark, Timeline, YearRuler } from "@/components/story/Timeline";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import styles from "./story.module.css";

const title = "Our Story: From Indore Hosting to MSG91, Giddh & viaSocket — Walkover";
const description =
  "The sourced history of Walkover: a failed first idea, a hosting business in Indore, a club that needed SMS, new telecom rules, investors who said no, and the products that followed.";

export const metadata: Metadata = pageMeta({
  title,
  description,
  path: "/our-story",
  type: "article",
  absoluteTitle: true,
  image: "/our-story/opengraph-image",
});

/** Each chapter's bespoke visual. Chapters without one are pure narrative. */
const features: Record<string, ReactNode> = {
  indore: <FoundingDates />,
  sms: <SmsStages />,
  rules: <RuleChanges />,
  experiments: <Experiments />,
  reliability: <Snapshot2013 />,
  "msg91-evolves": <Evolution />,
  giddh: <GiddhPath />,
  viasocket: <ViasocketPath />,
  limits: <Figures />,
  today: <ProductsToday />,
  lessons: <Lessons />,
};

const navItems = [
  ...chapters.map((c, i) => ({ id: c.id, n: String(i + 1).padStart(2, "0"), label: c.short })),
  { id: "open-questions", n: "?", label: "Open questions" },
  { id: "sources", n: "§", label: "Sources" },
];

function articleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Our Story: how Walkover grew from a hosting business in Indore to a family of software products",
    description,
    url: absoluteUrl("/our-story"),
    mainEntityOfPage: absoluteUrl("/our-story"),
    dateModified: storyMeta.checkedISO,
    inLanguage: "en",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    about: { "@id": `${site.url}/#organization` },
    image: absoluteUrl("/our-story/opengraph-image"),
    citation: sources.map((s) => s.url),
  };
}

export default function OurStoryPage() {
  return (
    <>
      <article>
        <header className={styles.hero}>
          <div className={styles.board} aria-hidden="true" />
          <div className="container">
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <Breadcrumbs items={[{ name: "Our Story", path: "/our-story" }]} />
                <p className="eyebrow">Our Story</p>
                <h1 className={`t-h1 ${styles.title}`}>
                  From a five-person hosting shop in Indore to MSG91, Giddh and&nbsp;viaSocket.
                </h1>
                <p className={`t-lead ${styles.lead}`}>
                  In 2009 a club in Indore wanted to text its members, and a small web-hosting business offered to help.
                  This is what followed: a failed first idea, a customer request that became a product, new telecom
                  rules, investors who said no, and what the founders say they would do differently. It is told from the
                  sources, with the gaps left visible.
                </p>
                <p className={`t-label ${styles.meta}`}>
                  {chapters.length} chapters · {sources.length} sources · Checked {storyMeta.checked}
                </p>
                <div className={styles.actions}>
                  <ButtonLink href={`#${chapters[0].id}`} size="lg">
                    Start reading
                  </ButtonLink>
                  <ButtonLink href="#timeline" variant="secondary" size="lg" icon={null}>
                    See the timeline
                  </ButtonLink>
                </div>
              </div>

              <aside className={styles.legend} aria-labelledby="legend-title">
                <h2 id="legend-title" className={`t-label ${styles.legendTitle}`}>
                  How to read this story
                </h2>
                <dl className={styles.legendList}>
                  <div>
                    <dt>
                      <BasisMark basis="documented" />
                    </dt>
                    <dd>Recorded at the time: a regulator’s notice, a dated release or an archived web page.</dd>
                  </div>
                  <div>
                    <dt>
                      <BasisMark basis="reported" />
                    </dt>
                    <dd>A later account by a founder or journalist. The text always says who is speaking.</dd>
                  </div>
                  <div>
                    <dt>
                      <span className={styles.readingKey}>Our reading</span>
                    </dt>
                    <dd>Our interpretation, in a dashed box, kept apart from the record.</dd>
                  </div>
                  <div>
                    <dt>
                      <span className={styles.citeKey} aria-hidden="true">
                        12
                      </span>
                      <span className="sr-only">Numbers</span>
                    </dt>
                    <dd>Small numbers link to the source behind a sentence. Quoted words are exact.</dd>
                  </div>
                </dl>
              </aside>
            </div>
            <div className={styles.rulerWrap}>
              <YearRuler />
            </div>
          </div>
        </header>

        <section id="timeline" className={`section ${styles.timeline}`} aria-labelledby="timeline-title">
          <div className="container">
            <SectionHeader
              id="timeline-title"
              eyebrow="Timeline"
              title={`Twenty years, ${milestones.length} turning points.`}
              lead="Dates are as precise as the sources allow. Where only a year is known, only a year is given. Each entry links to its chapter."
              align="split"
            />
            <Timeline />
          </div>
        </section>

        <section className={`section ${styles.cast}`} aria-labelledby="people-title">
          <div className="container">
            <SectionHeader
              id="people-title"
              eyebrow="People"
              title="The people in this story."
              lead="Introduced as the sources describe them. Many more people built these products than the records name."
              align="split"
            >
              <ArrowLink href="/about">Leadership and values today</ArrowLink>
            </SectionHeader>
            <People />
          </div>
        </section>

        <div id="story-chapters">
          <ChapterNav items={navItems} scopeId="story-chapters" />

          {chapters.map((c, i) => (
            <Chapter key={c.id} data={c} n={i + 1}>
              {features[c.id]}
            </Chapter>
          ))}

          <section id="open-questions" className={`section ${styles.endSection}`} aria-labelledby="questions-title">
            <div className="container">
              <SectionHeader
                id="questions-title"
                eyebrow="Open questions"
                title="What we could not establish."
                lead="These are the gaps in the record. We have left them open rather than fill them with guesses."
                align="split"
              />
              <OpenQuestions />
            </div>
          </section>

          <section id="sources" className={`section ${styles.endSection}`} aria-labelledby="sources-title">
            <div className="container">
              <SectionHeader
                id="sources-title"
                eyebrow="Sources and further reading"
                title={`${sources.length} sources, every one linked.`}
                lead={`Numbered as cited above. Where a page blocks automated access or has changed since it was published, an archived copy is linked as well. Links last checked ${storyMeta.checked}.`}
                align="split"
              />
              <Sources />
            </div>
          </section>
        </div>
      </article>

      <section className={`section surface-dark ${styles.next}`} aria-labelledby="next-title">
        <div className="container">
          <SectionHeader
            id="next-title"
            eyebrow="Keep exploring"
            title="The story continues in the products."
            align="split"
          />
          <ul role="list" className={styles.nextList}>
            <li>
              <Link href="/products" className={styles.nextLink}>
                <span className={styles.nextTitle}>Products</span>
                <span>What MSG91, Giddh, viaSocket and the newer products do today.</span>
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.nextLink}>
                <span className={styles.nextTitle}>About Walkover</span>
                <span>Mission, values and how the company works now.</span>
              </Link>
            </li>
            <li>
              <Link href="/careers" className={styles.nextLink}>
                <span className={styles.nextTitle}>Careers</span>
                <span>Passion first, skill second, degree last.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <JsonLd data={articleSchema()} />
    </>
  );
}
