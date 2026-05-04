import type { GalleryPreviewSection } from "../../lib/types";
import { key } from "../_helpers";
import { sampleProjectCardsFixture } from "../documents/sampleProjects";

export const galleryPreviewSectionFixture: GalleryPreviewSection = {
  _type: "galleryPreviewSection",
  _key: key("galleryPreview"),
  eyebrow: "Recent Work",
  heading: "Before & After — Results Speak for Themselves.",
  intro:
    "Real results from real jobs across New Zealand. Browse by service type or scroll through our recent project work.",
  mode: "manual",
  count: null,
  projects: sampleProjectCardsFixture,
};
