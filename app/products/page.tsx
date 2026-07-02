import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/lib/content";
import { RelatedArticles } from "@/components/RelatedArticles";

export const metadata: Metadata = {
  title: "AI Products — ViramTech",
  description:
    "The ViramTech suite of enterprise AI products — from data intelligence to autonomous agents.",
};

/** Material Symbol per product (mirrors the product detail pages). */
const heroIcon: Record<string, string> = {
  dataforge: "forum",
  "predictive-demand-intelligence": "trending_up",
  "document-intelligence-suite": "description",
  "predictive-maintenance-ai": "precision_manufacturing",
  "enterprise-content-studio": "auto_awesome",
  "whatsapp-ai-reach": "chat",
  "agentic-ai-platform": "smart_toy",
};

export default function ProductsIndex() {
  return (
    <>
    <section className="mx-auto max-w-5xl px-6 pb-28 pt-32">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium opacity-55">
        <Link href="/" className="transition hover:opacity-100">
          Home
        </Link>
        <span aria-hidden>/</span>
        <span className="text-[#3F56A4] dark:text-[#7d97ef]">Solutions</span>
      </nav>

      <span className="mt-6 block font-metadata-label text-metadata-label uppercase text-primary dark:text-primary-fixed">
        AI Products
      </span>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        Solutions built to reach production
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed opacity-70">
        A suite of enterprise AI products — each one owned end to end, measured
        against the outcomes your leadership already tracks.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group flex flex-col rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed">
                {heroIcon[p.slug] ? (
                  <span
                    className="material-symbols-outlined text-2xl text-primary"
                    style={{ fontVariationSettings: "'wght' 300" }}
                  >
                    {heroIcon[p.slug]}
                  </span>
                ) : (
                  <span className="text-2xl">{p.icon}</span>
                )}
              </span>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-on-surface transition-colors group-hover:text-primary dark:group-hover:text-primary-fixed">
                  {p.name}
                </h2>
                <p className="text-sm opacity-55">{p.kicker}</p>
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed opacity-70">
              {p.summary}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary dark:text-primary-fixed">
              Explore
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
      <RelatedArticles />
    </>
  );
}
