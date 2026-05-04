import type { Testimonial } from "../../lib/types";

export const testimonialsFixture: Testimonial[] = [
  {
    _id: "testimonial-bridge-pm",
    quote:
      "NZLCS delivered the cleanest substrate we've ever handed off to our coating crew. Two days ahead of schedule, no waste to manage on site, and the QA pack was on my desk before the end of the week.",
    authorName: "James Whitford",
    authorRole: "Project Manager",
    authorCompany: "Auckland Heritage Bridges",
    authorImage: null,
    featured: true,
  },
  {
    _id: "testimonial-dealer",
    quote:
      "We import a lot of Japanese vehicles and the underbody corrosion always slowed our turnover. NZLCS clean a chassis in a day, residue-free, and the vehicles present at full asking price the next morning.",
    authorName: "Tama Kahu",
    authorRole: "Dealer Principal",
    authorCompany: "South Auckland Imports",
    authorImage: null,
    featured: true,
  },
  {
    _id: "testimonial-fabricator",
    quote:
      "The shop runs without interruption while their portable cell handles the post-weld cleanup. Components go straight to packing — no intermediate clean step. It paid for itself inside two months.",
    authorName: "Sandra Pearce",
    authorRole: "Operations Lead",
    authorCompany: "Tauranga Fabrication Ltd",
    authorImage: null,
    featured: false,
  },
];
