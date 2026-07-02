import Link from "next/link";
import { LuTelescope, LuTarget } from "react-icons/lu";
import { Eyebrow } from "@/components/ui";
import { visionMission, visionTimeline } from "@/lib/content";
import { TextGenerateEffect } from "@/components/TextGenerateEffect";
import { NextPage } from "@/components/NextPage";

export const metadata = {
  title: "Our Vision — ViramTech",
  description: "AI-native, enterprise-ready, results-driven by design.",
};

export default function Vision() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-28 pt-32">
      <Link href="/" className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline">
        ← Home
      </Link>
      <Eyebrow>About · Our vision</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        AI that&apos;s built{" "}
        <span className="font-serif font-normal italic text-indigo-500">for</span>{" "}
        the enterprise.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-70">
        The name <em>Viram</em> means a pause — a deliberate moment to think
        before building. ViramTech pairs that discipline with AI-native
        engineering to ship solutions that are secure, scalable, and measured by
        ROI, not hype.
      </p>

      {/* Company background */}
      <div className="mt-12 grid gap-8 rounded-3xl border border-black/5 bg-black/[0.02] p-8 sm:p-10 md:grid-cols-[1.5fr_1fr] dark:border-white/10 dark:bg-white/[0.03]">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-500">
            Who we are
          </h2>
          <p className="mt-4 text-lg leading-relaxed opacity-80">
            Founded and led by{" "}
            <strong className="font-semibold opacity-100">
              Yash Sanjay Shah
            </strong>
            , ViramTech was established in 2025 as a Mumbai-based technology
            services company dedicated to empowering businesses through
            innovative solutions.
          </p>
          <p className="mt-4 leading-relaxed opacity-70">
            Our professional services are designed to foster growth and success
            for your business within the current competitive landscape —
            combining technical expertise with business acumen to deliver
            solutions that drive real results.
          </p>
        </div>
        <div className="grid content-center gap-5 sm:border-l sm:border-black/5 sm:pl-8 dark:sm:border-white/10">
          {[
            { label: "Founded", value: "2025" },
            { label: "Headquarters", value: "Mumbai, India" },
            { label: "Founder & CEO", value: "Yash Sanjay Shah" },
          ].map((f) => (
            <div key={f.label}>
              <div className="text-xs font-bold uppercase tracking-wide opacity-50">
                {f.label}
              </div>
              <div className="mt-0.5 text-lg font-bold tracking-tight">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vision & Mission statements */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-black/5 bg-black/[0.02] p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <LuTelescope size={24} />
          </span>
          <h2 className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-indigo-500">
            Our vision
          </h2>
          <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">
            {visionMission.vision}
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-black/[0.02] p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
            <LuTarget size={24} />
          </span>
          <h2 className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-indigo-500">
            Our mission
          </h2>
          <p className="mt-3 text-xl font-semibold leading-snug tracking-tight">
            {visionMission.mission}
          </p>
        </div>
      </div>

      {/* Mission statement */}
      <blockquote className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2A3E77] to-[#14284E] p-8 text-white sm:p-10">
        <p className="max-w-3xl font-serif text-2xl leading-relaxed sm:text-[28px]">
          &ldquo;Our professional services are designed to foster growth and
          success for your business within the current competitive landscape. We
          believe in building strong, fast, and unstoppable technology solutions
          that empower businesses to reach their full potential.&rdquo;
        </p>
      </blockquote>

      {/* Topic timeline — from problem to principle */}
      <h2 className="mt-24 text-2xl font-extrabold tracking-tight sm:text-3xl">
        From the gap to our principles
      </h2>
      <p className="mt-3 max-w-xl text-lg opacity-70">
        The journey from the problem we saw to the principles that guide
        everything we build.
      </p>
      <div className="mt-14 space-y-16">
        {visionTimeline.map((t) => (
          <div
            key={t.topic}
            className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:gap-12"
          >
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500/70">
                {t.heading}
              </span>
              <h3 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
                {t.topic}
              </h3>
            </div>
            <div>
              <TextGenerateEffect
                words={t.body}
                className="text-xl font-medium leading-relaxed"
              />
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {t.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-black/5 bg-black/[0.02] px-4 py-2 text-sm opacity-75 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <NextPage current="/about/vision" />
    </section>
  );
}
