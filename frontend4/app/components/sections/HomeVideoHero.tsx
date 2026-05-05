import Link from "next/link";

const HERO_VIDEO = "/home_video.mp4";

// Art-directed home hero. Layout is intentionally hero-specific (not the
// shared .container-page) so composition can be tuned independently of body
// sections. The text block stays in the left visual zone across viewports;
// the background subject is held centre-right via responsive object-position.
// The video is mirrored (scale-x-[-1]) — preserved from the original hero.
export default function HomeVideoHero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <video
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover object-[58%_center] scale-x-[-1] md:object-[62%_center] xl:object-[65%_center]"
      />

      {/* Left-weighted gradient for text legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
      {/* Bottom darkening for the bottom-anchored content */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/70" />

      {/* Content layer — anchors content to the bottom of the viewport while
          reserving --nav-safe-area at the top so a tall wrapped headline can't
          slide under the fixed nav. */}
      <div
        className="relative z-20 flex min-h-[100svh] items-end pb-10 sm:pb-14 md:pb-16 lg:pb-20 2xl:pb-24"
        style={{ paddingTop: "var(--nav-safe-area)" }}
      >
        <div className="mx-auto w-full max-w-[1280px] 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-xl md:max-w-2xl 2xl:max-w-[44rem] min-w-0 text-white">
            <p className="mb-5 hero-eyebrow text-brand-light">
              <span className="block">New Zealand</span>
              <span className="block">Laser Cleaning Solutions</span>
            </p>
            <h1 className="hero-title">
              <span className="block">Clean with laser precision.</span>
              <span className="mt-2 md:mt-3 lg:mt-4 block">Leave no trace on the environment.</span>
            </h1>
            <p className="mt-6 max-w-md type-body text-white/85">
              We remove rust, corrosion, and surface contaminants using
              advanced laser technology — no chemicals, no damage.
              Auckland-based, servicing industrial, commercial, and infrastructure projects across New Zealand.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 type-micro">
              <Link
                href="/contact"
                className="border-b border-white pb-1 text-white hover:text-brand-light hover:border-brand-light"
              >
                Get a Free Quote →
              </Link>
              <Link
                href="/services"
                className="border-b border-white pb-1 text-white hover:text-brand-light hover:border-brand-light"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
