import type { Post } from "../types";

export const post: Post = {
  slug: "ai-agents-vs-workflows",
  title: "AI agents vs workflows: when to use which",
  description:
    "When should you use an AI agent, a deterministic workflow or a hybrid of both? A plain guide with a decision table, failure modes and design patterns.",
  category: "ai",
  published: "2026-09-01",
  readingMinutes: 5,
  author: "Walkover Editorial",
  products: ["viasocket", "gtwy-ai", "50-agents"],
  solutions: ["ai-agents", "workflow-automation"],
  body: [
    {
      type: "p",
      text: "Teams adding AI to their operations quickly run into a design question: should this be an agent that decides what to do, or a workflow that does the same steps every time? The words get used loosely, so it is worth being precise. A workflow follows a path someone defined in advance. An agent is given a goal and a set of tools, and chooses its own steps to reach the goal.",
    },
    {
      type: "p",
      text: "Both are useful. Choosing the wrong one produces either a brittle workflow that cannot cope with variety or an unpredictable agent doing work that should have been a few lines of logic. Most real systems end up as a mix of the two.",
    },
    {
      type: "h2",
      text: "What a deterministic workflow gives you",
      id: "deterministic-workflows",
    },
    {
      type: "p",
      text: "A deterministic workflow is a defined sequence of steps with explicit conditions. Given the same input, it produces the same result. That makes it easy to test, easy to explain to an auditor and cheap to run, because no model is choosing what to do at each step.",
    },
    {
      type: "ul",
      items: [
        "Predictable: you can say in advance exactly what will happen for a given input.",
        "Testable: a small set of test cases covers the paths.",
        "Auditable: the log shows which branch was taken and why.",
        "Inexpensive: most steps are simple API calls.",
      ],
    },
    {
      type: "p",
      text: "Its weakness is variety. Every case has to be anticipated. When inputs arrive as free text, in different formats or with unclear intent, the workflow either needs an ever-growing set of rules or drops cases into a manual queue.",
    },
    {
      type: "h2",
      text: "What an agent gives you",
      id: "what-an-agent-gives-you",
    },
    {
      type: "p",
      text: "An agent uses a language model to plan and act. It reads the goal, decides which tool to call, looks at the result and decides what to do next. That lets it handle requests nobody wrote a rule for: “find the last three invoices this customer disputed and draft a reply summarising them”, or “turn the decisions from this meeting into tasks for the right people”.",
    },
    {
      type: "p",
      text: "The cost is predictability. The same request can take different paths on different runs. An agent can call the wrong tool, misread a result or stop early while reporting success. It is also usually slower and more expensive per task than a workflow, because a model is involved in every decision.",
    },
    {
      type: "p",
      text: "Testing is different too. You cannot enumerate every path an agent might take, so you evaluate it on a representative set of real tasks and check the outcomes: was the right record updated, was the summary accurate, did it stop when it should have. Keep that set of tasks and rerun it whenever you change the prompt, the tools or the model, because a change that improves one kind of task can quietly make another worse.",
    },
    {
      type: "h2",
      text: "A decision table",
      id: "decision-table",
    },
    {
      type: "p",
      text: "Use the characteristics of the task, not the novelty of the technology, to decide.",
    },
    {
      type: "table",
      head: ["If the task…", "Prefer", "Why"],
      rows: [
        ["Has the same steps every time", "Workflow", "No decision needs a model; rules are cheaper and testable"],
        ["Moves money, changes permissions or deletes data", "Workflow, with approval", "Mistakes are costly and must be explainable"],
        ["Starts from free text but then follows fixed steps", "Hybrid", "AI classifies or extracts; rules do the rest"],
        ["Needs research across several sources", "Agent", "The path depends on what each source returns"],
        ["Is a one-off request phrased in natural language", "Agent", "Writing a workflow for it would take longer than the task"],
        ["Runs at high volume with tight cost limits", "Workflow or hybrid", "Model calls on every step add up"],
        ["Needs a human-readable audit trail for compliance", "Workflow or hybrid", "Fixed steps are easier to evidence"],
      ],
    },
    {
      type: "h2",
      text: "Hybrid designs that work",
      id: "hybrid-designs",
    },
    {
      type: "p",
      text: "In practice the most dependable systems put AI at specific decision points inside an otherwise deterministic flow, or give an agent a narrow set of tools that are themselves reliable workflows.",
    },
    {
      type: "h3",
      text: "AI step inside a workflow",
    },
    {
      type: "p",
      text: "The workflow is fixed; one or two steps use a model. An incoming support email is classified into one of a fixed set of categories, a few fields are extracted, and from there rules route it, create the ticket and notify the right team. If the model’s answer is not one of the allowed categories, the run goes to a person.",
    },
    {
      type: "h3",
      text: "Agent calling workflows as tools",
    },
    {
      type: "p",
      text: "The agent handles the open-ended part, understanding the request and deciding what to do, but every action it can take is a well-tested workflow: create a work item, look up an order, send a templated message. The agent chooses; the workflows execute. This limits the damage a wrong choice can do, because each tool only does one known thing.",
    },
    {
      type: "h3",
      text: "Agent with a human checkpoint",
    },
    {
      type: "p",
      text: "The agent prepares the work, such as a draft reply, a set of proposed tasks or a summary, and a person approves before anything is sent or saved. Over time, categories of work that are consistently approved without edits can move to running unattended.",
    },
    {
      type: "callout",
      title: "Start narrow",
      text: "Give an agent the fewest tools it needs and the narrowest permissions those tools allow. A read-only agent that drafts is far safer to launch than one that can send, update and delete. Widen its reach only after you have watched it work.",
    },
    {
      type: "h2",
      text: "Failure modes to plan for",
      id: "failure-modes",
    },
    {
      type: "ul",
      items: [
        "Silent partial success: the agent completes three of four steps and reports done. Check outcomes, not just the agent’s own summary.",
        "Tool misuse: the agent calls a tool with the wrong record or wrong parameters. Validate inputs inside the tool, not only in the prompt.",
        "Prompt injection: text the agent reads, such as an email or a web page, contains instructions. Treat retrieved content as data and keep consequential actions behind approval.",
        "Cost drift: an agent loops or retries more than expected. Set limits on steps and spend per task.",
        "Model outages: a provider is unavailable. Plan a fallback model or a manual route.",
      ],
    },
    {
      type: "h2",
      text: "How to decide for your own process",
      id: "how-to-decide",
    },
    {
      type: "ol",
      items: [
        "Write the process out as steps. Mark each step as fixed or as needing judgment.",
        "If no step needs judgment, build a workflow and stop there.",
        "If one or two steps need judgment, add AI steps to a workflow with structured outputs and a fallback route.",
        "If the path itself changes from case to case, consider an agent, with tools that are reliable workflows.",
        "Wherever an action is costly or customer-facing, add human approval until the system has a track record.",
        "Log every run, including the agent’s tool calls, so you can review what happened.",
      ],
    },
    {
      type: "h2",
      text: "Where Walkover’s products sit",
      id: "where-walkover-products-sit",
    },
    {
      type: "p",
      text: "These patterns map onto different tools. viaSocket is designed for the hybrid case: AI steps for research, drafting and classification beside deterministic steps, human approval thresholds, and a log of every step, plus an MCP marketplace so agents can use connected apps as tools. GTWY AI is for software companies that want to offer agents inside their own product, with per-customer isolation and model routing between providers handled for them. 50 Agents is an agent for everyday work: it summarises meetings and carries out tasks in connected apps from a natural-language request.",
    },
  ],
  faqs: [
    {
      q: "What is the difference between an AI agent and a workflow?",
      a: "A workflow follows steps defined in advance and behaves the same way for the same input. An AI agent is given a goal and tools, and uses a language model to decide which steps to take, so its path can vary between runs.",
    },
    {
      q: "Are AI agents replacing workflow automation?",
      a: "No. Agents are useful where the path is unpredictable, but predictable, high-volume or sensitive tasks are still better handled by deterministic workflows. Many systems combine both.",
    },
    {
      q: "What is a hybrid AI workflow?",
      a: "A hybrid workflow is a mostly rule-based process with AI used at specific steps, such as classifying a request or extracting fields, while the rest of the steps stay fixed and testable.",
    },
  ],
};
