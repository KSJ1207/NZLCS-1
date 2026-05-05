import type { StatsSection as StatsSectionT } from "../../../sanity/lib/types";

export default function StatsSection({ section }: { section: StatsSectionT }) {
  const { eyebrow, heading, stats } = section;
  const cols = stats.length === 4 ? "grid-cols-2 sm:grid-cols-4" : stats.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <section>
      {(eyebrow || heading) && (
        <div className="container-page pt-20 pb-10 text-center">
          {eyebrow && <p className="mb-3 type-eyebrow">{eyebrow}</p>}
          {heading && <h2 className="type-title-lg">{heading}</h2>}
        </div>
      )}
      <div className="pt-16 pb-16 md:pb-20 lg:pb-24 2xl:pb-28">
        <div className="border-y border-border">
          <div className={`container-page grid ${cols} py-14 text-center`}>
            {stats.map((s, i) => (
              <div key={`${s.value}-${i}`}>
                <div className="font-sans text-[clamp(2.25rem,4vw,3rem)] font-bold text-brand">
                  {s.value}
                </div>
                <div className="mt-2 type-micro text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
