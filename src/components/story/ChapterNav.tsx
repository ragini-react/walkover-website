"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChapterNav.module.scss";

type Item = { id: string; n: string; label: string };

/**
 * Sticky chapter index for /our-story. Without JS it is a plain list of
 * anchor links; with JS it marks the chapter being read and draws a
 * progress line across the bar. No scroll hijacking: links jump natively.
 */
export function ChapterNav({ items, scopeId }: { items: Item[]; scopeId: string }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const current = items.find((i) => visible.has(i.id));
        if (current) setActive(current.id);
      },
      // A thin reading band a third of the way down the viewport.
      { rootMargin: "-32% 0px -64% 0px" },
    );
    for (const i of items) {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    }

    const scope = document.getElementById(scopeId);
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!scope || !navRef.current) return;
      const r = scope.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.33 - r.top) / r.height));
      navRef.current.style.setProperty("--progress", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items, scopeId]);

  // Keep the active chapter in view inside the horizontally scrolling list.
  useEffect(() => {
    const list = listRef.current;
    const link = active && list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav ref={navRef} aria-label="Chapters" className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <span className={`t-label ${styles.label}`} aria-hidden="true">
          Chapters
        </span>
        <ol role="list" ref={listRef} className={styles.list}>
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                data-id={i.id}
                className={styles.link}
                aria-current={active === i.id ? "true" : undefined}
              >
                <span className={styles.n}>{i.n}</span>
                {i.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <span className={styles.progress} aria-hidden="true" />
    </nav>
  );
}
