import Image from "next/image";
import {
  Anchor,
  Building2,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Cog,
  Database,
  Eraser,
  FileSearch,
  Gauge,
  Landmark,
  Layers,
  type LucideIcon,
  Paintbrush,
  Palette,
  RotateCcw,
  Settings,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import type {
  ApplicationItem,
  Service,
  ServicesDetailedSection as ServicesDetailedSectionT,
} from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

const APP_ICONS: Record<string, LucideIcon> = {
  "building-2": Building2,
  landmark: Landmark,
  gauge: Gauge,
  car: Car,
  cog: Cog,
  database: Database,
  anchor: Anchor,
  truck: Truck,
  "clipboard-check": ClipboardCheck,
  "trending-up": TrendingUp,
  "rotate-ccw": RotateCcw,
  "file-search": FileSearch,
  settings: Settings,
  wrench: Wrench,
  layers: Layers,
  eraser: Eraser,
  paintbrush: Paintbrush,
  palette: Palette,
  zap: Zap,
};

function ApplicationCard({ app }: { app: ApplicationItem }) {
  const Icon = app.icon ? APP_ICONS[app.icon] : null;
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-surface px-5 py-7 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand/10">
        {Icon ? (
          <Icon size={22} strokeWidth={1.5} className="text-brand" aria-hidden />
        ) : (
          <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
        )}
      </div>
      <p className="type-caption font-bold text-foreground/85">{app.label}</p>
    </div>
  );
}

function BenefitCard({ b }: { b: { title: string; description: string } }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface px-5 py-6">
      <CheckCircle2
        size={20}
        strokeWidth={1.75}
        className="flex-shrink-0 text-brand"
        aria-hidden
      />
      <div>
        <h4 className="font-sans text-[13px] font-bold leading-snug">{b.title}</h4>
        <p className="mt-1.5 type-caption">{b.description}</p>
      </div>
    </div>
  );
}

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const imageOnLeft = index % 2 === 0;
  const cardImage = service.cardImage;
  const heroPair = service.beforeAfterImages?.[0];
  const heroImage = cardImage ?? heroPair?.before ?? heroPair?.after ?? null;
  const heroUrl = heroImage
    ? urlFor(heroImage).width(1200).fit("max").auto("format").url()
    : null;

  return (
    <section
      id={service.slug}
      className="border-t border-border"
      style={{ scrollMarginTop: "24px" }}
    >
      {/* Header row */}
      <div className="mx-auto max-w-[1280px] px-8 pt-20 pb-14">
        {service.eyebrowNumber && (
          <p className="mb-3 type-eyebrow">{service.eyebrowNumber}</p>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <h2 className="type-title-lg">{service.title}</h2>
          <p className="self-end type-body md:pt-3">{service.intro}</p>
        </div>
      </div>

      {/* Image + How It Works */}
      {service.howItWorks && (
        <div className="border-t border-border">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-2">
            <div
              className={[
                "relative min-h-[320px] border-b border-border md:border-b-0",
                imageOnLeft
                  ? "md:order-first md:border-r"
                  : "md:order-last md:border-l",
                "border-border",
              ].join(" ")}
            >
              {heroUrl ? (
                <Image
                  src={heroUrl}
                  alt={heroImage?.alt ?? service.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface text-muted type-caption">
                  Image
                </div>
              )}
            </div>
            <div className={`px-8 py-14 ${imageOnLeft ? "md:order-last" : "md:order-first"}`}>
              <p className="mb-4 type-eyebrow">How It Works</p>
              <p className="type-body">{service.howItWorks}</p>
            </div>
          </div>
        </div>
      )}

      {/* Applications */}
      {service.applications && service.applications.length > 0 && (
        <div className="border-t border-border">
          <div className="mx-auto max-w-[1280px] px-8 pt-12 pb-2">
            <p className="mb-6 type-eyebrow">Ideal Applications</p>
          </div>
          <div className="mx-auto max-w-[1280px] px-8 pb-14">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {service.applications.map((app, i) => (
                <ApplicationCard key={`${app.label}-${i}`} app={app} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <div className="border-t border-border">
          <div className="mx-auto max-w-[1280px] px-8 pt-12 pb-2">
            <p className="mb-6 type-eyebrow">Key Benefits</p>
          </div>
          <div className="mx-auto max-w-[1280px] px-8 pb-16">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {service.benefits.map((b, i) => (
                <BenefitCard key={`${b.title}-${i}`} b={b} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function ServicesDetailedSection({
  section,
}: {
  section: ServicesDetailedSectionT;
}) {
  const services = section.services ?? [];
  if (services.length === 0) return null;
  return (
    <>
      {services.map((s, i) => (
        <ServiceBlock key={s._id} service={s} index={i} />
      ))}
    </>
  );
}
