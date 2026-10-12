import type { Post } from "../types";

export const post: Post = {
  slug: "automated-bank-reconciliation-gst",
  title: "Bank reconciliation and GST: closing the month cleanly",
  description:
    "How bank reconciliation works, why continuous matching beats a month-end scramble, and how clean invoice data makes GST filing in India far less painful.",
  category: "finance-operations",
  published: "2026-09-17",
  readingMinutes: 5,
  author: "Walkover Editorial",
  products: ["msg91", "giddh"],
  solutions: ["accounting-and-compliance"],
  body: [
    {
      type: "p",
      text: "Bank reconciliation is the check that your books and your bank agree. Every payment received, every vendor paid, every bank charge and every refund should appear on both sides. When they do not, something is missing, duplicated, mis-dated or wrong, and it is far easier to find out this week than in three months’ time when an auditor or a GST notice asks.",
    },
    {
      type: "p",
      text: "For Indian businesses the two jobs are closely linked. The same invoices that explain your bank receipts are the ones you report in your GST returns. If the invoices are clean and matched to payments as they happen, both reconciliation and filing become reviews rather than projects.",
    },
    {
      type: "h2",
      text: "What bank reconciliation actually involves",
      id: "what-bank-reconciliation-involves",
    },
    {
      type: "p",
      text: "At its simplest, you take the transactions on your bank statement and match each one to an entry in your accounting records. The differences you find usually fall into a few familiar groups.",
    },
    {
      type: "ul",
      items: [
        "Timing differences: a cheque issued but not yet cleared, or a deposit recorded in the books that the bank processes the next day.",
        "Missing entries: bank charges, interest, card fees or automatic debits that nobody recorded.",
        "Unidentified receipts: money from a customer that cannot be tied to an invoice because the reference is missing or the amount does not match.",
        "Errors: a payment recorded twice, an amount keyed wrongly or a transaction posted to the wrong account.",
        "Split and combined payments: one transfer that settles several invoices, or one invoice paid in instalments.",
      ],
    },
    {
      type: "p",
      text: "The output of a reconciliation is a statement showing that the bank balance, adjusted for timing differences, equals the balance in your books. Anything that cannot be explained is an exception that needs a person to investigate.",
    },
    {
      type: "h2",
      text: "Why continuous beats month-end",
      id: "why-continuous-beats-month-end",
    },
    {
      type: "p",
      text: "Many small businesses reconcile once a month, or once a quarter, by downloading a statement and ticking through it. That works when volumes are low. As transactions grow, the batch approach starts to fail in predictable ways.",
    },
    {
      type: "table",
      head: ["", "Month-end batch", "Continuous"],
      rows: [
        ["When differences are found", "Weeks after the transaction", "Within a day or two"],
        ["Context available", "Memories have faded; emails buried", "The person who made the payment remembers it"],
        ["Workload", "A spike at the busiest time of the month", "A small daily or weekly review"],
        ["Cash position", "Accurate only after the close", "Close to accurate at any time"],
        ["Customer follow-up", "Late; overdue invoices discovered late", "Unpaid invoices visible as they fall due"],
      ],
    },
    {
      type: "p",
      text: "Continuous reconciliation means bank transactions flow into the accounting system as they happen, through a bank feed or regular imports, and are matched automatically where the match is obvious: same amount, matching reference, expected date. People only see the exceptions. The month-end then becomes a check that the exceptions list is empty, rather than a hunt.",
    },
    {
      type: "callout",
      title: "Make matching easy for the software and for you",
      text: "Ask customers to quote the invoice number in their payment reference, and include it prominently on the invoice and in payment reminders. One consistent reference does more for automatic matching than any rule you can write afterwards.",
    },
    {
      type: "h2",
      text: "How clean invoice data underpins GST filing",
      id: "clean-invoice-data-and-gst",
    },
    {
      type: "p",
      text: "Under India’s Goods and Services Tax, registered businesses report their outward supplies, the sales invoices, credit notes and debit notes they issue, in GSTR-1, and file a summary return, GSTR-3B, which declares tax liability, claims input tax credit and accompanies payment of tax due. Depending on your registration type and turnover, other returns and requirements such as e-invoicing may apply too.",
    },
    {
      type: "p",
      text: "Every figure in those returns is built from individual invoices. If the invoices are wrong, the returns are wrong, and correcting them later is slower than getting them right at source. The details that matter most are the ones that are easy to get wrong when invoices are raised in a hurry.",
    },
    {
      type: "ul",
      items: [
        "The customer’s GSTIN, checked to be valid and belonging to the right business, for business-to-business invoices.",
        "Place of supply, which determines whether the invoice carries CGST and SGST or IGST.",
        "Correct HSN or SAC codes and the applicable tax rate for each line.",
        "Sequential, unique invoice numbers for each financial year, with no gaps that cannot be explained.",
        "Credit and debit notes linked to the original invoice, rather than ad-hoc adjustments.",
      ],
    },
    {
      type: "p",
      text: "Input tax credit depends on the other side of the same process. The credit available to you is linked to what your suppliers report in their own returns, which the GST portal reflects in auto-drafted statements such as GSTR-2B. Reconciling your purchase register against that statement regularly, rather than at the deadline, gives you time to chase a supplier who has not filed or has filed an invoice incorrectly.",
    },
    {
      type: "callout",
      title: "Check rates and dates at the source",
      text: "GST rates, thresholds, return forms and due dates change through notifications and depend on your registration. This article describes the general process only. Always confirm current requirements on the official GST portal or with your tax adviser.",
    },
    {
      type: "h2",
      text: "Where reconciliation and GST meet",
      id: "where-reconciliation-and-gst-meet",
    },
    {
      type: "p",
      text: "Bank reconciliation is not a GST requirement in itself, but it catches problems that would otherwise reach your returns. A receipt with no invoice behind it may be a sale that was never invoiced, and therefore never reported. A refund paid to a customer without a credit note leaves your reported sales higher than they should be. An advance received before an invoice is raised can have its own GST treatment. Matching every bank line to a document is the simplest way to make sure the returns describe what actually happened.",
    },
    {
      type: "h2",
      text: "A practical month-end checklist",
      id: "month-end-checklist",
    },
    {
      type: "ol",
      items: [
        "Confirm every bank and payment-gateway account is imported up to the last day of the month.",
        "Clear the unmatched list: investigate each unidentified receipt and payment and record or correct it.",
        "Record bank charges, interest and gateway fees that arrived without an invoice.",
        "Check that every refund and discount has a credit note linked to the original invoice.",
        "Review outstanding receivables and send reminders for overdue invoices.",
        "Check invoice numbering for gaps or duplicates.",
        "Validate GSTINs, place of supply and HSN or SAC codes on the month’s sales invoices.",
        "Reconcile your purchase register against the auto-drafted input tax credit statement on the GST portal and follow up with suppliers on mismatches.",
        "Compare the tax totals in your books with the figures prepared for GSTR-1 and GSTR-3B before filing.",
        "Lock the period in your accounting system once filed, so later edits are deliberate and visible.",
      ],
    },
    {
      type: "h2",
      text: "Tools that help",
      id: "tools-that-help",
    },
    {
      type: "p",
      text: "The aim is to have invoices, bank transactions and tax reports in one place, so that each check reads the same data. Giddh is Walkover’s cloud accounting software built along those lines: invoicing, real-time bank reconciliation that matches transactions automatically instead of at month end, and automated GST filing and reports for Indian businesses, with inventory in the same ledger. Payment reminders are part of the same picture; Giddh can notify customers about invoices by WhatsApp or email, and businesses that want to run their own reminder journeys can send them through MSG91’s messaging APIs.",
    },
  ],
  faqs: [
    {
      q: "What is bank reconciliation in accounting?",
      a: "Bank reconciliation is the process of matching transactions on your bank statement with entries in your accounting records, explaining any differences, and confirming the two balances agree.",
    },
    {
      q: "How often should a business reconcile its bank accounts?",
      a: "As often as transactions justify. Many growing businesses find daily or weekly matching, with automatic matching for obvious cases, far easier than a monthly or quarterly catch-up.",
    },
    {
      q: "What is the difference between GSTR-1 and GSTR-3B?",
      a: "GSTR-1 reports the details of outward supplies such as sales invoices and credit notes. GSTR-3B is a summary return declaring tax liability and input tax credit, filed with payment of tax due. Check the GST portal for current requirements.",
    },
  ],
};
