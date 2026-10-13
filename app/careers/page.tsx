import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { roleGroups } from "@/lib/careers";
import { getBlogPosts } from "@/lib/blog";

export const metadata = buildMetadata({
  title: "Careers",
  description: "Join ViramTech — we build AI systems and put them to work, delivering AI-powered services for businesses. Open roles and internships in engineering and solutions, based in Mumbai.",
  path: "/careers",
});

// Layout follows linear.app/careers: hero (copy left, roles link right) + image frame, a
// label-left / content-right philosophy block, a numbered principles grid,
// then open roles grouped by team with hairline-separated rows.

const principles = [
  { title: "Ship early", body: "Small, working releases beat perfect plans." },
  { title: "Start with the problem", body: "Understand the workflow before touching a model." },
  { title: "Outcomes over output", body: "Clients pay for results. Sometimes that's a product; often it's a service we run for them." },
  { title: "Measure what matters", body: "If we can't evaluate it, we don't ship it." },
  { title: "Build for production", body: "Reliable, secure and observable from day one. Don't make it a future person's problem." },
  { title: "Avoid side quests", body: "Don't chase every idea. Skip process that doesn't earn its keep." },
  { title: "Say it as it is", body: "Get to the point and assume good intentions." },
  { title: "Small team, big ownership", body: "We do more with fewer people. Wear multiple hats." },
  { title: "Hire the best people", body: "The best people hire the best people. Help recruit." },
  { title: "Keep learning", body: "The field moves every week. So do we." },
  { title: "Hybrid by default", body: "The Mumbai studio when it helps, remote when it doesn't." },
];

const label =
  "font-[family-name:var(--font-jetbrains)] text-[12px] uppercase tracking-[0.25em] text-brand-royal dark:text-brand-sky";

// Re-checks Sanity for new posts at most once a minute (ISR), like /blog.
export const revalidate = 60;

