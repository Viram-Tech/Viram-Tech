import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

// The "Blog post" model non-devs fill in from the Studio dashboard.
export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & social" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      description: "The last part of the article URL, e.g. /blog/your-slug.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      description:
        "Who wrote this. Leave empty to publish under the ViramTech name.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
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
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "One or two sentences shown on the blog list and previews.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "Optional. Shown at the top of the post and in the grid.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description:
            "Describes the image for screen readers and search engines. Leave empty if it is purely decorative.",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              description:
                "Describes the image for screen readers and search engines.",
            }),
          ],
        }),
      ],
      description: "The full article. Use headings, lists, links and images.",
    }),
    defineField({
      name: "seo",
      title: "SEO & social",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
