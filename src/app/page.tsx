import { rootPlanet } from "@/data";
import { PlanetPage } from "@/views/planet";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <PlanetPage planet={rootPlanet} />;
}
