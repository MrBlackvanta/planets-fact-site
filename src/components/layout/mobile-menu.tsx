"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import HamburgerIcon from "../icons/hamburger-icon";

const FOCUSABLE = "a[href], button, input, select, textarea, [tabindex]";

function focusableRegionsBeside(element: HTMLElement | null) {
  const beside: HTMLElement[] = [];

  for (let node = element; node && node !== document.body;) {
    const parent = node.parentElement;
    if (!parent) break;
    for (const sibling of parent.children) {
      if (sibling === node || !(sibling instanceof HTMLElement)) continue;
      if (sibling.matches(FOCUSABLE) || sibling.querySelector(FOCUSABLE)) {
        beside.push(sibling);
      }
    }
    node = parent;
  }

  return beside;
}

export default function MobileMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const { scrollY } = window;
    const { style } = document.body;
    style.position = "fixed";
    style.insetInline = "0";
    style.top = `${-scrollY}px`;

    const covered = focusableRegionsBeside(rootRef.current);
    for (const element of covered) element.toggleAttribute("inert", true);

    const wide = window.matchMedia("(min-width: 48rem)");
    const closeOnWide = () => {
      if (wide.matches) setOpen(false);
    };
    const closeOnEscape = (press: KeyboardEvent) => {
      if (press.code !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    wide.addEventListener("change", closeOnWide);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      wide.removeEventListener("change", closeOnWide);
      document.removeEventListener("keydown", closeOnEscape);
      for (const element of covered) element.removeAttribute("inert");
      style.position = "";
      style.insetInline = "";
      style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="flex md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="planet-menu"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className="-m-3 p-3"
      >
        <HamburgerIcon className={open ? "text-ink/25" : "text-ink"} />
        <span className="sr-only">Menu</span>
      </button>
      <div
        id="planet-menu"
        onClick={() => setOpen(false)}
        className={`bg-page fixed inset-x-0 top-17.25 bottom-0 overflow-y-auto transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
}