export default async function Careers() {
  const posts = (await getBlogPosts()).slice(0, 5);

  return (
    <div className="relative overflow-hidden bg-background text-brand-navy dark:text-white">
      <JsonLd data={graph(breadcrumbSchema([["Careers", "/careers"]]))} />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-brand-royal/15 blur-[130px] dark:bg-brand-royal/25" />

      <div className="relative careers-container pt-28 pb-28 sm:pt-32">
        {/* ── Hero + image. On desktop the pair is sized to the viewport
            (below the navbar), so the heading and the whole image are
            visible without scrolling; the image takes whatever height is
            left. Smaller screens keep a 16:9 image. ── */}
        <div className="flex flex-col lg:h-[calc(100svh-9rem)] lg:min-h-[34rem] lg:max-h-[60rem]">
          {/* Hero: copy left, "Open roles" right (as on Linear) */}
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block">Help us</span>
                  <span className="block">
                    put AI to{" "}
                    <span className="text-brand-royal dark:text-brand-sky">work</span>
                  </span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed opacity-65 sm:text-lg">
                  We build AI systems — and use them to deliver services that
                  help businesses grow. Will you help us do both?
                </p>
              </div>
              <a
                href="#roles"
                className="inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-brand-royal transition hover:opacity-70 dark:text-brand-sky"
              >
                Open roles <span aria-hidden>↓</span>
              </a>
            </div>
          </Reveal>

          {/* Media frame (image, in the spot Linear uses for its video).
              Swap the picture by replacing public/careers/hero-texture.jpg. */}
          <Reveal delay={0.1} className="mt-10 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-black/10 bg-brand-navy shadow-[0_40px_120px_-40px_rgba(20,40,78,0.55)] lg:aspect-auto lg:flex-1 dark:border-white/10">
              <Image
                src="/careers/hero-texture.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1440px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* ── Philosophy: label left, copy right ── */}
        <section className="mt-32 grid gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1fr_2fr] dark:border-white/10">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              On a quest for impact
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="space-y-5 text-lg leading-relaxed opacity-75">
              <p>
                Most enterprise AI never leaves the pilot stage. We exist to
                change that. We build AI systems with the care of a product
                and the rigour of infrastructure — then put them to work,
                delivering AI-powered services that teams rely on every day.
              </p>
              <p>
                Some clients get a system they run themselves; many get an
                outcome we deliver for them. We&apos;re looking for people who
                care deeply about the quality of their work, whether
                that&apos;s building models, running a service or sitting
                across the table from a client.
              </p>
            </div>
            <Link
              href="/about/vision"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-royal transition hover:opacity-70 dark:text-brand-sky"
            >
              Read about us <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </section>

        {/* ── Latest from the blog (Linear's video strip) ── */}
        {posts.length > 0 && (
          <div className="mt-24 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-brand-navy">
                    {p.coverImageUrl ? (
                      <Image
                        src={p.coverImageUrl}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br ${p.gradient}`} />
                    )}
                  </div>
                  <p className="mt-4 text-[15px] font-medium leading-snug tracking-tight transition group-hover:text-brand-royal dark:group-hover:text-brand-sky">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-sm opacity-55">
                    {p.author?.name ?? "ViramTech"}
                  </p>
                </Link>
              </Reveal>
            ))}
            {/* Empty placeholders so a short list still fills the row at
                every breakpoint (2 / 3 / 5 columns). */}
            {Array.from({ length: Math.max(0, 5 - posts.length) }, (_, i) => (
              <div key={`placeholder-${i}`} aria-hidden className={placeholderVisibility(posts.length, i)}>
                <div className="aspect-[16/9] rounded-md border border-dashed border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]" />
                <div className="mt-4 h-3.5 w-4/5 rounded bg-black/[0.05] dark:bg-white/[0.06]" />
                <div className="mt-2 h-3 w-1/3 rounded bg-black/[0.04] dark:bg-white/[0.04]" />
              </div>
            ))}
          </div>
        )}

        {/* ── Principles: heading left, intro right, then numbered grid ── */}
        <section className="mt-32">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                How we think
                <br />
                and work
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="max-w-xl text-xl leading-relaxed opacity-75">
                ViramTech&apos;s mission is to accelerate business growth with
                strength-driven technology. To turn that into reality, we
                operate on a set of core principles that keep us focused.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.05}>
                <div className="border-t border-black/10 py-6 dark:border-white/10">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[13px] tabular-nums text-brand-royal dark:text-brand-sky">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed opacity-60">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Open roles: grouped by team ── */}
        <section id="roles" className="mt-32 scroll-mt-32 border-t border-black/10 pt-12 dark:border-white/10">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Open roles
            </h2>
          </Reveal>

          <div className="mt-12 space-y-14">
            {roleGroups.map(({ name: team, roles: teamRoles }) => {
              return (
                <Reveal key={team}>
                  <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
                    <h3 className="flex items-baseline gap-3 text-lg font-bold tracking-tight">
                      {team}
                      <span className={label}>{teamRoles.length}</span>
                    </h3>
                    <ul className="border-t border-black/10 dark:border-white/10">
                      {teamRoles.map((role) => (
                        <li key={role.slug} className="border-b border-black/10 dark:border-white/10">
                          <Link
                            href={`/careers/${role.slug}`}
                            className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-5"
                          >
                            <span className="font-semibold tracking-tight transition group-hover:text-brand-royal dark:group-hover:text-brand-sky">
                              {role.title}
                            </span>
                            <span className="flex items-center gap-6 text-[15px]">
                              <span className="opacity-55">
                                {role.location} · {role.type}
                              </span>
                              <span className="hidden font-semibold text-brand-royal transition group-hover:translate-x-0.5 sm:inline dark:text-brand-sky">
                                Learn more →
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* General application */}
          <Reveal>
            <div className="mt-20 grid gap-4 lg:grid-cols-[1fr_2fr]">
              <div />
              <p className="text-lg leading-relaxed opacity-75">
                Don&apos;t see a role that fits?{" "}
                <Link
                  href="/careers/apply"
                  className="font-semibold text-brand-royal transition hover:opacity-70 dark:text-brand-sky"
                >
                  Send a general application →
                </Link>
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}

/** Placeholder i is shown only at breakpoints where it's needed to finish the row. */
function placeholderVisibility(count: number, i: number) {
  const need = (cols: number) => (cols - (count % cols)) % cols;
  return [
    i < need(2) ? "block" : "hidden",
    i < need(3) ? "sm:block" : "sm:hidden",
    i < need(5) ? "lg:block" : "lg:hidden",
  ].join(" ");
}
