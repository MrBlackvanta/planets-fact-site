import { SourceIcon } from "@/components/icons";
import type { Planet, PlanetTopic } from "@/data";

type PlanetArticleProps = {
  planet: Planet;
  topic: PlanetTopic;
};

export default function PlanetArticle({ planet, topic }: PlanetArticleProps) {
  const { content, source } = planet[topic];

  return (
    <>
      <p className="text-body lg:text-body-lg mt-4 min-h-33 md:mt-6 lg:min-h-37.5">
        {content}
      </p>
      <a
        href={source}
        target="_blank"
        rel="noopener noreferrer"
        className="text-source lg:text-body-lg text-muted hover:text-ink mt-2.5 inline-flex items-center gap-1 lg:mt-6 lg:gap-2"
      >
        <span>
          {"Source : "}
          <span className="font-bold underline">Wikipedia</span>
        </span>
        <SourceIcon />
      </a>
    </>
  );
}
