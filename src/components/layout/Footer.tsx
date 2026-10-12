import Link from "next/link";
import { products, solutions } from "@/content";
import { companyNav, resourceNav, site } from "@/content/site";
import type { Product } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { ProductLogo } from "@/components/ui/ProductLogo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { withBasePath } from "@/lib/base-path";
import styles from "./Footer.module.scss";

export function Footer() {
  const year = new Date().getFullYear();
  const columns: { title: string; links: { label: string; href: string; product?: Product }[] }[] = [
    {
      title: "Products",
      links: products.map((p) => ({
        label: p.name,
        href: `/products/${p.slug}`,
        product: p,
      })),
    },
    {
      title: "Solutions",
      links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
    },
    {
      title: "Company",
      links: [...companyNav, ...resourceNav].map((l) => ({ label: l.label, href: l.href })),
    },
  ];

  return (
    <footer className={`surface-dark ${styles.footer}`}>
      <div className="container-wide">
        {/* Closing line and the one action we want next. */}
        <div className={styles.top}>
          <p className={styles.statement}>
            Be it a success or a learning,
            <br />
            we simply <span className={styles.walk}>walkover.</span>
          </p>
          <div className={styles.cta}>
            <p className={styles.ctaLabel}>Have something in mind?</p>
            <a href={`mailto:${site.email}`} className={styles.big}>
              {site.email}
            </a>
            <ButtonLink href="/contact" track="footer_contact">
              Talk to us
            </ButtonLink>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" className={styles.brandName} aria-label={`${site.name}, home`}>
              <Logo variant="mark" className={styles.brandMark} />
              <span>{site.name}</span>
            </Link>
            <p className={styles.tagline}>{site.tagline}</p>

            <ul role="list" className={styles.reach}>
              <li>
                <Icon name="phone" size={16} className={styles.reachIcon} />
                <a href={site.phone.href} className={styles.reachLink}>
                  {site.phone.display}
                </a>
              </li>
              <li>
                <Icon name="pin" size={16} className={styles.reachIcon} />
                <a
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener"
                  className={styles.reachLink}
                  data-track="outbound_click"
                  data-track-label="footer_map"
                >
                  <address>
                    {site.address.street},
                    <br />
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                  </address>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>

            <ul role="list" className={styles.social}>
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    className={styles.socialLink}
                    title={s.label}
                    data-track="outbound_click"
                    data-track-label={`social_${s.label}`}
                  >
                    <SocialIcon name={s.label} />
                    <span className="sr-only">
                      {s.label} (opens in a new tab)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className={styles.columns}>
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className={styles.colTitle}>{col.title}</h2>
                <ul role="list" className={styles.list}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={styles.link}>
                        {l.product && <ProductLogo product={l.product} className={styles.productLogo} />}
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} {site.legalName}
          </p>
          <ul role="list" className={styles.legal}>
            <li>
              <Link href="/privacy" className={styles.legalLink}>
                Privacy
              </Link>
            </li>
            <li>
              <a href={withBasePath("/sitemap.xml")} className={styles.legalLink}>
                Sitemap
              </a>
            </li>
            <li>
              <a href="#main" className={styles.toTop}>
                Back to top
                <Icon name="arrow" size={14} strokeWidth={2} className={styles.toTopIcon} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Oversized wordmark the footer fades into. */}
      <p className={styles.watermark} aria-hidden="true">
        walkover
      </p>
    </footer>
  );
}
