import type { CtaSection } from "../../lib/types";
import { key } from "../_helpers";

export const ctaSectionFixture: CtaSection = {
  _type: "ctaSection",
  _key: key("cta"),
  eyebrow: "Free Quote Inquiry",
  heading: "Request a Quote",
  body:
    "Drop us a line and we'll get back to you fast. Send a photo of the site and we'll quote it within two business days.",
  backgroundStyle: "solid",
  backgroundImage: null,
  cta: {
    label: "Get a Free Quote →",
    style: "primary",
    link: {
      linkType: "internal",
      newTab: false,
      internalSlug: "contact",
      internalType: "page",
      external: null,
    },
  },
};
