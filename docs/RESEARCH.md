# Research notes

Compiled October 2026 from public sources. This file records where the site's facts come from and which ones still need confirmation from the Walkover team before launch.

## Verified (company-owned sources)

| Fact | Source |
|---|---|
| Legal name: Walkover Web Solutions Pvt. Ltd. | walkover.in/about, msg91.com footer |
| Founded 2010, starting with MSG91 | walkover.in/about, viasocket.com/about |
| HQ: 5th Floor, Wing B, LIC Tower, Scheme No. 54, Indore 452011 | walkover.in, msg91.com |
| Phone +91 731 256 0056; email info@walkover.in | walkover.in footer |
| "150+ team members, working remotely" | walkover.in |
| Self-description: "A Communication and AI Startup"; pillars of design, culture, technology | walkover.in |
| Mission: support start-ups in realising their vision | walkover.in/about |
| Ten values ("One move. Total focus." …) | walkover.in/about/culture-we-foster |
| Hiring motto "Passion First, Skill Second, Degree Last"; Keka careers portal | walkover.in/careers |
| Giddh founded 2016 | giddh.com/in/about |
| viaSocket began as a side project; 90-day prototype; 10 apps at first | viasocket.com/about |
| Pushpendra Agrawal: founder of Walkover; started viaSocket | giddh.com/in/about, viasocket.com/about |
| Shubhendra Agrawal: Founder & CEO, MSG91; founded Giddh | msg91.com/in/about-us, giddh.com/in/about |
| Seven products and their URLs (Embarko is not listed there yet) | walkover.in/products |
| Product capabilities, audiences, pricing models | each product's own site (see `src/content/products.ts`) |
| GTWY runs in production at viaSocket and MSG91 | gtwy.ai |
| DocStar CLI exposes MSG91 APIs as MCP tools | docs.msg91.com |
| 50 Agents listed in viaSocket MCP marketplace | viasocket.com/mcp/50agents |
| SOC 2 Type II, ISO 27001:2022, GDPR/CCPA (viaSocket); SOC 2 Type 2, ISO, VAPT, CASA, TAC (MSG91) | viasocket.com, msg91.com/certificates |

Product brand colours were sampled from each product's live logo or primary UI in October 2026:

- MSG91 `#1E75BA`, from the header logo and the site's `--accent-color` (`#156BB3` appears only in the favicon).
- viaSocket `#A8200D`, from the logo and CTA.
- Giddh `#1B1F6D`, from the logo and buttons.
- GTWY `#14181F`, from its monochrome logo (the amber `#F5B93B` appears only on one header button).
- 50 Agents `#5B21B5`, from the primary buttons.
- DocStar `#0F0F0F`, from its monochrome logo. Its buttons are near-black too; the earlier cyan values were not brand colours.
- Things of Brand `#5928E5`, from the logo.
- Embarko `#171A1E`, from the logo (`/assets/embarko-icon.svg`). Its brand is monochrome.

Colours re-verified against the live sites on 10 October 2026.

Confirm these with each product's brand team.

All figures shown on the site (30,000+ businesses, 2.5B+ API calls/month, 1B+ OTPs/month, 2,300+ apps, 10,000+ teams, 400+ GTWY customers, 4 lakh runs/month) are the products' own published claims. They are always shown with attribution.

## Embarko (added October 2026)

- embarko.ai: "Instant hosting for every app you build with AI". In beta.
- Operated by SuperHeroes Inc. at Walkover's LIC Tower address (embarko.ai/terms, /privacy, /dpa); contact pushpendra@walkover.in (embarko.ai/llms.txt, /security); sign-in codes are sent through MSG91 (DPA sub-processor list).
- Not yet listed on walkover.in/products. **Confirm** that Embarko should be presented as a Walkover product.
- Features follow embarko.ai/docs/overview.md. The homepage also shows database, login, uploads, email and secrets as available, which the docs contradict, so those are left out.

## Our Story page (`src/content/story.ts`)

The full claim-by-claim evidence, with verbatim passages, status and wording decisions, is in [`docs/STORY-LEDGER.md`](STORY-LEDGER.md). Summary:

- **Main sources.** Pushpendra Agrawal's founder history (MSG91 blog, 26 March 2019; cite the archived original, because the live msg91.com/guide copy shows a 2026 CMS date and the wrong author). Also The Grit Stories (SaaSBOOMi, October 2022), YourStory (2012, 2013), Inc42 (2016), TRAI press releases (2010–2011), Walkover's 2014 and 2016 press releases, and Internet Archive captures of walkover.in, msg91.com, whozzat.com, hostnsoft.com, saveandsearch.com and giddh.com.
- **Founding year.** The page shows three dates side by side: 2007 (the "hostnsoft" claim on walkover.in in 2013), 2008 (the founder's account of the hosting start), and 2010 (the company's stated year; the self-serve platform began). It also notes that msg91.com was already live in February 2009.
- **Two origin accounts for SMS** (Yeshwant Club as middleman; a glitching SMS vendor taken in-house). Both are presented.
- **Reported, not independently verified.** The 2006 social network, the calling-card business, investor pitches, the 2013 AWS move, and the revenue figures ($4.5M FY18–19; $10M ARR, 2022). Each is attributed in the text.
- **Photos** in `public/story/` are first-party: msg91.com/about-us (team photos and founder portraits), Walkover's Keka careers page (MSG91 team), and Pushpendra Agrawal's 2019 articles (huddle, MWC Barcelona). Office photos from GDG Indore, award and hackathon posts were left out because third parties posted them. Ask the team for dated historical photos (2008–2013 office, early product screenshots) they own.
- **Team size.** walkover.in shows both "150+" and "200+"; the site keeps 150+.
- **Open questions** are listed on the page and in the ledger. The incorporation date can be confirmed on the MCA portal.

## Inferred positioning (written for this site)

- "Make every message (workflow, invoice, agent…) a walkover." Hero line built on the meaning of *walkover*, an effortless win.
- Visual language: dice pips and a game board, taken from the red die in the official logo and the value "One move. Total focus."
- Product families (Communicate, Automate, Intelligence, Operate), used for grouping only.
- Principles in "How we build". Each one rests on a verifiable fact (see `src/content/company.ts`).
- Industries are included only where a product site names them; each page states its basis.

## Needs confirmation before launch

1. **Founder titles at group level.** Use of "Founder" for Pushpendra Agrawal on the About page.
2. **MSG91's ISO standard.** The certificates page says "ISO" only.
3. **Integration counts.** viaSocket says 2,300+ on its homepage and 1,500+ elsewhere. The site uses 2,300+.
4. **50 Agents.** Its site is JavaScript-only, so the description relies on walkover.in and the viaSocket MCP listing.
5. **Logo usage.** The official mark from walkover.in is used as the brand identity. Confirm that the brand team approves it.
6. **Giddh legal entity.** Giddh's footer names "Walkover Technologies Pvt Ltd".
7. **Privacy notice.** Plain-language text that covers this website only. It needs legal review.
8. **Customer logos.** Deliberately not used, because permission is unverified.

## Deliberately not used

- Third-party claims: "40+ products", "5000+ enterprises", founding year 2007.
- Review ratings (Capterra/G2). These are real, but they belong to individual products and must not become structured data on the parent site.
- Older products (Socket, phone91, etc.) without current URLs.
