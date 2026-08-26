import {
  TAGLINE,
  products,
  sectors,
  whyUs,
  roadmap,
  visionMission,
  aiCapabilities,
  infrastructureComponents,
  aiFrameworks,
} from "@/lib/content";
import { getBlogPosts } from "@/lib/blog";

/**
 * One retrievable chunk of site content.
 *
 * The whole corpus is only ~5.5k tokens, so there is no vector store here and
 * no embedding step. Sections are scored by keyword overlap and the best ones
 * are sent — which keeps a typical request near 2k prompt tokens instead of
 * shipping the entire site on every message.
 */
export type Section = {
  /** Site path this content came from, used to cite sources in answers. */
  path: string;
  title: string;
  /** Extra terms to match on beyond the body text. */
  keywords: string[];
  body: string;
};

/** Always sent, regardless of the question: who the company is and what exists. */
export function coreFacts(): string {
  return [
    `ViramTech is an enterprise AI company based in Mumbai, Maharashtra, India.`,
    `Tagline: ${TAGLINE}`,
    `Vision: ${visionMission.vision}`,
    `Mission: ${visionMission.mission}`,
    ``,
    `Products (path -> name: what it does):`,
    ...products.map((p) => `- /products/${p.slug} -> ${p.name}: ${p.summary}`),
    ``,
    `Industries served (path -> name: focus):`,
    ...sectors.map((s) => `- /industries/${s.slug} -> ${s.name}: ${s.tagline}`),
    ``,
    `Other pages: /for-startups (LaunchLine, idea to launch-ready company),`,
    `/work (shipped projects), /technology (AI stack), /blog, /contact.`,
  ].join("\n");
}

/** Every detail section, built once per process and reused across requests. */
let cached: Section[] | null = null;

export async function buildSections(): Promise<Section[]> {
  if (cached) return cached;

  const out: Section[] = [];

  for (const p of products) {
    out.push({
      path: `/products/${p.slug}`,
      title: p.name,
      keywords: [
        p.name,
        p.kicker,
        p.slug.replace(/-/g, " "),
        "product",
        "products",
        "solution",
        "platform",
        "offer",
      ],
      body: [
        `${p.name} — ${p.kicker}. ${p.summary}`,
        `Key features: ${p.features.join("; ")}.`,
        `Use cases: ${p.useCases}`,
        ...(p.useCaseList ?? []).map((u) => `- ${u.title}: ${u.body}`),
        ...(p.industries ?? []).map((i) => `- For ${i.name}: ${i.solution}`),
      ].join("\n"),
    });
  }

  for (const s of sectors) {
    out.push({
      path: `/industries/${s.slug}`,
      title: s.name,
      keywords: [
        s.name,
        s.short,
        s.slug,
        "industry",
        "industries",
        "sector",
        "vertical",
      ],
      body: [
        `${s.name} — ${s.tagline}. ${s.overview}`,
        `What we do: ${s.points.join("; ")}.`,
        `Challenges addressed: ${s.challenges.join("; ")}.`,
        ...s.solutions.map((x) => `- ${x.title}: ${x.body}`),
        `Reported metrics: ${s.metrics.map((m) => `${m.value} ${m.label}`).join("; ")}.`,
      ].join("\n"),
    });
  }

  out.push({
    path: "/about/why",
    title: "Why ViramTech",
    keywords: ["why", "differentiator", "advantage", "compare", "better"],
    body: whyUs.map((w) => `- ${w.title}: ${w.body}`).join("\n"),
  });

  out.push({
    path: "/about/roadmap",
    title: "Roadmap",
    keywords: ["roadmap", "phase", "plan", "future", "timeline"],
    body: roadmap
      .map((r) => `${r.phase} (${r.period}) — ${r.title} [${r.status}]: ${r.items.join("; ")}`)
      .join("\n"),
  });

  for (const [label, list] of [
    ["AI capabilities", aiCapabilities],
    ["Infrastructure", infrastructureComponents],
    ["Frameworks", aiFrameworks],
  ] as const) {
    out.push({
      path: "/technology",
      title: label,
      keywords: [label, "tech", "stack", "architecture", "infrastructure", "tools"],
      body: list
        .map((c) => `- ${c.name} (${c.tagline}): ${c.body}`)
        .join("\n"),
    });
  }

  // Blog posts are excerpt-only: enough for the bot to point at the right
  // article without pulling whole articles into the prompt budget.
  try {
    const posts = await getBlogPosts();
    for (const post of posts.filter((p) => !p.seo.noIndex)) {
      out.push({
        path: `/blog/${post.slug}`,
        title: post.title,
        keywords: [post.category, post.title],
        body: `${post.title} (${post.category}, ${post.date}): ${post.excerpt}`,
      });
    }
  } catch {
    // Sanity unreachable — the rest of the corpus still works.
  }

  cached = out;
  return out;
}

const STOP = new Set([
  "what","which","where","when","who","how","why","does","do","did","is","are",
  "was","were","the","a","an","and","or","for","to","of","in","on","with","your",
  "you","i","we","can","could","would","should","tell","me","about","it","this",
  "that","have","has","any","there","their","they","from","at","by","be","as",
]);

function terms(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** Cheap chars-per-token estimate; good enough for budgeting, never billing. */
export const estimateTokens = (text: string) => Math.ceil(text.length / 4);

/**
 * Picks the sections most likely to answer `question`, stopping once the token
 * budget is spent. Returns everything needed to build the grounding block.
 */
export async function retrieve(question: string, budgetTokens = 1800) {
  const sections = await buildSections();
  const qt = terms(question);

  const scored = sections
    .map((s) => {
      const hay = `${s.title} ${s.keywords.join(" ")} ${s.body}`.toLowerCase();
      // Title and keyword hits weigh more than a mention buried in the body.
      const head = `${s.title} ${s.keywords.join(" ")}`.toLowerCase();
      let score = 0;
      for (const t of qt) {
        if (head.includes(t)) score += 3;
        else if (hay.includes(t)) score += 1;
      }
      return { section: s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked: Section[] = [];
  let used = 0;
  for (const { section } of scored) {
    const cost = estimateTokens(section.body);
    if (used + cost > budgetTokens) continue;
    picked.push(section);
    used += cost;
    if (picked.length >= 6) break;
  }
  return { picked, usedTokens: used, matched: scored.length };
}
