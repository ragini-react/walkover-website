import type { Post } from "../types";
import { post as otpVerification } from "./otp-verification-sms-whatsapp-email";
import { post as workflowAutomation } from "./what-is-workflow-automation";
import { post as agentsVsWorkflows } from "./ai-agents-vs-workflows";
import { post as whatIsMcp } from "./what-is-mcp-model-context-protocol";
import { post as bankReconciliation } from "./automated-bank-reconciliation-gst";
import { post as documentation } from "./documentation-that-gets-read";

/** All blog posts, newest first. */
export const posts: Post[] = [
  documentation,
  bankReconciliation,
  whatIsMcp,
  agentsVsWorkflows,
  workflowAutomation,
  otpVerification,
].sort((a, b) => b.published.localeCompare(a.published));
