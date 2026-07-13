import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/content";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SmoothScrollLink } from "@/components/SmoothScrollLink";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product — ViramTech" };
  return {
    title: `${product.name} — ViramTech`,
    description: product.summary,
  };
}

/** Material Symbol shown in the hero instrument, per product. */
const heroIcon: Record<string, string> = {
  dataforge: "forum",
  "predictive-demand-intelligence": "trending_up",
  "document-intelligence-suite": "description",
  "predictive-maintenance-ai": "precision_manufacturing",
  "enterprise-content-studio": "auto_awesome",
  "whatsapp-ai-reach": "chat",
  "agentic-ai-platform": "smart_toy",
};

/** Material Symbol per industry, matching the product-logo style. */
const industryIcon: Record<string, string> = {
  Agencies: "ads_click",
  Banking: "account_balance",
  CPG: "inventory_2",
  "Customer service": "headset_mic",
  "E-commerce": "shopping_cart",
  Energy: "oil_barrel",
  "Financial services": "payments",
  "Fleet & logistics": "local_shipping",
  Healthcare: "medical_services",
  HR: "groups",
  Insurance: "shield",
  "IT operations": "handyman",
  Legal: "gavel",
  Logistics: "local_shipping",
  Manufacturing: "factory",
  Marketing: "campaign",
  Media: "newspaper",
  "Real estate": "apartment",
  Retail: "storefront",
  SaaS: "cloud",
  Sales: "trending_up",
  Utilities: "bolt",
};

/** How every ViramTech product goes from data to production. */
const buildSteps = [
  {
    title: "Connect",
    body: "We plug into the data and systems you already run — your cloud, your stack, no rip-and-replace.",
  },
  {
    title: "Build",
    body: "We build and tune the models on your own data, in your own environment, until they clear the bar your team sets.",
  },
  {
    title: "Deliver",
    body: "It ships to production owned end to end — wired to the metrics leadership already tracks, and monitored as it runs.",
  },
];

/** Playfair italic accent — matches the for-startups / contact type system. */
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-[family-name:var(--font-playfair)] font-normal italic text-brand-royal dark:text-brand-sky">
      {children}
    </span>
  );
}

/**
 * Branded hero "instrument" — a technical dial that frames the product icon,
 * echoing the LaunchLine Company-OS language. Generated SVG, not a glass card.
 */
