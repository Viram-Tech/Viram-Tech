import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

/**
 * "Insights · Related Articles" band — shows the three latest blog posts.
 * Sanity-backed (falls back to the built-in posts). Renders nothing if empty.
 */
export async function RelatedArticles() {
  const posts = (await getBlogPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto mt-24 max-w-5xl border-t border-black/5 px-6 pb-24 pt-16 dark:border-white/10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-indigo-500 dark:text-indigo-400">
            Insights
          </p>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Related articles
          </h2>
        </div>
        <Link
          href="/blog"
          className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500"
        >
          View all articles
        </Link>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
            {p.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.coverImageUrl}
                alt=""
                className="aspect-[16/10] w-full rounded-2xl object-cover"
              />
            ) : (
              <div
                className={`aspect-[16/10] w-full rounded-2xl bg-gradient-to-br ${p.gradient}`}
              />
            )}
            <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
              {p.title}
            </h3>
            <span className="mt-3 inline-block border-b-2 border-indigo-500 pb-0.5 text-sm font-bold text-indigo-500 dark:text-indigo-400">
              Read More
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedArticles;
