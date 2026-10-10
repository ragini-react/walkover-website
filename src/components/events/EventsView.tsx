import Link from "next/link";
import {
  eventOwners,
  events as allEvents,
  eventsFor,
  evidenceLabels,
  primaryOwner,
  type EventOwner,
  type EventRecord,
  type Evidence,
} from "@/content/events";
import { PageHero } from "@/components/sections/PageHero";
import { EventCard, ownerBrand } from "./EventCard";
import styles from "./Events.module.css";

const ownerIntro: Record<EventOwner, string> = {
  msg91: "Messaging, telecom, customer-experience and commerce events where MSG91 and Hello by MSG91 exhibited, spoke or hosted.",
  giddh: "Accounting, finance and chartered-accountant events where Giddh took part.",
  viasocket:
    "Hackathons, developer communities, workshops and partner webinars built around viaSocket, including those Walkover hosted for it.",
  walkover: "Community events Walkover hosted at its Indore office that are not tied to one product.",
};

const evidenceOrder: Evidence[] = ["confirmed", "corroborated", "team-account", "announced", "associated"];

export function EventsView({ owner }: { owner?: EventOwner }) {
  const list = [...eventsFor(owner)].sort((a, b) => b.start.localeCompare(a.start));

  const name = owner ? ownerBrand(owner).name : undefined;
  const crumbs = [{ name: "Events", path: "/events" }];
  if (owner) crumbs.push({ name: name!, path: `/events/${owner}` });

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={owner ? `${name} events` : "Events"}
        title={owner ? `Where ${name} has shown up.` : "Where the Walkover teams have shown up."}
        lead={
          owner
            ? `Conferences, exhibitions, hackathons, workshops and webinars that ${name} has attended, exhibited at, sponsored or hosted. Each one is listed with its sources and how well it is documented.`
            : "Conferences, exhibitions, hackathons, workshops and webinars attended, exhibited at, sponsored or hosted by MSG91, Giddh, viaSocket and Walkover. Each one is listed with its sources and how well it is documented."
        }
        aside={<Legend />}
      />

      <section className="section-tight" aria-label="Events">
        <div className="container">
          <nav aria-label="Filter events by product">
            <ul role="list" className={styles.filters}>
              <li>
                <Link href="/events" className={styles.filter} aria-current={!owner ? "page" : undefined}>
                  All <span className={styles.count}>{allEvents.length}</span>
                </Link>
              </li>
              {eventOwners.map((o) => {
                const b = ownerBrand(o);
                const n = eventsFor(o).length;
                if (!n) return null;
                return (
                  <li key={o}>
                    <Link
                      href={`/events/${o}`}
                      className={styles.filter}
                      aria-current={owner === o ? "page" : undefined}
                      style={{ "--c": b.color } as React.CSSProperties}
                    >
                      <span className={styles.dot} aria-hidden="true" />
                      {b.name} <span className={styles.count}>{n}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>


          {owner ? (
            <Timeline events={list} owner={owner} level={2} />
          ) : (
            eventOwners.map((o) => {
              const group = list.filter((e) => primaryOwner(e) === o);
              if (!group.length) return null;
              const b = ownerBrand(o);
              return (
                <section
                  key={o}
                  id={o}
                  aria-labelledby={`owner-${o}`}
                  className={styles.ownerSection}
                  style={{ "--c": b.color } as React.CSSProperties}
                >
                  <header className={styles.ownerHead}>
                    <h2 id={`owner-${o}`} className={`t-h2 ${styles.ownerTitle}`}>
                      <span className={styles.ownerMark} aria-hidden="true" />
                      {b.name}
                      <span className={styles.ownerCount}>
                        {group.length} {group.length === 1 ? "event" : "events"}
                      </span>
                    </h2>
                    <p className={styles.ownerIntro}>{ownerIntro[o]}</p>
                  </header>
                  <Timeline events={group} owner={o} level={3} />
                </section>
              );
            })
          )}

          {list.length === 0 && <p className={styles.empty}>No events recorded yet.</p>}

        </div>
      </section>
    </>
  );
}

/** Events grouped by year, newest first. */
function Timeline({ events, owner, level }: { events: EventRecord[]; owner: EventOwner; level: 2 | 3 }) {
  const years = [...new Set(events.map((e) => e.start.slice(0, 4)))];
  const Heading = level === 2 ? "h2" : "h3";
  const groups = years.map((y) => ({ key: y, label: y, items: events.filter((e) => e.start.startsWith(y)) }));
  return groups.map((g) => {
    const id = `${owner}-${g.key}`;
    return (
      <section key={g.key} aria-labelledby={id} className={styles.group}>
        <Heading id={id} className={`t-h3 ${styles.groupTitle}`}>
          {g.label}
        </Heading>
        <ol role="list" className={styles.list}>
          {g.items.map((e) => (
            <li key={e.id}>
              <EventCard event={e} current={owner} headingLevel={level === 2 ? 3 : 4} />
            </li>
          ))}
        </ol>
      </section>
    );
  });
}

function Legend() {
  return (
    <div className={styles.legend}>
      <h2 className={`t-label ${styles.legendTitle}`}>How each event is documented</h2>
      <dl className={styles.legendList}>
        {evidenceOrder.map((k) => (
          <div key={k}>
            <dt>
              <span className={styles.evidence} data-evidence={k}>
                {evidenceLabels[k].label}
              </span>
            </dt>
            <dd>{evidenceLabels[k].note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
