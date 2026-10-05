import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

/** Name, colours and icons used when the site is saved to a home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Enterprise AI, built to ship`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    // Matches viewport.themeColor in the root layout.
    background_color: "#0b162b",
    theme_color: "#0b162b",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
