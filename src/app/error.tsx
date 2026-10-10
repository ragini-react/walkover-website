"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonClass } from "@/components/ui/Button";

/** Route-level error boundary: keeps the shell and offers recovery. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section" style={{ paddingTop: "calc(var(--header-h) + 6rem)" }}>
      <div className="container" style={{ display: "grid", gap: "var(--space-5)", justifyItems: "start" }}>
        <p className="eyebrow">Something went wrong</p>
        <h1 className="t-h1">A move did not go to plan.</h1>
        <p className="t-lead">This part of the page failed to load. Trying again usually fixes it.</p>
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <button type="button" className={buttonClass("primary", "lg")} onClick={reset}>
            Try again
          </button>
          <Link href="/" className={buttonClass("secondary", "lg")}>
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
