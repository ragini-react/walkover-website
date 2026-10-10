/**
 * Walkover's history, for /our-story.
 *
 * Every factual sentence carries a citation marker, `[^source-id]`, that
 * resolves to an entry in `sources` below. Text inside double quotes is
 * verbatim from the cited source. Interpretation lives only in a chapter's
 * `reading`, which the page labels "Our reading". The claim-by-claim
 * evidence, including what was rejected and why, is in docs/STORY-LEDGER.md.
 *
 * Inline markup understood by <Prose>: `[^id]` (citation) and `[label](href)`.
 * Research checked 10 October 2026.
 */

/* ── Sources ────────────────────────────────────────────────────────── */

export type SourceKind = "account" | "reporting" | "regulator" | "archive" | "company";

export type Source = {
  id: string;
  kind: SourceKind;
  publisher: string;
  title: string;
  author?: string;
  /** As printed by the source, or "Accessed …" for undated current pages. */
  date: string;
  url: string;
  /** Another copy, e.g. an archived original. */
  alt?: { label: string; url: string };
  supports: string;
};

export const sourceKinds: Record<SourceKind, { label: string; note: string }> = {
  account: {
    label: "Founder accounts",
    note: "The founders telling their own story, after the fact.",
  },
  reporting: {
    label: "Independent reporting",
    note: "Journalists writing at the time, or looking back.",
  },
  regulator: {
    label: "Regulator",
    note: "Primary documents from the Telecom Regulatory Authority of India.",
  },
  archive: {
    label: "Archived web pages",
    note: "Snapshots kept by the Internet Archive. They show what existed, and when.",
  },
  company: {
    label: "Company pages and press releases",
    note: "Walkover and its products describing themselves. Figures are their own.",
  },
};

