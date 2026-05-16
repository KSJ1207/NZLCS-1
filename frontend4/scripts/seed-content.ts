/**
 * Seed the Sanity dataset with the current site's hardcoded editorial content.
 *
 *   npm run seed-content -- --dry-run    # print what would be created
 *   npm run seed-content                 # write to the dataset
 *   npm run seed-content -- --skip-images   # don't upload images
 *
 * Required env (frontend4/.env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN  (token with Editor permissions)
 *
 * Idempotent: every document uses a deterministic _id and createOrReplace,
 * so re-running overwrites the same docs cleanly. Will overwrite editor edits
 * for those _ids — re-run with care once the client has started editing.
 *
 * Image handling:
 *   - Reads files from frontend4/public/<path>
 *   - Uploads via the assets API; caches by filename inside the script run.
 *   - If a file is missing, logs a TODO and leaves the field null.
 */

import { createClient, type SanityClient, type SanityDocument } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { existsSync, createReadStream, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

const argv = new Set(process.argv.slice(2));
const DRY_RUN = argv.has("--dry-run");
const SKIP_IMAGES = argv.has("--skip-images") || DRY_RUN;
const VERBOSE = argv.has("--verbose");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TODOS: string[] = [];
function todo(message: string) {
  TODOS.push(message);
  console.log(`TODO: ${message}`);
}

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);
const slugObj = (current: string) => ({ _type: "slug", current });
const ref = (id: string) => ({ _type: "reference", _ref: id });

function paragraphsToPortableText(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
}

function loadEnv() {
  const here = dirname(fileURLToPath(import.meta.url));
  const envPath = join(here, "..", ".env.local");
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/i);
      if (!m) continue;
      const k = m[1];
      let v = m[2];
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      if (process.env[k] === undefined) process.env[k] = v;
    }
  } catch {
    // No .env.local — assume env was set externally.
  }
}

const PUBLIC_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
);

const imageCache = new Map<string, string | null>();

async function uploadImage(
  client: SanityClient,
  publicRelativePath: string,
  fieldLabel: string,
): Promise<string | null> {
  if (SKIP_IMAGES) return null;
  if (imageCache.has(publicRelativePath)) {
    return imageCache.get(publicRelativePath) ?? null;
  }
  const fullPath = join(PUBLIC_DIR, publicRelativePath);
  if (!existsSync(fullPath)) {
    todo(`${fieldLabel}: image not found at public/${publicRelativePath}`);
    imageCache.set(publicRelativePath, null);
    return null;
  }
  try {
    const asset = await client.assets.upload(
      "image",
      createReadStream(fullPath),
      { filename: basename(fullPath) },
    );
    if (VERBOSE) console.log(`  uploaded ${publicRelativePath} → ${asset._id}`);
    imageCache.set(publicRelativePath, asset._id);
    return asset._id;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    todo(`${fieldLabel}: upload failed for public/${publicRelativePath} (${msg})`);
    imageCache.set(publicRelativePath, null);
    return null;
  }
}

function imageRef(assetId: string | null, alt: string) {
  if (!assetId) return null;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

// Recursively remove keys whose value is exactly `null`. Sanity Studio flags
// `field: null` on a typed-object field (richImage, cta, etc.) as "Invalid
// property value" — but if the field is simply absent, it's treated as unset
// and validates cleanly. Apply this just before `createOrReplace` so the
// builders can stay readable (writing explicit nulls for "no value here").
function stripNulls<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripNulls(item)) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === null) continue;
      out[k] = stripNulls(v);
    }
    return out as unknown as T;
  }
  return value;
}

// ---------------------------------------------------------------------------
// Document IDs (deterministic for createOrReplace)
// ---------------------------------------------------------------------------

const ID = {
  siteSettings: "siteSettings",
  navigation: "navigation",
  homePage: "homePage",
  pageAbout: "page-about",
  pageServices: "page-services",
  pageContact: "page-contact",
  pageGallery: "page-gallery",
  pageBlog: "page-blog",
  // Note: there's no real "page-home" — the Home page is the homePage singleton.
  serviceRust: "service-rust-oxide-removal",
  serviceVehicle: "service-vehicle-rust-removal",
  serviceIndustrial: "service-industrial-surface-prep",
  testimonialBridge: "testimonial-bridge-pm",
  testimonialDealer: "testimonial-dealer",
  testimonialFabricator: "testimonial-fabricator",
  faq01: "faq-01",
  faq02: "faq-02",
  faq03: "faq-03",
  faq04: "faq-04",
  faq05: "faq-05",
};

// ---------------------------------------------------------------------------
// CTA helpers (raw Sanity shape — link.internal is a reference)
// ---------------------------------------------------------------------------

