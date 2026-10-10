/**
 * Story, values and principles.
 * Timeline entries use only dates the company itself publishes
 * (walkover.in/about, viasocket.com/about, giddh.com/in/about).
 * Value titles are Walkover's own, from walkover.in/about/culture-we-foster.
 */

export const timeline = [
  {
    when: "2010",
    title: "Walkover begins, with MSG91",
    body: "The company starts in Indore with a messaging product built to help startups reach their customers. MSG91 grows into a full communication platform.",
  },
  {
    when: "2016",
    title: "Giddh brings accounting to the cloud",
    body: "A second product takes on bookkeeping, tax and collaboration for growing businesses.",
  },
  {
    when: "c. 2018",
    title: "viaSocket starts as a side project",
    body: "An internal experiment to connect apps. The first prototype took 90 days and supported 10 apps. It becomes an AI automation platform that now works with thousands.",
  },
  {
    when: "Today",
    title: "A connected family of products",
    body: "Eight products across communication, automation, AI, finance, documentation, brand and hosting. GTWY's agents run inside viaSocket and MSG91, and the teams document their work in DocStar.",
  },
] as const;

/** Walkover's ten published values, with a short gloss in plain language. */
export const values = [
  { title: "One move. Total focus.", body: "Pick the move that matters and give it everything." },
  { title: "Bold risks, fearless steps!", body: "Even the CEO answers to the customer." },
  { title: "Only doers allowed!", body: "Ideas count once someone ships them." },
  { title: "Elevate or evolve!", body: "Raise the bar, or change until you can." },
  { title: "Respect time, sync minds!", body: "Message before meeting. Keep it short. Share the minutes." },
  { title: "Dream big, stay goal-oriented!", body: "Ambitious goals, tracked with OKRs." },
  { title: "Plan, then execute!", body: "Think it through, then move fast." },
  { title: "Version by version, we conquer!", body: "Ship, learn, ship the next version." },
  { title: "Follow the best or build it better!", body: "Learn from the best work, then go further." },
  { title: "Copy smart, build sharp!", body: "Reuse what works so effort goes where it counts." },
] as const;

/** How Walkover builds. Each principle is grounded in something observable,
 *  and is drawn in the brand colour of the product that proves it. */
export const principles = [
  {
    id: "dogfood",
    product: "gtwy-ai",
    title: "We are our own first customer",
    body: "Our products run on each other. GTWY's agents work inside viaSocket and MSG91. Our teams write their documentation in DocStar. If something is rough, we feel it before you do.",
    proof: "GTWY in production at viaSocket and MSG91",
  },
  {
    id: "versions",
    product: "viasocket",
    title: "Version by version",
    body: "viaSocket began as a 90-day prototype that connected ten apps. We ship early, listen hard and keep going. That is how a side project becomes a platform.",
    proof: "From 10 apps to 2,300+",
  },
  {
    id: "connected",
    product: "docstar",
    title: "Products that connect",
    body: "Every product is useful on its own and better together. Messages become workflow steps, documented APIs become tools for AI agents, and agents can call your workflows.",
    proof: "MSG91 APIs exposed as MCP tools via DocStar",
  },
  {
    id: "trust",
    product: "msg91",
    title: "Trust you can audit",
    body: "Infrastructure that carries billions of messages has to be dependable. Our platforms publish their security reports and certifications rather than asking you to take our word for it.",
    proof: "SOC 2 Type II at MSG91 and viaSocket",
  },
] as const;

export const careers = {
  motto: "Passion first. Skill second. Degree last.",
  perks: [
    { title: "Work from anywhere", body: "A team of 150+ that works remotely, with an office in Indore." },
    { title: "Sane hours", body: "Flexible hours that leave room for work and for passion." },
    { title: "Mindset matters", body: "We hire for drive and curiosity, and teach the rest." },
    { title: "Real ownership", body: "Small teams own whole products used by businesses worldwide." },
  ],
  /** Disciplines Walkover recruits for, based on its published openings. */
  teams: [
    { name: "Engineering", body: "Front-end, back-end and platform work on products that handle billions of API calls." },
    { name: "Design", body: "Product and brand design, led by a dedicated design function across the group." },
    { name: "Sales & partnerships", body: "Inbound, global and partner sales for communication and automation products." },
    { name: "Support", body: "Technical support for developers and businesses integrating our APIs." },
    { name: "Marketing", body: "Content, social and growth across eight product brands." },
  ],
} as const;
