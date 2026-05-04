import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RichTextSection from "../../app/components/sections/RichTextSection";
import { richTextSectionFixture } from "../../sanity/fixtures";
import { toPortableText } from "../../sanity/fixtures/_helpers";

const meta: Meta<typeof RichTextSection> = {
  title: "Organisms/Sections/RichText",
  component: RichTextSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof RichTextSection>;

export const Default: Story = { args: { section: richTextSectionFixture } };

export const ShortBody: Story = {
  args: {
    section: {
      ...richTextSectionFixture,
      body: toPortableText([
        "A single paragraph for situations where the page just needs a brief paragraph of context.",
      ]),
    },
  },
};

export const NoHeading: Story = {
  args: {
    section: { ...richTextSectionFixture, eyebrow: null, heading: null },
  },
};
