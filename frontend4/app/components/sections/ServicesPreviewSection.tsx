import Image from "next/image";
import Link from "next/link";
import type { ServicesPreviewSection as ServicesPreviewSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

export default function ServicesPreviewSection({
  section,
}: {
  section: ServicesPreviewSectionT;
}) {
  const { eyebrow, heading, intro, services } = section;
  const list = services ?? [];
  const cols = list.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : list.length === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  const usesSmGrid = list.length !== 2;

  return (
    <section id="services" className="border-t border-border">
      <div className="container-page pt-16 md:pt-20 lg:pt-24 2xl:pt-28 pb-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-3xl 4xl:max-w-5xl">
            {eyebrow && <p className="mb-3 type-eyebrow">{eyebrow}</p>}
            <h2 className="type-title-lg">{heading}</h2>
            {intro && <p className="mt-5 type-body">{intro}</p>}
          </div>
        </div>
      </div>

      {list.length > 0 && (
        <div className="border-y border-border">
          <div className={`container-page-grid grid grid-cols-1 ${cols}`}>
            {list.map((s, i) => {
              const img = s.cardImage
                ? urlFor(s.cardImage).width(800).fit("max").auto("format").url()
                : null;
              return (
                <div
                  key={s._id}
                  className={`px-8 py-12 ${
                    i !== list.length - 1 ? "md:border-r border-border" : ""
                  } ${i !== 0 ? `border-t md:border-t-0${usesSmGrid ? " sm:[&:nth-child(2)]:border-t-0" : ""}` : ""}`}
                >
                  <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-surface">
                    {img ? (
                      <Image
                        src={img}
                        alt={s.cardImage?.alt ?? s.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <h3 className="type-title-sm">{s.shortTitle ?? s.title}</h3>
                  <p className="mt-3 type-body">{s.shortDescription}</p>
                  <Link
                    href={`/services#${s.slug}`}
                    className="mt-5 inline-block type-micro text-brand hover:text-brand-dark"
                  >
                    Learn More →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
