import Link from "next/link";
import { notFound } from "next/navigation";
import { products, productCaseStudies } from "@/lib/content";
import { RelatedArticles } from "@/components/RelatedArticles";

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

/** Material Symbol shown in the hero glass tile, per product. */
const heroIcon: Record<string, string> = {
  dataforge: "forum",
  "predictive-demand-intelligence": "trending_up",
  "document-intelligence-suite": "description",
  "predictive-maintenance-ai": "precision_manufacturing",
  "enterprise-content-studio": "auto_awesome",
  "whatsapp-ai-reach": "chat",
  "agentic-ai-platform": "smart_toy",
};

/** Rotating icon set for the use-case columns. */
const useCaseIcons = ["insights", "auto_graph", "hub", "bolt", "target"];

/** Material Symbol per industry / function, matching the product-logo style. */
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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const product = products[index];
  const caseStudy = productCaseStudies[slug];
  const symbol = heroIcon[slug];

  return (
    <div className="pb-section-padding-desktop pt-32">
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-gutter mb-section-padding-desktop">
        <div className="mb-8">
          <Link
            href="/products"
            className="font-metadata-label text-metadata-label inline-flex items-center uppercase text-primary transition-colors hover:text-brand-royal dark:text-primary-fixed"
          >
            <span className="material-symbols-outlined mr-1 text-[16px]">
              arrow_back
            </span>
            Solutions
          </Link>
        </div>

        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="font-metadata-label text-metadata-label mb-4 block uppercase tracking-widest text-primary dark:text-primary-fixed">
              AI Products · {product.name}
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 text-on-surface">
              {product.name}
            </h1>
            <p className="font-accent-italic mb-6 text-[28px] italic leading-tight text-primary dark:text-primary-fixed">
              {product.kicker}.
            </p>
            <p className="font-body-lg text-body-lg mb-8 max-w-lg text-on-surface-variant">
              {product.summary}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-brand-navy px-8 py-3 text-center font-medium text-white shadow-lg transition-colors hover:bg-brand-slate"
              >
                Talk to us
              </Link>
              <a
                href="#impact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-outline-variant/50 px-8 py-3 font-medium text-on-surface transition-colors hover:border-primary hover:text-primary dark:hover:text-primary-fixed"
              >
                See the impact
                <span className="material-symbols-outlined text-[18px]">
                  arrow_downward
                </span>
              </a>
            </div>
          </div>

          {/* Visual panel */}
          <div className="group relative flex h-[400px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-slate shadow-2xl">
            <div className="bg-grid-white absolute inset-0 opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
            <div className="glass-panel relative z-10 flex h-32 w-32 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-translate-y-2">
              {symbol ? (
                <span
                  className="material-symbols-outlined text-6xl text-white opacity-90"
                  style={{ fontVariationSettings: "'wght' 200" }}
                >
                  {symbol}
                </span>
              ) : (
                <span className="text-6xl">{product.icon}</span>
              )}
            </div>
            {/* Decorative orbs */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-sky opacity-40 mix-blend-screen blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-royal opacity-40 mix-blend-screen blur-[80px]" />
          </div>
        </div>

        {/* Stats rail */}
        {product.metrics && (
          <div
            id="impact"
            className="grid scroll-mt-32 grid-cols-1 divide-y divide-outline-variant/20 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest shadow-glass md:grid-cols-3 md:divide-x md:divide-y-0"
          >
            {product.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col items-center justify-center p-8 text-center transition-colors hover:bg-surface-container-low/50"
              >
                <span className="font-display-lg-mobile text-display-lg-mobile mb-2 font-bold text-primary dark:text-primary-fixed">
                  {m.value}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Key features ── */}
      <section className="max-w-5xl mx-auto px-gutter mb-section-padding-desktop">
        <div className="mb-12">
          <h2 className="font-headline-md text-headline-md mb-4 text-on-surface">
            Key features
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            What {product.name} does out of the box.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {product.features.map((f) => (
            <div
              key={f}
              className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="material-symbols-outlined mb-6 text-3xl text-primary dark:text-primary-fixed">
                task_alt
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {f}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Use cases ── */}
      {product.useCaseList && (
        <section className="max-w-5xl mx-auto px-gutter mb-section-padding-desktop">
          <div className="mb-16">
            <h2 className="font-headline-md text-headline-md mb-4 text-on-surface">
              How teams put {product.name} to work
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The AI we put to work — mapped to the outcomes you care about.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {product.useCaseList.map((u, i) => (
              <div key={u.title} className="group">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy shadow-md transition-transform group-hover:scale-110">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {useCaseIcons[i % useCaseIcons.length]}
                  </span>
                </div>
                <h3 className="font-body-md text-body-md mb-3 font-bold text-on-surface">
                  {u.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {u.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Industry-specific solutions ── */}
      {product.industries && (
        <section className="max-w-5xl mx-auto px-gutter mb-section-padding-desktop">
          <div className="mb-12">
            <h2 className="font-headline-md text-headline-md mb-4 text-on-surface">
              Industry-specific solutions
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Tuned to the realities of your sector.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {product.industries.map((ind) => (
              <div
                key={ind.name}
                className="flex gap-5 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed">
                  {industryIcon[ind.name] ? (
                    <span
                      className="material-symbols-outlined text-2xl text-primary"
                      style={{ fontVariationSettings: "'wght' 300" }}
                    >
                      {industryIcon[ind.name]}
                    </span>
                  ) : (
                    <span className="text-2xl">{ind.icon}</span>
                  )}
                </span>
                <div>
                  <h3 className="font-body-md text-body-md mb-2 font-bold text-on-surface">
                    {ind.name}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {ind.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Case study ── */}
      {caseStudy && (
        <section className="max-w-5xl mx-auto px-gutter mb-section-padding-desktop">
          <div className="mb-12 flex items-center gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Case study
            </h2>
            <span className="font-metadata-label rounded-full border border-outline-variant/30 bg-surface-variant/50 px-3 py-1 text-[10px] uppercase tracking-wider text-primary dark:text-primary-fixed">
              Representative Engagement
            </span>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-outline-variant/30 bg-surface-container-lowest shadow-glass">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Content side */}
              <div className="border-b border-outline-variant/20 p-10 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-16">
                <span className="font-metadata-label text-metadata-label mb-4 block uppercase tracking-widest text-primary dark:text-primary-fixed">
                  {caseStudy.industry}
                </span>
                <h3 className="font-headline-md text-headline-md mb-8 text-on-surface">
                  {caseStudy.client}
                </h3>
                <div className="mb-8">
                  <h4 className="font-metadata-label text-metadata-label mb-2 uppercase tracking-wider text-outline">
                    The challenge
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-metadata-label text-metadata-label mb-2 uppercase tracking-wider text-outline">
                    Our approach
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {caseStudy.approach}
                  </p>
                </div>
              </div>

              {/* Stats side */}
              <div className="flex flex-col justify-center bg-surface/50 p-10 lg:col-span-5 lg:p-16">
                <h4 className="font-metadata-label text-metadata-label mb-8 uppercase tracking-wider text-outline">
                  The results
                </h4>
                <div className="space-y-8">
                  {caseStudy.results.map((r) => (
                    <div key={r.label}>
                      <span className="font-display-lg-mobile text-display-lg-mobile mb-1 block font-bold text-primary dark:text-primary-fixed">
                        {r.value}
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote band */}
            <div className="relative overflow-hidden bg-brand-navy p-10 lg:px-16 lg:py-12">
              <div className="bg-grid-white absolute inset-0 opacity-10" />
              <div className="relative z-10 max-w-3xl">
                <p className="font-accent-italic mb-6 text-[28px] italic leading-snug text-white">
                  &ldquo;{caseStudy.quote}&rdquo;
                </p>
                <p className="font-body-md text-body-md text-white/70">
                  — {caseStudy.attribution}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA band ── */}
      <section className="max-w-5xl mx-auto px-gutter mb-section-padding-desktop">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-navy to-brand-slate p-12 text-center shadow-2xl md:p-20">
          <div className="bg-grid-white absolute inset-0 opacity-10" />
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-sky opacity-20 mix-blend-screen blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-royal opacity-20 mix-blend-screen blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-headline-md text-headline-md mb-4 text-white">
              Put {product.name} to work
            </h2>
            <p className="font-body-md text-body-md mb-10 text-white/80">
              Tell us your goals and we&apos;ll ship a pilot in weeks — measured
              against the outcomes your leadership already tracks.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="w-full rounded-full bg-white px-8 py-3 font-medium text-brand-navy shadow-lg transition-colors hover:bg-surface-container-low sm:w-auto"
              >
                Book a consultation
              </Link>
              <Link
                href="/technology"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Explore the technology
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── More products ── */}
      <section className="max-w-5xl mx-auto px-gutter">
        <h2 className="font-metadata-label text-metadata-label mb-6 uppercase tracking-widest text-outline">
          Explore more AI products
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products
            .filter((p) => p.slug !== slug)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex items-center gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed">
                  {heroIcon[p.slug] ? (
                    <span
                      className="material-symbols-outlined text-xl text-primary"
                      style={{ fontVariationSettings: "'wght' 300" }}
                    >
                      {heroIcon[p.slug]}
                    </span>
                  ) : (
                    <span className="text-lg">{p.icon}</span>
                  )}
                </span>
                <span className="flex-1">
                  <span className="font-body-md text-body-md block font-bold text-on-surface transition-colors group-hover:text-primary dark:group-hover:text-primary-fixed">
                    {p.name}
                  </span>
                  <span className="font-body-md block text-sm text-on-surface-variant">
                    {p.kicker}
                  </span>
                </span>
                <span className="material-symbols-outlined text-outline transition-transform group-hover:translate-x-1 group-hover:text-primary dark:group-hover:text-primary-fixed">
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
