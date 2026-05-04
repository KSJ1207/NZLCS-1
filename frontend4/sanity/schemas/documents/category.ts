import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "appliesTo",
      title: "Applies to",
      description:
        "Where this category should appear. Tick Blog to use it on posts, Gallery to use it on projects, or both.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Blog", value: "post" },
          { title: "Gallery", value: "project" },
        ],
        layout: "list",
      },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description:
        "Optional. Lower numbers appear first in the filter bar. Leave blank to sort alphabetically by title.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "appliesTo" },
    prepare({ title, subtitle }) {
      const list = Array.isArray(subtitle) ? subtitle : [];
      const labels = list
        .map((s) => (s === "post" ? "Blog" : s === "project" ? "Gallery" : s))
        .join(" · ");
      return { title, subtitle: labels || "—" };
    },
  },
  orderings: [
    {
      title: "Custom order, then title",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
});
