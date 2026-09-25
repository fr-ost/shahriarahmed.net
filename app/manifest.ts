import type { MetadataRoute } from "next";
import { person, site } from "@/data/portfolio";
import { THEME_COLORS } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} — ${person.title}`,
    short_name: person.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: THEME_COLORS.light,
    theme_color: THEME_COLORS.light,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
