"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import styles from "./ProductUniverse.module.css";

export type UniverseProduct = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  color: string;
  /** Text colour that reads on `color` (white or ink). */
  ink: string;
  familyLabel: string;
  connections: { to: string; how: string }[];
};

/** Interactive map of the product ecosystem. Edges come straight from each
 *  product's declared `connections`, so the diagram is never decorative. */
export function ProductUniverse({ items }: { items: UniverseProduct[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const positions = useMemo(
    () =>
      items.map((_, i) => {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        return { x: 50 + Math.cos(angle) * 38, y: 50 + Math.sin(angle) * 38 };
      }),
    [items],
  );

  const indexOf = (slug: string) => items.findIndex((p) => p.slug === slug);

  // Undirected, de-duplicated edge list.
  const edges = useMemo(() => {
    const seen = new Set<string>();
    const list: { a: number; b: number }[] = [];
    items.forEach((p, a) =>
      p.connections.forEach((c) => {
        const b = items.findIndex((q) => q.slug === c.to);
        if (b < 0) return;
        const key = [Math.min(a, b), Math.max(a, b)].join("-");
        if (seen.has(key)) return;
        seen.add(key);
        list.push({ a, b });
      }),
    );
    return list;
  }, [items]);

  const current = items[active];
  const linked = new Set(current.connections.map((c) => indexOf(c.to)));
  // Include inbound links too, so the highlight is symmetric.
  items.forEach((p, i) => {
    if (p.connections.some((c) => c.to === current.slug)) linked.add(i);
  });

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = active;
    if (e.key in keys) next = (active + keys[e.key] + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const inbound = items
    .filter((p) => p.slug !== current.slug && p.connections.some((c) => c.to === current.slug))
    .map((p) => ({ from: p, how: p.connections.find((c) => c.to === current.slug)!.how }));
  const outboundSlugs = new Set(current.connections.map((c) => c.to));
  const relations = [
    ...current.connections.map((c) => ({ slug: c.to, how: c.how })),
    ...inbound.filter((r) => !outboundSlugs.has(r.from.slug)).map((r) => ({ slug: r.from.slug, how: r.how })),
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.map}>
        <svg viewBox="0 0 100 100" className={styles.edges} aria-hidden="true">
          <circle cx="50" cy="50" r="38" className={styles.orbit} />
          {positions.map((p, i) => (
            <line key={`hub-${i}`} x1="50" y1="50" x2={p.x} y2={p.y} className={styles.spoke} data-on={i === active ? "" : undefined} />
          ))}
          {edges.map(({ a, b }) => {
            const on = (a === active && linked.has(b)) || (b === active && linked.has(a));
            const pa = positions[a];
            const pb = positions[b];
            // Curve each edge toward the centre so the map reads as a system.
            const cx = (pa.x + pb.x) / 2 + (50 - (pa.x + pb.x) / 2) * 0.55;
            const cy = (pa.y + pb.y) / 2 + (50 - (pa.y + pb.y) / 2) * 0.55;
            return (
              <path
                key={`${a}-${b}`}
                d={`M${pa.x} ${pa.y} Q${cx} ${cy} ${pb.x} ${pb.y}`}
                className={styles.edge}
                data-on={on ? "" : undefined}
                style={{ "--c": current.color } as React.CSSProperties}
              />
            );
          })}
        </svg>

        <div className={styles.hub} aria-hidden="true">
          <Logo variant="mark" className={styles.hubMark} />
        </div>

        <div role="tablist" aria-label="Walkover products" aria-orientation="horizontal" className={styles.nodes}>
          {items.map((p, i) => (
            <button
              key={p.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === active ? 0 : -1}
              className={styles.node}
              data-linked={linked.has(i) ? "" : undefined}
              style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%`, "--c": p.color } as React.CSSProperties}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
            >
              <span className={styles.nodeDot} aria-hidden="true" />
              <span className={styles.nodeName}>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className={styles.panel}
        style={{ "--c": current.color, "--c-ink": current.ink } as React.CSSProperties}
      >
        <div key={current.slug} className={styles.panelBody}>
          <p className={`t-label ${styles.family}`}>
            <span className={styles.familyDot} aria-hidden="true" />
            {current.familyLabel} · {current.category}
          </p>
          <h3 className={styles.name}>{current.name}</h3>
          <p className={styles.summary}>{current.summary}</p>

          {relations.length > 0 && (
            <div className={styles.relations}>
              <p className="t-label t-muted">How it connects</p>
              <ul role="list">
                {relations.map((r) => {
                  const other = items[indexOf(r.slug)];
                  return (
                    <li key={r.slug + r.how} className={styles.relation}>
                      <span className={styles.relDot} style={{ background: other?.color }} aria-hidden="true" />
                      <span>
                        <span className={styles.relName}>{other?.name}</span>
                        {r.how}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <Link
            href={`/products/${current.slug}`}
            className={styles.cta}
            data-track="product_explore"
            data-track-label={`universe_${current.slug}`}
          >
            Explore {current.name}
            <Icon name="arrow" size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
