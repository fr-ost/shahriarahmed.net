/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Portfolio content — the single source of truth for the website.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Edit this file to update the site; components only render what is here.
 *
 *  Placeholders: any field set to `null` (or an empty array) is treated as
 *  "not provided yet" and is not shown. Replace the `null` with real
 *  content when it is available, and it appears.
 *
 *  Nothing below should be invented — only add verified information.
 */

import type {
  Achievement,
  ArchivedProject,
  CurrentResearch,
  EducationEntry,
  ExperienceEntry,
  LabeledValue,
  NavItem,
  PageMeta,
  Project,
  ProjectCategory,
  ProseCopy,
  Publication,
  SectionMeta,
  SkillGroup,
  SocialGroup,
  SocialLink,
  UniqueLabsInfo,
} from "@/lib/types";
import { extensions, productivityExtensions, productsUrl, xExtensions } from "./products";

/* ── Site & SEO ─────────────────────────────────────────────────────────── */

export const site = {
  /**
   * The site's address, used in canonical links, the sitemap, robots.txt,
   * structured data and llms.txt. It must be the host Vercel serves without
   * redirecting (Project → Settings → Domains → the primary domain).
   * NEXT_PUBLIC_SITE_URL overrides it, e.g. "https://www.shahriarahmed.net".
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://shahriarahmed.net").replace(/\/$/, ""),
  domain: "shahriarahmed.net",
  /** Homepage title in search results (about 60 characters at most). */
  title: "Shahriar Ahmed — Researcher & Co-Founder of Unique Labs",
  /** Homepage description in search results (about 160 characters at most). */
  description:
    "Shahriar Ahmed (Shahriar Ahmed Tushar): Biochemistry & Molecular Biology researcher at the University of Rajshahi, Bangladesh, and co-founder of Unique Labs.",
  locale: "en_US",
} as const;

/* ── Personal information ───────────────────────────────────────────────── */

