import type { Service, ServiceCard } from "../../lib/types";

export const serviceCardsFixture: ServiceCard[] = [
  {
    _id: "service-rust-oxide-removal",
    slug: "rust-oxide-removal",
    title: "Rust & Oxide Removal",
    shortTitle: "Rust & Oxide Removal",
    shortDescription:
      "Precision laser removal of rust and oxidation from steel structures, pipelines, bridges, and machinery — without damaging the substrate.",
    eyebrowNumber: "SERVICE 01",
    icon: "shield-check",
    cardImage: null,
  },
  {
    _id: "service-vehicle-rust-removal",
    slug: "vehicle-rust-removal",
    title: "Vehicle Body Rust Removal",
    shortTitle: "Vehicle Body Rust Removal",
    shortDescription:
      "Residue-free underbody rust removal for Japanese import vehicles — no sandblast trace, higher resale value for dealers, WOF-ready.",
    eyebrowNumber: "SERVICE 02",
    icon: "car",
    cardImage: null,
  },
  {
    _id: "service-industrial-surface-prep",
    slug: "industrial-surface-prep",
    title: "Industrial Surface Preparation",
    shortTitle: "Industrial Surface Preparation",
    shortDescription:
      "Pre-paint surface preparation, coating removal, and weld cleanup for manufacturing and industrial sites across New Zealand.",
    eyebrowNumber: "SERVICE 03",
    icon: "wrench",
    cardImage: null,
  },
];

export const servicesFullFixture: Service[] = serviceCardsFixture.map((card) => ({
  ...card,
  intro: `${card.title} — ${card.shortDescription}`,
  howItWorks:
    "Our PULSE laser system delivers concentrated light energy directly to the contaminated layer. The substrate stays intact while the contamination is ablated away. Cleanliness levels to specification, with full QA documentation provided.",
  applications: [
    { label: "Bridges and structural steel", icon: "landmark" },
    { label: "Pipelines and pressure vessels", icon: "gauge" },
    { label: "Heritage restoration", icon: "rotate-ccw" },
    { label: "Marine and coastal infrastructure", icon: "anchor" },
  ],
  benefits: [
    { title: "Substrate-safe", description: "No grinding, abrasion, or surface loss." },
    { title: "Chemical-free", description: "Zero solvents or chemical waste." },
    { title: "Mobile", description: "Portable equipment, on-site execution." },
    { title: "Documented", description: "Full QA reporting against ISO 8501-1." },
  ],
  beforeAfterImages: null,
  relatedProjects: null,
  seo: null,
}));
