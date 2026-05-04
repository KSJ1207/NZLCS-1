# Sanity in this project

## Schema architecture

```
sanity/schemas/
├── singletons/      one-of-a-kind site content (siteSettings, navigation, homePage)
├── documents/       multi-instance content (page, service, post, project, testimonial, faq, category)
├── objects/         reusable building blocks (seo, link, cta, richImage, valueProp, stat, partnerBrand)
└── sections/        page-builder block types (10 types — hero, services, gallery, testimonials, cta, richText, stats, values, brands, faq)
```

All schema names are exported from `sanity/schemas/index.ts`. Singletons are listed in `SINGLETON_TYPES`; section types in `SECTION_TYPES` (used by `SectionRenderer`, queries, and types).

## Singletons

`siteSettings`, `navigation`, and `homePage` use a fixed deterministic `_id` matching the schema name. They:
- Open directly in the studio sidebar (no list view) — see `sanity/structure.ts`.
- Have `create`, `delete`, `duplicate`, and `unpublish` actions filtered out (see `sanity.config.ts` `document.actions`).
- Are hidden from the global "Create new" menu (`document.newDocumentOptions`).

`siteSettings` content is fetched once in `app/layout.tsx` and passed into `Header` + `Footer`. `homePage` is fetched in `app/page.tsx`.

## Pages (page-builder)

The `page` document has a `sections[]` array accepting any of the 10 section types. Each `page` has a `slug` that becomes the URL (`/about`, `/services`, `/contact`). The seeded pages are:
- `page-about` → `/about`
- `page-services` → `/services` (also pulls `allServicesQuery` for the cards section)
- `page-contact` → `/contact` (hero only — quote form + map are hardcoded)
- `page-gallery`, `page-blog` — stub pages so navigation references resolve; the actual list pages still render from existing post/project queries.

## Services (structured)

Service detail pages live at `/services/[slug]`. The `service` schema has a fixed shape (intro, howItWorks, applications, benefits, beforeAfterImages, relatedProjects) — no page-builder, because every service has the same structure. To change a service's layout, edit the component at `app/services/[slug]/page.tsx`.

## Section pattern

A page section is an inline object on a `sections[]` array, not a document. It has a `_type` and `_key`. The `SECTION_PROJECTION` fragment in `sanity/lib/queries.ts` resolves all 10 types in a single pass — section components do **not** fetch.

### How to add a new section type

1. **Schema** — `sanity/schemas/sections/<name>Section.ts`. Use `defineType({ name: 'xxxSection', type: 'object', icon, fields, preview })`. Add the icon import from `@sanity/icons`.
2. **Register** — add the import + entry in `sanity/schemas/index.ts` and append the type name to `SECTION_TYPES`.
3. **Allow on page-builder pages** — add the type name to the local `SECTION_TYPES` arrays in `sanity/schemas/documents/page.ts` AND `sanity/schemas/singletons/homePage.ts`.
4. **GROQ projection** — add a `_type == "xxxSection" => { ... }` block to `SECTION_PROJECTION` in `sanity/lib/queries.ts`. Inline-resolve any references.
5. **TypeScript type** — add a `XxxSection` type to `sanity/lib/types.ts` and include it in the `Section` discriminated union.
6. **Component** — `app/components/sections/XxxSection.tsx`. Pure presentational, takes `{ section: XxxSection }`, no fetching.
7. **Wire renderer** — add the case to `app/components/sections/SectionRenderer.tsx`. The default case has an exhaustiveness check (`_exhaustive: never`) — if you forget, TypeScript fails the build.
8. **Fixture** — `sanity/fixtures/sections/<name>.ts`. Realistic NZLCS content.
9. **Story** — `stories/sections/<Name>.stories.tsx` with at least `Default` and a couple of edge cases.

## Studio Desk structure

Defined in `sanity/structure.ts`. Order is intentional:
- Singletons pinned at top (Site Settings → Home Page → Navigation)
- Page-builder content (Pages, Services)
- Existing collections (Blog Posts, Gallery Projects)
- Reusable content (Testimonials, FAQs)
- Lookup data (Categories) at the bottom

Sections are not list-rendered — they only exist inside the `sections[]` array on `homePage` and `page` documents.

## Visual editing & draft mode

- Stega is enabled in `sanity/lib/fetch.ts` only when draft mode is active. Production renders are clean (no encoded markup in HTML).
- `<VisualEditing />` is mounted via the client wrapper `app/components/VisualEditingTrigger.tsx`, conditionally rendered in `app/layout.tsx` when `draftMode().isEnabled`.
- The Presentation tool is configured in `sanity.config.ts` with a per-type locations resolver (`page` → `/${slug}`, `service` → `/services/${slug}`, etc.).
- Draft mode entry/exit:
  - `/api/draft-mode/enable?secret=<SANITY_PREVIEW_SECRET>&path=/about` — general purpose, used by Presentation.
  - `/api/draft-mode/disable` — exit.
  - `/api/draft?secret=...&slug=/blog/<slug>` — legacy, scoped to blog/gallery (kept for back-compat).

To use Presentation locally: `npm run dev`, open `http://localhost:3000/studio`, click the Presentation tab. The preview pane loads the live site in draft mode.

## Webhooks (cache invalidation)

`app/api/revalidate/route.ts` listens for Sanity publish/unpublish webhooks and calls `revalidateTag(_type, "max")`. Site-wide types (`siteSettings`, `navigation`) also bust the global `layout` tag so every page picks up the change.

Sanity webhook payload projection:
```
{
  "_type": _type,
  "slug": slug.current
}
```

## Seed script

`npm run seed-content` populates the dataset with the current site's hardcoded content. Idempotent — re-running overwrites the same `_id`s. Image uploads cache by filename within the run; missing files are surfaced as TODOs in the script output.

For dry-run: `npm run seed-content -- --dry-run`.

## Type generation

Types are hand-written in `sanity/lib/types.ts` and mirror the GROQ projections, not the raw Sanity document shape. If you change the `SECTION_PROJECTION` or any `*Query`, update the matching type.
