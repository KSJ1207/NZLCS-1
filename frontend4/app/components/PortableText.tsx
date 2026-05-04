import {
  PortableText as PortableTextReact,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/image";

type Variant = "default" | "large";

type Size = {
  paragraph: string;
  h2: string;
  h3: string;
  blockquote: string;
};

const SIZES: Record<Variant, Size> = {
  // Blog body — matches former <p> style.
  default: {
    paragraph: "mb-6 type-body last:mb-0",
    h2: "mt-10 mb-4 type-title-sm text-foreground",
    h3: "mt-8 mb-3 type-title-xs text-foreground",
    blockquote:
      "my-8 border-l-2 border-brand pl-6 type-body italic text-foreground",
  },
  // Project "About" body — larger.
  large: {
    paragraph: "type-body-lg",
    h2: "mt-8 mb-4 type-title-sm text-foreground",
    h3: "mt-6 mb-3 type-title-xs text-foreground",
    blockquote:
      "my-6 border-l-2 border-brand pl-6 type-body-lg italic text-foreground",
  },
};

function buildComponents(size: Size): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => <p className={size.paragraph}>{children}</p>,
      h2: ({ children }) => <h2 className={size.h2}>{children}</h2>,
      h3: ({ children }) => <h3 className={size.h3}>{children}</h3>,
      blockquote: ({ children }) => (
        <blockquote className={size.blockquote}>{children}</blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-foreground">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => {
        const href = (value as { href?: string })?.href ?? "#";
        const external = /^https?:\/\//.test(href);
        const className =
          "text-brand underline underline-offset-4 hover:text-brand-dark";
        if (external) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {children}
            </a>
          );
        }
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      },
    },
    types: {
      image: ({ value }) => {
        const v = value as { alt?: string };
        const src = urlFor(value).width(1280).fit("max").auto("format").url();
        return (
          <figure className="my-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface">
              <Image
                src={src}
                alt={v.alt ?? ""}
                fill
                sizes="(min-width: 768px) 680px, 100vw"
                className="object-cover"
              />
            </div>
            {v.alt ? (
              <figcaption className="mt-3 type-caption">
                {v.alt}
              </figcaption>
            ) : null}
          </figure>
        );
      },
    },
  };
}

const COMPONENTS_DEFAULT = buildComponents(SIZES.default);
const COMPONENTS_LARGE = buildComponents(SIZES.large);

export default function PortableText({
  value,
  variant = "default",
}: {
  value: PortableTextBlock[] | null | undefined;
  variant?: Variant;
}) {
  if (!value || value.length === 0) return null;
  return (
    <PortableTextReact
      value={value}
      components={variant === "large" ? COMPONENTS_LARGE : COMPONENTS_DEFAULT}
    />
  );
}
