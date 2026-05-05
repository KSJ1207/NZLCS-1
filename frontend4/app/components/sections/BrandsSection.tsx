import Image from "next/image";
import type { BrandsSection as BrandsSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

export default function BrandsSection({ section }: { section: BrandsSectionT }) {
  const { eyebrow, heading, brands } = section;
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        {(eyebrow || heading) && (
          <div className="mb-12 text-center">
            {eyebrow && <p className="mb-3 type-eyebrow">{eyebrow}</p>}
            {heading && <h2 className="type-title-lg">{heading}</h2>}
          </div>
        )}
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((b, i) => {
            const logo = b.logo
              ? urlFor(b.logo).width(180).fit("max").auto("format").url()
              : null;
            const inner = logo ? (
              <Image
                src={logo}
                alt={b.logo?.alt ?? b.name}
                width={120}
                height={48}
                className="h-12 w-auto opacity-60 transition-opacity hover:opacity-100"
              />
            ) : (
              <span className="type-micro text-muted">{b.name}</span>
            );
            return (
              <li key={`${b.name}-${i}`}>
                {b.url ? (
                  <a href={b.url} target="_blank" rel="noopener noreferrer" aria-label={b.name}>
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
