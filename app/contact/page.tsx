import Image from "next/image";
import type { ReactNode } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Contact — ViramTech",
  description:
    "Tell us what you're building. We'll map the fastest path and reply within one business day.",
};

const details = [
  { icon: "location_on", label: "Studio", lines: ["Mumbai, Maharashtra", "India"] },
  { icon: "call", label: "Phone", lines: ["+00 00000 00000"] },
  { icon: "schedule", label: "Reply time", lines: ["Within one business day"] },
];

// Italic serif accent word (Playfair), in the brand accent colour.
function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="font-[family-name:var(--font-playfair)] italic text-brand-royal dark:text-brand-sky">
      {children}
    </span>
  );
}

export default function Contact() {
  return (
    <div className="relative overflow-hidden bg-background text-brand-navy dark:text-white">
      {/* Soft brand glows (theme-aware), matching for-startups. */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-brand-royal/15 blur-[130px] dark:bg-brand-royal/25" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[560px] rounded-full bg-brand-sky/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-28 sm:pt-44">
        {/* ── Hero ── */}
        <Reveal>
          <p className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.28em] text-brand-royal dark:text-brand-sky">
            ＋ Contact
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
            Let&apos;s build something <Accent>together</Accent>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-65">
            Tell us what you&apos;re building — an idea, a pilot, or a system
            that needs to scale. We&apos;ll map the fastest path and reply within
            one business day.
          </p>
        </Reveal>

        {/* ── Info card + form ── */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: brand info card (dark panel in both themes) */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-slate to-brand-navy p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-grid-white opacity-60" />
              <div className="relative flex h-full flex-col">
                {/* Logo lockup */}
                <span className="flex items-center gap-2.5">
                  <Image
                    src="/logo.svg"
                    alt="ViramTech logo"
                    width={36}
                    height={30}
                    className="h-8 w-auto"
                  />
                  <span className="flex items-baseline gap-1.5">
                    <span className="bg-gradient-to-r from-[#33A5DB] via-[#597CBD] to-[#7d97ef] bg-clip-text text-2xl font-extrabold uppercase leading-none tracking-tight text-transparent">
                      VIR&#923;M
                    </span>
                    <span className="bg-gradient-to-r from-[#33A5DB] via-[#597CBD] to-[#7d97ef] bg-clip-text text-sm font-bold uppercase leading-none text-transparent">
                      Tech
                    </span>
                  </span>
                </span>

                <p className="mt-6 max-w-xs leading-relaxed text-white/60">
                  Accelerate your business growth with strength-driven
                  technology.
                </p>

                {/* Contact details */}
                <div className="mt-10 space-y-6">
                  {details.map((d) => (
                    <div key={d.label} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-royal/25 text-brand-sky">
                        <span className="material-symbols-outlined text-[20px]">
                          {d.icon}
                        </span>
                      </span>
                      <div>
                        <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.18em] text-white/40">
                          {d.label}
                        </p>
                        <div className="mt-1 text-[15px] leading-relaxed text-white/90">
                          {d.lines.map((l) => (
                            <div key={l}>{l}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="mt-auto pt-10">
                  <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.18em] text-white/40">
                    Connect
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <a
                      href="https://www.linkedin.com/company/viram-tech/"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="ViramTech on LinkedIn"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 transition hover:border-brand-sky hover:text-brand-sky"
                    >
                      <FaLinkedinIn size={17} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.08}>
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.25em] text-brand-royal dark:text-brand-sky">
                ＋ Send a message
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Let&apos;s <Accent>collaborate</Accent>.
              </h2>

              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
