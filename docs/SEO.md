# SEO plan for shahriarahmed.net

The full SEO package from the 22 November 2026 audit (deliverables A–O).
Most of it is **already implemented in this repository**. Each item says
whether it is **Done** (in code), or an action for **you**: in Vercel,
Search Console, or on another website.

Conventions: **[CONFIRM]** marks a fact you need to confirm before it is
used anywhere. **[ASSUMPTION]** marks something I assumed. No search
volumes, traffic, Domain Authority or rankings are given anywhere: those are
unknown until you measure them in Google Search Console.

Where things live:

| What                                                            | File                                                        |
| --------------------------------------------------------------- | ----------------------------------------------------------- |
| Site address, profile facts, page titles and descriptions, copy | `data/portfolio.ts` (`site`, `person`, `pages`, `about`, …) |
| Products (from www.uniquelabs.org)                              | `data/products.ts`, `data/product-details.ts`               |
| Metadata for every page                                         | `lib/metadata.ts` (`pageMetadata`)                          |
| Structured data (JSON-LD)                                       | `lib/json-ld.ts`                                            |
| Sitemap, robots, llms.txt                                       | `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`  |
| Real "last modified" dates                                      | `lib/lastmod.ts`                                            |
| Blog posts                                                      | `data/posts.ts`                                             |
| /now                                                            | `data/now.ts`                                               |
| Security headers, images                                        | `next.config.ts`                                            |

> The brief assumed a `lib/site.ts`. In this project the same role is played
> by `site` and `person` in `data/portfolio.ts`: every URL on the site is
> built from `site.url`.

---

## A. Executive summary

The site was already technically sound (server-rendered, unique titles,
rich structured data, Lighthouse SEO 100). The two critical problems were
outside the content. First, the domain set-up: Vercel redirects the apex to
`www`, while every canonical link points at the apex. Second, product icons
were broken because the Vercel image quota had run out (HTTP 402). The
image problem is now fixed in code. The host problem needs one setting in
Vercel (section B).

On top of that, this change adds:

- eleven indexable pages: nine product case studies, a plain-language
  explainer of the paper, and the Telegram bot page with a Bangla section;
- /cv with a PDF, and /now;
- a blog that switches itself on with the first post;
- answer-first About copy and an FAQ;
- stronger entity data: occupations, memberships, languages and the
  company's 2019 founding;
- real `lastmod` dates in the sitemap, with robots.txt cleaned up;
- a lighter Google tag and stricter security headers.

What remains is mostly off-site: profile consistency, Search Console, and
writing.

### Top 10 fixes, by impact ÷ effort

| #   | Fix                                                                                                                         | Impact      | Effort | Status                               |
| --- | --------------------------------------------------------------------------------------------------------------------------- | ----------- | ------ | ------------------------------------ |
| 1   | Make the apex `shahriarahmed.net` the primary domain in Vercel, with `www` 308-redirecting to it (B)                        | Critical    | 5 min  | **You**                              |
| 2   | Stop the 402 images: `images.unoptimized`, with icons pre-sized to WebP (C)                                                 | Critical    | S      | **Done**                             |
| 3   | Verify Search Console (Domain property) and Bing, then submit the sitemap (N)                                               | High        | S      | **You**                              |
| 4   | robots.txt without `Host`; sitemap with real `lastmod` and no `changefreq`/`priority` (H)                                   | Medium      | S      | **Done**                             |
| 5   | Product case-study pages, paper explainer, bot page (Bangla), /cv + PDF, /now (G)                                           | High        | M      | **Done**                             |
| 6   | One identity everywhere: LinkedIn education, Rajshahi not Dhaka, @0x_nation as the main X account (F, K)                    | High        | S      | **You**                              |
| 7   | Entity JSON-LD: occupations, alumniOf, memberOf, languages, homeLocation, foundingDate, SoftwareApplication per product (E) | Medium      | S      | **Done**                             |
| 8   | Answer-first "In brief" and FAQ on /about; more copy on /research, /unique-labs, /experience/web3 (F)                       | Medium      | S      | **Done**                             |
| 9   | Google tag after the page is idle (`lazyOnload`), HSTS preload, CSP (M)                                                     | Medium      | S      | **Done** (Consent Mode is your call) |
| 10  | Start the blog: one post a week for 12 weeks (J)                                                                            | High (slow) | L      | **You** (blog is built)              |

---

## B. Host and canonical fix

**The problem:** `https://shahriarahmed.net` answers with a 308 redirect to
`https://www.shahriarahmed.net/`, but every canonical, `og:url`, sitemap
`<loc>`, robots `Sitemap:` line, JSON-LD `@id` and llms.txt link uses the
apex. Google is told "the canonical is X" by a page that X redirects away
from.

Every one of those URLs comes from `site.url` in `data/portfolio.ts`:

```ts
// data/portfolio.ts
export const site = {
  /**
   * The site's address, used in canonical links, the sitemap, robots.txt,
   * structured data and llms.txt. It must be the host Vercel serves without
   * redirecting (Project → Settings → Domains → the primary domain).
   * NEXT_PUBLIC_SITE_URL overrides it, e.g. "https://www.shahriarahmed.net".
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://shahriarahmed.net").replace(/\/$/, ""),
  // …
};
```

It flows into:

- `app/layout.tsx`: `metadataBase: new URL(site.url)`, so every canonical
  and `og:url`;
- `app/sitemap.ts`: every `<loc>` and image URL, through `absolute()`;
- `app/robots.ts`: `sitemap: \`${site.url}/sitemap.xml\``;
- `lib/json-ld.ts`: every `@id` and `url`;
- `app/llms.txt/route.ts` and `app/blog/rss.xml/route.ts`.

So there is exactly one switch.

### Option A: apex is primary (recommended, no code change)

1. Vercel → your project → **Settings → Domains**.
2. On `shahriarahmed.net`, choose **Edit**. Connect it to **Production**
   with **no redirect**.
3. On `www.shahriarahmed.net`, choose **Edit**, then **Redirect to**
   `shahriarahmed.net` with status **308 Permanent Redirect**.
4. Save. Vercel may label these controls slightly differently. **[CONFIRM]**

Why A: the apex is already in every URL that Google, ORCID, LinkedIn, the
sitemap and the structured data know. It is shorter, and it needs no
redeploy.

### Option B: keep www as primary

1. Vercel → **Settings → Environment Variables** → add
   `NEXT_PUBLIC_SITE_URL` = `https://www.shahriarahmed.net` for
   **Production**.
2. Redeploy. Every URL listed above switches to `www`. No file needs to
   change.
3. Update the website field on every profile (section L) to the `www`
   address.

Do **not** add a redirect in `next.config.ts` as well. Vercel's domain
redirect already does it, and two layers of redirects can loop.

### Verification checklist (after either option)

```bash
# Primary host: 200, no redirect
curl -sI https://shahriarahmed.net/ | head -1                      # HTTP/2 200
# The other host: one 308 hop to the primary, path kept
curl -sI https://www.shahriarahmed.net/research | grep -iE "^(HTTP|location)"
#   HTTP/2 308
#   location: https://shahriarahmed.net/research
# HTTP → HTTPS (not checked in the audit)
curl -sI http://shahriarahmed.net/ | grep -iE "^(HTTP|location)"   # 308 → https://
# Canonical, sitemap and robots all on the primary host
curl -s https://shahriarahmed.net/about | grep -o '<link rel="canonical"[^>]*>'
curl -s https://shahriarahmed.net/robots.txt
curl -s https://shahriarahmed.net/sitemap.xml | grep -c "<loc>https://shahriarahmed.net"
# Security headers
curl -sI https://shahriarahmed.net/ | grep -iE "strict-transport|content-security"
```

Then, in Google Search Console:

1. Use **URL Inspection** on `/`, `/about` and `/research`. "User-declared
   canonical" and "Google-selected canonical" should both be the primary
   host.
2. Under **Sitemaps**, remove any old sitemap and submit
   `https://shahriarahmed.net/sitemap.xml`.
3. Over the next 2–4 weeks, watch **Pages → "Page with redirect"** and
   **"Alternate page with proper canonical tag"**. Both should shrink to the
   redirecting host's URLs only.

---

## C. Image 402 fix (Done)

**Cause:** `/_next/image` URLs go through Vercel Image Optimization. That is
metered, and the plan's quota was used up, so every resized icon returned
HTTP 402.

**Fix, in `next.config.ts`:**

```ts
// next.config.ts
images: {
  // Vercel's image optimisation is metered; once the plan's quota is used,
  // every /_next/image URL returns 402 and images break. The images in
  // /public are already sized and compressed WebP, so serve them as-is.
  unoptimized: true,
},
```

The source images were also re-exported at the size they are shown:

- product icons: 96 × 96 WebP, about 2 KB each, in
  `public/images/products/*.webp`;
- portrait: 880 × 880 WebP (31 KB, was 82 KB);
- the bot icon in WebP;
- product covers in `public/images/products/covers/`.

**The trade-off:** there is no automatic `srcset` and no AVIF, so every
device gets the same file. For icons shown at 32–48 px, a 96 px source
already covers high-density screens. For the portrait and covers, one
well-compressed WebP is close to what the optimiser produced anyway. The
benefit is that there is no quota to run out, and so no broken images.

**To add or update an image**, resize it before committing. `sharp` comes
with Next.js:

```bash
# Icons: 96 px square WebP next to each PNG, then delete the PNGs
node -e 'const sharp=require("sharp");for(const f of process.argv.slice(1))sharp(f).resize(96,96).webp({quality:90}).toFile(f.replace(/\.png$/,".webp")).then(()=>console.log(f))' public/images/products/*.png
# A photo or cover: at most 1600 px wide
node -e 'const sharp=require("sharp");const[f,o]=process.argv.slice(1);sharp(f).resize({width:1600,withoutEnlargement:true}).webp({quality:82}).toFile(o)' input.jpg public/images/output.webp
```

