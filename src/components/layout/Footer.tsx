import Link from "next/link";
import { industries, products, solutions } from "@/content";
import { companyNav, resourceNav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { withBasePath } from "@/lib/base-path";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  const columns: { title: string; links: { label: string; href: string; color?: string }[] }[] = [
    {
      title: "Products",
      links: products.map((p) => ({
        label: p.name,
        href: `/products/${p.slug}`,
        color: p.brand.color,
      })),
    },
    {
      title: "Solutions",
      links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
    },
    {
      title: "Industries",
      links: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
    },
    {
      title: "Company",
      links: [...companyNav, ...resourceNav].map((l) => ({ label: l.label, href: l.href })),
    },
  ];

  return (
    <footer className={`surface-dark ${styles.footer}`}>
      <div className="container-wide">
        <div className={styles.top}>
          <p className={styles.statement}>
            Be it a success or a learning,
            <br />
            we simply <span className={styles.walk}>walkover.</span>
          </p>
          <div className={styles.contact}>
            <a href={`mailto:${site.email}`} className={styles.big}>
              {site.email}
            </a>
            <a href={site.phone.href} className={styles.small}>
              {site.phone.display}
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className={styles.columns}>
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className={`t-label ${styles.colTitle}`}>{col.title}</h2>
              <ul role="list" className={styles.list}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.link}>
                      {l.color && (
                        <span className={styles.pip} style={{ background: l.color }} data-brand-dot="" aria-hidden="true" />
                      )}
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.bottom}>
          <div className={styles.brandBlock}>
            <Logo className={styles.logo} />
            <address className={styles.address}>
              {site.legalName}
              <br />
              {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode},{" "}
              {site.address.country}
            </address>
          </div>
          <ul role="list" className={styles.social}>
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className={styles.socialLink}
                  data-track="outbound_click"
                  data-track-label={`social_${s.label}`}
                >
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.legal}>
            <span>
              © {year} {site.legalName}
            </span>
            <Link href="/privacy" className={styles.link}>
              Privacy
            </Link>
            <a href={withBasePath("/sitemap.xml")} className={styles.link}>
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
