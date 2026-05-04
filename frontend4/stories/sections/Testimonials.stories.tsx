import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TestimonialsSection from "../../app/components/sections/TestimonialsSection";
import {
  testimonialsSectionFixture,
  testimonialsFixture,
} from "../../sanity/fixtures";

const meta: Meta<typeof TestimonialsSection> = {
  title: "Organisms/Sections/Testimonials",
  component: TestimonialsSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof TestimonialsSection>;

export const Default: Story = { args: { section: testimonialsSectionFixture } };

export const Single: Story = {
  args: {
    section: {
      ...testimonialsSectionFixture,
      testimonials: testimonialsFixture.slice(0, 1),
    },
  },
};

export const NoHeading: Story = {
  args: {
    section: { ...testimonialsSectionFixture, eyebrow: null, heading: null },
  },
};