If you later move to a paid Vercel plan, you can delete `unoptimized`.
Pages would then get responsive `srcset` back, as long as the quota lasts.

---

## D. Meta tags for every page (Done)

All titles are 60 characters or fewer. Nearly every description is
140–160 characters (`/contact` is 148, `/now` 147). "Shahriar Ahmed" is in
every title or description, with "Tushar" where it reads naturally.

For every page, Rajshahi is the city, the canonical is
`https://shahriarahmed.net{URL}`, and `og:title`/`og:description` equal
the title and description. The table was generated from the built site.

| URL                                   | Title (chars)                                                | Meta description (chars)                                                                                                                                              | H1                                 | og:image alt                                                   |
| ------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------- |
| `/`                                   | Shahriar Ahmed — Researcher & Co-Founder of Unique Labs (55) | Shahriar Ahmed (Shahriar Ahmed Tushar): Biochemistry & Molecular Biology researcher at the University of Rajshahi, Bangladesh, and co-founder of Unique Labs. (157)   | Shahriar Ahmed                     | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/about`                              | About Shahriar Ahmed Tushar — Researcher & Founder (50)      | Shahriar Ahmed (Shahriar Ahmed Tushar) is a biochemistry researcher from Rajshahi, Bangladesh, and Co-Founder & COO of Unique Labs. Background, skills, FAQ. (156)    | About Shahriar Ahmed               | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/unique-labs`                        | Unique Labs by Shahriar Ahmed — KOC, Marketing & Web3 (53)   | Unique Labs, co-founded in 2019 by Shahriar Ahmed: KOC and consultancy, digital marketing, blockchain development, and Chrome extensions such as Unique PDF. (156)    | Unique Labs                        | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/research`                           | Research & Publications — Shahriar Ahmed (40)                | Research by Shahriar Ahmed Tushar in Biochemistry & Molecular Biology at the University of Rajshahi: cancer biology and a Journal of Molecular Structure paper. (159) | Research                           | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/research/mcl-1-azo-hydrazone-paper` | Mcl-1 Azo–Hydrazone Paper Explained — Shahriar Ahmed (52)    | A plain-language guide by co-author Shahriar Ahmed Tushar to a 2026 Journal of Molecular Structure paper: an azo–hydrazone compound, its optics and Mcl-1. (154)      | Our Mcl-1 paper, in plain language | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/projects`                           | Projects by Shahriar Ahmed — Chrome Extensions & Bots (53)   | Projects by Shahriar Ahmed: Unique Labs’ Chrome extensions (UnfollowX Pro, GrowX, Unique PDF, FrameShot and more), a daily BCS Telegram bot, and archived work. (159) | Selected Projects                  | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/projects/unfollowx-pro`             | UnfollowX Pro — Chrome Extension by Shahriar Ahmed (50)      | UnfollowX Pro, a Chrome extension by Shahriar Ahmed at Unique Labs: see who doesn't follow you back on X and unfollow them at a safe pace. Free, no limits. (155)     | UnfollowX Pro                      | UnfollowX Pro: unfollow everyone who doesn't follow you back   |
| `/projects/growx`                     | GrowX — Chrome Extension by Shahriar Ahmed (42)              | GrowX, the X (Twitter) growth extension for Chrome by Shahriar Ahmed at Unique Labs: auto follow, post scheduler, on-device AI writer and analytics. (148)            | GrowX                              | GrowX: the ultimate X growth tool                              |
| `/projects/scorex`                    | ScoreX — Chrome Extension by Shahriar Ahmed (43)             | ScoreX (beta), a Chrome extension by Shahriar Ahmed at Unique Labs that replies to the accounts you choose on X, in your own voice. Invite-only access. (151)         | ScoreX                             | ScoreX: get followed back by the accounts that move your score |
| `/projects/xaicg`                     | XAICG — Chrome Extension by Shahriar Ahmed (42)              | XAICG, a free Chrome extension by Shahriar Ahmed at Unique Labs that writes X (Twitter) replies, posts and threads in your voice, with on-device AI. (148)            | XAICG                              | XAICG: free AI replies for X, in your own voice                |
| `/projects/uniquefarm`                | UniqueFarm — Chrome Extension by Shahriar Ahmed (47)         | UniqueFarm, a private-use Chrome side panel for X by Shahriar Ahmed at Unique Labs: replies in your voice, posted with human timing and a review hold. (150)          | UniqueFarm                         | UniqueFarm: grow on X without sounding like a bot              |
| `/projects/unique-pdf`                | Unique PDF — Chrome Extension by Shahriar Ahmed (47)         | Unique PDF, a free Chrome extension by Shahriar Ahmed at Unique Labs: 20 PDF tools and AI chat with any PDF. Everything runs in your browser; no uploads. (153)       | Unique PDF                         | Unique PDF: the free PDF editor with AI chat                   |
| `/projects/frameshot`                 | FrameShot — Chrome Extension by Shahriar Ahmed (46)          | FrameShot, a free Chrome extension by Shahriar Ahmed at Unique Labs: record your screen with sound and camera, or capture full web pages. No watermark. (151)         | FrameShot                          | FrameShot: free screen recorder and full-page screenshot       |
| `/projects/twofold`                   | Twofold — Chrome Extension by Shahriar Ahmed (44)            | Twofold, a free 2FA authenticator for Chrome by Shahriar Ahmed at Unique Labs: one-click codes, smart autofill, passkeys and encrypted backup and sync. (151)         | Twofold                            | Twofold: 2FA codes, autofill and passkeys                      |
| `/projects/rowlio`                    | Rowlio — Chrome Extension by Shahriar Ahmed (43)             | Rowlio, a free Chrome web scraper by Shahriar Ahmed at Unique Labs: extract tables, listings, links and contacts into rows; export to CSV, Excel or JSON. (153)       | Rowlio                             | Rowlio: turn any webpage into structured data                  |
| `/projects/bcs-newspaper-brief`       | BCS Current Affairs Telegram Bot — Shahriar Ahmed (49)       | Newspaper Brief Daily for BCS (@BCSNWZ_bot), a Telegram bot by Shahriar Ahmed: daily BCS current affairs notes in Bangla and three MCQs, every day at 8 AM. (155)     | Newspaper Brief Daily for BCS      | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/experience`                         | Experience — Shahriar Ahmed, Unique Labs & BMB Research (55) | Experience of Shahriar Ahmed: Co-Founder & COO of Unique Labs since 2019; Master’s student in Biochemistry & Molecular Biology at the University of Rajshahi. (157)   | Experience                         | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/experience/web3`                    | Web3 Experience — Shahriar Ahmed (32)                        | Web3 experience of Shahriar Ahmed, Co-Founder of Unique Labs: KOC and consultancy, digital marketing, and blockchain development for Web3 brands and projects. (158)  | Web3 Experience                    | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/contact`                            | Contact Shahriar Ahmed — Email & Profiles (41)               | Contact Shahriar Ahmed (Shahriar Ahmed Tushar) in Rajshahi, Bangladesh, by email or through Google Scholar, ORCID, LinkedIn, GitHub, X and Telegram. (148)            | Contact Shahriar Ahmed             | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/cv`                                 | CV — Shahriar Ahmed Tushar, Biochemistry & Unique Labs (54)  | CV of Shahriar Ahmed Tushar, Rajshahi, Bangladesh: B.Sc. (Hons) and Master’s in Biochemistry & Molecular Biology, publication, Unique Labs. PDF download. (153)       | Shahriar Ahmed Tushar              | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/now`                                | Now — What Shahriar Ahmed Is Working On (39)                 | What Shahriar Ahmed is doing now: a Master’s in Biochemistry & Molecular Biology at the University of Rajshahi, Unique Labs, and Chrome extensions. (147)             | What I’m doing now                 | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/privacy`                            | Privacy Policy — Shahriar Ahmed (31)                         | Privacy policy of shahriarahmed.net, the website of Shahriar Ahmed: the Google tag it uses, what is stored in your browser, and how email you send is used. (155)     | Privacy Policy                     | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/dmca`                               | DMCA Policy — Shahriar Ahmed (28)                            | Copyright and DMCA policy of shahriarahmed.net, the website of Shahriar Ahmed: how to report material that infringes your copyright, and how to counter-notice. (159) | DMCA Policy                        | Shahriar Ahmed — Co-Founder, Unique Labs                       |
| `/projects/x-mass-unfollow/privacy`   | UnfollowX Pro Privacy Policy — Chrome Extension for X (53)   | Privacy policy of UnfollowX Pro (formerly X Mass Unfollow), the Chrome extension for X: what stays on your device, what is sent to X, ads, and each permission. (159) | UnfollowX Pro Privacy Policy       | Shahriar Ahmed — Co-Founder, Unique Labs                       |

### As Next.js metadata

Every page's metadata comes from one entry in `pages` in
`data/portfolio.ts` and one call. For example:

```ts
// data/portfolio.ts (excerpt)
researchPaper: {
  href: "/research/mcl-1-azo-hydrazone-paper",
  label: "Mcl-1 paper, explained",
  eyebrow: "Research explainer",
  title: "Our Mcl-1 paper,",
  titleAccent: "in plain language",
  description: "What our 2026 Journal of Molecular Structure paper did and found: …",
  seoTitle: "Mcl-1 Azo–Hydrazone Paper Explained — Shahriar Ahmed",
  seoDescription:
    "A plain-language guide by co-author Shahriar Ahmed Tushar to a 2026 Journal of Molecular Structure paper: an azo–hydrazone compound, its optics and Mcl-1.",
},
```

```ts
// app/research/mcl-1-azo-hydrazone-paper/page.tsx
export const metadata: Metadata = pageMetadata(pages.researchPaper);
```

`pageMetadata()` (`lib/metadata.ts`) sets the following:

- `title` and `description`;
- `alternates.canonical`;
- `openGraph`: title, description, URL, site name, locale, the shared
  1200 × 630 image and its alt text;
- the `twitter` card, with `creator: @0x_nation`.

A page can pass its own share image instead. Product pages pass their cover,
for example:

```ts
// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = productBySlug((await params).slug);
  if (!product) return {};
  return pageMetadata(pageFor(product.item), { image: product.detail?.cover });
}
```

The `<meta name="keywords">` tag was removed, because Google ignores it.

---

## E. Structured data (JSON-LD) (Done)

Every page outputs one `@graph`. All entities point at the same `@id`s:

- `https://shahriarahmed.net/#person`
- `…/#website`
- `…/unique-labs#organization`

