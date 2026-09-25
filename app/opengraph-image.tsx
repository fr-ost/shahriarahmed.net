import { renderSocialImage } from "@/lib/og";

export const alt = "Shahriar Ahmed — Co-Founder, Unique Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderSocialImage(size);
}
