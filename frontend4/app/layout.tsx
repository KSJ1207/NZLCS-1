import type { Metadata } from "next";
import { Josefin_Sans, Nunito_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HideOnStudio from "./components/HideOnStudio";
import VisualEditingTrigger from "./components/VisualEditingTrigger";
import { sanityFetch } from "../sanity/lib/fetch";
import { siteSettingsQuery, navigationQuery } from "../sanity/lib/queries";
import type { Navigation, SiteSettings } from "../sanity/lib/types";

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const nunito = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const FALLBACK_TITLE = "NZLCS — NZ Laser Cleaning Solutions";
const FALLBACK_DESCRIPTION =
  "New Zealand's eco-friendly laser cleaning specialists. Rust, graffiti, and industrial surface prep — chemical-free, precise, and safe.";

async function getLayoutData(): Promise<{
  siteSettings: SiteSettings | null;
  navigation: Navigation | null;
}> {
  const [siteSettings, navigation] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings", "layout"],
    }),
    sanityFetch<Navigation | null>({
      query: navigationQuery,
      tags: ["navigation", "layout"],
    }),
  ]);
  return { siteSettings, navigation };
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getLayoutData();
  const seo = siteSettings?.defaultSEO;
  return {
    title: seo?.metaTitle || siteSettings?.businessName || FALLBACK_TITLE,
    description: seo?.metaDescription || siteSettings?.tagline || FALLBACK_DESCRIPTION,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteSettings, navigation } = await getLayoutData();
  const { isEnabled: isDraft } = await draftMode();

  return (
    <html lang="en" className={`${josefin.variable} ${nunito.variable} h-full antialiased`}>
      <body className={`${josefin.className} min-h-full font-sans bg-background text-foreground`}>
        <HideOnStudio>
          <Header siteSettings={siteSettings} navigation={navigation} />
        </HideOnStudio>
        {children}
        <HideOnStudio>
          <Footer siteSettings={siteSettings} navigation={navigation} />
        </HideOnStudio>
        {isDraft && <VisualEditingTrigger />}
      </body>
    </html>
  );
}
