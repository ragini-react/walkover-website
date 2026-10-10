import Image from "next/image";
import { getProduct } from "@/content";
import {
  evidenceLabels,
  formatEventDate,
  formatPlace,
  kindLabels,
  roleLabels,
  type EventOwner,
  type EventRecord,
} from "@/content/events";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import styles from "./Events.module.css";

/** Display name and colour for an owner; Walkover uses its own signal red. */
export function ownerBrand(owner: EventOwner): { name: string; color: string } {
  if (owner === "walkover") return { name: site.name, color: "#dc281e" };
  const p = getProduct(owner)!;
  return { name: p.name, color: p.brand.color };
}

const sourceKindLabels: Record<EventRecord["sources"][number]["kind"], string> = {
  company: "Company",
  team: "Team member",
  organizer: "Organiser",
  media: "Press",
  archive: "Archive",
};

function formatSourceDate(iso?: string) {
  if (!iso) return undefined;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** One event: date, products, place, what the team did, and the sources. */
export function EventCard({
  event: e,
  current,
  headingLevel = 3,
}: {
  event: EventRecord;
  current?: EventOwner;
  headingLevel?: 3 | 4;
}) {
  const Title = headingLevel === 3 ? "h3" : "h4";
  // On a product's page, list that product first.
  const owners = current ? [current, ...e.owners.filter((o) => o !== current)] : e.owners;
  return (
    <article id={e.id.toLowerCase()} className={styles.card} data-has-photo={e.photo ? "" : undefined}>
      <div className={styles.when}>
        <time dateTime={e.start}>{formatEventDate(e)}</time>
        {e.dateNote && <span className={styles.dateNote}>{e.dateNote}</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          {owners.map((o) => {
            const b = ownerBrand(o);
            return (
              <span key={o} className={styles.owner} style={{ "--c": b.color } as React.CSSProperties}>
                <span className={styles.dot} aria-hidden="true" />
                {b.name}
              </span>
            );
          })}
          <span className={styles.kind}>{kindLabels[e.kind]}</span>
          <span className={styles.evidence} data-evidence={e.evidence} title={evidenceLabels[e.evidence].note}>
            {evidenceLabels[e.evidence].label}
          </span>
        </div>

        <Title className={`t-h4 ${styles.title}`}>
          {e.url ? (
            <a href={e.url} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
              {e.title}
              {e.edition && <span className={styles.edition}> {e.edition}</span>}
              <Icon name="arrowUpRight" size={16} className={styles.titleIcon} />
              <span className="sr-only"> (official event page, opens in a new tab)</span>
            </a>
          ) : (
            <>
              {e.title}
              {e.edition && <span className={styles.edition}> {e.edition}</span>}
            </>
          )}
        </Title>

        <p className={styles.where}>
          <Icon name="pin" size={15} />
          <span>
            {formatPlace(e)}
            {e.booth && <> · {e.booth}</>}
            {e.organizer && <span className={styles.organizer}> · Organised by {e.organizer}</span>}
          </span>
        </p>

        <p className={styles.summary}>{e.summary}</p>

        {e.roles.length > 0 && (
          <ul role="list" className={styles.roles} aria-label="Role at the event">
            {e.roles.map((r) => (
              <li key={r}>{roleLabels[r]}</li>
            ))}
          </ul>
        )}

        {(e.people?.length || e.showcased?.length || e.outcomes?.length) && (
          <dl className={styles.facts}>
            {e.people && e.people.length > 0 && (
              <div>
                <dt>Team</dt>
                <dd>
                  {e.people.map((p, i) => (
                    <span key={p.name}>
                      {i > 0 && "; "}
                      {p.name}
                      {p.title && <span className={styles.muted}>, {p.title}</span>}
                      <span className={styles.muted}> ({p.role})</span>
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {e.showcased && e.showcased.length > 0 && (
              <div>
                <dt>Showcased</dt>
                <dd>{e.showcased.join(", ")}</dd>
              </div>
            )}
            {e.outcomes && e.outcomes.length > 0 && (
              <div>
                <dt>Outcome</dt>
                <dd>{e.outcomes.join(" ")}</dd>
              </div>
            )}
          </dl>
        )}

        <details className={styles.sources}>
          <summary>
            Sources ({e.sources.length})
            {e.open && " and open questions"}
            <Icon name="chevronDown" size={16} className={styles.chevron} />
          </summary>
          <ol role="list" className={styles.sourceList}>
            {e.sources.map((s) => (
              <li key={s.url}>
                <span className={styles.sourceKind}>{sourceKindLabels[s.kind]}</span>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                  {s.title}
                </a>
                <span className={styles.muted}>
                  {" "}
                  · {s.publisher}
                  {s.date && <> · {formatSourceDate(s.date)}</>}
                </span>
              </li>
            ))}
          </ol>
          {e.open && (
            <p className={styles.open}>
              <strong>Still open:</strong> {e.open}
            </p>
          )}
          <p className={styles.ledgerId}>Record {e.id}</p>
        </details>
      </div>

      {e.photo && (
        <figure className={styles.photo}>
          <Image
            src={e.photo.src}
            width={e.photo.width}
            height={e.photo.height}
            alt={e.photo.alt}
            sizes="(min-width: 1040px) 280px, (min-width: 700px) 40vw, 100vw"
          />
          <figcaption>
            The venue, not the event. Photo:{" "}
            <a href={e.photo.sourceUrl} target="_blank" rel="noopener noreferrer">
              {e.photo.author}
            </a>
            ,{" "}
            <a href={e.photo.licenseUrl} target="_blank" rel="noopener noreferrer">
              {e.photo.license}
            </a>
          </figcaption>
        </figure>
      )}
    </article>
  );
}