export const sources: Source[] = [
  /* Founder accounts */
  {
    id: "founder-2019",
    kind: "account",
    publisher: "MSG91 Blog",
    title: "A Journey from SMS to Communication Megacorp",
    author: "Pushpendra Agrawal",
    date: "26 March 2019",
    url: "https://web.archive.org/web/20190917113746/https://msg91.com/blog/a-journey-from-sms-to-communication-megacorp/",
    alt: {
      label: "Republished in three parts on LinkedIn",
      url: "https://www.linkedin.com/pulse/journey-from-sms-communication-megacorp-part-1-3-pushpendra-agrawal",
    },
    supports:
      "The founder's own history of MSG91, 2008–2019: Dubai, Indore, hosting, Yeshwant Club, the self-serve platform, TRAI, early clients, product changes, 2019 team and revenue. Linked here as archived, with its original date and byline.",
  },
  {
    id: "mwc-2019",
    kind: "account",
    publisher: "LinkedIn",
    title: "You Only Live Once & Other Lessons From MWC 2019",
    author: "Pushpendra Agrawal",
    date: "15 March 2019",
    url: "https://www.linkedin.com/pulse/you-only-live-once-other-lessons-from-mwc-2019-pushpendra-agrawal",
    supports: "MSG91 at Mobile World Congress, Barcelona, and what the team would do differently.",
  },
  {
    id: "purshology-2021",
    kind: "account",
    publisher: "Purshology",
    title: "Founder Interview with Mr. Shubhendra Agrawal, CEO & Co-founder of Walkover",
    date: "5 February 2021",
    url: "https://www.purshology.com/2021/02/founder-interview-with-mr-shubhendra-agrawal-ceo-co-founder-of-walkover/",
    supports: "How the founders describe the early years, and where the name Walkover came from.",
  },

  /* Independent reporting */
  {
    id: "yourstory-2012",
    kind: "reporting",
    publisher: "YourStory",
    title: "Save&Search: For Search Results You Want To Check Upon Later",
    author: "Jubin Mehta",
    date: "14 May 2012",
    url: "https://yourstory.com/2012/05/savesearch-for-search-results-you-want-to-check-upon-later",
    alt: {
      label: "Archived copy",
      url: "https://web.archive.org/web/20201124173122/https://yourstory.com/2012/05/savesearch-for-search-results-you-want-to-check-upon-later",
    },
    supports: "What Save&Search did, who built it, and the team's plans for it in 2012.",
  },
  {
    id: "yourstory-2013",
    kind: "reporting",
    publisher: "YourStory",
    title: "Indore-based msg91: A bulk SMS provider that helps businesses communicate better",
    author: "Jubin Mehta",
    date: "17 December 2013",
    url: "https://yourstory.com/2013/12/msg91-bulk-sms-provider",
    alt: {
      label: "Archived copy",
      url: "https://web.archive.org/web/20191119091621/https://yourstory.com/2013/12/msg91-bulk-sms-provider",
    },
    supports:
      "The 2006 social network, the hosting start, Save&Search, and a snapshot of the company in 2013: team size, resellers, customers, pricing, competitors.",
  },
  {
    id: "inc42-2016",
    kind: "reporting",
    publisher: "Inc42",
    title: "Enterprise Messaging Solution provider MSG91 Acquires Kolkata Based ToSMS",
    author: "Meha Agarwal",
    date: "7 October 2016",
    url: "https://inc42.com/flash-feed/msg91-acquires-tosms/",
    supports: "The ToSMS acquisition, MSG91's three founders, and its client count as reported in 2016.",
  },
  {
    id: "grit-2022",
    kind: "reporting",
    publisher: "The Grit Stories, curated by SaaSBOOMi",
    title: "MSG91, starting small, and soaring in the sky",
    author: "Avinash Raghava",
    date: "13 October 2022",
    url: "https://thegritstories.com/msg91-starting-small-and-soaring-in-the-sky-98302ef012bc",
    alt: {
      label: "Archived copy",
      url: "https://web.archive.org/web/20230220193536/https://thegritstories.com/msg91-starting-small-and-soaring-in-the-sky-98302ef012bc",
    },
    supports:
      "A retrospective built on an interview with Pushpendra Agrawal: the calling-card business, the siblings' roles, investor pitches, bootstrapping, the 2013 move to AWS, revenue and the founders' view of what went wrong.",
  },

  /* Regulator */
  {
    id: "trai-2010",
    kind: "regulator",
    publisher: "Telecom Regulatory Authority of India",
    title: "Press Release No. 61/2010: The Telecom Commercial Communications Customer Preference Regulations, 2010",
    date: "1 December 2010",
    url: "https://www.trai.gov.in/sites/default/files/2024-09/FINALPRCNIT1DEC.pdf",
    supports: "What the new rules required: preference registration, sender headers, the 9 pm–9 am window.",
  },
  {
    id: "trai-sept-2011",
    kind: "regulator",
    publisher: "Telecom Regulatory Authority of India",
    title: "Press Release No. 49/2011: TRAI implemented the Customer Preference Regulations from 27th September, 2011",
    date: "28 September 2011",
    url: "https://www.trai.gov.in/sites/default/files/2024-09/PRESS_RELEASE_27_9.pdf",
    supports: "The rules coming fully into force, the 100 SMS a day limit, and the exemptions for transactional messages.",
  },
  {
    id: "trai-oct-2011",
    kind: "regulator",
    publisher: "Telecom Regulatory Authority of India",
    title: "Press Release No. 52/2011",
    date: "24 October 2011",
    url: "https://www.trai.gov.in/sites/default/files/2024-09/Press_release_25.10.11_0.pdf",
    supports: "Transactional senders freed from telemarketer registration and the daily limit; new transactional categories.",
  },
  {
    id: "trai-nov-2011",
    kind: "regulator",
    publisher: "Telecom Regulatory Authority of India",
    title: "Press Release No. 53/2011",
    date: "1 November 2011",
    url: "https://www.trai.gov.in/sites/default/files/2024-09/press_release_for_8th_amendmenet.pdf",
    supports: "The daily limit raised from 100 to 200 SMS per SIM.",
  },

  /* Archive */
  {
    id: "archive-msg91-2009",
    kind: "archive",
    publisher: "Internet Archive",
    title: "msg91.com, “Message to India from anywhere anytime”",
    date: "Captured 14 February 2009",
    url: "https://web.archive.org/web/20090214232406/http://msg91.com/",
    supports: "msg91.com online in early 2009, aimed at students abroad, with contact management and a developer API.",
  },
  {
    id: "archive-whozzat-2009",
    kind: "archive",
    publisher: "Internet Archive",
    title: "whozzat.com, Whozzat beta",
    date: "Captured 16 January 2009",
    url: "https://web.archive.org/web/20090116181503/http://whozzat.com/",
    supports: "Whozzat online as a beta social site.",
  },
  {
    id: "archive-hostnsoft-2010",
    kind: "archive",
    publisher: "Internet Archive",
    title: "hostnsoft.com, domain registration and web hosting, Indore",
    date: "Captured 7 January 2010",
    url: "https://web.archive.org/web/20100107004446/http://hostnsoft.com/",
    supports: "Host n Soft, the hosting brand.",
  },
  {
    id: "archive-walkover-2010",
    kind: "archive",
    publisher: "Internet Archive",
    title: "walkover.in, “Our products are Msg91, Whosthat, Host n soft”",
    date: "Captured 11 July 2010",
    url: "https://web.archive.org/web/20100711162232/http://walkover.in/",
    supports: "Walkover's three products in 2010.",
  },
  {
    id: "archive-msg91-2011",
    kind: "archive",
    publisher: "Internet Archive",
    title: "msg91.com, About",
    date: "Captured 3 February 2011",
    url: "https://web.archive.org/web/20110203022550/http://msg91.com/",
    supports: "Why the product is called MSG91.",
  },
  {
    id: "archive-saveandsearch-2012",
    kind: "archive",
    publisher: "Internet Archive",
    title: "saveandsearch.com, “A Product of Walkover.in”",
    date: "Captured 3 January 2012",
    url: "https://web.archive.org/web/20120103092658/http://saveandsearch.com/",
    supports: "Save&Search in beta under Walkover's name.",
  },
  {
    id: "archive-giddh-2012",
    kind: "archive",
    publisher: "Internet Archive",
    title: "giddh.com, login page",
    date: "Captured 13 January 2012",
    url: "https://web.archive.org/web/20120113201001/http://giddh.com/",
    supports: "The Giddh name and domain in use by early 2012.",
  },
  {
    id: "archive-walkover-2013",
    kind: "archive",
    publisher: "Internet Archive",
    title: "walkover.in/about",
    date: "Captured 8 July 2013",
    url: "https://web.archive.org/web/20130708233945/http://walkover.in/about",
    supports: "Walkover's own 2013 statement that it “began as hostnsoft in 2007”.",
  },
  {
    id: "archive-saveandsearch-2014",
    kind: "archive",
    publisher: "Internet Archive",
    title: "saveandsearch.com, “Powered by: Walkover”",
    date: "Captured 6 January 2014",
    url: "https://web.archive.org/web/20140106140848/http://saveandsearch.com/",
    supports: "Save&Search reworked into a folder and file-sharing app.",
  },

  /* Company */
  {
    id: "prweb-2014",
    kind: "company",
    publisher: "PRWeb (Walkover press release)",
    title: "A Day With an IT Startup in a Non-IT City",
    date: "26 June 2014",
    url: "https://www.prweb.com/releases/a_day_with_an_it_startup_in_a_non_it_city/prweb11973210.htm",
    supports: "The company's fourth anniversary in June 2014, and Giddh named as its online accounting software.",
  },
  {
    id: "prn-giddh-study",
    kind: "company",
    publisher: "PR Newswire (Walkover press release)",
    title: "Walkover Studies About Number-zoned Entrepreneurs in Digital Times",
    date: "3 May 2016",
    url: "https://www.prnewswire.com/in/news-releases/walkover-studies-about-number-zoned-entrepreneurs-in-digital-times-577898771.html",
    supports: "The accounting problem behind Giddh, the research, Narendra Sen's comments, Giddh in beta.",
  },
  {
    id: "prn-giddh-launch",
    kind: "company",
    publisher: "PR Newswire (Walkover press release)",
    title: "Walkover Announces its Latest Online Release ‘Giddh’ in the Accounting Arena",
    date: "16 May 2016",
    url: "https://www.prnewswire.com/in/news-releases/walkover-announces-its-latest-online-release-giddh-in-the-accounting-arena-579632661.html",
    supports: "Giddh's public release, its first features, and Shubhendra Agrawal's description of it.",
  },
  {
    id: "msg91-tosms",
    kind: "company",
    publisher: "MSG91",
    title: "MSG91 to expand enterprise messaging solution with acquisition of ToSMS",
    date: "October 2016",
    url: "https://msg91.com/guide/msg91-expand-enterprise-messaging-solution-acquisition",
    supports: "MSG91's own announcement of the ToSMS acquisition.",
  },
  {
    id: "giddh-about",
    kind: "company",
    publisher: "Giddh",
    title: "About Giddh",
    date: "Accessed 10 October 2026",
    url: "https://giddh.com/in/about",
    supports: "Shubhendra Agrawal as Giddh's founder, and his earlier role at MSG91.",
  },
  {
    id: "viasocket-about",
    kind: "company",
    publisher: "viaSocket",
    title: "Company story",
    date: "Accessed 10 October 2026",
    url: "https://viasocket.com/help/about-us",
    supports: "How viaSocket began and changed, its founders, and the figures it reports.",
  },
  {
    id: "msg91-about",
    kind: "company",
    publisher: "MSG91",
    title: "About us",
    date: "Accessed 10 October 2026",
    url: "https://msg91.com/about-us",
    supports: "The founders' current roles at MSG91.",
  },
  {
    id: "aboutme",
    kind: "company",
    publisher: "about.me",
    title: "Walkover",
    date: "Undated",
    url: "https://about.me/walkover",
    supports: "An older list of Walkover's web applications.",
  },
  {
    id: "walkover-about",
    kind: "company",
    publisher: "Walkover",
    title: "About",
    date: "Accessed 10 October 2026",
    url: "https://walkover.in/about",
    supports: "The company's stated founding year and mission.",
  },
  {
    id: "walkover-home",
    kind: "company",
    publisher: "Walkover",
    title: "Walkover – A Communication and AI Startup",
    date: "Accessed 10 October 2026",
    url: "https://walkover.in/",
    supports: "How the company describes itself today, and its team size.",
  },
  {
    id: "walkover-products",
    kind: "company",
    publisher: "Walkover",
    title: "Products",
    date: "Accessed 10 October 2026",
    url: "https://walkover.in/products",
    supports: "The products Walkover lists today.",
  },
];

