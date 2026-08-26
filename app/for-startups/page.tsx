import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { CompanyOrbit } from "@/components/CompanyOrbit";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "LaunchLine — build your company from zero",
  description: "LaunchLine turns an idea into a launch-ready company: research, brand, website, incorporation, sourcing, go-to-market, operations, and expert-kept books — eight phases, one flow.",
  path: "/for-startups",
});

// Italic serif accent word (Playfair), in the brand accent colour.
function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="font-[family-name:var(--font-playfair)] italic text-brand-royal dark:text-brand-sky">
      {children}
    </span>
  );
}

// Numbered section label with a trailing rule (and optional right-hand index).
function SectionLabel({
  no,
  index,
  children,
}: {
  no?: string;
  index?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      {no && (
        <span className="font-[family-name:var(--font-jetbrains)] text-[13px] font-semibold tabular-nums text-brand-royal dark:text-brand-sky">
          {no}
        </span>
      )}
      <span className="font-[family-name:var(--font-jetbrains)] text-[12px] font-medium uppercase tracking-[0.25em] text-brand-royal dark:text-brand-sky">
        · {children}
      </span>
      <span className="h-px flex-1 bg-current opacity-20" />
      {index && (
        <span className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-[0.2em] opacity-40">
          {index}
        </span>
      )}
    </div>
  );
}

type Phase = {
  no: string;
  label: string;
  title: ReactNode;
  body: string;
  deliverables: string[];
};

// Eight phases — expanded copy, our own wording.
const phases: Phase[] = [
  {
    no: "01",
    label: "Market Intelligence",
    title: (
      <>
        It reads the entire <Accent>market</Accent> before your coffee cools.
      </>
    ),
    body: "The moment you describe the idea, LaunchLine runs real searches across competitors, pricing, demand signals and regulation — then synthesises them into a positioning and go-to-market thesis you can act on. What used to be six weeks of agency desk research arrives as a sourced, decision-ready brief in minutes, with every claim traceable back to where it came from.",
    deliverables: [
      "TAM / SAM / SOM sizing",
      "Competitor teardown",
      "Pricing & willingness-to-pay",
      "Demand validation",
      "Regulatory scan",
    ],
  },
  {
    no: "02",
    label: "Brand Identity",
    title: (
      <>
        A name, a mark, a whole <Accent>identity</Accent> — in a breath.
      </>
    ),
    body: "Names, logo, typography, colour and voice arrive as one coherent system, not a pile of disconnected options. Every candidate name is checked against live domain and trademark availability, so the identity you fall for is one you can actually own. You choose the direction; LaunchLine locks the whole system in and hands you the files.",
    deliverables: [
      "Name shortlist (domain-checked)",
      "Logo & wordmark",
      "Colour & type system",
      "Brand voice guide",
      "Social & asset kit",
    ],
  },
  {
    no: "03",
    label: "Website & Landing",
    title: (
      <>
        From a blank canvas to a live, <Accent>shipping</Accent> site.
      </>
    ),
    body: "Design, build and deployment happen in a single pass. LaunchLine wireframes the pages, writes the copy, assembles the components and pushes to production on your own domain — responsive, fast and analytics-wired — while you watch it go up. No agency queue, no placeholder, and no six-figure rebuild waiting for you a year from now.",
    deliverables: [
      "Wireframes → visual design",
      "Conversion copywriting",
      "Responsive production build",
      "Custom domain + SSL",
      "Analytics & SEO wiring",
    ],
  },
  {
    no: "04",
    label: "Incorporation",
    title: (
      <>
        The dull, critical <Accent>paperwork</Accent> — filed and done.
      </>
    ),
    body: "Entity formation, EIN, business banking, founder agreements and a clean cap table — prepared, filed and tracked to completion. You sign once and the status keeps itself up to date. The boring administrative layer that quietly sinks most first-time founders becomes a single line item that is simply handled, correctly, the first time.",
    deliverables: [
      "Entity formation",
      "EIN & tax registration",
      "Business banking setup",
      "Cap table",
      "Founder & IP agreements",
    ],
  },
  {
    no: "05",
    label: "Manufacturing",
    title: (
      <>
        The right <Accent>factory</Accent> — sourced, vetted, and signed.
      </>
    ),
    body: "For physical products, LaunchLine turns a bill of materials into a shortlist of vetted manufacturers, gathers and compares quotes, negotiates terms and places your first purchase order. No red-eye flights, no factory roulette, and no lying awake wondering whether the sample you approved will match the shipment that actually arrives.",
    deliverables: [
      "BOM & spec sheet",
      "Vetted supplier shortlist",
      "Quote comparison",
      "Sampling & QA plan",
      "First purchase order",
    ],
  },
  {
    no: "06",
    label: "Go-to-Market",
    title: (
      <>
        Launched — with customers already <Accent>rolling in</Accent>.
      </>
    ),
    body: "Channels are chosen from where your buyers actually are, the creative and messaging are written to match, and the first campaigns go live on day one. Launch stops being a single nervous moment and becomes a system that keeps bringing the right people to the door — measured, attributed, and ready to scale the parts that work.",
    deliverables: [
      "Channel strategy",
      "Ad & content creative",
      "Launch campaigns",
      "Lead capture & CRM",
      "Attribution & reporting",
    ],
  },
  {
    no: "07",
    label: "Operations",
    title: (
      <>
        Then it runs the whole <Accent>thing</Accent> for you.
      </>
    ),
    body: "Support, fulfilment, finance and growth are stitched into workflows that run without you standing over them. Tickets get answered, orders get shipped, dashboards stay current — the company quietly keeps its own lights on, so your attention goes to the handful of decisions that only a founder can actually make.",
    deliverables: [
      "Support workflows",
      "Fulfilment & logistics",
      "Finance operations",
      "Growth dashboards",
      "SLAs & alerting",
    ],
  },
  {
    no: "08",
    label: "Accounts",
    title: (
      <>
        Your books, kept by <Accent>actual humans</Accent>.
      </>
    ),
    body: "Automation closes the loop; people close the month. A named bookkeeper, CPA and CFO advisor own your numbers — reconciling, filing and forecasting — so the accounts are investor-ready every month, not scrambled together the week before a raise. When a real question comes up, a real expert already knows your business.",
    deliverables: [
      "Monthly close",
      "Bookkeeping & reconciliation",
      "Tax filing",
      "Cash-flow forecasting",
      "Investor-ready reporting",
    ],
  },
];

