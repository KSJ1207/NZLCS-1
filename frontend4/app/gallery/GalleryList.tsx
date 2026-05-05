"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import FilterChip from "../components/FilterChip";
import { ALL_FILTER, type Filter } from "../../sanity/lib/categories";
import type { CategoryOption, ProjectCard } from "../../sanity/lib/types";
import { urlFor } from "../../sanity/lib/image";

export default function GalleryList({
  projects,
  categories,
}: {
  projects: ProjectCard[];
  categories: CategoryOption[];
}) {
  const [filter, setFilter] = useState<Filter>(ALL_FILTER);

  const filters = useMemo<Filter[]>(
    () => [ALL_FILTER, ...categories.map((c) => c.title)],
    [categories],
  );

  const visible = useMemo(
    () =>
      filter === ALL_FILTER
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  return (
    <>
      {/* FILTER TABS — bracketed by top + bottom dividers */}
      <div className="border-y border-border">
        <div className="container-page py-5">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT GRID — boxed cards with gaps */}
      <section>
        <div className="container-page py-12">
          {visible.length === 0 ? (
            <div className="py-16 md:py-20 lg:py-24 2xl:py-28 text-center">
              <p className="type-body">
                No projects in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <ProjectCardLink key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ProjectCardLink({ project }: { project: ProjectCard }) {
  return (
    <Link
      href={`/gallery/${project.slug}`}
      className="group flex flex-col border border-border bg-background transition-colors hover:border-foreground/40"
    >
      <BeforeAfterPreview project={project} variant="card" />
      <div className="flex flex-1 flex-col px-6 py-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="type-eyebrow">
            {project.category}
          </span>
          <span className="type-eyebrow text-muted">
            {project.location}
          </span>
        </div>
        <h3 className="type-title-sm group-hover:text-brand">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 type-body">
          {project.summary}
        </p>
        <span className="mt-6 inline-block type-micro text-foreground underline underline-offset-4 group-hover:text-brand">
          View project →
        </span>
      </div>
    </Link>
  );
}

function BeforeAfterPreview({
  project,
  variant,
}: {
  project: ProjectCard;
  variant: "card" | "tall";
}) {
  const wrapperClass =
    variant === "card"
      ? "relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-surface"
      : "relative aspect-[4/3] w-full overflow-hidden bg-surface";

  const labelEl =
    variant === "card" ? (
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 type-eyebrow text-muted">
        Before / After
      </span>
    ) : (
      <span className="absolute left-3 top-3 bg-background/80 px-2.5 py-1.5 type-micro text-foreground">
        Before / After
      </span>
    );

  if (project.beforeImage && project.afterImage) {
    const beforeUrl = urlFor(project.beforeImage)
      .width(800)
      .fit("max")
      .auto("format")
      .url();
    const afterUrl = urlFor(project.afterImage)
      .width(800)
      .fit("max")
      .auto("format")
      .url();
    return (
      <div className={wrapperClass}>
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative h-full w-full">
            <Image
              src={beforeUrl}
              alt={project.beforeImage.alt ?? `${project.title} before`}
              fill
              sizes="(min-width: 768px) 16vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-full w-full">
            <Image
              src={afterUrl}
              alt={project.afterImage.alt ?? `${project.title} after`}
              fill
              sizes="(min-width: 768px) 16vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <span className="absolute inset-y-0 left-1/2 -ml-px w-px bg-brand" />
        {variant === "tall" ? labelEl : null}
      </div>
    );
  }

  // Placeholder — flagged rust tone on left, surface on right.
  return (
    <div className={wrapperClass}>
      <div className="absolute inset-0 grid grid-cols-2">
        <div style={{ backgroundColor: "var(--surface-rust)" }} />
        <div className="bg-surface" />
      </div>
      <span className="absolute inset-y-0 left-1/2 -ml-px w-px bg-brand" />
      {labelEl}
    </div>
  );
}

// Simplified card for "Similar projects" sections.
export function SimpleProjectCard({ project }: { project: ProjectCard }) {
  return (
    <Link href={`/gallery/${project.slug}`} className="group block">
      <BeforeAfterPreview project={project} variant="tall" />
      <div className="mt-5 mb-2 flex items-center gap-2">
        <span className="type-eyebrow">
          {project.category}
        </span>
        <span className="text-[11px] text-border" aria-hidden="true">
          ·
        </span>
        <span className="type-eyebrow text-muted">
          {project.location}
        </span>
      </div>
      <h3 className="type-title-sm group-hover:text-brand">
        {project.title}
      </h3>
    </Link>
  );
}
