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

All text, links and facts live in **[`data/portfolio.ts`](data/portfolio.ts)**. Components only
render what is there, so you rarely need to touch anything else.

Any field set to `null` (or an empty array) is treated as "not provided yet" and shows a
consistent **Coming soon** placeholder. Replace the `null` with real content when you have it.
Only add verified information.

| What                      | Where in `data/portfolio.ts`                               |
| ------------------------- | ---------------------------------------------------------- |
| Name, title, email        | `person`                                                   |
| Social links              | `socials`                                                  |
| Hero text, rotating roles | `hero`                                                     |
| About text, profile card  | `about`                                                    |
| Unique Labs               | `uniqueLabs` (mission, products, website, GitHub, …)       |
| Featured research         | `featuredResearch`                                         |
| Research timeline         | `researchTimeline` (add `date` + `dateTime` to show dates) |
| Publications              | `publications` (add new papers to the top of the list)     |
| Achievements              | `achievements`                                             |
| Projects & filters        | `projects`, `projectCategories`                            |
| Experience, education     | `experience`, `education`                                  |
| Skills                    | `skillGroups`                                              |
| Section headings          | `sections`                                                 |
| SEO title, description    | `site`                                                     |

### Adding your CV

Put the PDF at `public/Shahriar-Ahmed-CV.pdf` and redeploy. The site checks for the file at build
time: when it exists, the "Download CV" buttons link to it; until then they fall back to a
"Request CV" email link, so nothing ever points at a missing file.

### Completing the publication

The DOI (`10.1016/j.molstruc.2026.146299`) is the authoritative link. Fill in `title`, `authors`,
`journal`, `year` and `abstract` in `publications` when you want them shown. Once a title is
present, the paper is also added to the page's structured data (JSON-LD) automatically.

## Placeholders to replace

These are intentionally left empty rather than invented:

- **Publication**: title, authors, journal, year, abstract
- **Unique Labs**: mission, what we build, current products, website, GitHub, company contact
  email (falls back to your personal email)
- **Projects**: status, GitHub and live-demo URLs for each project, and the technology lists
  (currently limited to terms from the project descriptions)
- **Research**: findings summary (`featuredResearch.findings`), milestone dates in
  `researchTimeline`
- **Experience / education**: periods (for example `"2024 — Present"`)
- **CV**: `public/Shahriar-Ahmed-CV.pdf`

Please also verify a few inferred details: the research status (`"Ongoing"`), the education
status (`"Current"`), and that the conference presentation in the research timeline is the one
that received 1st place.

## Project structure

```
app/                  Routes and metadata files
  layout.tsx          Fonts, SEO metadata, theme script, navbar/footer
  page.tsx            Home page (composes the sections, JSON-LD)
  not-found.tsx       404 page
  opengraph-image.tsx Social share image (rendered at build time)
  twitter-image.tsx
  robots.ts, sitemap.ts, manifest.ts
  icon.svg, favicon.ico, apple-icon.png
components/
  layout/             Navbar (scroll-spy, mobile menu), footer, theme toggle, scroll progress
  sections/           One component per page section
  ui/                 Buttons, section headings, reveal animation, chips, dialog, …
  visuals/            SVG visuals (molecular network, cell cycle, Unique Labs diagram)
  icons/              Brand icons and the site mark
data/portfolio.ts     All site content
lib/                  Types, theme helpers, JSON-LD, CV lookup, utilities
styles/globals.css    Design tokens (light/dark), Tailwind theme, base styles
assets/               Fonts and portrait used only by the share image
scripts/              generate-icons.mjs (regenerates favicon and app icons)
public/               Portrait, manifest icons, (your CV)
```

## Design notes

- **Colours and theme**: tokens are CSS variables in `styles/globals.css` (`:root` for light,
  `[data-theme="dark"]` for dark). Light is the default; the toggle remembers the visitor's
  choice and an inline script applies it before first paint, so there is no flash.
- **Typography**: Instrument Serif (display), Instrument Sans (text), IBM Plex Mono (labels),
  self-hosted through `next/font`.
- **Motion**: subtle, and disabled for visitors who prefer reduced motion. Content is fully
  visible without JavaScript.
- **Icons**: edit the mark in `scripts/generate-icons.mjs` and run `npm run icons` to regenerate
  the favicon and app icons.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New… → Project** and import the repository. Vercel detects Next.js
   automatically; keep the default build settings (`next build`, output handled by Vercel).
3. Click **Deploy**.
4. Under **Project → Settings → Domains**, add `shahriarahmed.net` (and optionally
   `www.shahriarahmed.net`, redirecting to the apex domain), then add the DNS records Vercel shows
   at your domain registrar.

No environment variables are required.

## Licences

Fonts are licensed under the SIL Open Font License 1.1 (see `assets/fonts/`).
