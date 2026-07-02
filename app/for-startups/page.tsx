import Link from "next/link";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "ViramTech for Startups — ViramTech",
  description:
    "Enterprise-grade AI, built at startup speed. Production-grade systems in weeks, priced for your stage, with no lock-in as you scale.",
};

const pillars = [
  {
    icon: "rocket_launch",
    title: "Ship in weeks",
    body: "A working pilot in production in weeks, not quarters — so you can show traction, not slides.",
  },
  {
    icon: "lock",
    title: "Own your stack",
    body: "Your data and models stay yours, deployed in your cloud. No lock-in as you grow.",
  },
  {
    icon: "payments",
    title: "Priced for your stage",
    body: "Fixed-scope pilots and flexible engagements sized to an early-stage budget.",
  },
  {
    icon: "trending_up",
    title: "Ready to scale",
    body: "The same architecture that runs your pilot scales to Series B and beyond — no rewrite.",
  },
];

const useCases = [
  {
    title: "AI features in your product",
    body: "Natural-language search, copilots, recommendations and agents your users actually feel.",
  },
  {
    title: "Automate the busywork",
    body: "Document processing, support triage and back-office workflows that free up your small team.",
  },
  {
    title: "Turn data into decisions",
    body: "Forecasting, analytics and insight layers built on the data you already collect.",
  },
];

export default function ForStartups() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-28 pt-32">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-semibold text-indigo-500 hover:underline"
      >
        ← Home
      </Link>
      <Eyebrow>ViramTech · For Startups</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        Enterprise-grade AI, at{" "}
        <span className="font-serif font-normal italic text-indigo-500">
          startup
        </span>{" "}
        speed.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-70">
        You move fast and can&apos;t afford AI that stalls in a pilot. We ship
        production-grade systems in weeks, own the whole stack, and price it for
        where you are — so you get an unfair advantage, not a research project.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500"
        >
          Talk to us
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-black/10 px-7 py-3 font-semibold opacity-80 transition hover:opacity-100 dark:border-white/15"
        >
          See the products
        </Link>
      </div>

      {/* Why startups work with us */}
      <h2 className="mt-20 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Built for how startups actually work
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-black/5 bg-black/[0.02] p-6 transition hover:border-indigo-500/30 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
              <span className="material-symbols-outlined">{p.icon}</span>
            </span>
            <h3 className="mt-4 text-lg font-bold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">{p.body}</p>
          </div>
        ))}
      </div>

      {/* What you can build */}
      <h2 className="mt-20 text-2xl font-extrabold tracking-tight sm:text-3xl">
        What you can build
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {useCases.map((u, i) => (
          <div
            key={u.title}
            className="rounded-2xl border border-black/5 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="font-mono text-xs font-semibold text-indigo-500/70">
              0{i + 1}
            </div>
            <h3 className="mt-2 text-base font-bold tracking-tight">
              {u.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed opacity-70">{u.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-14 text-center text-white">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          Building something? Let&apos;s talk.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-white/80">
          Tell us what you&apos;re building — we&apos;ll map the highest-ROI
          place to start and ship a pilot in weeks.
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-block rounded-full bg-white px-7 py-3 font-semibold text-indigo-600 transition hover:bg-white/90"
        >
          Talk to us
        </Link>
      </div>
    </section>
  );
}
