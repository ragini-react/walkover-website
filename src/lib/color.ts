/** Colours are authored in OKLCH everywhere. A few consumers cannot read
 *  OKLCH (the next/og image renderer, the web app manifest, the theme-color
 *  meta tag on older browsers), so this converts an `oklch(L% C H / A)`
 *  string to sRGB hex, or rgba() when it has alpha, at that boundary. */
export function toSrgb(color: string): string {
  const m = color.match(/^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)(%?))?\s*\)$/);
  if (!m) throw new Error(`Expected an oklch() colour, got "${color}"`);
  const [L, C, H] = [+m[1] / 100, +m[2], (+m[3] * Math.PI) / 180];
  const a = C * Math.cos(H);
  const b = C * Math.sin(H);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  ].map((v) => {
    const c = Math.min(1, Math.max(0, v));
    return Math.round((c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055) * 255);
  });
  if (m[4] !== undefined) {
    const alpha = m[5] ? +m[4] / 100 : +m[4];
    return `rgba(${rgb.join(", ")}, ${alpha})`;
  }
  return `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
