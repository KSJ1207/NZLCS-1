import type { StatsSection } from "../../lib/types";
import { key } from "../_helpers";

export const statsSectionFixture: StatsSection = {
  _type: "statsSection",
  _key: key("stats"),
  eyebrow: "By the numbers",
  heading: null,
  stats: [
    { value: "100+", label: "Projects Completed" },
    { value: "50+", label: "Corporate Clients" },
    { value: "NZ-wide", label: "Service Coverage" },
  ],
};
