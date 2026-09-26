/**
 * Content types for the portfolio.
 *
 * Convention: a value of `null` (or an empty array) means "not provided yet".
 * The UI renders a consistent placeholder for these instead of inventing
 * content, so you can fill them in later from `data/portfolio.ts`.
 */

export type IconKey =
  | "microscope"
  | "flask"
  | "building"
  | "paper"
  | "pin"
  | "chart"
  | "automation"
  | "bot"
  | "code"
  | "blocks"
  | "puzzle"
  | "handshake"
  | "megaphone"
  | "workflow";

export interface Link {
  label: string;
  href: string;
}

export type SocialId =
  | "scholar"
  | "orcid"
  | "github"
  | "linkedin"
  | "x"
  | "email"
  | "facebook"
  | "instagram"
  | "telegram"
  | "whatsapp";

/** Groups used to organise the links in the Contact section. */
export type SocialGroup = "research" | "professional" | "social";

export interface SocialLink {
  id: SocialId;
  label: string;
  /** Display handle, derived from the profile URL (or the username as supplied). */
  handle: string;
  /**
   * Profile URL. `null` when there is no public link, e.g. a WhatsApp
   * username: the handle is then shown with a copy button instead.
   */
  href: string | null;
  group: SocialGroup;
  /** Also shown in the compact icon rows in the hero and footer. */
  featured?: boolean;
}

export interface NavItem {
  /** Must match the `id` of a section on the page. */
  id: string;
  label: string;
}

export interface SectionMeta {
  /** Anchor id used in the URL, e.g. `#research`. */
  id: string;
  /** Small running number shown above the heading, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  /** Optional part of the title rendered in the accent colour. */
  titleAccent?: string;
  description?: string;
}

export interface LabeledValue {
  label: string;
  value: string;
}

export interface IdentityItem {
  label: string;
  value: string;
  detail?: string;
  icon: IconKey;
  href?: string;
}

/** Placeholder shown while current research is confidential. */
export interface CurrentResearch {
  label: string;
  context: string;
  title: string;
  description: string;
  /** Broad, public research areas only. */
  areas: string[];
}

export interface Publication {
  id: string;
  /** Publication status, e.g. "Published". */
  status: string;
  /** Bare DOI, e.g. "10.1016/j.molstruc.2026.146299". */
  doi: string;
  /** Authoritative link — use the https://doi.org/ URL. */
  url: string;
  title: string | null;
  authors: string[] | null;
  journal: string | null;
  year: number | null;
  abstract: string | null;
  /** Conference or event where the work was presented, if any. */
  presentedAt: string | null;
}

export interface Achievement {
  id: string;
  /** Short rank shown large, e.g. "1st". */
  rank: string;
  placement: string;
  title: string;
  event: string;
  institution: string;
  date: string;
  dateTime: string;
  description: string | null;
}

export type ProjectCategory = "AI" | "Web" | "Automation" | "Research" | "Tools";

/** One app in a project that groups several, e.g. a single bot or extension. */
export interface ProjectItem {
  name: string;
  description: string;
  href: string | null;
  /** Link text, e.g. "@sfchecker_bot" or "Chrome Web Store". */
  linkLabel: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  /**
   * e.g. "Live", "In development", "Completed". When `null`, projects with
   * `items` show how many they contain; others show a placeholder.
   */
  status: string | null;
  /** Key facts shown as a short list, e.g. { label: "Type", value: "Web app" }. */
  details?: LabeledValue[];
  /** Individual apps in this project, each with its own link. */
  items?: ProjectItem[];
  /** Singular noun for `items`, e.g. "bot" (shown as "03 bots"). */
  itemNoun?: string;
  links: {
    github: string | null;
    demo: string | null;
    /** Public website or live app. */
    website?: string | null;
    /** Optional in-page link, e.g. "#research". */
    internal?: Link | null;
  };
  icon: IconKey;
}

export type ExperienceCategory =
  | "Entrepreneurship"
  | "Academic"
  | "Research"
  | "Technology"
  | "Conferences"
  | "Projects";

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  categories: ExperienceCategory[];
  /** e.g. "2024 — Present". `null` hides the period. */
  period: string | null;
  /** Shows a "Current" marker. */
  current?: boolean;
  description: string;
  /** Renders as the prominent, highlighted entry. */
  featured?: boolean;
  link?: Link;
}

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string | null;
  status: string | null;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  skills: string[];
}

export interface UniqueLabsProduct {
  name: string;
  description: string;
  href: string | null;
}

/** A service or line of work shown under "What we build". */
export interface UniqueLabsService {
  title: string;
  description: string;
  icon: IconKey;
}

export interface UniqueLabsInfo {
  name: string;
  tagline: string;
  founderRole: string;
  founderName: string;
  description: string;
  mission: string | null;
  /** Services and lines of work. An empty list shows a placeholder. */
  whatWeBuild: UniqueLabsService[];
  products: UniqueLabsProduct[];
  focusAreas: string[];
  website: string | null;
  github: string | null;
  /** Falls back to the personal email when `null`. */
  contactEmail: string | null;
}
