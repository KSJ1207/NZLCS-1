import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      description: "The customer's words.",
      type: "text",
      rows: 5,
      validation: (r) => r.required().max(600),
    }),
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "authorRole",
      title: "Author role / title",
      type: "string",
      validation: (r) => r.max(80),
    }),
    defineField({
      name: "authorCompany",
      title: "Author company",
      type: "string",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "authorImage",
      title: "Author photo",
      type: "richImage",
    }),
    defineField({
      name: "relatedProject",
      title: "Related project",
      description: "Optional. Links the testimonial to a gallery project.",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description:
        "If on, this testimonial is prioritised in the testimonial section's default order.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      quote: "quote",
      author: "authorName",
      company: "authorCompany",
      media: "authorImage",
    },
    prepare({ quote, author, company, media }) {
      const title = author ? author : (quote ? `"${quote.slice(0, 60)}…"` : "Untitled");
      const subtitle = company ? `${company}` : undefined;
      return { title, subtitle, media };
    },
  },
  orderings: [
    {
      title: "Featured first",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "authorName", direction: "asc" },
      ],
    },
  ],
});
