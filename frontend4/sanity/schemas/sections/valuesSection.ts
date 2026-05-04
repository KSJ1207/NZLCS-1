import { HeartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const valuesSection = defineType({
  name: "valuesSection",
  title: "Values",
  type: "object",
  icon: HeartIcon,
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
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      validation: (r) => r.max(400),
    }),
    defineField({
      name: "values",
      title: "Values",
      description: "4 cards typically work best.",
      type: "array",
      of: [{ type: "valueProp" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "footnote",
      title: "Footnote",
      description: "Optional sentence shown below the value cards.",
      type: "text",
      rows: 2,
      validation: (r) => r.max(280),
    }),
  ],
  preview: {
    select: { heading: "heading", values: "values" },
    prepare({ heading, values }) {
      const count = Array.isArray(values) ? values.length : 0;
      return {
        title: `Values · ${heading || "Untitled"}`,
        subtitle: `${count} card${count === 1 ? "" : "s"}`,
      };
    },
  },
});
