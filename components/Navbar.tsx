"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LuLanguages,
  LuEye,
  LuAudioLines,
  LuTrendingUp,
  LuBot,
  LuShoppingBag,
  LuTruck,
  LuLandmark,
  LuStethoscope,
  LuFactory,
  LuShieldCheck,
  LuBrainCircuit,
  LuServer,
  LuBlocks,
  LuMail,
  LuNewspaper,
  LuRocket,
} from "react-icons/lu";
import { products, sectors, foundation } from "@/lib/content";

const links: {
  href: string;
  label: string;
  menu?: MenuKey;
  noLink?: boolean;
}[] = [
  // noLink menus open a dropdown but don't navigate to a page of their own.
  { href: "/products", label: "Solutions", menu: "products" as const },
  { href: "/industries", label: "Industries", menu: "industries" as const, noLink: true },
  { href: "/technology", label: "Technology", menu: "technology" as const },
  { href: "/about", label: "About", menu: "about" as const, noLink: true },
];

// AI/ML capabilities shown in the Solutions dropdown (from the Technology page).
const capabilities = [
  { label: "Natural Language Processing", Icon: LuLanguages, slug: "nlp" },
  { label: "Computer Vision", Icon: LuEye, slug: "vision" },
  { label: "Speech Recognition", Icon: LuAudioLines, slug: "speech" },
  { label: "Predictive Analytics", Icon: LuTrendingUp, slug: "predictive" },
  { label: "Agentic AI Systems", Icon: LuBot, slug: "agentic" },
];

// Icons for industry sectors + technology pillars (match content order).
const sectorIcons = [
  LuShoppingBag,
  LuTruck,
  LuLandmark,
  LuStethoscope,
  LuFactory,
  LuShieldCheck,
];
const pillarIcons = [LuBrainCircuit, LuServer, LuBlocks];

// Foundation pillars deep-link to the first section of their area on /technology.
const foundationLinks = [
  "/technology#nlp",
  "/technology/infrastructure",
  "/technology/architecture#langchain",
];

const aboutLeft = [
  { label: "Our vision", note: "AI-native, built for the enterprise", href: "/about/vision" },
  { label: "Why ViramTech", note: "Speed, expertise, full-stack control", href: "/about/why" },
  { label: "Our roadmap", note: "Pilots → scale → market leadership", href: "/about/roadmap" },
  { label: "Market opportunity", note: "A $150B+ enterprise AI market", href: "/about/market" },
  { label: "Our work", note: "Projects we've shipped", href: "/work" },
];

type MenuKey = "products" | "industries" | "technology" | "about";

// Sub-links shown when a section is expanded in the mobile menu.
const mobileMenus: Record<
  MenuKey,
  { overview: string; items: { href: string; label: string; note?: string }[] }
