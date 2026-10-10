"use client";

import { useEffect } from "react";
import { track, type TrackEvent, type TrackProps } from "@/lib/analytics";

/** One delegated listener turns `data-track` attributes into analytics events,
 *  so components never import a tracking SDK. */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const props: TrackProps = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("track") && key !== "track") {
          props[key.slice(5).replace(/^./, (c) => c.toLowerCase())] = value;
        }
      }
      track(el.dataset.track as TrackEvent, props);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
