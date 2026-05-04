import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CtaSection from "../../app/components/sections/CtaSection";
import { ctaSectionFixture } from "../../sanity/fixtures";

const meta: Meta<typeof CtaSection> = {
  title: "Organisms/Sections/CTA",
  component: CtaSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof CtaSection>;

export const Solid: Story = { args: { section: ctaSectionFixture } };

export const Gradient: Story = {
  args: { section: { ...ctaSectionFixture, backgroundStyle: "gradient" } },
};

export const HeadingOnly: Story = {
  args: { section: { ...ctaSectionFixture, eyebrow: null, body: null } },
};
