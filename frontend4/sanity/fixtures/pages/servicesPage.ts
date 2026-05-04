import type { Page } from "../../lib/types";
import { ctaSectionFixture } from "../sections/cta";
import { faqSectionFixture } from "../sections/faq";
import { heroSectionFixture } from "../sections/hero";
import { key } from "../_helpers";

export const servicesPageFixture: Page = {
  title: "Services",
  slug: "services",
  sections: [
    {
      ...heroSectionFixture,
      _key: key("servicesHero"),
      eyebrow: "Our Services",
      heading: "Setting a new standard for laser cleaning in New Zealand.",
      subheading:
        "From structural steel rust removal to vehicle underbody treatment and industrial surface prep — NZLCS delivers chemical-free, residue-free cleaning for projects across New Zealand.",
      primaryCta: null,
      secondaryCta: null,
    },
    { ...faqSectionFixture, _key: key("servicesFaq") },
    {
      ...ctaSectionFixture,
      _key: key("servicesCta"),
      eyebrow: "Get in Touch",
      heading: "Not sure which service you need?",
      body:
        "Send us a photo of the job and we'll assess it and respond within two business days. No obligation — just a straight answer.",
    },
  ],
  seo: null,
};
