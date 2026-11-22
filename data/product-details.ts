/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Product pages (/projects/<slug>): details of each Chrome extension.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Copied from the Unique Labs website (fr-ost/www.uniquelabs.org,
 *  `src/content/products.ts`): the Markdown description, features, pricing,
 *  stage, privacy policy and cover image. Keep in step with it, and with the
 *  summary data in data/products.ts.
 */

import type { ProductDetail } from "@/lib/types";

export const productDetails: Record<string, ProductDetail> = {
  "unfollowx-pro": {
    pricing: "FREE",
    stage: "AVAILABLE",
    description:
      "UnfollowX Pro shows you who doesn't follow you back on X (Twitter), who unfollowed you, and which accounts have gone quiet. Then it unfollows the ones you choose, at a safe pace, while you keep browsing. It's free, with no limits, no sign-up and no subscription.\n\n### How it works\n\n1. Open x.com and sign in as usual.\n2. Click the extension icon and press **Scan my following**. It takes about a minute and changes nothing.\n3. Look through the results and add anyone you want to keep to the whitelist.\n4. Press **Unfollow non-followers**, or open the dashboard and choose exactly who goes.\n\n### Safe by design\n\nX restricts accounts that unfollow too quickly, so UnfollowX Pro works at a human pace: random gaps between unfollows, regular breaks and a daily limit. Choose Safe, Balanced or Fast, or set your own numbers — and stop instantly at any time.\n\nWorks with both the new and the classic X website, in English, Spanish, Portuguese (Brazil), Hindi, Indonesian, Turkish and Arabic.",
    features: [
      {
        title: "Non-followers",
        description:
          "Lists everyone you follow who doesn't follow you back — unfollow them all in one click, or only the ones you pick.",
      },
      {
        title: "Who unfollowed you",
        description: "Each scan shows who left, who's new and who you haven't followed back yet.",
      },
      {
        title: "Inactive accounts",
        description:
          "Finds accounts that haven't posted in 30 days, 90 days, 6 months or a year, and accounts without a blue check.",
      },
      {
        title: "Whitelist & rules",
        description:
          "Keep the people you care about, plus whole groups such as verified, private or recently followed accounts.",
      },
      {
        title: "Choose exactly who goes",
        description:
          "Search, filter, save selections as groups, export to CSV or import a list of handles.",
      },
      {
        title: "Safe pacing",
        description:
          "Random gaps, regular breaks and a daily limit; it keeps working in the background and stops instantly when you ask.",
      },
      {
        title: "Undo mistakes",
        description: "Follow people back, or re-follow anyone you removed by mistake from History.",
      },
      { title: "Free & private", description: "No limits, no sign-up and no subscription." },
    ],
    privacyPolicy: "https://www.unfollowx.com/privacy",
    cover: {
      src: "/images/products/covers/unfollowx-pro.webp",
      alt: "UnfollowX Pro: unfollow everyone who doesn't follow you back",
      width: 1400,
      height: 560,
    },
  },
  growx: {
    pricing: "FREEMIUM",
    stage: "AVAILABLE",
    description:
      "GrowX is the all-in-one X (Twitter) growth tool for Chrome: smart auto follow, a post scheduler, an on-device AI writer, analytics, an unfollower tracker and cleanup — in one extension.\n\n### Free forever, with an optional Premium\n\nThe free plan includes the Safe and Balanced auto-follow paces, sources and core filters, and scheduling with up to 10 posts waiting. Premium adds faster paces and more room, with a free 30-day trial and no credit card required.",
    features: [
      {
        title: "Smart auto follow",
        description:
          "Grow your audience from the sources you choose, with filters and safe daily paces.",
      },
      {
        title: "Post scheduler",
        description: "Queue posts and threads to go out at the right time.",
      },
      { title: "On-device AI writer", description: "Draft posts with the GrowX AI writer." },
      { title: "Analytics", description: "Track followers and growth over time." },
      { title: "Unfollower tracker", description: "See who unfollowed you." },
      { title: "Cleanup", description: "Tidy up the accounts you follow." },
    ],
    privacyPolicy: "https://www.growxapp.org/privacy",
    cover: {
      src: "/images/products/covers/growx.webp",
      alt: "GrowX: the ultimate X growth tool",
      width: 1400,
      height: 560,
    },
  },
  "unique-pdf": {
    pricing: "FREE",
    stage: "AVAILABLE",
    description:
      "Unique PDF brings 20 PDF tools into a full-tab application, including **Unique AI**: chat with any PDF (answers link to the pages they come from) and get an AI summary.\n\nEvery file is processed in your browser — nothing is uploaded, there is no account, no quota, no watermark and no tracking. It keeps working offline once installed.",
    features: [
      {
        title: "Unique AI",
        description:
          "Chat with any PDF, with clickable page citations, and get key points and a TL;DR summary.",
      },
      {
        title: "Organize",
        description: "Merge, split, reorder, rotate, delete and extract pages.",
      },
      {
        title: "Convert",
        description: "Compress PDFs, turn images into PDFs and PDFs into images.",
      },
      {
        title: "Edit & sign",
        description: "Add text, drawings, highlights, shapes and images; sign and watermark.",
      },
      {
        title: "Security",
        description: "Protect with AES-256, unlock, redact for real and edit metadata.",
      },
      {
        title: "Private by design",
        description:
          "Files never leave your device — no uploads, account, quota or watermark, and it works offline.",
      },
    ],
    cover: {
      src: "/images/products/covers/unique-pdf.webp",
      alt: "Unique PDF: the free PDF editor with AI chat",
      width: 1400,
      height: 560,
    },
  },
  frameshot: {
    pricing: "FREE",
    stage: "AVAILABLE",
    description:
      "FrameShot is a local-first Chrome extension for capturing, recording, editing, organising and exporting what's on your screen. It pairs a quick-capture toolbar popup with **FrameShot Studio**, a full application that opens in its own tab.\n\nEvery feature is available to everyone: no paid plans, subscriptions, watermarks, time limits, accounts, ads or locked features. Screenshots and recordings stay on your device.",
    features: [
      {
        title: "Full-page capture",
        description:
          "Scroll-and-stitch the whole page, with sticky headers placed once and lazy-loaded content loaded first.",
      },
      {
        title: "Area, element & panel",
        description:
          "Capture the visible area, a selection, any page element or the full content of a scrolling panel.",
      },
      {
        title: "Screen recorder",
        description:
          "Record a tab, a window or the whole screen with tab audio, microphone and a camera bubble.",
      },
      {
        title: "MP4, WebM & GIF",
        description: "Export recordings from 720p to 4K, or trim them into a GIF.",
      },
      {
        title: "Annotate & blur",
        description: "Edit captures in FrameShot Studio before you share them.",
      },
      {
        title: "Free & local",
        description: "No watermark, no sign-up, no limits — everything stays on your device.",
      },
    ],
    cover: {
      src: "/images/products/covers/frameshot.webp",
      alt: "FrameShot: free screen recorder and full-page screenshot",
      width: 1400,
      height: 560,
    },
  },
  twofold: {
    pricing: "FREE",
    stage: "AVAILABLE",
    description:
      "Twofold puts your two-factor codes one click away: TOTP, HOTP and Steam Guard codes, smart autofill that only matches a service's real domains, and a built-in passkey authenticator — all in one Chrome extension.\n\nBackups are password-encrypted, and sync through Chrome Sync or Google Drive is end-to-end encrypted with your master password. Free forever, with no ads, no tracking and no runtime dependencies.",
    features: [
      {
        title: "Codes",
        description: "TOTP, HOTP and Steam Guard, with live countdowns and one-click copy.",
      },
      { title: "Smart autofill", description: "Detects 2FA fields and fills the right code." },
      {
        title: "Phishing-resistant",
        description:
          "Known services only match their real domains, so look-alike sites never get your codes.",
      },
      {
        title: "Passkeys",
        description: "A built-in FIDO2/WebAuthn authenticator that works on any site.",
      },
      {
        title: "Easy import",
        description:
          "Scan a QR code or import from Google Authenticator, Aegis, 2FAS, Bitwarden and more.",
      },
      {
        title: "Encrypted backup & sync",
        description:
          "Password-encrypted backups, plus end-to-end encrypted Chrome Sync or Google Drive.",
      },
    ],
    cover: {
      src: "/images/products/covers/twofold.webp",
      alt: "Twofold: 2FA codes, autofill and passkeys",
      width: 1400,
      height: 560,
    },
  },
  rowlio: {
    pricing: "FREE",
    stage: "AVAILABLE",
    description:
      "Rowlio turns tables, product listings, search results, links, images, contact details and page metadata into clean rows you can review, tidy up and export to CSV, Excel, JSON, JSON Lines, TSV, Markdown or HTML.\n\nEverything happens inside your browser: no account, no server, no usage limits and no premium tier.\n\n### From page to file in three steps\n\n1. Open a page and let Rowlio show what it contains — tables, lists, links and images.\n2. Click one item and Rowlio finds the similar ones, with the fields inside them. Or use CSS selectors and XPath for full control.\n3. Review and clean the rows, then export them in the format you need.\n\nPagination, infinite scroll and batch runs over a list of URLs are always started by you and bounded, with progress and a Stop button.",
    features: [
      {
        title: "Tables, done properly",
        description:
          "Finds every table on a page and handles multi-row headers, merged cells and nested tables.",
      },
      {
        title: "Visual selector",
        description:
          "Click one item and Rowlio finds the similar ones and their fields — title, price, image, link, rating and more.",
      },
      {
        title: "CSS & XPath",
        description:
          "Advanced selectors with validation, match counts, previews and on-page highlighting.",
      },
      {
        title: "Pagination & infinite scroll",
        description:
          "Follow next links, page numbers or your own selector — always user-started, bounded and stoppable.",
      },
      {
        title: "Batch URLs",
        description:
          "Run one extraction over a list of pages you supply; every row records the page it came from.",
      },
      {
        title: "Clean before you export",
        description:
          "Edit, sort, filter, remove duplicates, split and combine columns, with full undo and redo.",
      },
      {
        title: "Links, images & contacts",
        description:
          "Extract links, images, email addresses, phone numbers, social profiles, metadata and structured data.",
      },
      {
        title: "Export anywhere",
        description: "CSV, XLSX, JSON, JSON Lines, TSV, Markdown, HTML or the clipboard.",
      },
      {
        title: "100% local",
        description: "No account, no server, no limits — your data never leaves your browser.",
      },
    ],
    privacyPolicy: "https://rowlio.uniquelabs.org/privacy",
    cover: {
      src: "/images/products/covers/rowlio.webp",
      alt: "Rowlio: turn any webpage into structured data",
      width: 1400,
      height: 560,
    },
  },
  scorex: {
    pricing: "UNSPECIFIED",
    stage: "BETA",
    description:
      "ScoreX helps you grow your influencer score on X (Twitter) by showing up in the right conversations, every day, in your own voice. Influencer and smart-follower scores rise when respected accounts notice and follow you — ScoreX makes that work steady and manageable.\n\n### Four steps, then it runs every day\n\n1. **Pick your targets.** Paste usernames or import a CSV.\n2. **ScoreX watches for posts.** When a target posts, it drafts a short reply that adds something the author would want to answer.\n3. **You approve.** Edit, skip or approve each draft — or switch to Full auto and it posts inside your daily limits.\n4. **Track follow-backs.** See who followed back, after how many replies, and which tones work best.\n\n### Careful by default\n\nScoreX runs in your own logged-in X tab and never asks for your password. Review mode is the default, with hard daily caps, human-like pacing and breaks. It stops on X warnings such as a captcha or rate limit.\n\n### Good to know\n\nScoreX is invite only for now and needs a license key from Unique Labs. Replies are written with your own OpenAI API key. It cannot guarantee follow-backs or a higher score, and you are responsible for using it in line with X's rules. ScoreX is not affiliated with or endorsed by X Corp.",
    features: [
      {
        title: "Replies worth answering",
        description:
          "Each reply takes one clear approach — a sharp question, an honest doubt, a concrete example — and weak drafts are rewritten.",
      },
      {
        title: "In your voice",
        description:
          "Replies follow your tone prompt and learn from your edits. No generic praise, no invented facts.",
      },
      {
        title: "You approve",
        description: "Review mode by default: nothing posts until you approve it.",
      },
      {
        title: "Spend replies where they pay off",
        description:
          "Follows an account before replying, stops once it follows back, and skips accounts that almost never do.",
      },
      {
        title: "Score tracking",
        description:
          "Your TwitterScore, Sorsa, Ethos and Moni scores over time, and the scores of your targets.",
      },
      {
        title: "Smart follower finder",
        description:
          "Scan big accounts for their smart followers and add the best ones as targets.",
      },
      {
        title: "Learns what works",
        description: "Stats by tone, model and tier show which replies bring follow-backs.",
      },
      {
        title: "Your data stays with you",
        description:
          "Targets, history and keys stay in your browser, with real cost tracking for your OpenAI usage.",
      },
    ],
    privacyPolicy: "https://scorex.uniquelabs.org/privacy",
    cover: {
      src: "/images/products/covers/scorex.webp",
      alt: "ScoreX: get followed back by the accounts that move your score",
      width: 1400,
      height: 560,
    },
  },
  xaicg: {
    pricing: "FREE",
    stage: "BETA",
    description:
      'XAICG is a free AI reply generator for X (Twitter). It adds an **AI Reply** button to every post, writes a comment that sounds like you, and types it into the reply box so you can read it, edit it and post it yourself. Free forever, with no daily limit, no sign-up and no API key.\n\n### Free, unlimited and private\n\nMost AI writing tools send your text to a server and pay for every request, so they limit you or charge you. XAICG\'s AI runs on your own computer instead. A draft costs nothing to make, so there are no plans, no credits, no trial and no ads. Because the writing happens on your device, the post you answer, your persona and your drafts never leave your computer.\n\n### How it works\n\n1. Add XAICG to Chrome.\n2. Press **Set up** once. The AI model is downloaded to your computer, which takes a few minutes.\n3. Open x.com. Every post now has an **AI Reply** button and a **Question** button.\n4. Click one. A draft appears in X\'s reply box. Change anything you like and press Reply.\n\nNothing is ever posted for you.\n\n### What you can do\n\n- Reply to any post with one click; each click brings back several drafts, and "Try another" steps through them\n- Ask one short, specific question about a post — generic questions like "Thoughts?" are filtered out\n- Pick a tone — casual, witty, supportive, skeptical, analytical, blunt, technical or professional — or let Auto fit the post\n- Copy a line for a quote post\n- Write original posts in three lengths, turn one idea into a thread of three to eight posts, or rewrite a draft of your own while keeping your facts, names and links\n- Write in English, Spanish, German, French or Japanese, or match the language of each post\n\n### Sounds like you\n\nXAICG avoids the usual signs of machine writing: no generic praise, no hype words, no hashtags or links you did not ask for, no summarizing the post back to its author. Describe your voice in your own words or start from a preset, and choose a default tone, reply length and emoji preference. It remembers your last 30 drafts on your computer so new ones do not repeat themselves.\n\n### What your computer needs\n\nBecause the AI runs on your own computer, it needs a reasonably capable one: desktop Google Chrome on Windows 10 or 11, macOS 13 or later, Linux or a Chromebook Plus; about 22 GB of free disk space; and a graphics card with more than 4 GB of memory, or 16 GB of memory and 4 processor cores. The settings page tells you straight away whether your computer can run it. Phones and tablets are not supported.\n\n### Good to know\n\nXAICG reads only the post you click — never your messages, followers or password — and it cannot post, like or follow for you. To count how many people use it, it reports only that an install exists and how many drafts of each kind it wrote, never what they say. XAICG is an independent product and is not affiliated with or endorsed by X Corp.',
    features: [
      {
        title: "Free and unlimited",
        description:
          "Free forever, with every feature included. No plans, no credits, no trial, no ads and no daily limit.",
      },
      {
        title: "Private by design",
        description:
          "Drafts are written on your own computer. The post, your persona and your drafts never leave it.",
      },
      {
        title: "No sign-up, no API key",
        description: "Install it, press Set up once, and start replying.",
      },
      {
        title: "One click on any post",
        description:
          "AI Reply and Question buttons sit on every post; the draft lands in X's own reply box.",
      },
      {
        title: "A tone for the moment",
        description:
          "Auto fits each post, or pick casual, witty, supportive, skeptical, analytical, blunt, technical or professional.",
      },
      {
        title: "Posts, threads and rewrites",
        description:
          "The toolbar popup turns a rough idea into posts or a thread, and tightens drafts you wrote.",
      },
      {
        title: "Sounds like you",
        description:
          "No generic praise, hype words or invented hashtags; your voice, tone, length and emoji settings apply to everything.",
      },
      {
        title: "You stay in control",
        description: "Nothing is ever posted for you. A copy-only mode never touches the page.",
      },
    ],
    privacyPolicy: "https://xaicg.uniquelabs.org/privacy",
    support: "https://xaicg.uniquelabs.org/support",
    cover: {
      src: "/images/products/covers/xaicg.webp",
      alt: "XAICG: free AI replies for X, in your own voice",
      width: 1400,
      height: 560,
    },
  },
  uniquefarm: {
    pricing: "UNSPECIFIED",
    stage: "PRIVATE",
    description:
      "**Proprietary and private.** UniqueFarm is proprietary software for private use. No external license is sold separately right now.\n\nUniqueFarm is a Chrome side-panel for X (Twitter). It reads the real post — text, images, quoted tweets and linked articles — writes a reply in your voice with your own OpenAI key, and posts it with human timing, breaks and a review hold. You can stop everything in one click.\n\n### Four tools, one voice\n\n- **Automate.** Paste post links and press Start. It cleans and de-duplicates the list, opens each post in its own tab, likes, reads, writes and posts. One slider mixes short replies, deeper takes and genuine questions.\n- **Reply Guy.** Answers everyone under your own post: likes each comment and replies as the author, skipping your own replies and anyone you already answered.\n- **KOL Engage.** Give it profile links. It finds their recent original posts and likes, bookmarks, reposts or comments on them — never on their replies or threads.\n- **Home Feed.** Works your For-you feed with one comment per top-level post, skipping ads, your own posts and anything already done.\n\nPrefer to stay hands-on? Manual **REP · D · QS · RG** buttons on every post draft a reply, a deeper take, a question or an author reply. You read it, you press Post.\n\n### Built to behave\n\n- **Stop means stop.** Every tool halts within a second, the comment being written is cancelled before it posts, and a stopped run never resumes by itself.\n- **Review hold.** The finished comment sits in the box for a few seconds so you can read or edit it first.\n- **Never the wrong box.** Replies go through the post's own reply composer; if it does not open, the item is skipped.\n- **Human timing.** Random read time, randomized delays and breaks after every batch.\n- **Dedup memory.** It remembers every post it commented on, so nothing is answered twice.\n- **Cost guard.** Hard caps on daily and monthly OpenAI spend.\n\n### Good to know\n\nUniqueFarm is proprietary software for private use. The extension is live on the Chrome Web Store, but it only unlocks with an access key, and license sales have not started yet — no external license is sold separately right now. It works with your own OpenAI API key, and replies are billed to that OpenAI account. Your key, settings, reply history and dedup memory stay on your device; the extension never asks for your X password. It needs Chrome 116 or newer.",
    features: [
      {
        title: "Automate",
        description:
          "Paste links, press Start. Mix short replies, deeper takes and genuine questions with one slider.",
      },
      {
        title: "Reply Guy",
        description: "Answer everyone under your own post, skipping anyone you already answered.",
      },
      {
        title: "KOL Engage",
        description:
          "Like, bookmark, repost or comment on the recent original posts of the creators you choose.",
      },
      {
        title: "Home Feed",
        description:
          "Work your For-you feed, one comment per top-level post, skipping ads and your own posts.",
      },
      {
        title: "Human timing",
        description:
          "Random read time, randomized delays, breaks after every batch and a review hold before posting.",
      },
      {
        title: "Dedup memory",
        description:
          "Remembers every post it commented on and survives reinstalls. Export, import or sync it.",
      },
      {
        title: "Stats and cost guard",
        description:
          "Live progress, per-tool stats, token usage and daily or monthly spend caps on your OpenAI key.",
      },
      {
        title: "A real Stop button",
        description: "One click halts every tool within a second, and nothing more gets posted.",
      },
    ],
    privacyPolicy: "https://farm.uniquelabs.org/privacy",
    cover: {
      src: "/images/products/covers/uniquefarm.webp",
      alt: "UniqueFarm: grow on X without sounding like a bot",
      width: 1400,
      height: 560,
    },
  },
};
