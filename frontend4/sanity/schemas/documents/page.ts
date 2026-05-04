import { DocumentsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const SECTION_TYPES = [
  "heroSection",
  "servicesPreviewSection",
  "servicesDetailedSection",
  "galleryPreviewSection",
  "testimonialsSection",
  "ctaSection",
  "richTextSection",
  "statsSection",
  "valuesSection",
  "brandsSection",
  "faqSection",
] as const;

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      description: "Used in the studio and as a fallback for SEO meta title.",
      type: "string",
      group: "settings",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "URL path. 'about' becomes /about. Cannot be 'home' (that's the Home Page singleton).",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (r) =>
        r
          .required()
          .custom((value) =>
            value?.current === "home"
              ? "'home' is reserved — use the Home Page singleton instead"
              : true,
          ),
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      description:
        "Drag and drop sections in the order you want them rendered.",
      type: "array",
      group: "content",
      of: SECTION_TYPES.map((t) => defineArrayMember({ type: t })),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      description:
        "If left blank, falls back to the page title and the default SEO in Site Settings.",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return {
        title: title || "Untitled page",
        subtitle: slug ? `/${slug}` : "no slug",
      };
    },
  },
});
