import { defineField, defineType } from "sanity";

export const partnerBrand = defineType({
  name: "partnerBrand",
  title: "Partner brand",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Brand name",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Brand logo image. SVG or PNG with transparent background works best.",
      type: "richImage",
    }),
    defineField({
      name: "url",
      title: "Website URL",
      description: "Optional link to the partner's website.",
      type: "url",
      validation: (r) =>
        r.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
