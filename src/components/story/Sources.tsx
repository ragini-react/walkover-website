import { site } from "@/content/site";
import { openQuestions, sourceKinds, sources, sourceNumber, type SourceKind } from "@/content/story";
import styles from "./Story.module.scss";

export function OpenQuestions() {
  return (
    <div className={styles.questionsGrid}>
      <ol role="list" className={styles.questions}>
        {openQuestions.map((q) => (
          <li key={q} data-reveal>
            {q}
          </li>
        ))}
      </ol>
      <p className={styles.questionsAsk} data-reveal>
        Worked at Walkover in these years, or have a document, photo or correction? Write to{" "}
        <a href={`mailto:${site.email}?subject=Our%20Story`} className={styles.inlineLink}>
          {site.email}
        </a>
        . We will update this page and its sources.
      </p>
    </div>
  );
}

/** Numbered to match the inline citations; grouped by kind of evidence. */
export function Sources() {
  const kinds = Object.keys(sourceKinds) as SourceKind[];
  return (
    <div className={styles.sources}>
      {kinds.map((kind) => {
        const group = sources.filter((s) => s.kind === kind);
        if (!group.length) return null;
        return (
          <section key={kind} aria-labelledby={`sources-${kind}`} className={styles.sourceGroup}>
            <div className={styles.sourceGroupHead}>
              <h3 id={`sources-${kind}`} className="t-h4">
                {sourceKinds[kind].label}
              </h3>
              <p>{sourceKinds[kind].note}</p>
            </div>
            <ol role="list" className={styles.sourceList}>
              {group.map((s) => (
                <li key={s.id} id={`source-${s.id}`} className={styles.source}>
                  <span className={styles.sourceNum} aria-hidden="true">
                    {sourceNumber(s.id)}
                  </span>
                  <div>
                    <p className={styles.sourceMeta}>
                      <span className="sr-only">Source {sourceNumber(s.id)}. </span>
                      {s.publisher}
                      {s.author && <> · {s.author}</>} · {s.date}
                    </p>
                    <p className={styles.sourceTitle}>
                      <a href={s.url} target="_blank" rel="noopener">
                        {s.title}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </p>
                    <p className={styles.sourceSupports}>{s.supports}</p>
                    {s.alt && (
                      <p className={styles.sourceAlt}>
                        <a href={s.alt.url} target="_blank" rel="noopener">
                          {s.alt.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