function ctaInternal(
  label: string,
  refId: string,
  style: "primary" | "secondary" | "ghost" = "primary",
) {
  return {
    _type: "cta",
    _key: key(),
    label,
    style,
    link: {
      _type: "link",
      linkType: "internal",
      newTab: false,
      internal: ref(refId),
    },
  };
}

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

function buildSiteSettings(): SanityDocument {
  return {
    _id: ID.siteSettings,
    _type: "siteSettings",
    businessName: "NZ Laser Cleaning Solutions",
    shortName: "NZLCS",
    tagline: "New Zealand's eco-friendly laser cleaning specialists",
    phone: "021 419 933",
    primaryEmail: "info@nzlcs.com",
    secondaryEmail: "dan@nzlcs.com",
    address: {
      street: "698C Great South Road",
      suburb: "Penrose",
      city: "Auckland",
      region: "New Zealand",
    },
    serviceAreas: ["Auckland", "Wellington", "Christchurch", "Tauranga"],
    socials: [
      {
        _type: "social",
        _key: key(),
        platform: "instagram",
        url: "https://www.instagram.com/",
      },
      {
        _type: "social",
        _key: key(),
        platform: "facebook",
        url: "https://www.facebook.com/",
      },
    ],
    footerTagline:
      "NZ Laser Cleaning Solutions — New Zealand's eco-friendly laser cleaning specialists.",
    legalLine: "© {year} NZLCS. All rights reserved.",
    defaultSEO: {
      _type: "seo",
      metaTitle: "NZLCS — NZ Laser Cleaning Solutions",
      metaDescription:
        "New Zealand's eco-friendly laser cleaning specialists. Rust, graffiti, and industrial surface prep — chemical-free, precise, and safe.",
      noIndex: false,
    },
  } as unknown as SanityDocument;
}

function buildNavigation(): SanityDocument {
  return {
    _id: ID.navigation,
    _type: "navigation",
    headerLinks: [
      ctaInternal("Home", ID.homePage),
      ctaInternal("Services", ID.pageServices),
      ctaInternal("About", ID.pageAbout),
      ctaInternal("Gallery", ID.pageGallery),
      ctaInternal("Blog", ID.pageBlog),
      ctaInternal("Contact", ID.pageContact),
    ],
    footerColumns: [
      {
        _type: "footerColumn",
        _key: key(),
        columnTitle: "Services",
        links: [
          ctaInternal("Rust Removal", ID.serviceRust),
          ctaInternal("Vehicle Body Prep", ID.serviceVehicle),
          ctaInternal("Industrial Prep", ID.serviceIndustrial),
        ],
      },
      {
        _type: "footerColumn",
        _key: key(),
        columnTitle: "Company",
        links: [
          ctaInternal("About Us", ID.pageAbout),
          ctaInternal("Gallery", ID.pageGallery),
          ctaInternal("Blog", ID.pageBlog),
          ctaInternal("Contact", ID.pageContact),
        ],
      },
    ],
  } as unknown as SanityDocument;
}

