/**
 * Events the Walkover products have taken part in. The evidence behind each
 * record (quotes, conflicting details, leads that were dropped) lives in
 * docs/EVENTS-LEDGER.md; record IDs match between the two.
 *
 * Rules: one record per event edition, however many products or posts it
 * involves. Nothing is stated that a listed source does not say. Unverified
 * leads (ledger level F) are kept in the ledger, not published here.
 */
import type { ProductSlug } from "./types";

/** The three products with an events record, plus the parent company. */
export type EventOwner = Extract<ProductSlug, "msg91" | "giddh" | "viasocket"> | "walkover";

export const eventOwners: EventOwner[] = ["msg91", "giddh", "viasocket", "walkover"];

export type EventKind =
  | "conference"
  | "summit"
  | "exhibition"
  | "hackathon"
  | "workshop"
  | "webinar"
  | "meetup"
  | "panel"
  | "delegation"
  | "company-event";

export type EventRole =
  | "attendee"
  | "exhibitor"
  | "sponsor"
  | "speaker"
  | "panelist"
  | "judge"
  | "organizer"
  | "host"
  | "workshop-instructor"
  | "product-demonstrator"
  | "technology-partner"
  | "award-recipient"
  | "product-used"
  | "webinar-host"
  | "webinar-guest";

/**
 * How well participation is established. Maps to ledger levels A–E.
 * "announced" covers future events and past ones with no post-event record.
 */
export type Evidence = "confirmed" | "corroborated" | "team-account" | "announced" | "associated";

export type EventSource = {
  title: string;
  publisher: string;
  /** Publication date as ISO (YYYY-MM-DD), when known. */
  date?: string;
  url: string;
  kind: "company" | "team" | "organizer" | "media" | "archive";
};

/** A free-licensed photo of the venue. Never a photo of the event itself. */
export type VenuePhoto = {
  /** Local path under /public. */
  src: string;
  width: number;
  height: number;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  /** The Wikimedia Commons (or other) file page. */
  sourceUrl: string;
};

export type EventRecord = {
  /** Ledger ID, e.g. EVT-MSG91-0001. Internal, not an official event ID. */
  id: string;
  owners: EventOwner[];
  title: string;
  edition?: string;
  kind: EventKind;
  organizer?: string;
  url?: string;
  /** ISO date; YYYY-MM or YYYY when only that much is known. */
  start: string;
  end?: string;
  /** Set when the date is approximate or comes only from a post's timestamp. */
  dateNote?: string;
  format: "in-person" | "online" | "hybrid";
  place?: {
    venue?: string;
    city?: string;
    region?: string;
    country: string;
  };
  booth?: string;
  roles: EventRole[];
  evidence: Evidence;
  /** Verified facts only, written for the public page. */
  summary: string;
  showcased?: string[];
  people?: { name: string; title?: string; role: string }[];
  outcomes?: string[];
  photo?: VenuePhoto;
  sources: EventSource[];
  /** What the sources leave open. Shown on the page. */
  open?: string;
};

export const eventsMeta = {
  checked: "10 October 2026",
  checkedISO: "2026-10-10",
} as const;

export const evidenceLabels: Record<Evidence, { label: string; note: string }> = {
  confirmed: {
    label: "Confirmed",
    note: "An organiser, the company or a first-hand post written after the event records the participation.",
  },
  corroborated: {
    label: "Corroborated",
    note: "Independent sources agree that it happened. Some details are still missing.",
  },
  "team-account": {
    label: "Team account",
    note: "A team member's own post is the only record. Nothing independent confirms it yet.",
  },
  announced: {
    label: "Announced",
    note: "Participation was announced. Nothing published afterwards confirms it took place.",
  },
  associated: {
    label: "Associated",
    note: "The organiser names the product as a partner, prize or tool. Team attendance is not documented.",
  },
};

export const roleLabels: Record<EventRole, string> = {
  attendee: "Attendee",
  exhibitor: "Exhibitor",
  sponsor: "Sponsor",
  speaker: "Speaker",
  panelist: "Panellist",
  judge: "Judge",
  organizer: "Organiser",
  host: "Host",
  "workshop-instructor": "Workshop lead",
  "product-demonstrator": "Product demo",
  "technology-partner": "Technology partner",
  "award-recipient": "Award",
  "product-used": "Product used by participants",
  "webinar-host": "Webinar host",
  "webinar-guest": "Webinar guest",
};

export const kindLabels: Record<EventKind, string> = {
  conference: "Conference",
  summit: "Summit",
  exhibition: "Exhibition",
  hackathon: "Hackathon",
  workshop: "Workshop",
  webinar: "Webinar",
  meetup: "Meetup",
  panel: "Panel",
  delegation: "Business delegation",
  "company-event": "Hosted event",
};

