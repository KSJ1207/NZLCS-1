import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { PortableTextBlock } from "@portabletext/react";
import PortableText from "../../app/components/PortableText";
import { toPortableText } from "../../sanity/fixtures/_helpers";

const meta: Meta<typeof PortableText> = {
  title: "Organisms/PortableText",
  component: PortableText,
  parameters: { layout: "padded", backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[680px] bg-background p-12 text-foreground">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PortableText>;

const longBody = toPortableText([
  "Heritage steelwork is unforgiving. The wrong tool can pit, score, or thin a member that has stood for a century, and a single careless pass can mean a costly remediation under the watch of the council heritage office.",
  "When we were called in to a Wellington truss bridge late last summer, the brief was tight: remove the loose oxide and flaking primer, leave the original mill scale intact where it was still bonded, and produce a uniform substrate ready for the engineer's chosen coating.",
  "We selected a 200W pulsed-fibre laser tuned to ablate iron oxide preferentially over base steel. The pulse energy and scan speed were dialled in on a hidden gusset plate before we touched anything visible. The result was a crisp transition between cleaned and uncleaned zones, with no measurable loss of parent material.",
]);

// A handcrafted block array that exercises every renderer path.
const richBody: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "h2-1",
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: "s-h2", text: "An H2 heading", marks: [] }],
  },
  {
    _type: "block",
    _key: "p-1",
    style: "normal",
    markDefs: [
      { _type: "link", _key: "lnk", href: "https://nzlcs.example.com" },
    ],
    children: [
      { _type: "span", _key: "s-p1a", text: "A normal paragraph with ", marks: [] },
      { _type: "span", _key: "s-p1b", text: "bold", marks: ["strong"] },
      { _type: "span", _key: "s-p1c", text: ", ", marks: [] },
      { _type: "span", _key: "s-p1d", text: "italic", marks: ["em"] },
      { _type: "span", _key: "s-p1e", text: ", and a ", marks: [] },
      { _type: "span", _key: "s-p1f", text: "link", marks: ["lnk"] },
      { _type: "span", _key: "s-p1g", text: ".", marks: [] },
    ],
  },
  {
    _type: "block",
    _key: "h3-1",
    style: "h3",
    markDefs: [],
    children: [{ _type: "span", _key: "s-h3", text: "An H3 subheading", marks: [] }],
  },
  {
    _type: "block",
    _key: "q-1",
    style: "blockquote",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s-q",
        text: "A pull-quote that highlights what matters from the section above.",
        marks: [],
      },
    ],
  },
];

export const PlainParagraphs: Story = { args: { value: longBody } };

export const PlainParagraphsLarge: Story = { args: { value: longBody, variant: "large" } };

export const KitchenSink: Story = { args: { value: richBody } };

export const Empty: Story = { args: { value: [] } };
