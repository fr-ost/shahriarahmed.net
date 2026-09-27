/**
 * Text of the Privacy Policy and DMCA pages. The email address in any
 * paragraph is linked automatically. Update `legalUpdated` whenever either
 * policy changes.
 */

import type { LegalSection } from "@/lib/types";
import { person } from "./portfolio";

export const legalUpdated = { label: "27 September 2026", dateTime: "2026-09-27" };

export const privacyPolicy: LegalSection[] = [
  {
    heading: "Overview",
    paragraphs: [
      "This is the personal website of Shahriar Ahmed (shahriarahmed.net). This policy explains what information is collected when you visit it and how that information is used.",
    ],
  },
  {
    heading: "Information you choose to share",
    paragraphs: [
      `The site has no forms, accounts, or comments. If you email me at ${person.email}, I receive your email address and whatever you include in your message. I use it only to reply to you and keep a record of our conversation. I do not sell it or share it with anyone else.`,
    ],
  },
  {
    heading: "Hosting and server logs",
    paragraphs: [
      "The site is hosted by Vercel. To deliver pages and keep the service secure, Vercel processes technical information about each request, such as your IP address, browser type, and the page you asked for. Vercel handles this information under its own privacy policy.",
    ],
    links: [{ label: "Vercel privacy policy", href: "https://vercel.com/legal/privacy-policy" }],
  },
  {
    heading: "Cookies, analytics, and tracking",
    paragraphs: [
      "This site does not set cookies and does not use analytics, advertising, or tracking tools. Fonts, images, and scripts are served from the site’s own domain; pages do not load anything from third parties.",
      "If you switch between light and dark mode, your choice is saved in your browser’s local storage so the site can remember it on your next visit. It stays on your device and is never sent to me. You can clear it at any time in your browser settings.",
    ],
  },
  {
    heading: "Copy buttons",
    paragraphs: [
      "Buttons such as “Copy email” write text to your clipboard only when you click them. The site never reads your clipboard.",
    ],
  },
  {
    heading: "Links to other websites",
    paragraphs: [
      "The site links to other services, including Google Scholar, ORCID, GitHub, LinkedIn, X, Facebook, Instagram, Telegram, the Chrome Web Store, and the publisher of my research. When you follow those links, their own privacy policies apply.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "The site is not directed at children and does not knowingly collect information from them.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If the site changes in a way that affects your privacy, this page will be updated. The date at the top shows when it was last revised.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [`For any question about this policy, email ${person.email}.`],
  },
];

export const dmcaPolicy: LegalSection[] = [
  {
    heading: "Copyright",
    paragraphs: [
      "Unless stated otherwise, the text, design, and images on this website are © Shahriar Ahmed. Publication details, including titles and abstracts, are shown for reference and remain the copyright of their publishers and authors. Brand names and logos belong to their respective owners.",
    ],
  },
  {
    heading: "Reporting infringement",
    paragraphs: [
      `I respect the intellectual property of others. If you believe material on this website infringes your copyright, send a written notice to ${person.email} with the subject line “DMCA notice”. Under the Digital Millennium Copyright Act (17 U.S.C. § 512(c)(3)), the notice should include:`,
    ],
    list: [
      "your physical or electronic signature;",
      "a description of the copyrighted work you believe has been infringed;",
      "a description of the material on this site that you believe is infringing, with enough detail to find it (for example, the page address);",
      "your name, postal address, telephone number, and email address;",
      "a statement that you believe in good faith that the use is not authorised by the copyright owner, its agent, or the law; and",
      "a statement that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or are authorised to act on the owner’s behalf.",
    ],
  },
  {
    heading: "What happens next",
    paragraphs: [
      "When I receive a complete notice, I will review it promptly. Where appropriate, I will remove or disable access to the material and let you know.",
    ],
  },
  {
    heading: "Counter-notice",
    paragraphs: [
      "If material you provided was removed and you believe this was a mistake or a misidentification, you can send a counter-notice to the same address. It should include:",
    ],
    list: [
      "your physical or electronic signature;",
      "a description of the material that was removed and where it appeared before removal;",
      "a statement, under penalty of perjury, that you believe in good faith the material was removed as a result of a mistake or misidentification; and",
      "your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal district court for your address (or, if you are outside the United States, any judicial district in which the service provider may be found) and will accept service of process from the person who sent the original notice.",
    ],
  },
  {
    heading: "Misrepresentation",
    paragraphs: [
      "Under 17 U.S.C. § 512(f), anyone who knowingly misrepresents that material is infringing, or that it was removed by mistake, may be liable for damages. If you are not sure whether material infringes your copyright, consider seeking legal advice before sending a notice.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [`Send notices and counter-notices to ${person.email}.`],
  },
];
