import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ValuesSection from "../../app/components/sections/ValuesSection";
import { valuesSectionFixture } from "../../sanity/fixtures";

const meta: Meta<typeof ValuesSection> = {
  title: "Organisms/Sections/Values",
  component: ValuesSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof ValuesSection>;

export const Default: Story = { args: { section: valuesSectionFixture } };

export const TwoValues: Story = {
  args: {
    section: {
      ...valuesSectionFixture,
      values: valuesSectionFixture.values.slice(0, 2),
    },
  },
};

export const WithFootnote: Story = {
  args: {
    section: {
      ...valuesSectionFixture,
      footnote:
        "These four principles guide every project we take on — from first assessment through to final QA.",
    },
  },
};
