import { SITE_NAME } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <h1>{SITE_NAME}</h1>
    </main>
  );
}
