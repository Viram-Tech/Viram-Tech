import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa6";
import { PhoneField } from "@/components/PhoneField";

export const metadata = {
  title: "Contact — ViramTech",
  description: "Get in touch with the ViramTech team.",
};

// Single address slot — fill in your office details here.
const offices = [
  {
    flag: "📍",
    lines: ["Mumbai, Maharashtra", "India"],
    phone: "+00 00000 00000",
  },
];

const socials = [
  { label: "LinkedIn", icon: FaLinkedinIn, href: "https://www.linkedin.com" },
];

export default function Contact() {
  return (
    <>
      {/* ── Hero — solid brand-blue band (matches the Our Offices panel) ── */}
      <section className="relative flex h-[360px] items-center overflow-hidden bg-gradient-to-br from-[#3F56A4] to-[#33A5DB] sm:h-[420px]">
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-6 pt-16 text-white sm:px-10 lg:pl-16">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Contact Us
            </h1>
            <p className="mt-4 max-w-xs text-lg text-white/90">
              Get in Touch with Our Expert Team.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main: left (image + offices) / right (form) ── */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col overflow-hidden rounded-3xl shadow-xl">
          {/* Brand logo panel — built from the real vector assets */}
          <div className="flex h-64 w-full shrink-0 items-center justify-center gap-3 bg-background p-10">
            <Image
              src="/logo.svg"
              alt="ViramTech logo"
              width={72}
              height={60}
              className="h-16 w-auto"
            />
            <span className="flex items-baseline gap-2">
              <span className="bg-gradient-to-r from-[#00B4E4] via-[#3B56A6] to-[#112649] bg-clip-text text-4xl font-extrabold uppercase leading-none tracking-tight text-transparent dark:from-[#33A5DB] dark:via-[#597CBD] dark:to-[#597CBD]">
                VIR&#923;M
              </span>
              <span className="bg-gradient-to-r from-[#00B4E4] via-[#3B56A6] to-[#112649] bg-clip-text text-lg font-bold uppercase leading-none tracking-normal text-transparent dark:from-[#33A5DB] dark:via-[#597CBD] dark:to-[#597CBD]">
                Tech
              </span>
            </span>
          </div>

          {/* Offices + socials panel */}
          <div className="flex-1 bg-gradient-to-br from-[#3F56A4] to-[#33A5DB] p-8 text-white sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight">Our Offices</h2>
            <div className="mt-6 space-y-7">
              {offices.map((o, i) => (
                <div key={i} className="flex gap-3">
                  <span className="mt-0.5 text-xl">{o.flag}</span>
                  <div className="text-[15px] leading-relaxed text-white/90">
                    {o.lines.map((l) => (
                      <div key={l}>{l}</div>
                    ))}
                    <div className="mt-1 font-medium">{o.phone}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold tracking-tight">
              Social Profiles
            </h2>
            <div className="mt-5 flex items-center gap-4">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Let&apos;s Collaborate!
          </h2>

          <form className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First Name *" name="firstName" placeholder="Jane" />
              <Field label="Last Name *" name="lastName" placeholder="Doe" />
            </div>

            <PhoneField />

            <Field
              label="Email *"
              name="email"
              type="email"
              placeholder="you@company.com"
            />
            <Field
              label="Company Name"
              name="company"
              placeholder="Your organization"
            />
            <Field
              label="Designation"
              name="designation"
              placeholder="e.g. Head of Operations"
            />

            <div>
              <Label>Message</Label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your project…"
                className="w-full rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-white/15 dark:bg-white/[0.03]"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#3F8DF0] px-7 py-3 font-semibold text-white shadow-lg shadow-[#3F8DF0]/30 transition hover:bg-[#2f7ce0]"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-semibold opacity-80">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-white/15 dark:bg-white/[0.03]"
      />
    </div>
  );
}
