import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      description:
        "Shown in browser tabs and search results. Aim for 50–60 characters. If left blank, the page title or site default is used.",
      type: "string",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description:
        "1–2 sentence summary shown in search results. Aim for 140–160 characters.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      description:
        "Image shown when this page is shared on social media. Recommended 1200×630.",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      description:
        "Tick to add a noindex tag. Use for staging or pages you don't want crawled.",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