const sourceMap = new Map(sources.map((s, i) => [s.id, { ...s, n: i + 1 }]));

export function sourceById(id: string) {
  const s = sourceMap.get(id);
  if (!s) throw new Error(`Unknown story source "${id}"`);
  return s;
}

export const sourceNumber = (id: string) => sourceById(id).n;

/* ── Timeline ───────────────────────────────────────────────────────── */

/**
 * documented: a record from the time (regulator, archive, dated release).
 * reported:   a later account by a founder or journalist.
 */
export type Basis = "documented" | "reported";

export type Milestone = {
  when: string;
  title: string;
  body: string;
  chapter: string;
  basis: Basis;
  sources: string[];
};

export const milestones: Milestone[] = [
  {
    when: "2006",
    title: "A social network that failed",
    body: "College friends, Pushpendra Agrawal among them, try to build a social network. It does not last.",
    chapter: "first-attempt",
    basis: "reported",
    sources: ["yourstory-2013"],
  },
  {
    when: "2008",
    title: "Web hosting in Indore",
    body: "Back from Dubai, Agrawal starts a hosting business in his hometown with a team of five.",
    chapter: "indore",
    basis: "reported",
    sources: ["founder-2019"],
  },
  {
    when: "2009",
    title: "A club wants to text its members",
    body: "Yeshwant Club needs SMS. Walkover acts as the middleman, then starts reselling SMS.",
    chapter: "sms",
    basis: "reported",
    sources: ["founder-2019"],
  },
  {
    when: "2010",
    title: "A self-serve SMS platform",
    body: "The team builds a panel businesses can use on their own: MSG91. Walkover dates its founding to this year.",
    chapter: "sms",
    basis: "reported",
    sources: ["founder-2019", "walkover-about"],
  },
  {
    when: "Sep 2011",
    title: "New telecom rules take effect",
    body: "TRAI's rules on commercial SMS come fully into force. Transactional messages are exempt.",
    chapter: "rules",
    basis: "documented",
    sources: ["trai-sept-2011"],
  },
  {
    when: "Jan 2012",
    title: "Save&Search in beta",
    body: "A small “save engine” for links and notes goes out as “A Product of Walkover.in”.",
    chapter: "experiments",
    basis: "documented",
    sources: ["archive-saveandsearch-2012"],
  },
  {
    when: "2013",
    title: "The move to AWS",
    body: "After repeated server trouble at a data-centre provider, MSG91 moves to Amazon Web Services.",
    chapter: "reliability",
    basis: "reported",
    sources: ["grit-2022"],
  },
  {
    when: "2015",
    title: "From SQL to MongoDB",
    body: "MSG91's data moves to a database built to grow with message volumes.",
    chapter: "msg91-evolves",
    basis: "reported",
    sources: ["founder-2019"],
  },
  {
    when: "May 2016",
    title: "Giddh is released",
    body: "Cloud accounting, founded by Shubhendra Agrawal, after about two years of work.",
    chapter: "giddh",
    basis: "documented",
    sources: ["prn-giddh-launch"],
  },
  {
    when: "Oct 2016",
    title: "MSG91 acquires ToSMS",
    body: "A Kolkata messaging company joins MSG91 for an undisclosed amount.",
    chapter: "msg91-evolves",
    basis: "documented",
    sources: ["inc42-2016"],
  },
  {
    when: "c. 2018",
    title: "viaSocket starts as a side project",
    body: "A no-code tool to connect a few apps for internal marketing. The first prototype takes 90 days.",
    chapter: "viasocket",
    basis: "reported",
    sources: ["viasocket-about"],
  },
  {
    when: "2019",
    title: "Mobile World Congress",
    body: "The MSG91 team takes the product to Barcelona. Email, voice and RCS are next.",
    chapter: "msg91-evolves",
    basis: "reported",
    sources: ["mwc-2019"],
  },
  {
    when: "2022",
    title: "Looking back on growth",
    body: "In a public retrospective, the founder says the team built product when it should also have sold it.",
    chapter: "limits",
    basis: "reported",
    sources: ["grit-2022"],
  },
  {
    when: "Today",
    title: "A family of products",
    body: "Communication, automation, accounting and AI, still built from Indore.",
    chapter: "today",
    basis: "documented",
    sources: ["walkover-products"],
  },
];

/* ── People ─────────────────────────────────────────────────────────── */

