import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

const meta: Meta = {
  title: "Foundations/Typography/Body",
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
      {children}
      <p className="mt-5 font-mono text-[12px] text-muted">{meta}</p>
    </div>
  );
}

export const BodyLG: Story = {
  render: () => (
    <Sample
      klass="type-body-lg"
      meta="Nunito Sans · 18px · 400 · line-height 2 · color var(--muted)"
    >
      <p className="type-body-lg max-w-prose">
        Our PULSE laser system delivers concentrated light energy directly to the
        corroded layer. The rust and oxidation absorb the energy and are ablated
        away, leaving the steel clean and structurally intact.
      </p>
    </Sample>
  ),
};

export const Body: Story = {
  render: () => (
    <Sample
      klass="type-body"
      meta="Nunito Sans · 16px · 400 · line-height 1.75 · color var(--muted)"
    >
      <p className="type-body max-w-prose">
        Laser cleaning is an eco-friendly, chemical-free process that removes
        rust, paint, graffiti, and other contaminants from metal and other
        surfaces with precision. No abrasives, no solvents — just light. Suitable
        for delicate heritage surfaces, industrial equipment, and everything in
        between.
      </p>
    </Sample>
  ),
};

export const Caption: Story = {
  render: () => (
    <Sample
      klass="type-caption"
      meta="Nunito Sans · 14px · 400 · line-height 1.6 · color var(--muted)"
    >
      <p className="type-caption max-w-prose">
        NZ Laser Cleaning Solutions — New Zealand&apos;s eco-friendly laser
        cleaning specialists. Auckland-based, serving industrial, commercial, and
        infrastructure projects nationwide.
      </p>
    </Sample>
  ),
};

/**
 * All three body sizes stacked, so you can compare line-height and weight
 * cadence between lead, default, and caption.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="bg-background text-foreground p-8 font-sans space-y-10">
      <div>
        <p className="type-micro text-muted mb-3">type-body-lg</p>
        <p className="type-body-lg max-w-prose">
          Our PULSE laser system delivers concentrated light energy directly to
          the corroded layer. The rust and oxidation absorb the energy and are
          ablated away, leaving the steel clean and structurally intact.
        </p>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-body</p>
        <p className="type-body max-w-prose">
          Laser cleaning is an eco-friendly, chemical-free process that removes
          rust, paint, graffiti, and other contaminants from metal and other
          surfaces with precision. No abrasives, no solvents — just light.
        </p>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-caption</p>
        <p className="type-caption max-w-prose">
          © {new Date().getFullYear()} NZ Laser Cleaning Solutions Ltd. All
          rights reserved. Auckland-based, serving industrial, commercial, and
          infrastructure projects nationwide.
        </p>
      </div>
    </div>
  ),
};
