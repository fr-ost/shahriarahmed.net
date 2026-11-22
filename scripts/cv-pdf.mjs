/**
 * Prints the /cv page to public/Shahriar-Ahmed-CV.pdf, which turns on the
 * "Download CV" links. Run it against a running build of the site, then
 * build again so the links appear:
 *
 *   npm run build && npm run start        # in one terminal
 *   npm run cv:pdf                        # in another
 *   npm run build                         # picks up the new PDF
 *
 * Needs Playwright with Chromium (`npm i -D playwright && npx playwright
 * install chromium`); it is not a dependency of the site itself.
 */

import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const base = (process.argv[2] || process.env.CV_URL || "http://localhost:3000").replace(/\/$/, "");
const out = join(process.cwd(), "public", "Shahriar-Ahmed-CV.pdf");

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  // A global install, found through NODE_PATH, which `import` ignores.
  try {
    ({ chromium } = createRequire(import.meta.url)("playwright"));
  } catch {
    chromium = null;
  }
}
if (!chromium) {
  console.error(
    "Playwright is not installed: npm i -D playwright && npx playwright install chromium",
  );
  process.exit(1);
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  const response = await page.goto(`${base}/cv`, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`GET ${base}/cv returned ${response?.status()}`);
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({
    format: "A4",
    printBackground: false,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });
  await writeFile(out, pdf);
  console.log(`Wrote ${out} (${Math.round(pdf.length / 1024)} KB)`);
} finally {
  await browser.close();
}
