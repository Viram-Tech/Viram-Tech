import Link from "next/link";
import Image from "next/image";

const groups = [
  {
    title: "Explore",
    links: [
      { label: "DataForge", href: "/products/dataforge" },
      { label: "Agentic AI Platform", href: "/products/agentic-ai-platform" },
      { label: "Technology", href: "/technology" },
      { label: "Our Work", href: "/work" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "Contact", href: "/contact" }],
  },
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
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
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
          <span>© {year} ViramTech. All rights reserved.</span>
          <Link href="/contact" className="hover:text-indigo-500">
            Book a consultation →
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
