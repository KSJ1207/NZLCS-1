import { TrendUpwardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const brandsSection = defineType({
  name: "brandsSection",
  title: "Brands",
  type: "object",
  icon: TrendUpwardIcon,
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
      name: "brands",
      title: "Brands",
      type: "array",
      of: [{ type: "partnerBrand" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { heading: "heading", brands: "brands" },
    prepare({ heading, brands }) {
      const count = Array.isArray(brands) ? brands.length : 0;
      return {
        title: `Brands · ${heading || "Untitled"}`,
        subtitle: `${count} brand${count === 1 ? "" : "s"}`,
      };
    },
  },
});
