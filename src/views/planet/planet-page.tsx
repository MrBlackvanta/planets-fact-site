import { SiteHeader } from "@/components/layout";
import type { Planet } from "@/data";

export default function PlanetPage({ planet }: { planet: Planet }) {
  return (
    <div data-planet={planet.slug} className="min-h-dvh">
      <SiteHeader current={planet.slug} />
      <main>
        <h1 className="text-h1 md:text-h1-md lg:text-h1-lg font-display uppercase">
          {planet.name}
        </h1>
      </main>
    </div>
  );
}