That way, search engines join the name variants, the profiles, the company
and the paper into one entity. Builders are in `lib/json-ld.ts`.

What changed from the audit:

- **Person**:
  - `hasOccupation`: Co-Founder & COO, and Researcher.
  - `alumniOf`: University of Rajshahi (B.Sc. completed).
  - `affiliation`: University of Rajshahi (Master's, current).
  - `memberOf`: CBCRO, Jul 2025 – Sep 2026, and the ASM Student Chapter, as
    `OrganizationRole`.
  - `knowsLanguage`: `en`, `bn`.
  - `homeLocation` and `address`: Rajshahi, BD.
  - `knowsAbout`: trimmed from 33 to the 15 most important, without
    duplicates.
  - `sameAs`: adds the uniquelabs.org team page.
  - ORCID stays as the `identifier`.
- **Organization** (Unique Labs): `foundingDate` 2019, `alternateName`
  "Unique Tech", and `founder` set to the Person.
- **ScholarlyArticle**: `isPartOf` a `PublicationVolume` (1368) of the
  `Periodical`, plus `pagination` 146299 and the DOI as `identifier`.
- **SoftwareApplication**, one per product page:
  - `applicationCategory: BrowserApplication`, `operatingSystem: Chrome`;
  - `installUrl` (Chrome Web Store), `featureList`;
  - `author`/`creator` set to the Person, `publisher` to Unique Labs;
  - `offers` with price 0 only for products the company marks FREE.
- The **bot page** has a SoftwareApplication with
  `applicationCategory: EducationalApplication`, `operatingSystem:
Telegram`, `inLanguage` `bn` and `en`, and an audience.
- The **explainer** has a TechArticle that cites the ScholarlyArticle by
  DOI.
- The **blog** has a Blog, and a BlogPosting per post (once posts exist).
- **`dateModified`** now comes from git history (`lib/lastmod.ts`) instead
  of the build time.

Not included, on purpose:

- **FAQPage**: Google limits FAQ rich results to authoritative government
  and health sites, and the visible Q&A already helps AI answers.
- **The Chrome Web Store developer page in `sameAs`**: its URL is not known
  yet. **[CONFIRM]** If you send it, add it to `sameAs` in `personNode()` or
  `organizationNode()`.
- **@shahriar_bmb**: kept out on purpose. @0x_nation is the only X account
  in `sameAs`.

Validate after the host fix is live, with Google's Rich Results Test and
validator.schema.org on `/`, `/about`, `/research/mcl-1-azo-hydrazone-paper`,
`/projects/unique-pdf` and `/projects/bcs-newspaper-brief`. (I could not
reach those services from the build environment.)

### Homepage `@graph` (as built)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://shahriarahmed.net/#website",
      "url": "https://shahriarahmed.net",
      "name": "Shahriar Ahmed",
      "alternateName": ["Shahriar Ahmed Tushar", "Shahriar", "shahriarahmed.net"],
      "description": "Shahriar Ahmed (Shahriar Ahmed Tushar): Biochemistry & Molecular Biology researcher at the University of Rajshahi, Bangladesh, and co-founder of Unique Labs.",
      "inLanguage": "en",
      "publisher": {
        "@id": "https://shahriarahmed.net/#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://shahriarahmed.net/#profile",
      "url": "https://shahriarahmed.net",
      "name": "Shahriar Ahmed — Researcher & Co-Founder of Unique Labs",
      "description": "Shahriar Ahmed (Shahriar Ahmed Tushar): Biochemistry & Molecular Biology researcher at the University of Rajshahi, Bangladesh, and co-founder of Unique Labs.",
      "inLanguage": "en",
      "dateModified": "2026-11-22T17:07:08+00:00",
      "mainEntity": {
        "@id": "https://shahriarahmed.net/#person"
      },
      "about": {
        "@id": "https://shahriarahmed.net/#person"
      },
      "isPartOf": {
        "@id": "https://shahriarahmed.net/#website"
      }
    },
    {
      "@type": "Person",
      "@id": "https://shahriarahmed.net/#person",
      "name": "Shahriar Ahmed",
      "alternateName": ["Shahriar Ahmed Tushar", "Shahriar"],
      "givenName": "Shahriar",
      "familyName": "Ahmed",
      "url": "https://shahriarahmed.net/",
      "image": {
        "@type": "ImageObject",
        "url": "https://shahriarahmed.net/images/shahriar-ahmed.webp",
        "caption": "Portrait of Shahriar Ahmed, Co-Founder of Unique Labs"
      },
      "email": "mailto:shahriar.bmb@gmail.com",
      "jobTitle": "Co-Founder & COO",
      "description": "Shahriar Ahmed (Shahriar Ahmed Tushar): Biochemistry & Molecular Biology researcher at the University of Rajshahi, Bangladesh, and co-founder of Unique Labs.",
      "worksFor": {
        "@type": "Organization",
        "@id": "https://shahriarahmed.net/unique-labs#organization",
        "name": "Unique Labs"
      },
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Co-Founder & COO",
          "description": "Co-Founder & COO of Unique Labs: KOC and consultancy, digital marketing, blockchain development and Chrome extensions."
        },
        {
          "@type": "Occupation",
          "name": "Researcher",
          "occupationalCategory": "Biochemistry & Molecular Biology"
        }
      ],
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "University of Rajshahi",
          "sameAs": "https://en.wikipedia.org/wiki/University_of_Rajshahi"
        }
      ],
      "affiliation": [
        {
          "@type": "CollegeOrUniversity",
          "name": "University of Rajshahi",
          "sameAs": "https://en.wikipedia.org/wiki/University_of_Rajshahi"
        }
      ],
      "memberOf": [
        {
          "@type": "OrganizationRole",
          "roleName": "Research Member",
          "startDate": "2025-07",
          "endDate": "2026-09",
          "memberOf": {
            "@type": "Organization",
            "name": "Computational Biosciences and Chemistry Research Organization (CBCRO)"
          }
        },
        {
          "@type": "OrganizationRole",
          "roleName": "Joint IT Secretary",
          "memberOf": {
            "@type": "Organization",
            "name": "ASM Student Chapter, University of Rajshahi"
          }
        }
      ],
      "knowsLanguage": ["en", "bn"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rajshahi",
        "addressCountry": "BD"
      },
      "homeLocation": {
        "@type": "Place",
        "name": "Rajshahi, Bangladesh",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rajshahi",
          "addressCountry": "BD"
        }
      },
      "knowsAbout": [
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
        "Chrome Extension Development"
      ],
      "sameAs": [
        "https://scholar.google.com/citations?user=Z7z7L_kAAAAJ&hl=en",
        "https://orcid.org/0009-0005-3432-7559",
        "https://github.com/fr-ost",
        "https://www.linkedin.com/in/shahriar-bmb/",
        "https://x.com/0x_nation",
        "https://www.facebook.com/ig.frostt",
        "https://www.instagram.com/ig.frostt",
        "https://t.me/igfrostt",
        "https://www.uniquelabs.org/team/shahriar-ahmed"
      ],
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "ORCID",
        "value": "0009-0005-3432-7559",
        "url": "https://orcid.org/0009-0005-3432-7559"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://shahriarahmed.net/unique-labs#organization",
      "name": "Unique Labs",
      "url": "https://www.uniquelabs.org/",
      "alternateName": "Unique Tech",
      "foundingDate": "2019",
      "description": "Unique Labs, co-founded by Shahriar Ahmed, offers KOC and consultancy services, digital marketing, and blockchain development for brands and Web3 projects.",
      "slogan": "Building at the intersection of technology, AI, and experimentation.",
      "founder": {
        "@id": "https://shahriarahmed.net/#person"
      },
      "knowsAbout": [
        "KOC & Consultancy",
        "Digital Marketing",
        "Blockchain Development",
        "AI & Automation",
        "Web3",
        "Blockchain",
        "KOC marketing",
        "Digital marketing",
        "Consultancy",
        "AI & automation"
      ],
      "sameAs": ["https://www.uniquelabs.org/"]
    },
    {
      "@type": "ScholarlyArticle",
      "@id": "https://doi.org/10.1016/j.molstruc.2026.146299",
      "headline": "Solvent-dependent nonlinear optical response and potential Mcl-1 antagonist activity of an azo–hydrazone derivative: Experimental and theoretical studies",
      "url": "https://doi.org/10.1016/j.molstruc.2026.146299",
      "sameAs": "https://doi.org/10.1016/j.molstruc.2026.146299",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "DOI",
        "value": "10.1016/j.molstruc.2026.146299"
      },
      "author": [
        {
          "@type": "Person",
          "name": "Md. Abdur Rakib"
        },
        {
          "@type": "Person",
          "name": "Billal Hossain"
        },
        {
          "@type": "Person",
          "name": "Jenia Afrin Tanni"
        },
        {
          "@type": "Person",
          "name": "Md. Shohag Hossain"
        },
        {
          "@type": "Person",
          "name": "Md. Shakirul Hasan Sium"
        },
        {
          "@id": "https://shahriarahmed.net/#person"
        },
        {
          "@type": "Person",
          "name": "Md. Tanvir Anjum"
        },
        {
          "@type": "Person",
          "name": "Shofiur Rahman"
        },
        {
          "@type": "Person",
          "name": "M. Shahed Zaman"
        },
        {
          "@type": "Person",
          "name": "Md. Badrul Islam"
        },
        {
          "@type": "Person",
          "name": "Md. Rabiul Karim"
        }
      ],
      "abstract": "An azo-hydrazone derivative, 4-((E)-phenyldiazenyl)-2-((E)-(2-phenylhydrazono)methyl)phenol (PDPMP), was synthesized and characterized using FT-IR, UV–Vis, NMR, and LC-MS. Its structural, electronic, and nonlinear optical (NLO) properties were examined via DFT and TD-DFT at the B3LYP/6–311++G(d,p) level with the IEFPCM solvent model. The influence of solvent polarity on electronic transitions, charge transfer, NLO response, and antagonist activity was explored systematically. Solvent polarity significantly altered UV–Vis absorption, HOMO–LUMO gap, charge-transfer behavior, and NLO efficiency. PDPMP exhibited first-order hyperpolarizability (βtotal) of 537 × 10⁻³¹ esu, which is approximately 69 times greater than the reference value for urea (βtotal = 7.803 × 10⁻³¹ esu) and 3.5 time than p-nitroaniline (βtotal = 155 × 10–31 esu) and increasing up to threefold in polar solvents with notable positive solvatochromism. NTO and TDM analyses confirmed solvent-induced intramolecular charge transfer, while NBO and RDG analyses revealed orbital delocalization and noncovalent interactions. Molecular docking against Mcl-1 (PDB IDs: 4HW3, 6GL8) suggested that PDPMP has higher binding affinity than the preclinical drug Obatoclax. These findings suggest that it may serve as a dual-function NLO material and merit additional investigation for its potential as an anticancer agent.",
      "isPartOf": {
        "@type": "PublicationVolume",
        "volumeNumber": "1368",
        "isPartOf": {
          "@type": "Periodical",
          "name": "Journal of Molecular Structure"
        }
      },
      "pagination": "146299",
      "datePublished": "2026-04-17"
    }
  ]
}
```

### Template: product page (as built for `/projects/unique-pdf`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemPage",
      "@id": "https://shahriarahmed.net/projects/unique-pdf#webpage",
      "url": "https://shahriarahmed.net/projects/unique-pdf",
      "name": "Unique PDF — Chrome Extension by Shahriar Ahmed",
      "description": "Unique PDF, a free Chrome extension by Shahriar Ahmed at Unique Labs: 20 PDF tools and AI chat with any PDF. Everything runs in your browser; no uploads.",
      "inLanguage": "en",
      "dateModified": "2026-11-22T17:07:08+00:00",
      "isPartOf": {
        "@id": "https://shahriarahmed.net/#website"
      },
      "about": {
        "@id": "https://shahriarahmed.net/projects/unique-pdf#software"
      },
      "mainEntity": {
        "@id": "https://shahriarahmed.net/projects/unique-pdf#software"
      },
      "breadcrumb": {
        "@id": "https://shahriarahmed.net/projects/unique-pdf#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://shahriarahmed.net/projects/unique-pdf#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://shahriarahmed.net"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": "https://shahriarahmed.net/projects"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Unique PDF",
          "item": "https://shahriarahmed.net/projects/unique-pdf"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://shahriarahmed.net/#website",
      "url": "https://shahriarahmed.net",
      "name": "Shahriar Ahmed"
    },
    {
      "@type": "Person",
      "@id": "https://shahriarahmed.net/#person",
      "name": "Shahriar Ahmed",
      "alternateName": ["Shahriar Ahmed Tushar", "Shahriar"],
      "url": "https://shahriarahmed.net/"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://shahriarahmed.net/projects/unique-pdf#software",
      "name": "Unique PDF",
      "description": "20 PDF tools in one Chrome extension — merge, split, compress, edit, sign and protect, plus Unique AI to chat with any PDF. Everything runs in your browser: nothing is uploaded.",
      "url": "https://pdf.uniquelabs.org/",
      "image": "https://shahriarahmed.net/images/products/unique-pdf.webp",
      "applicationCategory": "BrowserApplication",
      "applicationSubCategory": "Chrome extension",
      "operatingSystem": "Chrome",
      "installUrl": "https://chromewebstore.google.com/detail/ogajiapfmheeiadeflajlkikpfkoobfl",
      "sameAs": [
        "https://pdf.uniquelabs.org/",
        "https://chromewebstore.google.com/detail/ogajiapfmheeiadeflajlkikpfkoobfl"
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Unique AI",
        "Organize",
        "Convert",
        "Edit & sign",
        "Security",
        "Private by design"
      ],
      "author": {
        "@id": "https://shahriarahmed.net/#person"
      },
      "creator": {
        "@id": "https://shahriarahmed.net/#person"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://shahriarahmed.net/unique-labs#organization",
        "name": "Unique Labs"
      }
    }
  ]
}
```