// Numbered principles grid — why the line works.
const principles: { title: string; body: string }[] = [
  {
    title: "One flow",
    body: "Eight phases, one system. Every handoff is already wired, so nothing falls through the seams between freelancers and tools.",
  },
  {
    title: "You own everything",
    body: "Code, brand, entity and accounts are in your name from day one. No lock-in, no rent-seeking, no hostage data.",
  },
  {
    title: "Enterprise-grade, startup-priced",
    body: "The same rigour we bring to enterprise AI, scoped and priced for pre-seed reality — fixed-scope, no surprises.",
  },
  {
    title: "Weeks, not quarters",
    body: "Research to a live, incorporated, selling company in the time a traditional agency spends on a kickoff deck.",
  },
  {
    title: "Humans on the hard parts",
    body: "Automation handles the volume; named experts own the judgment calls — legal, finance, sourcing, positioning.",
  },
  {
    title: "Built to scale",
    body: "The architecture that launches you is the one that carries you to Series B. Grow into it — never rebuild from it.",
  },
];

function Deliverables({ items }: { items: string[] }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] opacity-45">
        What you get
      </p>
      <ul className="mt-4">
        {items.map((d) => (
          <li
            key={d}
            className="flex items-baseline gap-3 border-t border-black/10 py-2.5 dark:border-white/10"
          >
            <span className="text-brand-royal dark:text-brand-sky">+</span>
            <span className="text-[15px] leading-snug opacity-75">{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ForStartups() {
  return (
    <div className="relative overflow-hidden bg-background text-brand-navy dark:text-white">
      <JsonLd data={graph(breadcrumbSchema([["LaunchLine", "/for-startups"]]))} />
      {/* Soft brand glows spanning the whole page (theme-aware). */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-royal/15 blur-[130px] dark:bg-brand-royal/25" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[560px] rounded-full bg-brand-sky/10 blur-[120px]" />

      <div className="relative">
        {/* ── Hero ── */}
        <section className="mx-auto max-w-5xl px-6 pt-36 pb-28 text-center sm:pt-44">
          <Link
            href="/"
            className="rise-in mb-8 inline-block font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.2em] text-brand-royal transition hover:text-brand-sky dark:text-brand-periwinkle"
          >
            ← ViramTech
          </Link>

          <p
            className="rise-in font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.28em] text-brand-royal dark:text-brand-periwinkle"
            style={{ animationDelay: "0.05s" }}
          >
            ＋ ViramTech for Startups
          </p>

          <h1
            className="rise-in mt-6 text-6xl font-extrabold leading-[1] tracking-tight sm:text-8xl"
            style={{ animationDelay: "0.1s" }}
          >
            <span>Launch</span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #3f56a4 0%, #33a5db 60%, #33a5db 100%)",
              }}
            >
              Line
            </span>
          </h1>

          <h2
            className="rise-in mx-auto mt-5 max-w-3xl text-2xl font-bold leading-tight opacity-90 sm:text-4xl"
            style={{ animationDelay: "0.16s" }}
          >
            build your company from <Accent>zero</Accent>.
          </h2>

          <p
            className="rise-in mx-auto mt-7 max-w-2xl text-lg leading-relaxed opacity-65"
            style={{ animationDelay: "0.22s" }}
          >
            Turn an idea into a launch-ready company — research, brand, website,
            incorporation, sourcing, go-to-market, operations, and expert-kept
            books, handled in one continuous line.
          </p>

          <div
            className="rise-in mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.28s" }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-brand-royal to-brand-sky px-8 py-3.5 font-semibold text-white shadow-[0_10px_40px_-8px_rgba(51,165,219,0.6)] transition hover:-translate-y-0.5"
            >
              Start your build →
            </Link>
            <a
              href="#overview"
              className="rounded-full border border-black/15 px-8 py-3.5 font-semibold opacity-80 transition hover:border-black/40 hover:opacity-100 dark:border-white/15 dark:hover:border-white/40"
            >
              Walk the line ↓
            </a>
          </div>

          <p
            className="rise-in mt-8 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.25em] opacity-40"
            style={{ animationDelay: "0.34s" }}
          >
            Eight phases · one flow · zero busywork
          </p>
        </section>

        {/* ── Overview ── */}
        <section
          id="overview"
          className="mx-auto max-w-6xl border-t border-black/10 px-6 py-24 dark:border-white/10 sm:py-32"
        >
          <Reveal>
            <SectionLabel no="00">LaunchLine · The Startup Studio</SectionLabel>
            <div className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-[1.15fr_1fr]">
              <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
                One idea in. A <Accent>company</Accent> out.
              </h2>
              <div className="space-y-5 text-lg leading-relaxed opacity-70">
                <p>
                  Most founders assemble a company from a dozen freelancers,
                  tools and dead ends — and lose months to the seams between
                  them. LaunchLine runs the entire build as one disciplined
                  line: eight phases, a single flow, every handoff already
                  wired.
                </p>
                <p>
                  You bring the idea; it returns a launch-ready business you
                  fully own — enterprise-grade from day one, priced for exactly
                  where you are.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── How it works (principles) ── */}
        <section className="mx-auto max-w-6xl border-t border-black/10 px-6 py-24 dark:border-white/10 sm:py-32">
          <Reveal>
            <SectionLabel no="01">How it works</SectionLabel>
            <h2 className="mt-10 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              Eight phases, <Accent>one discipline</Accent>.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-70">
              Every LaunchLine build runs the same line — no skipped phases, no
              seams, no busywork bounced back to you. The discipline is what
              turns a promising prototype into a company that keeps running.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((pr, i) => (
              <Reveal key={pr.title} delay={(i % 3) * 0.06}>
                <div>
                  <span className="block h-px w-10 bg-brand-royal/50 dark:bg-brand-sky/50" />
                  <span className="mt-4 block font-[family-name:var(--font-jetbrains)] text-[12px] tabular-nums opacity-45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">
                    {pr.title}
                  </h3>
                  <p className="mt-3 leading-relaxed opacity-65">{pr.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── The Company OS (system map) ── */}
        <section className="mx-auto max-w-6xl border-t border-black/10 px-6 py-24 dark:border-white/10 sm:py-32">
          <Reveal>
            <SectionLabel no="02">The Company OS</SectionLabel>
            <h3 className="mt-10 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              Eight subsystems, <Accent>one company</Accent>.
            </h3>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-70">
              Before we walk each phase, here&apos;s the whole thing as one
              system — eight subsystems wired around a single core you own. As it
              powers up, sourcing, building, selling and accounting all come
              online at once. Every phase below is one node on this map.
            </p>
          </Reveal>

          <div className="mt-16">
            <CompanyOrbit />
          </div>
        </section>

        {/* ── Phases ── */}
        <div id="line" className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionLabel no="03">The Line · Eight Phases</SectionLabel>
          </Reveal>
          {phases.map((p) => (
            <Reveal key={p.no}>
              <section className="border-t border-black/10 py-24 dark:border-white/10 sm:py-32">
                <SectionLabel no={p.no} index={`${p.no} / 08`}>
                  {p.label}
                </SectionLabel>
                <h3 className="mt-10 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
                  {p.title}
                </h3>
                <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-[1.5fr_1fr]">
                  <p className="max-w-2xl text-lg leading-relaxed opacity-70 sm:text-xl">
                    {p.body}
                  </p>
                  <Deliverables items={p.deliverables} />
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* ── CTA (deliberately a dark panel in both themes) ── */}
        <section className="mx-auto max-w-6xl px-6 pb-36">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-slate to-brand-navy px-8 py-20 text-center text-white sm:px-12">
              <div className="pointer-events-none absolute inset-0 bg-grid-white opacity-60" />
              <div className="relative">
                <p className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.25em] text-brand-sky">
                  ＋ Begin
                </p>
                <h3 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
                  Have the idea? We&apos;ll build the <Accent>company</Accent>.
                </h3>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
                  Tell us what you&apos;re building. In one conversation
                  we&apos;ll map the fastest route from zero to a company that
                  ships — and switch on the line with you.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-gradient-to-r from-brand-royal to-brand-sky px-8 py-3.5 font-semibold text-white shadow-[0_10px_40px_-8px_rgba(51,165,219,0.6)] transition hover:-translate-y-0.5"
                  >
                    Start your build →
                  </Link>
                  <Link
                    href="/products"
                    className="rounded-full border border-white/15 px-8 py-3.5 font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
                  >
                    See the products
                  </Link>
                </div>
                <p className="mt-10 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Accelerate your business growth with strength-driven technology.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
