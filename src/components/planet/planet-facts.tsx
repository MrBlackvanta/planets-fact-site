import type { Planet } from "@/data";

export default function PlanetFacts({ planet }: { planet: Planet }) {
  const facts = [
    { label: "Rotation Time", value: planet.rotation },
    { label: "Revolution Time", value: planet.revolution },
    { label: "Radius", value: planet.radius },
    { label: "Average Temp.", value: planet.temperature },
  ];

  return (
    <dl className="row-start-4 mt-7 grid gap-2 md:col-span-2 md:row-start-3 md:mt-6.75 md:grid-cols-4 md:gap-2.75 lg:mt-21.75 lg:gap-7.5">
      {facts.map(({ label, value }) => (
        <div
          key={label}
          className="border-line flex h-12 items-center justify-between border px-5.75 md:block md:h-22 md:px-3.5 md:pt-3.75 lg:h-32 lg:px-5.5 lg:pt-4.75"
        >
          <dt className="text-h4 lg:text-h4-lg text-muted uppercase">
            {label}
          </dt>
          <dd className="text-h2 md:text-h2-md lg:text-h2-lg font-display uppercase md:mt-1.5 lg:mt-1">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
