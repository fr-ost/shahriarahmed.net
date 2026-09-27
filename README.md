# shahriarahmed.net

Personal website of **Shahriar Ahmed**, Co-Founder of Unique Labs and Biochemistry & Molecular
Biology researcher at the University of Rajshahi.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide icons. The site
is fully static: every route is prerendered at build time.

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production build (also type-checks)
npm run start      # serve the production build
```

## Editing content

All text, links and facts live in **[`data/portfolio.ts`](data/portfolio.ts)**, apart from the
Privacy Policy and DMCA text, which is in **[`data/legal.ts`](data/legal.ts)**. Components only
render what is there, so you rarely need to touch anything else.

Any field set to `null` (or an empty array) is treated as "not provided yet" and shows a
consistent **Coming soon** placeholder. Replace the `null` with real content when you have it.
Only add verified information.

| What                      | Where in `data/portfolio.ts`                              |
| ------------------------- | --------------------------------------------------------- |
| Name, title, email        | `person` (`fullName` is used for search engines)          |
| Social links              | `socials`, `socialGroups`                                 |
| Hero text, rotating roles | `hero`                                                    |
| About text, profile card  | `about`                                                   |
| Unique Labs               | `uniqueLabs` (mission, services, products, website, …)    |
| Research placeholder      | `currentResearch` (shown until the research is published) |
| Publications              | `publications` (add new papers to the top of the list)    |
| Achievements              | `achievements` (an empty list shows "Coming soon")        |
| Projects & filters        | `projects` (apps, links, key facts), `projectCategories`  |
| Experience, education     | `experience`, `education`                                 |
| Web3 experience           | `web3Experience`, `collaborations`                        |
| Skills                    | `skillGroups`                                             |
| Homepage section headings | `sections`                                                |
| Page headings, summaries  | `pages` (plus `seoTitle`, `seoDescription` for search)    |
| SEO title, description    | `site`                                                    |

### Pages

The homepage covers About, Unique Labs, Publications, Skills, the CV and Contact, and links to
the other pages from its **Explore** section, the navigation and the footer (About, Contact,
Privacy Policy and DMCA sit together at the bottom right):

| Page                    | Route               | Content                                         |
| ----------------------- | ------------------- | ----------------------------------------------- |
| About                   | `/about`            | `about`, `education`, `publications`            |
| Contact                 | `/contact`          | `socials`, `contact` (including `topics`)       |
| Unique Labs             | `/unique-labs`      | `uniqueLabs`                                    |
| Research                | `/research`         | `currentResearch` and `publications`            |
| Projects                | `/projects`         | `projects`                                      |
| Experience              | `/experience`       | `experience`, `education`                       |
| Web3 & Collaborations   | `/experience/web3`  | `web3Experience`, `collaborations`              |
| Achievements            | `/achievements`     | `achievements`                                  |
| Privacy Policy and DMCA | `/privacy`, `/dmca` | `data/legal.ts` (update `legalUpdated` on edit) |

Each page's title, description and card summary come from `pages`. If you add a page, also list
it in `app/sitemap.ts`.

### Search engines

- **Titles and descriptions**: every page has its own title, description and canonical URL
  (`seoTitle` and `seoDescription` in `pages`; the homepage uses `site.title` and
  `site.description`). Keep titles under about 60 characters and descriptions under about 160.
- **Structured data**: every page describes itself and points to the same person, website and
  company (`lib/json-ld.ts`), including the alternative name `person.fullName`, the profile
  links, the ORCID iD, the University of Rajshahi and Unique Labs, plus a breadcrumb.
- **Sitemap and robots**: `/sitemap.xml` lists every page (and the portrait for image search);
  `/robots.txt` allows all crawlers and points to the sitemap. Sitemaps list pages, not
  keywords: keywords belong in titles, headings, text and structured data, which is where they
  are.
- **`/llms.txt`**: a plain-text summary of the site for AI assistants.

What helps most beyond the site itself:

1. In Google Search Console, submit `https://shahriarahmed.net/sitemap.xml` (Sitemaps) and use
   URL Inspection → Request indexing for `/`, `/about`, `/contact` and `/unique-labs`.
2. Add `https://shahriarahmed.net` to every profile: Google Scholar (homepage field), ORCID
   (websites), LinkedIn (contact info), GitHub, X, Instagram, Facebook and Telegram bios. Links
   from these profiles are what tie your name to this site.
3. Use the same name everywhere (Shahriar Ahmed, and Shahriar Ahmed Tushar on publications).
4. Optionally add the site to Bing Webmaster Tools (it can import from Search Console).

### Adding your CV

Put the PDF at `public/Shahriar-Ahmed-CV.pdf` and redeploy. The site checks for the file at build
time: when it exists, the "Download CV" buttons link to it; until then they fall back to a
"Request CV" email link, so nothing ever points at a missing file.

