import type { ReactNode } from "react";
import styles from "./SectionHeader.module.scss";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "split";
  /** Heading level; sections default to h2. */
  as?: "h1" | "h2" | "h3";
  eyebrowColor?: string;
  id?: string;
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "start",
  as: Tag = "h2",
  eyebrowColor,
  id,
  children,
}: Props) {
  return (
    <div className={styles.header} data-align={align} data-reveal>
      <div className={styles.titleBlock}>
        {eyebrow && (
          <p
            className="eyebrow"
            style={eyebrowColor ? ({ "--eyebrow-color": eyebrowColor } as React.CSSProperties) : undefined}
          >
            {eyebrow}
          </p>
        )}
        <Tag id={id} className={`t-h2 ${styles.title}`}>
          {title}
        </Tag>
      </div>
      {(lead || children) && (
        <div className={styles.side}>
          {lead && <p className="t-lead">{lead}</p>}
          {children}
        </div>
      )}
    </div>
  );
}
