import Link from "next/link";
import { notFound } from "next/navigation";
import { LuTriangleAlert, LuSparkles, LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { Eyebrow } from "@/components/ui";
import { sectors, sectorCaseStudies, type Sector } from "@/lib/content";
import { sectorIcons } from "@/components/sectorIcons";
import { Reveal } from "@/components/Reveal";
import { RelatedArticles } from "@/components/RelatedArticles";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = sectors.find((x) => x.slug === slug);
  return {
    title: s ? `${s.name} — ViramTech` : "Industries — ViramTech",
    description: s?.overview,
  };
}

function Tagline({ text, accent }: { text: string; accent: string }) {
  const i = text.toLowerCase().indexOf(accent.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="font-serif font-normal italic text-indigo-500">
        {text.slice(i, i + accent.length)}
      </span>
      {text.slice(i + accent.length)}
    </>
  );
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s: Sector | undefined = sectors.find((x) => x.slug === slug);
  if (!s) notFound();

  const Icon = sectorIcons[s.slug];
  const others = sectors.filter((x) => x.slug !== s.slug);
  const caseStudy = sectorCaseStudies[s.slug];

  return (
    <>
    <article className="mx-auto max-w-5xl px-6 pb-28 pt-32">
      <Link
        href="/industries"
        className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline"
      >
        ← Industries
      </Link>

      {/* Hero */}
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <Eyebrow>Industries · {s.short}</Eyebrow>
          <h1 className="mt-3 text-pretty text-4xl font-extrabold tracking-tight sm:text-5xl">
            {s.name}
          </h1>
          <p className="mt-5 text-balance text-2xl font-semibold leading-snug tracking-tight">
            <Tagline text={s.tagline} accent={s.accent} />
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-80">
            {s.overview}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${s.gradient} shadow-xl shadow-indigo-500/10`}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            {Icon && (
              <span className="animate-float relative text-white/95">
                <Icon size={96} strokeWidth={1.3} />
              </span>
            )}
          </div>
        </Reveal>
      </div>

      {/* Metrics band */}
      <Reveal className="mt-16 grid divide-y divide-black/5 rounded-3xl border border-black/5 bg-black/[0.02] sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
        {s.metrics.map((m) => (
          <div key={m.label} className="p-7 text-center">
            <div className="bg-gradient-to-r from-[#3F56A4] to-[#33A5DB] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
              {m.value}
            </div>
            <div className="mt-2 text-sm opacity-70">{m.label}</div>
          </div>
        ))}
      </Reveal>

      {/* The challenge */}
      <div className="mt-24">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            The challenge
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-3">
          {s.challenges.map((c, i) => (
            <Reveal key={c} delay={i * 0.08}>
              <div className="flex gap-3">
                <LuTriangleAlert
                  size={18}
                  className="mt-1 shrink-0 text-amber-500/80"
                />
                <p className="text-base leading-relaxed opacity-80">{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* How ViramTech helps */}
      <div className="mt-24">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            How ViramTech helps
          </h2>
          <p className="mt-2 max-w-xl text-lg opacity-70">
            The AI we put to work in {s.short.toLowerCase()}.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {s.solutions.map((sol, i) => (
            <Reveal key={sol.title} delay={i * 0.08}>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-white shadow-md`}
              >
                <LuSparkles size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{sol.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-75">{sol.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Case study */}
      {caseStudy && (
        <div className="mt-24">
          <Reveal className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Case study
            </h2>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
              Representative engagement
            </span>
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-8 overflow-hidden rounded-3xl border border-black/5 dark:border-white/10"
          >
            <div className="grid gap-10 bg-black/[0.02] p-8 sm:p-10 md:grid-cols-2 dark:bg-white/[0.03]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">
                  {caseStudy.industry}
                </p>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight">
                  {caseStudy.client}
                </h3>
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wide opacity-50">
                    The challenge
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed opacity-80">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wide opacity-50">
                    Our approach
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed opacity-80">
                    {caseStudy.approach}
                  </p>
                </div>
              </div>

              <div className="grid content-center gap-6 sm:border-l sm:border-black/5 sm:pl-10 dark:sm:border-white/10">
                <p className="text-xs font-bold uppercase tracking-wide opacity-50">
                  The results
                </p>
                {caseStudy.results.map((r) => (
                  <div key={r.label} className="flex items-baseline gap-3">
                    <span className="bg-gradient-to-r from-[#3F56A4] to-[#33A5DB] bg-clip-text text-4xl font-extrabold text-transparent">
                      {r.value}
                    </span>
                    <span className="text-sm opacity-70">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <blockquote
              className={`bg-gradient-to-br ${s.gradient} p-8 text-white sm:p-10`}
            >
              <p className="max-w-2xl text-lg font-medium leading-relaxed">
                &ldquo;{caseStudy.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-white/60">
                — {caseStudy.attribution}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      )}

      {/* CTA band */}
      <div
        className={`mt-24 overflow-hidden rounded-3xl bg-gradient-to-br ${s.gradient} px-8 py-14 text-center text-white`}
      >
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Put AI to work in your {s.short.toLowerCase()} operation
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Tell us where the friction is — we&apos;ll map the highest-ROI place to
          start.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 font-semibold text-indigo-700 transition hover:bg-white/90"
          >
            Book a consultation
          </Link>
          <Link
            href="/technology"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Explore the technology
            <LuArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* More industries */}
      <div className="mt-20">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] opacity-50">
          More industries
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => {
            const OIcon = sectorIcons[o.slug];
            return (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                className="group flex items-start gap-3 rounded-2xl border border-black/5 bg-black/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-indigo-500/30 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  {OIcon && <OIcon size={20} />}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                    {o.short}
                    <LuArrowUpRight
                      size={14}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </span>
                  <span className="mt-0.5 block truncate text-xs opacity-60">
                    {o.points.join(" · ")}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </article>
      <RelatedArticles />
    </>
  );
}
