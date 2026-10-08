import { SiteHeader } from "@/components/layout";
import {
  PlanetArticle,
  PlanetFacts,
  PlanetSphere,
  PlanetTopics,
} from "@/components/planet";
import type { Planet } from "@/data";

export default function PlanetPage({ planet }: { planet: Planet }) {
  return (
    <div data-planet={planet.slug} className="min-h-dvh overflow-x-clip">
      <SiteHeader current={planet.slug} />
      <main className="lg:max-w-shell mx-auto grid max-w-3xl px-6 pb-11.75 md:grid-cols-[1fr_auto] md:gap-x-17.25 md:px-9.75 md:pb-9 lg:gap-x-32.5 lg:px-10 lg:pt-31.5 lg:pb-14">
        <PlanetTopics
          name={planet.name}
          sphere={<PlanetSphere planet={planet} />}
          panels={{
            overview: <PlanetArticle planet={planet} topic="overview" />,
            structure: <PlanetArticle planet={planet} topic="structure" />,
            geology: <PlanetArticle planet={planet} topic="geology" />,
          }}
        />
        <PlanetFacts planet={planet} />
      </main>
    </div>
  );
}
