import Image from "next/image";
import {
  Crosshair,
  Gauge,
  Layout,
  Leaf,
  Search,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ValueProp, ValuesSection as ValuesSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

const ICON_MAP: Record<string, LucideIcon> = {
  leaf: Leaf,
  crosshair: Crosshair,
  search: Search,
  layout: Layout,
  "shield-check": ShieldCheck,
  truck: Truck,
  zap: Zap,
  gauge: Gauge,
  wrench: Wrench,
};

const DEFAULT_ACCENT = "#D4834A";

// Image-card variant — used on the home "Why Choose Us" section.
function ImageCard({ value, isLast, isFirst }: { value: ValueProp; isLast: boolean; isFirst: boolean }) {
  const img = value.image
    ? urlFor(value.image).width(800).fit("max").auto("format").url()
    : null;
  return (
    <div
      className={`px-8 py-12 ${
        !isLast ? "md:border-r border-border" : ""
      } ${!isFirst ? "border-t md:border-t-0 sm:[&:nth-child(2)]:border-t-0" : ""}`}
    >
      <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-surface">
        {img ? (
          <Image
            src={img}
            alt={value.image?.alt ?? value.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
        ) : null}
      </div>
      <h3 className="type-title-sm">{value.title}</h3>
      <p className="mt-3 type-body">{value.description}</p>
    </div>
  );
}

// Icon-card variant — used on the about "Our values" section.
function IconCard({ value }: { value: ValueProp }) {
  const accent = value.accentColor || DEFAULT_ACCENT;
  const Icon = value.icon ? ICON_MAP[value.icon] : null;
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-8">
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: accent }} />
      {Icon && (
        <div
          className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}1a` }}
        >
          <Icon size={20} strokeWidth={1.5} style={{ color: accent }} />
        </div>
      )}
      {(value.numberLabel || value.eyebrow) && (
        <p className="mb-4 type-micro" style={{ color: accent }}>
          {[value.numberLabel, value.eyebrow].filter(Boolean).join(" — ")}
        </p>
      )}
      <h3 className="type-title-xs">{value.title}</h3>
      <p className="mt-3 type-caption">{value.description}</p>
    </div>
  );
}

export default function ValuesSection({ section }: { section: ValuesSectionT }) {
  const { eyebrow, heading, intro, values, footnote } = section;

  // If any value has an image, render the home-style image-card grid.
  // Otherwise render the about-style icon-card grid.
  const hasImages = values.some((v) => v.image);

  if (hasImages) {
    const cols = values.length === 4 ? "lg:grid-cols-4" : values.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
    return (
      <section className="border-t border-border">
        <div className="container-page pt-16 md:pt-20 lg:pt-24 2xl:pt-28 pb-12">
          <div className="max-w-2xl 4xl:max-w-4xl">
            {eyebrow && <p className="mb-3 type-eyebrow">{eyebrow}</p>}
            {heading && <h2 className="type-title-lg">{heading}</h2>}
            {intro && <p className="mt-5 max-w-xl type-body">{intro}</p>}
          </div>
        </div>
        <div className="border-y border-border">
          <div className={`container-page-grid grid grid-cols-1 sm:grid-cols-2 ${cols}`}>
            {values.map((v, i) => (
              <ImageCard
                key={`${v.title}-${i}`}
                value={v}
                isFirst={i === 0}
                isLast={i === values.length - 1}
              />
            ))}
          </div>
        </div>
        {footnote && (
          <div className="container-page py-12 text-center">
            <p className="type-body font-medium text-foreground">{footnote}</p>
          </div>
        )}
      </section>
    );
  }

  // Icon-card variant (about page style)
  return (
    <section className="border-b border-border">
      <div className="container-page pt-16 md:pt-20 lg:pt-24 2xl:pt-28 pb-12">
        {(eyebrow || heading || intro) && (
          <div className="mb-12 max-w-3xl 4xl:max-w-5xl">
            {eyebrow && <p className="mb-3 type-eyebrow">{eyebrow}</p>}
            {heading && <h2 className="type-title-lg">{heading}</h2>}
            {intro && <p className="mt-5 type-body">{intro}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <IconCard key={`${v.title}-${i}`} value={v} />
          ))}
        </div>
        {footnote && (
          <p className="mt-10 text-center type-body font-medium text-foreground border-t border-border pt-10 max-w-4xl mx-auto">
            {footnote}
          </p>
        )}
      </div>
      <div className="h-16" aria-hidden />
    </section>
  );
}