### Template: research explainer (as built)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper#webpage",
      "url": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper",
      "name": "Mcl-1 Azo–Hydrazone Paper Explained — Shahriar Ahmed",
      "description": "A plain-language guide by co-author Shahriar Ahmed Tushar to a 2026 Journal of Molecular Structure paper: an azo–hydrazone compound, its optics and Mcl-1.",
      "inLanguage": "en",
      "dateModified": "2026-11-22T17:07:08+00:00",
      "isPartOf": {
        "@id": "https://shahriarahmed.net/#website"
      },
      "about": {
        "@id": "https://doi.org/10.1016/j.molstruc.2026.146299"
      },
      "mainEntity": {
        "@id": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper#article"
      },
      "breadcrumb": {
        "@id": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://shahriarahmed.net"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Research",
          "item": "https://shahriarahmed.net/research"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Mcl-1 paper, explained",
          "item": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://shahriarahmed.net/#website",
      "url": "https://shahriarahmed.net",
      "name": "Shahriar Ahmed"
    },
    {
      "@type": "Person",
      "@id": "https://shahriarahmed.net/#person",
      "name": "Shahriar Ahmed",
      "alternateName": ["Shahriar Ahmed Tushar", "Shahriar"],
      "url": "https://shahriarahmed.net/"
    },
    {
      "@type": "TechArticle",
      "@id": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper#article",
      "headline": "Mcl-1 Azo–Hydrazone Paper Explained — Shahriar Ahmed",
      "description": "A plain-language guide by co-author Shahriar Ahmed Tushar to a 2026 Journal of Molecular Structure paper: an azo–hydrazone compound, its optics and Mcl-1.",
      "url": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper",
      "inLanguage": "en",
      "datePublished": "2026-11-22",
      "author": {
        "@id": "https://shahriarahmed.net/#person"
      },
      "publisher": {
        "@id": "https://shahriarahmed.net/#person"
      },
      "mainEntityOfPage": {
        "@id": "https://shahriarahmed.net/research/mcl-1-azo-hydrazone-paper#webpage"
      },
      "about": [
        {
          "@id": "https://doi.org/10.1016/j.molstruc.2026.146299"
        },
        {
          "@type": "Thing",
          "name": "Myeloid cell leukemia 1 (Mcl-1)"
        },
        {
          "@type": "Thing",
          "name": "Nonlinear optics"
        }
      ],
      "citation": {
        "@type": "ScholarlyArticle",
        "@id": "https://doi.org/10.1016/j.molstruc.2026.146299",
        "headline": "Solvent-dependent nonlinear optical response and potential Mcl-1 antagonist activity of an azo–hydrazone derivative: Experimental and theoretical studies",
        "url": "https://doi.org/10.1016/j.molstruc.2026.146299",
        "identifier": {
          "@type": "PropertyValue",
          "propertyID": "DOI",
          "value": "10.1016/j.molstruc.2026.146299"
        },
        "datePublished": "2026-04-17",
        "isPartOf": {
          "@type": "PublicationVolume",
          "volumeNumber": "1368",
          "isPartOf": {
            "@type": "Periodical",
            "name": "Journal of Molecular Structure"
          }
        },
        "pagination": "146299",
        "author": [
          {
            "@type": "Person",
            "name": "Md. Abdur Rakib"
          },
          {
            "@type": "Person",
            "name": "Billal Hossain"
          },
          {
            "@type": "Person",
            "name": "Jenia Afrin Tanni"
          },
          {
            "@type": "Person",
            "name": "Md. Shohag Hossain"
          },
          {
            "@type": "Person",
            "name": "Md. Shakirul Hasan Sium"
          },
          {
            "@id": "https://shahriarahmed.net/#person"
          },
          {
            "@type": "Person",
            "name": "Md. Tanvir Anjum"
          },
          {
            "@type": "Person",
            "name": "Shofiur Rahman"
          },
          {
            "@type": "Person",
            "name": "M. Shahed Zaman"
          },
          {
            "@type": "Person",
            "name": "Md. Badrul Islam"
          },
          {
            "@type": "Person",
            "name": "Md. Rabiul Karim"
          }
        ]
      }
    }
  ]
}
```

### Template: blog post (generated from `data/posts.ts`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://shahriarahmed.net/blog/koc-marketing-web3#webpage",
      "url": "https://shahriarahmed.net/blog/koc-marketing-web3",
      "name": "What is KOC marketing in Web3 — Shahriar Ahmed",
      "description": "…",
      "inLanguage": "en",
      "isPartOf": { "@id": "https://shahriarahmed.net/#website" },
      "about": { "@id": "https://shahriarahmed.net/#person" },
      "mainEntity": { "@id": "https://shahriarahmed.net/blog/koc-marketing-web3#post" },
      "breadcrumb": { "@id": "https://shahriarahmed.net/blog/koc-marketing-web3#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://shahriarahmed.net/blog/koc-marketing-web3#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shahriarahmed.net" },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://shahriarahmed.net/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "What is KOC marketing in Web3",
          "item": "https://shahriarahmed.net/blog/koc-marketing-web3"
        }
      ]
    },
    {
      "@type": "BlogPosting",
      "@id": "https://shahriarahmed.net/blog/koc-marketing-web3#post",
      "headline": "What is KOC marketing in Web3 (and how it differs from KOL)",
      "description": "…",
      "url": "https://shahriarahmed.net/blog/koc-marketing-web3",
      "inLanguage": "en",
      "datePublished": "2026-11-30",
      "dateModified": "2026-11-30",
      "author": { "@id": "https://shahriarahmed.net/#person" },
      "publisher": { "@id": "https://shahriarahmed.net/#person" },
      "mainEntityOfPage": { "@id": "https://shahriarahmed.net/blog/koc-marketing-web3#webpage" },
      "isPartOf": { "@id": "https://shahriarahmed.net/blog#blog" },
      "keywords": "Web3, Marketing"
    }
  ]
}
```

