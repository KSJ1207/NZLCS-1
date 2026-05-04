import type { RichTextSection } from "../../lib/types";
import { key, toPortableText } from "../_helpers";

export const richTextSectionFixture: RichTextSection = {
  _type: "richTextSection",
  _key: key("richText"),
  eyebrow: "Our Story",
  heading: "Built on 50+ years of industry experience in NZ",
  body: toPortableText([
    "NZLCS was established by three Auckland-based partners — BK, Bob, and Dan — each with a strong construction background and hands-on careers spanning decorative painting, protective coatings, anti-graffiti systems, and intumescent fire protection. Between them, they bring over 50 years of combined trade experience to every project.",
    "That experience shaped how we see the problem. Sandblasting and chemical cleaning have long been the industry default — but they leave behind residue, waste, and substrate damage that clients are left to manage. Laser cleaning offered a cleaner answer: no abrasive media, no chemical waste, no damage to the surface beneath.",
    "We built NZLCS to bring that technology to New Zealand in a way that is practical, commercially sound, and genuinely useful for the industries that need it most.",
  ]),
  image: null,
  imagePosition: "right",
};
