import Image from "next/image";
import Link from "next/link";
import type { GalleryPreviewSection as GalleryPreviewSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

export default function GalleryPreviewSection({
  section,
}: {
  section: GalleryPreviewSectionT;
}) {
  const { eyebrow, heading, intro, projects, mode, count } = section;
  // For "latest" mode the GROQ projection fetches up to 12 projects; slice
  // here so the component honours the editor's chosen count.
  const all = projects ?? [];
  const list = mode === "latest" ? all.slice(0, count ?? 3) : all;
  return (
    <section className="border-b border-border">
      <div className="container-page py-16 md:py-20 lg:py-24 2xl:py-28">
        <div className="mb-12 max-w-3xl">
          {eyebrow && <p className="mb-3 type-eyebrow">{eyebrow}</p>}
          <h2 className="type-title-lg">{heading}</h2>
          {intro && <p className="mt-5 type-body">{intro}</p>}
        </div>
        {list.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((project) => {
              const before = project.beforeImage
                ? urlFor(project.beforeImage).width(800).fit("max").auto("format").url()
                : null;
              return (
                <Link
                  key={project._id}
                  href={`/gallery/${project.slug}`}
                  className="group flex flex-col border border-border bg-surface transition-colors hover:border-brand-light"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-background">
                    {before ? (
                      <Image
                        src={before}
                        alt={project.beforeImage?.alt ?? project.title}
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
                  <div className="p-6">
                    <p className="mb-2 type-eyebrow">{project.category}</p>
                    <h3 className="type-title-sm group-hover:text-brand-light">{project.title}</h3>
                    <p className="mt-3 type-caption text-muted">{project.location} · {project.year}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
