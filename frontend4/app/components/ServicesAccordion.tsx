"use client";

import { useState } from "react";

interface FaqItem {
  number: string;
  question: string;
  paragraphs: string[];
  tags: string[];
}

const faqs: FaqItem[] = [
  {
    number: "01",
    question: "How does laser cleaning compare to sandblasting?",
    paragraphs: [
      "Sandblasting removes rust and coatings by propelling abrasive media at high speed — effective, but it leaves behind residue, creates significant dust, and can damage the base material. Laser cleaning uses concentrated light energy to ablate only the contaminant layer, leaving the substrate completely intact and residue-free.",
      "For vehicle underbodies in particular, sandblast residue is visible to experienced buyers and depresses resale value. Laser leaves no trace. For structural steel, laser achieves Sa 2–2.5 cleanliness without the containment, media recovery, and disposal costs associated with blasting.",
    ],
    tags: ["No residue", "Sa 2–2.5 achievable", "No substrate damage"],
  },
  {
    number: "02",
    question: "Will laser cleaning damage my material or substrate?",
    paragraphs: [
      "No — this is one of laser cleaning's core advantages. The laser is calibrated so that the contaminant absorbs the energy and is vaporised, while the substrate beneath reflects it and remains unaffected. The process is precisely controlled and adjustable, making it safe for structural steel, thin-section components, precision fabrications, and heritage surfaces where chemical or abrasive methods would cause damage.",
      "Each job is assessed individually and settings are adjusted accordingly before work begins.",
    ],
    tags: ["Steel safe", "Precision controlled", "Heritage surface compatible"],
  },
  {
    number: "03",
    question: "How do you price a job and how quickly can I get a quote?",
    paragraphs: [
      "Pricing is based on the scope of work — surface area, level of contamination, accessibility, and the surface preparation standard required. Send us a photo of the job and we'll provide an indicative quote within two business days.",
      "For larger or more complex projects, we may arrange a site visit to assess conditions before finalising pricing. There's no charge for assessments on qualifying projects, and all quotes include a clear scope of work with inclusions and exclusions noted.",
    ],
    tags: ["Quote within 2 business days", "Photo-based assessment", "No obligation"],
  },
  {
    number: "04",
    question: "Do you come to our site, or do we need to bring the work to you?",
    paragraphs: [
      "Both options are available. Our equipment is fully portable and we regularly work on-site — at construction sites, industrial facilities, bridges, and dealer yards across the Auckland region and beyond.",
      "For vehicle underbody work, we also operate from our Auckland workshop where vehicles can be dropped off. Whichever option suits your operation, we'll work around your schedule to minimise disruption.",
    ],
    tags: ["Mobile on-site", "Auckland workshop", "NZ-wide service"],
  },
  {
    number: "05",
    question: "Do you provide QA documentation and can you apply protective coatings after cleaning?",
    paragraphs: [
      "Yes to both. Full QA documentation is provided upon completion, confirming the surface cleanliness achieved and the preparation standard met — suitable for handover to coating contractors, project managers, or compliance records.",
      "Through our partnership with NZCPM, a specialist protective coatings contractor, we also offer the complete cycle: laser cleaning followed by primer, topcoats, and intumescent paint application. This means you deal with one coordinated team from bare metal to finished protective system.",
    ],
    tags: ["QA documentation included", "End-to-end with NZCPM", "Primer to topcoat", "Intumescent paint"],
  },
];

export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="border-t border-border">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.number} className="border-b border-border">
            {/* Question row */}
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-5 py-7 text-left"
              aria-expanded={isOpen}
            >
              {/* Number badge */}
              <span className="flex h-7 min-w-[2.5rem] flex-shrink-0 items-center justify-center bg-brand type-micro text-on-brand">
                {item.number}
              </span>

              {/* Question */}
              <span className="flex-1 font-sans text-[15px] font-bold leading-snug md:text-[16px]">
                {item.question}
              </span>

              {/* Toggle icon */}
              <span
                aria-hidden
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center border text-xl font-light transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-brand text-brand"
                    : "border-border text-foreground/60"
                }`}
              >
                +
              </span>
            </button>

            {/* Answer — CSS grid trick for smooth height animation */}
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 pb-8 pl-[calc(2.5rem+1.25rem)]">
                  {item.paragraphs.map((p, pi) => (
                    <p key={pi} className="type-body">
                      {p}
                    </p>
                  ))}

                  {/* Tag pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand/10 px-3 py-1 type-micro text-brand"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
