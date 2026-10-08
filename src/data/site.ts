import type { Metadata } from "next";

export const SITE_URL =
  "https://planets-fact-site.abdelrhman-ahmed8881.workers.dev";

export const SITE_NAME = "The Planets";

export const SITE_TITLE = `${SITE_NAME} | Facts about every world in our solar system`;

export const SITE_DESCRIPTION =
  "Explore all eight planets of the solar system. Read each world's overview, internal structure and surface geology, plus its rotation, radius and temperature.";

export const openGraphBase = {
  siteName: SITE_NAME,
  locale: "en_US",
  type: "website",
  images: [
    {
      url: "/opengraph-image.jpg",
      width: 1200,
      height: 630,
      alt: "The Planets wordmark beside the site's Mercury page on a star-flecked navy ground.",
    },
  ],
} satisfies Metadata["openGraph"];
