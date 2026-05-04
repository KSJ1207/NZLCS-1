// Existing documents
import { category } from "./documents/category";
import { post } from "./documents/post";
import { project } from "./documents/project";

// New documents (page-builder + structured types)
import { page } from "./documents/page";
import { service } from "./documents/service";
import { testimonial } from "./documents/testimonial";
import { faq } from "./documents/faq";

// Singletons
import { homePage } from "./singletons/homePage";
import { navigation } from "./singletons/navigation";
import { siteSettings } from "./singletons/siteSettings";

// Reusable objects
import { cta } from "./objects/cta";
import { link } from "./objects/link";
import { partnerBrand } from "./objects/partnerBrand";
import { richImage } from "./objects/richImage";
import { seo } from "./objects/seo";
import { stat } from "./objects/stat";
import { valueProp } from "./objects/valueProp";

// Sections (page-builder blocks)
import { brandsSection } from "./sections/brandsSection";
import { ctaSection } from "./sections/ctaSection";
import { faqSection } from "./sections/faqSection";
import { galleryPreviewSection } from "./sections/galleryPreviewSection";
import { heroSection } from "./sections/heroSection";
import { richTextSection } from "./sections/richTextSection";
import { servicesDetailedSection } from "./sections/servicesDetailedSection";
import { servicesPreviewSection } from "./sections/servicesPreviewSection";
import { statsSection } from "./sections/statsSection";
import { testimonialsSection } from "./sections/testimonialsSection";
import { valuesSection } from "./sections/valuesSection";

export const schemaTypes = [
  // Singletons
  siteSettings,
  navigation,
  homePage,
  // Documents
  page,
  service,
  post,
  project,
  testimonial,
  faq,
  category,
  // Objects
  seo,
  link,
  cta,
  richImage,
  valueProp,
  stat,
  partnerBrand,
  // Sections
  heroSection,
  servicesPreviewSection,
  servicesDetailedSection,
  galleryPreviewSection,
  testimonialsSection,
  ctaSection,
  richTextSection,
  statsSection,
  valuesSection,
  brandsSection,
  faqSection,
];

// IDs of singleton document types — used by structure.ts and document actions
// to hide create/duplicate/delete from the studio UI.
export const SINGLETON_TYPES = ["siteSettings", "navigation", "homePage"] as const;
export type SingletonType = (typeof SINGLETON_TYPES)[number];

// Section _type names — used by SectionRenderer and the queries layer.
export const SECTION_TYPES = [
  "heroSection",
  "servicesPreviewSection",
  "servicesDetailedSection",
  "galleryPreviewSection",
  "testimonialsSection",
  "ctaSection",
  "richTextSection",
  "statsSection",
  "valuesSection",
  "brandsSection",
  "faqSection",
] as const;
export type SectionType = (typeof SECTION_TYPES)[number];