export type Person = {
  name: string;
  /** Role as it matters in this story, with its source. */
  role: string;
  note: string;
  photo?: string;
  sources: string[];
};

export const people: Person[] = [
  {
    name: "Pushpendra Agrawal",
    role: "Founder, Walkover",
    note: "Started the hosting business in 2008 and wrote the founder's history of MSG91. Today Founder & Advisor at MSG91 and founder of viaSocket.",
    photo: "/story/pushpendra-agrawal.jpg",
    sources: ["founder-2019", "giddh-about", "msg91-about", "viasocket-about"],
  },
  {
    name: "Shubhendra Agrawal",
    role: "Co-founder, MSG91 · Founder, Giddh",
    note: "MSG91's CFO in its early years. Founded Giddh in 2016. Today Founder & CEO at MSG91.",
    photo: "/story/shubhendra-agrawal.jpg",
    sources: ["grit-2022", "giddh-about", "msg91-about"],
  },
  {
    name: "Ankita Agrawal",
    role: "Co-founder, MSG91",
    note: "Left a coding job at TCS to take charge of web development at MSG91, according to The Grit Stories. Named as a co-founder by Inc42 in 2016.",
    sources: ["grit-2022", "inc42-2016"],
  },
  {
    name: "Ravi Palliwal",
    role: "Co-founder, viaSocket",
    note: "Named as viaSocket's co-founder on its company page, where he recalls the first version launching “with just a handful of apps”.",
    sources: ["viasocket-about"],
  },
];

/* ── Chapters ───────────────────────────────────────────────────────── */

export type Quote = {
  text: string;
  who: string;
  context: string;
  source: string;
};

export type Photo = { src: string; width: number; height: number; alt: string; caption: string };

export type Chapter = {
  id: string;
  /** Short label for the chapter index. */
  short: string;
  when: string;
  title: string;
  /** Paragraphs before the chapter's feature (diagram, table, cards…). */
  body: string[];
  /** Paragraphs after the feature. */
  after?: string[];
  quote?: Quote;
  /** Editorial interpretation, labelled as such on the page. */
  reading?: string;
  photo?: Photo;
  /** Dark surface for the chapters about setbacks. */
  tone?: "dark";
};

export const photos = {
  msg91Team: {
    src: "/story/team-msg91-early.jpg",
    width: 1366,
    height: 577,
    alt: "About twenty people in black MSG91 T-shirts posing together in a café",
    caption: "The MSG91 team, in a photo published on msg91.com. The year is not recorded.",
  },
  mwc: {
    src: "/story/mwc-barcelona-2019.jpg",
    width: 960,
    height: 720,
    alt: "Nine MSG91 team members in matching T-shirts, seen from behind, facing the MWC19 Barcelona entrance banner",
    caption: "The MSG91 team at Mobile World Congress, Barcelona, 2019.",
  },
  huddle: {
    src: "/story/team-huddle-2019.jpg",
    width: 1002,
    height: 513,
    alt: "Team members stacking their hands together over a table-tennis table in the office",
    caption: "A team huddle at the office, from Pushpendra Agrawal's 2019 articles.",
  },
  team: {
    src: "/story/team-festive-indore.jpg",
    width: 2000,
    height: 1500,
    alt: "The Walkover team, around sixty people in festive clothes, in a group photo",
    caption: "The Walkover team, dressed up for a festival.",
  },
} satisfies Record<string, Photo>;

