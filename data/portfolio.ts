/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Portfolio content — the single source of truth for the website.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Edit this file to update the site; components only render what is here.
 *
 *  Placeholders: any field set to `null` (or an empty array) is treated as
 *  "not provided yet" and renders a consistent "Coming soon" style
 *  placeholder. Replace the `null` with real content when it is available.
 *
 *  Nothing below should be invented — only add verified information.
 */

import type {
  Achievement,
  CurrentResearch,
  EducationEntry,
  ExperienceEntry,
  IdentityItem,
  LabeledValue,
  NavItem,
  Project,
  ProjectCategory,
  Publication,
  SectionMeta,
  SkillGroup,
  SocialLink,
  UniqueLabsInfo,
} from "@/lib/types";

/* ── Site & SEO ─────────────────────────────────────────────────────────── */

export const site = {
  url: "https://shahriarahmed.net",
  domain: "shahriarahmed.net",
  title: "Shahriar Ahmed — Biochemistry & Molecular Biology Researcher & Co-Founder",
  description:
    "Shahriar Ahmed is a Biochemistry & Molecular Biology researcher, Co-Founder of Unique Labs, and technology enthusiast working across molecular research, cancer biology, AI, software, and automation.",
  locale: "en_US",
  keywords: [
    "Shahriar Ahmed",
    "Unique Labs",
    "Co-Founder",
    "Biochemistry",
    "Molecular Biology",
    "Cancer Biology",
    "University of Rajshahi",
    "Researcher",
    "AI",
    "Automation",
    "Rajshahi",
    "Bangladesh",
  ],
} as const;

/* ── Personal information ───────────────────────────────────────────────── */

export const person = {
  name: "Shahriar Ahmed",
  givenName: "Shahriar",
  familyName: "Ahmed",
  /** Professional title, shown prominently across the site. */
  title: "Co-Founder, Unique Labs",
  jobTitle: "Co-Founder",
  company: "Unique Labs",
  field: "Biochemistry & Molecular Biology",
  institution: "University of Rajshahi",
  email: "shahriar.bmb@gmail.com",
  location: {
    city: "Rajshahi",
    country: "Bangladesh",
    countryCode: "BD",
    coordinates: "24.37° N, 88.60° E",
  },
  portrait: {
    src: "/images/shahriar-ahmed.webp",
    alt: "Portrait of Shahriar Ahmed",
  },
} as const;

/* ── Social links (use these URLs exactly) ──────────────────────────────── */

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "fr-ost",
    href: "https://github.com/fr-ost",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "shahriar-bmb",
    href: "https://www.linkedin.com/in/shahriar-bmb/",
  },
  {
    id: "x",
    label: "X",
    handle: "@0x_nation",
    href: "https://x.com/0x_nation",
  },
  {
    id: "email",
    label: "Email",
    handle: person.email,
    href: `mailto:${person.email}`,
  },
];

/* ── Navigation ─────────────────────────────────────────────────────────── */

export const navigation: NavItem[] = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "unique-labs", label: "Unique Labs" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

/* ── Section headings ───────────────────────────────────────────────────── */

export const sections = {
  about: {
    id: "about",
    index: "01",
    eyebrow: "About",
    title: "About",
    titleAccent: "Me",
  },
  research: {
    id: "research",
    index: "02",
    eyebrow: "Research",
    title: "Research",
    description: "Exploring molecular mechanisms through experimental biology.",
  },
  uniqueLabs: {
    id: "unique-labs",
    index: "03",
    eyebrow: "Company",
    title: "Unique",
    titleAccent: "Labs",
    description: "Building at the intersection of technology, AI, and experimentation.",
  },
  projects: {
    id: "projects",
    index: "04",
    eyebrow: "Projects",
    title: "Selected",
    titleAccent: "Projects",
    description: "Technology work across AI, automation, and the web — alongside research.",
  },
  experience: {
    id: "experience",
    index: "05",
    eyebrow: "Experience",
    title: "Experience",
    description: "Entrepreneurship, research, and technology — one timeline.",
  },
  publications: {
    id: "publications",
    index: "06",
    eyebrow: "Publications",
    title: "Publications",
    description: "Published scientific work",
  },
  achievements: {
    id: "achievements",
    index: "07",
    eyebrow: "Recognition",
    title: "Achievements",
  },
  skills: {
    id: "skills",
    index: "08",
    eyebrow: "Skills",
    title: "Skills &",
    titleAccent: "Methods",
    description: "Laboratory techniques, programming tools, and research practice I work with.",
  },
  cv: {
    id: "cv",
    index: "09",
    eyebrow: "CV",
    title: "Curriculum",
    titleAccent: "Vitae",
  },
  contact: {
    id: "contact",
    index: "10",
    eyebrow: "Contact",
    title: "Let’s",
    titleAccent: "Connect",
  },
} satisfies Record<string, SectionMeta>;

