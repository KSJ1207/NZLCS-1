import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FaqSection from "../../app/components/sections/FaqSection";
import { faqSectionFixture, faqsFixture } from "../../sanity/fixtures";

const meta: Meta<typeof FaqSection> = {
  title: "Organisms/Sections/FAQ",
  component: FaqSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof FaqSection>;

export const Default: Story = { args: { section: faqSectionFixture } };

export const SingleFaq: Story = {
  args: { section: { ...faqSectionFixture, faqs: faqsFixture.slice(0, 1) } },
};

export const WithIntro: Story = {
  args: {
    section: {
      ...faqSectionFixture,
      intro:
        "If you don't see your question here, send us a photo of the job and we'll come back with a tailored answer.",
    },
  },
};
