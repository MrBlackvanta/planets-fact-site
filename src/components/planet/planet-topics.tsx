"use client";

import { rootTopic, topics, type PlanetTopic } from "@/data";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type PlanetTopicsProps = {
  name: string;
  sphere: ReactNode;
  panels: Record<PlanetTopic, ReactNode>;
};

export default function PlanetTopics({
  name,
  sphere,
  panels,
}: PlanetTopicsProps) {
  const [topic, setTopic] = useState<PlanetTopic>(rootTopic.id);
  const listRef = useRef<HTMLDivElement>(null);

  function select(position: number) {
    const { id } = topics[(position + topics.length) % topics.length];
    setTopic(id);
    listRef.current?.querySelector<HTMLButtonElement>(`#tab-${id}`)?.focus();
  }

  function handleArrows(press: KeyboardEvent<HTMLDivElement>) {
    const current = topics.findIndex(({ id }) => id === topic);

    switch (press.code) {
      case "ArrowRight":
      case "ArrowDown":
        select(current + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        select(current - 1);
        break;
      case "Home":
        select(0);
        break;
      case "End":
        select(topics.length - 1);
        break;
      default:
        return;
    }

    press.preventDefault();
  }

  return (
    <>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Planet topics"
        onKeyDown={handleArrows}
        className="border-line row-start-1 -mx-6 flex h-12.75 justify-between border-b px-6 md:col-start-2 md:row-start-2 md:mx-0 md:mt-14 md:h-auto md:w-70.25 md:flex-col md:gap-4 md:self-start md:border-b-0 md:px-0 lg:mt-0 lg:w-87.5"
      >
        {topics.map(({ id, label, shortLabel }, position) => {
          const selected = id === topic;

          return (
            <button
              key={id}
              id={`tab-${id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTopic(id)}
              className={`text-h3 lg:text-h3-lg relative flex w-20 items-center justify-center uppercase md:h-10 md:w-full md:justify-start md:border md:pl-5 lg:h-12 lg:pl-7 ${
                selected
                  ? "text-ink md:border-accent md:bg-accent md:text-accent-ink"
                  : "text-muted md:border-line md:text-ink md:hover:bg-hover"
              }`}
            >
              <span
                aria-hidden="true"
                className={`hidden md:block md:w-7.5 lg:w-11.5 ${selected ? "" : "opacity-55"}`}
              >
                {String(position + 1).padStart(2, "0")}
              </span>
              <span className="md:hidden">{shortLabel}</span>
              <span className="max-md:hidden">{label}</span>
              {selected && (
                <span className="bg-accent absolute inset-x-0 -bottom-px h-1 md:hidden" />
              )}
            </button>
          );
        })}
      </div>

      <figure
        data-topic={topic}
        className="group/sphere relative row-start-2 h-76 md:col-span-2 md:row-start-1 md:h-115 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-auto"
      >
        {sphere}
      </figure>

      <div className="row-start-3 text-center md:col-start-1 md:row-start-2 md:text-left lg:col-start-2 lg:row-start-1 lg:min-h-91.25 lg:w-87.5">
        <h1 className="text-h1 md:text-h1-md lg:text-h1-lg font-display uppercase">
          {name}
        </h1>
        {topics.map(({ id }) => (
          <div
            key={id}
            id={`panel-${id}`}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            hidden={id !== topic}
          >
            {panels[id]}
          </div>
        ))}
      </div>
    </>
  );
}
