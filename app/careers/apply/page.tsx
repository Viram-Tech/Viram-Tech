import Link from "next/link";
import { ApplicationForm } from "@/components/ApplicationForm";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "General application — Careers",
  description: "Don't see a role that fits? Tell us about yourself and what you'd like to build at ViramTech.",
  path: "/careers/apply",
});

export default function GeneralApplication() {
  return (
    <div className="relative overflow-hidden bg-background text-brand-navy dark:text-white">
      <JsonLd
        data={graph(
          breadcrumbSchema([
            ["Careers", "/careers"],
            ["General application", "/careers/apply"],
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
          General application
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-65">
          Don&apos;t see a role that fits? Tell us about yourself and what
          you&apos;d like to build — we read every application.
        </p>

        <div className="mt-14 grid gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1fr_2fr] dark:border-white/10">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Apply</h2>
          <ApplicationForm role="General application" />
        </div>
      </div>
    </div>
  );
}
