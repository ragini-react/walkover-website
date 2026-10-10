import type { Faq as FaqItem } from "@/content/types";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";
import { Icon } from "./Icon";
import styles from "./Faq.module.css";

/** Native disclosure widgets: keyboard and screen-reader friendly with zero JS.
 *  Emits FAQPage schema for exactly the questions shown. */
export function Faq({ items, title = "Questions, answered" }: { items: FaqItem[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section className="section-tight" aria-labelledby="faq-title">
      <div className={`container ${styles.wrap}`}>
        <h2 id="faq-title" className="t-h3" data-reveal>
          {title}
        </h2>
        <div className={styles.list}>
          {items.map((f) => (
            <details key={f.q} className={styles.item} data-reveal>
              <summary className={styles.q}>
                <span>{f.q}</span>
                <Icon name="plus" size={20} className={styles.icon} />
              </summary>
              <p className={styles.a}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
