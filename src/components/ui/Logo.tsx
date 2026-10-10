import { DIE_BODY, DIE_PIPS, LOGO_RED, LOGO_VIEWBOX, MARK_VIEWBOX, WORDMARK } from "./logo-paths";

type LogoProps = {
  /** "full" = die + wordmark; "mark" = die only. */
  variant?: "full" | "mark";
  className?: string;
  title?: string;
};

/** The official Walkover mark. The wordmark inherits `currentColor` so it
 *  works on paper and ink surfaces; the die always stays Walkover red. */
export function Logo({ variant = "full", className, title = "Walkover" }: LogoProps) {
  const viewBox = variant === "mark" ? MARK_VIEWBOX : LOGO_VIEWBOX;
  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={title}>
      <path d={DIE_BODY.d} fill={LOGO_RED} />
      <path d={DIE_PIPS.d} fill="oklch(100% 0 0)" />
      {variant === "full" && (
        <path d={WORDMARK.d} transform={WORDMARK.transform} fill="currentColor" fillRule="evenodd" />
      )}
    </svg>
  );
}