export const person = {
  name: "Shahriar Ahmed",
  /** Full name, also used on publications. */
  fullName: "Shahriar Ahmed Tushar",
  givenName: "Shahriar",
  familyName: "Ahmed",
  /** Professional title, shown prominently across the site. */
  title: "Co-Founder & COO, Unique Labs",
  /** As on the Unique Labs website (www.uniquelabs.org/team/shahriar-ahmed). */
  jobTitle: "Co-Founder & COO",
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
  /** Languages, as ISO codes, for structured data. */
  languages: ["en", "bn"],
  /** Topics for structured data: the most important, without duplicates. */
  knowsAbout: [
    "Biochemistry",
    "Molecular Biology",
    "Cancer Biology",
    "Molecular Mechanisms of Disease",
    "Computational Biosciences",
    "Density Functional Theory (DFT)",
    "Molecular Docking",
    "Cell Culture",
    "SDS-PAGE",
    "qPCR",
    "Web3",
    "Blockchain Development",
    "KOC Marketing",
    "Digital Marketing",
    "Chrome Extension Development",
  ],
  portrait: {
    src: "/images/shahriar-ahmed.webp",
    alt: "Portrait of Shahriar Ahmed, Co-Founder of Unique Labs",
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
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Unique Labs", href: "/unique-labs" },
];

/** The call to action beside the navigation (and last in the mobile menu). */
export const navigationCta: NavItem = { label: "Contact", href: "/contact" };

/* ── Homepage section headings ──────────────────────────────────────────── */

export const sections = {
  about: {
    id: "about",
    index: "01",
    eyebrow: "About",
    title: "About",
    titleAccent: "Me",
  },
  work: {
    id: "work",
    index: "02",
    eyebrow: "Work",
    title: "Research, ventures",
    titleAccent: "& products",
    description: "What I am working on — each links to more.",
  },
  publications: {
    id: "publications",
    index: "03",
    eyebrow: "Publications",
    title: "Publications",
    description: "Published scientific work",
  },
  contact: {
    id: "contact",
    index: "04",
    eyebrow: "Contact",
    title: "Let’s",
    titleAccent: "Connect",
  },
  uniqueLabs: {
    id: "unique-labs",
    index: "",
    eyebrow: "Company",
    title: "Unique",
    titleAccent: "Labs",
    description: "Building at the intersection of technology, AI, and experimentation.",
  },
} satisfies Record<string, SectionMeta>;

/* ── Separate pages ─────────────────────────────────────────────────────── */
/*  Headings, descriptions and the summaries shown on the cards that link    */
/*  to each page.                                                            */

export const pages = {
  about: {
    href: "/about",
    label: "About",
    eyebrow: "About",
    title: "About",
    titleAccent: "Shahriar Ahmed",
    seoTitle: "About Shahriar Ahmed Tushar — Researcher & Founder",
    seoDescription:
      "Shahriar Ahmed (Shahriar Ahmed Tushar) is a biochemistry researcher from Rajshahi, Bangladesh, and Co-Founder & COO of Unique Labs. Background, skills, FAQ.",
    description:
      "Shahriar Ahmed (full name Shahriar Ahmed Tushar) is a Biochemistry & Molecular Biology researcher at the University of Rajshahi and Co-Founder of Unique Labs.",
  },
  contact: {
    href: "/contact",
    label: "Contact",
    eyebrow: "Contact",
    title: "Contact",
    titleAccent: "Shahriar Ahmed",
    seoTitle: "Contact Shahriar Ahmed — Email & Profiles",
    seoDescription:
      "Contact Shahriar Ahmed (Shahriar Ahmed Tushar) in Rajshahi, Bangladesh, by email or through Google Scholar, ORCID, LinkedIn, GitHub, X and Telegram.",
    description:
      "Reach Shahriar Ahmed by email, or through Google Scholar, ORCID, LinkedIn, GitHub, X, Telegram, and other profiles.",
  },
  uniqueLabs: {
    href: "/unique-labs",
    label: "Unique Labs",
    eyebrow: "Company",
    title: "Unique",
    titleAccent: "Labs",
    seoTitle: "Unique Labs by Shahriar Ahmed — KOC, Marketing & Web3",
    seoDescription:
      "Unique Labs, co-founded in 2019 by Shahriar Ahmed: KOC and consultancy, digital marketing, blockchain development, and Chrome extensions such as Unique PDF.",
    description:
      "Unique Labs, co-founded by Shahriar Ahmed, offers KOC and consultancy services, digital marketing, and blockchain development for brands and Web3 projects.",
    icon: "building",
  },
  research: {
    href: "/research",
    label: "Research",
    eyebrow: "Research",
    title: "Research",
    seoTitle: "Research & Publications — Shahriar Ahmed",
    seoDescription:
      "Research by Shahriar Ahmed Tushar in Biochemistry & Molecular Biology at the University of Rajshahi: cancer biology and a Journal of Molecular Structure paper.",
    description: "Exploring molecular mechanisms through experimental biology.",
    summary: "Current Master’s research in cancer biology, and published work.",
    icon: "microscope",
  },
  projects: {
    href: "/projects",
    label: "Projects",
    eyebrow: "Projects",
    title: "Selected",
    titleAccent: "Projects",
    seoTitle: "Projects by Shahriar Ahmed — Chrome Extensions & Bots",
    seoDescription:
      "Projects by Shahriar Ahmed: Unique Labs’ Chrome extensions (UnfollowX Pro, GrowX, Unique PDF, FrameShot and more), a daily BCS Telegram bot, and archived work.",
    description: "Technology work across AI, automation, and the web — alongside research.",
    summary: "Chrome extensions for X, a Telegram bot, and archived projects.",
    icon: "code",
  },
  experience: {
    href: "/experience",
    label: "Experience",
    eyebrow: "Experience",
    title: "Experience",
    description: "Entrepreneurship, research, and technology — one timeline.",
    seoTitle: "Experience — Shahriar Ahmed, Unique Labs & BMB Research",
    seoDescription:
      "Experience of Shahriar Ahmed: Co-Founder & COO of Unique Labs since 2019; Master’s student in Biochemistry & Molecular Biology at the University of Rajshahi.",
    summary: "Unique Labs, graduate research, conferences, and publications.",
    icon: "briefcase",
  },
  web3: {
    href: "/experience/web3",
    label: "Web3 Experience",
    eyebrow: "Experience",
    title: "Web3",
    titleAccent: "Experience",
    description: "Web3 work through Unique Labs: KOC and consultancy, marketing, and development.",
    seoDescription:
      "Web3 experience of Shahriar Ahmed, Co-Founder of Unique Labs: KOC and consultancy, digital marketing, and blockchain development for Web3 brands and projects.",
    summary: "Web3 work through Unique Labs.",
    icon: "blocks",
  },
  // The address predates the rename; the Chrome Web Store listing may link to it.
  unfollowXPrivacy: {
    href: "/projects/x-mass-unfollow/privacy",
    label: "UnfollowX Pro Privacy Policy",
    eyebrow: "UnfollowX Pro",
    title: "UnfollowX Pro",
    titleAccent: "Privacy Policy",
    seoTitle: "UnfollowX Pro Privacy Policy — Chrome Extension for X",
    seoDescription:
      "Privacy policy of UnfollowX Pro (formerly X Mass Unfollow), the Chrome extension for X: what stays on your device, what is sent to X, ads, and each permission.",
    description:
      "How UnfollowX Pro (formerly X Mass Unfollow) handles your data. This policy applies to version 7.0.0.",
  },
  researchPaper: {
    href: "/research/mcl-1-azo-hydrazone-paper",
    label: "Mcl-1 paper, explained",
    eyebrow: "Research explainer",
    title: "Our Mcl-1 paper,",
    titleAccent: "in plain language",
    description:
      "What our 2026 Journal of Molecular Structure paper did and found: an azo–hydrazone compound with a strong optical response, and its predicted grip on the cancer protein Mcl-1.",
    seoTitle: "Mcl-1 Azo–Hydrazone Paper Explained — Shahriar Ahmed",
    seoDescription:
      "A plain-language guide by co-author Shahriar Ahmed Tushar to a 2026 Journal of Molecular Structure paper: an azo–hydrazone compound, its optics and Mcl-1.",
  },
  bcsBot: {
    href: "/projects/bcs-newspaper-brief",
    label: "Newspaper Brief Daily for BCS",
    eyebrow: "Telegram bot",
    title: "Newspaper Brief",
    titleAccent: "Daily for BCS",
    description:
      "A Telegram bot with daily current affairs for BCS exam preparation: notes in Bangla and three MCQs, every day at 8 AM.",
    seoTitle: "BCS Current Affairs Telegram Bot — Shahriar Ahmed",
    seoDescription:
      "Newspaper Brief Daily for BCS (@BCSNWZ_bot), a Telegram bot by Shahriar Ahmed: daily BCS current affairs notes in Bangla and three MCQs, every day at 8 AM.",
  },
  cv: {
    href: "/cv",
    label: "CV",
    eyebrow: "Curriculum vitae",
    title: "Curriculum",
    titleAccent: "Vitae",
    description:
      "Education, research, publications, experience and skills of Shahriar Ahmed Tushar — on one page, and as a PDF.",
    seoTitle: "CV — Shahriar Ahmed Tushar, Biochemistry & Unique Labs",
    seoDescription:
      "CV of Shahriar Ahmed Tushar, Rajshahi, Bangladesh: B.Sc. (Hons) and Master’s in Biochemistry & Molecular Biology, publication, Unique Labs. PDF download.",
  },
  now: {
    href: "/now",
    label: "Now",
    eyebrow: "Now",
    title: "What I’m doing",
    titleAccent: "now",
    description: "What I am working on at the moment — research, Unique Labs and side projects.",
    seoTitle: "Now — What Shahriar Ahmed Is Working On",
    seoDescription:
      "What Shahriar Ahmed is doing now: a Master’s in Biochemistry & Molecular Biology at the University of Rajshahi, Unique Labs, and Chrome extensions.",
  },
  blog: {
    href: "/blog",
    label: "Blog",
    eyebrow: "Writing",
    title: "Notes &",
    titleAccent: "articles",
    description:
      "Writing on biochemistry and research methods, building Chrome extensions, and Web3 marketing.",
    seoTitle: "Blog — Shahriar Ahmed on Research, Extensions & Web3",
    seoDescription:
      "Articles by Shahriar Ahmed (Shahriar Ahmed Tushar): biochemistry and research methods, building Chrome extensions at Unique Labs, and KOC marketing in Web3.",
    summary: "Articles on research, Chrome extensions and Web3.",
    icon: "paper",
  },
  achievements: {
    href: "/achievements",
    label: "Achievements",
    eyebrow: "Recognition",
    title: "Achievements",
    description: "Awards and recognition.",
    seoDescription:
      "Awards and recognition of Shahriar Ahmed (Shahriar Ahmed Tushar), Biochemistry & Molecular Biology researcher and Co-Founder of Unique Labs.",
    summary: "Awards and recognition.",
    icon: "award",
  },
  privacy: {
    href: "/privacy",
    label: "Privacy Policy",
    eyebrow: "Legal",
    title: "Privacy",
    titleAccent: "Policy",
    description: "What information this website collects, and how it is used.",
    seoDescription:
      "Privacy policy of shahriarahmed.net, the website of Shahriar Ahmed: the Google tag it uses, what is stored in your browser, and how email you send is used.",
  },
  dmca: {
    href: "/dmca",
    label: "DMCA",
    eyebrow: "Legal",
    title: "DMCA",
    titleAccent: "Policy",
    description: "Copyright on this website, and how to report infringing material.",
    seoDescription:
      "Copyright and DMCA policy of shahriarahmed.net, the website of Shahriar Ahmed: how to report material that infringes your copyright, and how to counter-notice.",
  },
} satisfies Record<string, PageMeta>;

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
    { label: "Explore My Research", href: "/research" },
    { label: "Explore Unique Labs", href: "/unique-labs" },
  ],
  workAction: { label: "View My Work", href: "/projects" },
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
    volume: "1368",
    articleNumber: "146299",
    published: { label: "17 April 2026", dateTime: "2026-04-17" },
    abstract:
      "An azo-hydrazone derivative, 4-((E)-phenyldiazenyl)-2-((E)-(2-phenylhydrazono)methyl)phenol (PDPMP), was synthesized and characterized using FT-IR, UV–Vis, NMR, and LC-MS. Its structural, electronic, and nonlinear optical (NLO) properties were examined via DFT and TD-DFT at the B3LYP/6–311++G(d,p) level with the IEFPCM solvent model. The influence of solvent polarity on electronic transitions, charge transfer, NLO response, and antagonist activity was explored systematically. Solvent polarity significantly altered UV–Vis absorption, HOMO–LUMO gap, charge-transfer behavior, and NLO efficiency. PDPMP exhibited first-order hyperpolarizability (βtotal) of 537 × 10⁻³¹ esu, which is approximately 69 times greater than the reference value for urea (βtotal = 7.803 × 10⁻³¹ esu) and 3.5 time than p-nitroaniline (βtotal = 155 × 10–31 esu) and increasing up to threefold in polar solvents with notable positive solvatochromism. NTO and TDM analyses confirmed solvent-induced intramolecular charge transfer, while NBO and RDG analyses revealed orbital delocalization and noncovalent interactions. Molecular docking against Mcl-1 (PDB IDs: 4HW3, 6GL8) suggested that PDPMP has higher binding affinity than the preclinical drug Obatoclax. These findings suggest that it may serve as a dual-function NLO material and merit additional investigation for its potential as an anticancer agent.",
    presentedAt:
      "2nd International Conference on “Recent Advances in Science and Technology” (ICRAST)",
    explainer: { label: "Read the explainer", href: "/research/mcl-1-azo-hydrazone-paper" },
  },
];

