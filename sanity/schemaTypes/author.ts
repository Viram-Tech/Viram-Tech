import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

/**
 * A person who writes posts. A reference rather than fields on the post, so one
 * author can be edited once and reflected across everything they have written.
 *
 * A named author with a stated role is what lets a post claim real expertise in
 * search — an article attributed only to a company carries less weight.
 */
export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Shown under the byline, e.g. “Head of AI Engineering”.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 3,
      description: "One or two sentences on their background and expertise.",
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      description: "Helps search engines connect this byline to a real person.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
