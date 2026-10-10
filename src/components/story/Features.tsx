import Image from "next/image";
import Link from "next/link";
import { brandProps, getProduct, products } from "@/content";
import {
  chapters,
  evolution,
  experiments,
  figures,
  foundingDates,
  giddhSteps,
  lessons,
  people,
  ruleChanges,
  smsStages,
  snapshot2013,
  sourceById,
  viasocketPath,
} from "@/content/story";
import { Icon } from "@/components/ui/Icon";
import { Cite, Cites } from "./Prose";
import styles from "./Story.module.css";

const delay = (i: number, step = 90) => ({ "--reveal-delay": `${i * step}ms` }) as React.CSSProperties;

const chapterNo = (id: string) => String(chapters.findIndex((c) => c.id === id) + 1).padStart(2, "0");
const chapterShort = (id: string) => chapters.find((c) => c.id === id)?.short ?? id;

/** Chapter 2 */
export function FoundingDates() {
  return (
    <div className={styles.dates}>
      <p className={`t-label ${styles.featureLabel}`}>Why this page gives three dates</p>
      <ol role="list" className={styles.datesList}>
        {foundingDates.map((d, i) => (
          <li key={d.year} className={styles.date} data-reveal style={delay(i)}>
            <span className={styles.dateYear}>{d.year}</span>
            <span className={styles.dateWhat}>{d.what}</span>
            <p>
              {d.body}
              <Cite id={d.source} />
            </p>
          </li>
        ))}
      </ol>
      <p className={styles.featureNote}>
        Each date is true of something different. We use 2008 for when the work began and 2010 for the company, as
        Walkover itself does.
      </p>
    </div>
  );
}

