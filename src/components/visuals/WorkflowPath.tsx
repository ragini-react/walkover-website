import { PlayWhenVisible } from "./PlayWhenVisible";
import styles from "./WorkflowPath.module.css";

/** A token travels down a path of steps, lighting each one in turn.
 *  Used wherever a page explains a sequence (solutions, industries). */
export function WorkflowPath({ steps, accent, title }: { steps: string[]; accent?: string; title?: string }) {
  const vars = { "--n": steps.length, ...(accent && { "--accent": accent }) };
  return (
    <figure className={styles.frame} style={vars as React.CSSProperties}>
      {title && <figcaption className={styles.title}>{title}</figcaption>}
      <PlayWhenVisible className={styles.stage}>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s} className={styles.step} style={{ "--i": i } as React.CSSProperties}>
              <span className={styles.node} aria-hidden="true">
                {i + 1}
              </span>
              <span className={styles.text}>{s}</span>
            </li>
          ))}
        </ol>
      </PlayWhenVisible>
    </figure>
  );
}
