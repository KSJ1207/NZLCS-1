import Image from "next/image";
import Link from "next/link";
import type { HeroSection as HeroSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";
import { ctaHref, ctaRel, ctaTarget } from "../../../sanity/lib/links";

export default function HeroSection({ section }: { section: HeroSectionT }) {
  const {
    eyebrow,
    heading,
    subheading,
    backgroundImage,
    primaryCta,
    secondaryCta,
    serviceLinks,
  } = section;
  const bgUrl = backgroundImage
    ? urlFor(backgroundImage).width(2000).fit("max").auto("format").url()
    : null;

  const links = serviceLinks ?? [];
  const tocNumber = (s: { eyebrowNumber: string | null }, i: number) => {
    // Convert "SERVICE 01" → "001", or "01" → "001", else fall back to index+1.
    const stripped = (s.eyebrowNumber ?? "").replace(/[^\d]/g, "");
    return stripped ? stripped.padStart(3, "0") : String(i + 1).padStart(3, "0");
  };

  return (
    <section className="relative overflow-hidden border-b border-border pt-[120px] md:pt-[160px] lg:pt-[180px] pb-16 md:pb-24 lg:pb-28">
      {bgUrl ? (
        <Image
          src={bgUrl}
          alt={backgroundImage?.alt ?? ""}
          fill
          priority
          className="object-cover opacity-30"
        />
      ) : null}
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
        {eyebrow && <p className="mb-5 type-eyebrow">{eyebrow}</p>}
        <h1 className="max-w-3xl type-title-xl">{heading}</h1>
        {subheading && (
          <p className="mt-8 max-w-xl type-body">{subheading}</p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={ctaHref(primaryCta)}
                target={ctaTarget(primaryCta)}
                rel={ctaRel(primaryCta)}
                className="inline-flex items-center bg-brand px-7 py-4 type-micro text-on-brand transition-colors hover:bg-brand-dark"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={ctaHref(secondaryCta)}
                target={ctaTarget(secondaryCta)}
                rel={ctaRel(secondaryCta)}
                className="inline-flex items-center border border-border px-7 py-4 type-micro text-foreground transition-colors hover:border-brand-light hover:text-brand-light"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}

        {/* Optional service nav strip — used on the services page hero */}
        {links.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-10">
            {links.map((s, i) => (
              <a
                key={s._id}
                href={`#${s.slug}`}
                className="group flex items-center gap-3 type-micro text-muted hover:text-brand transition-colors"
              >
                <span className="text-brand">{tocNumber(s, i)}</span>
                <span className="h-px w-6 bg-border transition-colors group-hover:bg-brand" />
                {s.title.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
