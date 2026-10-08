import type { PlanetTopic } from "./planets";

export type Topic = {
  id: PlanetTopic;
  label: string;
  shortLabel: string;
};

export const topics: readonly Topic[] = [
  { id: "overview", label: "Overview", shortLabel: "Overview" },
  { id: "structure", label: "Internal Structure", shortLabel: "Structure" },
  { id: "geology", label: "Surface Geology", shortLabel: "Surface" },
];

export const [rootTopic] = topics;
