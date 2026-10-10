import Image from "next/image";
import type { ReactNode } from "react";
import type { Chapter as ChapterData, Photo, Quote } from "@/content/story";
import { Cite, Prose } from "./Prose";
import styles from "./Story.module.css";

export function PullQuote({ quote }: { quote: Quote }) {
  return (
    <figure className={styles.quote} data-reveal>
      <blockquote>
        <p>{quote.text}</p>
      </blockquote>
      <figcaption>
        <span className={styles.quoteWho}>{quote.who}</span>, {quote.context}
        <Cite id={quote.source} />
      </figcaption>
    </figure>
  );
}

/** Interpretation, set apart from the documented narrative. */
export function Reading({ text }: { text: string }) {
  return (
    <aside className={styles.reading} aria-label="Our reading" data-reveal>
      <p className={`t-label ${styles.readingLabel}`}>Our reading</p>
      <p>{text}</p>
    </aside>
  );
}

export function StoryFigure({ photo, sizes, className }: { photo: Photo; sizes: string; className?: string }) {
  return (
    <figure className={`${styles.figure} ${className ?? ""}`} data-reveal>
      <Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes={sizes} />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

/**
 * One chapter: a sticky date column beside the narrative. The chapter's
 * bespoke visual (diagram, table, cards…) is passed as children and sits
 * between `body` and `after`.
 */
export function Chapter({ data, n, children }: { data: ChapterData; n: number; children?: ReactNode }) {
  const num = String(n).padStart(2, "0");
  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-title`}
      className={`${styles.chapter} ${data.tone === "dark" ? "surface-dark" : ""}`}
    >
      <div className={`container ${styles.chapterGrid}`}>
        <div className={styles.chapterAside}>
          <p className={`t-label ${styles.chapterNum}`}>Chapter {num}</p>
          <p className={styles.chapterWhen}>{data.when}</p>
        </div>
        <div className={styles.chapterMain}>
          <h2 id={`${data.id}-title`} className={`t-h2 ${styles.chapterTitle}`} data-reveal>
            {data.title}
          </h2>
          <Prose paragraphs={data.body} />
          {data.quote && <PullQuote quote={data.quote} />}
          {children && <div className={styles.feature}>{children}</div>}
          {data.after && <Prose paragraphs={data.after} />}
          {data.reading && <Reading text={data.reading} />}
        </div>
        {data.photo && (
          <StoryFigure photo={data.photo} sizes="(min-width: 1320px) 1320px, 100vw" className={styles.chapterPhoto} />
        )}
      </div>
    </section>
  );
}
