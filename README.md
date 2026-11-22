# shahriarahmed.net

Personal website of **Shahriar Ahmed**, Co-Founder of Unique Labs and Biochemistry & Molecular
Biology researcher at the University of Rajshahi.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Lucide icons. The site is fully
static: every route is prerendered at build time.

The SEO plan (host set-up, structured data, content calendar, backlinks, measurement and a 90-day
roadmap) is in **[`docs/SEO.md`](docs/SEO.md)**.

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
Privacy Policy and DMCA text, which is in **[`data/legal.ts`](data/legal.ts)**, and UnfollowX
Pro and its privacy policy, which are in **[`data/unfollowx.ts`](data/unfollowx.ts)**. Components
only render what is there, so you rarely need to touch anything else.

Any field set to `null` (or an empty array) is treated as "not provided yet" and is simply
not shown: there are no "Coming soon" placeholders. Replace the `null` with real content when you
have it, and it appears. Only add verified information.

| What                                                    | Where in `data/portfolio.ts`                              |
| ------------------------------------------------------- | --------------------------------------------------------- |
| Name, title, email                                      | `person` (`fullName` is used for search engines)          |
| Social links                                            | `socials`, `socialGroups`                                 |
| Hero text, rotating roles                               | `hero`                                                    |
| About text, profile card                                | `about`                                                   |
| Unique Labs                                             | `uniqueLabs` (mission, services, products, website, …)    |
| Research placeholder                                    | `currentResearch` (shown until the research is published) |
| Publications                                            | `publications` (add new papers to the top of the list)    |
| Achievements                                            | `achievements` (the page appears once the list has items) |
| Projects & filters                                      | `projects` (apps, links, key facts), `projectCategories`  |
| Experience, education                                   | `experience`, `education`                                 |
| Web3 experience                                         | `web3Experience`                                          |
| Skills                                                  | `skillGroups`                                             |
| Navigation                                              | `navigation`, `navigationCta` (the Contact button)        |
| Homepage section headings                               | `sections`                                                |
| Page headings, summaries                                | `pages` (plus `seoTitle`, `seoDescription` for search)    |
| SEO title, description                                  | `site`                                                    |
| Extra copy on /research, /unique-labs, /experience/web3 | `researchIntro`, `uniqueLabsStory`, `web3Intro`           |

Other content files: product pages in [`data/product-details.ts`](data/product-details.ts)
(descriptions, features, covers), /now in [`data/now.ts`](data/now.ts) (update `nowUpdated`), and
blog posts in [`data/posts.ts`](data/posts.ts).

### Pages

The homepage is a short tour: the hero, a ticker of focus areas and skills, an About statement
with key facts, a **Work** grid (research, Unique Labs, experience, UnfollowX Pro, GrowX and the
Telegram bot), the latest publication and a contact panel. Each part links to its page, and the
navigation and footer link to every page (About, Contact, Privacy Policy and DMCA sit together in
the footer):

| Page                    | Route                                                           | Content                                             |
| ----------------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| About                   | `/about`                                                        | `about`, `education`, `publications`, `skillGroups` |
| Contact                 | `/contact`                                                      | `socials`, `contact` (including `topics`)           |
| Unique Labs             | `/unique-labs`                                                  | `uniqueLabs`                                        |
| Research                | `/research`                                                     | `currentResearch` and `publications`                |
| Projects                | `/projects`                                                     | `projects`                                          |
| Product pages (9)       | `/projects/{slug}`                                              | `data/products.ts`, `data/product-details.ts`       |
| BCS Telegram bot        | `/projects/bcs-newspaper-brief`                                 | `pages.bcsBot`, the bot in `projects`               |
| Paper explainer         | `/research/mcl-1-azo-hydrazone-paper`                           | `publications`, text in the page file               |
| CV                      | `/cv` (and the PDF)                                             | `person`, `education`, `experience`, `skillGroups`  |
| Now                     | `/now`                                                          | `data/now.ts`                                       |
| Blog                    | `/blog`, `/blog/{slug}`, `/blog/rss.xml` (once there are posts) | `data/posts.ts`                                     |
| UnfollowX Pro privacy   | `/projects/x-mass-unfollow/privacy`                             | `data/unfollowx.ts` (`unfollowXPrivacy`)            |
| Experience              | `/experience`                                                   | `experience`, `education`                           |
| Web3 Experience         | `/experience/web3`                                              | `web3Experience`                                    |
| Achievements            | `/achievements` (once it has items)                             | `achievements`                                      |
| Privacy Policy and DMCA | `/privacy`, `/dmca`                                             | `data/legal.ts` (update `legalUpdated` on edit)     |

