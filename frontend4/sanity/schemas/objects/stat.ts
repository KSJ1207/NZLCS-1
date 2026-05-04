import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      description:
        "The number or short string, e.g. '100+', '50+', 'NZ-wide'.",
      type: "string",
      validation: (r) => r.required().max(20),
    }),
    defineField({
      name: "label",
      title: "Label",
      description: "Short description, e.g. 'Projects Completed'.",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
