import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials",
  type: "object",
  icon: CommentIcon,
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
      name: "testimonials",
      title: "Testimonials",
      description:
        "Pick which testimonials to show. Order is preserved. If left empty, the section renders just the heading (placeholder mode).",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    }),
  ],
  preview: {
    select: { heading: "heading", testimonials: "testimonials" },
    prepare({ heading, testimonials }) {
      const count = Array.isArray(testimonials) ? testimonials.length : 0;
      return {
        title: `Testimonials · ${heading || "Untitled"}`,
        subtitle: `${count} quote${count === 1 ? "" : "s"}`,
      };
    },
  },
});
