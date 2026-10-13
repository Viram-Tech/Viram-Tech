import fs from "node:fs";
import path from "node:path";
import data from "@/content/work.json";
import type { Project } from "@/components/HeroParallax";
import { validateCollection, URL_RULE } from "@/lib/collections";

// Projects for /work come from content/work.json — see content/README.md.
// Server-side only (reads the filesystem to check screenshots exist).

type WorkEntry = { title: string; subtitle: string; link: string; image?: string };

const entries = validateCollection<WorkEntry>(
  "work.json",
  data,
  {
    title: "string",
    subtitle: "string",
    link: URL_RULE,
    image: {
      pattern: /^(\/work\/\S+\.(png|jpe?g|webp|avif)|https:\/\/\S+)$/i,
      hint: 'must be a file in public/work/ like "/work/acme.png" (png, jpg, webp or avif)',
      optional: true,
    },
  },
  "title",
);

// Catch a screenshot path that points at a file nobody added.
for (const e of entries) {
  if (e.image?.startsWith("/") && !fs.existsSync(path.join(process.cwd(), "public", e.image))) {
    throw new Error(`[content/work.json] "${e.title}": image "${e.image}" not found — add the file to public${e.image}`);
  }
}

// Brand gradients for the fallback card, cycled so no one has to pick one.
const gradients = [
  "from-[#597CBD] to-[#14284E]",
  "from-[#597CBD] to-[#2A3E77]",
  "from-[#3F56A4] to-[#14284E]",
  "from-[#33A5DB] to-[#14284E]",
];

export const projects: Project[] = entries.map((e, i) => ({
  ...e,
  gradient: gradients[i % gradients.length],
}));
