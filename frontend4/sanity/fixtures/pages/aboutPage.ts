import type { Page } from "../../lib/types";
import { heroSectionFixture } from "../sections/hero";
import { richTextSectionFixture } from "../sections/richText";
import { valuesSectionFixture } from "../sections/values";
import { key } from "../_helpers";

export const aboutPageFixture: Page = {
  title: "About",
  slug: "about",
  sections: [
    {
      ...heroSectionFixture,
      _key: key("aboutHero"),
      eyebrow: "About NZLCS",
      heading: "Built by industry veterans. Powered by laser technology.",
      subheading:
        "NZLCS was founded by industry professionals with deep backgrounds in construction, coatings, and infrastructure — people who understood the limitations of traditional cleaning methods and wanted to offer something better.",
      primaryCta: null,
      secondaryCta: null,
    },
    { ...richTextSectionFixture, _key: key("aboutRichText") },
    {
      ...valuesSectionFixture,
      _key: key("aboutValues"),
      eyebrow: "What We Stand For",
      heading: "Our values.",
      footnote:
        "These four principles guide every project we take on — from first assessment through to final QA.",
    },
  ],
  seo: null,
};
