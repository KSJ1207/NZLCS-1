import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
    { name: "media", title: "Media & related" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Service title",
      description: "Full title, e.g. 'Rust & Oxide Removal'.",
      type: "string",
      group: "content",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL path under /services/.",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrowNumber",
      title: "Eyebrow / number label",
      description: "Optional label above the title, e.g. 'SERVICE 01'.",
      type: "string",
      group: "content",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "shortTitle",
      title: "Card title",
      description:
        "Optional shorter title for service cards on the homepage. Falls back to the full title.",
      type: "string",
      group: "content",
      validation: (r) => r.max(80),
    }),
    defineField({
      name: "shortDescription",
      title: "Card description",
      description: "1–2 sentence summary used on the homepage and listing pages.",
      type: "text",
      group: "content",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      description: "Opening paragraph on the service detail page.",
      type: "text",
      group: "details",
      rows: 5,
      validation: (r) => r.required().max(800),
    }),
    defineField({
      name: "howItWorks",
      title: "How it works",
      description: "Process / methodology paragraph.",
      type: "text",
      group: "details",
      rows: 5,
      validation: (r) => r.max(800),
    }),
    defineField({
      name: "applications",
      title: "Ideal applications",
      description: "Each application has a label and an optional Lucide icon.",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          name: "applicationItem",
          fields: [
            {
              name: "label",
              title: "Application",
              type: "string",
              validation: (r) => r.required().max(140),
            },
            {
              name: "icon",
              title: "Icon",
              description:
                "Lucide icon name. Pick one that visually matches the application.",
              type: "string",
              options: {
                list: [
                  { title: "Building", value: "building-2" },
                  { title: "Landmark / bridge", value: "landmark" },
                  { title: "Gauge / pipeline", value: "gauge" },
                  { title: "Car / vehicle", value: "car" },
                  { title: "Cog / machinery", value: "cog" },
                  { title: "Database / tank", value: "database" },
                  { title: "Anchor / marine", value: "anchor" },
                  { title: "Truck / fleet", value: "truck" },
                  { title: "Clipboard / inspection", value: "clipboard-check" },
                  { title: "Trending up", value: "trending-up" },
                  { title: "Rotate / restoration", value: "rotate-ccw" },
                  { title: "File search", value: "file-search" },
                  { title: "Settings", value: "settings" },
                  { title: "Wrench", value: "wrench" },
                  { title: "Layers", value: "layers" },
                  { title: "Eraser / cleanup", value: "eraser" },
                  { title: "Paintbrush", value: "paintbrush" },
                  { title: "Palette", value: "palette" },
                  { title: "Zap / energy", value: "zap" },
                ],
              },
            },
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    defineField({
      name: "benefits",
      title: "Key benefits",
      description: "Cards shown on the service detail page.",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          name: "benefit",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required().max(80),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (r) => r.required().max(400),
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "cardImage",
      title: "Card image",
      description:
        "Image shown on the home page services grid and the services list page. Recommended 4:3.",
      type: "richImage",
      group: "media",
    }),
    defineField({
      name: "icon",
      title: "Icon name",
      description:
        "Optional Lucide icon name (e.g. 'crosshair', 'leaf'). Used on cards and headings.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "beforeAfterImages",
      title: "Before / after images",
      description: "Optional pairs to show on the service detail page.",
      type: "array",
      group: "media",
      of: [
        {
          type: "object",
          name: "beforeAfterPair",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "before", title: "Before", type: "richImage" },
            { name: "after", title: "After", type: "richImage" },
          ],
          preview: { select: { title: "label", media: "before" } },
        },
      ],
    }),
    defineField({
      name: "relatedProjects",
      title: "Related projects",
      description: "Pick gallery projects that demonstrate this service.",
      type: "array",
      group: "media",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription" },
  },
  orderings: [
    {
      title: "Title (A → Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
