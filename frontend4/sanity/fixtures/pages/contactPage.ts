import type { Page } from "../../lib/types";
import { ctaSectionFixture } from "../sections/cta";
import { heroSectionFixture } from "../sections/hero";
import { key } from "../_helpers";

export const contactPageFixture: Page = {
  title: "Contact",
  slug: "contact",
  sections: [
    {
      ...heroSectionFixture,
      _key: key("contactHero"),
      eyebrow: "Contact",
      heading: "Get in touch.",
      subheading:
        "Tell us about your site, your surfaces, and your timeline. We'll come back with a clear scope, a fixed price, and a date — usually within two business days.",
      primaryCta: null,
      secondaryCta: null,
    },
    {
      ...ctaSectionFixture,
      _key: key("contactCta"),
      eyebrow: "Visit Us",
      heading: "Our Office",
      body: "Based in Auckland, serving industrial and commercial sites across New Zealand.",
    },
  ],
  seo: null,
};