export const chapters: Chapter[] = [
  {
    id: "first-attempt",
    short: "The first attempt",
    when: "2006",
    title: "A social network that didn’t last",
    body: [
      "The earliest attempt on record is a social network. In December 2013, YourStory reported that in 2006 a few college friends, Pushpendra Agrawal among them, had set out to build a social network “to topple Orkut”, Google’s social site of the time. “That effort failed,” the article says. The team separated to pursue their studies, “but the intention to startup remained.”[^yourstory-2013]",
      "No source we found names that network, describes what it did, or explains why it failed. We have not filled the gap with guesses.",
      "The next chapter comes from a 2022 profile by The Grit Stories, a series curated by the Indian software community SaaSBOOMi. In Dubai, it says, Agrawal spent $1,000 on an international calling card and charged friends a small premium to use it to call overseas. He made the money back in three days. By the profile’s account the business reached about $50,000 before he shut it down, reasoning that friends would move away, new customers would be harder to find, and larger companies would eventually cut out a middleman.[^grit-2022]",
    ],
    reading:
      "Neither venture lasted, but both were about helping people communicate, and both started from a need among people close at hand. The same pattern recurs throughout this story.",
  },
  {
    id: "indore",
    short: "Indore, 2008",
    when: "2008",
    title: "Back to Indore, starting with web hosting",
    body: [
      "“I clearly remember the spring of 2008, when I returned from Dubai completing my MBA,” Agrawal wrote in 2019, in the account of MSG91’s history that this story leans on most.[^founder-2019] He weighed Bangalore, India’s technology capital, and admitted it “was winning due to a lot of reasons”. He chose Indore: it was home, and “Indore stood out to me personally in terms of affordability.”[^founder-2019]",
      "The business began with web hosting, renting out server space so companies can put their websites and email online. “We started with a team of 5,” he wrote, and hosting helped the team “expand our network quickly” because every customer introduced them to another business.[^founder-2019] YourStory described the same step from the outside: the “scratchy college efforts had taken the shape of a web hosting service and that is how Walkover had started.”[^yourstory-2013]",
      "It was a family business early on. According to The Grit Stories, Agrawal’s sister Ankita left a coding job at TCS to take charge of web development, and his brother Shubhendra became chief financial officer.[^grit-2022] In 2016 Inc42 named all three, Pushpendra, Shubhendra and Ankita Agrawal, as MSG91’s founders.[^inc42-2016]",
    ],
  },
  {
    id: "sms",
    short: "The first SMS",
    when: "2009–2010",
    title: "A club wants to text its members",
    body: [
      "“Somewhere in 2009, out of nowhere, hopping from client to client,” the team met Yeshwant Club, one of Indore’s best-known clubs. It wanted to send transactional SMS to its members and was looking for a provider.[^founder-2019] A transactional SMS is a message someone needs rather than an advertisement: a booking confirmation, a payment alert, a notice from a club.",
      "Walkover did not run an SMS service, but it knew some providers, so it acted as the middleman and kept the club’s updates going out on time. Other businesses wanted the same thing. The team began buying SMS in bulk from local aggregators, wholesalers who buy capacity from mobile operators and resell it, and supplying it to customers like the club. By the end of 2009, Agrawal wrote, that ecosystem was working, and he later thanked “the first 100 clients who trusted us with their business.”[^founder-2019]",
    ],
    after: [
      "Reselling exposed a gap. Plenty of businesses wanted to send bulk messages themselves, but few services let them, and those that did were hard to use. “There were no self-served panels,” he wrote. By the start of 2010 the team was building one: log in, upload a contact list, write a message and hit send, with no coding. That platform is MSG91. As he put it: “Simple! Not so simple though!”[^founder-2019]",
      "The web archive adds detail the founder’s account leaves out. msg91.com was online by February 2009 with a different audience in mind: “students who are in abroad and want to send SMS in India to their loved ones”. Its feature list already included contact groups, scheduled messages and a developer API, a way for other software to send messages automatically.[^archive-msg91-2009] By 2011 the site explained the name: “We started our services in India, so we go by the country code that is 91.”[^archive-msg91-2011]",
      "There is also a second account of how SMS entered the business. The Grit Stories says the founders were building a social platform that connected companies and users, the SMS company they relied on “kept glitching”, and Agrawal took SMS in-house, at first with an intern whose only job was to submit message forms to the operator.[^grit-2022] Walkover’s website in 2010 did list a social product, Whozzat, alongside MSG91 and the hosting brand Host n Soft.[^archive-walkover-2010] The two accounts are not incompatible. We give both rather than choose.",
    ],
    quote: {
      text: "Acting as middlemen, we realized that when you want to send an important update to a mass audience, the most reliable and effective medium of communication was SMS.",
      who: "Pushpendra Agrawal",
      context: "MSG91 Blog, 2019",
      source: "founder-2019",
    },
  },
  {
    id: "rules",
    short: "New rules",
    when: "2011",
    title: "The rules change",
    body: [
      "In December 2010 the Telecom Regulatory Authority of India (TRAI) issued new rules for commercial calls and text messages, aimed at the flood of unsolicited marketing.[^trai-2010] After several postponements, every provision was in force by 27 September 2011.[^trai-sept-2011]",
    ],
    after: [
      "The rules kept shifting after launch. On 24 October TRAI let businesses send transactional messages without registering as telemarketers, and widened what counted as transactional to include e-commerce and companies messaging their own customers.[^trai-oct-2011] A week later it doubled the daily limit per SIM to 200.[^trai-nov-2011]",
      "For a company selling bulk SMS, these rules changed how its product could be used. Agrawal’s account lists the restrictions, then notes that the daily limit on person-to-person messages “curbed unregulated marketers and streamlined A2P SMS pricing, surprisingly to our advantage.”[^founder-2019] A2P, application-to-person, means messages sent by software to people. It is MSG91’s business.",
      "The company grew through it. By 2011, he wrote, MSG91 had a team of more than 20 and had signed its first Fortune 500 client. The account does not name the client.[^founder-2019] The Grit Stories names Ixigo and Policybazaar among the large customers who arrived around this time.[^grit-2022]",
    ],
    quote: {
      text: "Seemed like a lot was changing. But an SMS was still the most effective medium of reaching your customers.",
      who: "Pushpendra Agrawal",
      context: "MSG91 Blog, 2019",
      source: "founder-2019",
    },
    reading:
      "We found no source describing how the team adapted its systems to the new rules. What the regulator’s documents do show is that transactional messages, the kind Yeshwant Club had asked for, were the part of the market the rules set apart and exempted.",
    photo: photos.msg91Team,
  },
  {
    id: "product-first",
    short: "Pitching",
    when: "2011 onward",
    title: "Pitching investors, and not selling",
    tone: "dark",
    body: [
      "2011 looked like the moment to accelerate. According to The Grit Stories, the founders planned an email product and more channels, and Agrawal began travelling from Indore to meet investors.[^grit-2022]",
      "It did not go well. The profile describes a fear of speaking in front of groups that had followed him since college. He had sat out campus placements because of it. Pitch after pitch, the result was the same: “None bought into the company.” Friends who ran funded companies told him that raising money was a full-time job. He concluded it was not the best use of his time.[^grit-2022]",
      "Money was tight. Paying salaries felt like a challenge, the founders kept costs low, and hiring an experienced salesperson would have meant another salary. So MSG91 “stayed without a sales head, and stayed bootstrapped”, which means it was funded by its own revenue rather than by investors.[^grit-2022]",
      "The product still found customers. “Even without marketing and sales, thousands of customers were finding them,” the profile says. “But those thousands were not becoming tens and hundreds of thousands.”[^grit-2022]",
    ],
    quote: {
      text: "I thought it would be a waste of time to do that, it is easier to build a product.",
      who: "Pushpendra Agrawal",
      context: "on fundraising, to The Grit Stories, 2022",
      source: "grit-2022",
    },
    reading:
      "This is not a story about a lack of ambition. It is a familiar trade-off in companies that fund themselves: when every salary is hard to pay, money goes to what the founders already do well, which here was building product. The cost of that choice shows up later, in chapter 11.",
  },
  {
    id: "experiments",
    short: "Side bets",
    when: "2009–2014",
    title: "Side bets: Whozzat, Save&Search and others",
    body: [
      "MSG91 was not the only thing the team built. In 2013 YourStory wrote that Agrawal “has taken multiple shots at making products”.[^yourstory-2013] Shubhendra Agrawal later described the early years the same way: “We tried many things initially in which we learned a lot, succeeded several times, but we kept moving.”[^purshology-2021]",
      "The web archive preserves some of those things. Here is what each record shows, and what it does not.",
    ],
    after: [
      "An undated Walkover profile also names two more web applications, Clientshub and Ineedname.[^aboutme] We found nothing else about them.",
    ],
    reading:
      "None of these became a second MSG91, and for most we do not know how they ended. We are not calling them failures. They show a small team building quickly and cheaply on what it already had: hosting, an SMS route, web skills. viaSocket would later start the same way.",
  },
  {
    id: "reliability",
    short: "Reliability",
    when: "2013",
    title: "When the servers failed",
    body: [
      "By 2013 MSG91 was the centre of the company. YourStory’s profile that December described Walkover as a 30-person product and services company “with msg91 as their core product”, a reseller network of about 6,000 businesses left over from its hosting years, and customers including MetLife, Barista and Talwarkar’s Gym.[^yourstory-2013]",
      "The same year, the infrastructure began to let customers down. According to The Grit Stories, the data-centre company hosting MSG91’s servers kept having problems and kept making excuses for them. The downtime hurt the customer experience, the thing Agrawal cared about most.[^grit-2022]",
    ],
    after: [
      "The fix was a move to Amazon Web Services (AWS), which rents computing capacity on demand. No one on the team knew it well, so Agrawal brought in a friend to teach them. The migration cost a lot, the profile says, “but the downtimes stopped”, and everything looked “a whole lot more scalable”.[^grit-2022]",
      "This is the founder’s account, as told to a journalist. We found no technical record of the migration: how long it took, what moved first, or how downtime was measured. We report what he said and nothing more.",
    ],
    quote: {
      text: "As a startup, we wanted to stay focused on our product. Hence, it’s only SMS for now.",
      who: "Pushpendra Agrawal",
      context: "to YourStory, December 2013",
      source: "yourstory-2013",
    },
  },
  {
    id: "msg91-evolves",
    short: "MSG91 grows",
    when: "2015–2019",
    title: "MSG91, one problem at a time",
    body: [
      "From here, Agrawal’s account of MSG91 reads less like a plan than a list of problems customers ran into and what the team changed in response. He credits Gmail as one of the main inspirations for the interface.[^founder-2019] The years below are his. Where his account gives two years for the same change, we say so.",
    ],
    after: [
      "In 2019 the team took MSG91 to Mobile World Congress in Barcelona, the telecom industry’s largest trade show. In his notes afterwards Agrawal listed what they would do differently next time: spend less time at the stall, arrive a day or two early, do more to make the product stand out. The lesson he took home was this: “It is great if you stay on top of technology, but service comes first.”[^mwc-2019]",
      "That year he also reported the numbers. The MSG91 team had “doubled from a team of 20 to 40” and revenue had grown a hundredfold, “standing at $4.5 mn for 18-19FY”. He did not say what year either comparison started from.[^founder-2019]",
    ],
    photo: photos.mwc,
  },
  {
    id: "giddh",
    short: "Giddh",
    when: "2012–2016",
    title: "Giddh: the bookkeeping problem",
    body: [
      "Giddh began with a problem the team had itself. Walkover’s May 2016 press release says the founders “faced the same issue themselves when they got exposed to accounting troubles”, then spent two weeks researching which finance software would suit a business like theirs.[^prn-giddh-study]",
      "The choice was between Tally, the desktop accounting software most Indian businesses used, and newer online tools. The release quotes Narendra Sen, founder of the Indore data-centre company RackBank: Tally suited his business, but “it was also very important for me to access my data from anywhere at anytime. Tally lacked that.” The online alternatives, he said, “were not as feature rich as Tally.”[^prn-giddh-study] Walkover issued that release about its own product, so it is the company’s view of the market, not an independent study.",
      "Giddh was the answer: cloud accounting, with the books kept online so they can be opened from anywhere. The name was on a giddh.com login page as early as January 2012,[^archive-giddh-2012] and a June 2014 company release already called Giddh “their online accounting software”.[^prweb-2014] On 16 May 2016, after what the launch release called “the journey of two-long years”, Giddh was released to the public.[^prn-giddh-launch]",
    ],
    after: [
      "Shubhendra Agrawal, MSG91’s co-founder and CFO in its early years, founded it.[^giddh-about] At launch he talked about who gets to see the numbers. Access was set by role: a salesperson would see only their own sales and the money their customers owed.[^prn-giddh-launch]",
      "The first public version was deliberately minimal. It offered ledgers shared in real time with customers, sync with bank accounts, APIs for other software, and what the company called “bank-level security” with data encryption. It was built for businesses that do not hold inventory, such as IT, telecom and service firms.[^prn-giddh-launch] For what Giddh does today, see [Giddh](/products/giddh) or [giddh.com](https://giddh.com).",
    ],
    quote: {
      text: "In Giddh, your finance data is not just managed by your accountant. It can be viewed by the General Manager, the sales person and all the people in the company who are associated with numbers.",
      who: "Shubhendra Agrawal",
      context: "at Giddh’s launch, May 2016",
      source: "prn-giddh-launch",
    },
  },
  {
    id: "viasocket",
    short: "viaSocket",
    when: "c. 2018 – today",
    title: "viaSocket: an internal tool that kept growing",
    body: [
      "viaSocket started with a question. Two members of the Walkover team who had helped shape MSG91 set out to answer it: “Why is automation still so complicated?”[^viasocket-about]",
      "It began, in the company’s words, as “a scrappy side project”: a visual, no-code way to connect a few apps for Walkover’s own marketing. Workflow automation means letting software carry out a chain of steps without someone doing each one by hand. When a form is filled in, for example, it adds the contact, sends a message and updates a sheet. The first prototype took 90 days and supported 10 apps.[^viasocket-about]",
    ],
    after: [
      "The path was not straight. The team says it rebuilt the automation engine three or four times. It added real-time triggers, so a workflow starts the moment something happens rather than on a schedule. It also introduced AI-based intent recognition, so people can describe what they want in plain English.[^viasocket-about]",
      "viaSocket’s company page names Pushpendra Agrawal as founder and Ravi Palliwal as co-founder. Agrawal’s letter there says he started viaSocket “eight years ago”. On a page last updated in 2026, that points to about 2018; the page gives no exact year.[^viasocket-about] The page reports more than 2,300 app integrations and 30,000 customers. Those are viaSocket’s own figures, read on 10 October 2026, and we have not checked them independently.[^viasocket-about] More at [viaSocket](/products/viasocket) or [viasocket.com](https://viasocket.com).",
    ],
  },
  {
    id: "limits",
    short: "The hard lesson",
    when: "2019–2022",
    title: "A good product is not a growth plan",
    tone: "dark",
    body: [
      "In 2019 Agrawal reported revenue of $4.5 million for the 2018–19 financial year.[^founder-2019] By the time of The Grit Stories profile in October 2022, MSG91’s annual recurring revenue, the yearly value of the business customers keep coming back for, stood at $10 million, according to the article.[^grit-2022] These figures are historical, and neither comes from published audited accounts.",
      "The profile set those numbers against two listed Indian competitors, Tanla and Route Mobile, which reported revenue of $244 million and $176 million in 2020.[^grit-2022] The comparison is rough: recurring revenue and total revenue are different measures, and the years differ. But it makes the point Agrawal made himself.",
      "When growth did not accelerate, the profile says, the team kept going back to the product: voice, chat, WhatsApp and RCS, making sure no SMS went undelivered and no OTP failed. In hindsight, it says, the problem “was not the services and support at all. It was the lack of aggressive sales.” MSG91 sat out the 2021 funding boom, and the profile reports that it now spends its profits on expansion.[^grit-2022]",
    ],
    quote: {
      text: "We always focused on building the best product. The others were much better at sales than us.",
      who: "Pushpendra Agrawal",
      context: "to The Grit Stories, 2022",
      source: "grit-2022",
    },
    reading:
      "Product quality and business growth are different problems, and the founders have said publicly which one they neglected. That honesty is useful to anyone building a company. A product good enough to find thousands of customers on its own still needs someone to take it to everyone else.",
    photo: photos.huddle,
  },
  {
    id: "today",
    short: "Today",
    when: "Today",
    title: "Walkover today",
    body: [
      "Walkover is still based in Indore, now on the fifth floor of LIC Tower, and calls itself “A Communication and AI Startup”. Its website describes “a team of 150+” working remotely and a mission “to support start-ups in realizing their vision”.[^walkover-home][^walkover-about]",
      "MSG91 has grown from SMS into a platform for WhatsApp, email, voice, RCS and OTP verification. Giddh continues as cloud accounting. viaSocket has become an AI automation platform. Newer products, GTWY AI, DocStar, 50 Agents and Things of Brand, extend the work into AI agents, documentation and brand assets.[^walkover-products]",
      "The founders’ roles have changed too. MSG91 lists Shubhendra Agrawal as Founder & CEO and Pushpendra Agrawal as Founder & Advisor. viaSocket lists Pushpendra Agrawal as its founder.[^msg91-about][^viasocket-about] For how the company works today, see [About Walkover](/about). To join it, see [Careers](/careers).",
    ],
    quote: {
      text: "This is how the name Walkover struck us. Be it a success or learning, simply Walkover!",
      who: "Shubhendra Agrawal",
      context: "to Purshology, 2021",
      source: "purshology-2021",
    },
    photo: photos.team,
  },
  {
    id: "lessons",
    short: "Lessons",
    when: "Looking back",
    title: "What the record shows",
    body: [
      "These lessons are our reading of the history above. Each one points back to the chapters it rests on, so you can judge it for yourself.",
    ],
  },
];

