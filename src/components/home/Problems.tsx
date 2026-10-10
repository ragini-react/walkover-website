import Link from "next/link";
import { brandInk, getProduct, solutionBrand, solutions } from "@/content";
import { Icon } from "@/components/ui/Icon";
import styles from "./Problems.module.css";

/** "I need to…" — discovery for visitors who know the problem, not the product. */
export function Problems({ compact = false }: { compact?: boolean }) {
  return (
    <ul role="list" className={`${styles.list} ${compact ? styles.compact : ""}`}>
      {solutions.map((s, i) => {
        const brand = solutionBrand(s);
        return (
        <li
          key={s.slug}
          data-reveal
          data-brand=""
          style={
            {
              "--reveal-delay": `${(i % 4) * 60}ms`,
              "--c": brand.color,
              "--c-ink": brandInk(brand),
            } as React.CSSProperties
          }
        >
          <Link
            href={`/solutions/${s.slug}`}
            className={styles.row}
            data-track="solution_explore"
            data-track-label={s.slug}
          >
            <span className={styles.need}>
              <span className={styles.prefix}>I need to </span>
              {s.need}
            </span>
            <span className={styles.meta}>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.products}>
                {s.products.map((p) => getProduct(p.slug)?.name).join(" · ")}
              </span>
            </span>
            <span className={styles.arrow} aria-hidden="true">
              <Icon name="arrow" size={22} />
            </span>
          </Link>
        </li>
        );
      })}
    </ul>
  );
}
