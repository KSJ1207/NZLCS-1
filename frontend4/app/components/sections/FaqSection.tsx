"use client";

import { useState } from "react";
import PortableText from "../PortableText";
import type { FaqSection as FaqSectionT } from "../../../sanity/lib/types";

export default function FaqSection({ section }: { section: FaqSectionT }) {
  const { eyebrow, heading, intro, faqs } = section;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1280px] px-8 pt-20 pb-14">
        {eyebrow && <p className="mb-4 type-eyebrow">{eyebrow}</p>}
        {heading && <h2 className="type-title-lg">{heading}</h2>}
        {intro && <p className="mt-5 max-w-2xl type-body">{intro}</p>}
      </div>

      <div className="mx-auto max-w-[1280px] px-8 pb-24">
        <div className="border-t border-border">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const number = String(i + 1).padStart(2, "0");
            return (
              <div key={item._id} className="border-b border-border">
                {/* Question row */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-5 py-7 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Number badge */}
                  <span className="flex h-7 min-w-[2.5rem] flex-shrink-0 items-center justify-center bg-brand/10 type-micro text-brand">
                    {number}
                  </span>

                  {/* Question */}
                  <span className="flex-1 font-sans text-[15px] font-bold leading-snug md:text-[16px]">
                    {item.question}
                  </span>

                  {/* Toggle icon — square border, "+" rotates 45° to "x" */}
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
                      <div className="type-body">
                        <PortableText value={item.answer} />
                      </div>
                      {item.tags && item.tags.length > 0 && (
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
