import type { CSSProperties } from "react";
import type { ProductDemo as DemoKind } from "@/content/types";
import { PlayWhenVisible } from "./PlayWhenVisible";
import s from "./ProductDemo.module.scss";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/** MSG91 — one request fans out to the channel that reaches the customer. */
function Channels() {
  const channels = ["SMS", "WhatsApp", "RCS", "Email", "Voice", "Push"];
  return (
    <div className={s.channels}>
      <code className={s.req}>
        send(<span className={s.k}>to</span>: customer, <span className={s.k}>channel</span>: &quot;best&quot;)
      </code>
      <div className={s.hub}>One API</div>
      <ul role="list" className={s.chList}>
        {channels.map((c, i) => (
          <li key={c} className={s.ch} style={v({ "--i": i })}>
            <span className={s.chDot} />
            {c}
          </li>
        ))}
      </ul>
      <div className={s.bubble}>
        <span className={s.bubbleFrom}>Acme</span>
        Your verification code is <b>482 913</b>
        <span className={s.bubbleMeta}>Delivered</span>
      </div>
    </div>
  );
}

/** viaSocket — a workflow mixing AI, rules and a human. */
function Flow() {
  const steps = [
    { tag: "Trigger", text: "New lead from website form" },
    { tag: "AI step", text: "Research the company and score fit" },
    { tag: "Rule", text: "If score is 70 or more" },
    { tag: "Approval", text: "Sales lead approves" },
    { tag: "Actions", text: "Create deal in CRM · Notify on chat" },
  ];
  return (
    <ol role="list" className={s.flow}>
      {steps.map((st, i) => (
        <li key={st.tag} className={s.step} style={v({ "--i": i })}>
          <span className={s.stepTag}>{st.tag}</span>
          <span className={s.stepText}>{st.text}</span>
          <span className={s.stepCheck} />
        </li>
      ))}
      <li className={s.log} aria-hidden="true">
        run #1842 · 5 steps logged · 0 retries
      </li>
    </ol>
  );
}

/** Giddh — invoice to reconciliation to filing in one ledger. */
function Ledger() {
  return (
    <div className={s.ledger}>
      <div className={s.inv}>
        <div className={s.invHead}>
          <span>Invoice INV-0142</span>
          <span className={s.paid}>Paid</span>
        </div>
        <div className={s.row}>
          <span>Taxable value</span>
          <span>₹1,00,000</span>
        </div>
        <div className={s.row}>
          <span>CGST + SGST</span>
          <span>₹18,000</span>
        </div>
        <div className={`${s.row} ${s.total}`}>
          <span>Total</span>
          <span>₹1,18,000</span>
        </div>
      </div>
      <div className={s.bank}>
        <span className={s.bankLabel}>Bank feed</span>
        <span>NEFT credit · ₹1,18,000</span>
        <span className={s.match}>Matched</span>
      </div>
      <div className={s.gst}>
        <span className={s.gstDot} />
        GST return data updated
      </div>
    </div>
  );
}

/** GTWY — an agent embedded in someone else's product, under their brand. */
function Embed() {
  return (
    <div className={s.embed}>
      <div className={s.window}>
        <div className={s.chrome}>
          <span />
          <span />
          <span />
          <em>app.yourproduct.com</em>
        </div>
        <div className={s.app}>
          <div className={s.sidebar}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} />
            ))}
          </div>
          <div className={s.agent}>
            <p className={s.agentTitle}>Your Assistant</p>
            <p className={`${s.msg} ${s.user}`}>Summarise this week’s support tickets</p>
            <p className={`${s.msg} ${s.bot}`}>Three themes: billing questions, export errors and onboarding. Draft replies are ready.</p>
          </div>
        </div>
      </div>
      <ul role="list" className={s.chips}>
        <li>Tenant isolated</li>
        <li>Your brand</li>
        <li>Model fallback ready</li>
      </ul>
    </div>
  );
}

/** 50 Agents — a meeting becomes a summary becomes tasks. */
function Agents() {
  return (
    <div className={s.agents}>
      <div className={s.meet}>
        <span className={s.meetTitle}>Weekly product sync</span>
        <span className={s.wave}>
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} style={v({ "--i": i })} />
          ))}
        </span>
      </div>
      <ul role="list" className={s.summary}>
        <li style={v({ "--i": 0 })}>Ship export fix before Friday</li>
        <li style={v({ "--i": 1 })}>Design to draft the pricing FAQ</li>
        <li style={v({ "--i": 2 })}>Review onboarding drop-off next week</li>
      </ul>
      <div className={s.tasks}>
        <span className={s.taskLabel}>Work items created</span>
        <span className={s.taskCount}>3</span>
      </div>
    </div>
  );
}

/** DocStar — draft, publish, and expose as tools. */
function Docs() {
  return (
    <div className={s.docs}>
      <div className={s.editor}>
        <span className={s.draft}>AI draft</span>
        <span className={s.h}>Verify a phone number</span>
        {[92, 78, 85, 60].map((w, i) => (
          <span key={i} className={s.line} style={v({ "--w": `${w}%`, "--i": i })} />
        ))}
      </div>
      <div className={s.published}>
        <span className={s.gstDot} /> Published to docs.yourproduct.com
      </div>
      <code className={s.cli}>
        <span className={s.prompt}>$</span> docstar-editor mcp
      </code>
    </div>
  );
}

/** Things of Brand — one image created, one uploaded, both used by URL. */
function Images() {
  return (
    <div className={s.images}>
      <div className={s.imageTiles}>
        <span className={s.created} style={v({ "--i": 0 })}>
          Created
        </span>
        <span className={s.uploaded} style={v({ "--i": 1 })}>
          Uploaded
        </span>
      </div>
      <code className={`${s.cli} ${s.imageUrl}`}>
        <span className={s.prompt}>↳</span>
        https://…/<span className={s.k}>launch-banner.png</span>
      </code>
    </div>
  );
}

/** Embarko — an agent deploys the app it wrote, and a live link comes back. */
function Deploy() {
  return (
    <div className={s.deploy}>
      <code className={s.cli}>
        <span className={s.prompt}>›</span> Deploy this app to Embarko
      </code>
      <ol role="list" className={s.deploySteps}>
        <li style={v({ "--i": 0 })}>Source received</li>
        <li style={v({ "--i": 1 })}>Built · runtime detected</li>
        <li style={v({ "--i": 2 })}>Running · HTTPS on</li>
      </ol>
      <div className={s.live}>
        <span className={s.gstDot} /> your-app.embarko.app
      </div>
    </div>
  );
}

const demos: Record<DemoKind, () => React.JSX.Element> = {
  channels: Channels,
  flow: Flow,
  ledger: Ledger,
  embed: Embed,
  agents: Agents,
  docs: Docs,
  images: Images,
  deploy: Deploy,
};

/** `accent` defaults to the inherited --accent (the page's product brand). */
export function ProductDemo({ kind, accent, label }: { kind: DemoKind; accent?: string; label: string }) {
  const Demo = demos[kind];
  return (
    <figure className={s.frame} style={accent ? v({ "--accent": accent }) : undefined}>
      <PlayWhenVisible className={s.stage}>
        <Demo />
      </PlayWhenVisible>
      <figcaption className={s.caption}>
        <span>Illustrative</span>
        <span>{label}</span>
      </figcaption>
    </figure>
  );
}
