import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa6";

const groups = [
  {
    title: "Solutions",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Technology", href: "/technology" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Retail & E-commerce", href: "/industries/retail" },
      { label: "Banking & Finance", href: "/industries/banking" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "All Industries", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "For Startups", href: "/for-startups" },
      { label: "Our Work", href: "/work" },
      { label: "Insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Machine-readable renderings of the site, surfaced so both crawlers and people
// can find them. All five are generated routes, not static files in /public:
// app/llms.txt, app/llms-full.txt, app/index.html.md, app/robots.ts, app/sitemap.ts.
const crawlerFiles = [
  { label: "llms.txt", href: "/llms.txt" },
  { label: "llms-full.txt", href: "/llms-full.txt" },
  { label: "index.html.md", href: "/index.html.md" },
  { label: "robots.txt", href: "/robots.txt" },
  { label: "sitemap.xml", href: "/sitemap.xml" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              aria-label="ViramTech — Home"
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.svg"
                alt="ViramTech logo"
                width={31}
                height={26}
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
            </Link>
            <p className="mt-5 text-sm leading-relaxed opacity-60">
              Accelerate your business growth with strength-driven technology.
            </p>
            <p className="mt-4 text-sm leading-relaxed opacity-60">
              Mumbai, Maharashtra · India
            </p>
            <a
              href="https://www.linkedin.com/company/viram-tech/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="ViramTech on LinkedIn"
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 opacity-75 transition hover:border-indigo-500 hover:text-indigo-500 hover:opacity-100 dark:border-white/15"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium opacity-75 transition hover:text-indigo-500 hover:opacity-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs opacity-50 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <span>© {year} ViramTech. All rights reserved.</span>
            {/* Plain-text renderings of the site for AI crawlers, per
                llmstxt.org. Ordinary <a> tags, not <Link>: these are route
                handlers returning text, so there is nothing to prefetch. */}
            {/* Wraps: five filenames don't fit one mobile line, and an
                unwrapped flex row here widened the whole page. */}
            <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              AI crawlers:
              {crawlerFiles.map((file, i) => (
                <span key={file.href} className="flex items-center gap-1.5">
                  <a
                    href={file.href}
                    className="underline underline-offset-2 transition hover:text-indigo-500"
                  >
                    {file.label}
                  </a>
                  {/* Separator trails its own link so a wrapped line never
                      starts with a stray pipe. */}
                  {i < crawlerFiles.length - 1 && (
                    <span aria-hidden="true">|</span>
                  )}
                </span>
              ))}
            </span>
          </div>
          <Link href="/contact" className="hover:text-indigo-500">
            Book a consultation →
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
