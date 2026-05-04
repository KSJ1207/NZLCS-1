import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GalleryPreviewSection from "../../app/components/sections/GalleryPreviewSection";
import {
  galleryPreviewSectionFixture,
  sampleProjectCardsFixture,
} from "../../sanity/fixtures";

const meta: Meta<typeof GalleryPreviewSection> = {
  title: "Organisms/Sections/GalleryPreview",
  component: GalleryPreviewSection,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof GalleryPreviewSection>;

export const Default: Story = { args: { section: galleryPreviewSectionFixture } };

export const SingleProject: Story = {
  args: {
    section: {
      ...galleryPreviewSectionFixture,
      projects: sampleProjectCardsFixture.slice(0, 1),
    },
  },
};
