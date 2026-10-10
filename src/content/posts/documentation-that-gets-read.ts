import type { Post } from "../types";

export const post: Post = {
  slug: "documentation-that-gets-read",
  title: "How to build a help centre people actually read",
  description:
    "How to structure a knowledge base that reduces support tickets: organisation, writing for search, page health signals, keeping docs current and API docs.",
  category: "documentation",
  published: "2026-10-01",
  readingMinutes: 5,
  author: "Walkover Editorial",
  products: ["docstar"],
  solutions: ["documentation-and-knowledge", "customer-support"],
  body: [
    {
      type: "p",
      text: "Most help centres are written once, at launch, by whoever had time. A year later half the screenshots show an old interface, the search returns three pages with similar titles, and the support team has stopped linking to it because it is quicker to type the answer again. The documentation exists, but it does not do its job.",
    },
    {
      type: "p",
      text: "A help centre that reduces tickets is less about volume and more about a few habits: a structure readers can predict, pages written for the questions people actually type, signals that show which pages are failing, and a routine that keeps content current. This guide covers each, plus what is different about API documentation.",
    },
    {
      type: "h2",
      text: "Start from the questions, not the features",
      id: "start-from-the-questions",
    },
    {
      type: "p",
      text: "The common mistake is to mirror the product’s menu: one page per screen, in the order the screens appear. Readers do not arrive with a screen in mind. They arrive with a task (“how do I add a team member”) or a problem (“why was my payment declined”).",
    },
    {
      type: "p",
      text: "Your support inbox is the best source of what those questions are. Export a few months of tickets and chat transcripts, group them by the underlying question, and rank the groups by how often they appear. The top of that list is your first set of articles. It also tells you the words customers use, which are often not the words your product team uses.",
    },
    {
      type: "h2",
      text: "A structure readers can predict",
      id: "a-structure-readers-can-predict",
    },
    {
      type: "p",
      text: "Different kinds of content serve different needs, and mixing them on one page makes each harder to use. Keeping a small number of clear article types helps writers and readers alike.",
    },
    {
      type: "table",
      head: ["Article type", "Answers", "Shape"],
      rows: [
        ["Getting started", "What do I do first?", "A short sequence from sign-up to first result"],
        ["How-to", "How do I do this specific task?", "A title starting with a verb, numbered steps, expected result"],
        ["Troubleshooting", "Why is this not working?", "Symptom as the title, likely causes, fix for each"],
        ["Concept", "How does this work, and why?", "Plain explanation, a diagram if useful, links to how-tos"],
        ["Reference", "What are all the options?", "Tables of settings, limits, fields or error codes"],
      ],
    },
    {
      type: "p",
      text: "Group articles into a handful of top-level categories based on what users are trying to achieve, such as account and billing, setting up, using a feature, integrations. Avoid categories with one article and categories with sixty; both are signs the grouping needs another look.",
    },
    {
      type: "h2",
      text: "Writing for search",
      id: "writing-for-search",
    },
    {
      type: "p",
      text: "Most readers find a help article through search, either your help centre’s own search box or a web search engine. Both reward the same things: titles that match the question, a clear answer near the top, and one topic per page.",
    },
    {
      type: "ul",
      items: [
        "Title the page with the question or task in the customer’s words: “Change your billing email”, not “Billing settings overview”.",
        "Answer in the first two sentences. Put context and edge cases after the answer, not before.",
        "Use descriptive headings so readers scanning the page, and search engines, can see what each section covers.",
        "Write a unique meta description that summarises the answer.",
        "Use the terms people search for, and mention common alternatives once. If customers say “invoice” and the product says “bill”, use both.",
        "Keep URLs short and stable. Changing a slug breaks every link that pointed to it unless you redirect it.",
        "Link related articles where a reader is likely to need them next, not in a long list at the bottom.",
      ],
    },
    {
      type: "callout",
      title: "Search your own help centre every week",
      text: "Look at the most common searches that return no results or lead to no click. Each one is either a missing article or an existing article with the wrong title. This is one of the cheapest sources of improvement you have.",
    },
    {
      type: "h2",
      text: "Page health signals",
      id: "page-health-signals",
    },
    {
      type: "p",
      text: "Page views on their own say little. A page with many views might be popular because it is useful, or because people keep landing on it and leaving to raise a ticket. Look at a few signals together.",
    },
    {
      type: "ul",
      items: [
        "Reader feedback: a simple “Was this helpful?” with an optional comment field. The comments are worth more than the score.",
        "Search terms that lead to the page, compared with what the page actually answers.",
        "Tickets raised shortly after a visit to the page, if your support tool can connect the two.",
        "Time since last update, especially for pages describing parts of the product that have changed.",
        "Pages with very high traffic, which deserve the most careful upkeep.",
        "Pages with no traffic at all, which can usually be merged or retired.",
      ],
    },
    {
      type: "h2",
      text: "Keeping documentation current",
      id: "keeping-documentation-current",
    },
    {
      type: "p",
      text: "Out-of-date documentation is worse than none, because readers trust it and follow it into a dead end. Keeping content current is mostly about ownership and routine.",
    },
    {
      type: "ol",
      items: [
        "Give every category an owner who is responsible for its accuracy.",
        "Make “docs updated” part of the definition of done for any product change that affects users.",
        "Review the highest-traffic pages on a fixed schedule, whether or not anything seems wrong.",
        "Turn repeated support answers into articles, and update the article whenever the answer changes.",
        "Prefer short screen recordings or annotated screenshots of a single element over full-screen captures that date quickly.",
        "Retire or redirect pages for features that no longer exist.",
      ],
    },
    {
      type: "h2",
      text: "API documentation is a product of its own",
      id: "api-documentation",
    },
    {
      type: "p",
      text: "Developers reading API docs want to get from zero to a working request as quickly as possible, then come back later for reference. Good API documentation serves both modes.",
    },
    {
      type: "ul",
      items: [
        "A quickstart that goes from obtaining credentials to a successful first call in a few steps.",
        "A page per endpoint with method, path, parameters, request and response examples and possible errors.",
        "Copyable code snippets in the languages your users actually work in.",
        "An interactive console that lets a developer send a real request from the page with their own token.",
        "A clear explanation of authentication, rate limits, pagination and versioning.",
        "A changelog, so integrators can see what changed and when.",
      ],
    },
    {
      type: "p",
      text: "Increasingly, API documentation is read by AI tools as well as people. Precise parameter descriptions and accurate examples help both. Some teams now generate MCP tool definitions directly from their documented APIs, so AI clients can call them without a separate, drifting description.",
    },
    {
      type: "h2",
      text: "The internal knowledge base",
      id: "internal-knowledge-base",
    },
    {
      type: "p",
      text: "Everything above applies to internal documentation as well: the processes, onboarding guides and decisions a team relies on. The difference is that internal questions usually arrive in chat rather than a ticket queue, so they are easy to answer once and lose. A useful habit is to reply to a repeated internal question with a link, writing the page first if it does not exist. Within a few months the knowledge base reflects how the team actually works, and new joiners can find answers without interrupting anyone.",
    },
    {
      type: "h2",
      text: "Making this practical",
      id: "making-this-practical",
    },
    {
      type: "p",
      text: "None of these habits needs a large team. They need tooling that keeps the friction low: quick drafting, one-click publishing, feedback and analytics on each page, and API references that developers can try in place. DocStar is Walkover’s documentation platform designed around that workflow, with AI drafts, page health analytics and reader feedback, SEO controls over slugs and metadata, interactive API docs with a playground and code snippets, and a CLI that can expose documented APIs as MCP tools.",
    },
  ],
  faqs: [
    {
      q: "How does a knowledge base reduce support tickets?",
      a: "When customers can find a clear answer to a common question themselves, they do not need to contact support. That depends on articles matching the questions people actually ask, good search and content kept up to date.",
    },
    {
      q: "What is the difference between a knowledge base and a help centre?",
      a: "The terms are often used interchangeably. A help centre usually means public, customer-facing support content, while a knowledge base can also be internal, holding processes and answers for a team.",
    },
    {
      q: "How often should help articles be updated?",
      a: "Update an article whenever the product behaviour it describes changes, and review the highest-traffic articles on a regular schedule even when nothing appears to be wrong.",
    },
  ],
};
