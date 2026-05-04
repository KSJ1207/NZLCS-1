import type { HomePage } from "../lib/types";
import { brandsSectionFixture } from "./sections/brands";
import { ctaSectionFixture } from "./sections/cta";
import { galleryPreviewSectionFixture } from "./sections/galleryPreview";
import { heroSectionFixture } from "./sections/hero";
import { servicesPreviewSectionFixture } from "./sections/servicesPreview";
import { statsSectionFixture } from "./sections/stats";
import { testimonialsSectionFixture } from "./sections/testimonials";
import { valuesSectionFixture } from "./sections/values";

export const homePageFixture: HomePage = {
  sections: [
    heroSectionFixture,
    servicesPreviewSectionFixture,
    valuesSectionFixture,
    galleryPreviewSectionFixture,
    statsSectionFixture,
    brandsSectionFixture,
    testimonialsSectionFixture,
    ctaSectionFixture,
  ],
  seo: null,
};