function buildServices(client: SanityClient) {
  return Promise.all([
    buildService(client, {
      id: ID.serviceRust,
      slug: "rust-oxide-removal",
      eyebrowNumber: "SERVICE 01",
      title: "Rust & Oxide Removal",
      shortDescription:
        "Precision laser removal of rust and oxidation from steel structures, pipelines, bridges, and machinery — without damaging the substrate.",
      intro:
        "Rust left untreated leads to structural failure, costly rework, and coating system breakdown. Traditional abrasive blasting removes rust — but it also damages the substrate, creates significant waste, and leaves behind blast media residue that experienced buyers and inspectors notice immediately.",
      howItWorks:
        "Our PULSE laser system delivers concentrated light energy directly to the corroded layer. The rust and oxidation absorb the energy and are ablated away, leaving the steel clean and structurally intact. Cleanliness levels from St 3 to Sa 2.5 (near-white) are achievable to specification, with the surface profile required for coating adhesion — full QA documentation provided.",
      applications: [
        { label: "Structural steel beams, columns, and connections", icon: "building-2" },
        { label: "Bridges, walkways, and overhead structures", icon: "landmark" },
        { label: "Industrial pipelines and pressure vessels", icon: "gauge" },
        { label: "Vehicle underbodies and frames", icon: "car" },
        { label: "Machinery and equipment", icon: "cog" },
        { label: "Storage tanks and infrastructure assets", icon: "database" },
        { label: "Marine and coastal steel structures", icon: "anchor" },
      ],
      benefits: [
        { title: "Substrate-safe", description: "No grinding, no abrasion, no surface loss." },
        { title: "Chemical-free", description: "Zero solvents, zero hazardous waste." },
        { title: "Mobile delivery", description: "Portable equipment, processed on-site." },
        { title: "QA-ready", description: "Documented cleanliness to ISO 8501-1." },
        { title: "Coating-ready", description: "Surface profile prepared for the next system." },
        { title: "No containment", description: "No dust shrouds or media recovery required." },
      ],
      iconKey: "shield-check",
      cardImagePath: "Service_and_About_sample_image/1 - Rust & Oxide removal.JPG",
    }),
    buildService(client, {
      id: ID.serviceVehicle,
      slug: "vehicle-rust-removal",
      eyebrowNumber: "SERVICE 02",
      title: "Vehicle Body Rust Removal",
      shortDescription:
        "Residue-free underbody rust removal for Japanese import vehicles — no sandblast trace, higher resale value for dealers, WOF-ready.",
      intro:
        "Japanese imports come off the boat with cold-climate corrosion that has to be addressed before sale. Sandblasting works but stamps every vehicle with a tell that experienced buyers recognise immediately.",
      howItWorks:
        "NZLCS laser cleaning removes underbody rust completely and residue-free. We tune the system per substrate — sheet steel, chassis members, suspension components — and finish with a low-energy detail pass on seams and joints. No warping, no media inside box sections, no solvent in the shed.",
      applications: [
        { label: "Japanese import vehicles — Hokkaido origin stock", icon: "car" },
        { label: "Used car dealer preparation for WOF inspection", icon: "clipboard-check" },
        { label: "Pre-sale vehicle presentation and valuation improvement", icon: "trending-up" },
        { label: "Fleet vehicles with underbody corrosion", icon: "truck" },
        { label: "Classic and restoration vehicles", icon: "rotate-ccw" },
        { label: "Insurance or structural assessment preparation", icon: "file-search" },
      ],
      benefits: [
        { title: "Residue-free", description: "No blast media trace anywhere on the vehicle." },
        { title: "WOF-ready", description: "Substrate clean and ready for inspection." },
        { title: "Higher resale", description: "Vehicles present at full asking price." },
        { title: "No warping", description: "No heat distortion on thin panels." },
        { title: "Box-section safe", description: "No media trapped where you can't reach it." },
        { title: "Same-day", description: "Most jobs processed in a single shop visit." },
      ],
      iconKey: "car",
      cardImagePath: "Service_and_About_sample_image/2 - Vehicle.png",
    }),
    buildService(client, {
      id: ID.serviceIndustrial,
      slug: "industrial-surface-prep",
      eyebrowNumber: "SERVICE 03",
      title: "Industrial Surface Preparation",
      shortDescription:
        "Pre-paint surface preparation, coating removal, and weld cleanup for manufacturing and industrial sites across New Zealand.",
      intro:
        "Pressure vessels, fabricated components, and industrial structures live or die on the integrity of their coating system — and that integrity is set on the day the substrate is prepared.",
      howItWorks:
        "We work from the manufacturer's coating spec backwards, dialling pulse energy until the substrate matches the required surface profile. Mill scale, weld spatter, and surface contamination removed in a single controllable pass. Components go straight to the coating booth without an intermediate clean.",
      applications: [
        { label: "Pre-coating surface preparation", icon: "layers" },
        { label: "Mill scale and weld spatter removal", icon: "zap" },
        { label: "Failed coating stripping", icon: "eraser" },
        { label: "Intumescent system recoats", icon: "paintbrush" },
        { label: "Fabricated component cleanup", icon: "settings" },
        { label: "Pressure vessels and tanks", icon: "database" },
        { label: "Architectural and structural steel", icon: "palette" },
      ],
      benefits: [
        { title: "Spec-matched profile", description: "Substrate prepared to coating manufacturer spec." },
        { title: "No abrasive media", description: "Nothing to recover, nothing to dispose of." },
        { title: "Single-pass", description: "Mill scale and contamination off in one operation." },
        { title: "In-shop friendly", description: "Portable cell runs alongside your production." },
        { title: "Coating-ready", description: "Components transition straight to the booth." },
        { title: "Documented", description: "Full QA pack against ISO 8501-1." },
      ],
      iconKey: "wrench",
      cardImagePath: "Service_and_About_sample_image/3 - Industrial.png",
    }),
  ]);
}

