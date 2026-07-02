import { defineField, defineType } from "sanity";

// The "Blog post" model non-devs fill in from the Studio dashboard.
export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "The last part of the article URL, e.g. /blog/your-slug.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Enterprise AI", "Agentic AI", "Data", "MLOps"],
        layout: "radio",
      },
      initialValue: "Enterprise AI",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the blog list and previews.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Optional. Shown at the top of the post and in the grid.",
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      description: "The full article. Use headings, lists, links and images.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
