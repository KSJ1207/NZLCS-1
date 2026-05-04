import type { SiteSettings } from "../lib/types";

export const siteSettingsFixture: SiteSettings = {
  businessName: "NZ Laser Cleaning Solutions",
  shortName: "NZLCS",
  tagline: "New Zealand's eco-friendly laser cleaning specialists",
  phone: "021 419 933",
  primaryEmail: "info@nzlcs.com",
  secondaryEmail: "dan@nzlcs.com",
  address: {
    street: null,
    suburb: null,
    city: "Auckland",
    postcode: null,
    region: "New Zealand",
  },
  serviceAreas: ["Auckland", "Wellington", "Christchurch", "Tauranga"],
  socials: [
    { platform: "instagram", url: "https://www.instagram.com/" },
    { platform: "facebook", url: "https://www.facebook.com/" },
  ],
  footerTagline:
    "NZ Laser Cleaning Solutions — New Zealand's eco-friendly laser cleaning specialists.",
  legalLine: "© {year} NZLCS. All rights reserved.",
  privacyUrl: null,
  termsUrl: null,
  defaultSEO: {
    metaTitle: "NZLCS — NZ Laser Cleaning Solutions",
    metaDescription:
      "New Zealand's eco-friendly laser cleaning specialists. Rust, graffiti, and industrial surface prep — chemical-free, precise, and safe.",
    noIndex: false,
    ogImage: null,
  },
};
