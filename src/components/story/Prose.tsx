import Link from "next/link";
import type { ReactNode } from "react";
import { sourceById, sourceNumber } from "@/content/story";
import styles from "./Prose.module.scss";

/**
 * Renders story text kept as plain strings in `src/content/story.ts`.
 * Two inline markers are supported:
 *   [^source-id]   a numbered citation linking to the Sources list
 *   [label](href)  a link; external hrefs open in a new tab
 */
const TOKEN = /\[\^([a-z0-9-]+)\]|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function Cite({ id }: { id: string }) {
  const n = sourceNumber(id);
  const src = sourceById(id);
  return (
    <sup className={styles.cite}>
      <a href={`#source-${id}`} aria-label={`Source ${n}: ${src.publisher}`}>
        {n}
      </a>
    </sup>
  );
}

/** Several citations side by side, always in ascending order. */
export function Cites({ ids }: { ids: readonly string[] }) {
  const sorted = [...ids].sort((a, b) => sourceNumber(a) - sourceNumber(b));
  return (
    <>
      {sorted.map((id) => (
        <Cite key={id} id={id} />
      ))}
    </>
  );
}

export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  // Adjacent citation markers are collected and emitted as one sorted run.
  let run: string[] = [];
  const flush = () => {
    if (run.length) out.push(<Cites key={`c${out.length}`} ids={run} />);
    run = [];
  };
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) {
      flush();
      out.push(text.slice(last, at));
    }
    if (m[1]) {
      run.push(m[1]);
    } else {
      flush();
      const [label, href] = [m[2], m[3]];
      out.push(
        /^https?:/.test(href) ? (
          <a key={at} href={href} target="_blank" rel="noopener" className={styles.link}>
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link key={at} href={href} className={styles.link}>
            {label}
          </Link>
        ),
      );
    }
    last = at + m[0].length;
  }
  flush();
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** A run of paragraphs at reading width. */
export function Prose({ paragraphs, className }: { paragraphs: readonly string[]; className?: string }) {
  return (
    <div className={`${styles.prose} ${className ?? ""}`}>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>
          <Inline text={p} />
        </p>
      ))}
    </div>
  );
}
