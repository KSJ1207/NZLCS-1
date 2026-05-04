import { type ReactNode, type JSX } from "react";

type Variant =
  | "title-xl"
  | "title-lg"
  | "title-md"
  | "title-sm"
  | "body-lg"
  | "body"
  | "caption"
  | "eyebrow"
  | "micro-lg"
  | "micro";

const variantMap: Record<Variant, { tag: keyof JSX.IntrinsicElements; className: string }> = {
  "title-xl": { tag: "h1",   className: "type-title-xl" },
  "title-lg": { tag: "h2",   className: "type-title-lg" },
  "title-md": { tag: "h3",   className: "type-title-md" },
  "title-sm": { tag: "h4",   className: "type-title-sm" },
  "body-lg":  { tag: "p",    className: "type-body-lg" },
  body:       { tag: "p",    className: "type-body" },
  caption:    { tag: "p",    className: "type-caption" },
  eyebrow:    { tag: "span", className: "type-eyebrow" },
  "micro-lg": { tag: "span", className: "type-micro-lg" },
  micro:      { tag: "span", className: "type-micro" },
};

interface Props {
  variant: Variant;
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Typography({ variant, children, className = "", as }: Props) {
  const { tag: DefaultTag, className: variantClass } = variantMap[variant];
  const Tag = as ?? DefaultTag;
  return <Tag className={`${variantClass} ${className}`.trim()}>{children}</Tag>;
}
