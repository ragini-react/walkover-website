import type { Solution } from "./types";

/** Problem-first entry points: a visitor can arrive here without knowing a product name. */
export const solutions: Solution[] = [
  {
    slug: "customer-communication",
    name: "Customer communication",
    need: "reach customers on the channel they actually read",
    headline: "Every notification, on the channel that gets read.",
    summary:
      "Send transactional and marketing messages over SMS, WhatsApp, RCS, email, voice and push from one platform, and trigger them from your product or your workflows.",
    challenges: [
      "A separate vendor, dashboard and integration for each channel",
      "No fallback when a message is not delivered on the first channel",
      "Campaign tools that cannot see the events happening in your product",
      "Contact data scattered across the tools that send messages",
    ],
    approach: [
      {
        title: "One platform for every channel",
        body: "MSG91 provides SMS, WhatsApp, RCS, email, voice, numbers and push behind one account and consistent APIs.",
      },
      {
        title: "Event-driven journeys",
        body: "MSG91 Campaign sends messages in response to what customers do, using contacts managed in Segmento.",
      },
      {
        title: "Messages as a workflow step",
        body: "viaSocket can send a message as one step in a larger automation, for example after a payment or a form submission.",
      },
    ],
    products: [
      { slug: "msg91", role: "Sends across every channel and runs campaigns" },
      { slug: "viasocket", role: "Triggers messages from events in other apps" },
    ],
    workflow: [
      "An event happens in your product",
      "Your backend calls MSG91, or a viaSocket workflow fires",
      "The message goes out on the customer's preferred channel",
      "Delivery and engagement appear in reports",
    ],
    industries: ["ecommerce-retail", "financial-services", "healthcare", "education"],
    faqs: [
      {
        q: "Can one platform send SMS, WhatsApp and email?",
        a: "Yes. MSG91 offers SMS, WhatsApp, RCS, email, voice and push notifications from one account, through One API or channel-specific APIs.",
      },
      {
        q: "What is the difference between transactional and promotional messages?",
        a: "Transactional messages are triggered by something the customer did, such as an order or a login, and are expected. Promotional messages are marketing. Many countries regulate them differently, so they are usually sent on separate routes or templates.",
      },
    ],
    seo: {
      title: "Omnichannel Customer Communication — SMS, WhatsApp, Email APIs",
      description:
        "Send transactional and marketing messages over SMS, WhatsApp, RCS, email and voice from one platform, triggered by your product or workflows.",
    },
  },
  {
    slug: "user-verification",
    name: "User verification & OTP",
    need: "verify users at sign-up and login",
    headline: "Verification that does not lose the user at the last step.",
    summary:
      "Verify phone numbers and email addresses with OTPs over SMS, WhatsApp, email or voice, or passwordless MagicLinks, without building the delivery and retry logic yourself.",
    challenges: [
      "OTPs that arrive late, or not at all, during sign-up",
      "Building retry, expiry and channel fallback logic from scratch",
      "Fraud and abuse on verification endpoints",
      "A login step that adds friction for returning users",
    ],
    approach: [
      {
        title: "OTP on several channels",
        body: "MSG91's OTP platform sends codes by SMS, WhatsApp, email or voice, so a user is not stuck when one channel fails.",
      },
      {
        title: "A widget instead of a project",
        body: "The MSG91 OTP widget handles the sending and verifying UI, so teams configure verification rather than build it.",
      },
      {
        title: "Passwordless with MagicLink",
        body: "OTP MagicLink lets users verify with a single tap where that suits the product better than typing a code.",
      },
    ],
    products: [{ slug: "msg91", role: "OTP platform, widget and MagicLink" }],
    workflow: [
      "User enters a phone number or email",
      "MSG91 sends a code on the chosen channel",
      "The user enters the code or taps a MagicLink",
      "Your backend receives a verified result",
    ],
    industries: ["financial-services", "ecommerce-retail", "healthcare", "education", "saas"],
    faqs: [
      {
        q: "Is WhatsApp OTP better than SMS OTP?",
        a: "Neither is better everywhere. WhatsApp works well where users already have it open and SMS reaches every mobile number. Offering both, with fallback, usually gives the best completion rate.",
      },
      {
        q: "What is a MagicLink?",
        a: "A MagicLink is a one-time link that verifies the user when tapped, replacing the need to type a code.",
      },
    ],
    seo: {
      title: "OTP Verification API — SMS, WhatsApp, Email & Voice OTP",
      description:
        "Verify users at sign-up and login with OTPs over SMS, WhatsApp, email or voice, plus passwordless MagicLink, using MSG91's OTP platform and widget.",
    },
  },
  {
    slug: "workflow-automation",
    name: "Workflow automation",
    need: "stop copying data between apps by hand",
    headline: "Automate the process, including the parts that need thinking.",
    summary:
      "Connect the apps your team uses and automate the work between them, with AI steps for judgment, rule-based steps for everything predictable and human approval where it matters.",
    challenges: [
      "Hours each week spent moving data between tools",
      "Automations that fail silently and are discovered weeks later",
      "Processes that need a judgment call, which simple automation cannot make",
      "Integrations that need a developer every time something changes",
    ],
    approach: [
      {
        title: "Describe it, then refine it",
        body: "viaSocket turns a plain-language description into a draft workflow you can inspect and change.",
      },
      {
        title: "AI where it helps, rules where they are safer",
        body: "Mix AI steps for reading and deciding with deterministic steps for everything else.",
      },
      {
        title: "Observable by design",
        body: "Every step of every run is logged with retries, so failures are visible and recoverable.",
      },
    ],
    products: [
      { slug: "viasocket", role: "Builds and runs the workflows" },
      { slug: "msg91", role: "Notifies customers and teams from inside a flow" },
    ],
    workflow: [
      "A trigger fires: an event, a schedule or a webhook",
      "AI steps read, classify or draft",
      "Rule-based steps update apps and records",
      "A person approves anything above a threshold",
    ],
    industries: ["saas", "ecommerce-retail", "financial-services"],
    faqs: [
      {
        q: "What is workflow automation?",
        a: "Workflow automation uses software to carry out the repeatable steps of a process, such as moving data between apps, sending notifications or creating records, without someone doing them by hand.",
      },
      {
        q: "Do I need to code to automate workflows?",
        a: "No. viaSocket workflows can be built without code. Developers can add REST API calls, webhooks and custom JavaScript where they need them.",
      },
    ],
    seo: {
      title: "AI Workflow Automation — Connect Apps & Automate Processes",
      description:
        "Automate work between thousands of apps with AI steps, rule-based steps, human approvals and full run logs using viaSocket.",
    },
  },
  {
    slug: "ai-agents",
    name: "AI agents",
    need: "put AI agents to work in my product or my team",
    headline: "Agents that do real work, inside real systems.",
    summary:
      "Embed white-label AI agents in your own product, give your team agents that act across apps, and expose your tools to AI clients through MCP.",
    challenges: [
      "AI features that need tenancy, memory, retrieval and billing before they ship",
      "Agents that can talk but cannot act in the tools that matter",
      "Single-provider dependency when a model is slow or unavailable",
      "Knowing which actions an agent should take on its own and which need approval",
    ],
    approach: [
      {
        title: "Agents inside your product",
        body: "GTWY gives SaaS teams an embeddable agent builder with per-customer isolation, real-time RAG and model fallbacks.",
      },
      {
        title: "Agents for your team",
        body: "50 Agents turns meetings and plain-language requests into completed tasks across connected apps.",
      },
      {
        title: "Tools through MCP",
        body: "viaSocket's MCP marketplace and DocStar's CLI let AI clients use connected apps and documented APIs as tools.",
      },
    ],
    products: [
      { slug: "gtwy-ai", role: "Embeds agents in your product" },
      { slug: "50-agents", role: "Agents for meetings and everyday tasks" },
      { slug: "viasocket", role: "Gives agents tools through MCP and workflows" },
      { slug: "docstar", role: "Turns documented APIs into MCP tools" },
    ],
    workflow: [
      "A user asks an agent for an outcome",
      "The agent retrieves context from connected knowledge",
      "It calls tools: apps, APIs or workflows",
      "Results and usage are logged per customer",
    ],
    industries: ["saas"],
    faqs: [
      {
        q: "What is the difference between an AI agent and a chatbot?",
        a: "A chatbot answers questions. An agent can also take actions, such as creating a record or calling an API, using tools it has been given.",
      },
      {
        q: "What is MCP?",
        a: "The Model Context Protocol is an open standard that lets AI clients discover and call external tools in a consistent way.",
      },
    ],
    seo: {
      title: "AI Agents for SaaS & Teams — Embedded Agents, RAG & MCP",
      description:
        "Expose tools through MCP, embed white-label AI agents in your product and deploy task agents for your team with Walkover's viaSocket, GTWY and 50 Agents.",
    },
  },
  {
    slug: "customer-support",
    name: "Customer support",
    need: "answer customers faster on every channel",
    headline: "One inbox, every channel, with AI doing the first draft.",
    summary:
      "Bring WhatsApp, email, Instagram, Facebook, website chat and calls into one contact center, let bots handle routine questions, and publish answers customers can find themselves.",
    challenges: [
      "Conversations split across WhatsApp, email, social and phone",
      "Agents re-typing the same answers",
      "Bots that trap customers instead of handing over to a person",
      "A help centre nobody updates",
    ],
    approach: [
      {
        title: "A real multichannel inbox",
        body: "MSG91 Hello unifies messaging channels, IVR and call recording, with routing, escalation and analytics.",
      },
      {
        title: "AI that assists, then steps aside",
        body: "AI reply suggestions and no-code bots handle routine questions and hand off to a human when needed.",
      },
      {
        title: "Self-service that stays current",
        body: "DocStar help centres show which articles are failing readers, so answers improve over time.",
      },
    ],
    products: [
      { slug: "msg91", role: "Hello contact center, bots and voice" },
      { slug: "docstar", role: "Help centre and knowledge base" },
      { slug: "gtwy-ai", role: "Grounded AI assistants for SaaS products" },
    ],
    workflow: [
      "A customer writes in on any channel",
      "A bot answers routine questions from the knowledge base",
      "Complex cases route to the right agent with AI-suggested replies",
      "Resolved answers feed back into the help centre",
    ],
    industries: ["ecommerce-retail", "healthcare", "education", "saas", "financial-services"],
    faqs: [
      {
        q: "What is an omnichannel contact center?",
        a: "It is a support system that brings conversations from every channel, such as messaging apps, email, chat and calls, into one place with shared history.",
      },
    ],
    seo: {
      title: "Omnichannel Customer Support — Contact Center & Chatbots",
      description:
        "Unify WhatsApp, email, social, chat and calls in one contact center with AI replies and bots, plus a help centre that stays current.",
    },
  },
  {
    slug: "accounting-and-compliance",
    name: "Accounting & GST compliance",
    need: "keep books and GST filings up to date",
    headline: "Books that keep up with the business.",
    summary:
      "Keep invoicing, inventory, bank reconciliation and GST filing in one cloud ledger, so finance reflects what is happening now rather than last month.",
    challenges: [
      "Invoices, stock and bank data living in different tools",
      "Reconciliation left until month end",
      "GST returns assembled under deadline pressure",
      "Managing several companies with separate logins and subscriptions",
    ],
    approach: [
      {
        title: "One ledger",
        body: "Giddh keeps invoicing, inventory and accounting together, so stock and sales agree.",
      },
      {
        title: "Continuous reconciliation",
        body: "Automated real-time bank reconciliation replaces the month-end matching exercise.",
      },
      {
        title: "Compliance built in",
        body: "Automated GST filing and reports in India, with VAT support for the UK and UAE.",
      },
    ],
    products: [
      { slug: "giddh", role: "Accounting, GST, invoicing and inventory" },
      { slug: "msg91", role: "Invoice and payment notifications" },
    ],
    workflow: [
      "Raise an estimate, convert it to an invoice",
      "Customer is notified on WhatsApp or email",
      "Payment lands and reconciles automatically",
      "GST reports are ready for filing",
    ],
    industries: ["manufacturing-trading", "ecommerce-retail"],
    faqs: [
      {
        q: "What is bank reconciliation?",
        a: "Bank reconciliation is matching the transactions in your accounting records against your bank statement so both agree. Automated reconciliation does this continuously as transactions arrive.",
      },
    ],
    seo: {
      title: "Cloud Accounting & GST Filing Software for Growing Businesses",
      description:
        "Invoicing, inventory, real-time bank reconciliation and automated GST filing in one cloud ledger with Giddh.",
    },
  },
  {
    slug: "documentation-and-knowledge",
    name: "Documentation & knowledge",
    need: "publish docs people can actually find",
    headline: "Write it once. Make it findable. Keep it true.",
    summary:
      "Create internal knowledge bases, public help centres, blogs and interactive API documentation with AI drafting, page analytics and SEO control.",
    challenges: [
      "Docs that take too long to write, so they are never written",
      "Outdated pages nobody knows are outdated",
      "API references developers cannot try",
      "Knowledge trapped in chat threads",
    ],
    approach: [
      {
        title: "Drafts in seconds",
        body: "DocStar generates a first draft so writers edit rather than start from nothing.",
      },
      {
        title: "Docs that report back",
        body: "Page health, activity and feedback show what needs fixing.",
      },
      {
        title: "Built for developers and search",
        body: "Interactive API playgrounds, custom domains, clean HTML and metadata control.",
      },
    ],
    products: [{ slug: "docstar", role: "Knowledge bases, help centres and API docs" }],
    workflow: [
      "Import existing Markdown or start from an AI draft",
      "Review and publish to a custom domain",
      "Readers search, try APIs and leave feedback",
      "Page health highlights what to update",
    ],
    industries: ["saas", "education"],
    faqs: [
      {
        q: "What is the difference between a knowledge base and documentation?",
        a: "A knowledge base usually answers how-to and troubleshooting questions for users or staff. Documentation is the broader term and also covers reference material such as API docs.",
      },
    ],
    seo: {
      title: "AI Documentation — Knowledge Base, Help Centre & API Docs",
      description:
        "Build internal knowledge bases, help centres and interactive API docs with AI drafting, page analytics and SEO controls using DocStar.",
    },
  },
  {
    slug: "image-creation-and-hosting",
    name: "Image creation and hosting",
    need: "create images and use them anywhere by URL",
    headline: "Make an image once. Use it everywhere by its link.",
    summary:
      "Create new images or upload the ones you have, and use each one through its own URL in websites, apps, emails and documents.",
    challenges: [
      "Images made in one tool and saved on someone's laptop",
      "The same file sent over chat and uploaded again to every place that needs it",
      "Emails and pages carrying attachments instead of a link to the image",
    ],
    approach: [
      {
        title: "Create",
        body: "Make new images directly in Things of Brand.",
      },
      {
        title: "Upload",
        body: "Bring in the images you already have and keep them in one place.",
      },
      {
        title: "Use by URL",
        body: "Every image has its own URL, so you link to it wherever it is needed instead of sending the file.",
      },
    ],
    products: [{ slug: "things-of-brand", role: "Creates, uploads and serves images by URL" }],
    workflow: [
      "Create a new image or upload an existing one",
      "Copy the image's URL",
      "Use the URL in a page, an app, an email or a document",
    ],
    industries: ["saas", "ecommerce-retail"],
    faqs: [
      {
        q: "What does it mean to use an image by URL?",
        a: "Instead of attaching or re-uploading an image file, you put the image's web address wherever it is needed, such as a web page, an app screen or an email, and the image loads from there.",
      },
    ],
    seo: {
      title: "Image Creation & Hosting — Create, Upload and Use Images by URL",
      description:
        "Create images, upload your own and use every image anywhere through its URL with Things of Brand by Walkover.",
    },
  },
];