const commons = {
  bySa4: { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  by4: { license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" },
};

const walkoverOffice = { venue: "Walkover, LIC Tower", city: "Indore", region: "Madhya Pradesh", country: "India" };

export const events: EventRecord[] = [
  /* ── MSG91 ─────────────────────────────────────────── */
  {
    id: "EVT-MSG91-0001",
    owners: ["msg91"],
    title: "MSG91 Internet of Things Conclave",
    kind: "company-event",
    organizer: "MSG91",
    start: "2015-08-01",
    dateNote: "Inferred: the recap of 5 Aug 2015 says it was held “on Saturday”",
    format: "in-person",
    place: { venue: "A Radisson Blu hotel", country: "India" },
    roles: ["organizer", "host", "speaker"],
    evidence: "confirmed",
    summary:
      "MSG91's first conclave on the Internet of Things brought together people from manufacturing, media, education, health, logistics, e-commerce and retail. IoT and M2M specialist Narendra K Saini led the main session, and founder Pushpendra Agrawal spoke about the role of text messaging in IoT.",
    people: [
      { name: "Piyush Sharma", title: "Marketing team lead", role: "organiser" },
      { name: "Mukti Masih", role: "anchor" },
      { name: "Pushpendra Agrawal", title: "Founder", role: "speaker" },
    ],
    sources: [
      {
        title: "MSG91 initiates dialogue on IoT in an enriching conclave",
        publisher: "MSG91 Blog (Internet Archive)",
        date: "2015-08-05",
        url: "https://web.archive.org/web/20150807175057/http://blog.msg91.com/msg91-initiates-dialogue-on-iot-in-an-enriching-conclave",
        kind: "archive",
      },
      {
        title: "MSG91 initiates dialogue on IoT in an enriching conclave (current copy)",
        publisher: "MSG91",
        url: "https://msg91.com/guide/msg91-initiates-dialogue-iot-enriching-conclave/",
        kind: "company",
      },
    ],
    open: "The recap names neither the city nor the Radisson Blu property, so no venue photo is shown. The current copy on msg91.com carries a 2026 republishing date; the archived original is dated 5 August 2015.",
  },
  {
    id: "EVT-MSG91-0002",
    owners: ["msg91"],
    title: "Marketing Automation at Scale: Strategies from the Boardroom",
    kind: "webinar",
    organizer: "MSG91 with CleverTap",
    start: "2018-06-13",
    format: "online",
    roles: ["webinar-host"],
    evidence: "confirmed",
    summary:
      "MSG91 and CleverTap co-hosted a webinar on marketing automation with ixigo's Himanshu Periwal as the main speaker. MSG91 published the session's takeaways on its blog afterwards.",
    people: [
      { name: "Kritika Prashant", title: "Director, Product Marketing", role: "co-host" },
    ],
    sources: [
      {
        title: "Marketing Automation At Scale – Strategies From The Boardroom",
        publisher: "MSG91 Blog (Internet Archive)",
        date: "2018-06-23",
        url: "https://web.archive.org/web/20190917112008/https://msg91.com/blog/marketing-automation-at-scale-strategies-from-the-boardroom/",
        kind: "archive",
      },
    ],
    open: "The online format is inferred from the blog's “Webinar” category. No recording or registration page was found.",
  },
  {
    id: "EVT-MSG91-0003",
    owners: ["msg91"],
    title: "MWC Barcelona",
    edition: "2019",
    kind: "exhibition",
    organizer: "GSMA",
    start: "2019-02-25",
    end: "2019-02-28",
    format: "in-person",
    place: { venue: "Fira Gran Via", city: "Barcelona", country: "Spain" },
    roles: ["exhibitor"],
    evidence: "confirmed",
    summary:
      "The MSG91 team ran a stall at the mobile industry's largest trade show and held meetings through the week, then published a recap of what it learned on the MSG91 blog.",
    photo: {
      src: "/events/fira-gran-via-barcelona.jpg",
      width: 1280,
      height: 720,
      alt: "The curved, glass-fronted main entrance building of Fira de Barcelona Gran Via",
      author: "Canaan",
      ...commons.bySa4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Fira_Gran_Via.jpg",
    },
    sources: [
      {
        title: "What Happened at MWC'19",
        publisher: "MSG91 Blog (Internet Archive)",
        date: "2019-03-12",
        url: "https://web.archive.org/web/20190721203038/https://msg91.com/blog/what-happened-at-mwc19/",
        kind: "archive",
      },
    ],
    open: "The 2019 hall and stand number and the names of the team who travelled are not published. MSG91 also announced a stand for MWC 2020 (Hall 8.1, H70), but the GSMA cancelled that edition, so it is not listed.",
  },
  {
    id: "EVT-MSG91-0004",
    owners: ["msg91"],
    title: "TiECon MP",
    edition: "2025",
    kind: "conference",
    organizer: "TiE Madhya Pradesh",
    start: "2025-10-31",
    format: "in-person",
    place: { venue: "Brilliant Convention Centre", city: "Indore", region: "Madhya Pradesh", country: "India" },
    roles: [],
    evidence: "associated",
    summary:
      "TiE Indore's thank-you post after the conference names MSG91 in its list of sponsors, partners, event team and venue partner.",
    sources: [
      {
        title: "#TiEConMP2025 — Where Ideas Became Impact",
        publisher: "TiE Indore on LinkedIn",
        date: "2025-11-07",
        url: "https://www.linkedin.com/posts/tiempofficial_tieconmp2025-tieconmp-tieconmp-activity-7392586416007974912-ox5d",
        kind: "organizer",
      },
      {
        title: "TiECon MP 2025",
        publisher: "Grant Thornton Bharat",
        url: "https://www.grantthornton.in/en/events/tiecon-mp-2025/",
        kind: "organizer",
      },
    ],
    open: "The list does not say whether MSG91 was a sponsor or a partner, and no MSG91 staff, booth or session is documented.",
  },
  {
    id: "EVT-MSG91-0005",
    owners: ["msg91"],
    title: "Indian technology companies at the Embassy of India, Bucharest",
    kind: "delegation",
    organizer: "Embassy of India, Bucharest, with FICCI",
    start: "2025-12-12",
    dateNote: "From the date of the team member's post, which says “today”",
    format: "in-person",
    place: { venue: "Embassy of India", city: "Bucharest", country: "Romania" },
    roles: ["product-demonstrator"],
    evidence: "team-account",
    summary:
      "Hardik Menghani presented MSG91 and its agentic AI platform to an audience of Indian and Romanian technology companies at the Embassy of India in Bucharest.",
    showcased: ["MSG91 agentic AI platform"],
    people: [{ name: "Hardik Menghani", role: "presenter" }],
    sources: [
      {
        title: "Presenting MSG91 at the Embassy of India, Bucharest",
        publisher: "Hardik Menghani on LinkedIn",
        date: "2025-12-12",
        url: "https://www.linkedin.com/posts/hmenghani_msg91-activity-7405254058778894336-qAGH",
        kind: "team",
      },
      {
        title: "Strengthening India-Romania Economic and Technology Partnerships",
        publisher: "Embassy of India, Bucharest",
        date: "2025-12-22",
        url: "https://www.eoibucharest.gov.in/news_letter_detail/?id=62",
        kind: "organizer",
      },
    ],
    open: "The embassy's release describes a B2B meeting on IT and IT-enabled services with FICCI and ESC but does not name MSG91 or give the meeting date. That it is the same gathering is our reading.",
  },
  {
    id: "EVT-MSG91-0006",
    owners: ["msg91"],
    title: "IMA International Management Conclave",
    edition: "33rd, 2026",
    kind: "conference",
    organizer: "Indore Management Association",
    url: "https://www.imaindore.com/",
    start: "2026-02-27",
    end: "2026-02-28",
    format: "in-person",
    place: { venue: "Brilliant Convention Centre", city: "Indore", region: "Madhya Pradesh", country: "India" },
    booth: "Booth 6",
    roles: ["exhibitor", "product-demonstrator"],
    evidence: "confirmed",
    summary:
      "MSG91 exhibited Hello, its shared inbox for WhatsApp, SMS, Instagram, RCS, voice and email, along with its chatbots. At the stall, Anchal Rathi hosted Dr Niranjan Hiranandani, who asked how Hello drives conversions in real estate.",
    showcased: ["Hello by MSG91", "Chatbots for WhatsApp, Instagram, Facebook, web chat and voice"],
    people: [{ name: "Anchal Rathi", role: "at the MSG91 stall" }],
    sources: [
      {
        title: "MSG91 at IMA 2026, Booth No. 6",
        publisher: "MSG91 on LinkedIn",
        date: "2026-02-26",
        url: "https://www.linkedin.com/posts/msg91_msg91-hellobymsg91-ima2026-activity-7432699013679861761-00Yz",
        kind: "company",
      },
      {
        title: "Hosting Dr Niranjan Hiranandani at the MSG91 stall",
        publisher: "Anchal Rathi on LinkedIn",
        date: "2026-02-27",
        url: "https://www.linkedin.com/posts/anchal-rathi-34b598125_msg91-hellobymsg91-imaindore-activity-7433119967534927872-k77x",
        kind: "team",
      },
    ],
    open: "No exhibitor list from the organiser naming MSG91 was found. No free-licensed photo of Brilliant Convention Centre was found.",
  },
  {
    id: "EVT-MSG91-0007",
    owners: ["msg91"],
    title: "Marketing Conclave",
    edition: "20th, 2026",
    kind: "conference",
    organizer: "IAMAI",
    url: "https://www.marketingconclave.com/",
    start: "2026-08-04",
    end: "2026-08-05",
    format: "in-person",
    place: { venue: "Taj Lands End", city: "Mumbai", region: "Maharashtra", country: "India" },
    booth: "Booth D5",
    roles: ["exhibitor"],
    evidence: "announced",
    summary:
      "The day before the conclave, MSG91 posted that it was set to exhibit at Booth D5, talking to marketers about customer conversations, AI chatbots and WhatsApp Business messaging.",
    photo: {
      src: "/events/taj-lands-end-mumbai.jpg",
      width: 1280,
      height: 960,
      alt: "The Taj Lands End hotel tower in Bandra, Mumbai, seen from the street",
      author: "Piyush P Pujari (cropped)",
      ...commons.bySa4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:TAJ_LANDS_END.jpg",
    },
    sources: [
      {
        title: "MSG91 at Marketing Conclave 2026, Booth D5",
        publisher: "MSG91 on LinkedIn",
        date: "2026-08-03",
        url: "https://www.linkedin.com/posts/msg91_msg91-marketingconclave2026-businessmessaging-activity-7489907605000220672-3nqz",
        kind: "company",
      },
    ],
    open: "No post-event photo, recap or organiser exhibitor list naming MSG91 has been found yet.",
  },
  {
    id: "EVT-MSG91-0008",
    owners: ["msg91"],
    title: "India CX Summit & Awards",
    edition: "2026",
    kind: "summit",
    organizer: "Synnex Group",
    url: "https://www.indiacxsummit.com/",
    start: "2026-08-12",
    format: "in-person",
    place: { venue: "Radisson Blu, Dwarka", city: "New Delhi", region: "Delhi", country: "India" },
    roles: ["exhibitor", "product-demonstrator", "award-recipient"],
    evidence: "confirmed",
    summary:
      "MSG91 is listed among the organiser's partners and presented Hello by MSG91 for unified, AI-assisted customer support. Hello by MSG91 was named Contact Centre of the Year at the summit's awards.",
    showcased: ["Hello by MSG91"],
    outcomes: ["Hello by MSG91 named Contact Centre of the Year."],
    people: [{ name: "Hardik Menghani", role: "shared the award" }],
    photo: {
      src: "/events/radisson-blu-dwarka-new-delhi.jpg",
      width: 1280,
      height: 719,
      alt: "The curved tower of the Radisson Blu hotel in Dwarka, New Delhi, behind a roundabout",
      author: "ArmouredCyborg",
      ...commons.bySa4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hotel_Radisson_Blu,_Dwarka.jpg",
    },
    sources: [
      {
        title: "Home - India CX Summit & Awards 2026",
        publisher: "India CX Summit & Awards",
        url: "https://www.indiacxsummit.com/",
        kind: "organizer",
      },
      {
        title: "Hello by MSG91 Recognised as Contact Centre of the Year at India CX Summit & Awards 2026",
        publisher: "ANI (paid press release)",
        date: "2026-08-25",
        url: "https://aninews.in/news/business/hello-by-msg91-recognised-as-contact-centre-of-the-year-at-india-cx-summit-amp-awards-202620260825112319/",
        kind: "company",
      },
      {
        title: "MSG91 at the India CX Summit",
        publisher: "MSG91 on LinkedIn",
        date: "2026-08-08",
        url: "https://www.linkedin.com/posts/msg91_indiacxsummit-cxawards2026-msg91-activity-7491712331111104512-Bgtj",
        kind: "company",
      },
      {
        title: "Hello by MSG91 recognised as Contact Center of the Year",
        publisher: "Hardik Menghani on LinkedIn",
        date: "2026-08-17",
        url: "https://www.linkedin.com/posts/activity-7495052968841629696-FLih",
        kind: "team",
      },
    ],
    open: "MSG91's own post calls it the Delhi CX Summit. The partnership tier and booth number are not published, and the award is described in a paid release rather than an organiser list of winners.",
  },
  {
    id: "EVT-MSG91-0009",
    owners: ["msg91"],
    title: "MSG91 Summit: E-Commerce Edition",
    kind: "company-event",
    organizer: "MSG91",
    start: "2026-09-05",
    format: "in-person",
    place: { city: "Indore", region: "Madhya Pradesh", country: "India" },
    roles: ["organizer", "host", "product-demonstrator"],
    evidence: "confirmed",
    summary:
      "MSG91 hosted D2C founders, developers and growth teams for a first look at Complete Checkout for Shopify, its checkout for Shopify-based brands, alongside its messaging channels, Hello by MSG91 and a developer session.",
    showcased: ["Complete Checkout for Shopify (a Shopify private app, not a public launch)", "Hello by MSG91"],
    sources: [
      {
        title: "MSG91 expands into e-commerce, showcases Shopify checkout solution for D2C brands",
        publisher: "Business Standard (paid press release)",
        date: "2026-09-21",
        url: "https://www.business-standard.com/content/press-releases-ani/msg91-expands-into-e-commerce-showcases-shopify-checkout-solution-for-d2c-brands-126092101066_1.html",
        kind: "company",
      },
    ],
    open: "The release says only “held in Indore”; the exact venue is not confirmed. No attendance figures or photos are published.",
  },
  {
    id: "EVT-MSG91-0010",
    owners: ["msg91"],
    title: "Global Fintech Fest",
    edition: "2026",
    kind: "conference",
    organizer: "Payments Council of India, NPCI and Fintech Convergence Council",
    url: "https://www.globalfintechfest.com/",
    start: "2026-09-09",
    end: "2026-09-11",
    format: "in-person",
    place: { venue: "Jio World Centre", city: "Mumbai", region: "Maharashtra", country: "India" },
    roles: ["attendee"],
    evidence: "announced",
    summary: "MSG91 announced that four of its team would represent the company at the fintech festival.",
    people: [
      { name: "Ragini Pawar", role: "announced" },
      { name: "Nishant Badhe", role: "announced" },
      { name: "Shruti Jaiswal", role: "announced" },
      { name: "Hardik Menghani", role: "announced" },
    ],
    photo: {
      src: "/events/jio-world-centre-mumbai.jpg",
      width: 1280,
      height: 960,
      alt: "Glass and stone façade of Jio World Centre, Mumbai, seen from Gate 10",
      author: "DesiBoy101 (cropped)",
      ...commons.by4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Jio_World_Centre,_Mumbai.jpg",
    },
    sources: [
      {
        title: "Four MSG91 Rangers at Global Fintech Fest 2026",
        publisher: "MSG91 on LinkedIn",
        date: "2026-09-07",
        url: "https://www.linkedin.com/posts/msg91_gff2026-globalfintechfest-msg91-activity-7502747383835881472-qnig",
        kind: "company",
      },
    ],
    open: "Whether MSG91 exhibited or attended as delegates is not stated, and no post-event record has been found.",
  },
  {
    id: "EVT-MSG91-0011",
    owners: ["msg91"],
    title: "Frontier D2C AI Summit",
    edition: "2nd edition",
    kind: "summit",
    organizer: "D2C Insider",
    url: "https://echai.ventures/events/frontier-d2c-ai-summit-2nd-edition-oct-10-2026",
    start: "2026-10-10",
    format: "in-person",
    place: { venue: "Novotel Mumbai International Airport", city: "Mumbai", region: "Maharashtra", country: "India" },
    roles: ["attendee"],
    evidence: "announced",
    summary:
      "MSG91 announced that its team would be at the summit to show how consumer brands use AI to talk to customers on WhatsApp, RCS, email and Chatwindow.",
    people: [
      { name: "Hardik Menghani", role: "announced" },
      { name: "Khushali Dube", role: "announced" },
      { name: "Amit Gautam", role: "announced" },
    ],
    sources: [
      {
        title: "MSG91 at the Frontier AI Summit by D2C Insider",
        publisher: "MSG91 on LinkedIn",
        date: "2026-10-08",
        url: "https://www.linkedin.com/posts/msg91_frontieraisummit-d2cinsider-msg91-activity-7513967138303467521-mMqe",
        kind: "company",
      },
      {
        title: "Frontier D2C AI Summit 2nd Edition, Oct 10 2026",
        publisher: "eChai Ventures",
        url: "https://echai.ventures/events/frontier-d2c-ai-summit-2nd-edition-oct-10-2026",
        kind: "organizer",
      },
    ],
    open: "No free-licensed photo of the hotel was found.",
  },

  /* ── Giddh ─────────────────────────────────────────── */
  {
    id: "EVT-GIDDH-0001",
    owners: ["giddh"],
    title: "ICAI AI Innovation Summit",
    edition: "2026",
    kind: "summit",
    organizer: "The Institute of Chartered Accountants of India",
    start: "2026-06-26",
    end: "2026-06-27",
    format: "in-person",
    place: { venue: "Bharat Mandapam", city: "New Delhi", region: "Delhi", country: "India" },
    booth: "Booth 14",
    roles: ["technology-partner", "exhibitor"],
    evidence: "announced",
    summary:
      "ICAI's summit website listed Giddh as a Technology Partner. The day before the summit, Manish Dhamnodiya posted that he would represent Giddh at Booth 14, highlighting its AI-assisted accounting, compliance and financial-management features.",
    people: [{ name: "Manish Dhamnodiya", role: "announced at the booth" }],
    photo: {
      src: "/events/bharat-mandapam-new-delhi.jpg",
      width: 1280,
      height: 960,
      alt: "The curved copper-coloured façade of Bharat Mandapam convention centre in New Delhi, seen from the east",
      author: "Kuldeepburjbhalaike",
      ...commons.bySa4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bharat_Mandapam_view_from_East.jpg",
    },
    sources: [
      {
        title: "AI Innovation Summit (AIS 2026), partners",
        publisher: "ICAI (Internet Archive, 13 Jun 2026)",
        date: "2026-06-13",
        url: "https://web.archive.org/web/20260613180246/https://ai.icai.org/ais2026/",
        kind: "archive",
      },
      {
        title: "Excited to represent Giddh-Online Accounting Software at ICAI AI Innovation Summit",
        publisher: "Manish Dhamnodiya on LinkedIn",
        date: "2026-06-25",
        url: "https://www.linkedin.com/posts/manishdhamnodiya_excited-to-represent-giddh-online-accounting-activity-7475883298452500480-xcUB",
        kind: "team",
      },
      {
        title: "ICAI Inaugurates AI Innovation Summit (AIS) 2026",
        publisher: "ICAI",
        date: "2026-06-26",
        url: "https://www.icai.org/post/icai-ais2026-26062026",
        kind: "organizer",
      },
    ],
    open: "Both records of Giddh's role predate the summit, and ICAI's post-event release does not mention Giddh. A recap or photo from the booth would confirm it.",
  },

  /* ── viaSocket ─────────────────────────────────────── */
  {
    id: "EVT-VIASOCKET-0001",
    owners: ["viasocket", "walkover"],
    title: "PyData Indore Hack Days",
    edition: "2026",
    kind: "hackathon",
    organizer: "PyData Indore with Major League Hacking",
    url: "https://indore.pydata.org/hack-days/",
    start: "2026-07-18",
    format: "in-person",
    place: { venue: "SSi Digital Academy", city: "Indore", region: "Madhya Pradesh", country: "India" },
    roles: ["technology-partner", "product-demonstrator", "judge"],
    evidence: "confirmed",
    summary:
      "Walkover was Technology Partner for this one-day mini hackathon. The agenda included a viaSocket demo, participants received a viaSocket subscription, and a viaSocket panel judged a Best Use of viaSocket prize.",
    showcased: ["viaSocket webhook flows and MCP"],
    outcomes: [
      "Best Use of viaSocket went to team Hackfinity for expenso, a Telegram-to-Google-Sheets expense logger, after a follow-up submission the judges asked for.",
    ],
    people: [{ name: "Dhwanil Bhavsar", role: "coordinated the viaSocket prize" }],
    sources: [
      {
        title: "PyData Indore Hack Days — Mini Hackathon",
        publisher: "PyData Indore",
        url: "https://indore.pydata.org/hack-days/",
        kind: "organizer",
      },
      {
        title: "PyData Indore Hack Days",
        publisher: "Major League Hacking",
        url: "https://events.mlh.com/events/14415-pydata-indore-hack-days",
        kind: "organizer",
      },
      {
        title: "Best Use of viaSocket at PyData Indore Hack Days",
        publisher: "PyData Indore on LinkedIn",
        date: "2026-07-27",
        url: "https://www.linkedin.com/posts/pydata-indore_pydataindore-mlhhackdays-viasocket-activity-7487414848642007041-EOHD",
        kind: "organizer",
      },
    ],
    open: "Who gave the demo and who sat on the judging panel are not named.",
  },
  {
    id: "EVT-VIASOCKET-0002",
    owners: ["viasocket"],
    title: "UDAAN",
    edition: "2026",
    kind: "panel",
    organizer: "Shri Vaishnav Vidyapeeth Vishwavidyalaya",
    start: "2026",
    dateNote: "Date not published; reported on 12 Aug 2026",
    format: "in-person",
    place: { venue: "Shri Vaishnav Vidyapeeth Vishwavidyalaya", city: "Indore", region: "Madhya Pradesh", country: "India" },
    roles: ["panelist", "attendee"],
    evidence: "team-account",
    summary:
      "viaSocket founder Ravi Bharti spoke on an industry panel on AI and automation at the university's UDAAN 2026, and Dhwanil Bhavsar attended as an industry delegate for viaSocket.",
    people: [
      { name: "Ravi Bharti", title: "Founder, viaSocket", role: "panellist" },
      { name: "Dhwanil Bhavsar", role: "industry delegate" },
    ],
    sources: [
      {
        title: "UDAAN 2026 at SVVV",
        publisher: "Dhwanil Bhavsar on LinkedIn",
        date: "2026-08-12",
        url: "https://www.linkedin.com/posts/dhwanilll_udaan2026-svvv-futureofwork-activity-7493252127994179586-pUEc",
        kind: "team",
      },
    ],
    open: "The exact date and an organiser page have not been found.",
  },
  {
    id: "EVT-VIASOCKET-0003",
    owners: ["viasocket", "walkover"],
    title: "Pre-hackathon session: Building AI Agents & Workflow Automation Systems",
    kind: "webinar",
    organizer: "Department of CSIT, Acropolis Institute of Technology & Research",
    start: "2026-08-17",
    dateNote: "4:00 PM, on Zoom",
    format: "online",
    roles: ["speaker"],
    evidence: "announced",
    summary:
      "The organisers announced a session for hackathon participants on APIs, workflow automation, AI agents and MCP, led by Naman Tamrakar of viaSocket and Dhwanil Bhavsar of Walkover.",
    people: [
      { name: "Naman Tamrakar", title: "viaSocket", role: "speaker" },
      { name: "Dhwanil Bhavsar", title: "Walkover", role: "speaker" },
    ],
    sources: [
      {
        title: "Pre-Hackathon Session – Important Update",
        publisher: "CSIT AITR on LinkedIn",
        date: "2026-08-17",
        url: "https://www.linkedin.com/posts/csit-aitr-b65a8222b_pre-hackathon-session-important-update-activity-7495039067810844672-NW2j",
        kind: "organizer",
      },
    ],
    open: "No recording or recap was found. The post does not name the hackathon; IKIGAI 2026, run by the same department four days later, is the likely one.",
  },
  {
    id: "EVT-VIASOCKET-0004",
    owners: ["viasocket", "walkover"],
    title: "IKIGAI National-Level Hackathon",
    edition: "2026",
    kind: "hackathon",
    organizer: "Acropolis Institute of Technology & Research, with IIT Ropar",
    url: "https://ikigai-csit.netlify.app",
    start: "2026-08-21",
    end: "2026-08-23",
    format: "in-person",
    place: { venue: "Acropolis Institute of Technology & Research", city: "Indore", region: "Madhya Pradesh", country: "India" },
    roles: ["judge"],
    evidence: "confirmed",
    summary:
      "Ravi Bharti judged the NextGenAI track of this 36-hour national hackathon. The organisers' closing post tags viaSocket and Walkover among the event's partners, and a participating team reported winning a Best viaSocket Technology Used award.",
    outcomes: [
      "A team reported winning Best viaSocket Technology Used for an end-to-end returns agent. Walkover later hosted a group of the institute's faculty.",
    ],
    people: [
      { name: "Ravi Bharti", title: "Director, Walkover", role: "judge" },
      { name: "Naman Tamrakar", role: "mentor" },
    ],
    sources: [
      {
        title: "IKIGAI 2026 | A Grand Valedictory Ceremony",
        publisher: "CSIT AITR on LinkedIn",
        date: "2026-08-24",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7497640690269732866",
        kind: "organizer",
      },
      {
        title: "Reflections on IKIGAI 2026",
        publisher: "Ravi Bharti on LinkedIn",
        date: "2026-08-26",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7498324769575165953",
        kind: "team",
      },
      {
        title: "IKIGAI 2026 hackathon",
        publisher: "Nayan Paleja (participant) on LinkedIn",
        date: "2026-08-25",
        url: "https://www.linkedin.com/posts/nayan-paleja_ikigai2026-hackathon-generativeai-activity-7497858042202509313-46I5",
        kind: "media",
      },
      {
        title: "IKIGAI 2026",
        publisher: "PyData Indore",
        url: "https://indore.pydata.org/ikigai-2026/",
        kind: "organizer",
      },
    ],
    open: "The viaSocket award is reported only by the winning team; the official site does not list prizes or sponsors.",
  },
  {
    id: "EVT-VIASOCKET-0005",
    owners: ["viasocket"],
    title: "AiSensy × viaSocket: WhatsApp automation webinar",
    kind: "webinar",
    organizer: "AiSensy and viaSocket",
    start: "2026-09-23",
    dateNote: "4:00 PM IST",
    format: "online",
    roles: ["webinar-host"],
    evidence: "announced",
    summary:
      "A free live webinar on automating WhatsApp customer engagement by connecting AiSensy to other business tools through viaSocket.",
    sources: [
      {
        title: "AiSensy × viaSocket | Free Live Webinar",
        publisher: "AiSensy on LinkedIn",
        date: "2026-09-21",
        url: "https://www.linkedin.com/posts/activity-7507733044405907456-v9kL",
        kind: "company",
      },
    ],
    open: "Speakers are not named, and no recording or recap has been found.",
  },
  {
    id: "EVT-VIASOCKET-0006",
    owners: ["viasocket"],
    title: "ATZ CRM × viaSocket: AI recruiting workflows webinar",
    kind: "webinar",
    organizer: "viaSocket and ATZ CRM",
    start: "2026-09-24",
    dateNote: "4:00–4:30 PM IST",
    format: "online",
    roles: ["webinar-host"],
    evidence: "announced",
    summary:
      "A free 30-minute webinar on automating recruiting work such as AI job matching, résumé screening and candidate alerts.",
    sources: [
      {
        title: "Recruiters, how much of your day is spent on repetitive tasks?",
        publisher: "ATZ CRM on LinkedIn",
        date: "2026-09-16",
        url: "https://www.linkedin.com/posts/atz-crm_recruiters-how-much-of-your-day-is-spent-activity-7506022422396203008-oDV5",
        kind: "company",
      },
    ],
    open: "Speakers are not named, and no recording or recap has been found.",
  },
  {
    id: "EVT-VIASOCKET-0007",
    owners: ["viasocket"],
    title: "Bolna × viaSocket: how voice AI automation works",
    kind: "webinar",
    organizer: "Bolna, in association with viaSocket",
    start: "2026-09-25",
    dateNote: "4:00–4:30 PM (time zone not stated)",
    format: "online",
    roles: ["webinar-guest"],
    evidence: "announced",
    summary: "A live session on connecting voice AI conversations to business systems and automated workflows.",
    sources: [
      {
        title: "Bolna live session with viaSocket",
        publisher: "Bolna on LinkedIn",
        date: "2026-09-22",
        url: "https://www.linkedin.com/posts/activity-7508079124947845120-yT5H",
        kind: "company",
      },
    ],
    open: "The post tags speakers by first name only, so who represented viaSocket is not established. No recording or recap has been found.",
  },
  {
    id: "EVT-VIASOCKET-0008",
    owners: ["viasocket"],
    title: "SiteSpeakAI × viaSocket: AI customer conversations to workflows",
    kind: "webinar",
    organizer: "viaSocket and SiteSpeakAI",
    start: "2026-09-30",
    dateNote: "4:00 PM IST",
    format: "online",
    roles: ["webinar-host"],
    evidence: "announced",
    summary: "A 30-minute webinar on how AI customer-service conversations can trigger business workflows.",
    sources: [
      {
        title: "AI is changing how businesses handle customer conversations",
        publisher: "viaSocket on LinkedIn",
        date: "2026-09-23",
        url: "https://www.linkedin.com/posts/viasocket-walkover_ai-is-changing-how-businesses-handle-customer-activity-7508400322256556033-LagG",
        kind: "company",
      },
    ],
    open: "Presenters are not named, and no recording or recap has been found.",
  },
  {
    id: "EVT-VIASOCKET-0009",
    owners: ["viasocket"],
    title: "Automate magicplan with viaSocket",
    kind: "webinar",
    organizer: "viaSocket",
    start: "2026-10-07",
    dateNote: "4:00 PM IST",
    format: "online",
    roles: ["webinar-host"],
    evidence: "announced",
    summary:
      "A 30-minute webinar on connecting magicplan to other apps and building automations from plain-language instructions.",
    sources: [
      {
        title: "Live Webinar: Automate magicplan with viaSocket",
        publisher: "viaSocket on LinkedIn",
        date: "2026-10-05",
        url: "https://www.linkedin.com/posts/viasocket-walkover_viasocket-magicplan-webinar-activity-7512869206049128448-r-0r",
        kind: "company",
      },
    ],
    open: "Presenters are not named, and whether magicplan co-presented is unclear. No recording or recap has been found.",
  },

  /* ── Walkover ──────────────────────────────────────── */
  {
    id: "EVT-WALKOVER-0001",
    owners: ["walkover"],
    title: "Indore Startup Meetup",
    kind: "meetup",
    organizer: "eChai Ventures",
    url: "https://echai.ventures/events/indore-startup-meetup-feb-03-2026",
    start: "2026-02-03",
    format: "in-person",
    place: walkoverOffice,
    roles: ["host", "speaker"],
    evidence: "confirmed",
    summary:
      "eChai's Indore meetup, a panel conversation with founders and operators, was held at Walkover's office. Founder Pushpendra Agrawal was listed among the speakers.",
    people: [{ name: "Pushpendra Agrawal", title: "Founder, Walkover and viaSocket", role: "listed speaker" }],
    sources: [
      {
        title: "Indore Startup Meetup",
        publisher: "eChai Ventures",
        url: "https://echai.ventures/events/indore-startup-meetup-feb-03-2026",
        kind: "organizer",
      },
    ],
    open: "The organiser's page records the event as held, but there is no written recap confirming who spoke on the day.",
  },
  {
    id: "EVT-WALKOVER-0002",
    owners: ["walkover", "viasocket"],
    title: "Learn No-Code. Build with AI. Explore MCP.",
    edition: "Cohort 1",
    kind: "workshop",
    organizer: "Walkover",
    url: "https://luma.com/59ym6lwh",
    start: "2026-04-18",
    end: "2026-04-26",
    dateNote: "Four sessions: 18–19 and 25–26 Apr",
    format: "in-person",
    place: walkoverOffice,
    roles: ["organizer", "host", "workshop-instructor"],
    evidence: "announced",
    summary:
      "A free, hands-on programme on no-code workflow automation, AI workflows and MCP, hosted by viaSocket's Dhwanil Bhavsar and Ravi Paliwal.",
    people: [
      { name: "Dhwanil Bhavsar", role: "host" },
      { name: "Ravi Paliwal", title: "Founder, viaSocket", role: "host" },
    ],
    sources: [
      {
        title: "Learn No-Code. Build with AI. Explore MCP. | Walkover, Indore",
        publisher: "Luma",
        url: "https://luma.com/59ym6lwh",
        kind: "organizer",
      },
    ],
    open: "Luma shows the event as past with 120 registered guests, but no recap confirms turnout. The listing does not name the tools taught.",
  },
  {
    id: "EVT-WALKOVER-0003",
    owners: ["walkover", "viasocket"],
    title: "Learn No-Code. Build with AI. Explore MCP.",
    edition: "Cohort 2",
    kind: "workshop",
    organizer: "Walkover",
    url: "https://luma.com/3qfqx1rt",
    start: "2026-05-23",
    end: "2026-05-24",
    format: "in-person",
    place: walkoverOffice,
    roles: ["organizer", "host", "workshop-instructor"],
    evidence: "announced",
    summary:
      "A two-day, hands-on workshop on no-code automation, AI agents and MCP, hosted by viaSocket's Dhwanil Bhavsar and Ravi Paliwal.",
    people: [
      { name: "Dhwanil Bhavsar", role: "host" },
      { name: "Ravi Paliwal", title: "Founder, viaSocket", role: "host" },
    ],
    sources: [
      {
        title: "Learn No-Code. Build with AI. Explore MCP. | Cohort 2 | Walkover, Indore",
        publisher: "Luma",
        url: "https://luma.com/3qfqx1rt",
        kind: "organizer",
      },
      {
        title: "No-code, AI agents and MCP workshop",
        publisher: "Walkover on LinkedIn",
        date: "2026-05-13",
        url: "https://www.linkedin.com/posts/walkover_nocode-ai-aiagents-activity-7460303580957376512-1C7T",
        kind: "company",
      },
    ],
    open: "Luma shows the event as past with 118 registered guests, but no recap confirms turnout.",
  },
  {
    id: "EVT-WALKOVER-0004",
    owners: ["walkover", "viasocket"],
    title: "Learn No-Code. Build with AI. Explore MCP.",
    edition: "Cohort 3",
    kind: "workshop",
    organizer: "Walkover",
    url: "https://luma.com/lnlxg3p5",
    start: "2026-06-06",
    end: "2026-06-07",
    format: "in-person",
    place: walkoverOffice,
    roles: ["organizer", "host", "workshop-instructor"],
    evidence: "announced",
    summary:
      "A two-day, in-person workshop on no-code tools, AI agents, MCP and workflow automation, hosted by viaSocket's Dhwanil Bhavsar and Ravi Paliwal.",
    people: [
      { name: "Dhwanil Bhavsar", role: "host" },
      { name: "Ravi Paliwal", title: "Founder, viaSocket", role: "host" },
    ],
    sources: [
      {
        title: "Learn No-Code. Build with AI. Explore MCP. | Cohort 3 | Walkover, Indore",
        publisher: "Luma",
        url: "https://luma.com/lnlxg3p5",
        kind: "organizer",
      },
    ],
    open: "Luma shows the event as past with 142 registered guests, but no recap confirms turnout.",
  },
  {
    id: "EVT-WALKOVER-0005",
    owners: ["walkover", "viasocket"],
    title: "Walkover AI Agent Builders Workshop",
    kind: "workshop",
    organizer: "Walkover",
    url: "https://luma.com/v8p833w6",
    start: "2026-06-27",
    end: "2026-06-28",
    format: "in-person",
    place: walkoverOffice,
    roles: ["organizer", "host", "workshop-instructor"],
    evidence: "announced",
    summary:
      "A paid, two-day “build with the founders” programme on AI agents, automation workflows and MCP integrations, listed with Dhwanil Bhavsar, Ravi Paliwal and Yashraj Sharma as hosts.",
    people: [
      { name: "Dhwanil Bhavsar", role: "host" },
      { name: "Ravi Paliwal", title: "Founder, viaSocket", role: "host" },
      { name: "Yashraj Sharma", role: "host" },
    ],
    sources: [
      {
        title: "Walkover AI Agent Builders Workshop",
        publisher: "Luma",
        url: "https://luma.com/v8p833w6",
        kind: "organizer",
      },
    ],
    open: "No recap was found, and Walkover's announcement post is no longer available, so it is not confirmed that the workshop ran.",
  },
  {
    id: "EVT-WALKOVER-0006",
    owners: ["walkover"],
    title: "Build with AI: Code for Communities, Indore Edition",
    kind: "hackathon",
    organizer: "GDG Indore, GDG Cloud Indore and Machine Learning Indore",
    url: "https://gdg.community.dev/events/details/google-gdg-indore-presents-build-with-ai-code-for-communities-indore-edition/",
    start: "2026-07-05",
    format: "in-person",
    place: walkoverOffice,
    roles: ["host"],
    evidence: "announced",
    summary: "GDG Indore's page for this full-day hackathon prep event gives Walkover as the venue and lists Walkover Indore as a partner.",
    sources: [
      {
        title: "Build with AI: Code for Communities — Indore Edition",
        publisher: "Google Developer Groups",
        url: "https://gdg.community.dev/events/details/google-gdg-indore-presents-build-with-ai-code-for-communities-indore-edition/",
        kind: "organizer",
      },
    ],
    open: "No recap was found, and no Walkover speakers or mentors are named.",
  },
  {
    id: "EVT-WALKOVER-0007",
    owners: ["walkover", "viasocket"],
    title: "Build with AI: Code for Communities 2.0, Indore Edition",
    kind: "hackathon",
    organizer: "GDG Indore, GDG Cloud Indore and Machine Learning Indore",
    url: "https://gdg.community.dev/events/details/google-gdg-indore-presents-build-with-ai-code-for-communities-20-indore-edition/",
    start: "2026-09-06",
    format: "in-person",
    place: walkoverOffice,
    roles: ["host", "judge", "workshop-instructor"],
    evidence: "confirmed",
    summary:
      "Walkover was venue partner for this 12-hour community hackathon. Ravi Bharti judged and led a Building with AI Automation session in which participants used viaSocket credits, and Walkover's Dhwanil Bhavsar and Harsh Sahu mentored teams.",
    showcased: ["viaSocket"],
    people: [
      { name: "Ravi Bharti", title: "Director, Walkover", role: "judge and session lead" },
      { name: "Dhwanil Bhavsar", role: "mentor" },
      { name: "Harsh Sahu", title: "AI Engineer", role: "mentor" },
    ],
    sources: [
      {
        title: "Build with AI: Code for Communities 2.0 - Indore Edition",
        publisher: "Google Developer Groups",
        url: "https://gdg.community.dev/events/details/google-gdg-indore-presents-build-with-ai-code-for-communities-20-indore-edition/",
        kind: "organizer",
      },
      {
        title: "Meet Our Judges",
        publisher: "GDG Indore on LinkedIn",
        date: "2026-09-02",
        url: "https://www.linkedin.com/posts/activity-7500811240336678912-pjR_",
        kind: "organizer",
      },
      {
        title: "Meet Our Mentors",
        publisher: "GDG Indore on LinkedIn",
        date: "2026-09-02",
        url: "https://www.linkedin.com/posts/activity-7500856264315498496-6rUn",
        kind: "organizer",
      },
      {
        title: "Building with AI Automation (session recap)",
        publisher: "GDG Indore on LinkedIn",
        date: "2026-09-07",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7502972030737244161",
        kind: "organizer",
      },
    ],
    open: "The winners are not published.",
  },
  {
    id: "EVT-WALKOVER-0008",
    owners: ["walkover", "viasocket"],
    title: "Hacktoberfest Hack Day: Indore × PyData Indore",
    edition: "2026",
    kind: "hackathon",
    organizer: "PyData Indore with Major League Hacking",
    url: "https://indore.pydata.org/hacktoberfest/",
    start: "2026-10-04",
    format: "in-person",
    place: walkoverOffice,
    roles: ["host"],
    evidence: "announced",
    summary:
      "PyData Indore's Hacktoberfest mini hackathon was scheduled at Walkover, its venue partner, with a one-month viaSocket subscription among the participant rewards.",
    sources: [
      {
        title: "Hacktoberfest Hack Day — Indore x PyData Indore",
        publisher: "PyData Indore",
        url: "https://indore.pydata.org/hacktoberfest/",
        kind: "organizer",
      },
      {
        title: "Hacktoberfest Hack Day Indore x PyData Indore",
        publisher: "Major League Hacking",
        url: "https://events.mlh.com/events/14931-hacktoberfest-hack-day-indore-x-pydata-indore",
        kind: "organizer",
      },
    ],
    open: "The date has passed, but no recap or list of winners has been published yet.",
  },
];

/**
 * The one product an event is filed under on the combined page: the first of
 * MSG91, Giddh, viaSocket, Walkover that it involves.
 */
export function primaryOwner(e: EventRecord): EventOwner {
  return eventOwners.find((o) => e.owners.includes(o))!;
}

export function eventsFor(owner?: EventOwner): EventRecord[] {
  return owner ? events.filter((e) => e.owners.includes(owner)) : events;
}

/** "27–28 Feb 2026", "Mar 2026" or "2019", depending on how precise the record is. */
export function formatEventDate(e: EventRecord): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parse = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return { y, m: m ? months[Number(m) - 1] : undefined, d: d ? String(Number(d)) : undefined };
  };
  const s = parse(e.start);
  if (!s.m) return s.y;
  if (!s.d) return `${s.m} ${s.y}`;
  if (!e.end || e.end === e.start) return `${s.d} ${s.m} ${s.y}`;
  const f = parse(e.end);
  if (f.y !== s.y) return `${s.d} ${s.m} ${s.y} – ${f.d} ${f.m} ${f.y}`;
  if (f.m !== s.m) return `${s.d} ${s.m} – ${f.d} ${f.m} ${s.y}`;
  return `${s.d}–${f.d} ${s.m} ${s.y}`;
}

/** Venue, city and country, shortest form that is still unambiguous. */
export function formatPlace(e: EventRecord): string {
  if (e.format === "online") return "Online";
  if (!e.place) return "Location not published";
  const { venue, city, country } = e.place;
  return [venue, city, country === "India" && city ? undefined : country].filter(Boolean).join(", ");
}