function InstrumentPanel({ symbol, fallback }: { symbol?: string; fallback: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      {/* aura */}
      <div className="absolute inset-[16%] rounded-full bg-brand-sky/25 blur-3xl" />
      {/* rotating dashed orbit (HTML element — safe transform-origin) */}
      <div className="animate-spin-slow absolute inset-[3%] rounded-full border border-dashed border-white/15" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-white/20">
        {/* tick ring */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const r1 = 44;
          const r2 = i % 5 === 0 ? 40 : 42;
          return (
            <line
              key={i}
              x1={50 + Math.cos(a) * r1}
              y1={50 + Math.sin(a) * r1}
              x2={50 + Math.cos(a) * r2}
              y2={50 + Math.sin(a) * r2}
              stroke="currentColor"
              strokeWidth="0.4"
            />
          );
        })}
        {/* concentric rings */}
        <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* active arc in brand sky */}
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="#33a5db"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="118 214"
          transform="rotate(-90 50 50)"
        />
        {/* crosshair */}
        <line x1="6" y1="50" x2="16" y2="50" stroke="currentColor" strokeWidth="0.4" />
        <line x1="84" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="0.4" />
      </svg>
      {/* core + icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-[42%] w-[42%] items-center justify-center rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-sm">
          {symbol ? (
            <span
              className="material-symbols-outlined text-5xl text-brand-sky"
              style={{ fontVariationSettings: "'wght' 250" }}
            >
              {symbol}
            </span>
          ) : (
            <span className="text-5xl">{fallback}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const product = products[index];
  const symbol = heroIcon[slug];

  return (
    <div>
      {/* ── Hero (full-bleed, drenched navy) ── */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="bg-grid-white pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-brand-sky/15 blur-[130px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-brand-royal/25 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 sm:pt-40">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.2em] text-brand-sky transition hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Solutions
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.28em] text-brand-sky/80">
                AI Product
              </p>
              <h1 className="mt-4 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
                {product.name}
              </h1>
              <p className="mt-4 text-2xl leading-tight sm:text-3xl">
                <Accent>{product.kicker}.</Accent>
              </p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
                {product.summary}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-gradient-to-r from-brand-royal to-brand-sky px-8 py-3.5 text-center font-semibold text-white shadow-[0_10px_40px_-8px_rgba(51,165,219,0.6)] transition hover:-translate-y-0.5"
                >
                  Talk to us
                </Link>
                <SmoothScrollLink
                  targetId="how"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
                >
                  See how it works
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </SmoothScrollLink>
              </div>
            </div>

            <InstrumentPanel symbol={symbol} fallback={product.icon} />
          </div>

          {/* inline metric proof strip */}
          {product.metrics && (
            <div className="mt-16 flex flex-wrap items-end gap-x-14 gap-y-8 border-t border-white/12 pt-10">
              {product.metrics.map((m) => (
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
          )}
        </div>
      </section>

      {/* ── How it works (Connect · Build · Deliver) ── */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
          From your data to a system that <Accent>runs itself</Accent>.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-on-surface-variant">
          Three steps, one team — no handoffs at the seams.
        </p>
        <div className="relative mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          <div className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-brand-royal/50 via-outline-variant/40 to-brand-sky/50 md:block" />
          {buildSteps.map((s, i) => (
            <div key={s.title} className="relative">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/40 bg-surface-container-lowest font-[family-name:var(--font-jetbrains)] text-sm font-bold text-primary shadow-sm dark:text-primary-fixed">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-lg font-bold tracking-tight text-on-surface">
                {s.title}
              </h3>
              <p className="mt-2 max-w-xs leading-relaxed text-on-surface-variant">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Capabilities (editorial spec list, not cards) ── */}
      <section className="border-t border-outline-variant/20 bg-surface-container-low/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
                Everything it does <Accent>out of the box</Accent>.
              </h2>
              <p className="mt-4 max-w-sm text-lg text-on-surface-variant">
                What {product.name} ships with on day one — no add-ons, no phase two.
              </p>
            </div>
            <ul>
              {product.features.map((f, i) => (
                <li
                  key={f}
                  className={`flex items-baseline gap-5 border-t border-outline-variant/25 py-6 ${
                    i === 0 ? "lg:border-t-0 lg:pt-0" : ""
                  }`}
                >
                  <span className="mt-1 text-lg font-bold text-primary dark:text-primary-fixed">
                    +
                  </span>
                  <span className="text-xl leading-snug text-on-surface sm:text-2xl">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Use cases (ruled two-column list) ── */}
      {product.useCaseList && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
            How teams put {product.name} to <Accent>work</Accent>.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-on-surface-variant">
            The AI, mapped to the outcomes you already care about.
          </p>
          <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {product.useCaseList.map((u) => (
              <div key={u.title} className="border-t border-outline-variant/25 pt-6">
                <h3 className="text-xl font-bold tracking-tight text-on-surface">
                  {u.title}
                </h3>
                <p className="mt-3 leading-relaxed text-on-surface-variant">
                  {u.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Industry solutions (ruled list with quiet icons) ── */}
      {product.industries && (
        <section className="border-t border-outline-variant/20">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
              Tuned to your <Accent>sector</Accent>.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-on-surface-variant">
              The same product, shaped to the realities of your industry.
            </p>
            <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
              {product.industries.map((ind) => (
                <div
                  key={ind.name}
                  className="flex gap-5 border-t border-outline-variant/25 pt-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                    {industryIcon[ind.name] ? (
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ fontVariationSettings: "'wght' 300" }}
                      >
                        {industryIcon[ind.name]}
                      </span>
                    ) : (
                      <span className="text-xl">{ind.icon}</span>
                    )}
                  </span>
                  <div>
                    <h3 className="font-bold tracking-tight text-on-surface">
                      {ind.name}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-on-surface-variant">
                      {ind.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-brand-navy p-12 text-center text-white md:p-20">
          <div className="bg-grid-white absolute inset-0 opacity-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-brand-sky/20 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 translate-y-1/3 rounded-full bg-brand-royal/25 blur-[110px]" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Put {product.name} to <Accent>work</Accent>.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Tell us your goals and we&apos;ll ship a pilot in weeks — measured
              against the outcomes your leadership already tracks.
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
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── More products ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.2em] text-outline">
          Explore more AI products
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products
            .filter((p) => p.slug !== slug)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                  {heroIcon[p.slug] ? (
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'wght' 300" }}
                    >
                      {heroIcon[p.slug]}
                    </span>
                  ) : (
                    <span className="text-xl">{p.icon}</span>
                  )}
                </span>
                <div className="min-w-0">
                  <span className="block font-bold tracking-tight text-on-surface transition-colors group-hover:text-primary dark:group-hover:text-primary-fixed">
                    {p.name}
                  </span>
                  <span className="block truncate text-sm text-on-surface-variant">
                    {p.kicker}
                  </span>
                </div>
                <span className="material-symbols-outlined ml-auto text-outline transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </Link>
            ))}
        </div>
      </section>

      <RelatedArticles />
    </div>
  );
}
