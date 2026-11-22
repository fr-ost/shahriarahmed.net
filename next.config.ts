import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // HTTPS only, for this host and its subdomains (www). Vercel sends a
  // shorter HSTS header by default; this one replaces it.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // A CSP that cannot break the page: it limits framing, plugins, the base
  // URL and form targets, but not scripts or styles (Next.js inlines its own
  // scripts, and the Google tag loads from several Google hosts).
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Served as they are, already sized and compressed in /public (see
    // README → Images): Vercel's image optimisation is metered, and when the
    // plan's quota ran out it answered 402 and the images broke.
    unoptimized: true,
  },
  async redirects() {
    // X Mass Unfollow became UnfollowX Pro, with its own website. Its privacy
    // policy stays here, at /projects/x-mass-unfollow/privacy.
    return [
      {
        source: "/projects/x-mass-unfollow",
        destination: "https://www.unfollowx.com/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
