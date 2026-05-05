import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollToTop from "../../components/ScrollToTop";
import PortableText from "../../components/PortableText";
import { SimpleProjectCard } from "../GalleryList";
import BeforeAfterSlider from "./BeforeAfterSlider";
import MorePhotosGallery from "./MorePhotosGallery";
import { client } from "../../../sanity/lib/client";
import { sanityFetch } from "../../../sanity/lib/fetch";
import {
  projectBySlugQuery,
  projectSlugsQuery,
  relatedProjectsQuery,
} from "../../../sanity/lib/queries";
import type { Project, ProjectCard } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/gallery/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: [`project:${slug}`],
  });
  if (!project) return { title: "Project not found — NZLCS" };
  return {
    title: `${project.title} — NZLCS`,
    description: project.summary,
  };
}

export default async function ProjectPage(
  props: PageProps<"/gallery/[slug]">,
) {
  const { slug } = await props.params;

  const [project, related] = await Promise.all([
    sanityFetch<Project | null>({
      query: projectBySlugQuery,
      params: { slug },
      tags: [`project:${slug}`, "project"],
    }),
    sanityFetch<ProjectCard[]>({
      query: relatedProjectsQuery,
      params: { slug, limit: 3 },
      tags: ["project"],
    }),
  ]);

  if (!project) notFound();

  const beforeUrl = project.beforeImage
    ? urlFor(project.beforeImage).width(1600).fit("max").auto("format").url()
    : undefined;
  const afterUrl = project.afterImage
    ? urlFor(project.afterImage).width(1600).fit("max").auto("format").url()
    : undefined;

  const hasBody = !!project.body && project.body.length > 0;
  const hasSpecs = !!project.specs && project.specs.length > 0;

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
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="bg-brand px-3 py-1.5 type-micro text-on-brand">
              {project.category}
            </span>
            <span className="border border-border px-3 py-1.5 type-micro text-muted">
              {project.year}
            </span>
            <span className="border border-border px-3 py-1.5 type-micro text-muted">
              {project.location}
            </span>
          </div>

          <h1 className="max-w-4xl type-title-xl">
            {project.title}
          </h1>

          <Link
            href="/gallery"
            className="mt-8 inline-block type-micro text-brand hover:text-brand-dark"
          >
            ← Back to gallery
          </Link>
        </div>
      </section>

      {/* BEFORE / AFTER COMPARISON */}
      <section className="border-t border-border">
        <div className="container-page pt-12 pb-16">
          <div className="mb-6 flex items-baseline justify-between">
            <p className="type-eyebrow">
              Before / After
            </p>
            <p className="type-micro text-muted">
              Drag ⇄ to compare
            </p>
          </div>
          <BeforeAfterSlider before={beforeUrl} after={afterUrl} />
        </div>
      </section>

      {/* ABOUT + SPECS */}
      {(hasBody || hasSpecs) && (
        <section className="border-t border-border">
          <div className="container-page py-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_minmax(0,420px)] md:gap-16">
              <div className="border-l-2 border-brand pl-6 md:pl-8">
                <p className="mb-6 type-eyebrow">
                  About This Project
                </p>
                <div className="space-y-6 max-w-prose">
                  {hasBody ? (
                    <PortableText value={project.body} variant="large" />
                  ) : (
                    <p className="type-body-lg">
                      {project.summary}
                    </p>
                  )}
                </div>
              </div>

              {hasSpecs && project.specs ? (
                <aside className="border border-border bg-surface p-8">
                  <p className="mb-6 type-eyebrow">
                    Project Specs
                  </p>
                  <dl className="divide-y divide-border [&_>div]:py-4 first:[&_>div]:pt-0 last:[&_>div]:pb-0">
                    {project.specs.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-baseline justify-between gap-6"
                      >
                        <dt className="type-eyebrow text-muted">
                          {s.label}
                        </dt>
                        <dd className="text-right type-caption text-foreground/85">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* MORE PHOTOS */}
      {project.morePhotos && project.morePhotos.length > 0 && (
        <section className="border-t border-border">
          <div className="container-page pt-16 pb-16">
            <p className="mb-8 type-eyebrow">
              More Photos
            </p>
            <MorePhotosGallery
              photos={project.morePhotos.map((photo) => ({
                label: photo.label,
                alt: photo.image?.alt ?? photo.label,
                thumbUrl: photo.image
                  ? urlFor(photo.image).width(800).fit("max").auto("format").url()
                  : null,
                fullUrl: photo.image
                  ? urlFor(photo.image).width(2000).fit("max").auto("format").url()
                  : null,
              }))}
            />
          </div>
        </section>
      )}

      {/* RELATED WORK */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="container-page pt-16 md:pt-20 lg:pt-24 2xl:pt-28 pb-12">
            <div className="flex items-baseline justify-between gap-6">
              <div>
                <p className="mb-3 type-eyebrow">
                  Related Work
                </p>
                <h2 className="type-title-md">
                  Similar projects.
                </h2>
              </div>
              <Link
                href="/gallery"
                className="type-micro text-brand hover:text-brand-dark"
              >
                ← Back to Gallery
              </Link>
            </div>
          </div>
          <div className="container-page pb-16">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <SimpleProjectCard key={r.slug} project={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-20 lg:py-24 2xl:py-28 3xl:py-36 text-center">
          <p className="mb-3 type-eyebrow">
            Have a similar project?
          </p>
          <h2 className="type-title-lg">
            Send us a photo of the job.
          </h2>
          <p className="mx-auto mt-5 max-w-xl type-body">
            We&apos;ll assess the surface, scope the work, and respond within
            two business days. No obligation — just a straight answer.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-brand px-10 py-4 type-micro text-on-brand hover:bg-brand-light"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </div>
  );
}
