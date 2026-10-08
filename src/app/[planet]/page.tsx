import { findPlanet, planets, ROOT_PLANET } from "@/data";
import { planetMetadata } from "@/lib";
import { PlanetPage } from "@/views/planet";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PlanetRouteProps = { params: Promise<{ planet: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return planets
    .filter(({ slug }) => slug !== ROOT_PLANET)
    .map(({ slug }) => ({ planet: slug }));
}

export async function generateMetadata({
  params,
}: PlanetRouteProps): Promise<Metadata> {
  const planet = findPlanet((await params).planet);
  return planet ? planetMetadata(planet) : {};
}

export default async function PlanetRoute({ params }: PlanetRouteProps) {
  const planet = findPlanet((await params).planet);
  if (!planet) notFound();

  return <PlanetPage planet={planet} />;
}
