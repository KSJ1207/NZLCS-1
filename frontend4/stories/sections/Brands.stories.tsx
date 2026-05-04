import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BrandsSection from "../../app/components/sections/BrandsSection";
import { brandsSectionFixture } from "../../sanity/fixtures";

const meta: Meta<typeof BrandsSection> = {
  title: "Organisms/Sections/Brands",
  component: BrandsSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof BrandsSection>;

export const Default: Story = { args: { section: brandsSectionFixture } };

export const TwoBrands: Story = {
  args: {
    section: {
      ...brandsSectionFixture,
      brands: brandsSectionFixture.brands.slice(0, 2),
    },
  },
};