/* ── About ──────────────────────────────────────────────────────────────── */

export const about: {
  /** Answer-first summary at the top of /about, quotable on its own. */
  inBrief: string;
  paragraphs: string[];
  focusAreas: string[];
  profile: LabeledValue[];
  /** Questions people ask, answered on /about. */
  faq: { question: string; answer: string }[];
} = {
  inBrief:
    "Shahriar Ahmed (full name Shahriar Ahmed Tushar) is a Bangladeshi biochemistry researcher and Web3 founder based in Rajshahi. Shahriar completed a B.Sc. (Hons) in Biochemistry & Molecular Biology at the University of Rajshahi (2021–2026), is now doing a Master’s there in cancer biology, and co-authored a 2026 paper in the Journal of Molecular Structure. In 2019 Shahriar co-founded Unique Labs — Co-Founder & COO today — and builds Chrome extensions such as UnfollowX Pro, GrowX and Unique PDF.",
  paragraphs: [
    "I am a Biochemistry & Molecular Biology researcher interested in understanding molecular mechanisms underlying disease and exploring how modern computational technologies can accelerate scientific discovery.",
    "I completed my B.Sc. (Hons) in Biochemistry & Molecular Biology at the University of Rajshahi (2021–2026), and I am now doing my Master’s there, with research rooted in cancer biology. In the lab I work with cell culture, SDS-PAGE, affinity chromatography, hemagglutination and MTT assays, qPCR and apoptosis analysis; on the computer, with density functional theory (DFT) and molecular docking — the methods behind our 2026 paper on an azo–hydrazone compound and the cancer protein Mcl-1.",
    "From July 2025 to September 2026 I was a research member of the Computational Biosciences and Chemistry Research Organization (CBCRO). Earlier, I served as Joint IT Secretary of the ASM Student Chapter at the University of Rajshahi.",
    "Alongside research, I co-founded Unique Labs in 2019 — it began as Unique Tech — and I am its Co-Founder & COO. We offer KOC (Key Opinion Consumer) and consultancy services, digital marketing, and blockchain development, and we build our own Chrome extensions: UnfollowX Pro, GrowX, Unique PDF, FrameShot, Twofold, Rowlio, ScoreX, XAICG and UniqueFarm. I also run a Telegram bot that sends daily current affairs to BCS exam candidates.",
    "I live and work in Rajshahi, Bangladesh, in English and Bangla.",
  ],
  focusAreas: [
    "Cancer biology",
    "Molecular biology techniques",
    "Computational tools",
    "AI & automation",
    "Entrepreneurship",
  ],
  profile: [
    { label: "Full name", value: "Shahriar Ahmed Tushar" },
    { label: "Role", value: "Co-Founder & COO, Unique Labs" },
    { label: "Field", value: "Biochemistry & Molecular Biology" },
    { label: "Education", value: "B.Sc. (Hons) 2021–2026 • Master’s, ongoing" },
    { label: "Research Focus", value: "Cancer Biology • Molecular Research" },
    { label: "Technology Focus", value: "AI • Software • Automation" },
    { label: "Institution", value: "University of Rajshahi" },
    { label: "Location", value: "Rajshahi, Bangladesh" },
    { label: "Languages", value: "English • Bangla" },
  ],
  faq: [
    {
      question: "Who is Shahriar Ahmed?",
      answer:
        "Shahriar Ahmed — full name Shahriar Ahmed Tushar — is a biochemistry researcher at the University of Rajshahi and the Co-Founder & COO of Unique Labs, based in Rajshahi, Bangladesh. This website, shahriarahmed.net, is the official one; other people share the name, so look for “Tushar”, Rajshahi or Unique Labs to be sure it is the same person.",
    },
    {
      question: "What is Unique Labs?",
      answer:
        "Unique Labs is a Web3 growth and software company I co-founded in 2019, first under the name Unique Tech. It offers KOC and consultancy services, digital marketing and blockchain development, and it builds Chrome extensions such as UnfollowX Pro, GrowX and Unique PDF. Its website is www.uniquelabs.org.",
    },
    {
      question: "What does Shahriar Ahmed research?",
      answer:
        "Cancer biology and the molecular mechanisms of disease, for my Master’s in Biochemistry & Molecular Biology at the University of Rajshahi, together with computational methods such as DFT and molecular docking. My first paper, published in 2026 in the Journal of Molecular Structure, studied an azo–hydrazone compound’s optical properties and its predicted binding to the cancer protein Mcl-1.",
    },
    {
      question: "Where is Shahriar Ahmed based?",
      answer: "In Rajshahi, Bangladesh, where I study at the University of Rajshahi.",
    },
    {
      question: "How can I contact Shahriar Ahmed?",
      answer:
        "By email at shahriar.bmb@gmail.com, or through LinkedIn, X (@0x_nation) and Telegram (@igfrostt). Every profile is listed on the Contact page.",
    },
  ],
};

