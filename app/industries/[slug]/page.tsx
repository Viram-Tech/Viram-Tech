import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LuArrowRight } from "react-icons/lu";
import { sectors, type Sector } from "@/lib/content";
import { sectorIcons } from "@/components/sectorIcons";
import { SmoothScrollLink } from "@/components/SmoothScrollLink";
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

/** Playfair italic accent — matches the products / for-startups type system. */
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-[family-name:var(--font-playfair)] font-normal italic text-brand-royal dark:text-brand-sky">
      {children}
    </span>
  );
}

/** Tagline with its key phrase set in the Playfair italic accent. */
function Tagline({ text, accent }: { text: string; accent: string }) {
  const i = text.toLowerCase().indexOf(accent.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <Accent>{text.slice(i, i + accent.length)}</Accent>
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

  return (
    <div>
      {/* ── Hero (full-bleed navy, photo panel) ── */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="bg-grid-white pointer-events-none absolute inset-0 opacity-[0.1]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-brand-royal/25 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 sm:pt-40">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.2em] text-brand-sky transition hover:text-white"
          >
            <span aria-hidden>←</span> Industries
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.28em] text-brand-sky/80">
                Industry · {s.short}
              </p>
              <h1 className="mt-4 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
                {s.name}
              </h1>
              <p className="mt-5 max-w-lg text-2xl font-semibold leading-tight tracking-tight text-white/90 sm:text-3xl">
                <Tagline text={s.tagline} accent={s.accent} />
              </p>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                {s.overview}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-gradient-to-r from-brand-royal to-brand-sky px-8 py-3.5 text-center font-semibold text-white shadow-[0_10px_40px_-8px_rgba(51,165,219,0.6)] transition hover:-translate-y-0.5"
                >
                  Talk to us
                </Link>
                <SmoothScrollLink
                  targetId="help"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
                >
                  How we help
                  <span aria-hidden>↓</span>
                </SmoothScrollLink>
              </div>
            </div>

            {/* Industry photo — kept, framed on the navy */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src={`/industries/${s.slug}.jpg`}
                alt={`${s.name} — ${s.short.toLowerCase()} operations`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-40 mix-blend-multiply`}
              />
              <div className="absolute inset-0 bg-brand-navy/30" />
              {Icon && (
                <span className="absolute bottom-5 left-5 text-white/90 drop-shadow">
                  <Icon size={40} strokeWidth={1.4} />
                </span>
              )}
            </div>
          </div>

          {/* inline metric strip */}
          <div className="mt-16 flex flex-wrap items-end gap-x-14 gap-y-8 border-t border-white/12 pt-10">
            {s.metrics.map((m) => (
              <div key={m.label} className="min-w-[120px]">
                <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {m.value}
                </div>
                <div className="mt-2 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.16em] text-brand-sky/85">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The challenge (ruled list) ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
          Where the <Accent>friction</Accent> is.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-on-surface-variant">
          The problems that quietly cost {s.short.toLowerCase()} teams the most.
        </p>
        <div className="mt-12 grid gap-x-16 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {s.challenges.map((c) => (
            <div key={c} className="border-t border-outline-variant/25 pt-5">
              <p className="leading-relaxed text-on-surface-variant">{c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How ViramTech helps (ruled list) ── */}
      <section
        id="help"
        className="scroll-mt-28 border-t border-outline-variant/20 bg-surface-container-low/40"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
            How ViramTech puts AI to <Accent>work</Accent>.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-on-surface-variant">
            The AI we ship into {s.short.toLowerCase()} — mapped to real outcomes.
          </p>
          <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {s.solutions.map((sol) => (
              <div key={sol.title} className="border-t border-outline-variant/25 pt-6">
                <h3 className="text-xl font-bold tracking-tight text-on-surface">
                  {sol.title}
                </h3>
                <p className="mt-3 leading-relaxed text-on-surface-variant">
                  {sol.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-brand-navy p-12 text-center text-white md:p-20">
          <div className="bg-grid-white absolute inset-0 opacity-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-brand-sky/20 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-brand-royal/25 blur-[110px]" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Put AI to work in your <Accent>{s.short.toLowerCase()}</Accent>{" "}
              operation.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Tell us where the friction is — we&apos;ll map the highest-ROI place
              to start and ship a pilot in weeks.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="w-full rounded-full bg-white px-8 py-3.5 font-semibold text-brand-navy transition hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
              >
                Book a consultation
              </Link>
              <Link
                href="/technology"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-3.5 font-semibold text-white transition hover:border-white/50 sm:w-auto"
              >
                Explore the technology
                <LuArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── More industries ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.2em] text-outline">
          More industries
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => {
            const OIcon = sectorIcons[o.slug];
            return (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                className="group flex items-start gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                  {OIcon && <OIcon size={20} />}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold tracking-tight text-on-surface transition-colors group-hover:text-primary dark:group-hover:text-primary-fixed">
                    {o.short}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-on-surface-variant">
                    {o.points.join(" · ")}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <RelatedArticles />
    </div>
  );
}
