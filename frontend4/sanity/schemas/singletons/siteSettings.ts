import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "contact", title: "Contact" },
    { name: "socials", title: "Socials" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      description: "Full name. Used as the site title and as the alt text for the logo.",
      type: "string",
      group: "business",
      initialValue: "NZ Laser Cleaning Solutions",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      description:
        "Brand mark shown next to the logo in the header (e.g. 'NZLCS').",
      type: "string",
      group: "business",
      initialValue: "NZLCS",
      validation: (r) => r.required().max(12),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short descriptor used near the logo and in the footer.",
      type: "string",
      group: "business",
      validation: (r) => r.max(140),
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      description: "Displayed in the footer and on the contact page. Format as you want it shown, e.g. '021 419 933'.",
      type: "string",
      group: "contact",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "primaryEmail",
      title: "Primary email",
      description: "Main contact address, e.g. info@nzlcs.com.",
      type: "string",
      group: "contact",
      validation: (r) =>
        r
          .required()
          .email()
          .error("Enter a valid email address"),
    }),
    defineField({
      name: "secondaryEmail",
      title: "Secondary email",
      description: "Optional second address shown alongside the primary one.",
      type: "string",
      group: "contact",
      validation: (r) => r.email().error("Enter a valid email address"),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      group: "contact",
      fields: [
        { name: "street", title: "Street", type: "string" },
        { name: "suburb", title: "Suburb", type: "string" },
        {
          name: "city",
          title: "City",
          type: "string",
          validation: (r) => r.required(),
        },
        { name: "postcode", title: "Postcode", type: "string" },
        { name: "region", title: "Region / Country", type: "string" },
      ],
    }),
    defineField({
      name: "serviceAreas",
      title: "Service areas",
      description: "Cities or regions you serve, e.g. 'Auckland', 'Wellington'.",
      type: "array",
      group: "contact",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "socials",
      title: "Social media",
      type: "array",
      group: "socials",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
              validation: (r) => r.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (r) =>
                r
                  .required()
                  .uri({ scheme: ["http", "https"] }),
            },
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      description: "Short paragraph shown near the footer logo.",
      type: "text",
      rows: 2,
      group: "footer",
    }),
    defineField({
      name: "legalLine",
      title: "Legal / copyright line",
      description:
        "Bottom-of-footer line. Use {year} as a placeholder for the current year, e.g. '© {year} NZLCS. All rights reserved.'",
      type: "string",
      group: "footer",
      initialValue: "© {year} NZLCS. All rights reserved.",
    }),
    defineField({
      name: "privacyUrl",
      title: "Privacy policy URL",
      description: "Optional. Linked from the footer if provided.",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "termsUrl",
      title: "Terms of service URL",
      description: "Optional. Linked from the footer if provided.",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "defaultSEO",
      title: "Default SEO",
      description:
        "Used as a fallback for any page that doesn't define its own SEO.",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "businessName" },
    prepare({ title }) {
      return { title: title || "Site Settings", subtitle: "Singleton" };
    },
  },
});