/* ── Unique Labs ────────────────────────────────────────────────────────── */
/*  Replace the `null` / empty values as company details become public.     */

export const uniqueLabs: UniqueLabsInfo = {
  name: "Unique Labs",
  tagline: "Building at the intersection of technology, AI, and experimentation.",
  founderRole: "Co-Founder & COO",
  founded: "2019",
  formerName: "Unique Tech",
  /** The founder's profile on the company website. */
  founderProfile: "https://www.uniquelabs.org/team/shahriar-ahmed",
  founderName: person.name,
  description:
    "Unique Labs is the company I co-founded in 2019, first as Unique Tech. We offer KOC and consultancy services, digital marketing, and blockchain development — helping brands and Web3 projects build, launch, and grow — and we build our own Chrome extensions.",
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
  // The company's Chrome extensions (data/products.ts).
  products: extensions.map((item) => ({
    name: item.status ? `${item.name} (${item.status})` : item.name,
    description: item.tagline ?? item.description,
    href: item.slug ? `/projects/${item.slug}` : (item.page?.href ?? item.href),
  })),
  focusAreas: [
    "Web3",
    "Blockchain",
    "KOC marketing",
    "Digital marketing",
    "Consultancy",
    "AI & automation",
  ],
  website: "https://www.uniquelabs.org/",
  github: null,
  contactEmail: null,
};

