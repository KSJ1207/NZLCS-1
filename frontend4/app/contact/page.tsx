import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollToTop from "../components/ScrollToTop";
import QuoteForm from "../components/QuoteForm";
import SectionRenderer from "../components/sections/SectionRenderer";
import { sanityFetch } from "../../sanity/lib/fetch";
import { pageBySlugQuery, siteSettingsQuery } from "../../sanity/lib/queries";
import type { Page, SiteSettings } from "../../sanity/lib/types";

const SLUG = "contact";

type DirectContact = {
  label: string;
  value: React.ReactNode;
  href?: string;
  icon: React.ReactNode;
};

function buildDirectContacts(site: SiteSettings | null): DirectContact[] {
  const items: DirectContact[] = [];
  const addressLine = site?.address
    ? [site.address.unit, site.address.street, site.address.suburb, site.address.city, site.address.region]
        .filter(Boolean)
        .join(", ")
    : null;

  if (addressLine) {
    items.push({
      label: "Location",
      value: addressLine,
      href: `https://www.google.com/maps?q=${encodeURIComponent(addressLine)}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    });
  }

  if (site?.primaryEmail) {
    const emails = [site.primaryEmail, site.secondaryEmail].filter(Boolean) as string[];
    items.push({
      label: "Email",
      value: (
        <div className="space-y-1">
          {emails.map((e) => (
            <a key={e} href={`mailto:${e}`} className="block hover:text-brand-light">
              {e}
            </a>
          ))}
        </div>
      ),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
    });
  }

  if (site?.phone) {
    items.push({
      label: "Phone",
      value: site.phone,
      href: `tel:${site.phone.replace(/\s+/g, "")}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    });
  }

  items.push({
    label: "Response",
    value: "Within 2 business days",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  });

  return items;
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([
    sanityFetch<Page | null>({
      query: pageBySlugQuery,
      params: { slug: SLUG },
      tags: ["page", `page:${SLUG}`],
    }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ["siteSettings", "layout"] }),
  ]);
  const seo = page?.seo;
  return {
    title:
      seo?.metaTitle ?? (page?.title ? `${page.title} — ${site?.businessName ?? "NZLCS"}` : undefined),
    description: seo?.metaDescription ?? site?.defaultSEO?.metaDescription ?? undefined,
  };
}

export default async function ContactPage() {
  const [page, site] = await Promise.all([
    sanityFetch<Page | null>({
      query: pageBySlugQuery,
      params: { slug: SLUG },
      tags: ["page", `page:${SLUG}`],
    }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ["siteSettings", "layout"] }),
  ]);

  if (!page) notFound();

  // Hero comes from the page document; everything below stays hardcoded so the
  // QuoteForm + Direct Contact aside + Google Maps embed keep their bespoke layout.
  const heroSection = page.sections?.find((s) => s._type === "heroSection") ?? null;
  const directContacts = buildDirectContacts(site);
  const mapSrc = site?.mapEmbedUrl
    ? site.mapEmbedUrl
    : `https://www.google.com/maps?q=${encodeURIComponent(
        site?.address
          ? [site.address.unit, site.address.street, site.address.suburb, site.address.city, site.address.region]
              .filter(Boolean)
              .join(",")
          : "Auckland,New+Zealand",
      )}&output=embed`;

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <ScrollToTop />

      {heroSection && <SectionRenderer sections={[heroSection]} />}

      {/* QUOTE REQUEST + DIRECT CONTACT */}
      <section className="border-t border-border">
        <div className="container-page-grid grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]">
          <div className="px-8 py-14 md:py-16 lg:py-20 2xl:py-24 lg:pr-20">
            <p className="mb-3 type-eyebrow">Free Quote Inquiry</p>
            <h2 className="type-title-lg">Request a Quote</h2>
            <p className="mt-5 max-w-md type-body">
              Drop us a line below and we&apos;ll get back to you fast. Send a
              photo of the site and we&apos;ll quote it within two business days.
            </p>

            <aside className="mt-12 border border-border bg-surface p-8">
              <p className="mb-8 type-eyebrow">Direct Contact</p>
              <dl className="divide-y divide-border">
                {directContacts.map((c) => (
                  <div
                    key={c.label}
                    className="grid grid-cols-[28px_120px_1fr] items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <span className="mt-0.5 text-muted" aria-hidden>
                      {c.icon}
                    </span>
                    <dt className="mt-0.5 type-eyebrow text-muted">{c.label}</dt>
                    <dd className="type-body text-foreground">
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="hover:text-brand-light"
                        >
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <div className="hidden lg:block my-24 border-l border-border" aria-hidden />

          <div className="px-8 py-14 md:py-16 lg:py-20 2xl:py-24 lg:pl-20">
            <QuoteForm formId="quote-upload-contact" formClassName="" />
          </div>
        </div>
      </section>

      {/* MAP — office location */}
      <section className="border-t border-border">
        <div className="container-page pt-16 md:pt-20 lg:pt-24 2xl:pt-28 pb-12">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <div>
              <p className="mb-6 type-eyebrow">Visit Us</p>
              <h2 className="type-title-lg">Our Office</h2>
            </div>
            <p className="max-w-md type-body md:mt-2">
              Based in {site?.address?.city ?? "Auckland"}, serving industrial and commercial sites across {site?.address?.region ?? "New Zealand"}.
            </p>
          </div>
        </div>
        <div className="container-page pb-16 md:pb-20 lg:pb-24 2xl:pb-28">
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
    </div>
  );
}
