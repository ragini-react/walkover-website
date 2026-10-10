# Events: evidence ledger

This ledger records the evidence behind every event on `/events` and `/events/[product]`. The page content lives in `src/content/events.ts`, and each record ID below (`EVT-…`) matches an `id` there. IDs are internal and are not official event identifiers.

Research was done on 10 October 2026 from public sources only: organiser pages, MSG91/Giddh/viaSocket/Walkover posts, team members' public LinkedIn posts, press releases and the Internet Archive. LinkedIn post pages were read in full where the logged-out HTML exposed them. Personal LinkedIn profiles return HTTP 999 and could not be read, so **job titles are shown only when a source states them**. LinkedIn post dates come from the post itself or from the activity ID (`id >> 22` = Unix ms).

**This is not a lifetime total.** It counts only events that someone wrote about publicly and that the research found. Internal records (travel, booth invoices, sponsorship contracts) would almost certainly add more.

## Evidence levels

| Ledger | Page label | Meaning |
|---|---|---|
| A | Confirmed | An organiser record, a company recap or a first-hand post written during or after the event establishes participation. |
| B | Corroborated | Independent sources agree it happened; some details are missing. (No published record currently sits at B. See the note on IMA 2026.) |
| C | Team account | Only a team member's own post records it. |
| D | Announced | Announced beforehand; nothing after the event confirms it. Also used for upcoming events. |
| E | Associated | The organiser names the product as partner, prize or tool; team attendance is not documented. |
| F | Not published | Lead that could not be substantiated. Kept below so it is not re-researched from scratch. |

Two posts that repeat the same announcement are one source, not two. A paid press release (VMPL via ANI or Business Standard) is treated as a **company** source, not independent press.

## Counts (published)

29 distinct event editions after de-duplication. Several were found independently by more than one research pass (IKIGAI, PyData Hack Days, Code for Communities 2.0 and Hacktoberfest) and are counted once.

| | MSG91 | Giddh | viaSocket | Walkover | All (unique) |
|---|---|---|---|---|---|
| Confirmed (A) | 6 | 0 | 3 | 4 | 10 |
| Team account (C) | 1 | 0 | 1 | 0 | 2 |
| Announced (D) | 3 | 1 | 11 | 7 | 16 |
| Associated (E) | 1 | 0 | 0 | 0 | 1 |
| **Total** | **11** | **1** | **15** | **11** | **29** |

Owner columns overlap: an event involving viaSocket and Walkover appears in both. In person: 22, online: 7. International: 2 (Barcelona and Bucharest). Free-licensed venue photo: 5 events. Named representatives: 18 events.

## Published records

### MSG91

