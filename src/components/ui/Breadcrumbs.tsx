import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./Breadcrumbs.module.css";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList schema. Home is implied. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={styles.nav}>
        <ol role="list" className={styles.list}>
          {all.map((c, i) => {
            const current = i === all.length - 1;
            return (
              <li key={c.path} className={styles.item}>
                {current ? (
                  <span aria-current="page">{c.name}</span>
                ) : (
                  <Link href={c.path} className={styles.link}>
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
