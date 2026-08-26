import Link from "next/link";
import Image from "next/image";
import { CollectiveHero } from "@/components/CollectiveHero";
import { Terminal } from "@/components/Terminal";
import {
  LuShoppingBag,
  LuTruck,
  LuLandmark,
  LuStethoscope,
  LuFactory,
  LuShieldCheck,
} from "react-icons/lu";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ClientLogos } from "@/components/ClientLogos";
import { RelatedArticles } from "@/components/RelatedArticles";
import { sectors } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

// Industry icons, in the same order as `sectors` in lib/content.
const sectorIcons = [
  LuShoppingBag,
  LuTruck,
  LuLandmark,
  LuStethoscope,
  LuFactory,
  LuShieldCheck,
];

export const metadata = buildMetadata({
  title: "ViramTech — Enterprise AI, built to ship",
  description: "We build, deploy and scale AI systems that reach production — owned end to end and measured on the outcomes leadership already tracks.",
  path: "/",
});

export default function Home() {
  return (
    <div className="relative">
      <CollectiveHero />

      {/* Content rises over the pinned hero with a rounded reveal */}
      <div className="relative z-10 -mt-[6vh] rounded-t-[2.5rem] bg-background shadow-[0_-24px_60px_rgba(0,0,0,0.25)]">
        {/* Trusted-by client strip — quiet credibility band before the bento */}
        <ClientLogos />

        {/* Platform bento — coding window + capability cards */}
        <section className="mx-auto max-w-[1500px] px-gutter pt-20 pb-section-padding-mobile md:pb-section-padding-desktop">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Big left card with the coding window */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-brand-navy p-8 sm:p-10 lg:col-span-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-royal/20 text-brand-sky">
                <span className="material-symbols-outlined">hub</span>
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Centralized Neural Architecture
              </h3>
              <p className="mt-3 max-w-lg text-body-lg leading-relaxed text-white/60">
                Deploy proprietary LLMs securely within your VPC. Maintain
                complete control over your training data while leveraging
                state-of-the-art reasoning capabilities.
              </p>
              <div className="my-8 flex-1">
                <Terminal />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-metadata-label text-metadata-label uppercase text-white/45">
                    Data Sovereignty
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-lg font-bold text-brand-sky">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                    100% Secure
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-metadata-label text-metadata-label uppercase text-white/45">
                    Latency
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-lg font-bold text-brand-sky">
                    <span className="material-symbols-outlined text-[20px]">
                      timer
                    </span>
                    &lt; 50ms
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — two stacked cards */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-white/10 bg-brand-navy p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-royal/20 text-brand-sky">
                  <span className="material-symbols-outlined">device_hub</span>
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
                  Seamless Integration
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Pre-built connectors for major ERPs and CRMs.
                </p>
                <div className="mt-6 flex h-28 items-center justify-center gap-5 rounded-xl bg-gradient-to-br from-brand-royal/20 to-brand-sky/10">
                  <span className="material-symbols-outlined text-3xl text-brand-sky/70">
                    hub
                  </span>
                  <span className="material-symbols-outlined text-3xl text-brand-sky/70">
                    lan
                  </span>
                  <span className="material-symbols-outlined text-3xl text-brand-sky/70">
                    cloud_sync
                  </span>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-brand-navy p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-royal/20 text-brand-sky">
                  <span className="material-symbols-outlined">query_stats</span>
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
                  Predictive Analytics
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Anticipate market shifts with real-time modeling.
                </p>
                <div className="mt-6 flex h-28 items-end gap-3">
                  {[40, 65, 52, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-brand-royal to-brand-sky"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features bento (globe lives here) */}
        <FeaturesSection />

        {/* Global Intelligence, Localized Impact */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low relative z-10">
          <div className="max-w-[1280px] mx-auto px-gutter">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
                Global Intelligence,{" "}
                <span className="font-accent-italic text-accent-italic text-primary italic">
                  Localized
                </span>{" "}
                Impact
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Empowering organizations across continents with localized AI
                models that understand regional nuances while maintaining global
                standards.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-surface border border-outline-variant/30 p-8 rounded-2xl shadow-[0px_10px_30px_rgba(20,40,78,0.04)] hover:shadow-[0px_10px_30px_rgba(20,40,78,0.08)] transition-all duration-300">
                  <p className="font-metadata-label text-metadata-label text-primary uppercase mb-2">
                    Scale
                  </p>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    10+ Businesses Served
                  </h3>
                  <p className="text-on-surface-variant mt-2">
                    Working with startups and enterprises across India.
                  </p>
                </div>
                <div className="bg-surface border border-outline-variant/30 p-8 rounded-2xl shadow-[0px_10px_30px_rgba(20,40,78,0.04)] hover:shadow-[0px_10px_30px_rgba(20,40,78,0.08)] transition-all duration-300">
                  <p className="font-metadata-label text-metadata-label text-secondary uppercase mb-2">
                    Reliability
                  </p>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    24/7 Neural Monitoring
                  </h3>
                  <p className="text-on-surface-variant mt-2">
                    Continuous performance optimization and threat detection.
                  </p>
                </div>
                <div className="bg-surface border border-outline-variant/30 p-8 rounded-2xl shadow-[0px_10px_30px_rgba(20,40,78,0.04)] hover:shadow-[0px_10px_30px_rgba(20,40,78,0.08)] transition-all duration-300">
                  <p className="font-metadata-label text-metadata-label text-tertiary uppercase mb-2">
                    Speed
                  </p>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Weeks, not months
                  </h3>
                  <p className="text-on-surface-variant mt-2">
                    From first workshop to a working pilot in production.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-full h-full border border-primary/20 rounded-full absolute animate-float"></div>
                  <div
                    className="w-3/4 h-3/4 border border-secondary/20 rounded-full absolute animate-float"
                    style={{ animationDelay: "-2s" }}
                  ></div>
                  <div
                    className="w-1/2 h-1/2 border border-tertiary/20 rounded-full absolute animate-float"
                    style={{ animationDelay: "-4s" }}
                  ></div>
                  <div className="grid grid-cols-4 gap-4 opacity-40">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      language
                    </span>
                    <span className="material-symbols-outlined text-secondary text-4xl">
                      hub
                    </span>
                    <span className="material-symbols-outlined text-tertiary text-4xl">
                      public
                    </span>
                    <span className="material-symbols-outlined text-primary text-4xl">
                      cloud_sync
                    </span>
                    <span className="material-symbols-outlined text-secondary text-4xl">
                      router
                    </span>
                    <span className="material-symbols-outlined text-tertiary text-4xl">
                      satellite_alt
                    </span>
                    <span className="material-symbols-outlined text-primary text-4xl">
                      lan
                    </span>
                    <span className="material-symbols-outlined text-secondary text-4xl">
                      cell_tower
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry-focused showcase — sticky scroll reveal */}
        <section className="bg-[#e8f0fb] py-section-padding-mobile md:py-section-padding-desktop dark:bg-white/[0.03]">
          <div className="mx-auto max-w-[1500px] px-gutter">
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
              Industry-focused strategy to reach your goals
            </h2>

            <div className="mt-12">
              {sectors.map((s, i) => {
                const Icon = sectorIcons[i % sectorIcons.length];
                return (
                <div key={s.slug} className="sticky top-24 pb-28">
                <div
                  className="grid min-h-[58vh] overflow-hidden rounded-3xl border border-black/5 bg-surface-container-lowest shadow-2xl md:grid-cols-2 dark:border-white/10"
                >
                  {/* Text half */}
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <h3 className="text-3xl font-extrabold tracking-tight text-on-surface sm:text-4xl">
                      {s.name}
                    </h3>
                    <p className="mt-4 text-lg font-semibold text-on-surface">
                      {s.tagline}
                    </p>
                    <p className="mt-3 leading-relaxed text-on-surface-variant">
                      {s.overview}
                    </p>
                    <Link
                      href={`/industries/${s.slug}`}
                      className="mt-7 inline-block self-start rounded-full bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500"
                    >
                      Know More
                    </Link>
                  </div>

                  {/* Visual half */}
                  <div className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden p-10 text-center">
                    <Image
                      src={`/industries/${s.slug}.jpg`}
                      alt={s.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    {/* Brand tint + contrast scrim keeps the label legible over any photo */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-55`}
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <Icon
                      className="relative text-white drop-shadow"
                      size={72}
                      strokeWidth={1.5}
                    />
                    <span className="relative mt-6 text-2xl font-bold text-white drop-shadow sm:text-3xl">
                      {s.name}
                    </span>
                  </div>
                </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Insights — latest blog posts (same band as the technology page) */}
        <RelatedArticles />
      </div>
    </div>
  );
}
