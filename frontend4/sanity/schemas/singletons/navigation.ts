import { MenuIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "headerLinks",
      title: "Header links",
      description: "Links shown in the main top navigation. Keep to 7 or fewer.",
      type: "array",
      group: "header",
      of: [{ type: "cta" }],
      validation: (r) => r.max(7),
    }),
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      description: "Each column has a title and a list of links.",
      type: "array",
      group: "footer",
      of: [
        {
          type: "object",
          name: "footerColumn",
          fields: [
            {
              name: "columnTitle",
              title: "Column title",
              type: "string",
              validation: (r) => r.required().max(40),
            },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "cta" }],
              validation: (r) => r.min(1),
            },
          ],
          preview: {
            select: { title: "columnTitle", links: "links" },
            prepare({ title, links }) {
              const count = Array.isArray(links) ? links.length : 0;
              return {
                title: title || "Untitled column",
                subtitle: `${count} link${count === 1 ? "" : "s"}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation", subtitle: "Singleton" };
    },
  },
});
