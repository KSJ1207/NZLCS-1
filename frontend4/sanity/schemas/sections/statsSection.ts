import { BarChartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const statsSection = defineType({
  name: "statsSection",
  title: "Stats",
  type: "object",
  icon: BarChartIcon,
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
      name: "stats",
      title: "Stats",
      description: "Add a few number callouts. Recommended 3.",
      type: "array",
      of: [{ type: "stat" }],
      validation: (r) => r.required().min(1).max(6),
    }),
  ],
  preview: {
    select: { heading: "heading", stats: "stats" },
    prepare({ heading, stats }) {
      const count = Array.isArray(stats) ? stats.length : 0;
      return {
        title: `Stats · ${heading || "Untitled"}`,
        subtitle: `${count} stat${count === 1 ? "" : "s"}`,
      };
    },
  },
});
