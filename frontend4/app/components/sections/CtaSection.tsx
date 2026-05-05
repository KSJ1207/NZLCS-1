import Image from "next/image";
import Link from "next/link";
import type { CtaSection as CtaSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";
import { ctaHref, ctaRel, ctaTarget } from "../../../sanity/lib/links";

export default function CtaSection({ section }: { section: CtaSectionT }) {
  const { eyebrow, heading, body, cta, backgroundStyle, backgroundImage } = section;
  const bgUrl =
    backgroundStyle === "image" && backgroundImage
      ? urlFor(backgroundImage).width(2000).fit("max").auto("format").url()
      : null;

  const isGradient = backgroundStyle === "gradient";
  const containerClass = isGradient
    ? "bg-brand text-on-brand"
    : "bg-background text-foreground";
  const buttonClass = isGradient
    ? "inline-flex items-center border border-on-brand px-7 py-4 type-micro text-on-brand transition-colors hover:bg-on-brand hover:text-brand"
    : "inline-flex items-center bg-brand px-7 py-4 type-micro text-on-brand transition-colors hover:bg-brand-dark";

  return (
    <section className={`relative overflow-hidden border-t border-border ${containerClass}`}>
      {bgUrl && (
        <Image
          src={bgUrl}
          alt={backgroundImage?.alt ?? ""}
          fill
          className="object-cover opacity-40"
        />
      )}
      <div className="container-page relative z-10 py-16 md:py-20 lg:py-24 2xl:py-28 3xl:py-36 text-center">
        {eyebrow && <p className="mb-4 type-eyebrow">{eyebrow}</p>}
        <h2 className="mx-auto max-w-3xl 4xl:max-w-5xl type-title-lg">{heading}</h2>
        {body && (
          <p className="mx-auto mt-5 max-w-2xl 4xl:max-w-3xl type-body whitespace-pre-line">
            {body}
          </p>
        )}
        <div className="mt-10 flex justify-center">
          <Link
            href={ctaHref(cta)}
            target={ctaTarget(cta)}
            rel={ctaRel(cta)}
            className={buttonClass}
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