/* ── Research ───────────────────────────────────────────────────────────── */
/*  Current research stays confidential until it is published; the site     */
/*  shows this placeholder instead of project details.                       */

/** Introduction on /research. */
export const researchIntro: ProseCopy = {
  eyebrow: "Focus",
  title: "What I research",
  paragraphs: [
    "My research sits in biochemistry and molecular biology, with a focus on cancer biology and the molecular mechanisms of disease. Alongside the bench, I use computational biosciences — density functional theory (DFT) and molecular docking — to understand how molecules behave and to predict how they might interact with proteins.",
    "I completed my B.Sc. (Hons) in Biochemistry & Molecular Biology at the University of Rajshahi (2021–2026), and I am now doing my Master’s there. My Master’s research is in cancer biology; its details stay confidential until the work is published.",
    "From July 2025 to September 2026 I was a research member of the Computational Biosciences and Chemistry Research Organization (CBCRO). My first paper, published in the Journal of Molecular Structure in 2026, combined experiments with DFT and docking to study an azo–hydrazone compound and its predicted binding to the cancer protein Mcl-1. [Read the plain-language explainer](/research/mcl-1-azo-hydrazone-paper).",
  ],
  termsTitle: "Methods I work with",
  terms: [
    {
      term: "Cell culture",
      definition:
        "Growing cells under controlled conditions to study how they behave and respond to treatment.",
    },
    {
      term: "SDS-PAGE",
      definition: "Separating proteins by size in a gel, to check that they are present and pure.",
    },
    {
      term: "Affinity chromatography",
      definition: "Purifying a protein by how specifically it binds to a partner molecule.",
    },
    {
      term: "Hemagglutination assay",
      definition:
        "Measuring the clumping of red blood cells, to detect and compare agents that bind them.",
    },
    {
      term: "MTT assay",
      definition:
        "A colour-based test of cell viability, showing how a treatment affects living cells.",
    },
    {
      term: "qPCR",
      definition:
        "Quantitative PCR: measuring how much of a specific DNA or RNA is present, for example to follow gene expression.",
    },
    {
      term: "Apoptosis analysis",
      definition: "Detecting programmed cell death, a key outcome in cancer biology.",
    },
    {
      term: "DFT and molecular docking",
      definition:
        "Calculating a molecule’s structure and electronic properties, and predicting how it fits into a protein.",
    },
  ],
};

