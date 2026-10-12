import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { PostBody } from "@/components/sections/PostBody";
import type { PostBlock } from "@/content/types";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Website Privacy Notice",
  description: "How walkover.in handles the information you share through this website, including the contact form.",
  path: "/privacy",
});

/** Covers this website only. Each product publishes its own privacy policy. */
const body: PostBlock[] = [
  { type: "p", text: `This notice explains how ${site.legalName} handles information collected through this website. Each Walkover product, such as MSG91, Giddh or viaSocket, has its own privacy policy on its own website, which applies when you use that product.` },
  { type: "h2", id: "what-we-collect", text: "What we collect" },
  { type: "ul", items: [
    "Contact form: your name, work email, and optionally your company, the topic you choose and your message.",
    "Basic technical data that any web server receives, such as your IP address and browser type, used to keep the site secure and working.",
  ] },
  { type: "p", text: "This website does not ask you to create an account and does not use advertising cookies." },
  { type: "h2", id: "how-we-use-it", text: "How we use it" },
  { type: "ul", items: [
    "To reply to your enquiry and route it to the right team.",
    "To protect the form from spam and abuse, for example by limiting repeated submissions.",
  ] },
  { type: "p", text: "We do not sell your information. We share it only with the service providers that help us operate this website and receive your message, and only for that purpose." },
  { type: "h2", id: "retention", text: "How long we keep it" },
  { type: "p", text: "We keep enquiries for as long as needed to respond and follow up, and then delete them unless a longer period is required by law." },
  { type: "h2", id: "your-rights", text: "Your choices" },
  { type: "p", text: `You can ask us what information we hold about you, ask us to correct it or ask us to delete it by emailing ${site.email}.` },
  { type: "h2", id: "contact", text: "Contact" },
  { type: "p", text: `${site.legalName}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}, ${site.address.country}. Email ${site.email}.` },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Privacy", path: "/privacy" }]}
        eyebrow="Legal"
        title="Website privacy notice"
        lead="Plain language about the little information this website collects, and what we do with it."
      />
      <section className="section-tight">
        <div className="container">
          <PostBody blocks={body} />
        </div>
      </section>
    </>
  );
}