async function buildService(
  client: SanityClient,
  input: {
    id: string;
    slug: string;
    eyebrowNumber: string;
    title: string;
    shortDescription: string;
    intro: string;
    howItWorks: string;
    applications: { label: string; icon: string }[];
    benefits: { title: string; description: string }[];
    iconKey: string;
    cardImagePath?: string;
  },
): Promise<SanityDocument> {
  const cardImage = input.cardImagePath
    ? imageRef(
        await uploadImage(client, input.cardImagePath, `service-card:${input.slug}`),
        input.title,
      )
    : null;
  return {
    _id: input.id,
    _type: "service",
    title: input.title,
    slug: slugObj(input.slug),
    eyebrowNumber: input.eyebrowNumber,
    shortTitle: input.title,
    shortDescription: input.shortDescription,
    intro: input.intro,
    howItWorks: input.howItWorks,
    applications: input.applications.map((a) => ({
      _type: "applicationItem",
      _key: key(),
      label: a.label,
      icon: a.icon,
    })),
    benefits: input.benefits.map((b) => ({
      _type: "benefit",
      _key: key(),
      title: b.title,
      description: b.description,
    })),
    icon: input.iconKey,
    cardImage,
  } as unknown as SanityDocument;
}

function buildTestimonials(): SanityDocument[] {
  return [
    {
      _id: ID.testimonialBridge,
      _type: "testimonial",
      quote:
        "NZLCS delivered the cleanest substrate we've ever handed off to our coating crew. Two days ahead of schedule, no waste to manage on site, and the QA pack was on my desk before the end of the week.",
      authorName: "James Whitford",
      authorRole: "Project Manager",
      authorCompany: "Auckland Heritage Bridges",
      featured: true,
    },
    {
      _id: ID.testimonialDealer,
      _type: "testimonial",
      quote:
        "We import a lot of Japanese vehicles and the underbody corrosion always slowed our turnover. NZLCS clean a chassis in a day, residue-free, and the vehicles present at full asking price the next morning.",
      authorName: "Tama Kahu",
      authorRole: "Dealer Principal",
      authorCompany: "South Auckland Imports",
      featured: true,
    },
    {
      _id: ID.testimonialFabricator,
      _type: "testimonial",
      quote:
        "The shop runs without interruption while their portable cell handles the post-weld cleanup. Components go straight to packing — no intermediate clean step. It paid for itself inside two months.",
      authorName: "Sandra Pearce",
      authorRole: "Operations Lead",
      authorCompany: "Tauranga Fabrication Ltd",
      featured: false,
    },
  ] as unknown as SanityDocument[];
}

function buildFaqs(): SanityDocument[] {
  const faqs: { id: string; question: string; tags: string[]; paragraphs: string[]; order: number }[] = [
    {
      id: ID.faq01,
      order: 1,
      question: "How does laser cleaning compare to sandblasting?",
      tags: ["Comparison", "Methods", "Substrate"],
      paragraphs: [
        "Sandblasting works by hurling abrasive media at the substrate, which removes contaminants but also damages the underlying surface — a fact often visible to experienced inspectors. Laser cleaning uses targeted light pulses that vaporise only the contaminant layer, leaving the substrate completely intact.",
        "There's also no media to dispose of, no containment to set up, and far less downtime on site. For most heritage, vehicle, and structural-steel work, laser is the cleaner and faster choice.",
      ],
    },
    {
      id: ID.faq02,
      order: 2,
      question: "Will laser cleaning damage my material or substrate?",
      tags: ["Substrate", "Safety", "QA"],
      paragraphs: [
        "No. Our equipment is calibrated for each job, with the laser energy tuned to the contaminant rather than the substrate. Iron oxide, paint, and surface contamination absorb the energy and ablate away; the parent steel, aluminium, or stone reflects most of it and remains untouched.",
        "We test on a hidden section of every project before committing to visible areas, and we provide full QA documentation showing surface profile and cleanliness levels to ISO 8501-1.",
      ],
    },
    {
      id: ID.faq03,
      order: 3,
      question: "How do you price a job and how quickly can I get a quote?",
      tags: ["Pricing", "Process"],
      paragraphs: [
        "Send us a few photos of the surface and a short description of the job — area, location, what's on the surface, and your timeline. We come back with a fixed-price quote and a target date, usually within two business days.",
        "For larger projects we'll arrange a free site visit before quoting, so the scope is locked in before we commit on price.",
      ],
    },
    {
      id: ID.faq04,
      order: 4,
      question: "Do you come to our site, or do we need to bring the work to you?",
      tags: ["Mobile", "Logistics"],
      paragraphs: [
        "We come to you. Our equipment is fully mobile, and we're regularly on industrial sites, dealer yards, fabrication shops, and council infrastructure across the North Island. South Island work is on a project basis — get in touch.",
        "When the work is portable and the timeline allows, we can also process at our Auckland workshop.",
      ],
    },
    {
      id: ID.faq05,
      order: 5,
      question:
        "Do you provide QA documentation and can you apply protective coatings after cleaning?",
      tags: ["QA", "Coatings", "NZCPM"],
      paragraphs: [
        "Yes — every project ships with QA documentation against ISO 8501-1 cleanliness standards, with photos, surface profile readings, and operator sign-off.",
        "Through our partnership with NZCPM, we can also coordinate the protective coating system after cleaning — primer, topcoats, and intumescent paint — so you get a single point of contact from bare steel to finished surface.",
      ],
    },
  ];
  return faqs.map((f) => ({
    _id: f.id,
    _type: "faq",
    question: f.question,
    answer: paragraphsToPortableText(f.paragraphs),
    tags: f.tags,
    order: f.order,
  })) as unknown as SanityDocument[];
}

