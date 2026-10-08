import { SITE_NAME, type PlanetSlug } from "@/data";
import MobileMenu from "./mobile-menu";
import NavLinks from "./nav-links";

export default function SiteHeader({ current }: { current?: PlanetSlug }) {
  return (
    <header className="border-line relative z-10 border-b">
      <div className="flex h-17 items-center justify-between px-6 md:h-auto md:flex-col md:gap-9.75 md:pt-8 md:pb-6.75 lg:h-21.25 lg:flex-row lg:items-stretch lg:gap-0 lg:pt-0 lg:pr-10 lg:pl-8">
        <p className="text-wordmark font-display uppercase lg:self-end">
          {SITE_NAME}
        </p>
        <nav aria-label="Planets" className="lg:self-stretch">
          <MobileMenu>
            <NavLinks variant="menu" current={current} />
          </MobileMenu>
          <NavLinks variant="bar" current={current} />
        </nav>
      </div>
    </header>
  );
}
