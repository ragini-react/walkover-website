"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import type { MenuSection } from "./nav-data";
import { MobileNav } from "./MobileNav";
import styles from "./Header.module.css";

export function Header({ nav }: { nav: MenuSection[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  const close = useCallback(() => setOpen(null), []);

  // Close menus on navigation.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Condense on scroll; tuck away when scrolling down, return when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        setHidden(y > 480 && y > last + 4);
        if (y < last - 4) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape and outside click close the open panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = document.getElementById(`nav-trigger-${open}`);
        close();
        trigger?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  // Hover intent for fine pointers; clicks always work.
  const hoverOpen = (id: string) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(id), open ? 0 : 90);
  };
  const hoverClose = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(close, 220);
  };

  const isActive = (section: MenuSection) =>
    pathname === section.href ||
    pathname.startsWith(`${section.href}/`) ||
    section.groups.some((g) => g.items.some((i) => pathname.startsWith(i.href)));

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-scrolled={scrolled || open ? "" : undefined}
      data-hidden={hidden && !open ? "" : undefined}
      onMouseLeave={hoverClose}
    >
      <div className={`container-wide ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Walkover, home">
          <Logo className={styles.logo} />
        </Link>

        <nav aria-label="Main" className={styles.nav}>
          <ul role="list" className={styles.navList}>
            {nav.map((section) => {
              const expanded = open === section.id;
              return (
                <li key={section.id} onMouseEnter={() => hoverOpen(section.id)}>
                  <button
                    type="button"
                    id={`nav-trigger-${section.id}`}
                    className={styles.trigger}
                    aria-expanded={expanded}
                    aria-controls={`nav-panel-${section.id}`}
                    data-active={isActive(section) ? "" : undefined}
                    onClick={() => setOpen(expanded ? null : section.id)}
                  >
                    {section.label}
                    <Icon name="chevronDown" size={14} strokeWidth={2} className={styles.chev} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link
            href="/contact"
            className={buttonClass("primary", "md", styles.cta)}
            data-track="cta_click"
            data-track-label="header_contact"
          >
            Talk to us
          </Link>
          <MobileNav nav={nav} />
        </div>
      </div>

      {nav.map((section) => (
        <div
          key={section.id}
          id={`nav-panel-${section.id}`}
          className={styles.panel}
          hidden={open !== section.id}
          onMouseEnter={() => window.clearTimeout(hoverTimer.current)}
        >
          <div className={`container-wide ${styles.panelInner}`}>
            <div className={styles.panelIntro}>
              <p className="t-label t-muted">{section.label}</p>
              <p className={styles.panelTitle}>{section.intro}</p>
              <Link
                href={section.href}
                className={styles.panelAll}
                data-track="nav_click"
                data-track-label={`${section.id}_overview`}
              >
                {section.id === "company" ? "About Walkover" : `All ${section.label.toLowerCase()}`}
                <Icon name="arrow" size={15} strokeWidth={2} />
              </Link>
            </div>
            <div
              className={styles.panelGroups}
              data-columns={Math.min(section.groups.length, 4)}
              data-dense={section.groups[0].items.length > 6 ? "" : undefined}
            >
              {section.groups.map((group) => (
                <div key={group.title} className={styles.group}>
                  <p className={`t-label ${styles.groupTitle}`}>{group.title}</p>
                  <ul role="list">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={styles.item}
                          aria-current={pathname === item.href ? "page" : undefined}
                          data-track="nav_click"
                          data-track-label={item.href}
                        >
                          {item.color && (
                            <span className={styles.pip} style={{ background: item.color }} aria-hidden="true" />
                          )}
                          <span>
                            <span className={styles.itemLabel}>{item.label}</span>
                            {item.description && (
                              <span className={styles.itemDesc}>{item.description}</span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {section.feature && (
              <Link href={section.feature.href} className={styles.feature}>
                <span className={styles.featureBoard} aria-hidden="true">
                  {Array.from({ length: 9 }, (_, i) => (
                    <span key={i} style={section.featureColors?.[i] ? { background: section.featureColors[i] } : undefined} />
                  ))}
                </span>
                <span className={styles.featureTitle}>{section.feature.title}</span>
                <span className={styles.featureBody}>{section.feature.body}</span>
                <span className={styles.featureCta}>
                  {section.feature.cta} <Icon name="arrow" size={15} strokeWidth={2} />
                </span>
              </Link>
            )}
          </div>
        </div>
      ))}
    </header>
  );
}
