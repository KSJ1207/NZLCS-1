import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SectionRenderer from "../../app/components/sections/SectionRenderer";
import { homePageFixture, aboutPageFixture, servicesPageFixture } from "../../sanity/fixtures";

const meta: Meta<typeof SectionRenderer> = {
  title: "Organisms/SectionRenderer",
  component: SectionRenderer,
  parameters: { layout: "fullscreen", backgrounds: { default: "dark" } },
};
export default meta;

type Story = StoryObj<typeof SectionRenderer>;

export const HomeKitchenSink: Story = {
  args: { sections: homePageFixture.sections },
};

export const AboutPage: Story = {
  args: { sections: aboutPageFixture.sections },
};

export const ServicesPage: Story = {
  args: { sections: servicesPageFixture.sections },
};
