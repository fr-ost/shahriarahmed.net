/**
 * Generates the favicon and app icons from the site mark.
 *
 *   node scripts/generate-icons.mjs
 *
 * Outputs (committed to the repo):
 *   app/icon.svg            – vector favicon for modern browsers
 *   app/favicon.ico         – 16/32/48px fallback
 *   app/apple-icon.png      – 180px home-screen icon
 *   public/icon-192.png     – web app manifest
 *   public/icon-512.png     – web app manifest
 *
 * Uses `sharp`, which is installed alongside Next.js.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const INK = "#0e1010";
const PAPER = "#f7f7f4";
const ACCENT = "#3ccba7";

/** The mark (hexagonal ring + highlighted node) on a solid tile. */
function markSvg({ size = 32, radius = 7, scale = 0.8 } = {}) {
  const offset = (32 - 32 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${radius}" fill="${INK}"/>
  <g transform="translate(${offset} ${offset}) scale(${scale})">
    <path d="M16 5.5 25.093 10.75v10.5L16 26.5l-9.093-5.25v-10.5Z" fill="none" stroke="${PAPER}" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="16" cy="16" r="2.4" fill="${PAPER}"/>
    <circle cx="25.093" cy="10.75" r="3.8" fill="${ACCENT}"/>
  </g>
</svg>`;
}

async function png(svg, size) {
  return sharp(Buffer.from(svg), { density: 72 * (size / 32) * 2 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Minimal ICO container holding PNG-encoded images. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

const tile = markSvg();
await writeFile(`${root}app/icon.svg`, tile);

const icoImages = [];
for (const size of [16, 32, 48]) {
  icoImages.push({ size, data: await png(markSvg({ size }), size) });
}
await writeFile(`${root}app/favicon.ico`, ico(icoImages));

// Apple and manifest icons are full-bleed; the platform applies its own mask.
const fullBleed = markSvg({ radius: 0, scale: 0.62 });
await writeFile(`${root}app/apple-icon.png`, await png(fullBleed, 180));
await writeFile(`${root}public/icon-192.png`, await png(fullBleed, 192));
await writeFile(`${root}public/icon-512.png`, await png(fullBleed, 512));

console.log("Icons generated.");
