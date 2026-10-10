import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import styles from "./PageHero.module.css";

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  /** Use the inherited --accent (a product brand) for the eyebrow and board. */
  accent?: boolean;
};

/** Inner-page hero: breadcrumbs, H1, lead and an optional visual. */
export function PageHero({ crumbs, eyebrow, title, lead, actions, aside, tone = "light", accent }: Props) {
  return (
    <section
      className={`${styles.hero} ${tone === "dark" ? "surface-dark" : ""}`}
      data-header={tone === "dark" ? "dark" : undefined}
    >
      <div className={styles.board} aria-hidden="true" />
      <div className={`container ${styles.inner}`} data-has-aside={aside ? "" : undefined}>
        <div className={styles.copy}>
          <Breadcrumbs items={crumbs} />
          {eyebrow && (
            <p
              className="eyebrow"
              style={accent ? ({ "--eyebrow-color": "var(--accent)" } as React.CSSProperties) : undefined}
            >
              {eyebrow}
            </p>
          )}
          <h1 className={`t-h1 ${styles.title}`}>{title}</h1>
          {lead && <p className={`t-lead ${styles.lead}`}>{lead}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        {aside && <div className={styles.aside}>{aside}</div>}
      </div>
    </section>
  );
}
