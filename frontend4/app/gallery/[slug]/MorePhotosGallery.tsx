"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Photo = {
  label: string;
  alt: string;
  thumbUrl: string | null;
  fullUrl: string | null;
};

type Props = { photos: Photo[] };

export default function MorePhotosGallery({ photos }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;
  const active = isOpen ? photos[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () =>
      setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, next, prev]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            type="button"
            key={photo.label}
            onClick={() => photo.fullUrl && setOpenIndex(i)}
            disabled={!photo.fullUrl}
            className="group relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-default"
            aria-label={photo.fullUrl ? `Open ${photo.label} photo` : photo.label}
          >
            {photo.thumbUrl ? (
              <Image
                src={photo.thumbUrl}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-3 border border-dashed border-border" />
            )}
            <span className="absolute bottom-4 left-4 bg-background/80 px-2 py-1 type-micro text-foreground">
              {photo.label}
            </span>
          </button>
        ))}
      </div>

      {isOpen && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.label} photo`}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm md:p-10"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-border bg-background/70 text-foreground hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:right-6 md:top-6"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ✕
            </span>
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-border bg-background/70 text-foreground hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:left-6 md:h-12 md:w-12"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-border bg-background/70 text-foreground hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:right-6 md:h-12 md:w-12"
              >
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full max-h-[85vh] w-full max-w-[1280px] flex-col items-center justify-center"
          >
            {active.fullUrl && (
              <div className="relative h-full w-full">
                <Image
                  src={active.fullUrl}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
            )}
            <span className="mt-4 bg-background/80 px-3 py-1.5 type-micro text-foreground">
              {active.label}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
