import type { PortableTextBlock } from "@portabletext/react";

let counter = 0;
export function key(prefix = "k"): string {
  counter += 1;
  return `${prefix}-${counter.toString(36)}`;
}

/**
 * Convert plain string paragraphs into a Portable Text block array
 * suitable for stories and tests.
 */
export function toPortableText(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: key("block"),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key("span"), text, marks: [] }],
  }));
}
