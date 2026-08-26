import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuClock } from "react-icons/lu";
import { Eyebrow } from "@/components/ui";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Ideas, playbooks and field notes on enterprise AI.",
  path: "/blog",
});

// Re-checks Sanity for new/updated posts at most once a minute (ISR).
export const revalidate = 60;

const categories = ["All", "Enterprise AI", "Agentic AI", "Data", "MLOps"];

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active =
    category && categories.includes(category) ? category : "All";
  const all = await getBlogPosts();
  const posts =
    active === "All" ? all : all.filter((p) => p.category === active);
  const [featured, ...rest] = posts;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-32">
      <JsonLd data={graph(breadcrumbSchema([["Blog", "/blog"]]))} />
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline"
      >
        ← Home
      </Link>
      <Eyebrow>Insights</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        Ideas worth{" "}
        <span className="font-serif font-normal italic text-indigo-500">
          shipping
        </span>
        .
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-70">
        Playbooks, field notes and points of view on building enterprise AI that
        actually reaches production.
      </p>

      {/* Category filter chips */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        {categories.map((c) => {
          const isActive = c === active;
          const href = c === "All" ? "/blog" : `/blog?category=${encodeURIComponent(c)}`;
          return (
            <Link
              key={c}
              href={href}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                isActive
                  ? "border-transparent bg-indigo-600 text-white"
                  : "border-black/10 opacity-70 hover:opacity-100 dark:border-white/15"
              }`}
            >
              {c}
            </Link>
          );
        })}
      </div>

      {posts.length === 0 && (
        <p className="mt-16 rounded-3xl border border-dashed border-black/10 p-12 text-center text-sm opacity-60 dark:border-white/15">
          No posts in this category yet.
        </p>
      )}

      {/* Featured post */}
      {featured && (
      <Link
        href={`/blog/${featured.slug}`}
        className="group mt-12 grid overflow-hidden rounded-3xl border border-black/5 bg-black/[0.02] transition hover:border-indigo-500/30 md:grid-cols-2 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div
          className={`relative min-h-[240px] overflow-hidden bg-gradient-to-br ${featured.gradient} p-8`}
        >
          {featured.coverImageUrl && (
            <Image
              src={featured.coverImageUrl}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          )}
          <span className="absolute left-6 top-6 z-10 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
            Featured
          </span>
        </div>
        <div className="flex flex-col justify-center p-8">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-indigo-500">
            <span>{featured.category}</span>
            <span className="opacity-40">·</span>
            <span className="flex items-center gap-1 opacity-70">
              <LuClock size={13} /> {featured.readTime}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
            {featured.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed opacity-70">
            {featured.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-500">
            Read article
            <LuArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
      )}

      {/* Rest of the grid */}
      {posts.length > 0 && (
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-black/[0.02] transition hover:-translate-y-1 hover:border-indigo-500/30 dark:border-white/10 dark:bg-white/[0.03]"
          >
            {p.coverImageUrl ? (
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={p.coverImageUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className={`h-44 bg-gradient-to-br ${p.gradient}`} />
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-indigo-500">
                <span>{p.category}</span>
                <span className="opacity-40">·</span>
                <span className="flex items-center gap-1 opacity-70">
                  <LuClock size={13} /> {p.readTime}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed opacity-70">
                {p.excerpt}
              </p>
              <span className="mt-4 text-xs font-semibold opacity-50">
                {p.date}
              </span>
            </div>
          </Link>
        ))}

        {/* More coming soon placeholder */}
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 p-6 text-center dark:border-white/15">
          <span className="text-sm font-bold opacity-60">More articles</span>
          <span className="mt-1 text-sm opacity-45">coming soon</span>
        </div>
      </div>
      )}
    </section>
  );
}
