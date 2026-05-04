import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ServicesPreviewSection from "../../app/components/sections/ServicesPreviewSection";
import {
  servicesPreviewSectionFixture,
  serviceCardsFixture,
} from "../../sanity/fixtures";

const meta: Meta<typeof ServicesPreviewSection> = {
  title: "Organisms/Sections/ServicesPreview",
  component: ServicesPreviewSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof ServicesPreviewSection>;

export const Default: Story = { args: { section: servicesPreviewSectionFixture } };

export const TwoServices: Story = {
  args: {
    section: { ...servicesPreviewSectionFixture, services: serviceCardsFixture.slice(0, 2) },
  },
};

export const NoIntro: Story = {
  args: { section: { ...servicesPreviewSectionFixture, intro: null } },
};