| ID | Event | Level | Key evidence (verbatim) | Notes |
|---|---|---|---|---|
| EVT-MSG91-0001 | MSG91 IoT Conclave, Aug 2015 | A | Archived MSG91 blog, 5 Aug 2015: "an enriching session on the 'Internet of Things' (IoT) on Saturday at the Radisson Blu hotel." It also opened with a silence for Dr APJ Abdul Kalam (d. 27 Jul 2015). | The date of 1 Aug 2015 is **inferred** from that. The city and property are not named, so there is no photo. Ignore the 2026 date on the current msg91.com/guide copy. |
| EVT-MSG91-0002 | CleverTap webinar, 13 Jun 2018 | A | Archived MSG91 blog: "June 13, 2018 Hosted by: Kritika Prashant, Director – Product Marketing @MSG91, Saniya Kaluskar … @CleverTap. Key Speaker: Himanshu Periwal" | The online format is inferred from the blog's "Webinar" category. |
| EVT-MSG91-0003 | MWC Barcelona 2019 | A | Archived MSG91 blog, 12 Mar 2019: "Even though we did a lot of meetings, think we spent more time staying on the stall." | The stand number and the names of who travelled are unknown. Pushpendra Agrawal's LinkedIn article on MWC 2019 was not located. |
| EVT-MSG91-0004 | TiECon MP 2025, 31 Oct 2025 | E | TiE Indore post-event: "thank you to all our sponsors, partners, event team, and venue partner … MSG91 …" | Sponsor vs partner is not stated, and no staff are documented. |
| EVT-MSG91-0005 | Embassy of India, Bucharest, 12 Dec 2025 | C | Hardik Menghani: "Thrilled to have had the opportunity to present MSG91 at the Embassy of India, Bucharest today!" | The embassy release (22 Dec 2025) describes a B2B meeting with FICCI and ESC but does not name MSG91. Linking the two is our inference. The lead's "approx. March 2026" date was wrong. |
| EVT-MSG91-0006 | 33rd IMA International Management Conclave, 27–28 Feb 2026 | A | MSG91: "Meet us at Booth No. 6." Anchal Rathi: "Honored to host … Dr. Niranjan Hiranandani at our MSG91 stall during the IMA Event in Indore." | The research pass rated this B. We publish it as A because Anchal Rathi's account was written during the event. "Leadership Conclave" was only a hashtag; IMA is the Indore Management Association. |
| EVT-MSG91-0007 | IAMAI Marketing Conclave (20th), 4–5 Aug 2026 | D | MSG91, 3 Aug: "We're all set … Catch the MSG91 team at Booth D5" | No post-event record. The organiser is IAMAI. |
| EVT-MSG91-0008 | India CX Summit & Awards 2026, 12 Aug 2026 | A | Organiser site lists MSG91 under "Our Partners". ANI (paid release): "recognised as Contact Centre of the Year … held on 12 August at Hotel Radisson Blu, Dwarka". MSG91: "Drop by our booth". | MSG91 called it the "Delhi CX Summit". The award is announced once, as part of this event, and not counted separately. The organiser is Synnex Group. |
| EVT-MSG91-0009 | MSG91 Summit: E-Commerce Edition, 5 Sep 2026 | A | Business Standard (paid release): "presented the product at the MSG91 Summit - E-Commerce Edition, held in Indore on 5 September 2026" | The "Walkover Office" venue appears only in a search summary of msg91.com/blog/page/3, so it is not published. msg91.com/guide/whatsapp-business-api-guide does **not** mention the summit and was dropped as a source. "Complete Checkout for Shopify" is a private app, not a public launch. |
| EVT-MSG91-0010 | Global Fintech Fest 2026, 9–11 Sep 2026 | D | MSG91, 7 Sep: "Four of our MSG91 Rangers: Ragini Pawar, Nishant Badhe, Shruti Jaiswal & Hardik Menghani — will be there" | Delegate or exhibitor is unknown. |
| EVT-MSG91-0011 | Frontier D2C AI Summit (2nd), 10 Oct 2026 | D | eChai listing: "Novotel Mumbai International Airport, Andheri East". MSG91, 8 Oct: names Hardik Menghani, Khushali Dube and Amit Gautam. | It is on the research date. **Re-check for a recap.** |

### Giddh

| ID | Event | Level | Key evidence | Notes |
|---|---|---|---|---|
| EVT-GIDDH-0001 | ICAI AI Innovation Summit 2026, 26–27 Jun 2026, Bharat Mandapam | D | ICAI summit site (Wayback, 13 Jun 2026) lists Giddh under "Technology Partner". Manish Dhamnodiya, 25 Jun: "Excited to represent Giddh-Online Accounting Software at ICAI AI Innovation Summit 2026", at "Booth No. 14". | Both sources predate the event. ICAI's post-event release does not mention Giddh. The research pass rated it B; we publish it as D because nothing confirms it happened. Manish's role is unverified. |

**Giddh coverage gap.** No other Giddh event was found: no ICAI branch events, GST seminars, MSME expos, UAE VAT events, GITEX or webinars. Giddh's LinkedIn page shows no event posts. The 2016 launch was an online release, not an event. ICAI's member-benefit scheme (bs.icai.org/giddh, 80% off for members) is a tie-up, not an event.

### viaSocket and Walkover

