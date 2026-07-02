import Link from "next/link";
import type { Metadata } from "next";
import { CollectiveHero } from "@/components/CollectiveHero";
import { Terminal } from "@/components/Terminal";
import { FeaturesSection } from "@/components/FeaturesSection";

export const metadata: Metadata = {
  title: "ViramTech — Enterprise AI, built to ship",
  description:
    "We build, deploy and scale AI systems that reach production — owned end to end and measured on the outcomes leadership already tracks.",
};

export default function Home() {
  return (
    <div className="relative">
      <CollectiveHero />

      {/* Content rises over the pinned hero with a rounded reveal */}
      <div className="relative z-10 -mt-[6vh] rounded-t-[2.5rem] bg-background shadow-[0_-24px_60px_rgba(0,0,0,0.25)]">
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

        {/* Smooth transition → Our vision */}
        <div className="mx-auto max-w-[1200px] bg-background px-gutter py-16 md:py-20">
          <Link
            href="/about/vision"
            className="group flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-slate to-brand-royal px-8 py-10 text-white shadow-2xl transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-15px_rgba(20,40,78,0.6)] md:px-12">
            <div>
              <span className="font-metadata-label text-metadata-label uppercase text-white/60">
                Up next · Who we are
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Discover our vision
              </h2>
              <p className="mt-2 max-w-md text-white/75">
                The name <em className="font-serif not-italic">Viram</em> means a
                pause — a deliberate moment to think before building.
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-2">
              <span className="material-symbols-outlined text-[26px]">
                arrow_forward
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
