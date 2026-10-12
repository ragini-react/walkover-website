"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LIMITS, normalise, validate, type ContactErrors, type ContactInput } from "@/lib/contact";
import type { InterestGroup } from "@/lib/contact-options";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import styles from "./ContactForm.module.scss";

type Status = "idle" | "submitting" | "success" | "error";

const empty: ContactInput = { name: "", email: "", company: "", interest: "", message: "" };

// The site is a static export with no server of its own, so enquiries are
// POSTed straight from the browser to this endpoint (for example a viaSocket
// webhook trigger), set at build time. It ships in the page, so it must be a
// URL that is safe to make public and that allows cross-origin POSTs.
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export function ContactForm({ groups, fallbackEmail }: { groups: InterestGroup[]; fallbackEmail: string }) {
  const params = useSearchParams();
  const id = useId();
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const allowed = new Set(groups.flatMap((g) => g.options.map((o) => o.value)));

  // Pre-select the topic when arriving from a product or solution page.
  useEffect(() => {
    const interest = params.get("interest");
    if (interest && allowed.has(interest)) setValues((v) => ({ ...v, interest }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (field: keyof ContactInput, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(normalise(next), allowed));
  };

  const blur = (field: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(normalise(values), allowed));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    const clean = normalise(values);
    const found = validate(clean, allowed);
    setErrors(found);
    setTouched({ name: true, email: true, message: true, interest: true, company: true });
    if (Object.keys(found).length) {
      track("contact_error", { reason: "validation" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Honeypot: real people never see or fill this field. Bots get a fake success.
    if (honeypot.trim() !== "") {
      setStatus("success");
      return;
    }
    if (!endpoint) {
      if (process.env.NODE_ENV !== "production") {
        console.info("[contact] NEXT_PUBLIC_CONTACT_ENDPOINT not set; enquiry accepted in development only.", {
          interest: clean.interest,
        });
        setStatus("success");
        return;
      }
      setServerError(`Our form is temporarily unavailable. Please email ${fallbackEmail} instead.`);
      setStatus("error");
      track("contact_error", { reason: "unconfigured" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...clean, source: "walkover.in/contact", receivedAt: new Date().toISOString() }),
      });
      // A plain webhook answers with any 2xx; an endpoint that validates may
      // reply { ok: false, error?, errors? } like the old /api/contact route.
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (res.ok && data.ok !== false) {
        setStatus("success");
        track("contact_submit", { interest: clean.interest || "none" });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(
        data.error ??
          (data.errors
            ? "Please check the highlighted fields."
            : `We could not send your message just now. Please try again or email ${fallbackEmail}.`),
      );
      setStatus("error");
      track("contact_error", { reason: String(res.status) });
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setServerError(`We could not reach our server. Check your connection, or email ${fallbackEmail}.`);
      setStatus("error");
      track("contact_error", { reason: "network" });
    }
  };

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className={styles.success} role="status">
        <span className={styles.successMark} aria-hidden="true">
          <Icon name="check" size={28} strokeWidth={2.5} />
        </span>
        <h2 className="t-h3">Message received. Your move is made.</h2>
        <p className="t-muted">
          Thanks, {values.name.split(" ")[0]}. Someone from the right team will reply to {values.email}. If it is
          urgent, call us on weekdays.
        </p>
        <button
          type="button"
          className={buttonClass("secondary")}
          onClick={() => {
            setValues(empty);
            setTouched({});
            setErrors({});
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldError = (f: keyof ContactInput) => (touched[f] ? errors[f] : undefined);
  const describe = (f: keyof ContactInput, hint?: boolean) =>
    [fieldError(f) && `${id}-${f}-error`, hint && `${id}-${f}-hint`].filter(Boolean).join(" ") || undefined;
  const errorList = (Object.keys(errors) as (keyof ContactInput)[]).filter((f) => touched[f] && errors[f]);

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={`${id}-required`}>
      <div ref={summaryRef} tabIndex={-1} className={styles.summaryWrap} aria-live="assertive">
        {(errorList.length > 0 || serverError) && status !== "submitting" && (
          <div className={styles.summary} role="alert">
            <p className={styles.summaryTitle}>{serverError || "Please fix the following:"}</p>
            {errorList.length > 0 && (
              <ul>
                {errorList.map((f) => (
                  <li key={f}>
                    <a href={`#${id}-${f}`}>{errors[f]}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <p id={`${id}-required`} className={styles.required}>
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className={styles.row}>
        <Field label="Your name" required error={fieldError("name")} id={`${id}-name`}>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={Boolean(fieldError("name"))}
            aria-describedby={describe("name")}
            required
          />
        </Field>
        <Field label="Work email" required error={fieldError("email")} id={`${id}-email`}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={Boolean(fieldError("email"))}
            aria-describedby={describe("email")}
            required
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Company" id={`${id}-company`} optional>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            maxLength={LIMITS.company}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </Field>
        <Field label="What is this about?" id={`${id}-interest`} optional error={fieldError("interest")}>
          <span className={styles.selectWrap}>
            <select
              id={`${id}-interest`}
              name="interest"
              value={values.interest}
              onChange={(e) => set("interest", e.target.value)}
              aria-invalid={Boolean(fieldError("interest"))}
              aria-describedby={describe("interest")}
            >
              <option value="">Choose a topic</option>
              {groups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <Icon name="chevronDown" size={16} className={styles.selectIcon} />
          </span>
        </Field>
      </div>

      <Field label="How can we help?" required error={fieldError("message")} id={`${id}-message`}>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          maxLength={LIMITS.message}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={Boolean(fieldError("message"))}
          aria-describedby={describe("message", true)}
          required
        />
        <span id={`${id}-message-hint`} className={styles.hint}>
          What are you building or fixing? Volumes, channels or timelines help. {values.message.length}/
          {LIMITS.message}
        </span>
      </Field>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.footer}>
        <button type="submit" className={buttonClass("primary", "lg")} disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <span className={styles.spinner} aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <Icon name="arrow" size={16} strokeWidth={2} />
            </>
          )}
        </button>
        <p className={styles.privacy}>
          We use your details only to reply. See our <Link href="/privacy">privacy notice</Link>.
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your message" : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field} data-invalid={error ? "" : undefined}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.req} aria-hidden="true">
            *
          </span>
        )}
        {optional && <span className={styles.opt}>Optional</span>}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