/* ── Hero ───────────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: ["Biochemistry & Molecular Biology", "Research", "Technology", "Entrepreneurship"],
  /** Cycles beneath the professional title. */
  roles: [
    "Researcher",
    "Biochemist",
    "Cancer Biology Researcher",
    "Founder",
    "Developer",
    "Technology Enthusiast",
  ],
  description:
    "Exploring the intersection of molecular biology, cancer research, computational tools, entrepreneurship, and emerging technology.",
  primaryActions: [
    { label: "Explore My Research", href: "#research" },
    { label: "Explore Unique Labs", href: "#unique-labs" },
  ],
  workAction: { label: "View My Work", href: "#projects" },
};

/* ── Publications ───────────────────────────────────────────────────────── */
/*  Add new papers to the top of this list. Only fill in verified metadata.  */
/*  A `null` title/abstract displays "Publication details coming soon."; a   */
/*  `null` journal or year is simply not shown. Authors whose name contains  */
/*  `person.name` are highlighted automatically.                             */

export const publications: Publication[] = [
  {
    id: "molstruc-2026-146299",
    status: "Published",
    doi: "10.1016/j.molstruc.2026.146299",
    url: "https://doi.org/10.1016/j.molstruc.2026.146299",
    title:
      "Solvent-dependent nonlinear optical response and potential Mcl-1 antagonist activity of an azo–hydrazone derivative: Experimental and theoretical studies",
    authors: [
      "Md. Abdur Rakib",
      "Billal Hossain",
      "Jenia Afrin Tanni",
      "Md. Shohag Hossain",
      "Md. Shakirul Hasan Sium",
      "Shahriar Ahmed Tushar",
      "Md. Tanvir Anjum",
      "Shofiur Rahman",
      "M. Shahed Zaman",
      "Md. Badrul Islam",
      "Md. Rabiul Karim",
    ],
    // Journal code "molstruc" in the DOI.
    journal: "Journal of Molecular Structure",
    year: null,
    abstract:
      "An azo-hydrazone derivative, 4-((E)-phenyldiazenyl)-2-((E)-(2-phenylhydrazono)methyl)phenol (PDPMP), was synthesized and characterized using FT-IR, UV–Vis, NMR, and LC-MS. Its structural, electronic, and nonlinear optical (NLO) properties were examined via DFT and TD-DFT at the B3LYP/6–311++G(d,p) level with the IEFPCM solvent model. The influence of solvent polarity on electronic transitions, charge transfer, NLO response, and antagonist activity was explored systematically. Solvent polarity significantly altered UV–Vis absorption, HOMO–LUMO gap, charge-transfer behavior, and NLO efficiency. PDPMP exhibited first-order hyperpolarizability (βtotal) of 537 × 10⁻³¹ esu, which is approximately 69 times greater than the reference value for urea (βtotal = 7.803 × 10⁻³¹ esu) and 3.5 time than p-nitroaniline (βtotal = 155 × 10–31 esu) and increasing up to threefold in polar solvents with notable positive solvatochromism. NTO and TDM analyses confirmed solvent-induced intramolecular charge transfer, while NBO and RDG analyses revealed orbital delocalization and noncovalent interactions. Molecular docking against Mcl-1 (PDB IDs: 4HW3, 6GL8) suggested that PDPMP has higher binding affinity than the preclinical drug Obatoclax. These findings suggest that it may serve as a dual-function NLO material and merit additional investigation for its potential as an anticancer agent.",
    presentedAt:
      "2nd International Conference on “Recent Advances in Science and Technology” (ICRAST)",
  },
];

/* ── Quick profile strip (below the hero) ───────────────────────────────── */

export const identityStrip: IdentityItem[] = [
  {
    label: "Researcher",
    value: "Biochemistry & Molecular Biology",
    icon: "microscope",
    href: "#research",
  },
  {
    label: "Co-Founder",
    value: "Unique Labs",
    icon: "building",
    href: "#unique-labs",
  },
  {
    label: "Published Research",
    value: `${publications.length} ${publications.length === 1 ? "Paper" : "Papers"}`,
    icon: "paper",
    href: "#publications",
  },
  {
    label: "Based in",
    value: `${person.location.city}, ${person.location.country}`,
    detail: person.location.coordinates,
    icon: "pin",
  },
];

