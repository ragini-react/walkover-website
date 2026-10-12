"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import styles from "./Board.module.scss";

const SAMPLE = 6; // px between path samples
const CELL = 30; // track cell length (dash), matched in CSS
const LINE = 0.55; // the die rests where the track crosses this fraction of the viewport
const FOLLOW = 25; // ms time constant for the die catching up with the scroll
const HOLD_SPEED = 650; // px/s the page scrolls while the die is held still
const HOLD_DEAD = 12; // px the pointer can wander from where it pressed without effect
const HOLD_GAIN = 6; // extra px/s per px dragged beyond that
const HOLD_MAX = 2600; // fastest scroll, px/s
const HOLD_EASE = 160; // ms time constant for easing up to (or between) speeds

type Sample = { x: number; y: number };

/**
 * The homepage as a game board.
 *
 * Children are `BoardStep`s. Each step marks one square with a `[data-stop]`
 * element. On layout the board measures every stop and draws one continuous
 * track of square cells through them: down a step's lane, across the gap,
 * down the next lane. As the visitor scrolls, the Walkover die rolls along
 * the track, cells behind it fill with Walkover red, and each square is
 * marked as reached. The die can also be pressed and held: the page then
 * scrolls down by itself, easing up to a steady speed, and stops the moment
 * it is let go. Dragging further down speeds it up; dragging up reverses it.
 *
 * Scroll work: one passive listener, batched into rAF, a binary search over
 * precomputed samples, and transform/attribute writes only.
 */
