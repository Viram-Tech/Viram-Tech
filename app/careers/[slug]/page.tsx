import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { roles } from "@/lib/careers";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) {
    return buildMetadata({
      title: "Careers",
      description: "Open roles at ViramTech.",
      path: "/careers",
    });
  }
  return buildMetadata({
    title: `${role.title} — Careers`,
    description: role.summary,
    path: `/careers/${role.slug}`,
  });
}

const label =
  "font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.18em] opacity-50";

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) notFound();

  const details = [
    ["Team", role.team],
    ["Location", role.location],
    ["Type", role.type],
  ];

  return (
    <div className="relative overflow-hidden bg-background text-brand-navy dark:text-white">
      <JsonLd
        data={graph(
          breadcrumbSchema([
            ["Careers", "/careers"],
            [role.title, `/careers/${role.slug}`],
          ]),
        )}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-brand-royal/15 blur-[130px] dark:bg-brand-royal/25" />

      <div className="relative careers-container pt-36 pb-28 sm:pt-44">
        <Link
          href="/careers#roles"
          className="text-[15px] font-semibold opacity-60 transition hover:opacity-100"
        >
          ← All roles
        </Link>
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {role.title}
        </h1>

        <div className="mt-14 grid gap-14 border-t border-black/10 pt-12 lg:grid-cols-[2fr_1fr] dark:border-white/10">
          {/* Description */}
          <div className="space-y-12">
            <p className="text-lg leading-relaxed opacity-75">{role.summary}</p>
            <RoleList title="What you'll do" items={role.responsibilities} />
            <RoleList title="What we're looking for" items={role.requirements} />
          </div>

          {/* Sticky details */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <dl className="border-t border-black/10 dark:border-white/10">
              {details.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-black/10 py-4 dark:border-white/10"
                >
                  <dt className={label}>{k}</dt>
                  <dd className="text-[15px] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#apply"
              className="mt-6 block rounded-full bg-gradient-to-r from-brand-royal to-brand-sky px-7 py-3.5 text-center font-semibold text-white shadow-[0_10px_40px_-8px_rgba(51,165,219,0.6)] transition hover:-translate-y-0.5"
            >
              Apply for this role
            </a>
          </aside>
        </div>

        {/* Application */}
        <section
          id="apply"
          className="mt-28 grid scroll-mt-32 gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1fr_2fr] dark:border-white/10"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Apply</h2>
          <ApplicationForm role={role.title} />
        </section>
      </div>
    </div>
  );
}

function RoleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[16px] leading-relaxed">
            <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" />
            <span className="opacity-80">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
