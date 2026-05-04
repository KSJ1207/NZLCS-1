"use client";

import { useMemo, useState, type ComponentType } from "react";
import {
  Anchor,
  Building2,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Cog,
  Crosshair,
  Database,
  Eraser,
  FileSearch,
  Gauge,
  Landmark,
  Layers,
  Layout,
  Leaf,
  Paintbrush,
  Palette,
  RotateCcw,
  Search,
  Settings,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

const SURFACE: React.CSSProperties = {
  background: "#141311",
  color: "#EDEBE7",
  border: "1px solid #3A3733",
};

const META: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "12px",
  color: "#D8D4CE",
  lineHeight: 1.6,
};

interface IconEntry {
  name: string;
  Cmp: ComponentType<{ size?: number; strokeWidth?: number }>;
  used: string;
}

// Each entry: name (matches the lucide-react export), the imported component,
// and which file uses it. Order is alphabetical for easy scanning.
export const ICONS: IconEntry[] = [
  { name: "Anchor",        Cmp: Anchor,        used: "services/page.tsx — Marine and coastal steel structures" },
  { name: "Building2",     Cmp: Building2,     used: "services/page.tsx — Structural steel beams" },
  { name: "Car",           Cmp: Car,           used: "services/page.tsx — Vehicle underbodies (rust + vehicle)" },
  { name: "CheckCircle2",  Cmp: CheckCircle2,  used: "services/page.tsx — Benefit checkmarks" },
  { name: "ClipboardCheck",Cmp: ClipboardCheck,used: "services/page.tsx — QA documentation benefit" },
  { name: "Cog",           Cmp: Cog,           used: "services/page.tsx — Machinery and equipment" },
  { name: "Crosshair",     Cmp: Crosshair,     used: "about/page.tsx — Precision value card" },
  { name: "Database",      Cmp: Database,      used: "services/page.tsx — Storage tanks and infrastructure" },
  { name: "Eraser",        Cmp: Eraser,        used: "services/page.tsx — Coating removal application" },
  { name: "FileSearch",    Cmp: FileSearch,    used: "services/page.tsx — Inspection / assessment benefit" },
  { name: "Gauge",         Cmp: Gauge,         used: "services/page.tsx — Industrial pipelines and pressure vessels" },
  { name: "Landmark",      Cmp: Landmark,      used: "services/page.tsx — Bridges and overhead structures" },
  { name: "Layers",        Cmp: Layers,        used: "services/page.tsx — Multi-layer coating application" },
  { name: "Layout",        Cmp: Layout,        used: "about/page.tsx — End-to-end service value card" },
  { name: "Leaf",          Cmp: Leaf,          used: "about/page.tsx — Environmentally responsible value card" },
  { name: "Paintbrush",    Cmp: Paintbrush,    used: "services/page.tsx — Paint and coating prep" },
  { name: "Palette",       Cmp: Palette,       used: "services/page.tsx — Coating color matching" },
  { name: "RotateCcw",     Cmp: RotateCcw,     used: "services/page.tsx — Restoration / refurbishment" },
  { name: "Search",        Cmp: Search,        used: "about/page.tsx — Inspection / clarity value card" },
  { name: "Settings",      Cmp: Settings,      used: "services/page.tsx — Industrial equipment maintenance" },
  { name: "TrendingUp",    Cmp: TrendingUp,    used: "services/page.tsx — Resale value benefit" },
  { name: "Truck",         Cmp: Truck,         used: "services/page.tsx — Mobile / on-site service benefit" },
  { name: "Wrench",        Cmp: Wrench,        used: "services/page.tsx — Workshop and maintenance" },
  { name: "Zap",           Cmp: Zap,           used: "services/page.tsx — Laser / electrical capability" },
];

function IconCard({ name, Cmp, used }: IconEntry) {
  const file = used.split(" — ")[0];
  return (
    <div
      style={{
        ...SURFACE,
        padding: "1.25rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.7rem",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#1E1D1A",
          border: "1px solid #3A3733",
          width: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D4834A",
        }}
      >
        <Cmp size={36} strokeWidth={1.75} />
      </div>
      <code style={{ ...META, color: "#EDEBE7", fontWeight: 600, fontSize: "13px" }}>
        {name}
      </code>
      <span style={{ ...META, fontSize: "11px", lineHeight: 1.45 }} title={used}>
        {file}
      </span>
    </div>
  );
}

export function SearchableIconGrid() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    return ICONS.filter(
      (i) =>
        i.name.toLowerCase().includes(needle) ||
        i.used.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name or usage…"
          style={{
            flex: "1 1 320px",
            background: "#1E1D1A",
            color: "#EDEBE7",
            border: "1px solid #3A3733",
            padding: "0.6rem 0.9rem",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "13px",
            outline: "none",
          }}
        />
        <span style={{ ...META, whiteSpace: "nowrap" }}>
          {filtered.length} of {ICONS.length}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {filtered.map((i) => (
          <IconCard key={i.name} {...i} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            ...SURFACE,
            padding: "2rem",
            marginTop: "1rem",
            textAlign: "center",
            color: "#D8D4CE",
          }}
        >
          No icons matching <code style={{ color: "#EDEBE7" }}>{q}</code>.
        </div>
      ) : null}
    </div>
  );
}
