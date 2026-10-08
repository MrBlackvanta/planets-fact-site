"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const COMMIT_TIMEOUT = 1000;

export default function RouteTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const commit = useRef<(() => void) | null>(null);

  useEffect(() => {
    const resolve = commit.current;
    commit.current = null;
    resolve?.();
  }, [pathname]);

  useEffect(() => {
    if (!("startViewTransition" in document)) return;

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target || link.hasAttribute("download")) return;
      if (link.origin !== location.origin) return;
      if (link.pathname === location.pathname) return;

      event.preventDefault();
      commit.current?.();

      const destination = link.pathname + link.search + link.hash;
      const transition = document.startViewTransition(() => {
        const committed = new Promise<void>((resolve) => {
          commit.current = resolve;
        });
        router.push(destination);
        return Promise.race([
          committed,
          new Promise<void>((give) => setTimeout(give, COMMIT_TIMEOUT)),
        ]);
      });

      transition.ready.catch(() => {});
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  return null;
}
