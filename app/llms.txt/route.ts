import { products, sectors } from "@/lib/content";
import { getBlogPosts } from "@/lib/blog";
import { SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from "@/lib/seo";

// Regenerated hourly alongside the sitemap so new posts appear without a deploy.
export const revalidate = 3600;

/**
 * /llms.txt — the llmstxt.org convention: a single Markdown map of the site for
 * LLM-based search and assistants, which read this far more cheaply than they
 * crawl rendered HTML. Built from the same sources as the sitemap so the two
 * cannot drift apart.
 */
export async function GET() {
  const posts = await getBlogPosts();

  const line = (name: string, url: string, note: string) =>
    `- [${name}](${url}): ${note}`;

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is an enterprise AI company based in Mumbai, India. We build, deploy
and scale AI systems into production — owning the data, the infrastructure and
the outcome rather than handing over a prototype.

## Core pages

${line("Home", absoluteUrl("/"), "Overview of what we build and how we work")}
${line("AI Products", absoluteUrl("/products"), "The full product suite")}
${line("Industries", absoluteUrl("/industries"), "Sector-specific AI solutions")}
${line("Technology", absoluteUrl("/technology"), "Our AI stack and architecture")}
${line("LaunchLine", absoluteUrl("/for-startups"), "Idea to launch-ready company in eight phases")}
${line("Our Work", absoluteUrl("/work"), "Projects we have shipped")}
${line("Contact", absoluteUrl("/contact"), "Start a conversation")}

## Products

${products
  .map((p) => line(p.name, absoluteUrl(`/products/${p.slug}`), p.summary))
  .join("\n")}

## Industries

${sectors
  .map((s) => line(s.name, absoluteUrl(`/industries/${s.slug}`), s.tagline))
  .join("\n")}

## Writing

${posts
  .filter((p) => !p.seo.noIndex)
  .map((p) => line(p.title, absoluteUrl(`/blog/${p.slug}`), p.excerpt))
  .join("\n")}

## Company

${line("Our Vision", absoluteUrl("/about/vision"), "AI-native, enterprise-ready, results-driven")}
${line(`Why ${SITE_NAME}`, absoluteUrl("/about/why"), "Speed to value, industry expertise, full-stack control")}
${line("Market Opportunity", absoluteUrl("/about/market"), "The enterprise shift to AI-first")}
${line("Our Roadmap", absoluteUrl("/about/roadmap"), "From pilots to scale to market leadership")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
