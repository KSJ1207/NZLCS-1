import { HelpCircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ",
  type: "object",
  icon: HelpCircleIcon,
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
      name: "faqs",
      title: "FAQs",
      description: "Pick which FAQs to show in this section. Order is preserved.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { heading: "heading", faqs: "faqs" },
    prepare({ heading, faqs }) {
      const count = Array.isArray(faqs) ? faqs.length : 0;
      return {
        title: `FAQ · ${heading || "Untitled"}`,
        subtitle: `${count} FAQ${count === 1 ? "" : "s"}`,
      };
    },
  },
});
