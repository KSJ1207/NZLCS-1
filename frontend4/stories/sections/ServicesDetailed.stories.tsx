import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ServicesDetailedSection from "../../app/components/sections/ServicesDetailedSection";
import {
  servicesDetailedSectionFixture,
  servicesFullFixture,
} from "../../sanity/fixtures";

const meta: Meta<typeof ServicesDetailedSection> = {
  title: "Organisms/Sections/ServicesDetailed",
  component: ServicesDetailedSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof ServicesDetailedSection>;

export const AllThree: Story = { args: { section: servicesDetailedSectionFixture } };

export const SingleService: Story = {
  args: {
    section: { ...servicesDetailedSectionFixture, services: servicesFullFixture.slice(0, 1) },
  },
};
