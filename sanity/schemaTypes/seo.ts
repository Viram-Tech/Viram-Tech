import { defineField, defineType } from "sanity";

/**
 * Reusable per-document search/social overrides.
 *
 * Modelled as an object rather than loose fields because SEO metadata belongs
 * to one document and is never shared between them. Every field is optional —
 * the frontend falls back to the post's own title, excerpt and cover image, so
 * writers only fill these in when they want something different.
 */
export const seoType = defineType({
  name: "seo",
  title: "SEO & social",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description:
        "Overrides the headline shown in search results. Aim for under 60 characters; leave empty to use the post title.",
      validation: (rule) => rule.max(60).warning("Titles over 60 characters get truncated by Google."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description:
        "The snippet under the search result. Aim for 120–160 characters; leave empty to use the excerpt.",
      validation: (rule) => rule.max(160).warning("Descriptions over 160 characters get truncated by Google."),
    }),
    defineField({
      name: "image",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
      description:
        "Shown when the post is shared on LinkedIn, Slack or X. 1200×630 works best. Leave empty to use the cover image.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
      description:
        "Keeps the post live on the site but tells Google not to index it, and drops it from the sitemap.",
    }),
  ],
});
