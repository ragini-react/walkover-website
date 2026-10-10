import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eventOwners, eventsFor, type EventOwner } from "@/content/events";
import { EventsView } from "@/components/events/EventsView";
import { ownerBrand } from "@/components/events/EventCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { collectionSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Params = Promise<{ product: string }>;

/** Only owners with at least one event get a page. */
const owners = () => eventOwners.filter((o) => eventsFor(o).length > 0);

export function generateStaticParams() {
  return owners().map((product) => ({ product }));
}

function parse(slug: string): EventOwner | undefined {
  return owners().find((o) => o === slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const owner = parse((await params).product);
  if (!owner) return {};
  const { name } = ownerBrand(owner);
  return pageMeta({
    title: `${name} Events — Conferences, Expos, Hackathons & Webinars`,
    description: `Every event ${name} has exhibited at, spoken at, sponsored or hosted, with dates, venues, the team involved and sources for each.`,
    path: `/events/${owner}`,
  });
}

export default async function ProductEventsPage({ params }: { params: Params }) {
  const owner = parse((await params).product);
  if (!owner) notFound();
  const { name } = ownerBrand(owner);
  return (
    <>
      <JsonLd
        data={collectionSchema(
          `${name} events`,
          `/events/${owner}`,
          eventsFor(owner).map((e) => ({ name: e.title, path: `/events/${owner}#${e.id.toLowerCase()}` })),
        )}
      />
      <EventsView owner={owner} />
    </>
  );
}
