import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

const meta: Meta = {
  title: "Foundations/Typography/Micro",
  parameters: {
    layout: "padded",
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

function Sample({
  klass,
  meta,
  children,
}: {
  klass: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-background text-foreground p-8 font-sans">
      <p className="type-micro text-muted mb-4">{klass}</p>
      <div className="py-3">{children}</div>
      <p className="mt-5 font-mono text-[12px] text-muted">{meta}</p>
    </div>
  );
}

export const Eyebrow: Story = {
  render: () => (
    <Sample
      klass="type-eyebrow"
      meta="Josefin Sans · 14px · 700 · uppercase · tracking 0.22em · color var(--brand) #D4834A"
    >
      <span className="type-eyebrow">Our Services</span>
    </Sample>
  ),
};

export const MicroLG: Story = {
  render: () => (
    <Sample
      klass="type-micro-lg"
      meta="Josefin Sans · 14px · 700 · uppercase · tracking 0.18em"
    >
      <span className="type-micro-lg text-foreground">Services</span>
    </Sample>
  ),
};

export const Micro: Story = {
  render: () => (
    <Sample
      klass="type-micro"
      meta="Josefin Sans · 12px · 700 · uppercase · tracking 0.20em"
    >
      <span className="type-micro text-foreground">Get a Free Quote</span>
    </Sample>
  ),
};

/**
 * All three micro sizes stacked. The eyebrow has brand-color baked in;
 * micro and micro-lg inherit color from their context.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="bg-background text-foreground p-8 font-sans space-y-10">
      <div>
        <p className="type-micro text-muted mb-3">type-eyebrow</p>
        <span className="type-eyebrow">Our Services</span>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-micro-lg</p>
        <nav className="flex gap-9">
          <span className="type-micro-lg text-foreground">Home</span>
          <span className="type-micro-lg text-foreground">Services</span>
          <span className="type-micro-lg text-foreground">About</span>
          <span className="type-micro-lg text-foreground">Gallery</span>
          <span className="type-micro-lg text-foreground">Contact</span>
        </nav>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-micro (button)</p>
        <button className="bg-brand px-10 py-4 type-micro text-on-brand">
          Get a Free Quote
        </button>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-micro (form label)</p>
        <label className="type-micro text-foreground/70">Email *</label>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-micro (badge)</p>
        <span className="bg-brand px-3 py-1.5 type-micro text-on-brand">
          Before / After
        </span>
      </div>
    </div>
  ),
};
