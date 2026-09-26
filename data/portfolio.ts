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
  SocialGroup,
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
    "Blockchain Development",
    "Digital Marketing",
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
/*  Listed in display order. `group` sets where a link appears in the        */
/*  Contact section; `featured` links also appear as icons in the hero and   */
/*  footer. A `null` href shows the handle with a copy button instead.       */

export const socialGroups: { id: SocialGroup; label: string }[] = [
  { id: "research", label: "Research profiles" },
  { id: "professional", label: "Professional" },
  { id: "social", label: "Social & messaging" },
];

export const socials: SocialLink[] = [
  {
    id: "scholar",
    label: "Google Scholar",
    handle: "Publications & citations",
    href: "https://scholar.google.com/citations?user=Z7z7L_kAAAAJ&hl=en",
    group: "research",
    featured: true,
  },
  {
    id: "orcid",
    label: "ORCID",
    handle: "0009-0005-3432-7559",
    href: "https://orcid.org/0009-0005-3432-7559",
    group: "research",
    featured: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "fr-ost",
    href: "https://github.com/fr-ost",
    group: "professional",
    featured: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "shahriar-bmb",
    href: "https://www.linkedin.com/in/shahriar-bmb/",
    group: "professional",
    featured: true,
  },
  {
    id: "x",
    label: "X",
    handle: "@0x_nation",
    href: "https://x.com/0x_nation",
    group: "professional",
    featured: true,
  },
  {
    id: "email",
    label: "Email",
    handle: person.email,
    href: `mailto:${person.email}`,
    group: "professional",
    featured: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "ig.frostt",
    href: "https://www.facebook.com/ig.frostt",
    group: "social",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@ig.frostt",
    href: "https://www.instagram.com/ig.frostt",
    group: "social",
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@igfrostt",
    href: "https://t.me/igfrostt",
    group: "social",
  },
  {
    // A WhatsApp username, not a link: visitors copy it and search in WhatsApp.
    id: "whatsapp",
    label: "WhatsApp",
    handle: "ig.frostt",
    href: null,
    group: "social",
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
    description:
      "Laboratory techniques, programming tools, and blockchain development I work with.",
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
    "Alongside the lab, I write software — AI-assisted tools, browser automation, and Telegram bots — and I am interested in how AI and automation can accelerate both research and everyday work.",
    "I am also the Co-Founder of Unique Labs, where we offer KOC and consultancy services, digital marketing, and blockchain development.",
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
    "Unique Labs is the company I co-founded. We offer KOC and consultancy services, digital marketing, and blockchain development — helping brands and Web3 projects build, launch, and grow.",
  mission:
    "To help brands and Web3 projects grow with trust — combining authentic, community-driven marketing and clear strategy with secure, reliable blockchain technology.",
  whatWeBuild: [
    {
      title: "KOC & Consultancy",
      description:
        "Key Opinion Consumer (KOC) campaigns that turn real users into credible voices for a product, alongside consulting on launch, growth, and community strategy.",
      icon: "handshake",
    },
    {
      title: "Digital Marketing",
      description:
        "Social media, content, and community campaigns — planned around clear goals and measured by results.",
      icon: "megaphone",
    },
    {
      title: "Blockchain Development",
      description:
        "Smart contracts, tokens, dApps, and Web3 integrations — designed, tested, and built with security in mind.",
      icon: "blocks",
    },
    {
      title: "AI & Automation",
      description:
        "Bots, workflow automation, and AI-assisted tools that take repetitive work off a team’s plate.",
      icon: "workflow",
    },
  ],
  products: [],
  focusAreas: [
    "Web3",
    "Blockchain",
    "KOC marketing",
    "Digital marketing",
    "Consultancy",
    "AI & automation",
  ],
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
/*  The section shows a "Coming soon" card while this list is empty. The    */
/*  first entry is displayed as the featured card, e.g.:                     */
/*  { id: "award-2026", rank: "1st", placement: "1st Place",                 */
/*    title: "…", event: "…", institution: "…", date: "1 January 2026",      */
/*    dateTime: "2026-01-01", description: null }                            */

export const achievements: Achievement[] = [];

/* ── Projects ───────────────────────────────────────────────────────────── */

export const projectCategories: ProjectCategory[] = [
  "AI",
  "Web",
  "Automation",
  "Research",
  "Tools",
];

/*  `links.website` is the live site; `items` lists the apps in a project    */
/*  (each with its own link) and `details` adds key facts. Add repository    */
/*  URLs when they are public. Do not add URLs that do not exist.            */

export const projects: Project[] = [
  {
    id: "signova",
    name: "Signova",
    description:
      "AI-assisted crypto market analysis and signal-generation platform. Signova analyses market data and turns it into trading signals, delivered through a live web app.",
    categories: ["AI", "Web", "Tools"],
    technologies: ["AI", "Market data", "Signal generation", "Web app"],
    status: "Live",
    details: [
      { label: "Type", value: "Web platform" },
      { label: "Market", value: "Cryptocurrency" },
      { label: "Analysis", value: "AI-assisted" },
      { label: "Output", value: "Trading signals" },
    ],
    links: { github: null, demo: null, website: "https://signova.up.railway.app/" },
    icon: "chart",
  },
  {
    // Store titles and summaries as listed on the Chrome Web Store.
    id: "x-chrome-extensions",
    name: "Chrome Extensions for X",
    description:
      "Browser extensions that automate growing and managing an X (Twitter) account, published on the Chrome Web Store.",
    categories: ["Automation", "Web", "Tools"],
    technologies: ["Chrome extensions", "Browser automation"],
    status: null,
    items: [
      {
        name: "X Follow Grow",
        description:
          "Grow an X (Twitter) following with safe, smart automated follows, right in the browser.",
        href: "https://chromewebstore.google.com/detail/x-follow-grow-safe-smart/ofiancichfcakbdgekhcahflpoglfgbh",
        linkLabel: "Chrome Web Store",
      },
      {
        name: "X (Twitter) Mass Unfollow Tool - Bulk Following Cleaner",
        description:
          "X/Twitter unfollow manager with bulk unfollow, non-followers cleaner, smart filters, safety limits, analytics & CSV export.",
        href: "https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl",
        linkLabel: "Chrome Web Store",
      },
    ],
    itemNoun: "extension",
    links: { github: null, demo: null },
    icon: "puzzle",
  },
  {
    id: "telegram-bots",
    name: "Telegram Bots",
    description:
      "Bots for everyday social media tasks — follower checks, Instagram video downloads, and social media marketing, each inside a Telegram chat.",
    categories: ["Automation", "Tools"],
    technologies: ["Telegram", "Automation", "Social media"],
    status: null,
    items: [
      {
        name: "Smart Follower Checker",
        description:
          "On-demand follower checks: the bot analyses an account’s followers and sends the results straight back to your chat.",
        href: "https://t.me/sfchecker_bot",
        linkLabel: "@sfchecker_bot",
      },
      {
        name: "Instagram Video Downloader",
        description:
          "Send an Instagram post or reel link and get the video back, ready to save — no extra app or website needed.",
        href: "https://t.me/uniquelabs_igbot",
        linkLabel: "@uniquelabs_igbot",
      },
      {
        name: "SMM Agent",
        description:
          "A social media marketing (SMM) assistant that brings growth services and campaign tasks into a single Telegram chat.",
        href: "https://t.me/smmagentprobot",
        linkLabel: "@smmagentprobot",
      },
    ],
    itemNoun: "bot",
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
      "Co-founded Unique Labs, offering KOC and consultancy services, digital marketing, and blockchain development.",
    link: { label: "About Unique Labs", href: "#unique-labs" },
  },
  {
    id: "masters-research",
    role: "Graduate Student",
    organization: "Biochemistry & Molecular Biology · University of Rajshahi",
    categories: ["Academic", "Research"],
    period: null,
    current: true,
    description: "Master’s research in cancer biology. Details will be shared after publication.",
    link: { label: "View research", href: "#research" },
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
      "Building Signova (AI-assisted crypto market analysis), Chrome extensions for X, and Telegram bots.",
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
    id: "blockchain",
    title: "Blockchain Development",
    description: "Web3 & smart contracts",
    icon: "blocks",
    skills: [
      "Smart Contracts",
      "EVM Chains",
      "dApp Development",
      "Web3 Incubation",
      "Payment Integration",
      "Tokenomics",
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
