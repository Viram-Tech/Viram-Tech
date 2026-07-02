import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { blogPosts as staticPosts } from "@/lib/content";

/** Unified post shape used by the blog pages (Sanity or static fallback). */
export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  gradient: string;
  coverImageUrl: string | null;
  // Portable Text blocks when sourced from Sanity; null for static fallback.
  body: unknown[] | null;
};

// Literal gradient classes (kept here so Tailwind generates them) used as a
// cover fallback when a Sanity post has no cover image.
const gradientPresets = [
  "from-[#3F56A4] to-[#14284E]",
  "from-[#33A5DB] to-[#2A3E77]",
  "from-[#2A3E77] to-[#14284E]",
  "from-[#597CBD] to-[#33A5DB]",
];

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  "slug": slug.current, title, category, publishedAt, excerpt, coverImage, body
}`;

/* eslint-disable @typescript-eslint/no-explicit-any */

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function readTimeFromBody(body?: any[]): string {
  if (!body?.length) return "3 min read";
  const words = body
    .filter((b) => b?._type === "block")
    .flatMap((b: any) => (b.children ?? []).map((c: any) => c.text ?? ""))
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function mapSanity(doc: any, i: number): Post {
  return {
    slug: (doc.slug ?? "").trim(),
    title: doc.title,
    category: doc.category ?? "Enterprise AI",
    date: formatDate(doc.publishedAt),
    readTime: readTimeFromBody(doc.body),
    excerpt: doc.excerpt ?? "",
    gradient: gradientPresets[i % gradientPresets.length],
    coverImageUrl: urlForImage(doc.coverImage),
    body: doc.body ?? null,
  };
}

function mapStatic(p: (typeof staticPosts)[number]): Post {
  return { ...p, coverImageUrl: null, body: null };
}

/* eslint-enable @typescript-eslint/no-explicit-any */

/** All posts, newest first. Falls back to the built-in posts if Sanity is
 *  not connected or has no published posts yet. */
export async function getBlogPosts(): Promise<Post[]> {
  if (client) {
    try {
      const docs = await client.fetch<any[]>(
        POSTS_QUERY,
        {},
        { next: { revalidate: 60 } },
      );
      if (docs?.length) return docs.map(mapSanity);
    } catch {
      // fall through to static content
    }
  }
  return staticPosts.map(mapStatic);
}

/** A single post by slug, or null if not found. Whitespace-tolerant. */
export async function getBlogPost(slug: string): Promise<Post | null> {
  const target = slug.trim();
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === target) ?? null;
}