/* ── Chapter features ──────────────────────────────────────────────── */

/** Chapter 2: three founding dates, each true of something different. */
export const foundingDates = [
  {
    year: "2007",
    what: "The hosting brand",
    body: "Walkover’s own website said in 2013 that the company “began as hostnsoft in 2007”. We could not confirm this independently.",
    source: "archive-walkover-2013",
  },
  {
    year: "2008",
    what: "The work begins",
    body: "The founder’s account: a hosting business in Indore, with a team of five.",
    source: "founder-2019",
  },
  {
    year: "2010",
    what: "The company and MSG91",
    body: "The year Walkover gives today, and the year building the self-serve platform began. A 2014 release marked the company’s fourth anniversary that June.",
    source: "walkover-about",
  },
] as const;

/** Chapter 3: how the SMS business changed shape. */
export const smsStages = [
  {
    when: "2009",
    label: "Middleman",
    flow: ["Yeshwant Club", "Walkover", "SMS provider", "Members"],
    body: "One customer, one need, a provider the team already knew.",
  },
  {
    when: "Late 2009",
    label: "Reseller",
    flow: ["100 clients", "Walkover", "Local aggregators", "Operators"],
    body: "Buying SMS in bulk and supplying it to many businesses.",
  },
  {
    when: "2010",
    label: "Platform",
    flow: ["Any business", "MSG91 panel or API", "Operator routes"],
    body: "Log in, upload contacts, write, send. No middleman needed.",
  },
] as const;

