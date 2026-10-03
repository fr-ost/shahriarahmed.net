/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  X Mass Unfollow — the Chrome extension's page and privacy policy.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Shown at /projects/x-mass-unfollow and /projects/x-mass-unfollow/privacy.
 *  Everything here comes from the extension itself (version 7.0.0): its
 *  manifest, settings, help text, donate page and privacy policy. Update it
 *  with each release, keeping `version` and `xMassUnfollowPrivacyUpdated` in
 *  step with the extension.
 */

import type { ImageAsset, LegalSection, ProductPermission, ProductShowcase } from "@/lib/types";

const folder = "/images/x-mass-unfollow";

function screenshot(file: string, alt: string): ImageAsset {
  return { src: `${folder}/${file}`, alt, width: 1280, height: 800 };
}

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

export const xMassUnfollow: ProductShowcase = {
  name: "X Mass Unfollow",
  fullName: "X (Twitter) Mass Unfollow Tool – Free & Unlimited",
  tagline: "Free & Unlimited",
  description:
    "Free & unlimited X (Twitter) mass unfollow tool. Bulk unfollow, clean your following list, and remove non-followers with ease.",
  version: "7.0.0",
  minimumChrome: "116",
  storeUrl:
    "https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl",
  support,
  logo: {
    src: `${folder}/x-mass-unfollow-logo.svg`,
    alt: "X Mass Unfollow",
    width: 128,
    height: 128,
  },
  icon: {
    src: `${folder}/x-mass-unfollow-icon.png`,
    alt: "X Mass Unfollow",
    width: 128,
    height: 128,
  },
  hero: screenshot(
    "x-mass-unfollow-non-followers.webp",
    "The X Mass Unfollow popup: 1.8K following, 432 accounts that don’t follow back and 1.4K mutuals, with one button to unfollow the non-followers",
  ),
  shareImage: {
    src: `${folder}/x-mass-unfollow-og.jpg`,
    alt: "X Mass Unfollow — see who doesn’t follow you back on X, and unfollow them in one click",
    width: 1200,
    height: 630,
  },
  facts: [
    { label: "Price", value: "Free" },
    { label: "Version", value: "7.0.0" },
    { label: "Requires", value: "Chrome 116+" },
    { label: "Works on", value: "x.com" },
  ],
  steps: [
    {
      title: "Scan",
      description:
        "Reads your following list straight from X and marks who follows you back. Nothing changes.",
    },
    {
      title: "Review",
      description:
        "Unfollow all non-followers in one click, or pick exactly who goes. Protect anyone with the whitelist.",
    },
    {
      title: "Relax",
      description:
        "It works in the background at a safe pace, takes breaks, respects your daily limit and backs off if X asks.",
    },
  ],
  features: [
    {
      title: "See who doesn’t follow back",
      description:
        "One scan of your whole following list shows who doesn’t follow you back, and who does. It’s read-only: nobody is unfollowed until you say so.",
      icon: "scan",
    },
    {
      title: "Bulk unfollow in one click",
      description:
        "Unfollow every non-follower at once — or everyone you follow. Your whitelist and Keep rules are always respected.",
      icon: "unfollow",
    },
    {
      title: "Review & pick",
      description:
        "Search, filter and sort your following list, select exactly who goes, and unfollow just that selection.",
      icon: "filter",
    },
    {
      title: "Whitelist",
      description:
        "Protect friends and favourites. Whitelisted accounts are never unfollowed, in any mode, ever.",
      icon: "shield",
    },
    {
      title: "Keep rules",
      description:
        "Automatically keep verified accounts, private accounts, big accounts, or anyone whose name, handle or bio contains a keyword.",
      icon: "rules",
    },
    {
      title: "Runs in the background",
      description:
        "Switch tabs or close the popup: the extension keeps the run going by itself and shows progress on its icon.",
      icon: "background",
    },
    {
      title: "Safe pacing",
      description:
        "Random delays, regular breaks and a daily limit that picks up again on its own as the 24-hour window frees up.",
      icon: "pacing",
    },
    {
      title: "History",
      description: "See everyone the extension unfollowed, and when. Kept on your device.",
      icon: "history",
    },
    {
      title: "CSV export & import",
      description:
        "Export non-followers, selections, your whitelist and history — or import a list of handles to unfollow exactly those accounts.",
      icon: "csv",
    },
    {
      title: "Private by design",
      description:
        "No sign-up and no analytics. Your following list, whitelist and history stay on your device.",
      icon: "lock",
    },
    {
      title: "Light & dark",
      description: "A clean popup and full dashboard, in light or dark or matching your system.",
      icon: "theme",
    },
    {
      title: "Emergency stop",
      description: "Press Alt + Shift + S anywhere in Chrome to stop everything at once.",
      icon: "stop",
    },
  ],
  spotlights: [
    {
      id: "review-and-pick",
      eyebrow: "Review & pick",
      title: "Choose exactly who goes — and who stays",
      description:
        "The dashboard lists everyone you follow, with their followers, posts and join date. Search, filter and multi-select, then unfollow just your selection. One tap on the shield protects anyone forever.",
      points: [
        "Search by name, @handle or bio.",
        "Tabs for Don’t follow back, Mutuals, All, Kept and Unfollowed.",
        "Filters for no photo, under 10 posts, under 50 followers, following 10× more than followed, verified and private.",
        "Sort by newest or oldest follows, name, most or fewest followers, fewest posts, or newest accounts.",
        "Keep, export or unfollow a whole selection at once.",
      ],
      image: screenshot(
        "x-mass-unfollow-review-and-pick.webp",
        "The X Mass Unfollow dashboard: the Following table with filter tabs, filters and selected accounts ready to unfollow",
      ),
    },
    {
      id: "safe-pacing",
      eyebrow: "Safe pacing",
      title: "Runs in the background. Safely.",
      description:
        "Switch tabs, close the popup and keep working — it carries on at a human pace. Each unfollow is the same request X’s own Unfollow button sends, made one at a time from your own signed-in browser.",
      points: [
        "Random gaps between unfollows, the occasional longer pause, and regular breaks.",
        "A daily limit over a rolling 24 hours: when it is reached, the run rests and continues automatically.",
        "If X says to slow down, it rests and tries again later — waiting longer if it keeps happening.",
        "If X asks you to verify your account, or you sign out or switch accounts, it stops and waits for you.",
        "Live progress: who is next, the time left, and a counter on the extension icon.",
      ],
      image: screenshot(
        "x-mass-unfollow-safe-pacing.webp",
        "X Mass Unfollow running in the background: 127 of 408 accounts unfollowed, the next account up and the time left",
      ),
    },
    {
      id: "dashboard",
      eyebrow: "Dashboard",
      title: "Your whole following list, at a glance",
      description:
        "The overview shows who you follow, who doesn’t follow you back, your mutuals and today’s unfollows — next to the current run and a live activity feed. In light, in dark, or matching your system.",
      points: [
        "Live counts: following, don’t follow back, mutuals and unfollowed today.",
        "The current run, with pause and stop, and every unfollow in the activity feed.",
        "Whitelist, history, list import and settings, one click away.",
        "A connection check that tests each step on X without changing anything.",
      ],
      image: screenshot(
        "x-mass-unfollow-light-and-dark.webp",
        "X Mass Unfollow in dark mode: the dashboard overview with stats, the unfollow run and the activity feed, beside the popup",
      ),
    },
    {
      id: "privacy",
      eyebrow: "Free · Unlimited · Private",
      title: "Free. Unlimited. Private.",
      description:
        "No paywall, no premium tier and no sign-up — every feature is free. The extension works inside the X session you are already signed into, and keeps your data on your device.",
      points: [
        "Never asks for your password, and never signs in for you.",
        "Reads your list and unfollows by talking only to X: x.com, and abs.twimg.com for X’s own app files.",
        "Your settings, whitelist, scan and history are stored on your device only.",
        "No analytics, telemetry or tracking: the developer receives nothing about you or your X account.",
        "Delete everything at any time from Settings, or by removing the extension.",
      ],
      image: screenshot(
        "x-mass-unfollow-free-and-private.webp",
        "X Mass Unfollow features — whitelist, Keep rules, history, CSV export, list import and privacy — beside the popup after a finished run",
      ),
    },
  ],
  presets: [
    {
      name: "Safe",
      tag: null,
      delay: "15–35 s",
      breaks: "10 min every 30",
      dailyLimit: "Up to 250",
    },
    {
      name: "Balanced",
      tag: "Recommended",
      recommended: true,
      delay: "8–20 s",
      breaks: "6 min every 50",
      dailyLimit: "Up to 400",
    },
    {
      name: "Fast",
      tag: "X Premium",
      delay: "4–10 s",
      breaks: "5 min every 80",
      dailyLimit: "Up to 1,000",
    },
    {
      name: "Custom",
      tag: null,
      delay: "Your choice",
      breaks: "Your choice",
      dailyLimit: "Your choice",
    },
  ],
  presetsNote:
    "X limits accounts that follow or unfollow too quickly — usually around 400 actions a day on a free account, and about 1,000 with Premium. Slower is safer. Changes apply to the next unfollow, even mid-run.",
  adsNote:
    "To stay free, the extension shows one contextual ad from AdsOnBread in its own popup and dashboard — never on x.com or any other website. AdsOnBread receives a random pseudonymous token, your browser language, impressions and clicks, but never your X account, following list, whitelist or history.",
  permissions,
  whatsNew: [
    "A new engine reads and unfollows with direct requests instead of scrolling the page, so a run keeps going while the X tab is in the background.",
    "Runs are managed by the extension itself, so they carry on through tab switches, page reloads and closing the popup.",
    "New light and dark themes, or follow your system setting.",
    "Your settings, whitelist and history carry over from version 6 automatically.",
  ],
  faqs: [
    {
      question: "Is X Mass Unfollow free?",
      answer:
        "Yes. Every feature — bulk unfollow, review tools, whitelist, history, CSV import and export — is free and unlimited, with no subscription, paywall or sign-up. The popup and dashboard show a small ad, and donations are welcome but optional.",
    },
    {
      question: "How do I see who doesn’t follow me back on X?",
      answer:
        "Add the extension to Chrome, sign in to x.com, then open the extension and scan. It reads your following list from X and shows how many accounts don’t follow you back, and who they are. The scan is read-only: nobody is unfollowed until you say so.",
    },
    {
      question: "Does it need my X password?",
      answer:
        "No. It works inside the X session you are already signed into in Chrome. It never asks for your password, never signs in for you, and never sends your X account data to the developer or anyone else.",
    },
    {
      question: "Is it safe for my account?",
      answer:
        "It sends the same requests X’s own Unfollow button sends, from your own signed-in browser, one at a time with random gaps and regular breaks. If X ever says to slow down, it rests automatically and continues later. If X asks you to verify your account, it stops and waits for you. No one else ever gets your login.",
    },
    {
      question: "How many accounts can I unfollow in a day?",
      answer:
        "X commonly limits accounts to around 400 follow or unfollow actions a day — about 1,000 with X Premium. The default Balanced speed stops at 400 a day, Safe at 250 and Fast at 1,000, and you can set your own limit in Settings. When the limit is reached, the run rests and continues on its own as the 24-hour window frees up.",
    },
    {
      question: "Does it keep going if I switch tabs or close the popup?",
      answer:
        "Yes. The run is driven by the extension itself, not by the page, so you can browse, switch tabs or close the popup. Keep at least one X tab open — if none is open, the extension opens one in the background. If you quit Chrome, the run pauses; press Resume next time.",
    },
    {
      question: "Can I keep some accounts?",
      answer:
        "Yes. Add anyone to the whitelist with their handle or profile link, or tap the shield next to them; whitelisted accounts are never unfollowed. Keep rules can also keep verified accounts, private accounts, accounts above a follower count, and anyone whose name, handle or bio contains a keyword.",
    },
    {
      question: "Why is someone who follows me listed as a non-follower?",
      answer:
        "Run a fresh scan — follows change all the time. Add anyone you want to keep to the whitelist; whitelisted accounts are never unfollowed.",
    },
    {
      question: "Can I export my following list?",
      answer:
        "Yes. Export the list you are viewing — your non-followers, for example — or just your selection to a CSV file, with each account’s handle, name, profile link, whether they follow you, followers, following, posts, verified and private status, join date and bio. Your whitelist and unfollow history export too.",
    },
    {
      question: "What does “profile mode” mean?",
      answer:
        "If X ever rejects direct requests, the extension switches to opening each profile in a background tab and pressing Unfollow there, just like you would. It’s slower, but keeps working.",
    },
    {
      question: "How do I stop it immediately?",
      answer:
        "Press Alt + Shift + S anywhere in Chrome to stop immediately. You can also pause, resume or stop a run from the popup or the dashboard.",
    },
    {
      question: "Which browser does it work in?",
      answer:
        "X Mass Unfollow is an extension for Google Chrome, version 116 or later, installed from the Chrome Web Store. It works on x.com while you are signed in.",
    },
  ],
  donationsIntro:
    "No subscriptions, no paywalls, no premium tier: every feature is free and unlimited because people who find it useful chip in. If it saved you an afternoon of clicking, a small tip keeps it alive.",
  donations: [
    {
      network: "EVM networks",
      coins: "ETH, USDT, BNB, AVAX and more",
      address: "0x257F291514AaAa1533832cC2C8981Cc14063ED17",
      note: "One address for Ethereum, BNB Smart Chain, Avalanche C-Chain and other EVM chains.",
    },
    {
      network: "Solana",
      coins: "SOL and Solana tokens",
      address: "GwwZWYxzms9ebEWQNCAJrPSQdsN6SVPGbpMwCYomWqWa",
      note: "Solana network only.",
    },
    {
      network: "Bitcoin",
      coins: "BTC",
      address: "bc1qg6clyevlmfekg3rkyhlk5ggeh3g6dnt5sdje4j",
      note: "Bitcoin network only — Native SegWit (bc1).",
    },
  ],
  donationsNote:
    "Always double-check the network before you send. Crypto sent on the wrong network can’t be recovered.",
  disclaimer:
    "X Mass Unfollow is an independent product of Unique Labs and is not affiliated with or endorsed by X Corp. X and Twitter are trademarks of X Corp.; Chrome and the Chrome Web Store are trademarks of Google LLC.",
};

/* ── Privacy policy of the extension ────────────────────────────────────── */
/*  The same text as privacy.html inside the extension.                     */

export const xMassUnfollowPrivacyUpdated = { label: "2 October 2026", dateTime: "2026-10-02" };

export const xMassUnfollowPrivacy: LegalSection[] = [
  {
    heading: "What the extension does",
    paragraphs: [
      "X Mass Unfollow helps you find accounts on X that don’t follow you back and unfollow them. It works inside your own browser, using the X session you are already signed into. It never asks for your password, never signs in for you, and never sends your X account data to the developer or any other third party.",
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
