import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Footer from "../../app/components/Footer";
import { siteSettingsFixture, navigationFixture } from "../../sanity/fixtures";

const meta: Meta<typeof Footer> = {
  title: "Organisms/Layout/Footer",
  component: Footer,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: { siteSettings: siteSettingsFixture, navigation: navigationFixture },
};

export const MinimalColumns: Story = {
  args: {
    siteSettings: siteSettingsFixture,
    navigation: { ...navigationFixture, footerColumns: navigationFixture.footerColumns!.slice(0, 1) },
  },
};

export const NoSocialsNoLegalLinks: Story = {
  args: {
    siteSettings: {
      ...siteSettingsFixture,
      socials: null,
      privacyUrl: null,
      termsUrl: null,
    },
    navigation: navigationFixture,
  },
};
