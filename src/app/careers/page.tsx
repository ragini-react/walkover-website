import type { Metadata } from "next";
import { careers } from "@/content/company";
import { products } from "@/content";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Values } from "@/components/home/Values";
import { BrandMark } from "@/components/visuals/BrandMark";
import { pageMeta } from "@/lib/seo";
import styles from "./careers.module.scss";

export const metadata: Metadata = pageMeta({
  title: "Careers at Walkover — Remote Jobs in Engineering, Design & Sales",
  absoluteTitle: true,
  description:
    "Join Walkover's 150+ person remote team building MSG91, viaSocket, GTWY AI and more. We hire for passion first, skill second, degree last.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <section className={`surface-dark ${styles.hero}`} data-header="dark">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <Breadcrumbs items={[{ name: "Careers", path: "/careers" }]} />
            <h1 className={styles.motto}>
              <span>Passion first.</span>
              <span>Skill second.</span>
              <span>Degree last.</span>
            </h1>
            <p className="t-lead">
              We hire people with the drive to build things that matter, then give them whole products to own.
              Join a team of {site.teamSize} people working from wherever they do their best work.
            </p>
            <div className={styles.actions}>
              <ButtonLink href={site.careersApplyUrl} size="lg" track="careers_open_roles">
                See open roles
              </ButtonLink>
              <ButtonLink href="#how-we-work" variant="secondary" size="lg" icon="chevronDown">
                How we work
              </ButtonLink>
            </div>
          </div>
          <div className={styles.heroDie}>
            <BrandMark />
          </div>
        </div>
      </section>

      <section className="section" id="how-we-work" aria-labelledby="perks-title">
        <div className="container">
          <SectionHeader
            id="perks-title"
            eyebrow="How we work"
            title="Room to do your best work."
            align="split"
          />
          <ul role="list" className={styles.perks}>
            {careers.perks.map((p, i) => (
              <li key={p.title} className={styles.perk} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                <span className={styles.perkPip} aria-hidden="true" />
                <h3 className="t-h4">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section surface-dark ${styles.teams}`} aria-labelledby="teams-title">
        <div className="container">
          <SectionHeader
            id="teams-title"
            eyebrow="Teams"
            title="Where you could fit."
            lead={`Our teams work across ${products.length} products, from communication APIs to AI agents.`}
            align="split"
          />
          <ul role="list" className={styles.teamList}>
            {careers.teams.map((t, i) => (
              <li key={t.name} className={styles.team} data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
                <span className={styles.teamNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.teamName}>{t.name}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="rules-title">
        <div className="container">
          <SectionHeader
            id="rules-title"
            eyebrow="Our values"
            title="The rules of the game."
            lead="Ten values, written by the team. Read them before you apply: they describe what working here is actually like."
            align="split"
          />
          <Values />
        </div>
      </section>

      <section className={`section-tight ${styles.apply}`} aria-labelledby="apply-title">
        <div className={`container ${styles.applyInner}`} data-reveal>
          <div>
            <p className="eyebrow">Apply</p>
            <h2 id="apply-title" className="t-h2">
              Current openings live on our careers portal.
            </h2>
          </div>
          <div className={styles.applyBody}>
            <p className="t-lead">
              Roles change often, so we keep the list in one place. If nothing fits yet, write to us anyway and
              tell us what you would like to build.
            </p>
            <div className={styles.actions}>
              <ButtonLink href={site.careersApplyUrl} track="careers_portal">
                Open roles
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}?subject=Careers%20at%20Walkover`} variant="secondary">
                {site.email}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