/** The company's story, on /unique-labs. */
export const uniqueLabsStory: ProseCopy = {
  eyebrow: "Story",
  title: "How Unique Labs started",
  paragraphs: [
    "I co-founded Unique Labs in 2019. It started as Unique Tech, and today I run it as Co-Founder & COO.",
    "The company works in two directions. For brands and Web3 projects, we offer KOC (Key Opinion Consumer) and consultancy services, digital marketing, and blockchain development — smart contracts, tokens and dApps. And we build our own Chrome extensions: tools for growing an X (Twitter) account, such as [UnfollowX Pro](/projects/unfollowx-pro) and [GrowX](/projects/growx), and free tools for everyday work in the browser, such as [Unique PDF](/projects/unique-pdf), [FrameShot](/projects/frameshot), [Twofold](/projects/twofold) and [Rowlio](/projects/rowlio).",
    "Each product has its own page on this site, with what it does and links to its website and Chrome Web Store listing. The company’s partnerships and full catalogue are on [uniquelabs.org](https://www.uniquelabs.org/).",
  ],
};

/** What KOC marketing is, on /experience/web3. */
export const web3Intro: ProseCopy = {
  eyebrow: "In Web3",
  title: "KOC marketing, and what I do in Web3",
  paragraphs: [
    "A Key Opinion Consumer (KOC) is an everyday user who shares a genuine experience of a product with their own community. A Key Opinion Leader (KOL) is an influencer or expert with a large following. KOC campaigns trade reach for trust: smaller voices, closer to the people they talk to.",
    "At [Unique Labs](/unique-labs) I work on KOC and consultancy, digital marketing and blockchain development for Web3 brands and projects: planning launches and growth, running community campaigns, and building smart contracts, tokens and dApps.",
  ],
};

