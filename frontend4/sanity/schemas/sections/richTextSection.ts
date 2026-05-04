import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich Text",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.max(140),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
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
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
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
      name: "image",
      title: "Side image",
      description:
        "Optional. When set, the section renders as a two-column layout with the image on the right.",
      type: "richImage",
    }),
    defineField({
      name: "imagePosition",
      title: "Image position",
      description: "Which side the image sits on (when an image is set).",
      type: "string",
      options: {
        list: [
          { title: "Right", value: "right" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
      },
      initialValue: "right",
      hidden: ({ parent }) => !parent?.image,
    }),
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return {
        title: `Rich Text · ${heading || "Untitled"}`,
      };
    },
  },
});
