import { EditIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: EditIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "meta",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      group: "content",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "category",
      type: "reference",
      group: "meta",
      to: [{ type: "category" }],
      options: {
        filter: '"post" in appliesTo',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      group: "meta",
      initialValue: "NZLCS Team",
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      group: "meta",
      description: "e.g. '5 min read'",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "body",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "External link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (r) =>
                      r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "coverImage" },
  },
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
