import Image from "next/image";
import Link from "next/link";
import type { Navigation, SiteSettings } from "../../sanity/lib/types";
import { ctaHref, ctaRel, ctaTarget } from "../../sanity/lib/links";

const LOGO_SRC = "/logo-symbol-inverted.png";

type FooterProps = {
  siteSettings: SiteSettings | null;
  navigation: Navigation | null;
};

function formatAddress(addr: SiteSettings["address"]): string | null {
  if (!addr) return null;
  const parts = [addr.street, addr.suburb, addr.city].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

function resolveLegalLine(line: string | null | undefined): string {
  const fallback = `© ${new Date().getFullYear()} NZLCS. All rights reserved.`;
  if (!line) return fallback;
  return line.replace(/\{year\}/g, String(new Date().getFullYear()));
}

export default function Footer({ siteSettings, navigation }: FooterProps) {
  const tagline = siteSettings?.footerTagline;
  const phone = siteSettings?.phone;
  const primaryEmail = siteSettings?.primaryEmail;
  const secondaryEmail = siteSettings?.secondaryEmail;
  const addressLine = formatAddress(siteSettings?.address ?? null);
  const columns = navigation?.footerColumns ?? [];
  const socials = siteSettings?.socials ?? [];
  const legal = resolveLegalLine(siteSettings?.legalLine);
  const privacyUrl = siteSettings?.privacyUrl;
  const termsUrl = siteSettings?.termsUrl;
  const businessName = siteSettings?.businessName ?? "NZLCS";

  return (
    <footer className="border-t border-border">
      <div className="container-page grid grid-cols-2 gap-10 py-20 md:grid-cols-4">
        <div>
          <Image
            src={LOGO_SRC}
            alt={businessName}
            width={96}
            height={96}
            className="h-24 w-auto"
          />
          {tagline && <p className="mt-4 type-caption">{tagline}</p>}
        </div>
        {columns.map((col, ci) => (
          <div key={`${col.columnTitle}-${ci}`}>
            <h5 className="mb-4 type-micro">{col.columnTitle}</h5>
            <ul className="space-y-2 type-caption">
              {col.links.map((cta, li) => (
                <li key={`${cta.label}-${li}`}>
                  <Link
                    href={ctaHref(cta)}
                    target={ctaTarget(cta)}
                    rel={ctaRel(cta)}
                    className="hover:text-brand-light transition-colors"
                  >
                    {cta.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h5 className="mb-4 type-micro">Contact</h5>
          <ul className="space-y-2 type-caption">
            {addressLine && (
              <li>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(addressLine)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-light transition-colors"
                >
                  {addressLine}
                </a>
              </li>
            )}
            {primaryEmail && (
              <li>
                <a href={`mailto:${primaryEmail}`} className="hover:text-brand-light transition-colors">
                  {primaryEmail}
                </a>
              </li>
            )}
            {secondaryEmail && (
              <li>
                <a href={`mailto:${secondaryEmail}`} className="hover:text-brand-light transition-colors">
                  {secondaryEmail}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-brand-light transition-colors">
                  {phone}
                </a>
              </li>
            )}
          </ul>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="flex h-8 w-8 items-center justify-center border border-border text-foreground hover:bg-brand hover:text-on-brand hover:border-brand"
                >
                  <span className="text-xs font-bold uppercase">
                    {s.platform === "facebook" ? "f" : s.platform.slice(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-brand text-on-brand">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 type-micro md:flex-row">
          <span>{legal}</span>
          {(privacyUrl || termsUrl) && (
            <div className="flex gap-6">
              {privacyUrl && <a href={privacyUrl}>Privacy</a>}
              {termsUrl && <a href={termsUrl}>Terms</a>}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
