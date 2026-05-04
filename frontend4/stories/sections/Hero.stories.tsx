import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroSection from "../../app/components/sections/HeroSection";
import { heroSectionFixture } from "../../sanity/fixtures";

const meta: Meta<typeof HeroSection> = {
  title: "Organisms/Sections/Hero",
  component: HeroSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: { section: heroSectionFixture },
};

export const NoCtas: Story = {
  args: {
    section: { ...heroSectionFixture, primaryCta: null, secondaryCta: null },
  },
};

export const HeadingOnly: Story = {
  args: {
    section: {
      ...heroSectionFixture,
      eyebrow: null,
      subheading: null,
      primaryCta: null,
      secondaryCta: null,
    },
  },
};

export const LongHeading: Story = {
  args: {
    section: {
      ...heroSectionFixture,
      heading:
        "An exceptionally long hero heading that wraps onto multiple lines on every viewport so we can verify the layout holds up under stress.",
    },
  },
};
