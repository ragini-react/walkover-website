import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/sections/ContactForm";
import { interestGroups } from "@/lib/contact-options";
import { pageMeta } from "@/lib/seo";
import styles from "./contact.module.scss";

export const metadata: Metadata = pageMeta({
  title: "Contact Walkover — Talk to Our Team in Indore",
  absoluteTitle: true,
  description:
    "Contact Walkover Web Solutions about MSG91, Giddh, viaSocket, GTWY AI or partnerships. Email info@walkover.in or call +91 731 256 0056.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <h1 className="t-h1">Tell us what you are working on.</h1>
          <p className="t-lead">
            Questions about a product, a partnership or something bigger. A person from the right team will
            reply.
          </p>

          <ul role="list" className={styles.channels}>
            <li>
              <a href={`mailto:${site.email}`} className={styles.channel}>
                <span className={styles.channelIcon}>
                  <Icon name="mail" size={20} />
                </span>
                <span>
                  <span className={styles.channelLabel}>Email</span>
                  <span className={styles.channelValue}>{site.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={site.phone.href} className={styles.channel}>
                <span className={styles.channelIcon}>
                  <Icon name="phone" size={20} />
                </span>
                <span>
                  <span className={styles.channelLabel}>Phone · {site.phone.hours}</span>
                  <span className={styles.channelValue}>{site.phone.display}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={site.address.mapUrl} target="_blank" rel="noopener" className={styles.channel}>
                <span className={styles.channelIcon}>
                  <Icon name="pin" size={20} />
                </span>
                <span>
                  <span className={styles.channelLabel}>Office</span>
                  <address className={styles.channelValue}>
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                  </address>
                  <span className="sr-only"> (opens map in a new tab)</span>
                </span>
              </a>
            </li>
          </ul>

          <div className={styles.support}>
            <p className="t-label t-muted">Already a customer?</p>
            <p>
              For help with an existing account, each product&apos;s own website and support channels are the
              quickest route. Start from the <Link href="/products">product pages</Link>.
            </p>
          </div>
        </div>

        <div className={styles.formCard}>
          <Suspense fallback={<div className={styles.formSkeleton} aria-hidden="true" />}>
            <ContactForm groups={interestGroups} fallbackEmail={site.email} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
