import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SpotlightTracker } from "@/components/fx/spotlight-tracker";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { MotionProvider } from "@/components/providers/motion-provider";
import { navigation, navigationCta, person, site, socials } from "@/data/portfolio";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";
import "@/styles/globals.css";

/*
 * Apple devices render the native system font (SF Pro) via the stack in
 * styles/globals.css. SF Pro cannot be embedded on the web, so every other
 * device falls back to Inter, an open-source typeface in the same style.
 */
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

/** Google tag (Google Ads). Loaded once for the whole site, after the page is interactive. */
const GOOGLE_TAG_ID = "AW-18494416712";

const xHandle = socials.find((social) => social.id === "x")?.handle;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${person.name}`,
  },
  description: site.description,
  applicationName: person.name,
  authors: [{ name: person.name, url: `${site.url}/about` }],
  creator: person.name,
  publisher: person.name,
  keywords: [...site.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: person.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    firstName: person.givenName,
    lastName: person.familyName,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: xHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  category: "science",
};

export const viewport: Viewport = {
  themeColor: THEME_COLORS.light,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={inter.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;transform:none!important}.sweep-word{color:var(--fg)!important}</style>",
          }}
        />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`}
        </Script>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <SpotlightTracker />
          <Navbar
            items={navigation}
            cta={navigationCta}
            name={person.name}
            title={person.title}
            email={person.email}
          />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
