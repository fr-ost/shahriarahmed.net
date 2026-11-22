/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Chrome extensions by Unique Labs.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Imported from the company website (www.uniquelabs.org, repository
 *  fr-ost/www.uniquelabs.org, `src/content/products.ts`): names, taglines,
 *  summaries, store links and product websites as published there, and the
 *  logos from `public/images/products/`. Keep this file in step with it.
 */

import type { ProjectItem } from "@/lib/types";
import { unfollowX } from "./unfollowx";

/** Every product, on the company website. */
export const productsUrl = "https://www.uniquelabs.org/products";

const store = (id: string) => `https://chromewebstore.google.com/detail/${id}`;
const logo = (slug: string) => `/images/products/${slug}.png`;

/** Extensions for growing and managing an X (Twitter) account. */
export const xExtensions: ProjectItem[] = [
  {
    name: unfollowX.name,
    tagline: "Free & unlimited mass unfollow on X (Twitter).",
    description: unfollowX.description,
    href: unfollowX.storeUrl,
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: unfollowX.website },
    icon: unfollowX.icon.src,
  },
  {
    name: "GrowX",
    tagline: "The ultimate X (Twitter) growth tool.",
    description:
      "The all-in-one X (Twitter) growth tool for Chrome: smart auto follow, a post scheduler, an on-device AI writer, analytics, an unfollower tracker and cleanup.",
    href: store("ofiancichfcakbdgekhcahflpoglfgbh"),
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: "https://www.growxapp.org/" },
    icon: logo("growx"),
  },
  {
    name: "ScoreX",
    tagline: "Boost your influencer score on X (Twitter).",
    description:
      "A Chrome extension that replies to the smart accounts you choose on X, in your own voice, from your own browser. You approve every reply, or let it run within strict limits. Invite only — early access.",
    href: store("pckgdccdipdllagmieedopalgdoheklo"),
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: "https://scorex.uniquelabs.org/" },
    icon: logo("scorex"),
    status: "Beta",
  },
  {
    name: "XAICG",
    tagline:
      "X AI Comment/Reply Generator for Twitter — free, unlimited replies in your own voice.",
    description:
      "A free Chrome extension that writes replies, questions, posts and threads for X (Twitter) in your own voice. Free forever, no daily limit, no sign-up and no API key — drafts are written privately on your own computer.",
    href: store("lpophlkocboadjhancbdikipnphffgil"),
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: "https://xaicg.uniquelabs.org/" },
    icon: logo("xaicg"),
    status: "Beta",
  },
  {
    name: "UniqueFarm",
    tagline: "Grow on X without sounding like a bot.",
    description:
      "A Chrome side panel for X (Twitter) that reads the post, writes a reply in your voice and posts it with human timing, breaks and a review hold. Proprietary, private-use software: no external license is sold separately right now.",
    href: store("plfapamdnnjlgjahajdgeaiknjljijln"),
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: "https://farm.uniquelabs.org/" },
    icon: logo("uniquefarm"),
    status: "Private",
  },
];

/** Free tools for everyday work in the browser. */
export const productivityExtensions: ProjectItem[] = [
  {
    name: "Unique PDF",
    tagline: "The free PDF editor with AI chat.",
    description:
      "20 PDF tools in one Chrome extension — merge, split, compress, edit, sign and protect, plus Unique AI to chat with any PDF. Everything runs in your browser: nothing is uploaded.",
    href: store("ogajiapfmheeiadeflajlkikpfkoobfl"),
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: "https://pdf.uniquelabs.org/" },
    icon: logo("unique-pdf"),
  },
  {
    name: "FrameShot",
    tagline: "Free screen recorder & full-page screenshot.",
    description:
      "Record your screen with sound and camera, or capture a whole web page in one click — then annotate, blur and share. Free forever, no watermark, and your captures stay on your device.",
    href: store("adcgjmghjagflmmndoajdidcopodacac"),
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: "https://frameshot.uniquelabs.org/" },
    icon: logo("frameshot"),
  },
  {
    name: "Twofold",
    tagline: "2FA codes, autofill & passkeys.",
    description:
      "A free 2FA authenticator for Chrome: one-click codes, smart autofill that ignores fake sites, passkeys, QR scanning and end-to-end encrypted backup & sync. No ads, works offline.",
    href: store("kgjmfhcleplfocnbpfklmejgemkgmpfb"),
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: "https://twofold.uniquelabs.org/" },
    icon: logo("twofold"),
  },
  {
    name: "Rowlio",
    tagline: "Turn any webpage into structured data.",
    description:
      "A free web scraper and data extractor for Chrome. Extract tables, listings, links, images and contact details into clean rows, then export to CSV, Excel or JSON. Everything runs in your browser.",
    // Not linked to a store listing on the company website yet.
    href: null,
    linkLabel: "Chrome Web Store",
    page: { label: "Product page", href: "https://rowlio.uniquelabs.org/" },
    icon: logo("rowlio"),
  },
];

/** All of them, in the company website's order of groups. */
export const extensions: ProjectItem[] = [...xExtensions, ...productivityExtensions];
