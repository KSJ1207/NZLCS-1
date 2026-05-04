import { RocketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const ctaSection = defineType({
  name: "ctaSection",
  title: "Call to Action",
  type: "object",
  icon: RocketIcon,
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
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (r) => r.max(400),
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "cta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "backgroundStyle",
      title: "Background style",
      type: "string",
      options: {
        list: [
          { title: "Solid (surface)", value: "solid" },
          { title: "Brand gradient", value: "gradient" },
          { title: "Background image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "solid",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "richImage",
      hidden: ({ parent }) => parent?.backgroundStyle !== "image",
    }),
  ],
  preview: {
    select: { heading: "heading", style: "backgroundStyle" },
    prepare({ heading, style }) {
      return {
        title: `CTA · ${heading || "Untitled"}`,
        subtitle: style ? `${style} background` : undefined,
      };
    },
  },
});
