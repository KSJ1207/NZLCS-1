import {
  CaseIcon,
  CogIcon,
  EditIcon,
  EnvelopeIcon,
  HomeIcon,
  ImagesIcon,
  InfoOutlineIcon,
  MenuIcon,
  TagIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// Doc types that have a pinned slot above OR are accessed only through
// references on a parent page (service, testimonial, faq) — these stay out
// of the auto-fallback so they don't reappear at the bottom of the sidebar.
const PINNED_OR_HIDDEN_TYPES = new Set([
  "siteSettings",
  "navigation",
  "homePage",
  "page",
  "service",
  "post",
  "project",
  "testimonial",
  "faq",
  "category",
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Site-wide settings
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),
      S.listItem()
        .title("Navigation")
        .icon(MenuIcon)
        .child(
          S.editor()
            .id("navigation")
            .schemaType("navigation")
            .documentId("navigation"),
        ),

      S.divider(),

      // Pages — each one opens its document directly. Service Details,
      // Testimonials, and FAQs are reached through references inside these
      // pages, so they don't get their own sidebar slot.
      S.listItem()
        .title("Home Page")
        .icon(HomeIcon)
        .child(
          S.editor().id("homePage").schemaType("homePage").documentId("homePage"),
        ),
      S.listItem()
        .title("About")
        .icon(InfoOutlineIcon)
        .child(
          S.editor().id("page-about").schemaType("page").documentId("page-about"),
        ),
      S.listItem()
        .title("Services")
        .icon(CaseIcon)
        .child(
          S.editor()
            .id("page-services")
            .schemaType("page")
            .documentId("page-services"),
        ),
      S.listItem()
        .title("Contact")
        .icon(EnvelopeIcon)
        .child(
          S.editor()
            .id("page-contact")
            .schemaType("page")
            .documentId("page-contact"),
        ),

      S.divider(),

      // Collections
      S.listItem()
        .title("Blog Posts")
        .icon(EditIcon)
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog Posts")),
      S.listItem()
        .title("Gallery Projects")
        .icon(ImagesIcon)
        .schemaType("project")
        .child(S.documentTypeList("project").title("Gallery Projects")),
      S.listItem()
        .title("Tags")
        .icon(TagIcon)
        .schemaType("category")
        .child(S.documentTypeList("category").title("Tags")),

      S.divider(),

      // Catch any new document type someone adds to the schema later so it
      // isn't silently invisible. Anything we've already pinned or routed
      // through references is excluded.
      ...S.documentTypeListItems().filter(
        (item) => !PINNED_OR_HIDDEN_TYPES.has(item.getId() ?? ""),
      ),
    ]);
