import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollToTop from "../components/ScrollToTop";
import SectionRenderer from "../components/sections/SectionRenderer";
import { sanityFetch } from "../../sanity/lib/fetch";
import { pageBySlugQuery, siteSettingsQuery } from "../../sanity/lib/queries";
import type { Page, SiteSettings } from "../../sanity/lib/types";

const SLUG = "about";

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([
    sanityFetch<Page | null>({
      query: pageBySlugQuery,
      params: { slug: SLUG },
      tags: ["page", `page:${SLUG}`],
    }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
  ]);
  const seo = page?.seo;
  return {
    title:
      seo?.metaTitle ?? (page?.title ? `${page.title} — ${site?.businessName ?? "NZLCS"}` : undefined),
    description: seo?.metaDescription ?? site?.defaultSEO?.metaDescription ?? undefined,
  };
}

export default async function AboutPage() {
  const page = await sanityFetch<Page | null>({
    query: pageBySlugQuery,
    params: { slug: SLUG },
    tags: ["page", `page:${SLUG}`],
  });

  if (!page) notFound();

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <ScrollToTop />
      <SectionRenderer sections={page.sections} />
    </div>
  );
}
