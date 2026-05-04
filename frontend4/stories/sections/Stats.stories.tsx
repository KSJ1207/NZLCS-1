import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import StatsSection from "../../app/components/sections/StatsSection";
import { statsSectionFixture } from "../../sanity/fixtures";

const meta: Meta<typeof StatsSection> = {
  title: "Organisms/Sections/Stats",
  component: StatsSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof StatsSection>;

export const Default: Story = { args: { section: statsSectionFixture } };

export const TwoStats: Story = {
  args: {
    section: {
      ...statsSectionFixture,
      stats: statsSectionFixture.stats.slice(0, 2),
    },
  },
};