### Social links

Links appear in the Contact section, grouped by their `group` (`research`, `professional` or
`social`; the headings come from `socialGroups`). Links marked `featured: true` also appear as
icons in the hero and footer. A link with `href: null` (currently the WhatsApp username) is shown
as its handle with a copy button, because WhatsApp has no confirmed public link for usernames yet;
set `href` if you get a link. Profile links are also added to the page's structured data, and the
ORCID iD is included as an identifier.

### Projects

A project can link to its live site (`links.website`), list key facts (`details`) and group several
apps under one card (`items`, each with its own link: the Chrome extensions and Telegram bots work
this way). Cards with items show how many they contain (`itemNoun`, e.g. "03 bots") instead of a
status. When the number of visible cards is odd, the first one spans the full width.

### Publications

Each entry in `publications` shows its title, authors, journal, abstract, DOI and where it was
presented, plus its publication date (`published`). Your name is highlighted automatically in the
author list (any author containing `person.name`). A `null` journal or date is simply not shown. Papers with a title are also added to
the page's structured data (JSON-LD).

## Placeholders to replace

These are intentionally left empty rather than invented:

- **Unique Labs**: current products, website, GitHub, company contact email (falls back to your
  personal email)
- **Achievements**: none listed yet, so the page shows "Coming soon"
- **Web3 collaborations**: `collaborations` is empty, so the Web3 page shows "Coming soon"
- **Projects**: GitHub links (`links.github`)
- **Research**: the current research is confidential until published, so the Research section
  page shows a placeholder (`currentResearch`); add the project details there after publication
- **Experience / education**: periods (for example `"2024 — Present"`)
- **CV**: `public/Shahriar-Ahmed-CV.pdf`

Please also verify the education status (`"Current"`).

## Project structure

```
app/                  Routes and metadata files
  layout.tsx          Fonts, SEO metadata, theme script, navbar/footer
  page.tsx            Home page (composes the sections, JSON-LD)
  about/, contact/, unique-labs/, research/, projects/, experience/ (+ web3/),
  achievements/, privacy/, dmca/
                      The other pages
  llms.txt/           Plain-text summary for AI assistants
  not-found.tsx       404 page
  opengraph-image.tsx Social share image (rendered at build time)
  twitter-image.tsx
  robots.ts, sitemap.ts, manifest.ts
  icon.svg, favicon.ico, apple-icon.png
components/
  layout/             Navbar (scroll-spy, mobile menu), footer, theme toggle, scroll progress
  sections/           Homepage sections and the content blocks of the other pages
  ui/                 Buttons, page and section headings, reveal animation, chips, …
  visuals/            SVG visuals (molecular network, cell cycle, Unique Labs diagram)
  icons/              Brand icons and the site mark
data/portfolio.ts     All site content
data/legal.ts         Privacy Policy and DMCA text
lib/                  Types, page metadata and structured data, theme, CV lookup, utilities
styles/globals.css    Design tokens (light/dark), Tailwind theme, base styles
assets/               Fonts and portrait used only by the share image
scripts/              generate-icons.mjs (regenerates favicon and app icons)
public/               Portrait, manifest icons, (your CV)
```

## Design notes

- **Colours and theme**: tokens are CSS variables in `styles/globals.css` (`:root` for light,
  `[data-theme="dark"]` for dark). Light is the default; the toggle remembers the visitor's
  choice and an inline script applies it before first paint, so there is no flash.
- **Typography**: Apple's system font (SF Pro) on iPhone, iPad and Mac. SF Pro cannot be
  embedded on the web, so other devices use Inter, an open-source typeface in the same style
  (self-hosted through `next/font`; also used for the share image).
- **Motion**: subtle, and disabled for visitors who prefer reduced motion. Content is fully
  visible without JavaScript.
- **Icons**: edit the mark in `scripts/generate-icons.mjs` and run `npm run icons` to regenerate
  the favicon and app icons.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New… → Project** and import the repository.
3. Click **Deploy**.
4. Under **Project → Settings → Domains**, add `shahriarahmed.net` (and optionally
   `www.shahriarahmed.net`, redirecting to the apex domain), then add the DNS records Vercel shows
   at your domain registrar.

No environment variables are required.

[`vercel.json`](vercel.json) pins the framework (Next.js), build command and output directory, so
deployments work even if the project's dashboard settings are wrong. Without it, a project whose
**Framework Preset** was saved as **Other** (for example because it was imported while the
repository was still empty) is built as a plain static site from `public/`, and every page returns
Vercel's `404: NOT_FOUND`.

## Licences

Fonts are licensed under the SIL Open Font License 1.1 (see `assets/fonts/`). Brand icons come from
[Simple Icons](https://simpleicons.org) (CC0); the brands are trademarks of their owners.
