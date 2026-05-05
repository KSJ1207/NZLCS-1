import Image from "next/image";
import PortableText from "../PortableText";
import type { RichTextSection as RichTextSectionT } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

export default function RichTextSection({
  section,
}: {
  section: RichTextSectionT;
}) {
  const { eyebrow, heading, body, image, imagePosition } = section;

  // No-image variant — centered narrative block (matches the about-page
  // "Our Expertise" section).
  if (!image) {
    return (
      <section className="border-b border-border">
        <div className="container-page py-16 md:py-20 lg:py-24 2xl:py-28 text-center">
          {eyebrow && <p className="mb-5 type-eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="mx-auto max-w-3xl type-title-lg">{heading}</h2>
          )}
          <div className="mx-auto mt-8 max-w-prose text-foreground">
            <PortableText value={body} />
          </div>
        </div>
      </section>
    );
  }

  // Two-column "story" layout when image is present
  const imgUrl = urlFor(image).width(1200).fit("max").auto("format").url();
  const imageOnLeft = imagePosition === "left";

  return (
    <section className="border-b border-border">
      <div className="container-page-grid grid grid-cols-1 md:grid-cols-2">
        {/* Text */}
        <div
          className={`px-8 py-20 ${
            imageOnLeft ? "md:order-last md:border-l md:pl-14" : "md:border-r md:pr-14"
          } border-border`}
        >
          {eyebrow && <p className="mb-5 type-eyebrow">{eyebrow}</p>}
          {heading && <h2 className="type-title-lg">{heading}</h2>}
          <div className="mt-8 type-body">
            <PortableText value={body} />
          </div>
        </div>
        {/* Image */}
        <div className={`relative min-h-[420px] overflow-hidden ${imageOnLeft ? "md:order-first" : ""}`}>
          <Image
            src={imgUrl}
            alt={image.alt ?? ""}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
