"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Navigation, SiteSettings, SocialLink } from "../../sanity/lib/types";
import { ctaHref, ctaRel, ctaTarget } from "../../sanity/lib/links";

const LOGO_SRC = "/logo-symbol-inverted.png";

type HeaderProps = {
  siteSettings: SiteSettings | null;
  navigation: Navigation | null;
};

function SocialIcon({ social }: { social: SocialLink }) {
  const label = social.platform.charAt(0).toUpperCase() + social.platform.slice(1);
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="transition-colors hover:text-brand-light"
    >
      {social.platform === "instagram" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ) : social.platform === "facebook" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ) : social.platform === "linkedin" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ) : social.platform === "youtube" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ) : (
        <span className="text-xs font-bold uppercase">{label.slice(0, 2)}</span>
      )}
    </a>
  );
}

export default function Header({ siteSettings, navigation }: HeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY && y > 120) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const brandName = siteSettings?.shortName || "NZLCS";
  const navLinks = navigation?.headerLinks ?? [];
  const socials = siteSettings?.socials ?? [];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 font-sans border-b border-white/20 transition-all duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-2">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={LOGO_SRC}
            alt={siteSettings?.businessName ?? "NZLCS"}
            width={100}
            height={100}
            priority
            className="h-20 w-auto"
          />
          <span className="font-sans text-[18px] font-bold uppercase tracking-[0.15em] text-foreground leading-none">
            {brandName}
          </span>
        </Link>
        <nav className="hidden items-center gap-9 type-micro-lg md:flex">
          {navLinks.map((cta, i) => {
            const href = ctaHref(cta);
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={`${cta.label}-${i}`}
                href={href}
                target={ctaTarget(cta)}
                rel={ctaRel(cta)}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors ${
                  isActive ? "text-brand-light" : "text-foreground hover:text-brand-light"
                }`}
              >
                {cta.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-5 text-foreground md:flex">
          {socials.map((s) => (
            <SocialIcon key={s.platform} social={s} />
          ))}
        </div>
      </div>
    </header>
  );
}
