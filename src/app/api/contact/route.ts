import { NextResponse } from "next/server";
import { normalise, validate } from "@/lib/contact";
import { allowedInterests } from "@/lib/contact-options";
import { site } from "@/content/site";

/**
 * Contact form endpoint.
 *
 * Validates and sanitises input server-side (never trust the client), drops
 * bot submissions via a honeypot, applies a best-effort per-IP rate limit and
 * forwards the enquiry to CONTACT_WEBHOOK_URL (a server-only secret, e.g. a
 * viaSocket webhook trigger). If no destination is configured the endpoint
 * says so honestly instead of pretending the message was delivered.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported request." }, { status: 415 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages in a short time. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const input = normalise(raw);
  const errors = validate(input, allowedInterests);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL not set; enquiry accepted in development only.", {
        interest: input.interest,
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: `Our form is temporarily unavailable. Please email ${site.email} instead.` },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...input, source: "walkover.in/contact", receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("[contact] delivery failed", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, error: `We could not send your message just now. Please try again or email ${site.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
