import type { Planet } from "@/data";
import Image from "next/image";

export default function PlanetSphere({ planet }: { planet: Planet }) {
  const { planet: body, internal, geology } = planet.images;

  return (
    <div className="v-sphere-anchor">
      <Image
        src={body}
        alt=""
        priority
        className="absolute top-0 left-0 hidden max-w-none -translate-1/2 group-data-[topic=geology]/sphere:block group-data-[topic=overview]/sphere:block"
      />
      <Image
        src={internal}
        alt=""
        loading="eager"
        className="absolute top-0 left-0 hidden max-w-none -translate-1/2 group-data-[topic=structure]/sphere:block"
      />
      <Image
        src={geology}
        alt=""
        loading="eager"
        className="absolute top-26.5 left-0 hidden w-32.25 max-w-none -translate-x-1/2 group-data-[topic=geology]/sphere:block"
      />
    </div>
  );
}
