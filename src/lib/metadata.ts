import { planetPath, type Planet } from "@/data";
import type { Metadata } from "next";

export function planetMetadata(planet: Planet): Metadata {
  return {
    title: planet.name,
    description: `${planet.name} at a glance: an overview, its internal structure and its surface geology, plus rotation time, revolution time, radius and average temperature.`,
    alternates: { canonical: planetPath(planet.slug) },
  };
}
