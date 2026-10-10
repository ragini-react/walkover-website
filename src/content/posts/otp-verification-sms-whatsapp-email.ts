import type { Post } from "../types";

export const post: Post = {
  slug: "otp-verification-sms-whatsapp-email",
  title: "SMS, WhatsApp, email or voice OTP: how to choose",
  description:
    "A practical guide to choosing SMS, WhatsApp, email or voice for OTP verification, with a channel comparison, fallback strategy and expiry and retry rules.",
  category: "communication",
  published: "2026-08-04",
  readingMinutes: 6,
  author: "Walkover Editorial",
  products: ["msg91"],
  solutions: ["user-verification", "customer-communication"],
  body: [
    {
      type: "p",
      text: "A one-time password is a small thing that sits on the most expensive path in your product: the moment someone tries to sign up, log in or confirm a payment. If the code arrives late, the user gives up. If it arrives on a channel they don’t check, they give up faster. And if your flow is easy to abuse, someone else will send thousands of codes on your account.",
    },
    {
      type: "p",
      text: "There is no single best OTP channel. SMS, WhatsApp, email and voice each have strengths, and the right answer for most products is a primary channel chosen for the audience plus a fallback for when it fails. This guide walks through how to make that choice and how to set the rules around expiry, retries and rate limits.",
    },
    {
      type: "h2",
      text: "What each channel is good at",
      id: "what-each-channel-is-good-at",
    },
    {
      type: "h3",
      text: "SMS",
    },
    {
      type: "p",
      text: "SMS works on any phone with a number, smart or not, and needs no app. That reach is why it remains the default for phone-number verification. Its weaknesses are cost per message, which varies widely by country, and delivery that depends on operator routes and local regulation. In India, for example, commercial SMS is subject to sender and template registration rules, so a template that has not been approved will not be delivered.",
    },
    {
      type: "h3",
      text: "WhatsApp",
    },
    {
      type: "p",
      text: "Where WhatsApp is the everyday messaging app, an OTP there lands in a place the user already has open. Messages show a verified business name, and authentication templates can include a copy-code button, which removes a step. The catch is obvious: it only works if the user has WhatsApp on that number, and you need approved templates through a WhatsApp Business provider.",
    },
    {
      type: "h3",
      text: "Email",
    },
    {
      type: "p",
      text: "Email is the natural choice when the identity you are verifying is an email address: account recovery, B2B sign-ups, workspace invitations. It is cheap and not tied to a phone. It is also the slowest to be noticed, and codes can land in spam or a promotions tab if your sending domain is not properly authenticated with SPF, DKIM and DMARC.",
    },
    {
      type: "h3",
      text: "Voice",
    },
    {
      type: "p",
      text: "A voice OTP reads the code aloud in a phone call. It reaches landlines and basic phones, helps users who find reading small text difficult, and is a useful fallback when SMS is not arriving. It is more intrusive and usually costs more per verification, so it rarely makes sense as the first attempt.",
    },
    {
      type: "h2",
      text: "Channel comparison at a glance",
      id: "channel-comparison",
    },
    {
      type: "table",
      head: ["Channel", "Best for", "Needs from the user", "Watch out for"],
      rows: [
        [
          "SMS",
          "Phone-number verification with the widest reach",
          "A mobile number that can receive texts",
          "Per-message cost, operator delays, template registration rules",
        ],
        [
          "WhatsApp",
          "Markets where WhatsApp is the primary messenger",
          "WhatsApp installed on that number",
          "Template approval; users without WhatsApp need another path",
        ],
        [
          "Email",
          "Verifying email addresses, recovery, B2B sign-up",
          "Access to their inbox",
          "Spam filtering, slower attention, domain authentication",
        ],
        [
          "Voice",
          "Fallback, landlines, accessibility",
          "A phone that can take a call",
          "Higher cost, intrusive, harder to use in noisy places",
        ],
      ],
    },
    {
      type: "h2",
      text: "How to pick a primary channel",
      id: "how-to-pick-a-primary-channel",
    },
    {
      type: "p",
      text: "Start from what you are actually verifying. If the account is keyed on a phone number, verify the phone number. If it is keyed on an email address, verify the email. Mixing them, such as sending an email code to confirm a phone number, proves nothing useful.",
    },
    {
      type: "p",
      text: "Then look at your users rather than the market in general. Your own sign-up data tells you which countries people come from and which devices they use. A consumer app with most users in a WhatsApp-heavy market may get better completion with WhatsApp first. A product used by enterprises with managed devices may find email or SMS more dependable. Run the channels side by side for a period and compare verification completion, not just delivery receipts: a message marked delivered that nobody types in is still a failure.",
    },
    {
      type: "ul",
      items: [
        "Verify the identifier the account is actually built on.",
        "Measure completion rate per channel and per country, not just delivery.",
        "Let users switch channel themselves on the verification screen.",
        "Keep the code format the same across channels so support can help consistently.",
      ],
    },
    {
      type: "h2",
      text: "Designing a fallback strategy",
      id: "designing-a-fallback-strategy",
    },
    {
      type: "p",
      text: "Fallback means trying a second channel when the first does not result in a verification within a reasonable window. Done well, it rescues users who would otherwise leave. Done badly, it bombards them with codes on three channels at once and doubles your bill.",
    },
    {
      type: "ol",
      items: [
        "Send on the primary channel and show the user which channel and which number or address the code went to.",
        "Wait long enough for a normal delivery before offering anything else. Show a visible countdown rather than a silent delay.",
        "After the wait, offer the next channel as a choice, for example “Send on WhatsApp instead” or “Call me with the code”.",
        "Invalidate the previous code when you issue a new one, so only the latest code works.",
        "Log which channel finally succeeded. Over time this tells you whether your primary choice is right.",
      ],
    },
    {
      type: "callout",
      title: "Automatic or user-chosen fallback?",
      text: "Automatic fallback is convenient but can send a second message the user did not need, because the first one was simply slow. Offering the next channel as a button keeps the user in control and avoids paying twice. Many teams automate fallback only for channels they can confirm failed, such as a WhatsApp message to a number that is not on WhatsApp.",
    },
    {
      type: "h2",
      text: "Expiry, retries and rate limits",
      id: "expiry-retries-and-rate-limits",
    },
    {
      type: "p",
      text: "These three settings decide whether your OTP flow is both usable and hard to abuse. There are no universal numbers; the right values depend on how sensitive the action is. The principles are consistent, though.",
    },
    {
      type: "h3",
      text: "Expiry",
    },
    {
      type: "p",
      text: "Codes should expire in minutes, not hours. Long enough for a slow message and a distracted user, short enough that an intercepted or shoulder-surfed code is useless soon after. Tie each code to a specific purpose and session, so a login code cannot be reused to approve a payment.",
    },
    {
      type: "h3",
      text: "Verification attempts",
    },
    {
      type: "p",
      text: "Limit how many wrong codes can be entered against a single issued code. A short numeric code can be guessed if attempts are unlimited. After the limit, invalidate the code and require a new one. Compare codes in constant time on the server and never return the code, or a hint about it, in an API response.",
    },
    {
      type: "h3",
      text: "Resends and rate limits",
    },
    {
      type: "p",
      text: "Resend limits protect users from spam and protect you from SMS pumping, where attackers trigger large volumes of messages to premium-rate numbers they profit from. Rate-limit by phone number or email, by IP address and by device or session, and set an overall cap per destination country if you serve only a few markets.",
    },
    {
      type: "ul",
      items: [
        "Enforce a cooldown between resends and increase it after each one.",
        "Cap total sends per identifier per hour and per day.",
        "Block or challenge requests to countries you do not serve.",
        "Put a bot check in front of the send button on public sign-up pages.",
        "Alert on sudden spikes in sends that are not matched by successful verifications.",
      ],
    },
    {
      type: "h2",
      text: "Beyond the code: links and silent checks",
      id: "beyond-the-code",
    },
    {
      type: "p",
      text: "Typing six digits is not the only option. Magic links, where the user taps a link sent to their email or phone, remove the typing step and work well for low-risk logins. They need care around link expiry and opening on a different device from the one that requested it. For higher-risk actions such as changing a bank account or a payout address, consider asking for a fresh OTP even if the user is already logged in, so a stolen session alone is not enough.",
    },
    {
      type: "h2",
      text: "Putting it together",
      id: "putting-it-together",
    },
    {
      type: "p",
      text: "A sensible OTP setup has a primary channel chosen from your own completion data, a visible and user-friendly fallback, short expiry, limited attempts and layered rate limits, with monitoring that compares sends to successful verifications. Building and maintaining separate integrations for each channel is where much of the effort goes. MSG91 offers an OTP platform and widget that can send codes over SMS, WhatsApp, email or voice and fall back between them, along with OTP MagicLink, so the channel decision becomes configuration rather than a new integration each time you change your mind.",
    },
  ],
  faqs: [
    {
      q: "Is WhatsApp OTP better than SMS OTP?",
      a: "It depends on your users. WhatsApp often works well where it is the main messaging app, but it only reaches people who have WhatsApp on that number. SMS reaches any mobile phone. Many products use one as the primary channel and the other as a fallback.",
    },
    {
      q: "How long should an OTP be valid?",
      a: "A few minutes is typical. The code should last long enough for a slow delivery but expire quickly enough that an intercepted code is useless. Sensitive actions can use shorter windows.",
    },
    {
      q: "What is OTP fallback?",
      a: "OTP fallback means offering or sending the code on a second channel, such as voice or WhatsApp, when the first channel does not lead to a successful verification within a set time.",
    },
    {
      q: "How do I stop OTP abuse and SMS pumping?",
      a: "Rate-limit sends by phone number, IP and session, add increasing resend cooldowns, block countries you do not serve, add a bot check to public forms and alert when sends rise without matching verifications.",
    },
  ],
};