Each page's title, description and card summary come from `pages`. If you add a page, also list
it in `app/sitemap.ts`, and its source files in `lib/lastmod.ts` (for its last-modified date).

### Search engines

- **Titles and descriptions**: every page has its own title, description and canonical URL
  (`seoTitle` and `seoDescription` in `pages`; the homepage uses `site.title` and
  `site.description`). Keep titles under about 60 characters and descriptions under about 160.
- **Structured data**: every page describes itself and points to the same person, website and
  company (`lib/json-ld.ts`), including the alternative name `person.fullName`, the profile
  links, the ORCID iD, the University of Rajshahi and Unique Labs, plus a breadcrumb.
- **UnfollowX Pro**: its privacy page describes the extension as a `SoftwareApplication` whose
  canonical page is its own website, www.unfollowx.com.
- **Sitemap and robots**: `/sitemap.xml` lists every page, with the date its content last
  changed (from git history, `lib/lastmod.ts`; left out when unknown) and the portrait and
  product covers for image search; `/robots.txt` allows all crawlers and points to the sitemap. Sitemaps list pages, not
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

### The CV

`/cv` is built from the site's data and prints on A4. `public/Shahriar-Ahmed-CV.pdf` is printed
from it; when the file exists, "Download CV" links appear in the hero and on `/cv`. After changing
anything the CV shows, regenerate it (needs Playwright with Chromium):

```bash
npm run build && npm run start   # terminal 1
npm run cv:pdf                   # terminal 2: writes public/Shahriar-Ahmed-CV.pdf
npm run build                    # picks up the new PDF
```

### The blog

Add posts to `data/posts.ts` (the file explains the format). Until the first post exists,
`/blog` and its feed return 404 and nothing links to them; with the first post, the blog appears
in the footer, the sitemap, `llms.txt` and `/blog/rss.xml`. Ideas and outlines for the first 12
posts are in `docs/SEO.md` (section J).

### Social links

Links appear in the Contact section, grouped by their `group` (`research`, `professional` or
`social`; the headings come from `socialGroups`). Links marked `featured: true` also appear as
icons in the hero and footer. A link with `href: null` (currently the WhatsApp username) is shown
as its handle with a copy button, because WhatsApp has no confirmed public link for usernames yet;
set `href` if you get a link. Profile links are also added to the page's structured data, and the
ORCID iD is included as an identifier.

### Projects

The Chrome extensions come from the Unique Labs website: **[`data/products.ts`](data/products.ts)**
copies the names, taglines, summaries, store links and product websites from
`src/content/products.ts` in the `fr-ost/www.uniquelabs.org` repository, and the logos from its
`public/images/products/` (saved here in `public/images/products/` as 96 px WebP, with the
covers in `covers/`). Each extension also has its own page, `/projects/{slug}`, with the
description and features from the company website, in `data/product-details.ts`. When a product is
added or changed there, update that file to match. Items can carry a `tagline` (used on the
homepage) and a `status` such as "Beta" or "Private" (shown as a small label).

A project can link to its live site (`links.website`), list key facts (`details`) and group several
apps under one card (`items`, each with its own link: the Chrome extensions and Telegram bots work
this way). An item can also link to its own website (`page`, shown as "Product page" before the
store link), as the extensions do. Cards with items show how many they contain
(`itemNoun`, e.g. "02 extensions") instead of a status. When the number of visible cards is odd,
the first one spans the full width.

Discontinued projects go in `archivedProjects`: a name, what it was (`kind`), one short sentence
and an icon. They are shown as small boxes under "Archived projects (discontinued)", without
links.

