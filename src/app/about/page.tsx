import type { Metadata } from "next";
import { ProductCount, products } from "@/content";
import { principles } from "@/content/company";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/sections/Cards";
import { Story } from "@/components/home/Story";
import { Values } from "@/components/home/Values";
import { ArrowLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMeta } from "@/lib/seo";
import styles from "./about.module.scss";

export const metadata: Metadata = pageMeta({
  title: "About Walkover — Our Story, Mission & Values",
  description:
    "Walkover Web Solutions began in Indore in 2010 with MSG91. Today 150+ people build communication, automation and AI products. Our story, mission and values.",
  path: "/about",
});

const pillars = [
  {
    title: "Design",
    body: "Software should be simple to pick up and pleasant to use every day. We have a dedicated design function across every product.",
  },
  {
    title: "Culture",
    body: "People first. Sane hours. Failures treated as learning. A culture that lets small teams own big products.",
  },
  {
    title: "Technology",
    body: "Infrastructure that carries billions of messages and API calls a month has to be engineered, not improvised.",
  },
];

/** Founders as described on Walkover's own product sites (msg91.com, giddh.com, viasocket.com). */
const founders = [
  {
    name: "Pushpendra Agrawal",
    role: "Founder",
    note: "Founder of Walkover. Started viaSocket as a side project that became an AI automation platform.",
  },
  {
    name: "Shubhendra Agrawal",
    role: "Founder & CEO, MSG91",
    note: "Leads MSG91 and founded Giddh, bringing accounting for growing businesses to the cloud.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Walkover"
        title="Built in Indore. Used around the world."
        lead="We are on a mission to support startups and growing businesses in realising their vision. Since 2010 we have done it the way we know best: by building products."
      />

      <section className={`section ${styles.manifesto}`} aria-labelledby="manifesto-title">
        <div className="container">
          <h2 id="manifesto-title" className="sr-only">
            Our philosophy
          </h2>
          <blockquote className={styles.quote} data-reveal>
            <p>
              “The way you do anything is the way you do <span className="accent">everything.</span>”
            </p>
          </blockquote>
          <div className={styles.manifestoGrid}>
            <p className="t-lead" data-reveal>
              A walkover is a win that looks effortless. That is what we want our software to do for the people
              who use it: take something hard, like reaching a customer, running a process or closing the books,
              and make it feel easy.
            </p>
            <p className="t-lead" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              It rarely is easy on our side. It takes focus, many versions and a willingness to learn in public.
              Be it a success or a learning, we simply walkover.
            </p>
          </div>
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="journey-title">
        <div className="container">
          <SectionHeader
            id="journey-title"
            eyebrow="Our journey"
            title="One product, then a family of them."
            lead={`Walkover started in ${site.foundingYear} with MSG91. Each product since has grown out of a real problem, often one we hit ourselves.`}
            align="split"
          />
          <Story />
          <p className={styles.storyLink}>
            <ArrowLink href="/our-story">Read the full story</ArrowLink>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="pillars-title">
        <div className="container">
          <SectionHeader
            id="pillars-title"
            eyebrow="What we stand on"
            title="Three pillars: design, culture and technology."
            align="split"
          />
          <ol role="list" className={styles.pillars}>
            {pillars.map((p, i) => (
              <li key={p.title} className={styles.pillar} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                <span className={styles.pillarPips} aria-hidden="true">
                  {Array.from({ length: i + 1 }, (_, k) => (
                    <span key={k} />
                  ))}
                </span>
                <h3 className="t-h3">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`section ${styles.principles}`} aria-labelledby="how-title">
        <div className="container">
          <SectionHeader id="how-title" eyebrow="How we build" title="Four habits behind every product." align="split" />
          <ol role="list" className={styles.principleList}>
            {principles.map((p, i) => (
              <li key={p.id} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <span className={styles.principleNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h4">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title" id="values">
        <div className="container">
          <SectionHeader
            id="values-title"
            eyebrow="Culture we foster"
            title="Ten rules we play by."
            lead="Written by the team, in the team’s own words. They are how decisions get made here."
            align="split"
          />
          <Values />
        </div>
      </section>

      <section className={`section ${styles.people}`} aria-labelledby="people-title">
        <div className={`container ${styles.peopleGrid}`}>
          <div data-reveal>
            <p className="eyebrow">People</p>
            <h2 id="people-title" className="t-h2">
              {site.teamSize} people, working remotely, rooted in Indore.
            </h2>
            <p className={`t-lead ${styles.peopleLead}`}>
              Small teams own whole products. Our office sits in the heart of India, and our people work from
              wherever they do their best work.
            </p>
          </div>
          <ul role="list" className={styles.founders}>
            {founders.map((f) => (
              <li key={f.name} className={styles.founder} data-reveal>
                <span className={styles.initials} aria-hidden="true">
                  {f.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <h3 className="t-h4">{f.name}</h3>
                  <p className={styles.founderRole}>{f.role}</p>
                  <p className={styles.founderNote}>{f.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="products-title">
        <div className="container">
          <SectionHeader
            id="products-title"
            eyebrow="What we have built"
            title={`${ProductCount} products. One direction.`}
            lead="We describe ourselves as a communication and AI company. Every product is moving the same way: fewer manual steps, more work done by software you can trust."
            align="split"
          />
          <div className={styles.products}>
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} launch={i + 1} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