/** Chapter 4: what the TRAI regulations changed. */
export const ruleChanges = [
  {
    date: "1 Dec 2010",
    title: "Rules issued",
    body: "People can register to block commercial calls and SMS by category. Commercial messages must carry an identifying sender header and may only be sent between 9 am and 9 pm.",
    source: "trai-2010",
  },
  {
    date: "27 Sep 2011",
    title: "Fully in force",
    body: "Ordinary SIMs are limited to 100 SMS a day, closing a loophole for marketing from personal numbers. Transactional messages are exempt from the limit and can be sent at any hour.",
    source: "trai-sept-2011",
  },
  {
    date: "24 Oct 2011",
    title: "Room for transactional senders",
    body: "Businesses sending transactional messages no longer have to register as telemarketers. E-commerce and companies messaging their own customers now count as transactional.",
    source: "trai-oct-2011",
  },
  {
    date: "1 Nov 2011",
    title: "Limit raised",
    body: "The daily limit per SIM doubles, from 100 to 200 SMS.",
    source: "trai-nov-2011",
  },
] as const;

/** Chapter 6: early products, with what is known and what is not. */
export const experiments = [
  {
    name: "Host n Soft",
    when: "Online by 2010",
    what: "Domain registration and web hosting from Indore: the hosting business Walkover grew out of. Listed among Walkover’s products in 2010.",
    known: ["archive-hostnsoft-2010", "archive-walkover-2010"],
    status: "Current status not documented.",
  },
  {
    name: "Whozzat",
    when: "Beta by January 2009",
    what: "A social site, “In Life Nothing Matters but FRIENDS”, that MSG91’s 2011 website described as a “Company - user interaction platform”.",
    known: ["archive-whozzat-2009", "archive-msg91-2011"],
    status: "Whether it is the 2006 social network is not established.",
  },
  {
    name: "Save&Search",
    when: "Beta by January 2012",
    what: "A “save engine”: paste a link or note, tag it, and find it later by email, with no login. On monetisation, Agrawal told YourStory in May 2012: “We haven’t thought about monetizing yet”. Still running at the end of 2013, then reworked into a folder and file-sharing app.",
    known: ["archive-saveandsearch-2012", "yourstory-2012", "yourstory-2013", "archive-saveandsearch-2014"],
    status: "No record after 2014. Outcome unknown.",
  },
] as const;

