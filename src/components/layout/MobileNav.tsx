"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { ProductLogo } from "@/components/ui/ProductLogo";
import { buttonClass } from "@/components/ui/Button";
import type { MenuSection } from "./nav-data";
import styles from "./MobileNav.module.scss";

/** Full-screen mobile menu built on <dialog>, which provides the focus trap,
 *  Escape handling and inert background natively. */
export function MobileNav({ nav }: { nav: MenuSection[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Icon name="menu" size={22} />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Site menu"
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.top}>
          <Link href="/" className={styles.brand} aria-label="Walkover, home" onClick={close}>
            <Logo className={styles.logo} />
          </Link>
          <button type="button" className={styles.toggle} onClick={close} autoFocus>
            <Icon name="close" size={22} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Mobile" className={styles.body}>
          {nav.map((section, index) => (
            <details key={section.id} className={styles.section} open={index === 0}>
              <summary className={styles.summary}>
                <span>{section.label}</span>
                <Icon name="plus" size={18} className={styles.plus} />
              </summary>
              <ul role="list" className={styles.list}>
                <li>
                  <Link href={section.href} className={styles.overview} onClick={close}>
                    {section.id === "company" ? "About Walkover" : `All ${section.label.toLowerCase()}`}
                    <Icon name="arrow" size={15} strokeWidth={2} />
                  </Link>
                </li>
                {section.groups.flatMap((g) => g.items).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.link}
                      onClick={close}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.logo && <ProductLogo product={{ logo: item.logo }} className={styles.logoMark} />}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>

        <div className={styles.footer}>
          <Link href="/contact" className={buttonClass("primary", "lg")} onClick={close}>
            Talk to us
          </Link>
        </div>
      </dialog>
    </>
  );
}
