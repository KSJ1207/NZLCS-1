import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes, SINGLETON_TYPES } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";

const SINGLETON_SET: ReadonlySet<string> = new Set(SINGLETON_TYPES);

// Page documents that have a pinned slot in the sidebar (see sanity/structure.ts).
// Deleting or duplicating one would leave the sidebar entry pointing at nothing,
// so we filter those actions out the same way we do for singletons.
const PINNED_PAGE_IDS: ReadonlySet<string> = new Set([
  "page-about",
  "page-services",
  "page-contact",
  "page-gallery",
  "page-blog",
]);

// Where in the live site each document type renders. Used by the Presentation
// tool's "Open in editor" deep links and by the Locations panel.
const locations = {
  homePage: defineLocations({
    locations: [{ title: "Home", href: "/" }],
    message: "This is the home page.",
  }),
  page: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? "Untitled page",
          href: doc?.slug ? `/${doc.slug}` : "/",
        },
      ],
    }),
  }),
  service: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? "Untitled service",
          href: doc?.slug ? `/services/${doc.slug}` : "/services",
        },
      ],
    }),
  }),
  post: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? "Untitled post",
          href: doc?.slug ? `/blog/${doc.slug}` : "/blog",
        },
      ],
    }),
  }),
  project: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? "Untitled project",
          href: doc?.slug ? `/gallery/${doc.slug}` : "/gallery",
        },
      ],
    }),
  }),
  siteSettings: defineLocations({
    locations: [{ title: "Home", href: "/" }],
    message: "Site Settings appear in the header, footer, and metadata of every page.",
  }),
  navigation: defineLocations({
    locations: [{ title: "Home", href: "/" }],
    message: "Navigation links appear in the header and footer of every page.",
  }),
};

export default defineConfig({
  name: "default",
  title: "NZLCS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: { locations },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
  document: {
    actions: (input, { schemaType, documentId }) => {
      if (SINGLETON_SET.has(schemaType)) {
        return input.filter(
          ({ action }) =>
            action !== "duplicate" && action !== "delete" && action !== "unpublish",
        );
      }
      if (documentId && PINNED_PAGE_IDS.has(documentId)) {
        return input.filter(
          ({ action }) => action !== "duplicate" && action !== "delete",
        );
      }
      return input;
    },
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((option) => !SINGLETON_SET.has(option.templateId))
        : prev,
  },
});
