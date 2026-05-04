import type { ValuesSection } from "../../lib/types";
import { key } from "../_helpers";

export const valuesSectionFixture: ValuesSection = {
  _type: "valuesSection",
  _key: key("values"),
  eyebrow: "Why NZLCS",
  heading: "Why choose us?",
  intro:
    "Laser Cleaning isn't just a newer tool — it's a fundamentally better approach. Here's what sets us apart from traditional methods.",
  footnote: null,
  values: [
    {
      numberLabel: "01",
      eyebrow: "Environment",
      title: "Chemical-Free Process",
      description:
        "Laser only — zero chemicals, zero waste. The responsible choice for your team and the environment.",
      icon: "leaf",
      accentColor: "#B25D1F",
      image: null,
    },
    {
      numberLabel: "02",
      eyebrow: "Precision",
      title: "Pinpoint Precision",
      description:
        "Only the contaminant is removed — the substrate stays completely intact and undamaged. No grinding, no abrasion, no surface loss.",
      icon: "crosshair",
      accentColor: "#C47A3A",
      image: null,
    },
    {
      numberLabel: "03",
      eyebrow: "Mobility",
      title: "Mobile On-Site",
      description:
        "We come to you. Portable equipment means minimal disruption and no need to transport assets off-site.",
      icon: "truck",
      accentColor: "#8B4A18",
      image: null,
    },
    {
      numberLabel: "04",
      eyebrow: "Partnership",
      title: "End-to-End Service",
      description:
        "Through our partnership with NZCPM, we manage the full cycle from rust removal through to primer, topcoats, and intumescent coatings — bare steel to finished system.",
      icon: "layout",
      accentColor: "#D4934F",
      image: null,
    },
  ],
};
