import { renderSocialImage } from "@/lib/og";
import { socialImage } from "@/lib/social-image";

export const alt = socialImage.alt;
export const size = socialImage.size;
export const contentType = socialImage.contentType;

export default function OpenGraphImage() {
  return renderSocialImage(size);
}