export const currentResearch: CurrentResearch = {
  label: "Current research",
  context: "Master’s Research · University of Rajshahi",
  title: "Details will be shared after publication",
  description:
    "My current Master’s research in cancer biology is confidential until it is published. Its details will appear here once the work is out.",
  areas: ["Cancer biology", "Molecular biology"],
};

/* ── Achievements ───────────────────────────────────────────────────────── */
/*  The page is hidden (404, not linked) while this list is empty. The      */
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
    // From the company website: see data/products.ts.
    id: "x-chrome-extensions",
    name: "Chrome Extensions for X",
    description:
      "Unique Labs’ Chrome extensions for growing and managing an X (Twitter) account: unfollowing, growth, and replies and posts written in your own voice.",
    categories: ["AI", "Automation", "Tools"],
    technologies: ["Chrome extensions", "Browser automation", "On-device AI"],
    status: null,
    items: xExtensions,
    itemNoun: "extension",
    links: { github: null, demo: null, website: productsUrl },
    icon: "puzzle",
  },
  {
    id: "productivity-extensions",
    name: "Productivity Extensions",
    description:
      "Free Chrome extensions by Unique Labs for everyday work in the browser — PDFs, screen capture, two-factor codes and web data — that keep your files on your device.",
    categories: ["AI", "Web", "Tools"],
    technologies: ["Chrome extensions", "In-browser processing"],
    status: null,
    items: productivityExtensions,
    itemNoun: "extension",
    links: { github: null, demo: null, website: productsUrl },
    icon: "puzzle",
  },
  {
    id: "telegram-bots",
    name: "Telegram Bots",
    description: "Bots that bring useful, timely content straight into a Telegram chat.",
    categories: ["Automation", "Tools"],
    technologies: ["Telegram", "Automation"],
    status: null,
    items: [
      {
        name: "Newspaper Brief Daily for BCS",
        slug: "bcs-newspaper-brief",
        description:
          "Daily current affairs for BCS exam preparation: notes in Bangla and three MCQs, delivered every day at 8 AM.",
        href: "https://t.me/BCSNWZ_bot",
        linkLabel: "@BCSNWZ_bot",
        icon: "/images/bcs-news/bcs-news-icon.webp",
      },
    ],
    itemNoun: "bot",
    links: { github: null, demo: null },
    icon: "bot",
  },
];

/*  Projects that are no longer running. They appear under "Archived         */
/*  projects" on the Projects page.                                          */

