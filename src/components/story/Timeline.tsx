import { chapters, milestones, type Basis } from "@/content/story";
import { Cites } from "./Prose";
import styles from "./Timeline.module.scss";

const FIRST = 2006;
const LAST = 2026;
const yearOf = (when: string) => Number(when.match(/\d{4}/)?.[0] ?? LAST);
const chapterShort = (id: string) => chapters.find((c) => c.id === id)?.short ?? id;

export const basisLabel: Record<Basis, { label: string; note: string }> = {
  documented: { label: "Documented", note: "Recorded at the time: a regulator, a dated release or an archived page." },
  reported: { label: "Reported", note: "A later account by a founder or a journalist, attributed in the text." },
};

export function BasisMark({ basis }: { basis: Basis }) {
  return (
    <span className={styles.basis} data-basis={basis}>
      <span className={styles.basisIcon} aria-hidden="true" />
      {basisLabel[basis].label}
    </span>
  );
}

/** Hero preview: twenty years on one ruler; each marked year jumps to its chapter. */
export function YearRuler() {
  const years = Array.from({ length: LAST - FIRST + 1 }, (_, i) => FIRST + i);
  const byYear = new Map<number, typeof milestones>();
  for (const m of milestones) {
    const y = yearOf(m.when);
    byYear.set(y, [...(byYear.get(y) ?? []), m]);
  }
  return (
    <nav aria-label="Years in this story" className={styles.ruler}>
      <ol role="list" className={styles.rulerList}>
        {years.map((y, i) => {
          const ms = byYear.get(y);
          return (
            <li key={y} className={styles.tick} data-marked={ms ? "" : undefined}>
              {ms ? (
                <a
                  href={`#${ms[0].chapter}`}
                  className={styles.tickLink}
                  aria-label={`${y === LAST ? "Today" : y}: ${ms.map((m) => m.title).join("; ")}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className={styles.tickMark} aria-hidden="true" />
                  <span className={styles.tickYear} aria-hidden="true">
                    {y === LAST ? "Now" : `’${String(y).slice(2)}`}
                  </span>
                </a>
              ) : (
                <span className={styles.tickMark} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Timeline() {
  return (
    <ol role="list" className={styles.grid}>
      {milestones.map((m, i) => (
        <li
          key={m.when + m.title}
          className={styles.item}
          data-reveal
          style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}
        >
          <span className={styles.node} aria-hidden="true" />
          <p className={styles.when}>{m.when}</p>
          <h3 className={styles.title}>{m.title}</h3>
          <p className={styles.body}>
            {m.body}
            <Cites ids={m.sources} />
          </p>
          <div className={styles.foot}>
            <BasisMark basis={m.basis} />
            <a href={`#${m.chapter}`} className={styles.toChapter}>
              Chapter {String(chapters.findIndex((c) => c.id === m.chapter) + 1).padStart(2, "0")}
              <span className="sr-only">: {chapterShort(m.chapter)}</span>
            </a>
          </div>
        </li>
      ))}
    </ol>
  );
}
