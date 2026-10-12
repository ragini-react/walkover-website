import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { BrandMark } from "@/components/visuals/BrandMark";
import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className={`surface-dark ${styles.page}`} data-header="dark">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">404 · Off the board</p>
          <h1 className="t-display">That square is empty.</h1>
          <p className="t-lead">
            The page you were looking for has moved or never existed. Roll again, or take one of these paths.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
          </div>
          <ul role="list" className={styles.links}>
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <BrandMark size="clamp(160px, 16vw, 240px)" />
      </div>
    </section>
  );
}
