import type { Metadata } from "next";
import ScrollToTop from "./components/ScrollToTop";
import QuoteForm from "./components/QuoteForm";
import HomeVideoHero from "./components/sections/HomeVideoHero";
import SectionRenderer from "./components/sections/SectionRenderer";
import { sanityFetch } from "../sanity/lib/fetch";
import { homePageQuery, siteSettingsQuery } from "../sanity/lib/queries";
import type { HomePage, SiteSettings } from "../sanity/lib/types";

const HERO_SRC = "/Service_and_About_sample_image/Home_Quote.png";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [home, site] = await Promise.all([
    sanityFetch<HomePage | null>({ query: homePageQuery, tags: ["homePage"] }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ["siteSettings", "layout"] }),
  ]);
  const seo = home?.seo;
  return {
    title: seo?.metaTitle ?? site?.defaultSEO?.metaTitle ?? site?.businessName ?? undefined,
    description: seo?.metaDescription ?? site?.defaultSEO?.metaDescription ?? site?.tagline ?? undefined,
  };
}

export default async function Home() {
  const [home, site] = await Promise.all([
    sanityFetch<HomePage | null>({ query: homePageQuery, tags: ["homePage"] }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ["siteSettings", "layout"], revalidate: 0 }),
  ]);

  const mapSrc = site?.mapEmbedUrl
    ? site.mapEmbedUrl
    : `https://www.google.com/maps?q=${encodeURIComponent(
        site?.address
          ? [site.address.unit, site.address.street, site.address.suburb, site.address.city, site.address.region]
              .filter(Boolean)
              .join(",")
          : "Auckland,New+Zealand",
      )}&output=embed`;

  // The video hero replaces any heroSection on the home page — the video IS the hero.
  // The hardcoded QuoteForm replaces any ctaSection — they'd otherwise duplicate.
  const allSections = (home?.sections ?? []).filter(
    (s) => s._type !== "heroSection" && s._type !== "ctaSection",
  );

  // Section ordering on home matches the original page flow: rich content sits
  // above the QuoteForm + Map; quantitative/social-proof sections (stats,
  // brands) sit below the map.
  const BELOW_MAP = new Set(["statsSection", "brandsSection"]);
  const aboveSections = allSections.filter((s) => !BELOW_MAP.has(s._type));
  const belowSections = allSections.filter((s) => BELOW_MAP.has(s._type));

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <ScrollToTop />

      {/* HERO — full-bleed video, art-directed. Sanity heroSection on home is bypassed. */}
      <HomeVideoHero />

      {/* SANITY-DRIVEN SECTIONS — above-the-map group */}
      <SectionRenderer sections={aboveSections} />

      {/* FREE QUOTE INQUIRY — kept hardcoded (form left, image right) */}
      <section id="contact" className="border-t border-border">
        <div className="container-page-grid grid grid-cols-1 md:grid-cols-2">
          <div className="px-8 pt-24 pb-0 md:pr-14">
            <p className="mb-3 type-eyebrow">
              Free Quote Inquiry
            </p>
            <h2 className="type-title-lg">
              Request a Quote
            </h2>
            <p className="mt-5 max-w-md type-body">
              Drop us a line below and we&apos;ll get back to you fast. Send a
              photo of the site and we&apos;ll quote it within two business
              days.
            </p>
            <QuoteForm formId="quote-upload-home" />
          </div>
          <div className="w-full border-t border-border md:relative md:border-t-0 md:border-l">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_SRC}
              alt="NZLCS team at work"
              className="block h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover"
            />
          </div>
        </div>
      </section>

      {/* MAP — office location (kept hardcoded) */}
      <section className="border-t border-border">
        <div className="container-page pt-16 md:pt-20 lg:pt-24 2xl:pt-28 pb-12 text-center">
          <p className="mb-3 type-eyebrow">
            Visit Us
          </p>
          <h2 className="type-title-lg">
            Our Office
          </h2>
          <p className="mx-auto mt-5 max-w-xl type-body">
            Based in {site?.address?.city ?? "Auckland"}, serving industrial and commercial sites
            across {site?.address?.region ?? "New Zealand"}.
          </p>
        </div>
        <div className="container-page pb-16 md:pb-20 lg:pb-24 2xl:pb-28">
          <p className="mb-2 text-xs text-red-500">DEBUG: {site?.address?.suburb ?? "NO ADDRESS"} | {mapSrc.slice(0, 80)}</p>
          <div className="overflow-hidden border border-border">
            <iframe
              title="NZLCS office location"
              src={mapSrc}
              width="100%"
              height="450"
              style={{ border: 0, filter: "grayscale(0.6) contrast(1.1)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* SANITY-DRIVEN SECTIONS — below-the-map group (stats, brands) */}
      <SectionRenderer sections={belowSections} />
    </div>
  );
}
