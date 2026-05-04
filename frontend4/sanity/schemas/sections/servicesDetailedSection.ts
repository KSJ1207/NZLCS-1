import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const servicesDetailedSection = defineType({
  name: "servicesDetailedSection",
  title: "Services (Detailed)",
  type: "object",
  icon: CaseIcon,
  description:
    "Renders each picked service as a full block with intro, how it works, applications grid, and benefits grid. Used on the services page.",
  fields: [
    defineField({
      name: "showAll",
      title: "Show all services",
      description:
        "If on, all published services are shown automatically in their default order.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "services",
      title: "Services",
      description: "Pick which services to render. Order is preserved.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      hidden: ({ parent }) => parent?.showAll === true,
    }),
  ],
  preview: {
    select: { services: "services", showAll: "showAll" },
    prepare({ services, showAll }) {
      const count = Array.isArray(services) ? services.length : 0;
      const subtitle = showAll
        ? "All services"
        : count
          ? `${count} service${count === 1 ? "" : "s"}`
          : "No services picked";
      return { title: "Services (Detailed)", subtitle };
    },
  },
});
