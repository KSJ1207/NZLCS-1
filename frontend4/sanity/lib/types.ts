import type { PortableTextBlock } from "@portabletext/react";
import type { Image } from "sanity";

export type SanityImage = Image & {
  alt?: string;
  caption?: string;
};

export type CategoryOption = {
  title: string;
};

// ---------------------------------------------------------------------------
// Site-wide singletons (siteSettings, navigation)
// ---------------------------------------------------------------------------

export type SeoFields = {
  metaTitle: string | null;
  metaDescription: string | null;
  noIndex: boolean | null;
  ogImage: SanityImage | null;
};

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "tiktok";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type SiteSettings = {
  businessName: string;
  shortName: string;
  tagline: string | null;
  phone: string;
  primaryEmail: string;
  secondaryEmail: string | null;
  address: {
    street: string | null;
    suburb: string | null;
    city: string;
    postcode: string | null;
    region: string | null;
  } | null;
  serviceAreas: string[] | null;
  mapEmbedUrl: string | null;
  socials: SocialLink[] | null;
  footerTagline: string | null;
  legalLine: string | null;
  privacyUrl: string | null;
  termsUrl: string | null;
  defaultSEO: SeoFields | null;
};

// CTA shape after GROQ resolves the reference target.
// `internalSlug` + `internalType` come from the CTA_FIELDS fragment in queries.ts.
export type ResolvedCta = {
  label: string;
  style: "primary" | "secondary" | "ghost" | null;
  link: {
    linkType: "internal" | "external";
    newTab: boolean | null;
    internalSlug: string | null;
    internalType: "homePage" | "page" | "service" | "post" | "project" | null;
    external: string | null;
  };
};

export type Navigation = {
  headerLinks: ResolvedCta[] | null;
  footerColumns:
    | {
        columnTitle: string;
        links: ResolvedCta[];
      }[]
    | null;
};

export type PostCard = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[] | null;
  date: string;
  author: string | null;
  readTime: string | null;
  coverImage: SanityImage | null;
};

export type Post = PostCard & {
  body: PortableTextBlock[] | null;
};

export type Spec = { label: string; value: string };

export type MorePhoto = {
  label: string;
  image: SanityImage | null;
};

export type ProjectCard = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  year: number;
  location: string;
  summary: string;
  beforeImage: SanityImage | null;
  afterImage: SanityImage | null;
};

export type Project = ProjectCard & {
  body: PortableTextBlock[] | null;
  specs: Spec[] | null;
  morePhotos: MorePhoto[] | null;
};

// ---------------------------------------------------------------------------
// Service / testimonial / FAQ
// ---------------------------------------------------------------------------

export type ServiceCard = {
  _id: string;
  slug: string;
  title: string;
  shortTitle: string | null;
  shortDescription: string;
  eyebrowNumber: string | null;
  icon: string | null;
  cardImage: SanityImage | null;
};

export type ApplicationItem = { label: string; icon: string | null };
export type Benefit = { title: string; description: string };
export type BeforeAfterPair = {
  label: string | null;
  before: SanityImage | null;
  after: SanityImage | null;
};

export type Service = ServiceCard & {
  intro: string;
  howItWorks: string | null;
  applications: ApplicationItem[] | null;
  benefits: Benefit[] | null;
  beforeAfterImages: BeforeAfterPair[] | null;
  relatedProjects: ProjectCard[] | null;
  seo: SeoFields | null;
};

export type Testimonial = {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
  authorCompany: string | null;
  authorImage: SanityImage | null;
  featured: boolean | null;
};

export type Faq = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  tags: string[] | null;
  order: number | null;
};

// ---------------------------------------------------------------------------
// Section types — the discriminated union used by SectionRenderer
// ---------------------------------------------------------------------------

type SectionBase<T extends string> = {
  _type: T;
  _key: string;
};

export type HeroServiceLink = {
  _id: string;
  slug: string;
  title: string;
  eyebrowNumber: string | null;
};

export type HeroSection = SectionBase<"heroSection"> & {
  eyebrow: string | null;
  heading: string;
  subheading: string | null;
  backgroundImage: SanityImage | null;
  primaryCta: ResolvedCta | null;
  secondaryCta: ResolvedCta | null;
  serviceLinks: HeroServiceLink[] | null;
};

export type ServicesPreviewSection = SectionBase<"servicesPreviewSection"> & {
  eyebrow: string | null;
  heading: string;
  intro: string | null;
  showAll: boolean | null;
  services: ServiceCard[] | null;
};

export type ServicesDetailedSection = SectionBase<"servicesDetailedSection"> & {
  showAll: boolean | null;
  services: Service[] | null;
};

export type GalleryPreviewSection = SectionBase<"galleryPreviewSection"> & {
  eyebrow: string | null;
  heading: string;
  intro: string | null;
  mode: "latest" | "manual" | null;
  count: number | null;
  projects: ProjectCard[] | null;
};

export type TestimonialsSection = SectionBase<"testimonialsSection"> & {
  eyebrow: string | null;
  heading: string | null;
  testimonials: Testimonial[] | null;
};

export type CtaSection = SectionBase<"ctaSection"> & {
  eyebrow: string | null;
  heading: string;
  body: string | null;
  backgroundStyle: "solid" | "gradient" | "image" | null;
  backgroundImage: SanityImage | null;
  cta: ResolvedCta;
};

export type RichTextSection = SectionBase<"richTextSection"> & {
  eyebrow: string | null;
  heading: string | null;
  body: PortableTextBlock[];
  image: SanityImage | null;
  imagePosition: "left" | "right" | null;
};

export type StatItem = { value: string; label: string };
export type StatsSection = SectionBase<"statsSection"> & {
  eyebrow: string | null;
  heading: string | null;
  stats: StatItem[];
};

export type ValueProp = {
  numberLabel: string | null;
  eyebrow: string | null;
  title: string;
  description: string;
  icon: string | null;
  accentColor: string | null;
  image: SanityImage | null;
};
export type ValuesSection = SectionBase<"valuesSection"> & {
  eyebrow: string | null;
  heading: string | null;
  intro: string | null;
  footnote: string | null;
  values: ValueProp[];
};

export type PartnerBrandRef = {
  name: string;
  logo: SanityImage | null;
  url: string | null;
};
export type BrandsSection = SectionBase<"brandsSection"> & {
  eyebrow: string | null;
  heading: string | null;
  brands: PartnerBrandRef[];
};

export type FaqSection = SectionBase<"faqSection"> & {
  eyebrow: string | null;
  heading: string | null;
  intro: string | null;
  faqs: Faq[];
};

export type Section =
  | HeroSection
  | ServicesPreviewSection
  | ServicesDetailedSection
  | GalleryPreviewSection
  | TestimonialsSection
  | CtaSection
  | RichTextSection
  | StatsSection
  | ValuesSection
  | BrandsSection
  | FaqSection;

export type HomePage = {
  sections: Section[] | null;
  seo: SeoFields | null;
};

export type Page = {
  title: string;
  slug: string;
  sections: Section[] | null;
  seo: SeoFields | null;
};
