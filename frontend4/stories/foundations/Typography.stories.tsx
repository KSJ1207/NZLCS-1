import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#141311" },
        { name: "surface", value: "#1E1D1A" },
        { name: "light", value: "#faf8f4" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * "In Context" — a realistic page section showing the scale working as a
 * system. Composition mirrors the Services page: eyebrow → page title →
 * lead paragraph → section heading → body → subsection → caption.
 */
export const InContext: Story = {
  render: () => (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <div className="container-page pt-24 pb-32">
        {/* Page hero */}
        <p className="mb-5 type-eyebrow">Our Services</p>
        <h1 className="max-w-3xl type-title-xl">
          Setting a new standard for laser cleaning in New Zealand.
        </h1>
        <p className="mt-8 max-w-xl type-body-lg">
          From structural steel rust removal to vehicle underbody treatment and
          industrial surface prep — NZLCS delivers chemical-free, residue-free
          cleaning for projects across New Zealand.
        </p>

        {/* Section break */}
        <div className="mt-24 border-t border-border pt-16">
          <p className="mb-3 type-eyebrow">Service 01</p>
          <h2 className="type-title-lg">Rust &amp; Oxide Removal</h2>
          <p className="mt-5 max-w-2xl type-body">
            Rust left untreated leads to structural failure, costly rework, and
            coating system breakdown. Traditional abrasive blasting removes rust —
            but it also damages the substrate, creates significant waste, and
            leaves behind blast media residue that experienced buyers and
            inspectors notice immediately.
          </p>
        </div>

        {/* Sub-section */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 type-eyebrow">How It Works</p>
            <h3 className="type-title-md">PULSE laser ablation</h3>
            <p className="mt-4 type-body">
              Our PULSE laser system delivers concentrated light energy directly
              to the corroded layer. The rust and oxidation absorb the energy and
              are ablated away, leaving the steel clean and structurally intact.
            </p>
          </div>
          <div>
            <p className="mb-4 type-eyebrow">Standard Achieved</p>
            <h3 className="type-title-md">Sa 2.5 (near-white)</h3>
            <p className="mt-4 type-body">
              Cleanliness levels from St 3 to Sa 2.5 are achievable to
              specification, with the surface profile required for coating
              adhesion. Full QA documentation provided.
            </p>
          </div>
        </div>

        {/* Card row */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            ["Structural steel", "Beams, columns, and connections."],
            ["Marine assets", "Coastal steel, jetties, vessels."],
            ["Heritage surfaces", "Where chemicals or abrasives would damage."],
          ].map(([title, body]) => (
            <div key={title} className="border border-border p-6">
              <h4 className="type-title-sm">{title}</h4>
              <p className="mt-3 type-body">{body}</p>
              <p className="mt-6 type-micro text-brand">Learn more →</p>
            </div>
          ))}
        </div>

        {/* Footer-style metadata */}
        <div className="mt-24 border-t border-border pt-8">
          <p className="type-micro mb-3 text-foreground">Project metadata</p>
          <p className="type-caption">
            Auckland CBD · Completed Q4 2025 · Surface area 240 m² ·
            Sa 2.5 verified · Coating: NZCPM intumescent system.
          </p>
        </div>
      </div>
    </div>
  ),
};
