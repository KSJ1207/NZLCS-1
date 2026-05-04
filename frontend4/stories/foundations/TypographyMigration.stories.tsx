import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const DELETION_DATE = "2026-05-31";

const meta: Meta = {
  title: "Foundations/Typography Migration",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `Temporary migration reference mapping legacy type-* class names to the new size-based scale. **Delete this file after ${DELETION_DATE}** once everyone is on the new names.`,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#141311" },
        { name: "surface", value: "#1E1D1A" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj;

type Status = "Renamed" | "Merged" | "Moved" | "Added";

interface Row {
  oldClass: string;
  newClass: string;
  status: Status;
  note?: string;
}

const rows: Row[] = [
  // Titles
  { oldClass: "type-h1",         newClass: "type-title-xl", status: "Renamed" },
  { oldClass: "type-h2",         newClass: "type-title-lg", status: "Renamed" },
  { oldClass: "type-h2-sm",      newClass: "type-title-md", status: "Renamed" },
  { oldClass: "type-h3",         newClass: "type-title-sm", status: "Renamed" },
  { oldClass: "(new)",           newClass: "type-title-xs", status: "Added",   note: "20px subsection heading for body-copy h3 (PortableText). Mirrors text-xl / font-bold / leading-tight." },

  // Body
  { oldClass: "type-body",       newClass: "type-body",     status: "Renamed", note: "no change" },
  { oldClass: "type-body-lg",    newClass: "type-body-lg",  status: "Renamed", note: "no change" },
  { oldClass: "type-body-sm",    newClass: "type-body",     status: "Merged",  note: "line-height 1.70 → 1.75" },
  { oldClass: "type-caption",    newClass: "type-caption",  status: "Renamed", note: "no change" },

  // Eyebrow
  { oldClass: "type-eyebrow",    newClass: "type-eyebrow",  status: "Renamed", note: "size 13px → 14px" },

  // Micro tier
  { oldClass: "type-nav",        newClass: "type-micro-lg", status: "Renamed" },
  { oldClass: "type-label",      newClass: "type-micro",    status: "Renamed" },
  { oldClass: "type-form-label", newClass: "type-micro",    status: "Merged",  note: "tracking 0.18em → 0.20em" },
  { oldClass: "type-badge",      newClass: "type-micro",    status: "Merged",  note: "size 11px → 12px, tracking 0.22em → 0.20em" },

  // Moved out
  { oldClass: "type-logo",       newClass: "Header.tsx (inline Tailwind)",        status: "Moved" },
  { oldClass: "type-stat",       newClass: "app/page.tsx (inline Tailwind)",      status: "Moved" },
];

const statusColor: Record<Status, string> = {
  Renamed: "#7FA882",
  Merged:  "#E8A672",
  Moved:   "#D4834A",
  Added:   "#EDEBE7",
};

export const Migration: Story = {
  render: () => (
    <div className="bg-background text-foreground font-sans p-8">
      <div className="max-w-4xl">
        <p className="type-eyebrow mb-3">Temporary</p>
        <h1 className="type-title-lg mb-4">Typography Migration</h1>
        <p className="type-body mb-2 max-w-2xl">
          Mapping from the legacy class names to the new size-based scale. Use
          this to update any code you rediscover after the main refactor lands.
        </p>
        <p className="type-caption text-muted mb-10 max-w-2xl">
          <strong className="text-foreground">Delete this file after {DELETION_DATE}</strong> —
          by then the new names should be everywhere and the migration table
          stops earning its sidebar slot.
        </p>

        <div className="border border-border">
          <div
            className="grid grid-cols-[1.2fr_1.6fr_0.8fr_2fr] gap-4 px-5 py-3 type-micro text-muted border-b border-border bg-surface"
          >
            <span>Old class</span>
            <span>New class</span>
            <span>Status</span>
            <span>Note</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.oldClass}
              className="grid grid-cols-[1.2fr_1.6fr_0.8fr_2fr] gap-4 px-5 py-3 border-b border-border last:border-b-0 items-center"
            >
              <code className="font-mono text-[13px] text-foreground/85 line-through decoration-border">
                {row.oldClass}
              </code>
              <code className="font-mono text-[13px] text-foreground">
                {row.newClass}
              </code>
              <span
                className="type-micro"
                style={{ color: statusColor[row.status] }}
              >
                {row.status}
              </span>
              <span className="type-caption text-muted">
                {row.note ?? ""}
              </span>
            </div>
          ))}
        </div>

        <p className="type-caption text-muted mt-8 max-w-2xl">
          The four status notes flagged with size/tracking/line-height shifts
          are the only places where the refactor was allowed to change the
          visual output. Everything else is a pure rename.
        </p>
      </div>
    </div>
  ),
};