### UnfollowX Pro

UnfollowX Pro (formerly X Mass Unfollow) has its own website, www.unfollowx.com. The old product
page, `/projects/x-mass-unfollow`, redirects there permanently (`next.config.ts`), so old links
keep working. Its privacy policy stays at `/projects/x-mass-unfollow/privacy`, the address the
Chrome Web Store listing may use; if the policy changes, update `unfollowXPrivacy` and
`unfollowXPrivacyUpdated` in `data/unfollowx.ts`.

### Publications

Each entry in `publications` shows its title, authors, journal, abstract, DOI and where it was
presented, plus its publication date (`published`). Your name is highlighted automatically in the
author list (any author containing `person.name`). A `null` journal or date is simply not shown. Papers with a title are also added to
the page's structured data (JSON-LD).

## Placeholders to replace

These are intentionally left empty rather than invented:

- **Unique Labs**: GitHub and company contact email (falls back to your personal email);
  its products are the Chrome extensions in `data/products.ts`. Its partnerships are on
  its own website (`uniqueLabs.website`, www.uniquelabs.org), which the Web3 page links to
- **Achievements**: none listed yet, so the page is hidden (it returns 404 and is not linked)
- **Projects**: GitHub links (`links.github`)
- **Research**: the current research is confidential until published, so the Research section
  page shows a placeholder (`currentResearch`); add the project details there after publication
- **Experience / education**: periods (for example `"2024 — Present"`)
- **Product case studies**: stack, launch dates and figures you can verify (see `docs/SEO.md`, G)

## Project structure

```
app/                  Routes and metadata files
  layout.tsx          Fonts, SEO metadata, theme script, navbar/footer
  page.tsx            Home page (composes the sections, JSON-LD)
  about/, contact/, unique-labs/, research/, projects/, experience/ (+ web3/),
  achievements/, privacy/, dmca/, cv/, now/
                      The other pages
  projects/[slug]/    One page per Chrome extension
  projects/bcs-newspaper-brief/        The Telegram bot (with a Bangla section)
  research/mcl-1-azo-hydrazone-paper/  Plain-language explainer of the paper
  blog/               Index, posts and rss.xml (hidden until there are posts)
  projects/x-mass-unfollow/privacy/   UnfollowX Pro privacy policy (old address)
                      The extension's page and its privacy policy
  llms.txt/           Plain-text summary for AI assistants
  not-found.tsx       404 page
  opengraph-image.tsx Social share image (rendered at build time)
  twitter-image.tsx
  robots.ts, sitemap.ts, manifest.ts
  icon.svg, favicon.ico, apple-icon.png
components/
  layout/             Navbar (scroll-spy, mobile menu), footer, theme toggle, scroll progress
  sections/           Homepage sections and the content blocks of the other pages
  fx/                 Motion and light: aurora, molecule network, cursor spotlight, tilt,
                      ticker, word reveals, timeline rail, scroll cue
  ui/                 Buttons, page and section headings, reveal animation, chips, …
  visuals/            SVG visuals (cell cycle, Unique Labs diagram)
  icons/              Brand icons and the site mark
data/portfolio.ts     All site content
data/legal.ts         Privacy Policy and DMCA text
data/products.ts      Unique Labs' Chrome extensions (from www.uniquelabs.org)
data/unfollowx.ts     UnfollowX Pro and its privacy policy
data/product-details.ts  Product page copy (from www.uniquelabs.org)
data/now.ts           The /now page
data/posts.ts         Blog posts
docs/SEO.md           SEO plan and checklist
lib/                  Types, page metadata and structured data, theme, CV lookup, utilities
styles/globals.css    Design tokens (light/dark), Tailwind theme, base styles
assets/               Fonts and portrait used only by the share image
scripts/              generate-icons.mjs (favicon and app icons), cv-pdf.mjs (the CV PDF)
public/               Portrait, manifest icons, extension icons and covers, the CV PDF
```

## Design notes

