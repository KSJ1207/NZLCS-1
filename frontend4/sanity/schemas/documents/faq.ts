import { HelpCircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    validation: (r) =>
                      r.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Optional. Surfaced as small labels under the answer.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description:
        "Optional. Lower numbers appear first when an FAQ section uses default sort.",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "question", tags: "tags" },
    prepare({ title, tags }) {
      const list = Array.isArray(tags) ? tags : [];
      return {
        title: title || "Untitled question",
        subtitle: list.length ? list.join(" · ") : undefined,
      };
    },
  },
  orderings: [
    {
      title: "Custom order, then question",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "question", direction: "asc" },
      ],
    },
  ],
});