/* ── About ──────────────────────────────────────────────────────────────── */

export const about: {
  paragraphs: string[];
  focusAreas: string[];
  profile: LabeledValue[];
} = {
  paragraphs: [
    "I am a Biochemistry & Molecular Biology researcher interested in understanding molecular mechanisms underlying disease and exploring how modern computational technologies can accelerate scientific discovery.",
    "My Master’s research at the University of Rajshahi is rooted in cancer biology, working with molecular biology techniques that span protein purification, cell culture, and molecular analysis.",
    "Alongside the lab, I write software — AI-assisted tools, browser automation, and chatbots — and I am interested in how AI and automation can accelerate both research and everyday work.",
    "I am also the Co-Founder of Unique Labs, where we build at the intersection of technology, AI, and experimentation.",
  ],
  focusAreas: [
    "Cancer biology",
    "Molecular biology techniques",
    "Computational tools",
    "AI & automation",
    "Entrepreneurship",
  ],
  profile: [
    { label: "Role", value: "Co-Founder, Unique Labs" },
    { label: "Field", value: "Biochemistry & Molecular Biology" },
    { label: "Research Focus", value: "Cancer Biology • Molecular Research" },
    { label: "Technology Focus", value: "AI • Software • Automation" },
    { label: "Institution", value: "University of Rajshahi" },
    { label: "Location", value: "Rajshahi, Bangladesh" },
  ],
};

/* ── Unique Labs ────────────────────────────────────────────────────────── */
/*  Replace the `null` / empty values as company details become public.     */

export const uniqueLabs: UniqueLabsInfo = {
  name: "Unique Labs",
  tagline: "Building at the intersection of technology, AI, and experimentation.",
  founderRole: "Co-Founder",
  founderName: person.name,
  description:
    "Unique Labs is the company I co-founded — a place to build at the intersection of technology, AI, and experimentation. More about our mission, products, and current work will be shared here soon.",
  mission: null,
  whatWeBuild: null,
  products: [],
  focusAreas: ["Technology", "AI", "Experimentation"],
  website: null,
  github: null,
  contactEmail: null,
};

/* ── Research ───────────────────────────────────────────────────────────── */
/*  Current research stays confidential until it is published; the site     */
/*  shows this placeholder instead of project details.                       */

export const currentResearch: CurrentResearch = {
  label: "Current research",
  context: "Master’s Research · University of Rajshahi",
  title: "Details will be shared after publication",
  description:
    "My current Master’s research in cancer biology is confidential until it is published. Its details will appear here once the work is out.",
  areas: ["Cancer biology", "Molecular biology"],
};

/* ── Achievements ───────────────────────────────────────────────────────── */

export const achievements: Achievement[] = [
  {
    id: "svas-2025",
    rank: "1st",
    placement: "1st Place",
    title: "Scientific Conference Presentation",
    event: "1st Scientific Conference of Veterinary and Animal Sciences 2025",
    institution: "University of Rajshahi",
    date: "29 November 2025",
    dateTime: "2025-11-29",
    description: null,
  },
];

/* ── Projects ───────────────────────────────────────────────────────────── */

export const projectCategories: ProjectCategory[] = [
  "AI",
  "Web",
  "Automation",
  "Research",
  "Tools",
];

/*  Add repository / demo URLs when they are public — `null` shows a        */
/*  placeholder. Do not add URLs that do not exist.                          */

export const projects: Project[] = [
  {
    id: "crypto-signal-analyzer",
    name: "AI / Crypto Signal Analyzer",
    description: "AI-assisted cryptocurrency market analysis and signal-generation platform.",
    categories: ["AI", "Tools"],
    technologies: ["AI", "Market data", "Signal generation"],
    status: null,
    links: { github: null, demo: null },
    icon: "chart",
  },
  {
    id: "x-automation-tools",
    name: "X / Twitter Automation Tools",
    description: "Browser automation and Chrome extension projects.",
    categories: ["Automation", "Web", "Tools"],
    technologies: ["Browser automation", "Chrome extensions"],
    status: null,
    links: { github: null, demo: null },
    icon: "automation",
  },
  {
    id: "telegram-gpt-bot",
    name: "Telegram GPT Bot",
    description: "AI-powered Telegram chatbot.",
    categories: ["AI", "Automation"],
    technologies: ["Telegram", "GPT"],
    status: null,
    links: { github: null, demo: null },
    icon: "bot",
  },
];

