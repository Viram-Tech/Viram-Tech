import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { Eyebrow } from "@/components/ui";
import { sectors } from "@/lib/content";
import { sectorIcons } from "@/components/sectorIcons";
import { Reveal } from "@/components/Reveal";
import { RelatedArticles } from "@/components/RelatedArticles";

export const metadata = {
  title: "Industries — ViramTech",
  description:
    "Enterprise AI tuned for retail, logistics, banking, healthcare, manufacturing and insurance.",
};

export default function Industries() {
  return (
    <>
    <section className="mx-auto max-w-5xl px-6 pb-28 pt-32">
      <Eyebrow>Industries</Eyebrow>
      <h1 className="mt-3 max-w-2xl text-pretty text-4xl font-extrabold tracking-tight sm:text-5xl">
        AI tuned to your{" "}
        <span className="font-serif font-normal italic text-indigo-500">sector</span>
        .
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-80">
        We bring deep domain knowledge to the verticals that run on data — and map
        the right AI to each one. Pick yours.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {sectors.map((s, i) => {
          const Icon = sectorIcons[s.slug];
          return (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href={`/industries/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-black/5 bg-black/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-white shadow-md`}
                  >
                    {Icon && <Icon size={22} />}
                  </span>
                  <h2 className="text-xl font-extrabold tracking-tight">{s.name}</h2>
                </div>

                <p className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                  {s.tagline}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed opacity-70">
                  {s.overview}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-500">
                  Explore {s.short}
                  <LuArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
      <RelatedArticles />
    </>
  );
}
