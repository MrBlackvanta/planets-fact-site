import { SITE_NAME } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="text-h1-md text-h1-lg md:text-h1-md lg:text-h1-lg lg:text-h1 md:text-body lg:text-body-lg text-body-lg">
      <h1>{SITE_NAME}</h1>
    </main>
  );
}
