import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { Eyebrow } from "@/components/ui";
import { InfrastructureDeepDive } from "@/components/InfrastructureDeepDive";
import { RelatedArticles } from "@/components/RelatedArticles";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Infrastructure",
  description: "The backbone that keeps every solution running — portable, automated and secure enough for real production load.",
  path: "/technology/infrastructure",
});

export default function Infrastructure() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([["Technology", "/technology"], ["Infrastructure", "/technology/infrastructure"]]))} />
    <section className="mx-auto max-w-5xl px-6 pt-32">
      <Link
        href="/technology"
        className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline"
      >
        ← Technology
      </Link>
      <Eyebrow>Technology · Infrastructure</Eyebrow>
    </section>

    <section className="mx-auto max-w-6xl px-6 pb-28">
      <InfrastructureDeepDive className="mt-10" />

      {/* Continue → technical architecture */}
      <Link
        href="/technology/architecture"
        className="group relative mt-20 flex items-center justify-between gap-6 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-10 text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25"
      >
        <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
        <div className="relative">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Next · The tooling layer
          </span>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            AI frameworks &amp; technical architecture
          </h2>
          <p className="mt-2 max-w-xl text-white/80">
            See how it all comes together — the frameworks that orchestrate your
            models and the layered stack that runs them in production.
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
