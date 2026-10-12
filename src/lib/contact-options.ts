import { products, solutions } from "@/content";

export type InterestGroup = { label: string; options: { value: string; label: string }[] };

/** "What is this about?" options, grouped. Server-side source of truth. */
export const interestGroups: InterestGroup[] = [
  { label: "Products", options: products.map((p) => ({ value: p.slug, label: p.name })) },
  { label: "Solutions", options: solutions.map((s) => ({ value: s.slug, label: s.name })) },
  {
    label: "Other",
    options: [
      { value: "partnership", label: "Partnership" },
      { value: "other", label: "Something else" },
    ],
  },
];

export const allowedInterests = new Set(interestGroups.flatMap((g) => g.options.map((o) => o.value)));
