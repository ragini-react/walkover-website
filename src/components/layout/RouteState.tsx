"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Marks the document once the visitor has navigated client-side, so the
 *  route entrance animation never delays the very first paint. */
export function RouteState() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    document.documentElement.classList.add("navigated");
  }, [pathname]);
  return null;
}