// ---------------------------------------------------------------------------
// Section builders (raw Sanity shapes)
// ---------------------------------------------------------------------------

function heroSection(input: {
  eyebrow?: string | null;
  heading: string;
  subheading?: string | null;
  primaryCta?: ReturnType<typeof ctaInternal> | null;
  secondaryCta?: ReturnType<typeof ctaInternal> | null;
  backgroundImage?: ReturnType<typeof imageRef> | null;
  serviceLinkIds?: string[];
}) {
  return {
    _type: "heroSection",
    _key: key(),
    eyebrow: input.eyebrow ?? null,
    heading: input.heading,
    subheading: input.subheading ?? null,
    backgroundImage: input.backgroundImage ?? null,
    primaryCta: input.primaryCta ?? null,
    secondaryCta: input.secondaryCta ?? null,
    serviceLinks: input.serviceLinkIds?.length
      ? input.serviceLinkIds.map((id) => ({ ...ref(id), _key: key() }))
      : null,
  };
}

function servicesPreviewSection(input: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  serviceIds: string[];
}) {
  return {
    _type: "servicesPreviewSection",
    _key: key(),
    eyebrow: input.eyebrow,
    heading: input.heading,
    intro: input.intro,
    showAll: false,
    services: input.serviceIds.map((id) => ({ ...ref(id), _key: key() })),
  };
}

function valuesSection(input: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  values: {
    numberLabel?: string;
    eyebrow?: string;
    title: string;
    description: string;
    icon?: string;
    accentColor?: string;
    image?: ReturnType<typeof imageRef> | null;
  }[];
  footnote?: string;
}) {
  return {
    _type: "valuesSection",
    _key: key(),
    eyebrow: input.eyebrow ?? null,
    heading: input.heading ?? null,
    intro: input.intro ?? null,
    footnote: input.footnote ?? null,
    values: input.values.map((v) => ({
      _type: "valueProp",
      _key: key(),
      numberLabel: v.numberLabel ?? null,
      eyebrow: v.eyebrow ?? null,
      title: v.title,
      description: v.description,
      icon: v.icon ?? null,
      accentColor: v.accentColor ?? null,
      image: v.image ?? null,
    })),
  };
}

function statsSection(input: { eyebrow?: string; heading?: string; stats: { value: string; label: string }[] }) {
  return {
    _type: "statsSection",
    _key: key(),
    eyebrow: input.eyebrow ?? null,
    heading: input.heading ?? null,
    stats: input.stats.map((s) => ({ _type: "stat", _key: key(), value: s.value, label: s.label })),
  };
}

function brandsSection(input: { eyebrow?: string; heading?: string; brands: { name: string; logo?: ReturnType<typeof imageRef> | null; url?: string | null }[] }) {
  return {
    _type: "brandsSection",
    _key: key(),
    eyebrow: input.eyebrow ?? null,
    heading: input.heading ?? null,
    brands: input.brands.map((b) => ({
      _type: "partnerBrand",
      _key: key(),
      name: b.name,
      logo: b.logo ?? null,
      url: b.url ?? null,
    })),
  };
}

function testimonialsSection(input: { eyebrow?: string; heading?: string; testimonialIds: string[] }) {
  return {
    _type: "testimonialsSection",
    _key: key(),
    eyebrow: input.eyebrow ?? null,
    heading: input.heading ?? null,
    testimonials: input.testimonialIds.map((id) => ({ ...ref(id), _key: key() })),
  };
}

function ctaSection(input: { eyebrow?: string; heading: string; body?: string; cta: ReturnType<typeof ctaInternal>; backgroundStyle?: "solid" | "gradient" | "image" }) {
  return {
    _type: "ctaSection",
    _key: key(),
    eyebrow: input.eyebrow ?? null,
    heading: input.heading,
    body: input.body ?? null,
    backgroundStyle: input.backgroundStyle ?? "solid",
    backgroundImage: null,
    cta: input.cta,
  };
}

function richTextSection(input: {
  eyebrow?: string;
  heading?: string;
  paragraphs: string[];
  image?: ReturnType<typeof imageRef> | null;
  imagePosition?: "left" | "right";
}) {
  return {
    _type: "richTextSection",
    _key: key(),
    eyebrow: input.eyebrow ?? null,
    heading: input.heading ?? null,
    body: paragraphsToPortableText(input.paragraphs),
    image: input.image ?? null,
    imagePosition: input.imagePosition ?? "right",
  };
}

