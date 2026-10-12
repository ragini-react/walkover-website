const PRODUCTION_URL = "https://walkover.in";

/**
 * Origin for canonical URLs, Open Graph, the sitemap and JSON-LD, with no
 * trailing slash. NEXT_PUBLIC_SITE_URL may override it, but only with a public
 * https origin: an http, localhost or malformed value falls back to production
 * so it can never leak into canonical tags. Any path in the value is dropped.
 */
function resolveSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL): string {
  if (!value?.trim()) return PRODUCTION_URL;
  try {
    const url = new URL(value.trim());
    const local = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(url.hostname) || url.hostname.endsWith(".local");
    if (url.protocol === "https:" && !local) return url.origin;
  } catch {
    // Fall through to the warning below.
  }
  console.warn(`Ignoring NEXT_PUBLIC_SITE_URL="${value}": not a public https origin. Using ${PRODUCTION_URL}.`);
  return PRODUCTION_URL;
}

/**
 * Company-wide facts. Sources (checked October 2026): walkover.in, walkover.in/about,
 * walkover.in/careers and the company's social profiles.
 */
export const site = {
  name: "Walkover",
  legalName: "Walkover Web Solutions Pvt. Ltd.",
  url: resolveSiteUrl(),
  tagline: "Software that makes the hard part a walkover.",
  description:
    "Walkover is a product company from Indore, India, building communication, automation and AI software used by businesses worldwide: MSG91, Giddh, viaSocket, DocStar, GTWY AI and more.",
  foundingYear: 2010,
  teamSize: "150+",
  email: "info@walkover.in",
  phone: { display: "+91 731 256 0056", href: "tel:+917312560056", hours: "Mon–Fri, 10:00–20:00 IST" },
  address: {
    lines: ["5th Floor, Wing B, LIC Tower", "Scheme No. 54"],
    street: "5th Floor, Wing B, LIC Tower, Scheme No. 54",
    city: "Indore",
    region: "Madhya Pradesh",
    postalCode: "452011",
    country: "India",
    countryCode: "IN",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=LIC+Tower+Scheme+No+54+Indore+452011",
  },
  careersApplyUrl: "https://walkover.keka.com/careers",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/walkover/" },
    { label: "X", href: "https://twitter.com/walkoverltd" },
    { label: "Instagram", href: "https://www.instagram.com/walkover.inc/" },
    { label: "Facebook", href: "https://www.facebook.com/walkoverltd" },
    { label: "YouTube", href: "https://www.youtube.com/@WalkoverWS" },
    { label: "GitHub", href: "https://github.com/Walkover-Web-Solution" },
  ],
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const companyNav: NavLink[] = [
  { label: "About Walkover", href: "/about", description: "Mission, values and how we build" },
  { label: "Our Story", href: "/our-story", description: "From one product in Indore to a family of them" },
  { label: "Events", href: "/events", description: "Where our product teams show up" },
  { label: "Careers", href: "/careers", description: "Passion first, skill second, degree last" },
  { label: "Contact", href: "/contact", description: "Talk to the team in Indore" },
];

export const resourceNav: NavLink[] = [
  { label: "Resources", href: "/resources", description: "Guides, docs and developer links" },
  { label: "Blog", href: "/blog", description: "Notes on communication, automation and AI" },
];