/** Chapter 7: the company in December 2013, as YourStory reported it. */
export const snapshot2013 = {
  source: "yourstory-2013",
  facts: [
    { value: "30", label: "people at Walkover" },
    { value: "6,000", label: "resellers in its network" },
    { value: "18 paise", label: "most common price per SMS" },
  ],
  note: "Competitors named in the article: SolutionsInfini, Knowlarity, ZipDial.",
} as const;

/** Chapter 8: the problem each change responded to, in the founder's words and years. */
export const evolution = [
  {
    when: "c. 2015",
    problem: "More customers meant more data to keep safe and findable.",
    change: "Backups and a Phonebook for contacts. In 2015 the data moved from a plain SQL database to MongoDB, built to spread across many servers.",
    sources: ["founder-2019"],
  },
  {
    when: "2016",
    problem: "OTPs, the one-time codes apps send to confirm it is really you, went over the same route as other transactional SMS. Deliveries suffered, and MSG91 lost some clients.",
    change: "A separate route just for OTPs. Delivery got faster and more reliable, and clients simply integrated with MSG91’s APIs.",
    note: "The same account also lists this change under 2014.",
    sources: ["founder-2019"],
  },
  {
    when: "Oct 2016",
    problem: "Growing beyond what the team had built itself.",
    change: "MSG91 acquired ToSMS, a Kolkata messaging company founded in 2013, for an undisclosed amount. Inc42 reported a client base of more than 14,300, a figure the company supplied.",
    sources: ["inc42-2016", "msg91-tosms"],
  },
  {
    when: "2018",
    problem: "Customers wanted to reach people in their own language, and to know whether messages worked.",
    change: "SMS in regional languages, detected automatically. A URL shortener with a unique link per recipient, so clicks could be tracked. Pre-approved templates, so customers no longer had to get each one approved themselves.",
    note: "The account also mentions regional SMS and the shortener under 2014.",
    sources: ["founder-2019"],
  },
  {
    when: "2019",
    problem: "Customers reach people on more than one channel.",
    change: "Transactional email and voice backups for OTPs were already live. The stated plan was to go omnichannel: email, voice and RCS, which adds images and buttons to text messages.",
    sources: ["founder-2019"],
  },
] as const;

/** Chapter 9: Giddh, from name to release. */
export const giddhSteps = [
  { when: "Jan 2012", body: "A giddh.com login page is online.", source: "archive-giddh-2012" },
  { when: "Jun 2014", body: "Walkover calls Giddh “their online accounting software”.", source: "prweb-2014" },
  { when: "3 May 2016", body: "In beta, “for a very small price”.", source: "prn-giddh-study" },
  { when: "16 May 2016", body: "Publicly released, after “two-long years”.", source: "prn-giddh-launch" },
] as const;

/** Chapter 10: viaSocket's path, as the company tells it. */
export const viasocketPath = [
  { step: "Side project", body: "Connect a few apps for Walkover’s own marketing." },
  { step: "90 days", body: "The first prototype. 10 apps." },
  { step: "3–4 rebuilds", body: "The automation engine, rewritten as needs grew." },
  { step: "Real-time triggers", body: "Workflows start the moment something happens." },
  { step: "AI intent", body: "Describe what you want in plain English." },
  { step: "2,300+ apps", body: "Integrations, as viaSocket reported in October 2026." },
] as const;

/** Chapter 11: the figures, each with its date and source. */
export const figures = [
  { value: "$4.5M", label: "MSG91 revenue, FY 2018–19", basis: "Reported by the founder, 2019", source: "founder-2019" },
  { value: "$10M", label: "MSG91 annual recurring revenue", basis: "Reported by The Grit Stories, October 2022", source: "grit-2022" },
] as const;

/** Chapter 13: lessons, each tied to the chapters that support it. */
export const lessons = [
  {
    title: "Customers set the direction",
    body: "A club’s request led to SMS. A client’s problem led to the separate OTP route. The team’s own bookkeeping led to Giddh, and its own marketing to viaSocket.",
    chapters: ["sms", "msg91-evolves", "giddh", "viasocket"],
  },
  {
    title: "Start with what you can sell now",
    body: "Hosting was not the destination, but it paid for the early years and introduced the team to the businesses that later bought SMS.",
    chapters: ["indore"],
  },
  {
    title: "Rules can reshape a market",
    body: "The 2011 regulations restricted promotional SMS and set transactional messages apart. The founder later said the changes worked to MSG91’s advantage.",
    chapters: ["rules"],
  },
  {
    title: "Reliability is part of the product",
    body: "Downtime pushed the move to AWS. Failed OTPs pushed a separate route. Both changes were made because customers felt the problem.",
    chapters: ["reliability", "msg91-evolves"],
  },
  {
    title: "A good product does not sell itself",
    body: "By the founders’ own account, MSG91 grew more slowly than it could have because sales came second to product.",
    chapters: ["product-first", "limits"],
  },
  {
    title: "Not every experiment has to become a company",
    body: "Whozzat and Save&Search were small, quick and cheap. They are part of the record whether or not they lasted.",
    chapters: ["experiments"],
  },
  {
    title: "Rebuilding is normal",
    body: "MSG91 changed databases and routes. viaSocket rebuilt its engine three or four times. Version by version is how both got where they are.",
    chapters: ["msg91-evolves", "viasocket"],
  },
  {
    title: "Bangalore was optional",
    body: "Indore was chosen for home and cost. YourStory noted the advantage of a large catchment nearby, and the extra effort needed to win each lead.",
    chapters: ["indore", "reliability"],
  },
] as const;

/** Questions the sources do not answer. Shown on the page. */
export const openQuestions = [
  "What the 2006 social network was called, what it did, and why it failed.",
  "Whether Whozzat had anything to do with that first attempt.",
  "The exact date Walkover Web Solutions Pvt. Ltd. was incorporated.",
  "Which company was MSG91’s first Fortune 500 client in 2011.",
  "How the 2013 move to AWS was carried out.",
  "Whether the separate OTP route arrived in 2014 or in 2016.",
  "What became of Host n Soft, Whozzat, Save&Search, Clientshub and Ineedname.",
  "The year viaSocket started, and the names of the two team members behind it.",
] as const;

export const storyMeta = {
  checked: "10 October 2026",
  checkedISO: "2026-10-10",
} as const;
