import type { Metadata } from "next";
import { events } from "@/content/events";
import { EventsView } from "@/components/events/EventsView";
import { JsonLd } from "@/components/ui/JsonLd";
import { collectionSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Events — MSG91, Giddh & viaSocket at Conferences, Expos and Hackathons",
  description:
    "Conferences, exhibitions, hackathons, workshops and webinars where MSG91, Giddh, viaSocket and Walkover have exhibited, spoken, judged or hosted, with sources for each.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <JsonLd
        data={collectionSchema(
          "Walkover events",
          "/events",
          events.map((e) => ({ name: e.title, path: `/events#${e.id.toLowerCase()}` })),
        )}
      />
      <EventsView />
    </>
  );
}
