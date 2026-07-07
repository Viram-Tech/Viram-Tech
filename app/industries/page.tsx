import Link from "next/link";
import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import { sectors } from "@/lib/content";
import { sectorIcons } from "@/components/sectorIcons";
import { RelatedArticles } from "@/components/RelatedArticles";

export const metadata = {
  title: "Industries — ViramTech",
  description:
    "Enterprise AI tuned for retail, logistics, banking, healthcare, manufacturing and insurance.",
};

export default function Industries() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-32">
        <p className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.28em] text-primary dark:text-primary-fixed">
          Industries
        </p>
        <h1 className="mt-4 max-w-2xl text-pretty text-4xl font-extrabold tracking-tight sm:text-5xl">
          AI tuned to your{" "}
          <span className="font-[family-name:var(--font-playfair)] font-normal italic text-brand-royal dark:text-brand-sky">
            sector
          </span>
          .
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-surface-variant">
          We bring deep domain knowledge to the verticals that run on data — and
          map the right AI to each one. Pick yours.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {sectors.map((s) => {
            const Icon = sectorIcons[s.slug];
            return (
              <Link
                key={s.slug}
                href={`/industries/${s.slug}`}
                className="group relative flex aspect-[16/11] flex-col justify-end overflow-hidden rounded-3xl"
              >
                <Image
                  src={`/industries/${s.slug}.jpg`}
                  alt={`${s.name} — ${s.short.toLowerCase()} operations`}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/45 to-brand-navy/5" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-25 mix-blend-multiply`}
                />

                <div className="relative p-7 text-white sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                      {Icon && <Icon size={20} />}
                    </span>
                    <h2 className="text-2xl font-extrabold tracking-tight">
                      {s.name}
                    </h2>
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                    {s.points.join(" · ")}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Explore {s.short}
                    <LuArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <RelatedArticles />
    </>
  );
}
