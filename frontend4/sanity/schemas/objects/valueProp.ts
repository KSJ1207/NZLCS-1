import { defineField, defineType } from "sanity";

export const valueProp = defineType({
  name: "valueProp",
  title: "Value proposition",
  type: "object",
  fields: [
    defineField({
      name: "numberLabel",
      title: "Number label",
      description: "Optional. Shown in front of the title, e.g. '01'.",
      type: "string",
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Optional small label above the title, e.g. 'Environment'.",
      type: "string",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      description:
        "Lucide icon name (e.g. 'leaf', 'crosshair', 'search', 'layout', 'shield-check'). Optional.",
      type: "string",
      options: {
        list: [
          { title: "Leaf (environment)", value: "leaf" },
          { title: "Crosshair (precision)", value: "crosshair" },
          { title: "Search (integrity / inspection)", value: "search" },
          { title: "Layout (partnership / structure)", value: "layout" },
          { title: "Shield (safety)", value: "shield-check" },
          { title: "Mobile (truck)", value: "truck" },
          { title: "Spark (energy)", value: "zap" },
          { title: "Gauge (precision)", value: "gauge" },
          { title: "Wrench (work)", value: "wrench" },
        ],
      },
    }),
    defineField({
      name: "accentColor",
      title: "Accent colour",
      description:
        "Hex value used for the icon tint and the card's top border. Leave blank for the default brand colour.",
      type: "string",
      placeholder: "#D4934F",
    }),
    defineField({
      name: "image",
      title: "Image",
      description:
        "Optional. When set, the card renders with the image at the top (used by the homepage 'Why choose us' section). Otherwise an icon-only card is used.",
      type: "richImage",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow", number: "numberLabel" },
    prepare({ title, subtitle, number }) {
      const prefix = number ? `${number}. ` : "";
      return {
        title: `${prefix}${title || "Untitled value"}`,
        subtitle: subtitle || undefined,
      };
    },
  },
});
