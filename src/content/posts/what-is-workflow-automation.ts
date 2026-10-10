import type { Post } from "../types";

export const post: Post = {
  slug: "what-is-workflow-automation",
  title: "What is workflow automation? A practical guide",
  description:
    "Workflow automation explained: triggers and actions, where AI steps belong, human approvals, run logs, and a checklist for choosing your first automations.",
  category: "automation",
  published: "2026-08-18",
  readingMinutes: 5,
  author: "Walkover Editorial",
  products: ["viasocket"],
  solutions: ["workflow-automation"],
  body: [
    {
      type: "p",
      text: "Workflow automation is software doing the steps a person would otherwise do by hand between applications: copying a new lead from a form into the CRM, telling the sales channel about it, creating an invoice when a deal closes, filing a support ticket when a customer emails a particular address. Each step is simple. The value comes from never having to remember to do them.",
    },
    {
      type: "p",
      text: "This guide explains how automations are put together, where AI fits and where it does not, why approvals and logs matter more than most people expect, and how to choose the first few processes worth automating.",
    },
    {
      type: "h2",
      text: "Triggers, actions and the data between them",
      id: "triggers-actions-and-data",
    },
    {
      type: "p",
      text: "Almost every automation tool uses the same basic model. A workflow starts with a trigger and then runs one or more actions in order, passing data from each step to the next.",
    },
    {
      type: "ul",
      items: [
        "Trigger: the event that starts a run. A new row in a spreadsheet, a form submission, an incoming webhook, a time of day, or a person pressing a button.",
        "Actions: the things the workflow does. Create a record, send a message, update a field, call an API, write a file.",
        "Data mapping: telling each action which values to use from earlier steps, such as using the email from the form as the contact’s email in the CRM.",
        "Conditions and branches: rules that decide which path a run takes, such as only notifying the sales lead if the deal value is above a threshold.",
      ],
    },
    {
      type: "p",
      text: "Most problems in automation come from data mapping, not from triggers or actions. A field that is sometimes empty, a date in the wrong format, or a name that includes a comma will break a step that worked perfectly in testing. Good workflows check and clean data early, before it is passed to anything that matters.",
    },
    {
      type: "h2",
      text: "Rule-based steps and AI steps",
      id: "rule-based-and-ai-steps",
    },
    {
      type: "p",
      text: "Traditional automation is entirely rule-based. Given the same input, it does the same thing every time. That predictability is exactly what you want for moving money, updating records and sending notifications. It also means a rule-based workflow stalls the moment a step needs judgment: reading an email to work out what the customer wants, summarising a document, deciding which team a request belongs to.",
    },
    {
      type: "p",
      text: "AI steps fill that gap. A language model can classify, extract, summarise and draft. The trade-off is that its output can vary and can be wrong in ways a rule would never be. The practical answer is to use each where it is strong.",
    },
    {
      type: "table",
      head: ["Use a rule-based step for", "Use an AI step for"],
      rows: [
        ["Moving data between systems", "Reading free text and extracting fields"],
        ["Calculations, thresholds and routing on known values", "Classifying requests by intent or topic"],
        ["Sending notifications and creating records", "Summarising long threads or documents"],
        ["Anything involving payments or permissions", "Drafting a reply or brief for a person to review"],
      ],
    },
    {
      type: "p",
      text: "A useful pattern is to let the AI step produce structured output, such as a category from a fixed list or a set of named fields, and then let ordinary rules act on that output. If the model returns something outside the allowed list, the workflow can route the run to a person instead of guessing.",
    },
    {
      type: "h2",
      text: "Human approval belongs in the workflow",
      id: "human-approval",
    },
    {
      type: "p",
      text: "Not every step should run unattended. Refunds above a certain amount, emails to a whole customer list, changes to a supplier’s bank details and anything produced by an AI step that goes straight to a customer are all good candidates for a pause where a person approves or rejects before the workflow continues.",
    },
    {
      type: "p",
      text: "Approvals work best when they are specific. Rather than approving every run, set a threshold or condition that decides when a run needs a person, and give the approver the context they need in the request itself: what triggered the run, what the workflow is about to do, and what happens if they reject it.",
    },
    {
      type: "callout",
      title: "A rule of thumb",
      text: "If a mistake in this step would be expensive, embarrassing or hard to undo, put a person in front of it until the workflow has earned trust. You can always remove an approval later; you cannot unsend an email.",
    },
    {
      type: "h2",
      text: "Observability: knowing what your automations did",
      id: "observability",
    },
    {
      type: "p",
      text: "The worst automation failure is a silent one. A workflow that stopped running three weeks ago, or that has been skipping one step for every tenth record, can do more damage than having no automation at all, because everyone assumes the work is being done.",
    },
    {
      type: "ul",
      items: [
        "Keep a log of every run with the input, the output of each step and any error.",
        "Retry steps that fail for temporary reasons, such as a timeout, and stop on errors that will not fix themselves.",
        "Send failure alerts to a place someone actually watches, with a link to the failed run.",
        "Review run volumes occasionally. A sudden drop to zero often means a trigger has disconnected.",
        "Name workflows and steps clearly, so someone other than the author can understand a failure.",
      ],
    },
    {
      type: "h2",
      text: "A checklist for your first automations",
      id: "first-automations-checklist",
    },
    {
      type: "p",
      text: "The best first automations are boring. They are frequent, well understood, low-risk and currently done by copy and paste. Use this checklist before you build anything.",
    },
    {
      type: "ol",
      items: [
        "Write the process down as it happens today, step by step, including the exceptions people handle without thinking.",
        "Confirm it happens often enough to be worth automating, and that the steps are mostly the same each time.",
        "Identify the trigger precisely. “When a deal is marked won in the CRM” is a trigger; “when we close a deal” is not.",
        "List every app involved and check you have the access and permissions each step needs.",
        "Mark which steps need judgment. Decide whether those become AI steps, approval steps, or stay manual for now.",
        "Decide what should happen when a step fails, and who will be told.",
        "Test with real but harmless data, including the awkward cases: empty fields, duplicates, unusual characters.",
        "Run it alongside the manual process for a short period and compare results before switching the manual process off.",
        "Assign an owner who will look at the logs and fix the workflow when an app changes.",
      ],
    },
    {
      type: "h2",
      text: "Where to go from here",
      id: "where-to-go-from-here",
    },
    {
      type: "p",
      text: "Once a few simple workflows are running reliably, the next step is usually connecting them: the lead workflow feeds the onboarding workflow, which feeds billing. At that point consistency across tools matters more than any single automation, and the habits above, clear triggers, clean data, approvals where stakes are high and logs for every run, are what keep a growing set of automations manageable.",
    },
    {
      type: "p",
      text: "viaSocket is built around this model. You can describe a job in plain language and review the proposed steps before it runs, mix AI steps for research, drafting and classification with deterministic steps, set thresholds that pause a run for human approval, and see a log of every step of every run, with retries. Workflows can also call any REST API, start from webhooks and run custom JavaScript when a step needs code.",
    },
  ],
  faqs: [
    {
      q: "What is the difference between workflow automation and RPA?",
      a: "Workflow automation usually connects applications through their APIs and events. Robotic process automation (RPA) typically mimics a person clicking through screens. API-based automation tends to be more reliable when the apps involved offer APIs.",
    },
    {
      q: "What is a trigger in workflow automation?",
      a: "A trigger is the event that starts a workflow run, such as a new form submission, an incoming webhook, a new record in an app or a scheduled time.",
    },
    {
      q: "Should I use AI in my automations?",
      a: "Use AI for steps that need reading or judgment, like classifying requests or summarising text, and keep rule-based steps for predictable work such as moving data and sending notifications. Add human approval where AI output goes to customers or has consequences.",
    },
  ],
};
