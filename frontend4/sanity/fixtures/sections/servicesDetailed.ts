import type { ServicesDetailedSection } from "../../lib/types";
import { key } from "../_helpers";
import { servicesFullFixture } from "../documents/services";

export const servicesDetailedSectionFixture: ServicesDetailedSection = {
  _type: "servicesDetailedSection",
  _key: key("servicesDetailed"),
  showAll: false,
  services: servicesFullFixture,
};
