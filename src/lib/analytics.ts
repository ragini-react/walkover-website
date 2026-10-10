/**
 * Analytics seam.
 *
 * UI never talks to a vendor directly. Interactive elements carry
 * `data-track="event_name"` (+ optional `data-track-*` props) and a single
 * delegated listener (see <AnalyticsListener />) forwards them here.
 * To connect a provider, implement `send` — nothing else changes.
 */

export type TrackEvent =
  | "cta_click"
  | "nav_click"
  | "product_explore"
  | "solution_explore"
  | "resource_click"
  | "contact_submit"
  | "contact_error"
  | "careers_click"
  | "outbound_click";

export type TrackProps = Record<string, string | number | boolean | undefined>;

type Sink = (event: TrackEvent, props: TrackProps) => void;

const sinks: Sink[] = [];

/** Register a provider (e.g. GA4, PostHog). Returns an unsubscribe fn. */
export function registerAnalyticsSink(sink: Sink): () => void {
  sinks.push(sink);
  return () => {
    const i = sinks.indexOf(sink);
    if (i >= 0) sinks.splice(i, 1);
  };
}

export function track(event: TrackEvent, props: TrackProps = {}): void {
  if (typeof window === "undefined") return;
  for (const sink of sinks) {
    try {
      sink(event, props);
    } catch {
      /* a broken provider must never break the UI */
    }
  }
  window.dispatchEvent(new CustomEvent("walkover:track", { detail: { event, props } }));
}
