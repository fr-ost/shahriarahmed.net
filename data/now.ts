/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  /now — what I am working on at the moment.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Update `updated` whenever this list changes; the page shows it. Keep
 *  every line factual, and the current research confidential until it is
 *  published.
 */

import type { Link } from "@/lib/types";

export const nowUpdated = { label: "22 November 2026", dateTime: "2026-11-22" };

export interface NowItem {
  title: string;
  text: string;
  link?: Link;
}

export const now: NowItem[] = [
  {
    title: "A Master’s in cancer biology",
    text: "Doing my Master’s in Biochemistry & Molecular Biology at the University of Rajshahi, with research in cancer biology. The details stay confidential until the work is published.",
    link: { label: "Research", href: "/research" },
  },
  {
    title: "Running Unique Labs",
    text: "Co-Founder & COO of Unique Labs: KOC and consultancy services, digital marketing and blockchain development.",
    link: { label: "Unique Labs", href: "/unique-labs" },
  },
  {
    title: "Building Chrome extensions",
    text: "Shipping and maintaining Unique Labs’ extensions — UnfollowX Pro, GrowX, Unique PDF, FrameShot, Twofold and Rowlio — with ScoreX and XAICG in beta.",
    link: { label: "Projects", href: "/projects" },
  },
  {
    title: "A daily brief for BCS candidates",
    text: "Sending current affairs notes in Bangla and three MCQs every morning at 8 AM through the @BCSNWZ_bot Telegram bot.",
    link: { label: "The bot", href: "/projects/bcs-newspaper-brief" },
  },
];

/** Recently finished, for context. */
export const recently: NowItem[] = [
  {
    title: "Completed my B.Sc. (Hons)",
    text: "Biochemistry & Molecular Biology, University of Rajshahi, 2021–2026.",
  },
  {
    title: "Published in the Journal of Molecular Structure",
    text: "Co-authored a paper on an azo–hydrazone compound and the cancer protein Mcl-1 (April 2026).",
    link: { label: "The paper, explained", href: "/research/mcl-1-azo-hydrazone-paper" },
  },
  {
    title: "Research member of CBCRO",
    text: "Computational Biosciences and Chemistry Research Organization, July 2025 – September 2026.",
  },
];
