import type { HeroSection } from "../../lib/types";
import { key } from "../_helpers";

export const heroSectionFixture: HeroSection = {
  _type: "heroSection",
  _key: key("hero"),
  eyebrow: "New Zealand · Laser Cleaning Solutions",
  heading: "Clean with laser precision. Leave no trace on the environment.",
  subheading:
    "We remove rust, corrosion, and surface contaminants using advanced laser technology — no chemicals, no damage. Auckland-based, servicing industrial, commercial, and infrastructure projects across New Zealand.",
  backgroundImage: null,
  primaryCta: {
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
  secondaryCta: {
    label: "View Our Services",
    style: "secondary",
    link: {
      linkType: "internal",
      newTab: false,
      internalSlug: "services",
      internalType: "page",
      external: null,
    },
  },
  serviceLinks: null,
};