---

## F. Copy (Done), bios and profile checklist

What was added to the site, all first person, factual, and using only
facts you supplied:

- **/about**:
  - An answer-first **In brief** paragraph at the top. It introduces
    "Shahriar Ahmed (full name Shahriar Ahmed Tushar), a Bangladeshi
    biochemistry researcher and Web3 founder based in Rajshahi", which
    tells you apart from the other Shahriar Ahmeds.
  - New paragraphs: B.Sc. completed and Master's ongoing; lab and
    computational methods; CBCRO and ASM; Unique Labs since 2019 (formerly
    Unique Tech, Co-Founder & COO); the products; the BCS bot; Rajshahi.
  - A five-question **FAQ**: who is Shahriar Ahmed, what is Unique Labs,
    what does Shahriar Ahmed research, where is Shahriar Ahmed based, how to make contact. It uses
    plain question headings and no FAQPage schema.
- **/research**: "What I research", covering focus, education, CBCRO, the
  paper and a link to the explainer, plus a "Methods I work with" glossary.
- **/unique-labs**: "How Unique Labs started", covering 2019, Unique Tech,
  the two lines of work, and links to every product page.
- **/experience/web3**: "KOC marketing, and what I do in Web3", covering
  KOC versus KOL and the Unique Labs services.
- **Everywhere**: the role is "Co-Founder & COO", as on
  www.uniquelabs.org/team/shahriar-ahmed. **[CONFIRM]** that you want COO
  shown publicly.

Word counts in `<main>` after this change (measured on the build):

| Page             | Words | Brief's target  |
| ---------------- | ----- | --------------- |
| /                | ~770  | 600–1,000 ✔     |
| /about           | ~830  | 600–1,000 ✔     |
| /projects        | ~750  | 500–800 ✔       |
| /research        | ~690  | 500–800 ✔       |
| /unique-labs     | ~490  | 500–800 (close) |
| /experience      | ~305  | 500–800 ✗       |
| /experience/web3 | ~220  | 500–800 ✗       |

I did not pad /experience and /experience/web3. They are timelines, and the
honest way to grow them is real detail only you can give:

- dates for the ASM role and for Signova;
- what you did day to day as COO;
- campaigns you can name publicly. **[CONFIRM]**

The blog (J) is the main route to more indexable text.

Partnerships (exchanges, launchpads and projects) are **not** listed on
this site. As you decided, they live on www.uniquelabs.org, and
/experience/web3 links there.

### One bio, three lengths

Use them as written on every profile. They are first person on purpose.

**Short (150 characters):**

> Shahriar Ahmed Tushar: Biochemistry & Molecular Biology researcher, University of Rajshahi, and Co-Founder & COO of Unique Labs. Rajshahi, Bangladesh.

**Medium (47 words):**

> I'm Shahriar Ahmed Tushar, a Biochemistry & Molecular Biology researcher at the University of Rajshahi, Bangladesh. I completed my B.Sc. (Hons) in 2026 and am now doing my Master's, in cancer biology. I co-founded Unique Labs in 2019 and run it as Co-Founder & COO. More: shahriarahmed.net

**Long (148 words):**

> I'm Shahriar Ahmed — full name Shahriar Ahmed Tushar — a Bangladeshi biochemistry researcher and Web3 founder based in Rajshahi. I completed my B.Sc. (Hons) in Biochemistry & Molecular Biology at the University of Rajshahi (2021–2026) and am now doing my Master's there, with research in cancer biology. In the lab I work with cell culture, SDS-PAGE, affinity chromatography, MTT assays, qPCR and apoptosis analysis; on the computer, with density functional theory (DFT) and molecular docking. I co-authored a 2026 paper in the Journal of Molecular Structure on an azo–hydrazone compound and its predicted binding to the cancer protein Mcl-1, and was a research member of CBCRO from 2025 to 2026. In 2019 I co-founded Unique Labs, first called Unique Tech, where I am Co-Founder & COO: KOC and consultancy, digital marketing, blockchain development, and our own Chrome extensions, including UnfollowX Pro, GrowX and Unique PDF. Website: shahriarahmed.net

### Profile checklist (you)

Use the same name ("Shahriar Ahmed", with "Tushar" where there is a
full-name field), the same headshot (`public/images/shahriar-ahmed.webp`),
Rajshahi, Bangladesh, and a link to `https://shahriarahmed.net` everywhere.