| ID | Event | Level | Key evidence | Notes |
|---|---|---|---|---|
| EVT-VIASOCKET-0001 | PyData Indore Hack Days, 18 Jul 2026 | A | PyData Indore: "hosted at SSi Digital with Walkover as Technology Partner". MLH: "a shot at the 'Best Use of viaSocket' prize". PyData post: "That extra round of work earned them Best Use of viaSocket." | The role was technology partner, not sponsor. The prize was awarded after a follow-up submission, not on the day. |
| EVT-VIASOCKET-0002 | UDAAN 2026, SVVV | C | Dhwanil Bhavsar: "including the founder of viaSocket, Ravi Bharti Sir" and "UDAAN 2026 as a panelist speaker on AI & Automation" | Date unknown; it was on or before 12 Aug 2026, the date of the post. |
| EVT-VIASOCKET-0003 | Pre-hackathon session, 17 Aug 2026 | D | CSIT AITR: "Building AI Agents & Workflow Automation Systems … Monday, 17th August 2026 … 4:00 PM … Zoom" | The hackathon is not named; IKIGAI is likely, which is inference. |
| EVT-VIASOCKET-0004 | IKIGAI 2026, 21–23 Aug 2026, AITR | A | CSIT AITR valedictory: "Mr. Ravi Bharti – Director, Walkover \| NextGenAI" | The "Best viaSocket Technology Used" award is reported only by the winning participant (Nayan Paleja). The fetch tool paraphrased that post, so the exact award wording needs re-checking. |
| EVT-VIASOCKET-0005…0009 | Partner webinars: AiSensy (23 Sep), ATZ CRM (24 Sep), Bolna (25 Sep), SiteSpeakAI (30 Sep), magicplan (7 Oct 2026) | D | Announcement posts, each with a Zoom registration link | No recordings or recaps. The Bolna post gives no time zone, and its speakers are tagged by first name only. Don't assume "Pushpendra" is Pushpendra Agrawal. |
| EVT-WALKOVER-0001 | eChai Indore Startup Meetup, 3 Feb 2026 | A | eChai: "Walkover, 5th floor, Top LIC Tower … Scheme No 54". Pushpendra Agrawal is listed under "Hosts & speakers". | That Walkover hosted it is confirmed by the organiser. That he spoke on the day is not confirmed. A search snippet wrongly paired Tarun Sinhal (Certainty Infotech) with Walkover. |
| EVT-WALKOVER-0002…0004 | Learn No-Code. Build with AI. Explore MCP. Cohorts 1–3 (Apr, May and Jun 2026) | D | Luma listings at Walkover, Indore; hosts Dhwanil Bhavsar and Ravi Paliwal | Luma shows them as past, with 120, 118 and 142 registrations. Registrations are not turnout, and there is no recap, so they are D (the research pass said B). The lead's "AI Builders Workshop (May)" is Cohort 2. |
| EVT-WALKOVER-0005 | AI Agent Builders Workshop, 27–28 Jun 2026 | D | Luma listing (paid: ₹1600 and ₹3000 passes) | The LinkedIn post now returns 404, and Luma shows 0 guests. |
| EVT-WALKOVER-0006 | Code for Communities, Indore Edition, 5 Jul 2026 | D | GDG page lists Walkover as venue and partner | The GDG page still says "upcoming". |
| EVT-WALKOVER-0007 | Code for Communities 2.0, 6 Sep 2026 | A | GDG Indore: "Proud to announce our Venue Partner … Walkover"; "Ravi Bharti — Director, Walkover"; mentors Dhwanil Bhavsar and Harsh Sahu; recap: "dive deeper into AI automation using viaSocket credits" | — |
| EVT-WALKOVER-0008 | Hacktoberfest Hack Day, 4 Oct 2026 | D | PyData Indore: "Walkover … Venue Partner"; viaSocket 1-month subscription among the rewards | MLH says "This event ended", but that is automatic after the date, and there is no recap yet. |

## Not published