> = {
  products: {
    overview: "All solutions",
    items: products.map((p) => ({
      href: `/products/${p.slug}`,
      label: p.name,
      note: p.kicker,
    })),
  },
  industries: {
    overview: "All industries",
    items: sectors.map((s) => ({
      href: `/industries/${s.slug}`,
      label: s.name,
    })),
  },
  technology: {
    overview: "Technology overview",
    items: [
      ...foundation.map((f, i) => ({
        href: foundationLinks[i] ?? "/technology",
        label: f.title,
      })),
      { href: "/technology/architecture", label: "Technical architecture" },
    ],
  },
  about: {
    overview: "About ViramTech",
    items: [
      ...aboutLeft.map((it) => ({
        href: it.href,
        label: it.label,
        note: it.note,
      })),
      { href: "/contact", label: "Contact us", note: "Reach our team" },
      { href: "/blog", label: "Blog", note: "Ideas on enterprise AI" },
      {
        href: "/for-startups",
        label: "ViramTech for Startups",
        note: "Enterprise-grade AI at startup speed",
      },
    ],
  },
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="ViramTech logo"
        width={31}
        height={26}
        priority
        className="h-[26px] w-auto"
      />
      <span className="flex items-baseline gap-1.5">
        <span className="bg-gradient-to-r from-[#00B4E4] via-[#3B56A6] to-[#112649] bg-clip-text text-xl font-extrabold uppercase leading-none tracking-tight text-transparent dark:from-[#33A5DB] dark:via-[#597CBD] dark:to-[#597CBD]">
          VIR&#923;M
        </span>
        <span className="bg-gradient-to-r from-[#00B4E4] via-[#3B56A6] to-[#112649] bg-clip-text text-[0.7rem] font-bold uppercase leading-none tracking-normal text-transparent dark:from-[#33A5DB] dark:via-[#597CBD] dark:to-[#597CBD]">
          Tech
        </span>
      </span>
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mobileSub, setMobileSub] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Aceternity-style resizing: shrink the bar once the page is scrolled.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);

    // Desktop only: hide when scrolling down, reveal when scrolling up —
    // but stay visible until we've scrolled past the hero (~one viewport).
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const heroThreshold = window.innerHeight;
    if (!isDesktop || latest < heroThreshold) {
      setVisible(true);
      return;
    }
    const prev = scrollY.getPrevious() ?? 0;
    setVisible(latest < prev);
  });

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setOpen(false);
    setMenu(null);
    setMobileSub(null);
  }, [pathname]);

  const openMenu = (m: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(m);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMenu(null), 120);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const themeButton = (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
    >
      {mounted && resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );

  const panelBase =
    "absolute left-1/2 top-[calc(100%+0.6rem)] z-40 hidden -translate-x-1/2 origin-top rounded-3xl border border-black/5 bg-white/95 shadow-2xl backdrop-blur-lg transition duration-200 lg:block dark:border-white/10 dark:bg-neutral-950/95";

  return (
    <motion.header
      initial={false}
      animate={{
        maxWidth: scrolled ? "64rem" : "80rem",
        top: scrolled ? "1rem" : "0.75rem",
        y: visible || open || menu ? "0%" : "-140%",
        opacity: visible || open || menu ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className="fixed inset-x-0 z-50 mx-auto w-[calc(100%-2rem)]"
    >
      <motion.nav
        initial={false}
        animate={{
          borderRadius: "9999px",
          paddingTop: scrolled ? "0.5rem" : "0.75rem",
          paddingBottom: scrolled ? "0.5rem" : "0.75rem",
          paddingLeft: scrolled ? "1.25rem" : "1.75rem",
          paddingRight: scrolled ? "1.25rem" : "1.75rem",
          boxShadow: scrolled
            ? "0 12px 32px rgba(0,0,0,0.12)"
            : "0 6px 20px rgba(0,0,0,0.08)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 50 }}
        className="relative flex items-center gap-8 rounded-full border border-black/5 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/70"
      >
        {/* Left: brand */}
        <div className="flex flex-1 items-center">
          <Link href="/" aria-label="ViramTech — Home" className="flex items-center">
            <Wordmark />
          </Link>
        </div>

        {/* Center: links */}
        <ul className="hidden items-center gap-1 text-sm font-semibold lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            const base = `rounded-full px-4 py-2 transition duration-200 ${
              active
                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                : "opacity-80 hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/5"
            }`;
            if (link.menu) {
              const inner = (
                <>
                  {link.label}
                  <Chevron open={menu === link.menu} />
                </>
              );
              return (
                <li key={link.href} onMouseEnter={() => openMenu(link.menu!)} onMouseLeave={scheduleClose}>
                  {link.noLink ? (
                    <button
                      type="button"
                      onClick={() => openMenu(link.menu!)}
                      className={`flex items-center gap-1 ${base}`}
                    >
                      {inner}
                    </button>
                  ) : (
                    <Link href={link.href} className={`flex items-center gap-1 ${base}`}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            }
            return (
              <li key={link.href}>
                <Link href={link.href} className={base}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: controls */}
        <div className="flex flex-1 items-center justify-end gap-1.5">
          <div className="hidden lg:block">{themeButton}</div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-black/5 lg:hidden dark:hover:bg-white/5"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.nav>

      {/* Solutions mega-dropdown */}
      <div
        onMouseEnter={() => openMenu("products")}
        onMouseLeave={scheduleClose}
        className={`${panelBase} w-[min(94vw,940px)] p-8 ${
          menu === "products"
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="grid grid-cols-[0.85fr_1.15fr] gap-10">
          {/* Left: capabilities */}
          <div className="border-r border-black/5 pr-10 dark:border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] opacity-40">
              Capabilities for every business need
            </h4>
            <ul className="mt-5 space-y-1">
              {capabilities.map(({ label, Icon, slug }) => (
                <li key={label}>
                  <Link
                    href={`/technology#${slug}`}
                    onClick={() => setMenu(null)}
                    className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                      <Icon size={18} />
                    </span>
                    <span className="text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] opacity-40">
              Our AI products
            </h4>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  onClick={() => setMenu(null)}
                  className="group -mx-2 block rounded-xl px-2 py-2.5 transition hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="block text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                    {p.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug opacity-55">
                    {p.kicker}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Industries mega-dropdown */}
      <div
        onMouseEnter={() => openMenu("industries")}
        onMouseLeave={scheduleClose}
        className={`${panelBase} w-[min(94vw,800px)] ${
          menu === "industries"
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="p-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] opacity-40">
            Industries we serve
          </h4>
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-1">
            {sectors.map((s, i) => {
              const Icon = sectorIcons[i % sectorIcons.length];
              return (
                <Link
                  key={s.name}
                  href={`/industries/${s.slug}`}
                  onClick={() => setMenu(null)}
                  className="group -mx-2 flex items-start gap-3 rounded-xl px-2 py-2.5 transition hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug opacity-55">
                      {s.points.join(" · ")}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Technology mega-dropdown */}
      <div
        onMouseEnter={() => openMenu("technology")}
        onMouseLeave={scheduleClose}
        className={`${panelBase} w-[min(94vw,420px)] ${
          menu === "technology"
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="p-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] opacity-40">
            Technology foundation
          </h4>
          <ul className="mt-5 space-y-1">
            {foundation.map((f, i) => {
              const Icon = pillarIcons[i % pillarIcons.length];
              return (
                <li key={f.title}>
                  <Link
                    href={foundationLinks[i] ?? "/technology"}
                    onClick={() => setMenu(null)}
                    className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                      <Icon size={18} />
                    </span>
                    <span className="text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                      {f.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* About mega-dropdown */}
      <div
        onMouseEnter={() => openMenu("about")}
        onMouseLeave={scheduleClose}
        className={`${panelBase} w-[min(94vw,680px)] ${
          menu === "about"
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-10 p-8">
          {/* Left: who we are */}
          <div className="border-r border-black/5 pr-10 dark:border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] opacity-40">
              Who we are
            </h4>
            <div className="mt-5 space-y-1">
              {aboutLeft.map((it) => (
                <Link
                  key={it.label}
                  href={it.href}
                  onClick={() => setMenu(null)}
                  className="group -mx-2 block rounded-xl px-2 py-2 transition hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="block text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                    {it.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug opacity-55">
                    {it.note}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] opacity-40">
              Explore
            </h4>
            <ul className="mt-5 space-y-1">
              <li>
                <Link
                  href="/contact"
                  onClick={() => setMenu(null)}
                  className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                    <LuMail size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                      Contact us
                    </span>
                    <span className="mt-0.5 block text-xs opacity-55">
                      Reach our team
                    </span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={() => setMenu(null)}
                  className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                    <LuNewspaper size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                      Blog
                    </span>
                    <span className="mt-0.5 block text-xs opacity-55">
                      Ideas on enterprise AI
                    </span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/for-startups"
                  onClick={() => setMenu(null)}
                  className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                    <LuRocket size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                      ViramTech for Startups
                    </span>
                    <span className="mt-0.5 block text-xs opacity-55">
                      Enterprise-grade AI at startup speed
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-40 flex max-h-[80vh] flex-col overflow-y-auto rounded-3xl border border-black/5 bg-white/95 p-4 shadow-2xl backdrop-blur-lg lg:hidden dark:border-white/10 dark:bg-neutral-950/95">
          <ul className="flex flex-col gap-1 text-base font-bold tracking-tight">
            {links.map((link) => {
              const active = isActive(link.href);
              const sub = link.menu ? mobileMenus[link.menu] : null;
              const expanded = link.menu != null && mobileSub === link.menu;
              const rowCls = `flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                active
                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`;

              // Plain link (no sub-menu).
              if (!sub) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={rowCls}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }

              // Expandable section.
              return (
                <li key={link.href}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileSub((cur) =>
                        cur === link.menu ? null : link.menu!,
                      )
                    }
                    className={rowCls}
                  >
                    {link.label}
                    <Chevron open={expanded} />
                  </button>

                  {expanded && (
                    <div className="mb-1 mt-1 flex flex-col gap-0.5 border-l border-black/10 pl-3 dark:border-white/10">
                      {!link.noLink && (
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="rounded-xl px-4 py-2.5 text-sm font-bold text-indigo-600 transition hover:bg-black/5 dark:text-indigo-400 dark:hover:bg-white/5"
                        >
                          {sub.overview}
                        </Link>
                      )}
                      {sub.items.map((it) => (
                        <Link
                          key={it.href + it.label}
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className="rounded-xl px-4 py-2.5 transition hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          <span className="block text-sm font-semibold">
                            {it.label}
                          </span>
                          {it.note && (
                            <span className="mt-0.5 block text-xs font-normal opacity-55">
                              {it.note}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider opacity-50">
              Theme
            </span>
            {themeButton}
          </div>
        </div>
      )}
    </motion.header>
  );
}
