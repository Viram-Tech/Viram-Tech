import { products, sectors, gaps, vision, TAGLINE } from "@/lib/content";
import { SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from "@/lib/seo";
import { mdHeaders, link, bullets, section } from "@/lib/llms";

export const revalidate = 3600;

/**
 * /index.html.md — the homepage as Markdown.
 *
 * Same convention as /llms.txt, applied per page: an assistant that would
 * otherwise render the homepage's JSX, hero video and bento grid just to reach
 * the copy can fetch this instead. Composed from the same `lib/content` values
 * the homepage renders, so the two stay in step.
 */
export async function GET() {
  const body = `# ${SITE_NAME}

> ${TAGLINE}

${SITE_DESCRIPTION}

Canonical page: ${absoluteUrl("/")}

${section(
  `## What we do`,
  `We build, deploy and scale AI systems that reach production. Every engagement
covers the data, the infrastructure and the outcome — not a prototype handed
over at the end of a discovery phase.

- **Centralized neural architecture.** Deploy proprietary LLMs securely within
  your VPC, keeping control of training data while using state-of-the-art
  reasoning.
- **Owned end to end.** Data pipelines, model serving, monitoring and the
  interface teams actually use.
- **Measured on your numbers.** Anchored to the outcomes leadership already
  tracks, not model benchmarks.`,
)}
${section(
  `## The problem we exist to solve`,
  gaps.map((g) => `**${g.title}.** ${g.body}`).join("\n\n"),
)}
${section(
  `## How we approach it`,
  bullets(vision.map((v) => `**${v.title}.** ${v.body}`)),
)}
${section(
  `## Products`,
  products
    .map((p) => link(p.name, absoluteUrl(`/products/${p.slug}`), p.summary))
    .join("\n"),
)}
${section(
  `## Industries`,
  sectors
    .map((s) => link(s.name, absoluteUrl(`/industries/${s.slug}`), s.tagline))
    .join("\n"),
)}
${section(
  `## Where to go next`,
  `${link("Technology", absoluteUrl("/technology"), "Our AI stack and architecture")}
${link("Our Work", absoluteUrl("/work"), "Projects we have shipped")}
${link("LaunchLine", absoluteUrl("/for-startups"), "Idea to launch-ready company in eight phases")}
${link("Insights", absoluteUrl("/blog"), "Writing on enterprise AI")}
${link("Contact", absoluteUrl("/contact"), "Start a conversation")}`,
)}
${section(
  `## Related machine-readable files`,
  `${link("llms.txt", absoluteUrl("/llms.txt"), "Site map for LLMs — links and one-line notes")}
${link("llms-full.txt", absoluteUrl("/llms-full.txt"), "Full content: products, industries, case studies, posts")}`,
)}
---

${SITE_NAME} · Mumbai, Maharashtra · India
`;

  return new Response(body, { headers: mdHeaders });
}
