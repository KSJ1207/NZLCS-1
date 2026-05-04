import type { FaqSection } from "../../lib/types";
import { key } from "../_helpers";
import { faqsFixture } from "../documents/faqs";

export const faqSectionFixture: FaqSection = {
  _type: "faqSection",
  _key: key("faq"),
  eyebrow: "FAQ",
  heading: "Frequently asked questions.",
  intro: null,
  faqs: faqsFixture,
};
