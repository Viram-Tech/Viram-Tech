import Link from "next/link";
import { Eyebrow } from "@/components/ui";
import { FrameworksDeepDive } from "@/components/FrameworksDeepDive";
import { WhyViableGrid } from "@/components/WhyViableGrid";
import { RelatedArticles } from "@/components/RelatedArticles";

export const metadata = {
  title: "Technical Architecture — ViramTech",
  description: "A layered approach to enterprise AI delivery.",
};

export default function Architecture() {
  return (
    <>
    <section className="mx-auto max-w-5xl px-6 pb-28 pt-32">
      <Link
        href="/technology"
        className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline"
      >
        ← Technology
      </Link>
      <Eyebrow>Technology · AI Frameworks</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        Frameworks that tie it all together.
      </h1>
      <p className="mt-5 max-w-xl text-lg opacity-70">
        The tooling layer — orchestration, model integration and fine-tuning —
        that turns raw models into production solutions that speak your business.
      </p>

      {/* AI Frameworks — half-page deep dives (heading handled by the page hero) */}
      <FrameworksDeepDive showHeading={false} />

      {/* Why this architecture is viable */}
      <h2 className="mt-24 text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
        Why this architecture is viable
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-lg opacity-70">
        Every layer has one job and a clean contract with the next — which is
        exactly what lets this hold up at enterprise scale.
      </p>
      <WhyViableGrid />

      {/* CTA */}
      <div className="mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-14 text-center text-white">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          See the architecture in action
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Discover how our stack can power your enterprise AI transformation —
          securely and efficiently.
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-block rounded-full bg-white px-7 py-3 font-semibold text-indigo-600 transition hover:bg-white/90"
        >
          Book a consultation
        </Link>
      </div>
    </section>
      <RelatedArticles />
    </>
  );
}
