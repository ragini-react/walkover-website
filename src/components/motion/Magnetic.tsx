"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pulls its child gently toward the pointer. Only active for fine pointers
 * and when motion is allowed; uses rAF + transforms, never layout properties.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    const apply = () => {
      frame = 0;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        transition: "transform 380ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </span>
  );
}
