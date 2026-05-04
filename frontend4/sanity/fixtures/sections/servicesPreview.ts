import type { ServicesPreviewSection } from "../../lib/types";
import { key } from "../_helpers";
import { serviceCardsFixture } from "../documents/services";

export const servicesPreviewSectionFixture: ServicesPreviewSection = {
  _type: "servicesPreviewSection",
  _key: key("servicesPreview"),
  eyebrow: "Services",
  heading: "What We Do",
  intro:
    "Precise, eco-friendly laser technology for a wide range of surfaces and industries. From rust removal to vehicle underbody treatment and industrial prep — one tool, no chemicals.",
  showAll: false,
  services: serviceCardsFixture,
};
