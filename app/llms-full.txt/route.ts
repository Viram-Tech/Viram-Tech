import {
  products,
  sectors,
  gaps,
  vision,
  visionMission,
  productCaseStudies,
  sectorCaseStudies,
  type CaseStudy,
} from "@/lib/content";
import { getBlogPosts } from "@/lib/blog";
import { SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from "@/lib/seo";
import {
  textHeaders,
  bullets,
  section,
  portableTextToMarkdown,
} from "@/lib/llms";

// Regenerated hourly alongside /llms.txt and the sitemap.
export const revalidate = 3600;

/**
 * /llms-full.txt — the long-form companion to /llms.txt.
 *
 * Where /llms.txt is a map (links plus one-line notes), this carries the actual
 * substance: every product's features and use cases, every sector's challenges
 * and solutions, the case studies, and the full text of each published post.
 * An assistant that reads this needs no further crawl to answer questions about
 * what ViramTech does.
 */
function renderCaseStudy(study: CaseStudy): string {
  return [
    `**Case study — ${study.client} (${study.industry})**`,
    ``,
    `- Challenge: ${study.challenge}`,
    `- Approach: ${study.approach}`,
    ...study.results.map((r) => `- Result: ${r.value} — ${r.label}`),
    ``,
    `> ${study.quote}`,
    `> — ${study.attribution}`,
  ].join("\n");
}

export async function GET() {
  const posts = (await getBlogPosts()).filter((p) => !p.seo.noIndex);

  const productSections = products
    .map((p) => {
      const parts = [
        `### ${p.name}`,
        ``,
        `${p.kicker}. ${p.summary}`,
        ``,
        `URL: ${absoluteUrl(`/products/${p.slug}`)}`,
        ``,
        `**Capabilities**`,
        ``,
        bullets(p.features),
      ];

      if (p.useCaseList?.length) {
        parts.push(
          ``,
          `**Use cases**`,
          ``,
          bullets(p.useCaseList.map((u) => `${u.title}: ${u.body}`)),
        );
      } else if (p.useCases) {
        parts.push(``, `**Use cases**`, ``, p.useCases);
      }

      if (p.industries?.length) {
        parts.push(
          ``,
          `**By industry**`,
          ``,
          bullets(p.industries.map((i) => `${i.name}: ${i.solution}`)),
        );
      }

      if (p.metrics?.length) {
        parts.push(
          ``,
          `**Impact**`,
          ``,
          bullets(p.metrics.map((m) => `${m.value} ${m.label}`)),
        );
      }

      const study = productCaseStudies[p.slug];
      if (study) parts.push(``, renderCaseStudy(study));

      return parts.join("\n");
    })
    .join("\n\n");

  const sectorSections = sectors
    .map((s) => {
      const parts = [
        `### ${s.name}`,
        ``,
        s.tagline,
        ``,
        `URL: ${absoluteUrl(`/industries/${s.slug}`)}`,
        ``,
        s.overview,
        ``,
        `**Where AI applies**`,
        ``,
        bullets(s.points),
        ``,
        `**Challenges we solve**`,
        ``,
        bullets(s.challenges),
        ``,
        `**Our solutions**`,
        ``,
        bullets(s.solutions.map((sol) => `${sol.title}: ${sol.body}`)),
        ``,
        `**Typical impact**`,
        ``,
        bullets(s.metrics.map((m) => `${m.value} — ${m.label}`)),
      ];

      const study = sectorCaseStudies[s.slug];
      if (study) parts.push(``, renderCaseStudy(study));

      return parts.join("\n");
    })
    .join("\n\n");

  const postSections = posts
    .map((p) => {
      // Bodies sit under a `###` title, so authored headings start at h4.
      const body = portableTextToMarkdown(p.body, 4);
      return [
        `### ${p.title.trim()}`,
        ``,
        `URL: ${absoluteUrl(`/blog/${p.slug}`)}`,
        `Category: ${p.category} · Published: ${p.date} · ${p.readTime}`,
        p.author ? `Author: ${p.author.name}${p.author.role ? `, ${p.author.role}` : ""}` : null,
        ``,
        p.excerpt.trim(),
        body ? `\n${body}` : "",
      ]
        .filter((l) => l !== null)
        .join("\n");
    })
    .join("\n\n---\n\n");

  const body = `# ${SITE_NAME} — full content for AI crawlers

> ${SITE_DESCRIPTION}

${SITE_NAME} is an enterprise AI company based in Mumbai, India. We build,
deploy and scale AI systems into production — owning the data, the
infrastructure and the outcome rather than handing over a prototype.

This file is the long-form companion to ${absoluteUrl("/llms.txt")}, which lists
the same pages as links only. Generated ${new Date().toISOString().slice(0, 10)}.

${section(
  `## Vision and mission`,
  `**Vision.** ${visionMission.vision}

**Mission.** ${visionMission.mission}

${bullets(vision.map((v) => `${v.title}: ${v.body}`))}`,
)}
${section(
  `## The enterprise AI gap`,
  `The four problems our work exists to close.

${gaps
  .map((g) => `**${g.title}.** ${g.body}\n\n${bullets(g.points)}`)
  .join("\n\n")}`,
)}
${section(`## Products`, productSections)}
${section(`## Industries`, sectorSections)}
${section(`## Writing`, postSections)}
${section(
  `## Company`,
  `- Our Vision: ${absoluteUrl("/about/vision")}
- Why ${SITE_NAME}: ${absoluteUrl("/about/why")}
- Market Opportunity: ${absoluteUrl("/about/market")}
- Our Roadmap: ${absoluteUrl("/about/roadmap")}
- Our Work: ${absoluteUrl("/work")}
- LaunchLine (for startups): ${absoluteUrl("/for-startups")}
- Contact: ${absoluteUrl("/contact")}`,
)}`;

  return new Response(body, { headers: textHeaders });
}
