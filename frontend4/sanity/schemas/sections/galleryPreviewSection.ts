import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const galleryPreviewSection = defineType({
  name: "galleryPreviewSection",
  title: "Gallery Preview",
  type: "object",
  icon: ImagesIcon,
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
      name: "mode",
      title: "Selection mode",
      type: "string",
      options: {
        list: [
          { title: "Latest projects automatically", value: "latest" },
          { title: "Pick projects manually", value: "manual" },
        ],
        layout: "radio",
      },
      initialValue: "latest",
    }),
    defineField({
      name: "count",
      title: "How many to show",
      description: "Used when mode is 'Latest projects automatically'.",
      type: "number",
      initialValue: 3,
      validation: (r) => r.min(1).max(12),
      hidden: ({ parent }) => parent?.mode !== "latest",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      description: "Pick specific projects to feature.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      hidden: ({ parent }) => parent?.mode !== "manual",
    }),
  ],
  preview: {
    select: { heading: "heading", mode: "mode", count: "count", projects: "projects" },
    prepare({ heading, mode, count, projects }) {
      const subtitle =
        mode === "manual"
          ? `${(projects ?? []).length} picked`
          : `Latest ${count ?? 3}`;
      return {
        title: `Gallery Preview · ${heading || "Untitled"}`,
        subtitle,
      };
    },
  },
});
