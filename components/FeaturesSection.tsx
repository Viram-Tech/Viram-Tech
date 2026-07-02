import { Globe } from "@/components/Globe";

function FeatureCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden p-8 sm:p-12 ${className}`}>
      {children}
    </div>
  );
}

function FeatureTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-bold tracking-tight text-white">{children}</h3>
  );
}

function FeatureDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
      {children}
    </p>
  );
}

const capabilities = [
  "NLP",
  "Computer Vision",
  "Forecasting",
  "Agents",
  "LLMs",
  "Vector DBs",
];
// Publicly reported figures (widely cited industry studies).
const marketStats = [
  {
    value: "72%",
    label: "of organizations use AI in at least one business function",
    source: "McKinsey, 2024",
  },
  {
    value: "36.6%",
    label: "projected AI market CAGR, 2024–2030",
    source: "Grand View Research",
  },
  {
    value: "$1.81T",
    label: "projected global AI market size by 2030",
    source: "Grand View Research",
  },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-[1500px] px-gutter py-section-padding-mobile md:py-section-padding-desktop">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="font-metadata-label text-metadata-label uppercase text-brand-sky">
          Why ViramTech
        </span>
        <h2 className="mt-4 text-headline-md font-extrabold tracking-tight text-on-surface">
          Everything you need to ship AI
        </h2>
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-brand-navy lg:grid-cols-6">
        {/* Own the whole stack */}
        <FeatureCard className="col-span-1 min-h-[320px] border-b border-white/10 lg:col-span-4 lg:border-r">
          <FeatureTitle>Own the whole AI stack</FeatureTitle>
          <FeatureDescription>
            Models, infrastructure and orchestration under one roof — from
            notebook to production, no hand-offs.
          </FeatureDescription>
          <div className="mt-6 flex flex-wrap gap-2">
            {capabilities.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70"
              >
                {c}
              </span>
            ))}
          </div>
        </FeatureCard>

        {/* Economic upside */}
        <FeatureCard className="col-span-1 border-b border-white/10 lg:col-span-2">
          <FeatureTitle>A once-in-a-generation shift</FeatureTitle>
          <FeatureDescription>
            The economic upside of enterprise AI is already quantified.
          </FeatureDescription>
          <div className="mt-6">
            <div className="gradient-text text-5xl font-extrabold">$15.7T</div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              AI&apos;s projected boost to the global economy by 2030.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/35">
              Source · PwC
            </p>
          </div>
        </FeatureCard>

        {/* Market momentum — sourced stats */}
        <FeatureCard className="col-span-1 border-b border-white/10 lg:col-span-3 lg:border-b-0 lg:border-r">
          <FeatureTitle>The window is open now</FeatureTitle>
          <FeatureDescription>
            Adoption and market growth are accelerating — and it&apos;s all in
            the public record.
          </FeatureDescription>
          <div className="mt-8 space-y-5">
            {marketStats.map((s) => (
              <div
                key={s.value}
                className="flex items-baseline gap-5 border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
              >
                <span className="gradient-text w-24 shrink-0 text-2xl font-extrabold">
                  {s.value}
                </span>
                <div>
                  <p className="text-sm leading-snug text-white/75">{s.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-white/35">
                    {s.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FeatureCard>

        {/* Global footprint — existing Globe, large + cropped in the corner */}
        <FeatureCard className="col-span-1 min-h-[560px] lg:col-span-3">
          <div className="relative z-10">
            <FeatureTitle>Built for a global footprint</FeatureTitle>
            <FeatureDescription>
              Deploy across regions and clouds — wherever your operation runs.
            </FeatureDescription>
          </div>
          <div className="pointer-events-none absolute bottom-0 right-0 w-[360px] translate-x-[22%] translate-y-[30%] sm:w-[560px]">
            <Globe />
          </div>
        </FeatureCard>
      </div>
    </section>
  );
}

export default FeaturesSection;
