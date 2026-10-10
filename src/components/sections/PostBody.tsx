import type { PostBlock } from "@/content/types";
import styles from "./PostBody.module.css";

/** Renders structured article blocks as semantic HTML. Content is plain
 *  text from our own typed content files; React escapes it, so no raw HTML
 *  is ever injected. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className={styles.prose}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                <a href={`#${b.id}`} className={styles.anchor} aria-hidden="true" tabIndex={-1}>
                  #
                </a>
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
          case "callout":
            return (
              <div key={i} className={styles.callout} role="note">
                <p className={styles.calloutTitle}>{b.title}</p>
                <p>{b.text}</p>
              </div>
            );
          case "table":
            return (
              <div key={i} className={styles.tableWrap} role="region" aria-label="Comparison table" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, c) => (
                        <th key={c} scope="col">
                          {h || <span className="sr-only">{c === 0 ? "Item" : `Column ${c + 1}`}</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row">
                              {cell}
                            </th>
                          ) : (
                            <td key={c}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
