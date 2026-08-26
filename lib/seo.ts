import type { Metadata } from "next";

/** Canonical production origin. Every absolute URL in metadata derives from it. */
export const SITE_URL = "https://viramtech.com";
export const SITE_NAME = "ViramTech";
export const SITE_DESCRIPTION =
  "ViramTech builds, deploys and scales enterprise AI systems that reach production — owned end to end and measured on the outcomes leadership already tracks.";

/**
 * Absolute URL for a route. `metadataBase` covers the metadata export, but
 * sitemap entries are emitted verbatim, so those must be absolute already.
 * Mirrors how Next renders the canonical (no trailing slash on the homepage)
 * so the two never disagree.
 */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

type SeoInput = {
  /** Page title without the "— ViramTech" suffix; the root template appends it. */
  title: string;
  description: string;
  /** Route path with a leading slash and no trailing slash, e.g. "/products". */
  path: string;
  /** og:type. Defaults to "website"; blog posts pass "article". */
  type?: "website" | "article";
  /** ISO date, article pages only. */
  publishedTime?: string;
  /** Absolute or root-relative image URL. Falls back to the generated site card. */
  image?: string;
  /** Keeps the page reachable but tells search engines not to index it. */
  noIndex?: boolean;
};

/**
 * Builds a complete metadata object for one route.
 *
 * Next merges metadata shallowly between segments, so a page that defines its
 * own `openGraph` replaces the root one outright rather than extending it.
 * Routing every page through this helper is what keeps canonical, Open Graph
 * and Twitter tags complete and consistent instead of half-inherited.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  image,
  noIndex,
}: SeoInput): Metadata {
  const isHome = path === "/";
  // The root template appends the brand to every child title; the homepage
  // already leads with it, so it opts out via `absolute`.
  const socialTitle = isHome ? title : `${title} — ${SITE_NAME}`;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    // Overrides the site-wide index/follow set in the root layout.
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
