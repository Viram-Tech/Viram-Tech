import { HeroParallax } from "@/components/HeroParallax";
import { projects } from "@/lib/work";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Our Work",
  description: "Selected ViramTech projects — production AI and websites we have shipped.",
  path: "/work",
});

// Projects live in content/work.json (screenshots in public/work/) — add a new
// one there; see content/README.md. Order matters: the first project sits
// top-right of the parallax, the last bottom-left.

export default function Work() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([["Our Work", "/work"]]))} />
      <HeroParallax projects={projects} />
    </>
  );
}