function servicesDetailedSection(input: { serviceIds: string[] }) {
  return {
    _type: "servicesDetailedSection",
    _key: key(),
    showAll: false,
    services: input.serviceIds.map((id) => ({ ...ref(id), _key: key() })),
  };
}

function faqSection(input: { eyebrow?: string; heading?: string; intro?: string; faqIds: string[] }) {
  return {
    _type: "faqSection",
    _key: key(),
    eyebrow: input.eyebrow ?? null,
    heading: input.heading ?? null,
    intro: input.intro ?? null,
    faqs: input.faqIds.map((id) => ({ ...ref(id), _key: key() })),
  };
}

// galleryPreviewSection helper removed — original home page didn't include
// recent-work cards. If you want to add a gallery section to a page document,
// the schema still exists; build the section inline at the call site.

// ---------------------------------------------------------------------------
// Composite document builders (use the section helpers above)
// ---------------------------------------------------------------------------

async function buildHomePage(client: SanityClient): Promise<SanityDocument> {
  const partnerBrands = [
    { name: "Clarinspect", file: "partner_logos_officially_provided/Clarinspect.png" },
    { name: "Resene", file: "partner_logos_officially_provided/Resene.png" },
    { name: "Dulux", file: "partner_logos_officially_provided/Dulux.png" },
    { name: "Zone", file: "partner_logos_officially_provided/Zone.png" },
    { name: "AkzoNobel", file: "partner_logos_officially_provided/AkzoNobel.jpg" },
  ];

  const brands = await Promise.all(
    partnerBrands.map(async (b) => ({
      name: b.name,
      logo: imageRef(await uploadImage(client, b.file, `brand:${b.name}`), b.name),
      url: null,
    })),
  );

  // Home "Why Choose Us" cards use images, not icons (image-grid layout).
  const homeValueImages = await Promise.all([
    uploadImage(client, "Service_and_About_sample_image/4 - Chemical.png", "value:chemical-free"),
    uploadImage(client, "Service_and_About_sample_image/5 - Pinpoint.png", "value:precision"),
    uploadImage(client, "Service_and_About_sample_image/6 - Mobile.png", "value:mobile"),
    uploadImage(client, "Service_and_About_sample_image/7 - End to End.png", "value:end-to-end"),
  ]);

  return {
    _id: ID.homePage,
    _type: "homePage",
    internalTitle: "Home Page",
    sections: [
      heroSection({
        eyebrow: "New Zealand · Laser Cleaning Solutions",
        heading: "Clean with laser precision. Leave no trace on the environment.",
        subheading:
          "We remove rust, corrosion, and surface contaminants using advanced laser technology — no chemicals, no damage. Auckland-based, servicing industrial, commercial, and infrastructure projects across New Zealand.",
        primaryCta: ctaInternal("Get a Free Quote →", ID.pageContact),
        secondaryCta: ctaInternal("View Our Services", ID.pageServices, "secondary"),
      }),
      servicesPreviewSection({
        eyebrow: "Services",
        heading: "What We Do",
        intro:
          "Precise, eco-friendly laser technology for a wide range of surfaces and industries. From rust removal to vehicle underbody treatment and industrial prep — one tool, no chemicals.",
        serviceIds: [ID.serviceRust, ID.serviceVehicle, ID.serviceIndustrial],
      }),
      valuesSection({
        eyebrow: "Why NZLCS",
        heading: "Why choose us?",
        intro:
          "Laser Cleaning isn't just a newer tool — it's a fundamentally better approach. Here's what sets us apart from traditional methods.",
        values: [
          { title: "Chemical-Free Process", description: "Laser only — zero chemicals, zero waste. The responsible choice for your team and the environment.", image: imageRef(homeValueImages[0], "Chemical-free process") },
          { title: "Pinpoint Precision", description: "Only the contaminant is removed — the substrate stays completely intact and undamaged. No grinding, no abrasion, no surface loss.", image: imageRef(homeValueImages[1], "Pinpoint precision") },
          { title: "Mobile On-Site", description: "We come to you. Portable equipment means minimal disruption and no need to transport assets off-site.", image: imageRef(homeValueImages[2], "Mobile on-site") },
          { title: "End-to-End Service", description: "From rust removal and surface preparation through to primer, topcoats, and even intumescent coatings — we manage the full cycle. In partnership with NZCPM, a specialist protective coatings contractor, we deliver a single, coordinated service from bare steel to finished system.", image: imageRef(homeValueImages[3], "End-to-end service") },
        ],
      }),
      // Testimonials placeholder — heading only, no quotes wired in (matches the
      // original home page which had just a "Testimonials / Testimonial" header).
      // Editor can attach testimonial refs in studio when they want quotes shown.
      testimonialsSection({
        eyebrow: "Testimonials",
        heading: "Testimonial",
        testimonialIds: [],
      }),
      statsSection({
        stats: [
          { value: "100+", label: "Projects Completed" },
          { value: "50+", label: "Corporate Clients" },
          { value: "NZ-wide", label: "Service Coverage" },
        ],
      }),
      brandsSection({
        eyebrow: "Trusted Partners",
        heading: "We work with the best brands",
        brands,
      }),
      // Note: no galleryPreviewSection — original home page didn't show recent work.
      // Note: no ctaSection — the home page renders a hardcoded QuoteForm.
    ],
    seo: null,
  } as unknown as SanityDocument;
}

