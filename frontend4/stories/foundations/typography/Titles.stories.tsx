import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

const meta: Meta = {
  title: "Foundations/Typography/Titles",
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

export const TitleXL: Story = {
  render: () => (
    <Sample
      klass="type-title-xl"
      meta="Josefin Sans · clamp(2.5rem, 6vw, 4rem) → 40–64px · 700 · line-height 1.05"
    >
      <h1 className="type-title-xl">NZ Laser Cleaning Solutions</h1>
    </Sample>
  ),
};

export const TitleLG: Story = {
  render: () => (
    <Sample
      klass="type-title-lg"
      meta="Josefin Sans · clamp(2rem, 4vw, 3rem) → 32–48px · 700 · line-height 1.15"
    >
      <h2 className="type-title-lg">Industrial Surface Prep</h2>
    </Sample>
  ),
};

export const TitleMD: Story = {
  render: () => (
    <Sample
      klass="type-title-md"
      meta="Josefin Sans · clamp(1.75rem, 3vw, 2.25rem) → 28–36px · 700 · line-height 1.2"
    >
      <h3 className="type-title-md">Similar projects.</h3>
    </Sample>
  ),
};

export const TitleSM: Story = {
  render: () => (
    <Sample
      klass="type-title-sm"
      meta="Josefin Sans · 1.5rem · 24px · 700 · line-height 1.25"
    >
      <h4 className="type-title-sm">Rust &amp; Oxide Removal</h4>
    </Sample>
  ),
};

export const TitleXS: Story = {
  render: () => (
    <Sample
      klass="type-title-xs"
      meta="Josefin Sans · 1.25rem · 20px · 700 · line-height 1.25"
    >
      <h5 className="type-title-xs">Surface preparation</h5>
    </Sample>
  ),
};

/**
 * All five title sizes stacked, so you can see the rhythm of the scale
 * and judge whether two adjacent steps feel competitive in a given layout.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="bg-background text-foreground p-8 font-sans space-y-10">
      <div>
        <p className="type-micro text-muted mb-3">type-title-xl</p>
        <h1 className="type-title-xl">NZ Laser Cleaning Solutions</h1>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-title-lg</p>
        <h2 className="type-title-lg">Industrial Surface Prep</h2>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-title-md</p>
        <h3 className="type-title-md">Similar projects.</h3>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-title-sm</p>
        <h4 className="type-title-sm">Rust &amp; Oxide Removal</h4>
      </div>
      <div>
        <p className="type-micro text-muted mb-3">type-title-xs</p>
        <h5 className="type-title-xs">Surface preparation</h5>
      </div>
    </div>
  ),
};
