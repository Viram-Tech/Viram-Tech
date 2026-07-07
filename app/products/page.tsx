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

/** What every product in the suite shares — value blocks with proof points. */
const valueBlocks = [
  {
    icon: "lock",
    title: "Owned end to end",
    points: [
      "Your data, models and infrastructure stay yours",
      "Deployed inside your cloud — no lock-in",
      "One team from first pilot to production",
    ],
  },
  {
    icon: "bolt",
    title: "In production, in weeks",
    points: [
      "A working pilot in weeks, not quarters",
      "Fixed scope — no open-ended research",
      "Architecture that scales to the enterprise",
    ],
  },
  {
    icon: "insights",
    title: "Measured on outcomes",
    points: [
      "Tied to the metrics leadership already tracks",
      "Monitored continuously as it runs",
      "Proven against a baseline you set",
    ],
  },
];

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
        Solutions built to reach{" "}
        <span className="font-[family-name:var(--font-playfair)] font-normal italic text-brand-royal dark:text-brand-sky">
          production
        </span>
        .
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
            className="group flex flex-col rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
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

      {/* ── What every product shares (Decodable-style value blocks) ── */}
      <div className="mt-24">
        <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight sm:text-3xl">
          Enterprise AI, without the hassle.
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed opacity-70">
          Whatever you build with us, the fundamentals are the same.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {valueBlocks.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  {b.icon}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-on-surface">
                {b.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {b.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex gap-2.5 text-sm leading-relaxed text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-primary dark:text-primary-fixed">
                      check
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
      <RelatedArticles />
    </>
  );
}