export function Board({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tokenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    const token = tokenRef.current;
    if (!root || !svg || !token) return;

    const paths = svg.querySelectorAll<SVGPathElement>("[data-track]");
    const mask = svg.querySelector<SVGPathElement>("[data-progress]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let samples: Sample[] = [];
    let total = 0;
    let stops: { el: HTMLElement; len: number }[] = [];
    let current = 0;
    let target = 0;
    let raf = 0;

    const build = () => {
      const box = root.getBoundingClientRect();
      const w = box.width;
      const h = root.scrollHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.style.height = `${h}px`;

      const stopEls = [...root.querySelectorAll<HTMLElement>("[data-stop]")];
      if (stopEls.length < 2) return;
      const pts = stopEls.map((el) => {
        const r = el.getBoundingClientRect();
        const step = el.closest<HTMLElement>("[data-step]")!.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - box.left,
          y: r.top + r.height / 2 - box.top,
          bottom: step.bottom - box.top,
        };
      });

      // Down the lane to the bottom of the step, then an S-curve across the
      // gap into the next lane, then down to the next stop.
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        if (Math.abs(a.x - b.x) < 2) {
          d += ` L ${b.x} ${b.y}`;
          continue;
        }
        const exitY = Math.max(a.y, a.bottom - 40);
        const enterY = Math.max(exitY + 80, b.y - 140);
        const mid = (exitY + enterY) / 2;
        d += ` L ${a.x} ${exitY} C ${a.x} ${mid} ${b.x} ${mid} ${b.x} ${enterY} L ${b.x} ${b.y}`;
      }
      paths.forEach((p) => p.setAttribute("d", d));
      mask?.setAttribute("d", d);

      const probe = paths[0];
      total = probe.getTotalLength();
      samples = [];
      for (let l = 0; l <= total; l += SAMPLE) {
        const p = probe.getPointAtLength(l);
        samples.push({ x: p.x, y: p.y });
      }
      stops = stopEls.map((el, i) => {
        let best = 0;
        let bestD = Infinity;
        for (let k = 0; k < samples.length; k++) {
          const dist = Math.hypot(samples[k].x - pts[i].x, samples[k].y - pts[i].y);
          if (dist < bestD) {
            bestD = dist;
            best = k;
          }
        }
        return { el, len: best * SAMPLE };
      });
      root.setAttribute("data-ready", "");
      measure();
      current = target;
      paint();
    };

    /** Track length at the point level with 55% of the viewport height. */
    const measure = () => {
      if (!samples.length) return;
      const top = root.getBoundingClientRect().top;
      const y = window.innerHeight * LINE - top;
      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y < y) lo = mid + 1;
        else hi = mid;
      }
      target = Math.min(total, lo * SAMPLE);
    };

    const paint = () => {
      if (!samples.length) return;
      const idx = Math.min(samples.length - 1, Math.round(current / SAMPLE));
      const p = samples[idx];
      // Roll: the die turns in proportion to the distance it travels.
      token.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${(current / (CELL * 4)) * 90}deg)`;
      mask?.setAttribute("stroke-dasharray", `${current} ${total + 1}`);
      for (const s of stops) {
        const reached = current + SAMPLE >= s.len;
        if (reached !== s.el.hasAttribute("data-reached")) s.el.toggleAttribute("data-reached", reached);
      }
    };

    // The die rides with the scroll: a short, frame-rate independent ease
    // softens jumps without visibly trailing the page.
    let tickLast = 0;
    const tick = (now: number) => {
      const dt = tickLast ? Math.min(64, now - tickLast) : 16;
      const delta = target - current;
      current = reduced || Math.abs(delta) < 0.5 ? target : current + delta * (1 - Math.exp(-dt / FOLLOW));
      paint();
      tickLast = current === target ? 0 : now;
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Holding the die: from press to release the page scrolls on its own,
    // easing up to HOLD_SPEED (down = down the track). Dragging below the
    // press point adds speed; dragging above it scrolls back up. The die is
    // never placed by hand: it follows the scroll like any other.
    const html = document.documentElement;
    let drag: { id: number; from: number; y: number } | null = null;
    let dragRaf = 0;
    let dragLast = 0;
    let speed = 0;
    let scrollAt = 0;

    const dragFrame = (now: number) => {
      if (!drag) return;
      const dt = Math.min(64, now - dragLast);
      dragLast = now;
      const off = drag.y - drag.from;
      const extra = Math.max(0, Math.abs(off) - HOLD_DEAD) * HOLD_GAIN;
      const dir = off < -HOLD_DEAD ? -1 : 1;
      const want = dir * Math.min(HOLD_MAX, HOLD_SPEED + extra);
      speed = reduced ? want : speed + (want - speed) * (1 - Math.exp(-dt / HOLD_EASE));
      const max = html.scrollHeight - window.innerHeight;
      scrollAt = Math.max(0, Math.min(max, scrollAt + (speed * dt) / 1000));
      window.scrollTo(0, scrollAt);
      dragRaf = requestAnimationFrame(dragFrame);
    };

    const endDrag = () => {
      if (!drag) return;
      if (token.hasPointerCapture(drag.id)) token.releasePointerCapture(drag.id);
      drag = null;
      speed = 0;
      cancelAnimationFrame(dragRaf);
      dragRaf = 0;
      html.style.scrollBehavior = "";
      html.removeAttribute("data-die-drag");
      root.removeAttribute("data-dragging");
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!samples.length || drag || (e.pointerType === "mouse" && e.button !== 0)) return;
      e.preventDefault();
      token.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId, from: e.clientY, y: e.clientY };
      scrollAt = window.scrollY;
      speed = 0;
      dragLast = performance.now();
      dragRaf = requestAnimationFrame(dragFrame);
      // The page's CSS smooth scrolling would lag every frame's scrollTo.
      html.style.scrollBehavior = "auto";
      // Pointer cursor everywhere for as long as the button is held.
      html.setAttribute("data-die-drag", "");
      root.setAttribute("data-dragging", "");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      drag.y = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (drag && e.pointerId === drag.id) endDrag();
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 120);
    };

    build();
    document.fonts?.ready.then(build);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    token.addEventListener("pointerdown", onPointerDown);
    token.addEventListener("pointermove", onPointerMove);
    token.addEventListener("pointerup", onPointerUp);
    token.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      endDrag();
      token.removeEventListener("pointerdown", onPointerDown);
      token.removeEventListener("pointermove", onPointerMove);
      token.removeEventListener("pointerup", onPointerUp);
      token.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.board}>
      <svg ref={svgRef} className={styles.track} aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <mask id="board-progress" maskUnits="userSpaceOnUse">
            <path data-progress="" className={styles.maskPath} />
          </mask>
        </defs>
        <path data-track="" className={styles.rail} />
        <path data-track="" className={styles.cells} />
        <path data-track="" className={styles.filled} mask="url(#board-progress)" />
      </svg>
      <div ref={tokenRef} className={styles.token} aria-hidden="true">
        <Logo variant="mark" className={styles.tokenMark} />
      </div>
      {children}
    </div>
  );
}

type StepProps = {
  /** Which side the content sits on; the track runs through the other. */
  side: "left" | "right" | "center";
  /** Shown on the square's marker, e.g. "Start". Without one the marker is an
   *  invisible waypoint that only steers the track. */
  label?: string;
  /** Marker fill once reached; defaults to Walkover red. */
  color?: string;
  /** Text colour on the filled marker. */
  ink?: string;
  /** Content shown in the lane, around the marker (e.g. the hero die). */
  lane?: ReactNode;
  /** Put the marker below the lane content instead of above it. */
  markerLast?: boolean;
  /** Render the marker as the large HOME square (finish), painted with these colours. */
  home?: string[];
  id?: string;
  children?: ReactNode;
};

/** One square on the board: content block + lane with its marker. */
export function BoardStep({ side, label, color, ink, lane, markerLast, home, id, children }: StepProps) {
  // Ludo's centre "home" square, split into one slice per product colour.
  const homeFill = home
    ? `conic-gradient(from 45deg, ${home
        .map((c, i) => `${c} ${(i / home.length) * 360}deg ${((i + 1) / home.length) * 360}deg`)
        .join(", ")})`
    : undefined;
  const marker = (
    <span
      className={`${styles.stop} ${home ? styles.home : ""} ${!label && !home ? styles.waypoint : ""}`}
      data-stop=""
      style={
        {
          "--stop": color ?? "var(--signal)",
          "--stop-ink": ink ?? "var(--white)",
          ...(homeFill && { "--home": homeFill }),
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {home ? <Logo variant="mark" className={styles.homeMark} /> : label}
    </span>
  );
  return (
    <section className={styles.step} data-step="" data-side={side} id={id}>
      {children && <div className={styles.content}>{children}</div>}
      <div className={styles.lane}>
        {!markerLast && marker}
        {lane}
        {markerLast && marker}
      </div>
    </section>
  );
}
