import type { Metadata } from "next";
import { posts } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { BlogListing } from "@/components/sections/BlogListing";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { collectionSchema } from "@/lib/schema";

export const metadata: Metadata = pageMeta({
  title: "Blog — Communication, Automation, AI & Finance Guides",
  description:
    "Practical guides from Walkover on OTP verification, workflow automation, AI agents, MCP, bank reconciliation, GST and documentation that gets read.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", path: "/blog" }]}
        eyebrow="Blog"
        title="Notes from the people building it."
        lead="Practical writing on communication, automation, AI, finance operations and documentation. No fluff, no invented numbers."
      />
      <BlogListing />
      <JsonLd
        data={collectionSchema(
          "Walkover blog",
          "/blog",
          posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
        )}
      />
    </>
  );
}
