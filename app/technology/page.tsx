import Link from "next/link";
import { LuBrainCircuit, LuServer, LuBlocks, LuArrowRight } from "react-icons/lu";
import { Eyebrow } from "@/components/ui";
import { foundation } from "@/lib/content";
import { FoundationCardSwap } from "@/components/FoundationCardSwap";
import { CapabilityDeepDive } from "@/components/CapabilityDeepDive";
import { RelatedArticles } from "@/components/RelatedArticles";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Technology",
  description: "The ViramTech AI stack and technical architecture.",
  path: "/technology",
});

const pillarIcons = [LuBrainCircuit, LuServer, LuBlocks];

export default function Technology() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([["Technology", "/technology"]]))} />
    <section className="mx-auto max-w-5xl px-6 pt-32">
      <Eyebrow>Technology</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        An AI stack built to{" "}
        <span className="font-[family-name:var(--font-playfair)] font-normal italic text-brand-royal dark:text-brand-sky">
          scale
        </span>
        .
      </h1>
      <p className="mt-5 max-w-xl text-lg opacity-70">
        From models to multi-cloud infrastructure, we own every layer — so your
        solution is secure, observable and production-grade.
      </p>

      {/* Foundation — interactive card swap */}
      <div className="mt-20 grid items-center gap-x-10 gap-y-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Technology foundation
          </h2>
          <p className="mt-4 max-w-md text-lg opacity-70">
            Three pillars underpin every solution we ship — the models, the
            infrastructure that runs them, and the frameworks that tie it all
            together.
          </p>
          <ul className="mt-7 space-y-3">
            {foundation.map((f) => (
              <li
                key={f.title}
                className="flex items-center gap-3 text-sm font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                {f.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[480px] sm:h-[560px]">
          <FoundationCardSwap />
        </div>
      </div>

      {/* A closer look at each pillar */}
      <h2 className="mt-24 text-2xl font-extrabold tracking-tight sm:text-3xl">
        A closer look at each pillar
      </h2>
      <div className="mt-8 space-y-6">
        {foundation.map((f, i) => {
          const Icon = pillarIcons[i % pillarIcons.length];
          return (
            <div
              key={f.title}
              className="flex flex-col gap-6 rounded-3xl border border-black/5 bg-black/[0.02] p-7 transition hover:border-indigo-500/30 sm:flex-row sm:p-9 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                <Icon size={26} />
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="mt-3 max-w-3xl text-base leading-relaxed opacity-75">
                  {f.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* AI / ML capabilities — wider, un-carded deep dives */}
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <CapabilityDeepDive />

      {/* Infrastructure → dedicated page (blue deep-dive CTA) */}
      <Link
        href="/technology/infrastructure"
        className="group relative mt-24 flex items-center justify-between gap-6 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-10 text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25"
      >
        <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
        <div className="relative">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Deep dive · Infrastructure
          </span>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Infrastructure that scales with you
          </h2>
          <p className="mt-2 max-w-xl text-white/80">
            The backbone that keeps every solution running — portable, automated
            and secure enough for real production load.
          </p>
        </div>
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1.5">
          <LuArrowRight size={22} />
        </span>
      </Link>
    </section>
      <RelatedArticles />
    </>
  );
}
