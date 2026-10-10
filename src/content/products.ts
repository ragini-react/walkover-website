import type { Product } from "./types";

/**
 * Product catalogue.
 * Facts here are taken from each product's own website (checked October 2026).
 * Figures in `claims` are the products' own published numbers and are always
 * rendered with `claimsSource` beside them.
 * `brand.color` is sampled from each product's own logo or primary UI and is
 * used as-is everywhere: never tinted, lightened or substituted.
 */
export const products: Product[] = [
  {
    slug: "msg91",
    name: "MSG91",
    family: "communicate",
    brand: { color: "#1E75BA" },
    category: "Cloud communication platform",
    tagline: "One set of APIs for every message your customers receive.",
    summary:
      "MSG91 gives businesses secure APIs for SMS, WhatsApp, RCS, email, voice and OTP authentication, plus Hello, an AI-assisted contact center for answering customers across channels.",
    url: "https://msg91.com",
    problem: {
      heading: "Customers live on five channels. Most stacks are wired to one.",
      body: "An OTP goes out by SMS, an order update by WhatsApp, a receipt by email and a support reply from a separate helpdesk. Each vendor adds an integration, a dashboard and a bill. MSG91 puts sending, verifying and conversing behind one account and one consistent API, so a team can change channels without rebuilding.",
    },
    audience: [
      "Product and engineering teams sending transactional messages",
      "Growth teams running campaigns and event-based journeys",
      "Support teams answering customers on WhatsApp, chat, email and voice",
      "Businesses from early-stage startups to large enterprises",
    ],
    capabilities: [
      {
        title: "Every channel, one API",
        body: "SMS, WhatsApp, RCS, email, voice, push notifications and virtual numbers, reachable through One API or channel-specific endpoints.",
      },
      {
        title: "Authentication built in",
        body: "An OTP platform and OTP widget with MagicLink, so verification is a configuration choice rather than a project.",
      },
      {
        title: "Hello contact center",
        body: "A shared inbox for WhatsApp, email, Instagram, Facebook and website chat, with IVR, call recording, ticket routing and AI reply suggestions.",
      },
      {
        title: "Campaigns and segments",
        body: "Campaign automates event-based journeys; Segmento keeps the contact data those journeys depend on.",
      },
      {
        title: "Bots, rule-based or agentic",
        body: "A no-code chatbot builder with human handoff, available as a rule-based MSG91 Bot or an agentic AI bot.",
      },
      {
        title: "Utilities that remove glue code",
        body: "URL shortener, knowledge base, file hosting, reporting, and free WhatsApp and Apple link generators.",
      },
    ],
    modules: [
      {
        group: "Applications",
        items: [
          "Hello",
          "One API",
          "Campaign",
          "Segmento",
          "OTP",
          "OTP MagicLink",
        ],
      },
      {
        group: "Channels",
        items: [
          "SMS",
          "WhatsApp",
          "RCS",
          "Email",
          "Voice",
          "Numbers",
          "Push notifications",
          "WhatsApp chatbot",
        ],
      },
      {
        group: "Utilities",
        items: [
          "URL shortener",
          "Knowledge base",
          "File hosting",
          "Reports",
          "Link generators",
        ],
      },
    ],
    useCases: [
      {
        title: "Sign-up and login verification",
        body: "Send OTPs over SMS, WhatsApp, email or voice and fall back between them when one fails to deliver.",
      },
      {
        title: "Transactional notifications",
        body: "Order confirmations, delivery updates, payment receipts and alerts triggered from your backend.",
      },
      {
        title: "Conversational support",
        body: "Answer customers where they already are, with a bot handling routine questions and agents taking over when needed.",
      },
      {
        title: "Lifecycle campaigns",
        body: "Event-driven journeys such as abandoned-cart reminders or renewal nudges across the channels a customer responds to.",
      },
    ],
    technical: [
      "REST APIs with public documentation at docs.msg91.com",
      "MSG91 APIs can be exposed to AI clients as MCP tools through the DocStar CLI",
      "Mobile apps for Hello on iOS and Android",
      "Regional sites and pricing for India and the US",
    ],
    trust: [
      "SOC 2 Type 2 report",
      "ISO certification",
      "VAPT and system audit reports",
      "CASA and TAC Security assessments",
      "Published GDPR policy",
    ],
    claims: [
      { value: "30,000+", label: "businesses" },
      { value: "2.5B+", label: "API calls a month" },
      { value: "1B+", label: "OTPs a month" },
    ],
    claimsSource: "As published on msg91.com",
    pricingNote:
      "Priced per channel with volume-based rates, a free Hello plan, and custom pricing for enterprise volumes.",
    demo: "channels",
    connections: [
      {
        to: "viasocket",
        how: "viaSocket workflows can send through MSG91 as one step among thousands.",
      },
      { to: "gtwy-ai", how: "GTWY runs AI agents in production inside MSG91." },
      {
        to: "docstar",
        how: "The DocStar CLI exposes MSG91 APIs as MCP tools for AI clients.",
      },
    ],
    solutions: [
      "customer-communication",
      "user-verification",
      "customer-support",
    ],
    industries: [
      "ecommerce-retail",
      "financial-services",
      "healthcare",
      "education",
      "saas",
    ],
    faqs: [
      {
        q: "What is MSG91?",
        a: "MSG91 is a cloud communication platform built by Walkover. It provides APIs for SMS, WhatsApp, RCS, email, voice and OTP, and Hello, a multichannel contact center.",
      },
      {
        q: "Can MSG91 send OTPs over channels other than SMS?",
        a: "Yes. The OTP platform supports SMS, WhatsApp, email and voice, and MagicLink for passwordless verification.",
      },
      {
        q: "Where can developers find the API reference?",
        a: "The full reference is published at docs.msg91.com.",
      },
    ],
    seo: {
      title: "MSG91 — SMS, WhatsApp, Email, Voice & OTP APIs",
      description:
        "MSG91 by Walkover: one cloud communication platform for SMS, WhatsApp, RCS, email, voice and OTP APIs, plus Hello, an AI-assisted contact center.",
    },
  },
  {
    slug: "viasocket",
    name: "viaSocket",
    family: "automate",
    brand: { color: "#A8200D" },
    category: "AI workflow automation",
    tagline:
      "Describe the work. viaSocket plans it, connects the apps and runs it.",
    summary:
      "viaSocket is an AI automation platform that mixes AI steps with predictable rule-based steps, connects thousands of apps, and logs every step of every run.",
    url: "https://viasocket.com",
    problem: {
      heading: "Automation breaks where judgment begins.",
      body: "Rule-based automation handles the predictable parts of a process and stalls on anything that needs reading, deciding or summarising. Pure AI agents handle judgment but are hard to trust with the predictable parts. viaSocket combines both in one workflow: AI where a decision is needed, plain rules everywhere else, and human approval wherever the stakes call for it.",
    },
    audience: [
      "Business and operations teams automating cross-app work",
      "Developers who want APIs, webhooks and custom code in the same flow",
      "Automation agencies building for clients",
      "SaaS companies embedding or white-labelling automation",
      "AI agent builders who need tools through MCP",
    ],
    capabilities: [
      {
        title: "Plain-language workflows",
        body: "Describe a job and viaSocket proposes the steps, the apps and the data mapping. You review and adjust before it runs.",
      },
      {
        title: "Hybrid AI",
        body: "AI steps for research, drafting and classification sit beside deterministic steps, so the predictable parts stay predictable.",
      },
      {
        title: "Human approval",
        body: "Set thresholds that pause a run for a person to approve before anything consequential happens.",
      },
      {
        title: "Built to be audited",
        body: "Every step of every run is logged, with retries, so a failure is visible and recoverable rather than silent.",
      },
      {
        title: "Developer escape hatches",
        body: "Call any REST API, trigger from webhooks, and drop into custom JavaScript when a step needs code.",
      },
      {
        title: "MCP for agents",
        body: "An MCP marketplace and white-label MCP server let AI agents use connected apps as tools.",
      },
    ],
    useCases: [
      {
        title: "Lead routing",
        body: "Enrich a new lead with AI, score it with rules, and route it to the right owner in your CRM and chat tool.",
      },
      {
        title: "Research and briefs",
        body: "Collect inputs from several sources and produce a structured brief on a schedule.",
      },
      {
        title: "Back-office sync",
        body: "Keep billing, CRM, support and spreadsheets consistent without manual copy-paste.",
      },
      {
        title: "Embedded automation",
        body: "Offer automation inside your own SaaS product through viaSocket's embed and white-label options.",
      },
    ],
    technical: [
      "Triggers: run once, on an event, on a schedule or from a webhook",
      "Call any REST API and run custom JavaScript steps",
      "MCP marketplace and white-label MCP server",
      "Embed for SaaS products and AI agent builders",
    ],
    trust: [
      "SOC 2 Type II (independent audit)",
      "ISO 27001:2022",
      "GDPR and CCPA compliant",
      "Encryption in transit and at rest",
      "Customer data is not used to train AI models",
    ],
    claims: [
      { value: "2,300+", label: "apps supported" },
      { value: "10,000+", label: "teams" },
    ],
    claimsSource: "As published on viasocket.com",
    pricingNote:
      "A free plan with monthly task and AI-credit allowances and no card required; paid plans add capacity.",
    demo: "flow",
    connections: [
      {
        to: "gtwy-ai",
        how: "GTWY powers AI agents running in production inside viaSocket.",
      },
      {
        to: "docstar",
        how: "viaSocket's team documents its product with DocStar.",
      },
      {
        to: "msg91",
        how: "A viaSocket workflow can notify customers through MSG91.",
      },
      {
        to: "50-agents",
        how: "50 Agents is available to AI clients through viaSocket MCP.",
      },
      {
        to: "things-of-brand",
        how: "Things of Brand works with viaSocket workflows.",
      },
    ],
    solutions: ["workflow-automation", "ai-agents"],
    industries: ["saas", "ecommerce-retail", "financial-services"],
    faqs: [
      {
        q: "What is viaSocket?",
        a: "viaSocket is an AI workflow automation platform by Walkover. It connects thousands of apps and combines AI steps with rule-based steps and human approvals.",
      },
      {
        q: "Does viaSocket support custom code?",
        a: "Yes. Workflows can call any REST API, start from webhooks and run custom JavaScript steps.",
      },
      {
        q: "Is there a free plan?",
        a: "Yes. viaSocket offers a free plan with monthly task and AI-credit allowances and no card required.",
      },
    ],
    seo: {
      title: "viaSocket — AI Workflow Automation for 2,300+ Apps",
      description:
        "viaSocket by Walkover: AI workflow automation that mixes AI and rule-based steps, connects thousands of apps, adds human approvals and logs every run.",
    },
  },
  {
    slug: "giddh",
    name: "Giddh",
    family: "operate",
    brand: { color: "#1B1F6D" },
    category: "Cloud accounting software",
    tagline: "Accounting, GST, invoicing and inventory in one ledger.",
    summary:
      "Giddh is cloud accounting software for growing businesses: invoicing, automated GST filing, inventory, real-time bank reconciliation and multi-currency books in one place.",
    url: "https://giddh.com",
    problem: {
      heading: "The books are always a week behind the business.",
      body: "Invoices are raised in one tool, stock is counted in another, the bank statement arrives as a file and GST returns are assembled at the deadline. Giddh keeps those in the same ledger, so the numbers a founder looks at are the numbers the accountant files.",
    },
    audience: [
      "Small and mid-sized businesses",
      "Accountants and finance teams managing several companies",
      "Traders, manufacturers and e-commerce sellers",
      "Businesses operating in India, the UAE and the UK",
    ],
    capabilities: [
      {
        title: "GST, handled",
        body: "Automated GST filing and GST reports for Indian businesses, with VAT support for the UK and UAE.",
      },
      {
        title: "Invoicing that follows through",
        body: "Estimates and proforma invoices convert to invoices, payment status is tracked, and customers are notified by WhatsApp or email.",
      },
      {
        title: "Inventory in the same ledger",
        body: "Stock groups, variants and barcode scanning, so sales and stock never disagree.",
      },
      {
        title: "Real-time bank reconciliation",
        body: "Bank transactions are matched automatically instead of reconciled at month end.",
      },
      {
        title: "Multi-company, multi-currency",
        body: "Run many companies under one subscription with automatic conversion to local currency.",
      },
      {
        title: "Access that scales with the team",
        body: "Unlimited users with role-based permissions, an audit trail and IP-based access restriction.",
      },
    ],
    useCases: [
      {
        title: "Month-end without the scramble",
        body: "Reconciled bank accounts and ready GST reports mean closing the month is a review, not a project.",
      },
      {
        title: "Online store accounting",
        body: "Bring Shopify orders into the books automatically.",
      },
      {
        title: "Practice management",
        body: "Accountants manage many client companies from a single login.",
      },
      {
        title: "Moving off desktop accounting",
        body: "Sync with Tally while moving the team to cloud books with mobile access.",
      },
    ],
    technical: [
      "Integrations with Shopify and Tally",
      "Open API",
      "Encrypted storage on AWS with automatic backups",
      "iOS and Android apps",
    ],
    pricingNote:
      "Annual subscription per organisation with a free trial; free for students, teachers and institutes.",
    demo: "ledger",
    connections: [
      { to: "docstar", how: "Giddh's team documents with DocStar." },
      { to: "msg91", how: "Giddh works with MSG91." },
    ],
    solutions: ["accounting-and-compliance"],
    industries: ["manufacturing-trading", "ecommerce-retail"],
    faqs: [
      {
        q: "What is Giddh?",
        a: "Giddh is cloud accounting software from the Walkover group, covering invoicing, GST, inventory, bank reconciliation and multi-currency accounting.",
      },
      {
        q: "Does Giddh file GST returns?",
        a: "Giddh offers automated GST filing and GST reports for businesses in India.",
      },
      {
        q: "Can Giddh connect to Shopify or Tally?",
        a: "Yes. Giddh integrates with Shopify and can sync with Tally, and provides an open API.",
      },
    ],
    seo: {
      title: "Giddh — Cloud Accounting, GST & Invoicing Software",
      description:
        "Giddh from the Walkover group: cloud accounting with automated GST filing, invoicing, inventory, real-time bank reconciliation and multi-company support.",
    },
  },
  {
    slug: "gtwy-ai",
    name: "GTWY AI",
    family: "intelligence",
    brand: { color: "#14181F" },
    category: "Managed AI agent platform",
    tagline:
      "Ship AI agents inside your product. Your brand, your UI. GTWY runs the infrastructure.",
    summary:
      "GTWY is a managed platform for AI agents, real-time RAG and chatbots that software companies embed in their own products, with per-customer isolation and model routing handled for them.",
    url: "https://gtwy.ai",
    problem: {
      heading: "Every SaaS roadmap now has an AI line item.",
      body: "Letting your customers build their own agents means solving tenancy, memory, knowledge retrieval, model choice, fallbacks and usage billing before shipping a single feature. GTWY handles that layer, so a product team can offer agents under its own brand and spend its time on the parts only it can build.",
    },
    audience: [
      "SaaS platforms adding AI agents for their customers",
      "Product teams that want white-label agent features",
      "Engineering teams that need RAG and chat without running model infrastructure",
    ],
    capabilities: [
      {
        title: "Agent Embed",
        body: "Drop an agent builder into your product so your users create their own agents, inside your UI.",
      },
      {
        title: "Per-customer isolation",
        body: "Each of your customers gets isolated agents, knowledge and scoped tokens.",
      },
      {
        title: "White-label by default",
        body: "Your logo, colours and domain. Your customers see your product, not GTWY.",
      },
      {
        title: "Model routing with fallbacks",
        body: "Choose models per agent and route between major hosted providers when one is unavailable.",
      },
      {
        title: "Real-time RAG",
        body: "Connect knowledge sources to agents, exportable per customer.",
      },
      {
        title: "Usage you can bill for",
        body: "A per-customer usage API so you can price agent features however your business needs.",
      },
    ],
    useCases: [
      {
        title: "Customer-built agents",
        body: "Let users of your platform design agents for their own workflows from templates they can clone.",
      },
      {
        title: "In-product assistants",
        body: "Add a chat assistant grounded in your product's documentation and each customer's data.",
      },
      {
        title: "AI features without an AI team",
        body: "Use the API and Chat UI to ship agent features while GTWY runs routing, memory and retrieval.",
      },
    ],
    technical: [
      "Agent Embed, API and Chat UI",
      "Scoped tokens and per-customer data isolation",
      "Fallback routing between major model providers",
      "Per-customer usage API; DPA and subprocessor list published",
    ],
    claims: [
      { value: "400+", label: "business customers building agents" },
      { value: "4 lakh", label: "agent runs a month" },
    ],
    claimsSource: "As published on gtwy.ai",
    pricingNote:
      "Usage-based per run with model costs passed through at cost; volume pricing and dedicated infrastructure for enterprise.",
    demo: "embed",
    connections: [
      { to: "docstar", how: "GTWY and DocStar work together." },
      {
        to: "viasocket",
        how: "GTWY runs AI agents in production inside viaSocket.",
      },
      { to: "msg91", how: "GTWY runs AI agents in production inside MSG91." },
      { to: "50-agents", how: "50 Agents works with GTWY." },
    ],
    solutions: ["ai-agents", "customer-support"],
    industries: ["saas"],
    faqs: [
      {
        q: "What is GTWY AI?",
        a: "GTWY is a managed AI platform from Walkover for embedding agents, real-time RAG and chatbots into software products, with per-customer isolation and white-labelling.",
      },
      {
        q: "Which model providers does GTWY support?",
        a: "GTWY lets you choose models per agent and routes between major hosted providers with fallbacks.",
      },
      {
        q: "How is GTWY priced?",
        a: "Usage-based, per run, with model costs passed through at cost. Enterprise plans add volume pricing and dedicated infrastructure.",
      },
    ],
    seo: {
      title: "GTWY AI — Embed AI Agents, RAG & Chatbots in Your Product",
      description:
        "GTWY AI by Walkover is a managed platform for embedding white-label AI agents, real-time RAG and chatbots in your SaaS, with per-customer isolation.",
    },
  },
  {
    slug: "50-agents",
    name: "50 Agents",
    family: "intelligence",
    brand: { color: "#5B21B5" },
    category: "AI agents for everyday work",
    tagline:
      "Type what you need. An agent does it inside the apps you already use.",
    summary:
      "50 Agents is an AI assistant and notetaker: it joins meetings, summarises them, surfaces insights and carries out tasks across connected apps from a natural-language request.",
    url: "https://50agents.com",
    problem: {
      heading: "The meeting ends. The work it created hasn't started.",
      body: "Decisions made on a call turn into notes nobody re-reads and tasks somebody forgets to file. 50 Agents records and summarises the meeting, then acts on what was agreed, creating the work items and updates in the tools your team already uses.",
    },
    audience: [
      "Teams that run on meetings and follow-ups",
      "Managers who need decisions turned into tracked work",
      "Anyone who wants to delegate routine app tasks in plain language",
    ],
    capabilities: [
      {
        title: "Meeting notetaker",
        body: "A meeting bot joins, records and captures the key points of a call.",
      },
      {
        title: "Summaries and insights",
        body: "Turn a long conversation into decisions, owners and next steps.",
      },
      {
        title: "Tasks from a sentence",
        body: "Ask for an outcome in natural language and the agent performs it inside connected apps, such as creating a work item.",
      },
      {
        title: "No code required",
        body: "Agents are set up by describing them, not by building them.",
      },
    ],
    useCases: [
      {
        title: "From call to tracker",
        body: "Action items from a meeting become work items in your project tool.",
      },
      {
        title: "Shared memory for the team",
        body: "Searchable summaries mean people who missed the meeting still know what was decided.",
      },
    ],
    technical: ["Available to AI clients as an MCP server through viaSocket"],
    pricingNote: "See 50agents.com for current plans.",
    demo: "agents",
    connections: [
      { to: "docstar", how: "50 Agents works with DocStar." },
      { to: "gtwy-ai", how: "50 Agents works with GTWY." },
      {
        to: "viasocket",
        how: "50 Agents is listed in viaSocket's MCP marketplace.",
      },
    ],
    solutions: ["ai-agents"],
    industries: ["saas"],
    faqs: [
      {
        q: "What is 50 Agents?",
        a: "50 Agents is an AI assistant and notetaker from Walkover. It summarises meetings, produces insights and automates tasks across apps from natural-language requests.",
      },
      {
        q: "Can 50 Agents be used from other AI tools?",
        a: "Yes. 50 Agents is available as an MCP server through viaSocket, so compatible AI clients can call it as a tool.",
      },
    ],
    seo: {
      title: "50 Agents — AI Meeting Notetaker & Task Agents",
      description:
        "50 Agents by Walkover joins meetings, summarises them and turns natural-language requests into tasks done inside the apps your team already uses.",
    },
  },
  {
    slug: "docstar",
    name: "DocStar",
    family: "operate",
    brand: { color: "#0F0F0F" },
    category: "AI documentation platform",
    tagline:
      "Internal knowledge bases and public docs, written with AI and published in seconds.",
    summary:
      "DocStar is an AI-powered documentation platform for knowledge bases, help centres, blogs and interactive API docs, with analytics, SEO controls and an MCP-ready CLI.",
    url: "https://docstar.io",
    problem: {
      heading: "Documentation is where knowledge goes to be forgotten.",
      body: "Docs are slow to write, slower to update and hard to find, so teams answer the same question in chat a hundred times. DocStar makes writing fast with AI drafts, makes publishing a click, and shows which pages are failing readers, so documentation becomes part of how a team works instead of a chore after it.",
    },
    audience: [
      "Support and customer success teams building help centres",
      "Developer teams publishing API documentation",
      "Founders and internal teams keeping a shared knowledge base",
    ],
    capabilities: [
      {
        title: "AI drafting",
        body: "Start from a generated draft and edit, instead of starting from a blank page.",
      },
      {
        title: "Interactive API docs",
        body: "An API playground, code snippets and token management for developer documentation.",
      },
      {
        title: "Page health analytics",
        body: "Activity, page health and reader feedback show which docs need attention.",
      },
      {
        title: "Blogs and public docs",
        body: "Publish on a custom domain or subpath, in multiple languages, with control over slugs, metadata and clean HTML.",
      },
      {
        title: "Import what you have",
        body: "Bring in Markdown and existing documentation instead of rewriting it.",
      },
      {
        title: "Docs as tools for AI",
        body: "The DocStar CLI can expose documented APIs as MCP tools for AI clients.",
      },
    ],
    useCases: [
      {
        title: "Help centre",
        body: "Public answers that reduce repeat tickets, with feedback on what readers could not find.",
      },
      {
        title: "Developer portal",
        body: "Interactive API references developers can try without leaving the page.",
      },
      {
        title: "Team handbook",
        body: "An internal knowledge base for processes, onboarding and decisions.",
      },
    ],
    technical: [
      "Webhooks",
      "Markdown import",
      "Custom domains and subpaths",
      "CLI with MCP output (docstar-editor mcp)",
    ],
    pricingNote: "Free to start; see docstar.io for current plans.",
    demo: "docs",
    connections: [
      { to: "msg91", how: "The DocStar CLI exposes MSG91 APIs as MCP tools." },
      { to: "viasocket", how: "viaSocket's team documents with DocStar." },
      { to: "gtwy-ai", how: "DocStar and GTWY work together." },
      { to: "50-agents", how: "DocStar works with 50 Agents." },
      { to: "giddh", how: "Giddh's team documents with DocStar." },
    ],
    solutions: ["documentation-and-knowledge", "customer-support"],
    industries: ["saas", "education"],
    faqs: [
      {
        q: "What is DocStar?",
        a: "DocStar is an AI-powered documentation platform by Walkover for knowledge bases, help centres, blogs and interactive API documentation.",
      },
      {
        q: "Can DocStar host API documentation?",
        a: "Yes. DocStar includes an interactive API playground, code snippets and token management.",
      },
      {
        q: "Can I import existing docs?",
        a: "Yes. DocStar imports Markdown and existing documentation.",
      },
    ],
    seo: {
      title: "DocStar — AI Documentation, Knowledge Base & API Docs",
      description:
        "DocStar by Walkover: an AI documentation platform for internal knowledge bases, help centres, blogs and interactive API docs, with page analytics.",
    },
  },
  {
    slug: "things-of-brand",
    name: "Things of Brand",
    family: "communicate",
    brand: { color: "#5928E5" },
    category: "Brand asset management",
    tagline: "One verified home for a brand's logos, colours and guidelines.",
    summary:
      "Things of Brand is a platform for brands to manage and share authentic assets, such as logos, colour palettes and guidelines, with designers and developers, through collections and an API.",
    url: "https://thingsofbrand.com",
    problem: {
      heading: "Somebody is using the wrong logo right now.",
      body: "Brand files scatter across drives, chats and old decks, and partners grab whatever version search returns. Things of Brand keeps a single, verified source of a brand's assets and makes it easy to share, whether a designer needs a file or a developer needs it over an API.",
    },
    audience: [
      "Brand and marketing teams",
      "Designers who need the right assets quickly",
      "Developers who fetch brand assets programmatically",
    ],
    capabilities: [
      {
        title: "Collections",
        body: "Group logos, colour palettes and other assets into collections you can share.",
      },
      {
        title: "Assets over an API",
        body: "Fetch a brand's assets programmatically instead of downloading and re-uploading files.",
      },
      {
        title: "Verified brands",
        body: "Brands can verify their page, so others know the assets are authentic.",
      },
      {
        title: "Guidelines, shared",
        body: "Publish brand guidelines alongside the assets they describe.",
      },
      {
        title: "Access control",
        body: "Encryption and access controls decide who sees what.",
      },
    ],
    useCases: [
      {
        title: "Partner and press kits",
        body: "Give agencies, partners and journalists one link to the current assets.",
      },
      {
        title: "Logos inside products",
        body: "Display correct, current brand logos in an app by fetching them through the API.",
      },
    ],
    pricingNote: "A 14-day free trial, then a subscription.",
    demo: "brandkit",
    connections: [
      {
        to: "viasocket",
        how: "Things of Brand works with viaSocket workflows.",
      },
    ],
    solutions: ["brand-asset-management"],
    industries: ["saas", "ecommerce-retail"],
    faqs: [
      {
        q: "What is Things of Brand?",
        a: "Things of Brand is a Walkover platform for managing and sharing authentic brand assets, such as logos and colour palettes, through collections and an API.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes, Things of Brand offers a 14-day free trial.",
      },
    ],
    seo: {
      title: "Things of Brand — Brand Asset Management & Logo API",
      description:
        "Things of Brand by Walkover keeps a brand's logos, colour palettes and guidelines in one verified place, shared through collections and an API.",
    },
  },
  {
    slug: "embarko",
    name: "Embarko",
    family: "build",
    brand: { color: "#171A1E" },
    category: "Hosting for apps built with AI",
    tagline: "Instant hosting for every app you build with AI.",
    summary:
      "Embarko is a cloud hosting platform for apps built and operated by AI agents. Send it an app's source and it builds the app, runs it and serves it at a live HTTPS URL.",
    url: "https://embarko.ai",
    problem: {
      heading: "The app works in the chat. Getting it online is the hard part.",
      body: "AI tools can write a working app in one session, but putting it on the internet still means servers, build settings and certificates. Embarko lets the agent that wrote the app deploy it too: copy a prompt into your agent, and it comes back with a live link.",
    },
    audience: [
      "People building apps with Claude, Codex, Cursor, Lovable or Replit who never want to learn servers",
      "Teams that want one home for everything they build with AI",
      "Builders shipping portfolios, internal tools, dashboards, MVPs and small SaaS products",
    ],
    capabilities: [
      {
        title: "Deploy from source",
        body: "Send the source and Embarko builds and runs it. The runtime is detected automatically, with no Dockerfile to write.",
      },
      {
        title: "A live link straight away",
        body: "Every app is served over HTTPS at its own embarko.app address, and you can add a custom domain.",
      },
      {
        title: "Built for agents",
        body: "A REST API, an agent skill and an MCP connector for Claude let an AI agent deploy and read machine-readable error codes on its own.",
      },
      {
        title: "Data that persists",
        body: "Each app gets a persistent data directory, so SQLite-backed apps keep their data between deploys.",
      },
      {
        title: "History and rollback",
        body: "Every deployment is kept, and you can roll back to an earlier one without rebuilding.",
      },
      {
        title: "Isolated by default",
        body: "Each app runs in its own isolated environment, with environment variables, status, build logs and runtime logs.",
      },
    ],
    useCases: [
      {
        title: "Ship what you just built",
        body: "Turn an app made in an AI session into a portfolio, college project or website with a live link.",
      },
      {
        title: "Internal tools",
        body: "Host an internal CRM, dashboard or customer portal without setting up servers.",
      },
      {
        title: "MVPs and small SaaS",
        body: "Put a first version in front of users, then roll back or redeploy as it changes.",
      },
      {
        title: "Small services",
        body: "Run forms and waitlists, chat front ends, webhook receivers and browser games.",
      },
    ],
    technical: [
      "Works with Claude Code, Cursor, Bolt, Lovable, Replit, v0, GPT and Codex",
      "REST API, an agent skill (embarko-ai/skill) and an MCP connector for Claude",
      "Runtime detected automatically; persistent data directory with SQLite support",
      "Up to 256 MB of memory per app",
      "Anonymous first deploys, removed after 24 hours unless claimed",
    ],
    trust: [
      "Apps run on infrastructure certified to ISO/IEC 27001 (the provider's certification)",
      "Per-app isolation; HTTPS everywhere; encryption in transit and at rest",
      "Hashed, revocable tokens and passwordless one-time-code sign-in",
    ],
    pricingNote:
      "Free for unlimited static sites and one dynamic app. Paid Creator and Team plans add more apps, custom domains and team access.",
    demo: "deploy",
    connections: [
      {
        to: "msg91",
        how: "Embarko's one-time sign-in codes are delivered through MSG91.",
      },
    ],
    solutions: [],
    industries: [],
    faqs: [
      {
        q: "What is Embarko?",
        a: "Embarko is a cloud hosting platform from Walkover for apps built with AI. You send it an app's source, and it builds the app, runs it and serves it at a live HTTPS URL.",
      },
      {
        q: "Do I need an account to deploy?",
        a: "Not for the first deploy. Anonymous apps stay live for 24 hours unless you claim them with a token sent by email.",
      },
      {
        q: "Is Embarko a website builder?",
        a: "No. Embarko hosts and runs apps you have already built, often with an AI tool. It is not an app builder and not only a static file host.",
      },
      {
        q: "Is Embarko available now?",
        a: "Yes. Embarko is in beta, with a free plan and paid Creator and Team plans.",
      },
    ],
    seo: {
      title: "Embarko — Instant Hosting for Apps Built with AI",
      description:
        "Embarko by Walkover builds, runs and serves the apps you make with AI tools at a live HTTPS URL. Deploy from source, with no servers to manage.",
    },
  },
];
