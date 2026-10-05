import type { MetadataRoute } from "next";
import { products, sectors } from "@/lib/content";
import { getBlogPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

// Rebuilt hourly so newly published Sanity posts show up without a redeploy.
export const revalidate = 3600;

/**
 * Static routes, with priority reflecting commercial intent.
 *
 * /contact is intentionally absent: it is disallowed in robots.ts, and
 * submitting a URL you have blocked from crawling is contradictory — Search
 * Console flags it as "Submitted URL blocked by robots.txt".
 */
const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/industries", priority: 0.9 },
  { path: "/for-startups", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/work", priority: 0.7 },
  { path: "/technology", priority: 0.7 },
  { path: "/technology/architecture", priority: 0.6 },
  { path: "/technology/infrastructure", priority: 0.6 },
  { path: "/about/vision", priority: 0.5 },
  { path: "/about/why", priority: 0.5 },
  { path: "/about/market", priority: 0.5 },
  { path: "/about/roadmap", priority: 0.5 },
];

/** Post dates are human-formatted ("June 2026"); only use one if it parses. */
function parsedDate(value: string): Date | undefined {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/*
 * Static, product and sector pages carry no lastModified: their copy lives in
 * code and has no real edit date, and stamping every URL with the build time
 * teaches Google the field is noise — it then ignores it for blog posts too.
 * An honest absence beats a date that changes on every deploy.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...sectors.map((s) => ({
      url: absoluteUrl(`/industries/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // A post flagged noIndex stays reachable on /blog but must not be
    // submitted for indexing — advertising it here contradicts its robots tag.
    ...posts
      .filter((post) => !post.seo.noIndex)
      .map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post.updatedAt
          ? new Date(post.updatedAt)
          : parsedDate(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
  ];
}
