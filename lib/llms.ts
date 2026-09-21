/**
 * Helpers for the plain-text routes that exist for AI crawlers rather than
 * browsers: /llms.txt, /llms-full.txt and /index.html.md.
 *
 * These are generated from the same `lib/content` and Sanity sources the pages
 * render from, so the text an assistant reads cannot drift from the site.
 */

/** Response headers shared by every crawler route. Cached like the sitemap. */
export const textHeaders = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=3600",
} as const;

export const mdHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=3600",
} as const;

/** `- [Name](url): note` — the link shape llmstxt.org specifies. */
export function link(name: string, url: string, note: string): string {
  return `- [${name}](${url}): ${note}`;
}

/** Drops empty sections so the output never has a heading with nothing under it. */
export function section(heading: string, body: string): string {
  const trimmed = body.trim();
  return trimmed ? `${heading}\n\n${trimmed}\n` : "";
}

export function bullets(items: readonly string[]): string {
  return items.map((i) => `- ${i}`).join("\n");
}

/* ------------------------------------------------------------------ */
/* Portable Text                                                       */
/* ------------------------------------------------------------------ */

type Span = { _type?: string; text?: string };
type Block = {
  _type?: string;
  style?: string;
  listItem?: string;
  children?: Span[];
};

/**
 * Flattens Sanity Portable Text to Markdown.
 *
 * Only the block types the blog actually authors are mapped — headings, quotes,
 * list items and paragraphs. Anything else (images, embeds) contributes no text
 * and is skipped rather than rendered as a placeholder, since a crawler gains
 * nothing from "[image]".
 */
export function portableTextToMarkdown(
  blocks: unknown[] | null,
  /**
   * Heading level an authored h1 maps to. Post bodies are nested under a `###`
   * title in llms-full.txt, so they pass 4 — otherwise an authored h2 would
   * outrank the heading of the post it belongs to.
   */
  baseLevel = 1,
): string {
  if (!blocks?.length) return "";

  const heading = (authored: number, text: string) =>
    `${"#".repeat(Math.min(6, baseLevel + authored - 1))} ${text}`;

  const out: string[] = [];

  for (const raw of blocks) {
    const block = raw as Block;
    if (block?._type !== "block") continue;

    const text = (block.children ?? [])
      .filter((c) => c?._type === "span" && typeof c.text === "string")
      .map((c) => c.text)
      .join("")
      .trim();
    if (!text) continue;

    if (block.listItem) {
      out.push(`- ${text}`);
      continue;
    }

    switch (block.style) {
      case "h1":
        out.push(heading(1, text));
        break;
      case "h2":
        out.push(heading(2, text));
        break;
      case "h3":
        out.push(heading(3, text));
        break;
      case "h4":
        out.push(heading(4, text));
        break;
      case "blockquote":
        out.push(`> ${text}`);
        break;
      default:
        out.push(text);
    }
  }

  // Consecutive list items belong to one list, so they get single-spaced;
  // everything else gets a blank line between it and its neighbour.
  return out
    .map((lineText, i) => {
      const next = out[i + 1];
      if (!next) return lineText;
      const bothList = lineText.startsWith("- ") && next.startsWith("- ");
      return bothList ? lineText : `${lineText}\n`;
    })
    .join("\n");
}
