import { timeline } from "@/content/company";
import styles from "./Story.module.css";

/** Company timeline; the rail draws itself as it scrolls into view. */
export function Story() {
  return (
    <div className={styles.wrap}>
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.railFill} />
      </div>
      <ol role="list" className={styles.list}>
        {timeline.map((t, i) => (
          <li key={t.when} className={styles.item} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}>
            <span className={styles.node} aria-hidden="true" />
            <p className={styles.when}>{t.when}</p>
            <h3 className={`t-h4 ${styles.title}`}>{t.title}</h3>
            <p className={styles.body}>{t.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