/* ── Experience ─────────────────────────────────────────────────────────── */
/*  Add a `period` such as "2024 — Present" when you want dates shown.       */

export const experience: ExperienceEntry[] = [
  {
    id: "unique-labs",
    role: "Co-Founder",
    organization: "Unique Labs",
    categories: ["Entrepreneurship"],
    period: null,
    current: true,
    featured: true,
    description:
      "Co-founded Unique Labs — building at the intersection of technology, AI, and experimentation.",
    link: { label: "About Unique Labs", href: "#unique-labs" },
  },
  {
    id: "masters-research",
    role: "Master’s Researcher",
    organization: "Biochemistry & Molecular Biology · University of Rajshahi",
    categories: ["Academic", "Research"],
    period: null,
    current: true,
    description: "Master’s research in cancer biology. Details will be shared after publication.",
    link: { label: "View research", href: "#research" },
  },
  {
    id: "conference-2025",
    role: "Conference Presenter · 1st Place",
    organization:
      "1st Scientific Conference of Veterinary and Animal Sciences 2025 · University of Rajshahi",
    categories: ["Conferences"],
    period: "29 Nov 2025",
    description: "Received 1st place for a scientific conference presentation.",
    link: { label: "View achievement", href: "#achievements" },
  },
  {
    id: "icrast",
    role: "Conference Presenter",
    organization:
      "2nd International Conference on “Recent Advances in Science and Technology” (ICRAST)",
    categories: ["Conferences"],
    period: null,
    description:
      "Participated and presented the research published as DOI 10.1016/j.molstruc.2026.146299.",
    link: { label: "View publication", href: "#publications" },
  },
  {
    id: "publication",
    role: "Published Author",
    organization: "Journal of Molecular Structure",
    categories: ["Research"],
    period: null,
    description:
      "Co-author of “Solvent-dependent nonlinear optical response and potential Mcl-1 antagonist activity of an azo–hydrazone derivative: Experimental and theoretical studies”.",
    link: { label: "View publication", href: "#publications" },
  },
  {
    id: "technology-projects",
    role: "Developer",
    organization: "Independent technology projects",
    categories: ["Technology", "Projects"],
    period: null,
    description:
      "Building software across AI-assisted market analysis, browser automation and Chrome extensions, and AI-powered chatbots.",
    link: { label: "View projects", href: "#projects" },
  },
];

/* ── Education ──────────────────────────────────────────────────────────── */

export const education: EducationEntry[] = [
  {
    id: "masters",
    degree: "Master’s",
    field: "Biochemistry & Molecular Biology",
    institution: "University of Rajshahi",
    location: "Rajshahi, Bangladesh",
    period: null,
    status: "Current",
  },
];

/* ── Skills (no proficiency levels are implied) ─────────────────────────── */

export const skillGroups: SkillGroup[] = [
  {
    id: "laboratory",
    title: "Research & Laboratory",
    description: "Bench techniques",
    icon: "flask",
    skills: [
      "Molecular Biology",
      "Cell Culture",
      "SDS-PAGE",
      "Affinity Chromatography",
      "Hemagglutination Assay",
      "MTT Assay",
      "qPCR",
      "Apoptosis Analysis",
    ],
  },
  {
    id: "technology",
    title: "Programming & Technology",
    description: "Languages & tools",
    icon: "code",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Next.js",
      "Git",
      "APIs",
      "Automation",
    ],
  },
  {
    id: "analysis",
    title: "Research & Analysis",
    description: "Scientific practice",
    icon: "analysis",
    skills: [
      "Experimental Design",
      "Data Analysis",
      "Scientific Literature Review",
      "Molecular Biology Research",
    ],
  },
];

/* ── Curriculum Vitae ───────────────────────────────────────────────────── */
/*  Place the PDF at /public/Shahriar-Ahmed-CV.pdf and redeploy. Until the   */
/*  file exists, the buttons fall back to requesting the CV by email.        */

export const cv = {
  fileName: "Shahriar-Ahmed-CV.pdf",
  href: "/Shahriar-Ahmed-CV.pdf",
  text: "Download my CV for a detailed overview of my academic background, research experience, publications, entrepreneurship, and technical work.",
  requestSubject: "CV request",
};

/* ── Contact ────────────────────────────────────────────────────────────── */

export const contact = {
  text: "For research collaborations, technology projects, entrepreneurship, or interesting ideas, feel free to reach out.",
};
