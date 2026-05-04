import type { Faq } from "../../lib/types";
import { toPortableText } from "../_helpers";

export const faqsFixture: Faq[] = [
  {
    _id: "faq-01",
    question: "How does laser cleaning compare to sandblasting?",
    answer: toPortableText([
      "Sandblasting works by hurling abrasive media at the substrate, which removes contaminants but also damages the underlying surface — a fact often visible to experienced inspectors. Laser cleaning uses targeted light pulses that vaporise only the contaminant layer, leaving the substrate completely intact.",
      "There's also no media to dispose of, no containment to set up, and far less downtime on site. For most heritage, vehicle, and structural-steel work, laser is the cleaner and faster choice.",
    ]),
    tags: ["Comparison", "Methods", "Substrate"],
    order: 1,
  },
  {
    _id: "faq-02",
    question: "Will laser cleaning damage my material or substrate?",
    answer: toPortableText([
      "No. Our equipment is calibrated for each job, with the laser energy tuned to the contaminant rather than the substrate. Iron oxide, paint, and surface contamination absorb the energy and ablate away; the parent steel, aluminium, or stone reflects most of it and remains untouched.",
      "We test on a hidden section of every project before committing to visible areas, and we provide full QA documentation showing surface profile and cleanliness levels to ISO 8501-1.",
    ]),
    tags: ["Substrate", "Safety", "QA"],
    order: 2,
  },
  {
    _id: "faq-03",
    question: "How do you price a job and how quickly can I get a quote?",
    answer: toPortableText([
      "Send us a few photos of the surface and a short description of the job — area, location, what's on the surface, and your timeline. We come back with a fixed-price quote and a target date, usually within two business days.",
      "For larger projects we'll arrange a free site visit before quoting, so the scope is locked in before we commit on price.",
    ]),
    tags: ["Pricing", "Process"],
    order: 3,
  },
  {
    _id: "faq-04",
    question: "Do you come to our site, or do we need to bring the work to you?",
    answer: toPortableText([
      "We come to you. Our equipment is fully mobile, and we're regularly on industrial sites, dealer yards, fabrication shops, and council infrastructure across the North Island. South Island work is on a project basis — get in touch.",
      "When the work is portable and the timeline allows, we can also process at our Auckland workshop.",
    ]),
    tags: ["Mobile", "Logistics"],
    order: 4,
  },
  {
    _id: "faq-05",
    question:
      "Do you provide QA documentation and can you apply protective coatings after cleaning?",
    answer: toPortableText([
      "Yes — every project ships with QA documentation against ISO 8501-1 cleanliness standards, with photos, surface profile readings, and operator sign-off.",
      "Through our partnership with NZCPM, we can also coordinate the protective coating system after cleaning — primer, topcoats, and intumescent paint — so you get a single point of contact from bare steel to finished surface.",
    ]),
    tags: ["QA", "Coatings", "NZCPM"],
    order: 5,
  },
];
