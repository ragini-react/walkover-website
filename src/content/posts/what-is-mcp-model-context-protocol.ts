import type { Post } from "../types";

export const post: Post = {
  slug: "what-is-mcp-model-context-protocol",
  title: "What is MCP? The Model Context Protocol explained",
  description:
    "The Model Context Protocol explained plainly: clients, servers and tools, why MCP matters for AI agents, and the security questions to ask before using one.",
  category: "ai",
  published: "2026-09-10",
  readingMinutes: 5,
  author: "Walkover Editorial",
  products: ["viasocket", "docstar", "gtwy-ai"],
  solutions: ["ai-agents"],
  body: [
    {
      type: "p",
      text: "A language model on its own can only work with what is in its prompt. To be useful at work, it needs to look things up and take actions: read a ticket, search a document store, create a task, send a message. The Model Context Protocol, usually shortened to MCP, is an open standard for giving AI applications that access in a consistent way.",
    },
    {
      type: "p",
      text: "Anthropic published MCP as an open specification in late 2024, and it has since been adopted by many AI applications and tool providers. This article explains what it is, how the pieces fit together, why it matters and what to think about before you connect one to anything important.",
    },
    {
      type: "h2",
      text: "The problem MCP solves",
      id: "the-problem-mcp-solves",
    },
    {
      type: "p",
      text: "Before a shared protocol, every AI application had its own way of connecting to tools. If you wanted your CRM to be usable from three different AI assistants, you wrote three integrations, each with its own format for describing actions and returning results. If an assistant wanted to support fifty tools, it needed fifty custom connectors.",
    },
    {
      type: "p",
      text: "MCP replaces that with one contract. A tool provider builds an MCP server once, and any AI application that speaks MCP can use it. It is often compared to a universal port: the device and the accessory only need to agree on the connector, not know about each other in advance.",
    },
    {
      type: "h2",
      text: "Hosts, clients and servers",
      id: "hosts-clients-and-servers",
    },
    {
      type: "p",
      text: "MCP describes three roles. The names are less important than understanding who does what.",
    },
    {
      type: "ul",
      items: [
        "Host: the AI application the person uses, such as a chat assistant, a coding tool or an agent platform. It runs the model and decides when to use tools.",
        "Client: the part of the host that holds a connection to one MCP server and speaks the protocol to it. A host can run many clients, one per server.",
        "Server: a program that exposes capabilities from some system, a CRM, a file store, an API, to any MCP client that connects.",
      ],
    },
    {
      type: "p",
      text: "Servers can run locally on the same machine as the host, communicating over standard input and output, or remotely over HTTP. Local servers are common for developer tools that work with files on your computer; remote servers suit hosted services that many users connect to.",
    },
    {
      type: "h2",
      text: "Tools, resources and prompts",
      id: "tools-resources-and-prompts",
    },
    {
      type: "p",
      text: "An MCP server can offer three kinds of things. Tools get most of the attention, but the others are useful too.",
    },
    {
      type: "table",
      head: ["Capability", "What it is", "Example"],
      rows: [
        ["Tools", "Actions the model can call, each with a name, a description and a typed input schema", "create_task, search_orders, send_message"],
        ["Resources", "Data the host can read and add to the model’s context", "A file, a database record, a page of documentation"],
        ["Prompts", "Reusable templates a server suggests for common tasks", "“Summarise this ticket thread for handover”"],
      ],
    },
    {
      type: "p",
      text: "When a host connects to a server, it asks what the server offers. The tool descriptions and schemas are given to the model, which can then decide to call a tool with specific arguments. The host sends the call to the server, the server does the work and returns a result, and the model continues with that result in view.",
    },
    {
      type: "h2",
      text: "Why MCP matters",
      id: "why-mcp-matters",
    },
    {
      type: "ul",
      items: [
        "Build once, use in many places: one server works across every MCP-compatible host.",
        "Swap models and assistants without rebuilding integrations, because the tool layer stays the same.",
        "Clear boundaries: the server decides what is exposed and how, so the system owner keeps control of their own data.",
        "Discoverability: hosts can list a server’s tools at runtime instead of having them hard-coded.",
      ],
    },
    {
      type: "p",
      text: "For businesses, the practical effect is that internal systems and SaaS products can become usable by AI agents without each team writing bespoke glue. For software vendors, offering an MCP server is becoming a way of making a product available to customers’ AI tools.",
    },
    {
      type: "h2",
      text: "Security considerations",
      id: "security-considerations",
    },
    {
      type: "p",
      text: "MCP standardises how a model reaches tools. It does not make those tools safe to reach. Connecting a server gives a model the ability to act with whatever permissions that server holds, so it deserves the same care as granting a new employee access.",
    },
    {
      type: "callout",
      title: "Treat every MCP server as code you are choosing to trust",
      text: "A local server runs on your machine with your permissions. A remote server receives whatever the model sends it. Install servers only from sources you trust, review what tools they expose, and prefer servers maintained by the vendor of the system they connect to.",
    },
    {
      type: "ul",
      items: [
        "Least privilege: give the server credentials scoped to only what its tools need. A read-only token for a reporting tool, not an admin key.",
        "Confirmation for consequential actions: configure the host to ask before tools that send, pay, delete or change permissions.",
        "Prompt injection: content a tool returns, such as an email body or a web page, can contain instructions aimed at the model. Hosts should treat tool output as data, and sensitive actions should still need approval.",
        "Tool descriptions are input too: a malicious or careless server can describe a tool misleadingly. Review descriptions, and watch for servers whose tools change unexpectedly.",
        "Authentication for remote servers: use the authorisation the server supports, typically OAuth, rather than pasting long-lived secrets into configuration files.",
        "Logging: keep a record of which tools were called with which arguments, so actions can be reviewed afterwards.",
      ],
    },
    {
      type: "h2",
      text: "Examples of MCP in practice",
      id: "examples-of-mcp-in-practice",
    },
    {
      type: "p",
      text: "Two examples from Walkover’s products show the two common directions MCP is used in: making many apps available to agents, and turning existing documentation into tools.",
    },
    {
      type: "h3",
      text: "An MCP marketplace for connected apps",
    },
    {
      type: "p",
      text: "viaSocket offers an MCP marketplace and a white-label MCP server, so AI agents can use apps connected through viaSocket as tools. Rather than running a separate server for each app, an AI client connects once and gets access to the apps a user has authorised. 50 Agents, Walkover’s meeting and task assistant, is itself listed there, so compatible AI clients can call it as a tool.",
    },
    {
      type: "h3",
      text: "Documented APIs as MCP tools",
    },
    {
      type: "p",
      text: "If an API is already well documented, much of what an MCP server needs, the endpoints, parameters and descriptions, already exists. The DocStar CLI can expose documented APIs as MCP tools for AI clients through its docstar-editor mcp command. That keeps the documentation and the tool definitions from drifting apart, because they come from the same source.",
    },
    {
      type: "p",
      text: "On the other side of the connection, platforms that run agents, such as GTWY AI for software companies embedding agents in their own products, are where tools like these get called in production.",
    },
    {
      type: "h2",
      text: "Getting started",
      id: "getting-started",
    },
    {
      type: "ol",
      items: [
        "Pick one task where an assistant would save time if it could reach a specific system.",
        "Find an existing MCP server for that system, ideally from its vendor, or build a small one exposing two or three tools.",
        "Start with read-only tools and check how the model uses them.",
        "Add write actions one at a time, with confirmation turned on.",
        "Review logs regularly before widening access to more people or more tools.",
      ],
    },
  ],
  faqs: [
    {
      q: "What does MCP stand for in AI?",
      a: "MCP stands for Model Context Protocol, an open standard that lets AI applications connect to external tools and data sources through a common interface.",
    },
    {
      q: "What is an MCP server?",
      a: "An MCP server is a program that exposes tools, data or prompts from a system, such as an app or API, so that any MCP-compatible AI application can use them.",
    },
    {
      q: "Is MCP secure?",
      a: "MCP defines how AI applications talk to tools; security depends on how servers are built and configured. Use trusted servers, scope credentials narrowly, require confirmation for consequential actions and log tool calls.",
    },
    {
      q: "Is MCP the same as an API?",
      a: "No. An MCP server usually sits in front of one or more APIs and describes their actions in a standard format that AI models can discover and call. The underlying API still does the work.",
    },
  ],
};
