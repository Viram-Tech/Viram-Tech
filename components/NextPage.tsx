import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

// The "Who we are" journey, in dropdown order.
const sequence = [
  { href: "/about/vision", title: "Our vision", subtitle: "AI-native, built for the enterprise" },
  { href: "/about/why", title: "Why ViramTech", subtitle: "Speed, expertise, full-stack control" },
  { href: "/about/roadmap", title: "Our roadmap", subtitle: "Pilots → scale → market leadership" },
  { href: "/about/market", title: "Market opportunity", subtitle: "A $150B+ enterprise AI market" },
  { href: "/work", title: "Our work", subtitle: "Projects we've shipped" },
];

export function NextPage({ current }: { current: string }) {
  const idx = sequence.findIndex((s) => s.href === current);
  const next = idx >= 0 ? sequence[idx + 1] : undefined;
  if (!next) return null;

  return (
    <Link
      href={next.href}
      className="group mt-16 flex items-center justify-between gap-6 rounded-3xl border border-black/5 bg-black/[0.02] px-7 py-7 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-500/30 hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
    >
      <div>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-500/70">
          Up next · Who we are
        </span>
        <h2 className="mt-1.5 text-xl font-extrabold tracking-tight transition-colors group-hover:text-indigo-600 sm:text-2xl dark:group-hover:text-indigo-300">
          {next.title}
        </h2>
        <p className="mt-1 text-sm opacity-60">{next.subtitle}</p>
      </div>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500 transition-transform duration-300 group-hover:translate-x-1.5 dark:text-indigo-400">
        <LuArrowRight size={22} />
      </span>
    </Link>
  );
}

export default NextPage;
