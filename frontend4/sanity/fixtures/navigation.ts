import type { Navigation, ResolvedCta } from "../lib/types";

function internal(label: string, slug: string, type: ResolvedCta["link"]["internalType"]): ResolvedCta {
  return {
    label,
    style: "primary",
    link: {
      linkType: "internal",
      newTab: false,
      internalSlug: slug,
      internalType: type,
      external: null,
    },
  };
}

export const navigationFixture: Navigation = {
  headerLinks: [
    internal("Home", "home", "page"),
    internal("Services", "services", "page"),
    internal("About", "about", "page"),
    internal("Gallery", "gallery", "page"),
    internal("Blog", "blog", "page"),
    internal("Contact", "contact", "page"),
  ],
  footerColumns: [
    {
      columnTitle: "Services",
      links: [
        internal("Rust Removal", "rust-oxide-removal", "service"),
        internal("Vehicle Body Prep", "vehicle-rust-removal", "service"),
        internal("Industrial Prep", "industrial-surface-prep", "service"),
      ],
    },
    {
      columnTitle: "Company",
      links: [
        internal("About Us", "about", "page"),
        internal("Gallery", "gallery", "page"),
        internal("Blog", "blog", "page"),
        internal("Contact", "contact", "page"),
      ],
    },
  ],
};
