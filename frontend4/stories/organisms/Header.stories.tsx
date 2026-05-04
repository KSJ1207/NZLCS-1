import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Header from "../../app/components/Header";
import { siteSettingsFixture, navigationFixture } from "../../sanity/fixtures";

const meta: Meta<typeof Header> = {
  title: "Organisms/Layout/Header",
  component: Header,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: { siteSettings: siteSettingsFixture, navigation: navigationFixture },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "200vh" }}>
        <Story />
      </div>
    ),
  ],
};

export const MinimalNav: Story = {
  args: {
    siteSettings: siteSettingsFixture,
    navigation: { ...navigationFixture, headerLinks: navigationFixture.headerLinks!.slice(0, 3) },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "200vh" }}>
        <Story />
      </div>
    ),
  ],
};

export const NoSocials: Story = {
  args: {
    siteSettings: { ...siteSettingsFixture, socials: null },
    navigation: navigationFixture,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "200vh" }}>
        <Story />
      </div>
    ),
  ],
};
