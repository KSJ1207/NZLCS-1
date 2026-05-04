<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices..

<!-- END:nextjs-agent-rules -->

# Architecture rules

1. **Section components receive props, never fetch.** Files in `app/components/sections/` are pure presentational React. Pages and the root layout are the only places that call `sanityFetch`.
2. **Adding a new section type requires four artifacts** (all in the same PR):
   - Schema in `sanity/schemas/sections/<name>Section.ts`
   - Component in `app/components/sections/<Name>Section.tsx`
   - Fixture in `sanity/fixtures/sections/<name>.ts`
   - Story in `stories/sections/<Name>.stories.tsx`
   Then register the new `_type` in `sanity/schemas/index.ts` (`SECTION_TYPES`), `sanity/lib/queries.ts` (the `SECTION_PROJECTION` fragment), `sanity/lib/types.ts` (the `Section` discriminated union), and `app/components/sections/SectionRenderer.tsx` (the switch).
3. **Always read `node_modules/next/dist/docs/` before touching Next.js APIs** — `draftMode`, `generateStaticParams`, `generateMetadata`, route handlers, image, etc. Behaviours and signatures differ from public docs.
4. **Fixtures use realistic NZLCS content** (laser cleaning, rust, mobile units, Auckland) — never lorem ipsum.

For Sanity-specific conventions, see `SANITY.md`. For Storybook conventions, see `STORYBOOK.md` (if present).
