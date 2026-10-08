import type { Planet } from "@/data";
import Image from "next/image";

const layer =
  "absolute left-0 max-w-none opacity-0 transition-opacity duration-400 motion-reduce:transition-none";

export default function PlanetSphere({ planet }: { planet: Planet }) {
  const { planet: body, internal, geology } = planet.images;

  return (
    <div className="v-sphere-anchor">
      <Image
        src={body}
        alt=""
        priority
        className={`${layer} top-0 -translate-1/2 [view-transition-name:sphere-body] group-data-[topic=geology]/sphere:opacity-100 group-data-[topic=overview]/sphere:opacity-100`}
      />
      <Image
        src={internal}
        alt=""
        loading="eager"
        className={`${layer} top-0 -translate-1/2 [view-transition-name:sphere-internal] group-data-[topic=structure]/sphere:opacity-100`}
      />
      <Image
        src={geology}
        alt=""
        loading="eager"
        className={`${layer} top-26.5 w-32.25 -translate-x-1/2 [view-transition-name:sphere-geology] group-data-[topic=geology]/sphere:opacity-100`}
      />
    </div>
  );
}
