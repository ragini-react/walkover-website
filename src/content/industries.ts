import type { Industry } from "./types";

/**
 * Industries are included only where a Walkover product explicitly serves them
 * (see `basis`). Workflows describe how the products fit together, not
 * specific customer deployments.
 */
export const industries: Industry[] = [
  {
    slug: "saas",
    name: "SaaS & software",
    headline: "Add messaging, automation, agents and docs without building them.",
    summary:
      "Software companies use Walkover products as building blocks: communication APIs inside their product, embedded automation and AI agents for their customers, and documentation their users can find.",
    challenges: [
      {
        title: "Every feature competes with the core roadmap",
        body: "Notifications, integrations and AI are expected, but each one is a project that pulls engineers away from the product itself.",
      },
      {
        title: "Customers want AI they can shape",
        body: "Shipping agents your customers configure means tenancy, retrieval, model routing and usage billing.",
      },
      {
        title: "Integrations are never finished",
        body: "Each new customer asks for a connection to another app.",
      },
    ],
    solutions: ["ai-agents", "workflow-automation", "documentation-and-knowledge", "user-verification"],
    products: [
      { slug: "gtwy-ai", role: "White-label agents embedded in your product" },
      { slug: "viasocket", role: "Embedded automation and MCP for your platform" },
      { slug: "msg91", role: "OTP and notifications from your backend" },
      { slug: "docstar", role: "API documentation and help centre" },
    ],
    workflows: [
      {
        title: "AI features for your customers",
        steps: [
          "Embed GTWY's agent builder in your app",
          "Customers clone templates and connect their knowledge",
          "Agents call your APIs and connected apps",
          "Usage API feeds your billing",
        ],
      },
      {
        title: "Integrations without the backlog",
        steps: [
          "Embed viaSocket in your product",
          "Customers connect the apps they already use",
          "Workflows run and are logged per customer",
        ],
      },
    ],
    basis: "viaSocket and GTWY are built for SaaS embedding; MSG91 Hello lists SaaS among its industries.",
    seo: {
      title: "Embedded AI, Automation & Messaging for SaaS Companies",
      description:
        "How SaaS teams use Walkover's MSG91, viaSocket, DocStar and GTWY to ship notifications, integrations, docs and AI agents without building them in-house.",
    },
  },
  {
    slug: "ecommerce-retail",
    name: "E-commerce & retail",
    headline: "From checkout to delivery to the next order.",
    summary:
      "Online sellers use Walkover products to confirm orders on WhatsApp and SMS, support customers across channels, automate store operations and keep accounts and stock in sync.",
    challenges: [
      {
        title: "Order updates that get missed",
        body: "Customers expect confirmation, shipping and delivery updates on the channel they read.",
      },
      {
        title: "Support across too many inboxes",
        body: "Questions arrive on WhatsApp, Instagram, email and chat at once.",
      },
      {
        title: "Stock and books out of sync",
        body: "Store orders, inventory and accounting drift apart between reconciliations.",
      },
    ],
    solutions: ["customer-communication", "customer-support", "accounting-and-compliance", "workflow-automation"],
    products: [
      { slug: "msg91", role: "Order updates, OTP and the Hello inbox" },
      { slug: "giddh", role: "Shopify-connected accounting and inventory" },
      { slug: "viasocket", role: "Automates store operations across apps" },
    ],
    workflows: [
      {
        title: "Order lifecycle",
        steps: [
          "Order placed: WhatsApp confirmation via MSG91",
          "Order syncs into Giddh with inventory updated",
          "Shipping update sent on the customer's channel",
          "Questions land in the Hello inbox",
        ],
      },
    ],
    basis: "MSG91 Hello lists e-commerce and retail; Giddh integrates with Shopify and lists e-commerce.",
    seo: {
      title: "E-commerce Messaging, Support & Accounting Software",
      description:
        "Order updates on WhatsApp and SMS, multichannel support, Shopify-connected accounting and store automation with Walkover's MSG91, Giddh and viaSocket.",
    },
  },
  {
    slug: "financial-services",
    name: "Financial services",
    headline: "Verification and communication you can rely on at scale.",
    summary:
      "Lenders, payment companies and fintechs use OTP verification, transactional alerts and audited automation where reliability and security are not optional.",
    challenges: [
      {
        title: "Verification is the front door",
        body: "A slow or failed OTP during onboarding or a payment is a lost customer.",
      },
      {
        title: "Alerts must arrive",
        body: "Transaction and security alerts need dependable delivery and fallbacks.",
      },
      {
        title: "Security reviews come first",
        body: "Vendors are expected to show audits and certifications before integration.",
      },
    ],
    solutions: ["user-verification", "customer-communication", "workflow-automation", "customer-support"],
    products: [
      { slug: "msg91", role: "OTP, transactional alerts and support" },
      { slug: "viasocket", role: "Audited back-office automation with approvals" },
    ],
    workflows: [
      {
        title: "Secure onboarding",
        steps: [
          "Customer verifies their phone with an MSG91 OTP",
          "A viaSocket workflow creates records across systems",
          "High-value steps wait for human approval",
          "Every step is logged for audit",
        ],
      },
    ],
    basis: "MSG91 Hello lists finance among its industries; MSG91 and viaSocket publish SOC 2 Type II reports.",
    seo: {
      title: "OTP, Alerts & Automation for Fintech and Financial Services",
      description:
        "Reliable OTP verification, transactional alerts and audited workflow automation for fintechs and financial services, with SOC 2 Type II-audited platforms.",
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Reminders that arrive, and answers that are easy to reach.",
    summary:
      "Clinics, diagnostics providers and health platforms use multichannel messaging and a unified contact center for appointment reminders, reports and patient questions.",
    challenges: [
      {
        title: "Missed appointments",
        body: "Reminders sent on a channel patients do not check are not reminders.",
      },
      {
        title: "Patients call when they could chat",
        body: "Phone lines overflow with questions that a message could answer.",
      },
    ],
    solutions: ["customer-communication", "customer-support", "user-verification"],
    products: [
      { slug: "msg91", role: "Reminders, voice, IVR and the Hello inbox" },
      { slug: "docstar", role: "Patient-facing help articles" },
    ],
    workflows: [
      {
        title: "Appointment journey",
        steps: [
          "Booking confirmed on WhatsApp or SMS",
          "Reminder the day before, with a voice call fallback",
          "Questions handled in Hello by bot or staff",
        ],
      },
    ],
    basis: "MSG91 Hello lists healthcare among its industries.",
    seo: {
      title: "Patient Messaging & Contact Center Software for Healthcare",
      description:
        "Appointment reminders over WhatsApp, SMS and voice, plus a unified contact center for patient questions, with MSG91 by Walkover.",
    },
  },
  {
    slug: "education",
    name: "Education",
    headline: "Keep learners, parents and staff in the loop.",
    summary:
      "Schools, edtech platforms and training providers use messaging, verification, support and knowledge bases to communicate at scale.",
    challenges: [
      {
        title: "Announcements at scale",
        body: "Exam schedules, results and fee reminders need to reach thousands of people quickly.",
      },
      {
        title: "Repeated questions",
        body: "Admissions and support teams answer the same questions every term.",
      },
    ],
    solutions: ["customer-communication", "customer-support", "documentation-and-knowledge"],
    products: [
      { slug: "msg91", role: "Announcements, OTP and support inbox" },
      { slug: "docstar", role: "Knowledge base for learners and staff" },
      { slug: "giddh", role: "Free accounting for students, teachers and institutes" },
    ],
    workflows: [
      {
        title: "Term communication",
        steps: [
          "Publish FAQs in a DocStar knowledge base",
          "Send announcements over SMS, WhatsApp and email",
          "Route replies into the Hello inbox",
        ],
      },
    ],
    basis: "MSG91 Hello lists education; Giddh is free for students, teachers and institutes.",
    seo: {
      title: "Messaging, Support & Knowledge Base Software for Education",
      description:
        "Announcements over SMS, WhatsApp and email, a shared support inbox and student-facing knowledge bases for schools and edtech platforms.",
    },
  },
  {
    slug: "manufacturing-trading",
    name: "Manufacturing & trading",
    headline: "Stock, invoices and GST in the same place.",
    summary:
      "Manufacturers, distributors and traders use cloud accounting with inventory and GST built in, and keep buyers updated without extra tools.",
    challenges: [
      {
        title: "Inventory that does not match the books",
        body: "Stock is counted in one system and sold in another.",
      },
      {
        title: "Compliance pressure",
        body: "GST filing depends on clean, complete invoice data.",
      },
      {
        title: "Several entities to manage",
        body: "Groups often run multiple companies with separate books.",
      },
    ],
    solutions: ["accounting-and-compliance", "customer-communication"],
    products: [
      { slug: "giddh", role: "Inventory, invoicing, GST and multi-company books" },
      { slug: "msg91", role: "Invoice and dispatch notifications" },
    ],
    workflows: [
      {
        title: "Order to filing",
        steps: [
          "Convert a proforma invoice in Giddh",
          "Stock updates with barcode scanning",
          "Buyer notified on WhatsApp",
          "Payment reconciles; GST report updates",
        ],
      },
    ],
    basis: "Giddh lists manufacturing and trading among the industries it serves.",
    seo: {
      title: "Accounting, Inventory & GST Software for Manufacturers & Traders",
      description:
        "Inventory, invoicing, GST filing and multi-company books in one cloud ledger for manufacturers, distributors and traders, with Giddh.",
    },
  },
];
