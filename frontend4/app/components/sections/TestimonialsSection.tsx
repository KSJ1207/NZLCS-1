import Image from "next/image";
import type { TestimonialsSection as TestimonialsSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

export default function TestimonialsSection({
  section,
}: {
  section: TestimonialsSectionT;
}) {
  const { eyebrow, heading, testimonials } = section;
  const list = testimonials ?? [];

  // Heading-only placeholder when no testimonials are picked.
  if (list.length === 0) {
    return (
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-8 py-24 text-center">
          {eyebrow && <p className="type-eyebrow mb-4">{eyebrow}</p>}
          {heading && <h2 className="type-title-lg">{heading}</h2>}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="mb-12 max-w-3xl">
          {eyebrow && <p className="mb-3 type-eyebrow">{eyebrow}</p>}
          {heading && <h2 className="type-title-lg">{heading}</h2>}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => {
            const photo = t.authorImage?.asset
              ? urlFor(t.authorImage).width(96).height(96).fit("crop").auto("format").url()
              : null;
            return (
              <figure key={t._id} className="border border-border bg-background p-8">
                <blockquote className="type-body italic text-foreground">
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {photo && (
                    <Image
                      src={photo}
                      alt={t.authorImage?.alt ?? t.authorName}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="type-micro">{t.authorName}</p>
                    {(t.authorRole || t.authorCompany) && (
                      <p className="type-caption text-muted">
                        {[t.authorRole, t.authorCompany].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
