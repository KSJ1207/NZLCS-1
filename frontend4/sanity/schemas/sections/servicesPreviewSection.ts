import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const servicesPreviewSection = defineType({
  name: "servicesPreviewSection",
  title: "Services Preview",
  type: "object",
  icon: CaseIcon,
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
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      validation: (r) => r.max(400),
    }),
    defineField({
      name: "showAll",
      title: "Show all services",
      description: "If on, all published services are shown automatically. If off, pick services manually below.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "services",
      title: "Services",
      description: "Pick which services to show. Order is preserved.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      hidden: ({ parent }) => parent?.showAll === true,
    }),
  ],
  preview: {
    select: { heading: "heading", services: "services", showAll: "showAll" },
    prepare({ heading, services, showAll }) {
      const count = Array.isArray(services) ? services.length : 0;
      const subtitle = showAll
        ? "All services"
        : count
          ? `${count} service${count === 1 ? "" : "s"}`
          : "No services picked";
      return {
        title: `Services Preview · ${heading || "Untitled"}`,
        subtitle,
      };
    },
  },
});
