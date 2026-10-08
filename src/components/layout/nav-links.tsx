import { planetPath, planets, type PlanetSlug } from "@/data";
import Link from "next/link";
import ChevronIcon from "../icons/chevron-icon";

type NavVariant = "bar" | "menu";

const variants: Record<
  NavVariant,
  { list: string; item: string; link: string }
> = {
  bar: {
    list: "flex h-full gap-8 max-md:hidden",
    item: "relative flex items-end",
    link: "text-h4-lg uppercase",
  },
  menu: {
    list: "px-6 pt-6",
    item: "border-rule h-16.5 border-b last:border-b-0",
    link: "text-menu flex h-full items-center gap-6 pr-2 uppercase",
  },
};

type NavLinksProps = {
  variant: NavVariant;
  current: PlanetSlug;
};

export default function NavLinks({ variant, current }: NavLinksProps) {
  const style = variants[variant];

  return (
    <ul className={style.list}>
      {planets.map(({ name, slug }) => {
        const isCurrent = slug === current;
        const tone = variant === "bar" && !isCurrent ? "text-dim" : "text-ink";

        return (
          <li
            key={slug}
            data-planet={slug}
            className={`group/nav-item ${style.item}`}
          >
            <Link
              href={planetPath(slug)}
              aria-current={isCurrent ? "page" : undefined}
              className={`${style.link} ${tone}`}
            >
              {variant === "menu" && (
                <span className="bg-sphere size-5 rounded-full" />
              )}
              {name}
              {variant === "menu" && (
                <ChevronIcon className="text-ink/40 ml-auto" />
              )}
            </Link>
            {variant === "bar" && (
              <span
                className={
                  isCurrent
                    ? "bg-accent absolute inset-x-0 top-0 h-1 max-lg:hidden"
                    : "bg-ink/20 absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity group-hover/nav-item:opacity-100 max-lg:hidden"
                }
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
