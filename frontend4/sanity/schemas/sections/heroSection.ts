import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Optional small label above the heading.",
      type: "string",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      description: "Main hero heading.",
      type: "string",
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      description: "Supporting paragraph below the heading.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(400),
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      description: "Optional background image. Falls back to a solid color if blank.",
      type: "richImage",
    }),
    defineField({
      name: "primaryCta",
      title: "Primary call to action",
      type: "cta",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary call to action",
      type: "cta",
    }),
    defineField({
      name: "serviceLinks",
      title: "Service nav strip",
      description:
        "Optional. When set, the hero shows a strip at the bottom with '001 — Service Title' anchors that scroll to each service block on the same page (used on the services page).",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
  ],
  preview: {
    select: { heading: "heading", eyebrow: "eyebrow", media: "backgroundImage" },
    prepare({ heading, eyebrow, media }) {
      return {
        title: `Hero · ${heading || "Untitled"}`,
        subtitle: eyebrow || undefined,
        media,
      };
    },
  },
});
