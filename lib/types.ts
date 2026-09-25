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
  | "analysis";

export interface Link {
  label: string;
  href: string;
}

export type SocialId = "github" | "linkedin" | "x" | "email";

export interface SocialLink {
  id: SocialId;
  label: string;
  /** Display handle, derived from the profile URL. */
  handle: string;
  href: string;
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
  /** Optional part of the title rendered in the italic serif accent. */
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

export interface ResearchProject {
  id: string;
  label: string;
  context: string;
  title: string;
  summary: string;
  objective: string;
  model: string;
  techniques: string[];
  techniqueGroups: { name: string; techniques: string[] }[];
  focus: string[];
  /** e.g. "Ongoing" or "Completed". `null` renders a placeholder. */
  status: string | null;
  /** DOI (without the https://doi.org/ prefix) of the related publication. */
  publicationDoi: string | null;
  /** Summary of findings. Leave `null` until you want to publish results. */
  findings: string | null;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  /** Human-readable date, e.g. "29 Nov 2025". `null` hides the date. */
  date: string | null;
  /** Machine-readable date for the <time> element, e.g. "2025-11-29". */
  dateTime?: string;
  /** Emphasise research outputs (presentations, publications). */
  highlight?: boolean;
  link?: Link;
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

export interface Project {
  id: string;
  name: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  /** e.g. "Active", "In development", "Completed". `null` renders a placeholder. */
  status: string | null;
  links: {
    github: string | null;
    demo: string | null;
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

export interface UniqueLabsInfo {
  name: string;
  tagline: string;
  founderRole: string;
  founderName: string;
  description: string;
  mission: string | null;
  whatWeBuild: string | null;
  products: UniqueLabsProduct[];
  focusAreas: string[];
  website: string | null;
  github: string | null;
  /** Falls back to the personal email when `null`. */
  contactEmail: string | null;
}