- **Colours and theme**: tokens are CSS variables in `styles/globals.css` (`:root` for light,
  `[data-theme="dark"]` for dark), including the aurora, gradient-text, spotlight and molecule
  colours. The theme follows the visitor's system setting until they choose one with the toggle,
  which is remembered; an inline script applies it before first paint, so there is no flash.
- **Typography**: Apple's system font (SF Pro) on iPhone, iPad and Mac. SF Pro cannot be
  embedded on the web, so other devices use Inter, an open-source typeface in the same style
  (self-hosted through `next/font`; also used for the share image).
- **Motion**: a molecular network in the hero that bonds to the pointer, word-by-word
  headings, a statement that brightens as it scrolls into view, cards lit by the cursor, a
  tilting portrait with a gradient ring that turns on hover, a self-drawing experience timeline
  and a ticker. Everything holds still for visitors who prefer reduced motion, and content is
  fully visible without JavaScript.
- **Performance**: there is no animation library. Reveal-on-scroll needs no JavaScript per
  element: the reveal components render data attributes on the server, and one page-wide
  observer (`lib/reveal.ts`) starts their CSS transitions; images are pre-sized WebP served as-is
  (`images.unoptimized`, so no image-optimisation quota can run out); the Google tag loads once
  the page is idle; the reading-progress bar and
  timeline use one passive scroll handler each, at most once per frame. Nothing large is
  animated continuously: the aurora is still, there is no blended grain, and the floating cards
  in the hero are solid rather than blurred. The molecular network fades its own edges (no CSS
  mask), pauses off screen and while the page scrolls, and runs at 30 fps at up to 1.5× pixel
  density. There are no page transitions, so navigation is immediate. On touch screens the
  scrolled navbar is solid rather than blurred, and small text links get a taller hit area
  (the `tap` utility).
- **Icons**: edit the mark in `scripts/generate-icons.mjs` and run `npm run icons` to regenerate
  the favicon and app icons.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New… → Project** and import the repository.
3. Click **Deploy**.
4. Under **Project → Settings → Domains**, add `shahriarahmed.net` as the **primary** domain and
   `www.shahriarahmed.net` **redirecting (308) to it**, then add the DNS records Vercel shows at
   your domain registrar. The apex must be the address Vercel serves without redirecting, because
   every canonical link, the sitemap and the structured data use it (see `docs/SEO.md`, B). To
   use `www` instead, set `NEXT_PUBLIC_SITE_URL=https://www.shahriarahmed.net`.

No environment variables are required. Two are optional, for search: set
`GOOGLE_SITE_VERIFICATION` to the code from Google Search Console's "HTML tag" method, and
`BING_SITE_VERIFICATION` to the code from Bing Webmaster Tools, then redeploy. Each adds its
`<meta>` verification tag to every page.

### Getting found for your name

The site already does the on-page work: titles and headings lead with "Shahriar Ahmed", the
homepage is a `ProfilePage` about you, and the structured data lists your name variants
(Shahriar, Shahriar Ahmed Tushar) and links every profile. What moves rankings from there:

1. **Google Search Console**: verify the domain (DNS record in Vercel, or the variable above),
   submit `https://shahriarahmed.net/sitemap.xml`, and use **URL inspection → Request indexing**
   for the homepage. Do the same in Bing Webmaster Tools (it can import from Search Console).
2. **Link back from every profile**: put `https://shahriarahmed.net` in the website field of
   your Google Scholar, ORCID, LinkedIn, GitHub, X, Facebook, Instagram and Telegram profiles,
   using the same name, "Shahriar Ahmed", on each.
3. **Use the address**: in the email signature, papers' author pages, conference bios and
   Unique Labs' channels.

[`vercel.json`](vercel.json) pins the framework (Next.js), build command and output directory, so
deployments work even if the project's dashboard settings are wrong. Without it, a project whose
**Framework Preset** was saved as **Other** (for example because it was imported while the
repository was still empty) is built as a plain static site from `public/`, and every page returns
Vercel's `404: NOT_FOUND`.

## Licences

Fonts are licensed under the SIL Open Font License 1.1 (see `assets/fonts/`). Brand icons come from
[Simple Icons](https://simpleicons.org) (CC0); the brands are trademarks of their owners.
