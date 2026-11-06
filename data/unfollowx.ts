/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  UnfollowX Pro (formerly X Mass Unfollow) — the Chrome extension.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Its own website is www.unfollowx.com; the old product page on this site
 *  (/projects/x-mass-unfollow) redirects there (see next.config.ts). The
 *  privacy policy stays at /projects/x-mass-unfollow/privacy, the address the
 *  Chrome Web Store listing may link to: keep it in step with the extension.
 */

import type { BrowserExtension, LegalSection, ProductPermission } from "@/lib/types";

const folder = "/images/unfollowx";

const support = { label: "@igfrostt on Telegram", href: "https://t.me/igfrostt" };

const permissions: ProductPermission[] = [
  {
    name: "x.com, twitter.com",
    reason: "Read your following list and unfollow in your own signed-in session.",
  },
  {
    name: "abs.twimg.com",
    reason: "Read X’s own app files, which describe how X’s website talks to X.",
  },
  {
    name: "storage, unlimitedStorage",
    reason: "Keep your settings, scan and history on your device.",
  },
  {
    name: "alarms",
    reason: "Schedule the next unfollow, breaks and daily-limit pauses.",
  },
  {
    name: "scripting",
    reason: "Start working in an x.com tab that was already open, without a reload.",
  },
];

export const unfollowX: BrowserExtension = {
  name: "UnfollowX Pro",
  formerName: "X Mass Unfollow",
  description:
    "Mass unfollow tool for X (Twitter): bulk unfollow, clean up your following list, and remove the accounts that don’t follow you back.",
  website: "https://www.unfollowx.com/",
  storeUrl:
    "https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl",
  logo: { src: `${folder}/unfollowx-logo.svg`, alt: "UnfollowX Pro", width: 128, height: 128 },
  icon: { src: `${folder}/unfollowx-icon.png`, alt: "UnfollowX Pro", width: 128, height: 128 },
};

/* ── Privacy policy of the extension ────────────────────────────────────── */
/*  The same text as privacy.html inside the extension.                     */

export const unfollowXPrivacyUpdated = { label: "2 October 2026", dateTime: "2026-10-02" };

export const unfollowXPrivacy: LegalSection[] = [
  {
    heading: "What the extension does",
    paragraphs: [
      "UnfollowX Pro (formerly X Mass Unfollow) helps you find accounts on X that don’t follow you back and unfollow them. It works inside your own browser, using the X session you are already signed into. It never asks for your password, never signs in for you, and never sends your X account data to the developer or any other third party.",
      "To read your following list and unfollow accounts, it sends requests only to X itself (x.com, and abs.twimg.com for X’s own app files) — the same requests X’s website makes when you use it.",
    ],
  },
  {
    heading: "Stored on your device only",
    paragraphs: [
      "The extension keeps the following in its own storage on your device. Delete all of it at any time from Dashboard → Settings → Delete all extension data, or by removing the extension.",
    ],
    list: [
      "Settings — speed, daily limit, Keep rules.",
      "Whitelist — handles you never want unfollowed.",
      "Last scan — accounts you follow and whether they follow you back.",
      "Unfollow history — who the extension unfollowed, and when.",
      "Daily counter — recent unfollow times, to enforce your daily limit.",
    ],
  },
  {
    heading: "No analytics or tracking",
    paragraphs: [
      "This version contains no analytics, telemetry or tracking. The developer receives no information about you, your X account, or how you use the extension.",
    ],
  },
  {
    heading: "Advertising",
    paragraphs: [
      "This extension uses AdsOnBread to display contextual ads. The SDK stores a random pseudonymous token and a 24-hour expiration time in local extension storage and transmits the unexpired token, browser language, impressions, and clicks to AdsOnBread for frequency capping, billing accuracy, and fraud prevention. An expired storage record is replaced the next time the SDK runs and can also be removed by clearing extension storage or uninstalling. AdsOnBread also derives coarse country from the network request. This information is not used for behavioral advertising or cross-site profiling.",
      "Ads appear only inside the extension’s own popup and dashboard — never injected into x.com or any other website. AdsOnBread never receives your X account, following list, whitelist or history. See the AdsOnBread privacy policy for its retention schedule.",
    ],
    links: [{ label: "AdsOnBread privacy policy", href: "https://adsonbread.com/privacy" }],
  },
  {
    heading: "Permissions",
    paragraphs: ["Each permission the extension asks for, and why:"],
    list: permissions.map((permission) => `${permission.name} — ${permission.reason}`),
  },
  {
    heading: "Children",
    paragraphs: [
      "Not directed at children under 13; no information is knowingly collected from anyone.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "For questions about this policy or the extension, message @igfrostt on Telegram.",
    ],
    links: [support],
  },
];