| Profile                                               | What to change                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| LinkedIn `shahriar-bmb`                               | Education: B.Sc. (Hons) BMB, University of Rajshahi, 2021–2026, **completed**; Master's in BMB, **ongoing**. About: the long bio. Headline: "Biochemistry & Molecular Biology researcher · Co-Founder & COO, Unique Labs". Location: Rajshahi. Website: shahriarahmed.net. Featured: the DOI and /research/mcl-1-azo-hydrazone-paper |
| ORCID 0009-0005-3432-7559                             | Websites: shahriarahmed.net (label "Personal website"). Employment/Education as above. Works: import the DOI                                                                                                                                                                                                                         |
| Google Scholar Z7z7L_kAAAAJ                           | Homepage: shahriarahmed.net. Affiliation: University of Rajshahi. Add a verified email at a university domain if you have one **[CONFIRM]**. Interests: Biochemistry, Molecular Biology, Cancer Biology, DFT, Molecular Docking                                                                                                      |
| GitHub `fr-ost`                                       | Name: Shahriar Ahmed. Bio: short bio. Location: Rajshahi, Bangladesh. Website: shahriarahmed.net                                                                                                                                                                                                                                     |
| X `@0x_nation` (main)                                 | Bio: short bio. Location: Rajshahi. Link: shahriarahmed.net                                                                                                                                                                                                                                                                          |
| X `@shahriar_bmb`                                     | Do not use as the primary profile. Optionally set its bio to "Main account: @0x_nation" **[CONFIRM]**                                                                                                                                                                                                                                |
| Facebook / Instagram `ig.frostt`, Telegram `igfrostt` | Short bio and website link                                                                                                                                                                                                                                                                                                           |
| www.uniquelabs.org/team/shahriar-ahmed                | Make sure it links to shahriarahmed.net (it is in this site's `sameAs`; the link should go both ways)                                                                                                                                                                                                                                |
| Chrome Web Store developer account                    | Website field: www.uniquelabs.org; product listings: "Built by Shahriar Ahmed" with a link where allowed                                                                                                                                                                                                                             |
| thetooldirectory.com (Unique PDF listing)             | Ask them to change "Dhaka" to **Rajshahi, Bangladesh**                                                                                                                                                                                                                                                                               |
| chrome-stats.com, extops.dev, githubhelp.com          | These copy publisher data from the store and GitHub; they update once the sources are fixed                                                                                                                                                                                                                                          |

---

## G. New pages (Done)

| URL                                                                                                                         | What it is                                                                                                                                                                                                                                                                                        | Internal links in                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/projects/unfollowx-pro`, `/growx`, `/scorex`, `/xaicg`, `/uniquefarm`, `/unique-pdf`, `/frameshot`, `/twofold`, `/rowlio` | Product case studies. Each has the cover, the description and features from the company site, and a facts panel: made by Unique Labs, built by Shahriar Ahmed, platform, price and status. Links: product site, Chrome Web Store, privacy policy, support. Then "More from Unique Labs".          | /projects (names), homepage product tiles, /unique-labs (story and product list), each other, llms.txt, sitemap |
| `/projects/bcs-newspaper-brief`                                                                                             | The Telegram bot. English explanation and a `lang="bn"` section with your exact Bangla description, plus "How to use it" and facts. Links to t.me/BCSNWZ_bot                                                                                                                                      | /projects, /now, llms.txt, sitemap                                                                              |
| `/research/mcl-1-azo-hydrazone-paper`                                                                                       | Plain-language explainer, taken **only from the abstract**: what was made, how it was computed, key numbers, the Mcl-1 docking presented as a prediction, why it matters, your part (6th of 11; corresponding author Prof. Md. Rabiul Karim), a glossary, and the citation with a DOI copy button | /research (publication card and "What I research"), /now, CV, llms.txt                                          |
| `/cv`                                                                                                                       | HTML CV from the site's data, A4-print-ready. `public/Shahriar-Ahmed-CV.pdf` is generated from it, which also turns on "Download CV" in the hero                                                                                                                                                  | Footer, homepage hero, explainer                                                                                |
| `/now`                                                                                                                      | What you are doing at the moment, with a visible "Updated" date (`data/now.ts`)                                                                                                                                                                                                                   | Footer                                                                                                          |
| `/blog`, `/blog/[slug]`, `/blog/rss.xml`                                                                                    | Blog index, posts (BlogPosting, author box, related posts), RSS 2.0 feed. **Hidden (404, unlinked, not in the sitemap) until the first post is added to `data/posts.ts`**, so there are no thin, empty pages                                                                                      | Footer and Keep exploring cards, sitemap, llms.txt: added automatically with the first post                     |

**Not built:**

- **/hire or /services.** It needs an offer, scope and a way to enquire
  that only you can define. **[CONFIRM]** whether you want one, and what it
  should offer.
- **SOLHUNTER and ENGAGEMENT-AUTOMATOR.** They are not on the site, because
  their public URLs and status are not confirmed. **[CONFIRM]**

**To make the product pages true case studies**, the brief asks for:
problem → what I built → stack → privacy stance → results I can verify.
The pages already cover the problem, what it does and the privacy stance,
from the company copy. Send these and they can be added:

- the stack per product;
- launch dates;
- figures you can verify, such as the Chrome Web Store user count, rating,
  or version history;
- your personal role in each. **[CONFIRM]**

**Product name:** the brief says "XAIGC". The company website says
**XAICG** (X AI Comment/Reply Generator), and the site follows the company
site. **[CONFIRM]**

**To regenerate the CV PDF** after changing CV data:

```bash
npm run build && npm run start      # terminal 1
npm run cv:pdf                      # terminal 2 (needs Playwright + Chromium)
npm run build                       # picks up the new PDF
```

---

## H. Sitemap, robots and llms.txt (Done)

**`app/robots.ts`:** allow all, plus the `Sitemap:` line. The `Host:` line
is gone.

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

**`app/sitemap.ts`:**

- Every indexable page is listed: 24 today, plus each blog post once posts
  exist.
- There is no `changefreq` or `priority`.
- Images are listed only where they matter: the portrait on `/` and
  `/about`, and each product page's cover.
- Legal pages stay indexable, with the date written on the page as their
  `lastmod`.

**Real `lastmod`:** `lib/lastmod.ts` asks git when the files behind each
page last changed: the page's route folder, plus its data files.

- If git is not available, the date is **left out** rather than invented.
- It is also left out if the commit found is the cut-off of a shallow
  clone, because that date is not the real one.
- The same date feeds `dateModified` in the JSON-LD.

> **[ASSUMPTION]** Vercel builds from a shallow git clone. After deploying,
> open `/sitemap.xml`. If most `<lastmod>` lines are missing, add the
> environment variable `VERCEL_DEEP_CLONE=true` in Vercel (Production) and
> redeploy, so the full history is available. **[CONFIRM]** the variable
> name against Vercel's current documentation.

Many pages share `data/portfolio.ts`, so a change there updates their
`lastmod` together. That is accurate (their content did change), and it
evens out as pages get their own data files.

**`llms.txt`:**

- lists the new pages (explainer, bot, CV, Now);
- gives each product's own page on this site next to its product website;
- links the paper to its explainer;
- adds a Blog section once there are posts.

---

## I. Internal linking

Every page is at most two clicks from the homepage: the header, footer and
"Keep exploring" cards reach every hub, and each hub reaches its spokes.
Breadcrumbs, with BreadcrumbList data, are on every inner page.

| From                          | To                                                                                                | Anchor text                                                               | Where                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------- |
| Every page (header)           | /about, /research, /projects, /experience, /unique-labs, /contact                                 | About, Research, Projects, Experience, Unique Labs, Contact               | Navbar                                        |
| Every page (footer)           | /unique-labs, /research, /projects, /experience, /experience/web3, (/blog)                        | page names                                                                | Footer "Explore"                              |
| Every page (footer)           | /about, /cv, /now, /contact, /privacy, /dmca                                                      | About, CV, Now, Contact, …                                                | Footer "This site"                            |
| /                             | each product page                                                                                 | product name + tagline (tile)                                             | "Products by Unique Labs" card                |
| /                             | /Shahriar-Ahmed-CV.pdf                                                                            | Download CV                                                               | Hero                                          |
| /projects                     | each product page, /projects/bcs-newspaper-brief                                                  | product name                                                              | Project cards (item headings)                 |
| /research                     | /research/mcl-1-azo-hydrazone-paper                                                               | Read the explainer; Read the plain-language explainer                     | Publication card; "What I research"           |
| /research/mcl-1-…             | /research, /cv                                                                                    | research page; CV                                                         | "My part"                                     |
| /unique-labs                  | each product page                                                                                 | product name                                                              | "How Unique Labs started" and product list    |
| /experience                   | /research/mcl-1-…                                                                                 | Read the explainer                                                        | Publication entry                             |
| /experience/web3              | /unique-labs                                                                                      | Unique Labs                                                               | KOC section                                   |
| product page                  | /unique-labs, /about                                                                              | Unique Labs; Shahriar Ahmed                                               | Facts panel                                   |
| product page                  | the 8 other product pages                                                                         | product name                                                              | "More from Unique Labs"                       |
| /projects/bcs-newspaper-brief | /about                                                                                            | Shahriar Ahmed                                                            | "What it is"                                  |
| /now                          | /research, /unique-labs, /projects, /projects/bcs-newspaper-brief, /research/mcl-1-…, /about, /cv | Research; Unique Labs; Projects; The bot; The paper, explained; About; CV | Items and footer note                         |
| /cv                           | /contact                                                                                          | Contact                                                                   | Header buttons                                |
| blog post                     | /blog, /about                                                                                     | Blog (breadcrumb); author name                                            | Breadcrumb; "About the author" box            |
| blog post                     | 3 most recent other posts                                                                         | post title                                                                | "More posts"                                  |
| blog post (when you write it) | the hub it supports, e.g. /unique-labs, /research, a product page                                 | descriptive anchor, never "click here"                                    | Body text: at least 2 internal links per post |

---

## J. 12-week content calendar (you write; the blog is ready)

The Mcl-1 item from the brief ("Mcl-1 in cancer: what our azo–hydrazone
paper found, in plain language") is **already live** as
`/research/mcl-1-azo-hydrazone-paper`. A blog post on the same topic would
compete with it. Its slot goes to a lab-methods explainer instead.

To publish, add an entry to `data/posts.ts` and deploy. The blog,
sitemap, RSS and footer link appear by themselves.

| Wk  | Publish (Mon) | Working title                                                                                | Slug                                 | Cluster                        | Intent                        | Schema                             | CTA                                          |
| --- | ------------- | -------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------ | ----------------------------- | ---------------------------------- | -------------------------------------------- |
| 1   | 30 Nov 2026   | What is KOC marketing in Web3 (and how it differs from KOL)                                  | `koc-marketing-web3`                 | P2 web3 KOL/KOC                | Informational                 | BlogPosting                        | Work with Unique Labs → /unique-labs         |
| 2   | 7 Dec 2026    | Biochemistry & Molecular Biology at Rajshahi University: a student's guide                   | `bmb-rajshahi-university-guide`      | P2 BMB Rajshahi                | Informational (local)         | BlogPosting                        | Ask me → /contact                            |
| 3   | 14 Dec 2026   | Molecular docking for beginners: free tools I use                                            | `molecular-docking-for-beginners`    | P2 docking tools               | Tutorial                      | BlogPosting (HowTo-style headings) | See it applied → paper explainer             |
| 4   | 21 Dec 2026   | How I built Unique PDF: a private, offline PDF editor in Chrome                              | `how-i-built-unique-pdf`             | P3 free PDF editor extension   | Informational → transactional | BlogPosting                        | Install → /projects/unique-pdf               |
| 5   | 28 Dec 2026   | Biochemistry career paths in Bangladesh                                                      | `biochemistry-careers-bangladesh`    | P2 biochemistry career/job BD  | Informational (local)         | BlogPosting                        | CV / contact                                 |
| 6   | 4 Jan 2027    | Building a privacy-first 2FA extension (Twofold)                                             | `building-twofold-2fa-extension`     | P3 2FA authenticator extension | Informational → transactional | BlogPosting                        | Install → /projects/twofold                  |
| 7   | 11 Jan 2027   | DFT calculations for biochemistry students                                                   | `dft-for-biochemistry-students`      | P2 DFT for beginners           | Tutorial                      | BlogPosting                        | Read the paper explainer                     |
| 8   | 18 Jan 2027   | A daily BCS current-affairs brief on Telegram: how @BCSNWZ_bot works (with a Bangla section) | `bcs-current-affairs-telegram-bot`   | P3 BCS current affairs         | Informational                 | BlogPosting                        | Open the bot → /projects/bcs-newspaper-brief |
| 9   | 25 Jan 2027   | Bioinformatics in Bangladesh: courses, jobs and how to start                                 | `bioinformatics-in-bangladesh`       | P2 bioinformatics BD           | Informational (local)         | BlogPosting                        | /research, /contact                          |
| 10  | 1 Feb 2027    | Blockchain developer in Bangladesh: skills, pay realities, how to start                      | `blockchain-developer-bangladesh`    | P2 blockchain developer BD     | Informational (local)         | BlogPosting                        | /unique-labs                                 |
| 11  | 8 Feb 2027    | SDS-PAGE, MTT and qPCR, explained for new BMB students                                       | `bmb-lab-methods-explained`          | P2/P3 lab methods              | Informational                 | BlogPosting                        | /research                                    |
| 12  | 15 Feb 2027   | How to unfollow non-followers on X safely (and why UnfollowX Pro paces itself)               | `unfollow-non-followers-on-x-safely` | P3 mass unfollow twitter       | Transactional                 | BlogPosting                        | Install → /projects/unfollowx-pro            |

**Per post** (description ~150 characters; at least two internal links in,
two out; every claim linked to a primary source):

1. **KOC marketing in Web3.**
   - _Angle:_ a practitioner's definition from running KOC campaigns,
     without hype.
   - _H2s:_ What a KOC is · KOC vs KOL · Why Web3 projects use KOCs · How a
     KOC campaign works · Measuring it honestly · Risks and disclosure ·
     When KOL is the better choice.
   - _Links:_ in from /experience/web3 and /unique-labs; out to
     /unique-labs and uniquelabs.org.
   - _Proof:_ an anonymised campaign brief or timeline you can share, and
     screenshots with permission. **[CONFIRM]** what you may publish.
2. **BMB at Rajshahi University.**
   - _Angle:_ what the programme is like from inside, from someone who
     finished the B.Sc. and stayed for the Master's.
   - _H2s:_ The department · The four-year B.Sc. · Lab work you will do ·
     Research and publishing as a student · Societies (ASM) · Master's ·
     Tips.
   - _Links:_ out to /research, /about and the explainer.
   - _Proof:_ your own photos of campus and lab, if allowed, and your
     timeline. Link to the official department page; do not quote
     admission numbers without a source.
3. **Molecular docking for beginners.**
   - _Angle:_ the free tools you actually use, step by step.
   - _H2s:_ What docking predicts (and what it can't) · Getting a protein
     structure (PDB) · Preparing ligand and receptor · Running a dock ·
     Reading the scores · Validating · Common mistakes.
   - _Links:_ out to the explainer (4HW3 and 6GL8 as the worked example);
     in from /research.
   - _Proof:_ screenshots of your own workflow. **[CONFIRM]** which
     software you use; it is not named anywhere yet.
4. **How I built Unique PDF.**
   - _H2s:_ The problem with upload-based PDF tools · Doing it all in the
     browser · The 20 tools · On-device AI chat · Privacy by design ·
     Shipping to the Chrome Web Store · What's next.
   - _Links:_ out to /projects/unique-pdf and pdf.uniquelabs.org.
   - _Proof:_ code snippets, an architecture sketch, the store listing.
     **[CONFIRM]** the stack and your role.
5. **Biochemistry careers in Bangladesh.**
   - _H2s:_ Research and academia · Pharma and diagnostics · Higher study
     abroad · Bioinformatics and computational roles · Industry outside
     biology · Skills that transfer · Where to look.
   - _Proof:_ cite job boards and official sources. **No salary figures**
     unless sourced and dated.
6. **Building Twofold.**
   - _H2s:_ Why another authenticator · How TOTP works · Autofill that
     ignores fake sites · Passkeys · Encrypted backup and sync · Offline by
     default · Lessons.
   - _Links:_ out to /projects/twofold.
   - _Proof:_ design decisions and code. **[CONFIRM]** the details.
7. **DFT for biochemistry students.**
   - _H2s:_ What DFT calculates · Functionals and basis sets in plain words
     (B3LYP/6-311++G(d,p) as the example) · Solvent models (IEFPCM) ·
     HOMO–LUMO and what it tells you · TD-DFT and absorption spectra ·
     Hardware and time · Where to learn.
   - _Links:_ out to the explainer.
   - _Proof:_ your own input/output snippets. **[CONFIRM]** the software.
8. **The BCS bot.**
   - _H2s:_ Who it's for · What a daily brief contains · How to subscribe ·
     How the notes and MCQs are prepared · বাংলায় (a Bangla section, with
     `lang="bn"`) · Feedback.
   - _Links:_ out to /projects/bcs-newspaper-brief and t.me/BCSNWZ_bot.
   - _Proof:_ a screenshot of a real daily message. **[CONFIRM]** how the
     content is sourced before describing it.
9. **Bioinformatics in Bangladesh.**
   - _H2s:_ What bioinformatics is · Courses (university and online) ·
     Free tools to start with · Jobs and internships · Building a
     portfolio · Communities.
   - _Proof:_ link every course and programme to its official page.
10. **Blockchain developer in Bangladesh.**
    - _H2s:_ What the job is · Skills (Solidity, EVM, testing, security) ·
      Learning path · Freelance vs company · Pay realities (sourced only) ·
      Red flags · How Unique Labs hires or works **[CONFIRM]**.
    - _Proof:_ your own build experience; sourced figures only.
11. **Lab methods explained.**
    - _H2s:_ SDS-PAGE · Affinity chromatography · MTT assay · qPCR ·
      Apoptosis assays · Good lab habits.
    - _Proof:_ your own bench photos without confidential samples.
      **Nothing from the unpublished Master's research.**
12. **Unfollowing safely on X.**
    - _H2s:_ Who doesn't follow you back · Why bulk unfollowing gets
      accounts limited · Safe pacing · Doing it with UnfollowX Pro ·
      Whitelists · FAQ.
    - _Links:_ out to /projects/unfollowx-pro and unfollowx.com.
    - _Proof:_ screenshots of the extension. Cite X's own rules.

---

## K. E-E-A-T and personal-brand plan

Already on the site:

- consistent name variants, headshot and city;
- the role matches the company website;
- research identifiers (ORCID, Scholar, DOI);
- dated content ("Updated" on /now and the CV; published and updated
  dates on posts);
- an **About the author** box on every post (`components/sections/author-box.tsx`);
- outbound links to primary sources: the DOI, PDB IDs and the company
  site.

**Next steps (you):**

1. **Research profiles.**
   - Complete ORCID (website, employment, education, works).
   - Set the Google Scholar homepage.
   - Create or claim **Semantic Scholar** and **Lens.org** author profiles
     for the paper.
   - Optionally **ResearchGate**.
   - Each should link to shahriarahmed.net.
2. **The same headshot and short bio** on every profile (F).
3. **A "Mentions" list.** Once there are real third-party mentions
   (conference programme, faculty page listing the paper, product
   reviews), add a small mentions section with links. Never add
   testimonials that are not real and attributable.
4. **Dated updates.** Keep /now current (update `nowUpdated`) and add
   `updated` to posts you revise substantially.
5. **Citations in posts.** Link primary sources (papers, official pages)
   rather than other blogs.

**Google Knowledge Panel: how it actually works.**

- You cannot apply for one. Google shows a panel when it is confident
  about an entity. That confidence comes from consistent facts across
  trusted sources: your site's Person data, ORCID, Scholar, LinkedIn, the
  company site, and third-party mentions.
- The work above (one name, one bio, one photo, links both ways, rich
  `sameAs`) is what moves the needle.
- If a panel appears, claim it through Google's "Claim this knowledge
  panel" flow, and verify with your Search Console property or an official
  profile.

**Wikidata: be careful.**

- An item must meet Wikidata's notability policy. That means one of:
  1. it has a sitelink to a Wikipedia (or other Wikimedia) article;
  2. it is a clearly identifiable entity described by **serious, publicly
     available references**;
  3. it fills a structural need, for example as the author of a scholarly
     article that already has an item.
- An early-career researcher with one paper can sometimes qualify under 3:
  WikiCite and Scholia import scholarly articles and link authors by
  ORCID.
- **Risks:** self-created promotional items are often deleted. Editing
  your own item is a conflict of interest, and a deleted item can make
  things worse.
- **Recommendation:** do not create a personal item now. If the paper gets
  a Wikidata item through WikiCite, a minimal author item linked by ORCID
  is legitimate. Then let other editors maintain it, and use the talk page
  for corrections. Never create one for Unique Labs without independent
  coverage.

---

## L. Backlinks and profile links (legitimate only)

No paid links, private blog networks, link exchanges, or directory spam.

| Priority | Source                                                                       | Why                                                 | How                                                                                                      | Effort | Value (qualitative) |
| -------- | ---------------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------ | ------------------- |
| 1        | www.uniquelabs.org team page                                                 | Strongest entity signal: the company you co-founded | Make sure /team/shahriar-ahmed links to shahriarahmed.net                                                | S      | High                |
| 1        | Every product site footer (unfollowx.com, growxapp.org, \*.uniquelabs.org)   | Topical, and on sites you control                   | "Built by Shahriar Ahmed" → shahriarahmed.net (or /projects/{slug}) **[CONFIRM]** with your co-founders  | S      | High                |
| 1        | ORCID, Google Scholar, LinkedIn, GitHub websites                             | Profiles Google already trusts for people           | Website/homepage fields (F checklist)                                                                    | S      | High (entity)       |
| 2        | Chrome Web Store developer website field and listing descriptions            | Seen by every user; links Unique Labs               | Developer dashboard → website: www.uniquelabs.org; mention the founder in descriptions where appropriate | S      | Medium              |
| 2        | GitHub repo homepage fields (public repos)                                   | Developers and crawlers follow them                 | Repo → About → Website                                                                                   | S      | Medium              |
| 2        | University of Rajshahi / CBCRO member pages, conference (ICRAST) proceedings | Academic authority                                  | Ask the department or organisers to link your profile or site where they list members or authors         | M      | Medium–High         |
| 2        | Semantic Scholar, Lens, ResearchGate                                         | Research entity consolidation                       | Claim author profiles; add the homepage                                                                  | S      | Medium              |
| 3        | Product Hunt, AlternativeTo, reputable extension directories                 | Real users find the products                        | Launch posts written by you, linking the product site and the founder profile                            | M      | Medium              |
| 3        | dev.to, Hashnode, Medium                                                     | Reach developer audiences                           | Cross-post build logs (J #4, #6, #12) with **canonical URL set to your blog post**                       | M      | Medium              |
| 3        | Bangladeshi tech and student communities                                     | Local relevance (BCS, BMB, careers posts)           | Share genuinely useful posts where self-links are allowed; follow each community's rules                 | M      | Medium              |
| 4        | Guest posts on biotech-student and Web3 blogs                                | Digital PR                                          | Pitch a specific, useful article; link back once in the author bio                                       | L      | Medium              |
| 4        | Launch stories (new extension versions, the paper)                           | Earned coverage                                     | A short press note with facts and images                                                                 | L      | Variable            |

---

## M. Performance (Done, with measurements)

**Changes in this round:**

- **Google tag** (`AW-18494416712`): both scripts now load with
  `strategy="lazyOnload"`, after the page is idle. Before, they loaded
  `afterInteractive`, competing with hydration.
- **Scroll reveals:** `Reveal`, `RevealWords` and `SweepText` are now
  server components that render data attributes only. One page-wide
  observer (`components/fx/reveal-observer.tsx` and `lib/reveal.ts`) starts
  their CSS transitions, and a MutationObserver picks up content added
  later. The reveal wrappers (about 45 uses in the code) no longer
  hydrate as client components. In dev mode there were no hydration warnings on any page, in
  light or dark.
- **Images:** pre-sized WebP and no 402 errors (C). These were the console
  errors that cost the Best Practices score.
- **Already in place:** no animation library (CSS only); the hero canvas
  starts after load; no page transitions; heavy GPU effects are limited on
  phones.

**Lighthouse 12, local production build, emulated mobile (Moto G, 4× CPU
throttling):**

| Page              | Performance | TBT                        | LCP   | CLS |
| ----------------- | ----------- | -------------------------- | ----- | --- |
| / (3 runs)        | 89–94       | 69–260 ms (median ~150 ms) | 3.1 s | 0   |
| /about            | 96          | 57 ms                      | 2.8 s | 0   |
| /projects/growx   | 95          | 61 ms                      | 3.0 s | 0   |
| /research/mcl-1-… | 96          | 58 ms                      | 2.7 s | 0   |
| / (desktop)       | 100         | 19 ms                      | 0.8 s | 0   |

These runs use `next start` on the build machine, without Vercel's CDN, so
LCP here is slower than on the live site. Compare with your PageSpeed
Insights runs after deploying. The audit's
600 ms TBT was measured on the live site before these changes.

On the homepage, the remaining blocking time is one React hydration task,
about 150 ms under 4× throttling. It grows with DOM size.

**Next, if field data (CrUX) shows TBT or INP problems:**

1. Shrink the homepage DOM: fewer duplicate marquee items, and fewer
   per-word spans in long statements.
2. Keep moving small widgets to CSS: the role cycler is already CSS. The
   theme toggle and copy buttons are tiny.

**Already the case, nothing to do:**

- **Legacy JS:** Next.js 16 already targets modern browsers. The ~14 KiB
  that Lighthouse flags is Next's own small polyfill set; a
  `browserslist` entry does not remove it.
- **CSS:** Tailwind v4 only emits classes that are used. It is one
  stylesheet, cached across pages.
- **Fonts:** Inter through `next/font` (self-hosted, subset, preloaded).
  Bangla text uses the system's Bengali fonts, so no extra download.

**Consent Mode v2 (your decision):**

- The Google Ads tag sets third-party cookies (`googleads.g.doubleclick.net`).
  That is what Lighthouse "Best Practices" flags, and it is relevant to
  privacy law for EU/UK visitors.
- **Options:**
  - (a) Keep it as is; it is now lazy.
  - (b) Add Consent Mode v2 with default `denied` and a consent banner.
    This costs some UI, plus a little JS.
  - (c) Load the tag only on pages where you measure conversions.
- **[CONFIRM]** whether you run Google Ads campaigns that need it on
  every page.

**Security headers (`next.config.ts`):**

```ts
// next.config.ts (excerpt)
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
{ key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
```

The enforced CSP covers framing, plugins, `<base>` and forms. That gives
real protection with no risk of blocking a script.

**HSTS preload:** once the header is live on the apex (and on every
subdomain you use, over HTTPS), you can submit the domain at
hstspreload.org. Preloading is hard to undo. Make sure every subdomain
will always support HTTPS. **[CONFIRM]**

**A full script policy should start as report-only**, with a reporting
endpoint, so you can see what it would block before enforcing it.
Suggested header, to add to `securityHeaders` once you have an endpoint
(for example a free report-uri.com account) **[CONFIRM]**:

```ts
// next.config.ts — add alongside the enforced CSP
{
  key: "Content-Security-Policy-Report-Only",
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net",
    "connect-src 'self' https://www.google.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://*.google-analytics.com",
    "img-src 'self' data: https://www.google.com https://googleads.g.doubleclick.net https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "frame-src https://td.doubleclick.net https://www.googletagmanager.com",
    "report-uri https://YOUR-ENDPOINT",
  ].join("; "),
},
```

`'unsafe-inline'` is needed for scripts because Next.js inlines its
bootstrap and the theme script. A nonce-based policy would need dynamic
rendering, which would give up static pages: not worth it here.

---

## N. Measurement

1. **Google Search Console.**
   - Add a **Domain property** for `shahriarahmed.net`, verified by a DNS
     TXT record at your registrar. It covers apex, `www`, http and https.
   - For a URL-prefix property instead: set `GOOGLE_SITE_VERIFICATION` in
     Vercel to the token. The site renders the meta tag
     (`app/layout.tsx`).
   - Submit `https://shahriarahmed.net/sitemap.xml`.
   - Use URL Inspection on every page in section D, and request indexing
     for the new pages.
   - Watch **Pages → "Page with redirect"** and **"Alternate page with
     proper canonical tag"** after the host fix (B).
2. **Bing Webmaster Tools.**
   - Import the property from Search Console (fastest), or set
     `BING_SITE_VERIFICATION` in Vercel.
   - Submit the sitemap.
3. **IndexNow** (Bing, Yandex and others; not Google).
   - In Bing Webmaster Tools, generate a key.
   - Add the file `public/<key>.txt` containing the key, and deploy.
   - After each deploy that changes pages, ping:

     ```bash
     curl -s -X POST https://api.indexnow.org/indexnow -H "Content-Type: application/json" \
       -d '{"host":"shahriarahmed.net","key":"<key>","urlList":["https://shahriarahmed.net/","https://shahriarahmed.net/projects/unique-pdf"]}'
     ```

   - This was not automated, because it needs your key.

4. **Analytics.**
   - The Google tag is Google Ads (AW-). For behaviour data, add GA4 in
     the same tag, or a privacy-friendly tool (Plausible, Umami, Vercel Web
     Analytics).
   - Update the Privacy Policy (`data/legal.ts`) whenever you add one.
5. **Branded queries to track** (GSC → Performance → Queries, filter
   "contains"):
   - `shahriar ahmed`
   - `shahriar ahmed tushar`
   - `shahriar ahmed rajshahi`
   - `shahriar ahmed unique labs`
   - `shahriar ahmed biochemistry`
   - `shahriar ahmed researcher`

**KPIs.** Fill in the baselines from GSC in week 1.

| KPI                                                        | Baseline                      | 90-day goal (qualitative)                 |
| ---------------------------------------------------------- | ----------------------------- | ----------------------------------------- |
| Indexed pages (GSC → Pages → Indexed)                      | unknown — measure in GSC      | All 24 sitemap URLs indexed, plus posts   |
| "Page with redirect" URLs                                  | unknown — measure in GSC      | Only the non-primary host's URLs          |
| Avg. position, "shahriar ahmed"                            | unknown — measure in GSC      | Up: top result for the qualified variants |
| Avg. position, "shahriar ahmed tushar"                     | unknown — measure in GSC      | #1                                        |
| Clicks from branded queries                                | unknown — measure in GSC      | Up month on month                         |
| Impressions from non-branded queries (blog, products, BCS) | unknown — measure in GSC      | From ~0 to steady growth as posts publish |
| Core Web Vitals (field, CrUX)                              | unknown — not enough data yet | "Good" for LCP, INP, CLS on mobile        |
| Referring domains (GSC → Links)                            | unknown — measure in GSC      | Up, from section L sources                |

---

## O. 90-day roadmap

Owner: **You**, or **Code**. "Code" means a change in this repository,
which Claude can make on request.

| Week | Dates          | Tasks                                                                                                                                                                                | Owner             | Effort | Depends on | Success metric                                       |
| ---- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ------ | ---------- | ---------------------------------------------------- |
| 1    | 23–29 Nov 2026 | Deploy this change. **Host fix (B, option A)**. Verify the 402 fix live. Confirm the robots cleanup live. **GSC Domain property + Bing**. Submit the sitemap. Run the curl checklist | You               | S      | —          | curl checklist passes; sitemap "Success" in GSC      |
| 2    | 30 Nov–6 Dec   | URL Inspection + request indexing for the new pages. Check `<lastmod>`, and set `VERCEL_DEEP_CLONE` if missing. Post 1 (KOC)                                                         | You               | S      | Week 1     | New pages "Indexed" or "Discovered"                  |
| 3    | 7–13 Dec       | Profile checklist (F): LinkedIn education, ORCID, Scholar, GitHub, X. Dhaka → Rajshahi request. Post 2                                                                               | You               | M      | —          | All profiles show the same bio, city and link        |
| 4    | 14–20 Dec      | uniquelabs.org and product-site footer links to shahriarahmed.net (L1). Post 3 (docking)                                                                                             | You + co-founders | S      | —          | Links live; visible in GSC Links later               |
| 5    | 21–27 Dec      | Send case-study details (stack, dates, verifiable figures) and add them to the product pages. Post 4 (Unique PDF)                                                                    | You → Code        | M      | Your facts | Product pages with real "results" sections           |
| 6    | 28 Dec–3 Jan   | Rich Results Test + schema validator on key pages; fix anything flagged. Post 5                                                                                                      | You / Code        | S      | Week 1     | No errors                                            |
| 7    | 4–10 Jan 2027  | Semantic Scholar / Lens / ResearchGate profiles. Post 6 (Twofold)                                                                                                                    | You               | S      | —          | Profiles link the site                               |
| 8    | 11–17 Jan      | Decide on Consent Mode / the Google tag scope (M); implement. Post 7 (DFT)                                                                                                           | You → Code        | M      | Decision   | Best Practices ≥ 95 on PSI                           |
| 9    | 18–24 Jan      | Report-only CSP with an endpoint; review the reports. Post 8 (BCS bot, Bangla section)                                                                                               | You → Code        | S      | Endpoint   | No unexpected violations after 1 week                |
| 10   | 25–31 Jan      | Enforce the reviewed CSP. HSTS preload submission (if all subdomains are HTTPS). Post 9                                                                                              | Code / You        | S      | Week 9     | Headers live; preload pending                        |
| 11   | 1–7 Feb        | Cross-post build logs with canonical URLs (L3); Product Hunt / AlternativeTo listings. Post 10                                                                                       | You               | M      | Posts 4, 6 | Referring domains up in GSC                          |
| 12   | 8–14 Feb       | Grow /experience and /experience/web3 with your details (F). Post 11                                                                                                                 | You → Code        | M      | Your facts | 500+ words each                                      |
| 13   | 15–21 Feb      | Post 12. Review KPIs against the week-1 baselines; plan the next quarter                                                                                                             | You               | S      | All        | Branded positions and indexed pages up from baseline |
