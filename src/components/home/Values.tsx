import { values } from "@/content/company";
import styles from "./Values.module.scss";

/** Walkover's ten published values, laid out as a board of tiles. */
export function Values({ limit }: { limit?: number }) {
  const list = limit ? values.slice(0, limit) : values;
  return (
    <ol role="list" className={styles.grid}>
      {list.map((v, i) => (
        <li
          key={v.title}
          className={styles.tile}
          data-reveal
          style={{ "--reveal-delay": `${(i % 5) * 60}ms`, "--c": "var(--signal)" } as React.CSSProperties}
        >
          <span className={styles.num} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{v.title}</h3>
          <p className={styles.body}>{v.body}</p>
        </li>
      ))}
    </ol>
  );
}
