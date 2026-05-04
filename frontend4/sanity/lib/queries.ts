import { defineQuery } from "next-sanity";

// CTA fragment shared by site-wide nav and (later) section schemas.
// Resolves the link reference target so the renderer doesn't need a second fetch.
// Special case: homePage is a singleton without a slug — the renderer routes it to "/".
const CTA_FIELDS = /* groq */ `
  label,
  style,
  link {
    linkType,
    newTab,
    "internalSlug": internal->slug.current,
    "internalType": internal->_type,
    external
  }
`;

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    businessName,
    shortName,
    tagline,
    phone,
    primaryEmail,
    secondaryEmail,
    address,
    serviceAreas,
    socials,
    footerTagline,
    legalLine,
    privacyUrl,
    termsUrl,
    defaultSEO {
      metaTitle,
      metaDescription,
      noIndex,
      ogImage
    }
  }
`);

export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0] {
    headerLinks[] {
      ${CTA_FIELDS}
    },
    footerColumns[] {
      columnTitle,
      links[] {
        ${CTA_FIELDS}
      }
    }
  }
`);

const POST_CARD_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  title,
  excerpt,
  "category": category->title,
  tags,
  date,
  author,
  readTime,
  coverImage
`;

const PROJECT_CARD_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  title,
  "category": category->title,
  year,
  location,
  summary,
  beforeImage,
  afterImage
`;

export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(date desc) {
    ${POST_CARD_FIELDS}
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)][].slug.current
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_CARD_FIELDS},
    body
  }
`);

export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && slug.current != $slug] | order(date desc) [0...$limit] {
    ${POST_CARD_FIELDS}
  }
`);

export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(year desc) {
    ${PROJECT_CARD_FIELDS}
  }
`);

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)][].slug.current
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_CARD_FIELDS},
    body,
    specs[] { label, value },
    morePhotos[] { label, image }
  }
`);

export const relatedProjectsQuery = defineQuery(`
  *[_type == "project" && slug.current != $slug] | order(year desc) [0...$limit] {
    ${PROJECT_CARD_FIELDS}
  }
`);

// Filter-bar source: only categories tagged for the relevant surface, in
// custom order (then alphabetical) so the Studio order field is respected.
export const postCategoriesQuery = defineQuery(`
  *[_type == "category" && "post" in appliesTo]
  | order(coalesce(order, 9999) asc, title asc)
  { title }
`);

export const projectCategoriesQuery = defineQuery(`
  *[_type == "category" && "project" in appliesTo]
  | order(coalesce(order, 9999) asc, title asc)
  { title }
`);

// ---------------------------------------------------------------------------
// Service / testimonial / FAQ — single-doc projections used standalone
// and inside section projections.
// ---------------------------------------------------------------------------

const SERVICE_CARD_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  title,
  shortTitle,
  shortDescription,
  eyebrowNumber,
  icon,
  cardImage
`;

const SERVICE_FULL_FIELDS = /* groq */ `
  ${SERVICE_CARD_FIELDS},
  intro,
  howItWorks,
  applications[] { label, icon },
  benefits[] { title, description },
  beforeAfterImages[] { label, before, after },
  "relatedProjects": relatedProjects[]-> {
    ${PROJECT_CARD_FIELDS}
  },
  seo
`;

const TESTIMONIAL_FIELDS = /* groq */ `
  _id,
  quote,
  authorName,
  authorRole,
  authorCompany,
  authorImage,
  featured
`;

const FAQ_FIELDS = /* groq */ `
  _id,
  question,
  answer,
  tags,
  order
`;

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(coalesce(eyebrowNumber, title) asc) {
    ${SERVICE_CARD_FIELDS}
  }
`);

export const serviceSlugsQuery = defineQuery(`
  *[_type == "service" && defined(slug.current)][].slug.current
`);

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    ${SERVICE_FULL_FIELDS}
  }
`);

export const featuredTestimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(featured desc, authorName asc) {
    ${TESTIMONIAL_FIELDS}
  }
`);

export const allFaqsQuery = defineQuery(`
  *[_type == "faq"] | order(coalesce(order, 9999) asc, question asc) {
    ${FAQ_FIELDS}
  }
`);

// ---------------------------------------------------------------------------
// Polymorphic section projection — handles all 10 _type variants in one pass
// so pages don't make follow-up fetches per section.
// ---------------------------------------------------------------------------

const SECTION_PROJECTION = /* groq */ `
  _type,
  _key,
  _type == "heroSection" => {
    eyebrow,
    heading,
    subheading,
    backgroundImage,
    primaryCta { ${CTA_FIELDS} },
    secondaryCta { ${CTA_FIELDS} },
    "serviceLinks": serviceLinks[]-> {
      _id,
      "slug": slug.current,
      title,
      eyebrowNumber
    }
  },
  _type == "servicesPreviewSection" => {
    eyebrow,
    heading,
    intro,
    showAll,
    "services": select(
      showAll == true => *[_type == "service"] | order(coalesce(eyebrowNumber, title) asc) { ${SERVICE_CARD_FIELDS} },
      services[]-> { ${SERVICE_CARD_FIELDS} }
    )
  },
  _type == "servicesDetailedSection" => {
    showAll,
    "services": select(
      showAll == true => *[_type == "service"] | order(coalesce(eyebrowNumber, title) asc) { ${SERVICE_FULL_FIELDS} },
      services[]-> { ${SERVICE_FULL_FIELDS} }
    )
  },
  _type == "galleryPreviewSection" => {
    eyebrow,
    heading,
    intro,
    mode,
    count,
    "projects": select(
      mode == "manual" => projects[]-> { ${PROJECT_CARD_FIELDS} },
      *[_type == "project"] | order(year desc) [0...12] { ${PROJECT_CARD_FIELDS} }
    )
  },
  _type == "testimonialsSection" => {
    eyebrow,
    heading,
    "testimonials": testimonials[]-> { ${TESTIMONIAL_FIELDS} }
  },
  _type == "ctaSection" => {
    eyebrow,
    heading,
    body,
    backgroundStyle,
    backgroundImage,
    cta { ${CTA_FIELDS} }
  },
  _type == "richTextSection" => {
    eyebrow,
    heading,
    body,
    image,
    imagePosition
  },
  _type == "statsSection" => {
    eyebrow,
    heading,
    stats[] { value, label }
  },
  _type == "valuesSection" => {
    eyebrow,
    heading,
    intro,
    footnote,
    values[] { numberLabel, eyebrow, title, description, icon, accentColor, image }
  },
  _type == "brandsSection" => {
    eyebrow,
    heading,
    brands[] {
      name,
      logo,
      url
    }
  },
  _type == "faqSection" => {
    eyebrow,
    heading,
    intro,
    "faqs": faqs[]-> { ${FAQ_FIELDS} }
  }
`;

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    sections[] { ${SECTION_PROJECTION} },
    seo
  }
`);

export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    sections[] { ${SECTION_PROJECTION} },
    seo
  }
`);

export const pageSlugsQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)][].slug.current
`);
