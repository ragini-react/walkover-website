const paths = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  arrowUpRight: "M7 17 17 7m-9 0h9v9",
  chevronDown: "m6 9 6 6 6-6",
  plus: "M12 5v14M5 12h14",
  check: "m5 12.5 4.5 4.5L19 7.5",
  menu: "M4 8h16M4 16h16",
  close: "M6 6l12 12M18 6 6 18",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M6.6 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
} as const;

export type IconName = keyof typeof paths;

type IconProps = { name: IconName; size?: number; className?: string; strokeWidth?: number };

/** Decorative stroke icons. Always hidden from assistive tech: the
 *  surrounding control carries the accessible name. */
export function Icon({ name, size = 18, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
