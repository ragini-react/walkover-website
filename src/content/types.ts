/**
 * Content schemas. Entities reference each other by slug; the helpers in
 * `src/content/index.ts` resolve those references, so a relationship only
 * has to be declared once to appear everywhere it is relevant.
 */

export type ProductSlug =
  | "msg91"
  | "viasocket"
  | "giddh"
  | "gtwy-ai"
  | "50-agents"
  | "docstar"
  | "things-of-brand"
  | "embarko";

export type SolutionSlug =
  | "customer-communication"
  | "user-verification"
  | "workflow-automation"
  | "ai-agents"
  | "customer-support"
  | "accounting-and-compliance"
  | "documentation-and-knowledge"
  | "image-creation-and-hosting";

/** Product families describe what each product is for; shown as a label on product cards. */
export type Family = "communicate" | "automate" | "intelligence" | "operate" | "create" | "build";

export type Capability = {
  title: string;
  body: string;
};

/** A claim the product makes about itself. Always rendered with attribution. */
export type Claim = {
  value: string;
  label: string;
};

export type Faq = {
  q: string;
  a: string;
};

/** Each product page picks one bespoke animated demonstration. */
export type ProductDemo =
  | "channels" // MSG91: one API fanning out to channels
  | "flow" // viaSocket: trigger → AI step → actions
  | "ledger" // Giddh: invoice → GST → reconciliation
  | "embed" // GTWY: agents inside a host product
  | "agents" // 50 Agents: prompt → tasks across apps
  | "docs" // DocStar: draft → publish → MCP
  | "images" // Things of Brand: create / upload → image URL
  | "deploy"; // Embarko: prompt → build → live URL

/** A product's own brand colour, exactly as the product uses it. */
export type Brand = { color: string };

export type Product = {
  slug: ProductSlug;
  name: string;
  family: Family;
  brand: Brand;
  /** Short category label, e.g. "Cloud communication platform". */
  category: string;
  tagline: string;
  /** One-paragraph summary used in cards, meta and the product universe. */
  summary: string;
  url: string;
  /** The product's own logo mark, as served from its website (in public/). */
  logo: string;
  problem: { heading: string; body: string };
  audience: string[];
  capabilities: Capability[];
  /** Grouped module list where the product is modular (e.g. MSG91). */
  modules?: { group: string; items: string[] }[];
  useCases: Capability[];
  technical?: string[];
  trust?: string[];
  claims?: Claim[];
  /** Where the claims were taken from, shown next to them. */
  claimsSource?: string;
  pricingNote: string;
  demo: ProductDemo;
  /** Concrete connections to other Walkover products. */
  connections: { to: ProductSlug; how: string }[];
  solutions: SolutionSlug[];
  faqs: Faq[];
  seo: { title: string; description: string };
};

export type Solution = {
  slug: SolutionSlug;
  name: string;
  /** How a visitor would phrase the need: "I need to…" */
  need: string;
  headline: string;
  summary: string;
  challenges: string[];
  approach: Capability[];
  products: { slug: ProductSlug; role: string }[];
  workflow: string[];
  faqs: Faq[];
  seo: { title: string; description: string };
};

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type PostCategorySlug =
  | "communication"
  | "automation"
  | "ai"
  | "finance-operations"
  | "documentation";

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: PostCategorySlug;
  published: string;
  updated?: string;
  readingMinutes: number;
  author: string;
  products: ProductSlug[];
  solutions: SolutionSlug[];
  body: PostBlock[];
  faqs?: Faq[];
};