| Lead | Level | Why it is held back |
|---|---|---|
| MWC Barcelona 2020 | D | MSG91 announced Hall 8.1, Stand H70 (archived blog, 5 Feb 2020), but the GSMA cancelled the event on 12 Feb 2020. It is mentioned in the open note on EVT-MSG91-0003. |
| GITEX Global 2023, Dubai | C | It is known only from search-engine summaries of MSG91 posts ("Do connect us at: Pushpendra Agrawal, Alisha Chouhan, and Chinmay Daga"). No post URL or verbatim text was found. **Strong lead: find the Oct 2023 posts.** |
| TechSparks 2025, Bengaluru | D | Only a pre-event personal post by Ravi Dangi with #MSG91, and his MSG91 affiliation is unverified. |
| Google I/O Connect India (2026?) | C | One line in Dhwanil Bhavsar's 19 Aug 2026 post, with no date, venue or role. A third-party listing says 14 Jul 2026 at BIEC, which is unconfirmed. |
| India Mobile Congress 2023 | F | Chinmay Daga's pre-event post carries #MSG91 and #Walkover hashtags only. |
| DigiPlus Fest 2024, Gurugram | F | The lead's source is a blocked profile, and nothing links MSG91 to the event. |
| Phygital Retail Convention 2024 | F | Same: no source connects MSG91. |
| Hello Chatbot Webinar, 30 Apr 2024 | F | No listing, registration page or recording was found. |
| Global Fintech Fest 2023 | F | A hashtag seen only in a search summary. |
| Giddh launch, May 2016 | F | An online release (PR Newswire, 16 May 2016), not an event. |
| HeyGen Community Meetup, Indore, 13 Sep 2026 | F | Dhwanil Bhavsar co-hosts, but the venue is hidden, so the link to Walkover is unconfirmed. |

Walkover also hosted events with no documented product link, found while researching: AI Frontier 2026 (23 Aug, by Botmartz), a GDG workshop with Vrijraj Singh (25 Jul) and a Founders Mixer (2 Oct). They are not yet researched to the standard above.

## Venue photos

Only free-licensed Wikimedia Commons photos of the exact venue are used. Each is labelled on the page as "The venue, not the event". Licences were read from the Commons API on 10 Oct 2026. The Taj Lands End and Jio World Centre images were centre-cropped to 4:3, which removes the phone watermark on the Taj photo. Cropping is allowed under CC BY and CC BY-SA, and the credit says "(cropped)".

| File | Venue | Author | Licence | Commons page |
|---|---|---|---|---|
| `public/events/fira-gran-via-barcelona.jpg` | Fira Gran Via | Canaan | CC BY-SA 4.0 | File:Fira_Gran_Via.jpg |
| `public/events/taj-lands-end-mumbai.jpg` | Taj Lands End | Piyush P Pujari | CC BY-SA 4.0 | File:TAJ_LANDS_END.jpg |
| `public/events/radisson-blu-dwarka-new-delhi.jpg` | Radisson Blu, Dwarka | ArmouredCyborg | CC BY-SA 4.0 | File:Hotel_Radisson_Blu,_Dwarka.jpg |
| `public/events/jio-world-centre-mumbai.jpg` | Jio World Centre | DesiBoy101 | CC BY 4.0 | File:Jio_World_Centre,_Mumbai.jpg |
| `public/events/bharat-mandapam-new-delhi.jpg` | Bharat Mandapam | Kuldeepburjbhalaike | CC BY-SA 4.0 | File:Bharat_Mandapam_view_from_East.jpg |

**No free photo found:** Brilliant Convention Centre (Indore), Novotel Mumbai International Airport, Embassy of India Bucharest, AITR, SVVV, SSi Digital Academy and LIC Tower (the Walkover office). Commons photos of Bharat Mandapam under GODL-India were not used. **Event photos** (booths, stalls, team) exist in several of the linked LinkedIn posts. Walkover can publish them from its own copies; we did not copy them.

## Open items for the team

1. **Ravi Bharti or Ravi Paliwal?** GDG, AITR and LinkedIn posts say "Ravi Bharti"; viaSocket's company profile and the Luma host lists say "Ravi Paliwal". A GDG recap uses both names. The page shows each name as its source gives it. Confirm, and use one name.
2. Recaps or photos would upgrade the D records: Frontier D2C (10 Oct), GFF 2026, MarCon 2026, ICAI AIS 2026, the workshops and the webinars.
3. Job titles for Hardik Menghani, Anchal Rathi, Manish Dhamnodiya and others could not be read from public profiles.
4. Internal calendars, travel records and sponsorship invoices are the only way to approach a complete history, especially for 2010–2018 and for Giddh.
