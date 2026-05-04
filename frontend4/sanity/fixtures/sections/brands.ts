import type { BrandsSection } from "../../lib/types";
import { key } from "../_helpers";

export const brandsSectionFixture: BrandsSection = {
  _type: "brandsSection",
  _key: key("brands"),
  eyebrow: "Trusted Partners",
  heading: "We work with the best brands",
  brands: [
    { name: "Clarinspect", logo: null, url: null },
    { name: "Resene", logo: null, url: null },
    { name: "Dulux", logo: null, url: null },
    { name: "Zone", logo: null, url: null },
    { name: "AkzoNobel", logo: null, url: null },
  ],
};
