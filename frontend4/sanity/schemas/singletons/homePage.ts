import { HomeIcon } from "@sanity/icons";
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

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal title",
      description:
        "For studio reference only — never displayed publicly. Defaults to 'Home Page'.",
      type: "string",
      group: "content",
      initialValue: "Home Page",
      readOnly: true,
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      description:
        "Drag and drop sections in the order you want them rendered on the home page.",
      type: "array",
      group: "content",
      of: SECTION_TYPES.map((t) => defineArrayMember({ type: t })),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      description:
        "If left blank, falls back to the default SEO in Site Settings.",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page", subtitle: "Singleton" };
    },
  },
});
