import type { Section } from "../../../sanity/lib/types";
import BrandsSection from "./BrandsSection";
import CtaSection from "./CtaSection";
import FaqSection from "./FaqSection";
import GalleryPreviewSection from "./GalleryPreviewSection";
import HeroSection from "./HeroSection";
import RichTextSection from "./RichTextSection";
import ServicesDetailedSection from "./ServicesDetailedSection";
import ServicesPreviewSection from "./ServicesPreviewSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import ValuesSection from "./ValuesSection";

export default function SectionRenderer({
  sections,
}: {
  sections: Section[] | null | undefined;
}) {
  if (!sections?.length) return null;
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "heroSection":
            return <HeroSection key={section._key} section={section} />;
          case "servicesPreviewSection":
            return <ServicesPreviewSection key={section._key} section={section} />;
          case "servicesDetailedSection":
            return <ServicesDetailedSection key={section._key} section={section} />;
          case "galleryPreviewSection":
            return <GalleryPreviewSection key={section._key} section={section} />;
          case "testimonialsSection":
            return <TestimonialsSection key={section._key} section={section} />;
          case "ctaSection":
            return <CtaSection key={section._key} section={section} />;
          case "richTextSection":
            return <RichTextSection key={section._key} section={section} />;
          case "statsSection":
            return <StatsSection key={section._key} section={section} />;
          case "valuesSection":
            return <ValuesSection key={section._key} section={section} />;
          case "brandsSection":
            return <BrandsSection key={section._key} section={section} />;
          case "faqSection":
            return <FaqSection key={section._key} section={section} />;
          default: {
            // Exhaustiveness check — fails type-check if a case is missed.
            const _exhaustive: never = section;
            if (process.env.NODE_ENV === "development") {
              console.warn("Unknown section type:", _exhaustive);
            }
            return null;
          }
        }
      })}
    </>
  );
}
