"use client";

import Image from "next/image";
import { useState } from "react";
import type { TestimonialsSection as TestimonialsSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

const PAGE_SIZE = 3;

export default function TestimonialsSection({
  section,
}: {
  section: TestimonialsSectionT;
}) {
  const { eyebrow, heading, testimonials } = section;
  const list = testimonials ?? [];
  const [start, setStart] = useState(0);

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

  const visible = list.slice(start, start + PAGE_SIZE);
  const canPrev = start > 0;
  const canNext = start + PAGE_SIZE < list.length;
  const totalPages = Math.ceil(list.length / PAGE_SIZE);
  const currentPage = Math.floor(start / PAGE_SIZE);
  const showControls = list.length > PAGE_SIZE;

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1280px] px-8 py-24">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div className="max-w-3xl">
            {eyebrow && <p className="mb-3 type-eyebrow">{eyebrow}</p>}
            {heading && <h2 className="type-title-lg">{heading}</h2>}
          </div>
          {showControls && (
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => setStart(Math.max(0, start - PAGE_SIZE))}
                disabled={!canPrev}
                aria-label="Previous testimonials"
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12L6 8l4-4" />
                </svg>
              </button>
              <button
                onClick={() => setStart(start + PAGE_SIZE)}
                disabled={!canNext}
                aria-label="Next testimonials"
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-30"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div
          className={[
            "grid gap-8",
            visible.length === 1
              ? "max-w-[480px] mx-auto"
              : visible.length === 2
                ? "md:grid-cols-2 max-w-[900px] mx-auto"
                : "md:grid-cols-2 lg:grid-cols-3",
          ].join(" ")}
        >
          {visible.map((t) => {
            const photo = t.authorImage?.asset
              ? urlFor(t.authorImage).width(96).height(96).fit("crop").auto("format").url()
              : null;
            return (
              <figure key={t._id} className="border border-border bg-background p-8">
                <blockquote className="type-body italic text-foreground">
                  <p>&ldquo;{t.quote}&rdquo;</p>
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

        {showControls && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStart(i * PAGE_SIZE)}
                aria-label={`Page ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "w-6 bg-brand"
                    : "w-1.5 bg-border hover:bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