async function buildAboutPage(client: SanityClient): Promise<SanityDocument> {
  const aboutImage = imageRef(
    await uploadImage(client, "Service_and_About_sample_image/8 - about us.JPG", "about-story-image"),
    "NZLCS team at work",
  );
  return {
    _id: ID.pageAbout,
    _type: "page",
    title: "About",
    slug: slugObj("about"),
    sections: [
      heroSection({
        eyebrow: "About NZLCS",
        heading: "Built by industry veterans. Powered by laser technology.",
        subheading:
          "NZLCS was founded by industry professionals with deep backgrounds in construction, coatings, and infrastructure — people who understood the limitations of traditional cleaning methods and wanted to offer something better.",
      }),
      richTextSection({
        eyebrow: "Our Story",
        heading: "Built on 50+ years of industry experience in NZ",
        paragraphs: [
          "NZLCS was established by three Auckland-based partners — BK, Bob, and Dan — each with a strong construction background and hands-on careers spanning decorative painting, protective coatings, anti-graffiti systems, and intumescent fire protection. Between them, they bring over 50 years of combined trade experience to every project.",
          "That experience shaped how we see the problem. Sandblasting and chemical cleaning have long been the industry default — but they leave behind residue, waste, and substrate damage that clients are left to manage. Laser cleaning offered a cleaner answer: no abrasive media, no chemical waste, no damage to the surface beneath. We built NZLCS to bring that technology to New Zealand in a way that is practical, commercially sound, and genuinely useful for the industries that need it most.",
        ],
        image: aboutImage,
        imagePosition: "right",
      }),
      valuesSection({
        eyebrow: "What We Stand For",
        heading: "Our values.",
        values: [
          { numberLabel: "01", eyebrow: "Environment", title: "Environmentally responsible", description: "Zero chemicals. No abrasive waste. No hazardous disposal. Laser cleaning is the responsible choice for the environment — and for the people working on-site.", icon: "leaf", accentColor: "#B25D1F" },
          { numberLabel: "02", eyebrow: "Precision", title: "Precision without compromise", description: "We use high-powered laser technology calibrated for each job. The contaminant is removed. The substrate is left exactly as it should be — nothing more, nothing less.", icon: "crosshair", accentColor: "#C47A3A" },
          { numberLabel: "03", eyebrow: "Integrity", title: "Honest and straightforward", description: "We assess each job fairly, quote clearly, and deliver what we promise. No upselling, no guesswork — just reliable work and clear communication, every time.", icon: "search", accentColor: "#8B4A18" },
          { numberLabel: "04", eyebrow: "Partnership", title: "End-to-end service", description: "Through our partnership with NZCPM, we coordinate the full cycle — laser cleaning through to primer, topcoats, and intumescent paint. One team, from bare metal to finished surface.", icon: "layout", accentColor: "#D4934F" },
        ],
        footnote:
          "These four principles guide every project we take on — from first assessment through to final QA.",
      }),
      richTextSection({
        eyebrow: "Our Expertise",
        heading: "Industry knowledge you can rely on.",
        paragraphs: [
          "Our team's background spans construction estimating, quantity surveying, protective coatings, and project delivery. We don't just operate the equipment — we understand the broader project context: the coating systems involved, the surface preparation standards required, the inspection and QA expectations, and the commercial pressures our clients are working with.",
          "That depth of knowledge is what sets us apart from equipment-only operators.",
        ],
      }),
    ],
    seo: null,
  } as unknown as SanityDocument;
}

