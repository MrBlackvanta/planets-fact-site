import { SiteHeader } from "@/components/layout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="min-h-dvh overflow-x-clip">
      <SiteHeader />
      <main className="lg:max-w-shell mx-auto flex max-w-3xl flex-col items-center px-6 pt-20 pb-28 text-center md:pt-28 lg:px-10 lg:pt-36">
        <p className="text-h3 lg:text-h3-lg text-muted uppercase">Error 404</p>
        <h1 className="text-h1 md:text-h1-md lg:text-h1-lg font-display mt-4 uppercase">
          Lost in space
        </h1>
        <p className="text-body lg:text-body-lg text-dim mt-6 max-w-96">
          This page has drifted out of orbit. Choose a world from the menu, or
          start again from the planet closest to the sun.
        </p>
        <Link
          href="/"
          className="text-h3 lg:text-h3-lg border-line hover:bg-hover mt-10 flex h-12 items-center border px-8 uppercase transition-colors motion-reduce:transition-none"
        >
          Back to Mercury
        </Link>
      </main>
    </div>
  );
}
