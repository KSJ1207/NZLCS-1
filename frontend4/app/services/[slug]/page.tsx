import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Anchor,
  Building2,
  Car,
  ClipboardCheck,
  Cog,
  Database,
  Eraser,
  FileSearch,
  Gauge,
  Landmark,
  Layers,
  type LucideIcon,
  Paintbrush,
  Palette,
  RotateCcw,
  Settings,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import ScrollToTop from "../../components/ScrollToTop";
import { client } from "../../../sanity/lib/client";
import { sanityFetch } from "../../../sanity/lib/fetch";
import {
  serviceBySlugQuery,
  serviceSlugsQuery,
  siteSettingsQuery,
} from "../../../sanity/lib/queries";
import type { Service, SiteSettings } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

const APP_ICONS: Record<string, LucideIcon> = {
  "building-2": Building2,
  landmark: Landmark,
  gauge: Gauge,
  car: Car,
  cog: Cog,
  database: Database,
  anchor: Anchor,
  truck: Truck,
  "clipboard-check": ClipboardCheck,
  "trending-up": TrendingUp,
  "rotate-ccw": RotateCcw,
  "file-search": FileSearch,
  settings: Settings,
  wrench: Wrench,
  layers: Layers,
  eraser: Eraser,
  paintbrush: Paintbrush,
  palette: Palette,
  zap: Zap,
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(serviceSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const [service, site] = await Promise.all([
    sanityFetch<Service | null>({
      query: serviceBySlugQuery,
      params: { slug },
      tags: [`service:${slug}`],
    }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
  ]);
  if (!service) return { title: "Service not found — NZLCS" };
  const seo = service.seo;
  return {
    title:
      seo?.metaTitle ?? `${service.title} — ${site?.businessName ?? "NZLCS"}`,
    description: seo?.metaDescription ?? service.shortDescription,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;

  const service = await sanityFetch<Service | null>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: [`service:${slug}`, "service"],
  });

  if (!service) notFound();

  const related = service.relatedProjects ?? [];

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <ScrollToTop />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border pt-[120px] md:pt-[160px] lg:pt-[180px] pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right,var(--brand) 1px,transparent 1px),linear-gradient(to bottom,var(--brand) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 80% 50%,rgba(var(--brand-rgb) / 0.06) 0%,transparent 65%)",
          }}
        />
        <div className="container-page relative z-10">
          <Link
            href="/services"
            className="mb-8 inline-block type-micro text-muted hover:text-brand-light"
          >
            ← All services
          </Link>
          {service.eyebrowNumber && (
            <p className="mb-3 type-eyebrow">{service.eyebrowNumber}</p>
          )}
          <h1 className="type-title-xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl type-body">{service.shortDescription}</p>
        </div>
      </section>

      {/* INTRO + HOW IT WORKS */}
      <section className="border-b border-border">
        <div className="container-page-grid grid grid-cols-1 md:grid-cols-2">
          <div className="px-8 py-16 md:border-r border-border md:pr-14">
            <p className="mb-4 type-eyebrow">The Problem</p>
            <p className="type-body">{service.intro}</p>
          </div>
          {service.howItWorks && (
            <div className="px-8 py-16 md:pl-14">
              <p className="mb-4 type-eyebrow">How It Works</p>
              <p className="type-body">{service.howItWorks}</p>
            </div>
          )}
        </div>
      </section>

      {/* APPLICATIONS */}
      {service.applications && service.applications.length > 0 && (
        <section className="border-b border-border">
          <div className="container-page py-16">
            <p className="mb-6 type-eyebrow">Ideal Applications</p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {service.applications.map((app, i) => {
                const Icon = app.icon ? APP_ICONS[app.icon] : null;
                return (
                  <li
                    key={`${app.label}-${i}`}
                    className="flex flex-col items-center gap-4 rounded-lg bg-surface px-5 py-7 text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand/10">
                      {Icon ? (
                        <Icon size={22} strokeWidth={1.5} className="text-brand" aria-hidden />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
                      )}
                    </div>
                    <p className="type-caption font-bold text-foreground/85">{app.label}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="border-b border-border">
          <div className="container-page py-16">
            <p className="mb-6 type-eyebrow">Key Benefits</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.benefits.map((b, i) => (
                <article
                  key={`${b.title}-${i}`}
                  className="border border-border bg-surface p-6"
                >
                  <h3 className="type-title-sm">{b.title}</h3>
                  <p className="mt-3 type-body text-muted">{b.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED PROJECTS */}
      {related.length > 0 && (
        <section className="border-b border-border">
          <div className="container-page py-16">
            <p className="mb-6 type-eyebrow">Related Projects</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => {
                const before = p.beforeImage
                  ? urlFor(p.beforeImage).width(800).fit("max").auto("format").url()
                  : null;
                return (
                  <Link
                    key={p._id}
                    href={`/gallery/${p.slug}`}
                    className="group flex flex-col border border-border bg-surface transition-colors hover:border-brand-light"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-background">
                      {before ? (
                        <Image
                          src={before}
                          alt={p.beforeImage?.alt ?? p.title}
                          fill
                          sizes="(min-width: 1024px) 30vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted type-caption">
                          Image
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="type-title-sm group-hover:text-brand-light">{p.title}</h3>
                      <p className="mt-2 type-caption text-muted">{p.location} · {p.year}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border bg-surface">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-end">
          <div>
            <p className="mb-3 type-eyebrow">Ready to Talk?</p>
            <h2 className="type-title-md">Send us a photo of the job.</h2>
            <p className="mt-3 max-w-xl type-body">
              We&apos;ll assess it and respond within two business days. No obligation — just a straight answer.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center bg-brand px-7 py-4 type-micro text-on-brand transition-colors hover:bg-brand-dark"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </div>
  );
}