function buildServicesPage(): SanityDocument {
  return {
    _id: ID.pageServices,
    _type: "page",
    title: "Services",
    slug: slugObj("services"),
    sections: [
      heroSection({
        eyebrow: "Our Services",
        heading: "Setting a new standard for laser cleaning in New Zealand.",
        subheading:
          "From structural steel rust removal to vehicle underbody treatment and industrial surface prep — NZLCS delivers chemical-free, residue-free cleaning for projects across New Zealand.",
        serviceLinkIds: [ID.serviceRust, ID.serviceVehicle, ID.serviceIndustrial],
      }),
      servicesDetailedSection({
        serviceIds: [ID.serviceRust, ID.serviceVehicle, ID.serviceIndustrial],
      }),
      faqSection({
        eyebrow: "FAQ",
        heading: "Frequently asked questions.",
        faqIds: [ID.faq01, ID.faq02, ID.faq03, ID.faq04, ID.faq05],
      }),
      ctaSection({
        eyebrow: "Get in Touch",
        heading: "Not sure which service you need?",
        body: "Send us a photo of the job and we'll assess it and respond within two business days. No obligation — just a straight answer.",
        cta: ctaInternal("Get a Free Quote →", ID.pageContact),
      }),
    ],
    seo: null,
  } as unknown as SanityDocument;
}

function buildContactPage(): SanityDocument {
  return {
    _id: ID.pageContact,
    _type: "page",
    title: "Contact",
    slug: slugObj("contact"),
    sections: [
      heroSection({
        eyebrow: "Contact",
        heading: "Get in touch.",
        subheading:
          "Tell us about your site, your surfaces, and your timeline. We'll come back with a clear scope, a fixed price, and a date — usually within two business days.",
      }),
      ctaSection({
        eyebrow: "Visit Us",
        heading: "Our Office",
        body: "Based in Auckland, serving industrial and commercial sites across New Zealand.",
        cta: ctaInternal("Get a Free Quote →", ID.pageContact),
      }),
    ],
    seo: null,
  } as unknown as SanityDocument;
}

// Stub pages for /gallery and /blog so the navigation references resolve.
// They can be left empty — the actual list pages still render from the
// existing post/project queries.
function buildGalleryStubPage(): SanityDocument {
  return {
    _id: ID.pageGallery,
    _type: "page",
    title: "Gallery",
    slug: slugObj("gallery"),
    sections: [],
    seo: null,
  } as unknown as SanityDocument;
}

function buildBlogStubPage(): SanityDocument {
  return {
    _id: ID.pageBlog,
    _type: "page",
    title: "Blog",
    slug: slugObj("blog"),
    sections: [],
    seo: null,
  } as unknown as SanityDocument;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  loadEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset || (!DRY_RUN && !token)) {
    console.error(
      "Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN (write token not required for --dry-run).",
    );
    process.exit(1);
  }

  const client = createClient({
    projectId: projectId!,
    dataset: dataset!,
    apiVersion: "2026-01-01",
    token: token ?? undefined,
    useCdn: false,
  });

  console.log(
    `Seeding into ${projectId}/${dataset} ${DRY_RUN ? "(DRY RUN — no writes)" : ""}${SKIP_IMAGES ? " (skipping images)" : ""}…`,
  );

  // Build documents in dependency order so referenced ones (services, FAQs,
  // testimonials) are created before docs that reference them.
  const services = await buildServices(client);
  const testimonials = buildTestimonials();
  const faqs = buildFaqs();
  const siteSettings = buildSiteSettings();
  const aboutPage = await buildAboutPage(client);
  const servicesPage = buildServicesPage();
  const contactPage = buildContactPage();
  const galleryPage = buildGalleryStubPage();
  const blogPage = buildBlogStubPage();
  const navigation = buildNavigation();
  const homePage = await buildHomePage(client);

  const docs: SanityDocument[] = [
    siteSettings,
    navigation,
    ...services,
    ...testimonials,
    ...faqs,
    aboutPage,
    servicesPage,
    contactPage,
    galleryPage,
    blogPage,
    homePage,
  ];

  if (DRY_RUN) {
    console.log("\n--- Documents that would be written ---");
    for (const doc of docs) {
      console.log(`  ${doc._type.padEnd(20)} ${doc._id}`);
    }
    console.log(`\nTotal: ${docs.length} documents`);
    if (TODOS.length) {
      console.log(`\nTODOs surfaced (${TODOS.length}):`);
      for (const t of TODOS) console.log(`  - ${t}`);
    }
    return;
  }

  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(stripNulls(doc));
  const result = await tx.commit();
  console.log(`\nWrote ${result.results.length} documents.`);

  if (TODOS.length) {
    console.log(`\nTODOs surfaced (${TODOS.length}):`);
    for (const t of TODOS) console.log(`  - ${t}`);
  } else {
    console.log("\nNo TODOs — all images uploaded cleanly.");
  }

  console.log("\nNext: open /studio and verify content. Once happy, Phase 4 (frontend wiring) can begin.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
