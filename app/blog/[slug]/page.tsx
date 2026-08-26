import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuClock } from "react-icons/lu";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { PortableBody } from "@/components/PortableBody";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema, articleSchema } from "@/lib/schema";
import type { Metadata } from "next";

// Re-checks Sanity for edits at most once a minute (ISR).
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return buildMetadata({
      title: "Blog",
      description: "Ideas, playbooks and field notes on enterprise AI.",
      path: "/blog",
    });
  }
  return buildMetadata({
    // post.seo is already coalesced in GROQ, so these are never empty.
    title: post.seo.title,
    description: post.seo.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt ?? undefined,
    image: post.seo.imageUrl ?? post.coverImageUrl ?? undefined,
    noIndex: post.seo.noIndex,
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = graph(
    articleSchema(post),
    breadcrumbSchema([
      ["Blog", "/blog"],
      [post.title, `/blog/${post.slug}`],
    ]),
  );

  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-32">
      <JsonLd data={jsonLd} />
      <Link
        href="/blog"
        className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline"
      >
        ← Blog
      </Link>

      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-indigo-500">
        <span>{post.category}</span>
        <span className="opacity-40">·</span>
        <span>{post.date}</span>
        <span className="opacity-40">·</span>
        <span className="flex items-center gap-1 opacity-70">
          <LuClock size={13} /> {post.readTime}
        </span>
      </div>

      {post.author && (
        <div className="mt-5 flex items-center gap-3">
          {post.author.imageUrl && (
            <Image
              src={post.author.imageUrl}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div className="text-sm leading-tight">
            <p className="font-semibold">{post.author.name}</p>
            {post.author.role && (
              <p className="opacity-60">{post.author.role}</p>
            )}
          </div>
        </div>
      )}

      <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        {post.title}
      </h1>

      {post.coverImageUrl ? (
        <div className="relative mt-8 h-56 w-full overflow-hidden rounded-3xl sm:h-72">
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div
          className={`mt-8 h-56 w-full rounded-3xl bg-gradient-to-br ${post.gradient}`}
        />
      )}

      <p className="mt-8 text-xl font-medium leading-relaxed opacity-80">
        {post.excerpt}
      </p>

      {post.body ? (
        <PortableBody value={post.body} />
      ) : (
        <div className="mt-8 space-y-5 text-base leading-relaxed opacity-75">
          <p>
            This is a placeholder for the full article. The complete write-up —
            with examples, diagrams and a step-by-step breakdown — is on its way.
          </p>
          <p>
            In the meantime, if this topic is relevant to what your team is
            building, we&apos;d be glad to talk it through and share what
            we&apos;ve learned shipping enterprise AI to production.
          </p>
        </div>
      )}

      <div className="mt-12 flex flex-wrap items-center gap-4 rounded-3xl border border-black/5 bg-black/[0.02] p-7 dark:border-white/10 dark:bg-white/[0.03]">
        <p className="flex-1 text-base font-semibold">
          Want to go deeper on this?
        </p>
        <Link
          href="/contact"
          className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
        >
          Talk to us
        </Link>
      </div>
    </article>
  );
}