export const archivedProjects: ArchivedProject[] = [
  {
    id: "signova",
    name: "Signova",
    kind: "AI web platform",
    description: "AI-assisted crypto market analysis that turned market data into trading signals.",
    icon: "chart",
  },
  {
    id: "smart-follower-checker",
    name: "Smart Follower Checker",
    kind: "Telegram bot",
    description: "Analysed an account’s followers and sent the results back to the chat.",
    icon: "bot",
  },
  {
    id: "instagram-video-downloader",
    name: "Instagram Video Downloader",
    kind: "Telegram bot",
    description: "Turned an Instagram post or reel link into a video, ready to save.",
    icon: "bot",
  },
  {
    id: "smm-agent",
    name: "SMM Agent",
    kind: "Telegram bot",
    description: "Social media marketing services and campaign tasks in one chat.",
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
    period: "2019 — Present",
    current: true,
    featured: true,
    description:
      "Co-founded Unique Labs (first called Unique Tech) in 2019 and run it as Co-Founder & COO: KOC and consultancy services, digital marketing and blockchain development, and our own Chrome extensions.",
    link: { label: "About Unique Labs", href: "/unique-labs" },
  },
  {
    id: "masters-research",
    role: "Master’s Student",
    organization: "Biochemistry & Molecular Biology · University of Rajshahi",
    categories: ["Academic", "Research"],
    period: null,
    current: true,
    description:
      "Master’s in Biochemistry & Molecular Biology, after completing the B.Sc. (Hons) there (2021–2026). Research in cancer biology; details will be shared after publication.",
    link: { label: "View research", href: "/research" },
  },
  {
    id: "cbcro",
    role: "Research Member",
    organization: "Computational Biosciences and Chemistry Research Organization (CBCRO)",
    categories: ["Research"],
    period: "Jul 2025 — Sep 2026",
    description:
      "Member of a research organisation working in computational biosciences and chemistry.",
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
    link: { label: "View publication", href: "/research" },
  },
  {
    id: "publication",
    role: "Published Author",
    organization: "Journal of Molecular Structure",
    categories: ["Research"],
    period: "17 Apr 2026",
    description:
      "Co-author of “Solvent-dependent nonlinear optical response and potential Mcl-1 antagonist activity of an azo–hydrazone derivative: Experimental and theoretical studies” (vol. 1368, 146299).",
    link: { label: "Read the explainer", href: "/research/mcl-1-azo-hydrazone-paper" },
  },
  {
    id: "asm",
    role: "Joint IT Secretary (former)",
    organization: "ASM Student Chapter, University of Rajshahi",
    categories: ["Academic"],
    period: null,
    description:
      "Served on the committee of the university’s ASM student chapter, as Joint IT Secretary.",
  },
  {
    id: "technology-projects",
    role: "Developer",
    organization: "Independent technology projects",
    categories: ["Technology", "Projects"],
    period: null,
    description:
      "Building Unique Labs’ Chrome extensions — UnfollowX Pro, GrowX, Unique PDF, FrameShot, Twofold, Rowlio and more — and a daily BCS Telegram bot. Earlier built Signova, an AI-assisted crypto market analysis platform, now discontinued.",
    link: { label: "View projects", href: "/projects" },
  },
];

/* ── Web3 experience ──────────────────────────────────────────────────────── */

export const web3Experience: ExperienceEntry[] = [
  {
    id: "unique-labs-web3",
    role: "Co-Founder",
    organization: "Unique Labs",
    categories: ["Entrepreneurship"],
    period: null,
    current: true,
    featured: true,
    description:
      "KOC and consultancy services, digital marketing, and blockchain development — helping brands and Web3 projects build, launch, and grow.",
    link: { label: "About Unique Labs", href: "/unique-labs" },
  },
  {
    id: "signova-web3",
    role: "Developer",
    organization: "Signova",
    categories: ["Technology"],
    period: null,
    description:
      "AI-assisted crypto market analysis and signal-generation platform, now discontinued.",
    link: { label: "View archived projects", href: "/projects#archived" },
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
  {
    id: "bsc",
    degree: "B.Sc. (Hons)",
    field: "Biochemistry & Molecular Biology",
    institution: "University of Rajshahi",
    location: "Rajshahi, Bangladesh",
    period: "2021 — 2026",
    status: "Completed",
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
/*  file exists, no CV link is shown.                                        */

export const cv = {
  fileName: "Shahriar-Ahmed-CV.pdf",
  href: "/Shahriar-Ahmed-CV.pdf",
  requestSubject: "CV request",
};

/* ── Contact ────────────────────────────────────────────────────────────── */

export const contact = {
  text: "For research collaborations, technology projects, entrepreneurship, or interesting ideas, feel free to reach out.",
  /** Shown on the Contact page. */
  topics: [
    {
      title: "Research collaborations",
      description: "Biochemistry & molecular biology, and cancer biology research.",
      link: { label: "View research", href: "/research" },
    },
    {
      title: "Unique Labs",
      description: "KOC and consultancy services, digital marketing, and blockchain development.",
      link: { label: "About Unique Labs", href: "/unique-labs" },
    },
    {
      title: "Technology projects",
      description: "AI-assisted tools, browser automation, Chrome extensions, and Telegram bots.",
      link: { label: "View projects", href: "/projects" },
    },
  ],
};
