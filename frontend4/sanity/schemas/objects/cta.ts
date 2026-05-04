import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: "The text shown on the button or link.",
      type: "string",
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "style",
      title: "Style",
      description: "Visual treatment. Primary is the strongest emphasis.",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Ghost (text only)", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "style" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled CTA",
        subtitle: subtitle ? `${subtitle} button` : "primary button",
      };
    },
  },
});