/** Chapter 3: from middleman to platform. */
export function SmsStages() {
  return (
    <figure className={styles.stages}>
      <figcaption className={`t-label ${styles.featureLabel}`}>
        How the SMS business changed shape, 2009–2010
      </figcaption>
      <ol role="list" className={styles.stageList}>
        {smsStages.map((s, i) => (
          <li key={s.label} className={styles.stage} data-reveal style={delay(i, 140)}>
            <div className={styles.stageHead}>
              <span className={styles.stageWhen}>{s.when}</span>
              <span className={styles.stageLabel}>{s.label}</span>
            </div>
            <ol role="list" className={styles.flow}>
              {s.flow.map((node, k) => (
                <li
                  key={node}
                  className={styles.flowNode}
                  data-hub={node.includes("Walkover") || node.includes("MSG91") ? "" : undefined}
                >
                  <span className={styles.chip}>{node}</span>
                  {k < s.flow.length - 1 && (
                    <span className={styles.flowArrow} aria-hidden="true">
                      <Icon name="arrow" size={14} strokeWidth={2} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className={styles.stageBody}>{s.body}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Chapter 4 */
export function RuleChanges() {
  return (
    <div className={styles.rules}>
      <p className={`t-label ${styles.featureLabel}`}>What the regulations changed</p>
      <ol role="list" className={styles.rulesList}>
        {ruleChanges.map((r, i) => (
          <li key={r.date} className={styles.rule} data-reveal style={delay(i)}>
            <span className={styles.ruleDate}>{r.date}</span>
            <div>
              <h3 className="t-h4">{r.title}</h3>
              <p>
                {r.body}
                <Cite id={r.source} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Chapter 6 */
export function Experiments() {
  return (
    <ul role="list" className={styles.experiments}>
      {experiments.map((e, i) => (
        <li key={e.name} className={styles.experiment} data-reveal style={delay(i)}>
          <p className={styles.expWhen}>{e.when}</p>
          <h3 className="t-h3">{e.name}</h3>
          <p className={styles.expWhat}>
            {e.what}
            <Cites ids={e.known} />
          </p>
          <p className={styles.expStatus}>
            <span className="t-label">Status</span> {e.status}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Chapter 7 */
export function Snapshot2013() {
  const src = sourceById(snapshot2013.source);
  return (
    <figure className={styles.snapshot} data-reveal>
      <figcaption className={`t-label ${styles.featureLabel}`}>
        Snapshot: December 2013, as reported by {src.publisher}
        <Cite id={snapshot2013.source} />
      </figcaption>
      <dl className={styles.snapshotFacts}>
        {snapshot2013.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.featureNote}>{snapshot2013.note}</p>
      <div className={styles.beforeAfter} aria-label="Infrastructure before and after 2013">
        <div>
          <span className="t-label">Before</span>
          <p>Servers at a data-centre provider, with recurring outages.</p>
        </div>
        <span className={styles.baArrow} aria-hidden="true">
          <Icon name="arrow" size={20} strokeWidth={2} />
        </span>
        <div>
          <span className="t-label">After</span>
          <p>
            Amazon Web Services. The downtime stopped, by the founder’s account.
            <Cite id="grit-2022" />
          </p>
        </div>
      </div>
    </figure>
  );
}

/** Chapter 8 */
export function Evolution() {
  return (
    <ol role="list" className={styles.evolution}>
      {evolution.map((e, i) => (
        <li key={e.when} className={styles.evo} data-reveal style={delay(i, 70)}>
          <span className={styles.evoWhen}>{e.when}</span>
          <dl className={styles.evoBody}>
            <div>
              <dt className="t-label">The problem</dt>
              <dd>{e.problem}</dd>
            </div>
            <div>
              <dt className="t-label">What changed</dt>
              <dd>
                {e.change}
                <Cites ids={e.sources} />
                {"note" in e && <span className={styles.evoNote}>{e.note}</span>}
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}

/** A short horizontal sequence in a product's own colour (Giddh, viaSocket). */
function ProductPath({
  slug,
  label,
  steps,
}: {
  slug: "giddh" | "viasocket";
  label: string;
  steps: readonly { title: string; body: string; source?: string }[];
}) {
  const product = getProduct(slug)!;
  return (
    <figure className={styles.path} {...brandProps(product.brand)}>
      <figcaption className={`t-label ${styles.featureLabel}`}>
        <span className={styles.pathPip} data-brand-dot="" aria-hidden="true" />
        {label}
      </figcaption>
      <ol
        role="list"
        className={styles.pathList}
        style={{ "--n": steps.length, "--cols-md": steps.length % 3 === 0 ? 3 : 2 } as React.CSSProperties}
      >
        {steps.map((s, i) => (
          <li key={s.title} className={styles.pathStep} data-reveal style={delay(i, 110)}>
            <span className={styles.pathTitle}>{s.title}</span>
            <p>
              {s.body}
              {s.source && <Cite id={s.source} />}
            </p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function GiddhPath() {
  return (
    <ProductPath
      slug="giddh"
      label="Giddh, from a name to a release"
      steps={giddhSteps.map((s) => ({ title: s.when, body: s.body, source: s.source }))}
    />
  );
}

export function ViasocketPath() {
  return (
    <ProductPath
      slug="viasocket"
      label="viaSocket’s path, as the company tells it"
      steps={viasocketPath.map((s) => ({ title: s.step, body: s.body }))}
    />
  );
}

/** Chapter 11 */
export function Figures() {
  return (
    <dl className={styles.figures}>
      {figures.map((f, i) => (
        <div key={f.label} className={styles.figureStat} data-reveal style={delay(i)}>
          <dt>{f.label}</dt>
          <dd className={styles.figureValue}>{f.value}</dd>
          <dd className={styles.figureBasis}>
            {f.basis}
            <Cite id={f.source} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Chapter 12: where to go next for each product. */
export function ProductsToday() {
  return (
    <div className={styles.productsToday}>
      <p className={`t-label ${styles.featureLabel}`}>The products today</p>
      <ul role="list" className={styles.productGrid}>
        {products.map((p, i) => {
          const brand = brandProps(p.brand);
          return (
            <li key={p.slug} data-reveal data-brand="" style={{ ...brand.style, ...delay(i, 50) }}>
              <Link href={`/products/${p.slug}`} className={styles.productLink}>
                <span className={styles.productPip} data-brand-dot="" aria-hidden="true" />
                <span className={styles.productName}>{p.name}</span>
                <span className={styles.productCat}>{p.category}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Chapter 13 */
export function Lessons() {
  return (
    <ol role="list" className={styles.lessons}>
      {lessons.map((l, i) => (
        <li key={l.title} className={styles.lesson} data-reveal style={delay(i % 2, 90)}>
          <span className={styles.lessonNum} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="t-h4">{l.title}</h3>
          <p>{l.body}</p>
          <p className={styles.lessonRefs}>
            <span className="t-label">Rests on</span>
            {l.chapters.map((id) => (
              <a key={id} href={`#${id}`}>
                {chapterNo(id)} {chapterShort(id)}
              </a>
            ))}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** The cast, introduced once near the top. Full roles live on /about. */
export function People() {
  return (
    <ul role="list" className={styles.people}>
      {people.map((p, i) => (
        <li key={p.name} className={styles.person} data-reveal style={delay(i)}>
          {p.photo ? (
            <Image
              src={p.photo}
              width={520}
              height={520}
              alt={`Portrait of ${p.name}`}
              sizes="96px"
              className={styles.personPhoto}
            />
          ) : (
            <span className={styles.personInitials} aria-hidden="true">
              {p.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          )}
          <div>
            <h3 className="t-h4">{p.name}</h3>
            <p className={styles.personRole}>{p.role}</p>
            <p className={styles.personNote}>
              {p.note}
              <Cites ids={p.sources} />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
