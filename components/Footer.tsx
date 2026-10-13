import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiTrustpilot, SiGlassdoor } from "react-icons/si";
import { LogoLoop } from "./LogoLoop";
import { recognitions, type Recognition } from "@/lib/recognitions";

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
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/*
 * "Featured & recognized on" badges, from content/recognitions.json. Without an
 * `image` a text badge is drawn. While the file is empty, placeholders render
 * in development only, so no unearned "Featured on" claim can ship.
 */
const devPlaceholders: Recognition[] = [
  { name: "Platform one", href: "#", kicker: "Featured on" },
  { name: "Platform two", href: "#", kicker: "Published on" },
];

const shownRecognitions =
  recognitions.length > 0
    ? recognitions
    : process.env.NODE_ENV === "development"
      ? devPlaceholders
      : [];

/*
 * "Review us on …" buttons under the badges. Trustpilot's /evaluate/<domain>
 * link opens its review form for viramtech.com (claim the profile at
 * business.trustpilot.com to manage it). Glassdoor needs the company's own
 * review URL (glassdoor.co.in/Reviews/…-E<id>.htm); until it's set the button
 * shows in development only.
 */
const reviewLinks = [
  {
    name: "Trustpilot",
    href: "https://www.trustpilot.com/evaluate/viramtech.com",
    Icon: SiTrustpilot,
    color: "#00B67A",
  },
  {
    name: "Glassdoor",
    href: "",
    Icon: SiGlassdoor,
    color: "#0CAA41",
  },
].filter((r) => r.href || process.env.NODE_ENV === "development");

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

// `wide` switches to the careers-page container so the footer lines up with it.
export function Footer({ wide = false }: { wide?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className={`${wide ? "careers-container" : "mx-auto max-w-6xl px-6"} py-14`}>
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
            {shownRecognitions.length > 0 && (
              <div className="mt-8">
                <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] font-semibold uppercase tracking-[0.25em] opacity-50">
                  Featured &amp; recognized on
                </h3>
                {/* Infinite logo loop between hairlines, faded at both ends
                    (as on startupdeck.in); pauses on hover. */}
                <div className="mt-4 border-y border-black/5 py-3 [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)] dark:border-white/10">
                  <LogoLoop
                    logos={shownRecognitions.map((r) => ({ node: r.name, title: r.name, href: r.href }))}
                    speed={30}
                    logoHeight={44}
                    gap={12}
                    pauseOnHover
                    ariaLabel="Featured and recognized on"
                    renderItem={(item) => {
                      const r = shownRecognitions.find((x) => x.name === item.title)!;
                      return (
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${r.kicker} ${r.name}`}
                          className="block rounded-xl border border-black/5 bg-white/60 p-2 transition hover:-translate-y-0.5 hover:border-brand-sky/40 dark:border-white/10 dark:bg-white/[0.03]"
                        >
                          {r.image ? (
                            // Third-party badge art, served by the platform.
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={r.image}
                              alt={`${r.kicker} ${r.name}`}
                              width={Number(r.width ?? 200)}
                              height={Number(r.height ?? 54)}
                              className="h-11 w-auto"
                              loading="lazy"
                            />
                          ) : (
                            <span className="flex h-11 flex-col justify-center rounded-lg border border-black/10 bg-white px-3.5 dark:border-white/15 dark:bg-neutral-900">
                              <span className="text-[9px] font-semibold uppercase tracking-[0.12em] opacity-55">
                                {r.kicker}
                              </span>
                              <span className="text-sm font-bold leading-tight tracking-tight">
                                {r.name}
                              </span>
                            </span>
                          )}
                        </a>
                      );
                    }}
                  />
                </div>
              </div>
            )}
            {reviewLinks.length > 0 && (
              <div className="mt-4 flex gap-2">
                {reviewLinks.map(({ name, href, Icon, color }) => (
                  <a
                    key={name}
                    href={href || "#"}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ borderColor: `${color}66` }}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border bg-neutral-100 px-2 py-1.5 text-[11px] font-medium text-neutral-900 transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Review us on
                    <span className="flex items-center gap-1 font-semibold">
                      <Icon size={13} style={{ color }} aria-hidden />
                      {name}
                    </span>
                  </a>
                ))}
              </div>
            )}
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
