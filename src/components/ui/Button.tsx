import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "brand" | "secondary" | "ghost" | "inverse";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  icon?: IconName | null;
  /** Analytics event label; forwarded as data attributes. */
  track?: string;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className">;

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function buttonClass(variant: Variant = "primary", size: "md" | "lg" = "md", extra?: string) {
  return [styles.button, styles[variant], size === "lg" && styles.lg, extra].filter(Boolean).join(" ");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "arrow",
  track,
  className,
  ...rest
}: ButtonLinkProps) {
  const external = isExternal(href);
  const resolvedIcon = icon === "arrow" && external && href.startsWith("http") ? "arrowUpRight" : icon;
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {resolvedIcon && (
        <span className={styles.icon}>
          <Icon name={resolvedIcon} size={16} strokeWidth={2} />
        </span>
      )}
    </>
  );
  const trackProps = track
    ? { "data-track": external ? "outbound_click" : "cta_click", "data-track-label": track }
    : {};

  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={buttonClass(variant, size, className)}
        {...(newTab && { target: "_blank", rel: "noopener" })}
        {...trackProps}
        {...rest}
      >
        {content}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...trackProps} {...rest}>
      {content}
    </Link>
  );
}

/** Inline text link with an animated arrow. */
export function ArrowLink({
  href,
  children,
  className,
  track,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  track?: string;
}) {
  const external = /^https?:/.test(href);
  const props = {
    className: [styles.arrowLink, className].filter(Boolean).join(" "),
    ...(track && { "data-track": external ? "outbound_click" : "cta_click", "data-track-label": track }),
  };
  const inner = (
    <>
      <span>{children}</span>
      <Icon name={external ? "arrowUpRight" : "arrow"} size={16} strokeWidth={2} />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener" {...props}>
      {inner}
    </a>
  ) : (
    <Link href={href} {...props}>
      {inner}
    </Link>
  );
}
