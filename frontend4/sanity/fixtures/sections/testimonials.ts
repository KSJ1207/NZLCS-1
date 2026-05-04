import type { TestimonialsSection } from "../../lib/types";
import { key } from "../_helpers";
import { testimonialsFixture } from "../documents/testimonials";

export const testimonialsSectionFixture: TestimonialsSection = {
  _type: "testimonialsSection",
  _key: key("testimonials"),
  eyebrow: "Testimonials",
  heading: "What our clients say",
  testimonials: testimonialsFixture,
};
