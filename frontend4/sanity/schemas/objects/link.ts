import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "linkType",
      title: "Link type",
      type: "string",
      options: {
        list: [
          { title: "Internal page", value: "internal" },
          { title: "External URL", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "internal",
      title: "Internal page",
      description: "Choose a page, service, post, or project on this site.",
      type: "reference",
      to: [
        { type: "homePage" },
        { type: "page" },
        { type: "service" },
        { type: "post" },
        { type: "project" },
      ],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: (r) =>
        r.custom((value, ctx) => {
          const parent = ctx.parent as { linkType?: string } | undefined;
          if (parent?.linkType === "internal" && !value) {
            return "Pick a page to link to";
          }
          return true;
        }),
    }),
    defineField({
      name: "external",
      title: "External URL",
      description: "Full URL including https://, mailto:, or tel:",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (r) =>
        r
          .uri({
            allowRelative: false,
            scheme: ["http", "https", "mailto", "tel"],
          })
          .custom((value, ctx) => {
            const parent = ctx.parent as { linkType?: string } | undefined;
            if (parent?.linkType === "external" && !value) {
              return "Provide a URL";
            }
            return true;
          }),
    }),
    defineField({
      name: "newTab",
      title: "Open in new tab",
      description: "Recommended for external links.",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
