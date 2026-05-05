import type { Metadata } from "next";
import Link from "next/link";
import ScrollToTop from "./components/ScrollToTop";
import QuoteForm from "./components/QuoteForm";
import SectionRenderer from "./components/sections/SectionRenderer";
import { sanityFetch } from "../sanity/lib/fetch";
import { homePageQuery, siteSettingsQuery } from "../sanity/lib/queries";
import type { HomePage, SiteSettings } from "../sanity/lib/types";

const HERO_SRC = "/Service_and_About_sample_image/Home_Quote.png";
const HERO_VIDEO = "/home_video.mp4";

export async function generateMetadata(): Promise<Metadata> {
  const [home, site] = await Promise.all([
    sanityFetch<HomePage | null>({ query: homePageQuery, tags: ["homePage"] }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
  ]);
  const seo = home?.seo;
  return {
    title: seo?.metaTitle ?? site?.defaultSEO?.metaTitle ?? site?.businessName ?? undefined,
    description: seo?.metaDescription ?? site?.defaultSEO?.metaDescription ?? site?.tagline ?? undefined,
  };
}

export default async function Home() {
  const home = await sanityFetch<HomePage | null>({
    query: homePageQuery,
    tags: ["homePage"],
  });

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

      {/* HERO — full bleed video (kept hardcoded; Sanity heroSection on home is bypassed).
          Layout: content sits in a flex column anchored to the bottom with a top
          pad equal to --nav-safe-area, so the heading can never grow tall enough
          to slide under the fixed header. */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover scale-x-[-1]"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85" />
        <div className="relative z-20 flex min-h-[100svh] items-end">
          <div
            className="mx-auto w-full max-w-[1280px] px-6 pb-12 sm:px-8 md:pb-16 lg:pb-20"
            style={{ paddingTop: "var(--nav-safe-area)" }}
          >
            <div className="max-w-xl md:max-w-2xl text-white">
              <p className="mb-5 type-eyebrow text-brand-light">
                <span className="block">New Zealand</span>
                <span className="block">Laser Cleaning Solutions</span>
              </p>
              <h1 className="hero-title">
                <span className="block">Clean with laser precision.</span>
                <span className="mt-2 md:mt-3 lg:mt-4 block">Leave no trace on the environment.</span>
              </h1>
              <p className="mt-6 max-w-md type-body text-white/85">
                We remove rust, corrosion, and surface contaminants using
                advanced laser technology — no chemicals, no damage.
                Auckland-based, servicing industrial, commercial, and infrastructure projects across New Zealand.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 type-micro">
                <Link
                  href="/contact"
                  className="border-b border-white pb-1 text-white hover:text-brand-light hover:border-brand-light"
                >
                  Get a Free Quote →
                </Link>
                <Link
                  href="/services"
                  className="border-b border-white pb-1 text-white hover:text-brand-light hover:border-brand-light"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SANITY-DRIVEN SECTIONS — above-the-map group */}
      <SectionRenderer sections={aboveSections} />

      {/* FREE QUOTE INQUIRY — kept hardcoded (form left, image right) */}
      <section id="contact" className="border-t border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-2">
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
        <div className="mx-auto max-w-[1280px] px-8 pt-24 pb-12 text-center">
          <p className="mb-3 type-eyebrow">
            Visit Us
          </p>
          <h2 className="type-title-lg">
            Our Office
          </h2>
          <p className="mx-auto mt-5 max-w-xl type-body">
            Based in Auckland, serving industrial and commercial sites
            across New Zealand.
          </p>
        </div>
        <div className="mx-auto max-w-[1280px] px-8 pb-24">
          <div className="overflow-hidden border border-border">
            <iframe
              title="NZLCS office location"
              src="https://www.google.com/maps?q=Auckland,New+Zealand&output=embed"
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
