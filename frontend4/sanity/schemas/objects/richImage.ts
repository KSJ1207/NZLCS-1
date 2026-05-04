import { defineField, defineType } from "sanity";

export const richImage = defineType({
  name: "richImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      description:
        "Describe the image for screen readers and search engines. Required.",
      type: "string",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      description: "Optional. Displayed below the image where supported.",
      type: "string",
      validation: (r) => r.max(200),
    }),
  ],
});
