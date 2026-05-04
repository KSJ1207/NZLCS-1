import type { ResolvedCta } from "./types";

const TYPE_TO_PATH: Record<string, string> = {
  page: "",
  service: "/services",
  post: "/blog",
  project: "/gallery",
};

/**
 * Resolve a CTA's link to a concrete href.
 * - Internal links use the document's slug under its conventional path.
 * - External links return the raw URL.
 * - Returns "#" for unresolved links so the page still renders.
 */
export function ctaHref(cta: ResolvedCta | undefined | null): string {
  if (!cta) return "#";
  const { link } = cta;
  if (link.linkType === "external") {
    return link.external || "#";
  }
  // homePage is the singleton — it has no slug, so route to "/".
  if (link.internalType === "homePage") return "/";
  if (!link.internalSlug || !link.internalType) return "#";
  const prefix = TYPE_TO_PATH[link.internalType] ?? "";
  if (link.internalType === "page") {
    return link.internalSlug === "home" ? "/" : `/${link.internalSlug}`;
  }
  return `${prefix}/${link.internalSlug}`;
}

export function ctaTarget(cta: ResolvedCta | undefined | null): "_blank" | undefined {
  return cta?.link.newTab ? "_blank" : undefined;
}

export function ctaRel(cta: ResolvedCta | undefined | null): string | undefined {
  return cta?.link.newTab ? "noopener noreferrer" : undefined;
}
