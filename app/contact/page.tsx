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
      {/* ── Hero with diagonal blue panel + top image slot ── */}
      <section className="relative h-[360px] overflow-hidden bg-neutral-900 sm:h-[420px]">
        {/* Top image slot */}
        <ImageSlot
          src="/contact/hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full"
        />
        {/* Blue diagonal overlay */}
        <div className="absolute inset-y-0 left-0 flex w-full items-center bg-gradient-to-br from-[#3F56A4] to-[#33A5DB] [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)] lg:w-[60%]">
          <div className="max-w-xl px-6 pt-16 text-white sm:px-10 lg:pl-16">
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
        <div className="overflow-hidden rounded-3xl shadow-xl">
          {/* Left image slot */}
          <ImageSlot
            src="/contact/side.jpg"
            alt="ViramTech"
            className="h-64 w-full"
          />

          {/* Offices + socials panel */}
          <div className="bg-gradient-to-br from-[#3F56A4] to-[#33A5DB] p-8 text-white sm:p-10">
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

function ImageSlot({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={`object-cover ${className}`} />
    );
  }
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 text-neutral-500 dark:from-neutral-800 dark:to-neutral-700 dark:text-neutral-400 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.5-3.5L9 20" />
        </svg>
        <span className="text-xs font-medium">{alt}</span>
      </div>
    </div>
  );
}
