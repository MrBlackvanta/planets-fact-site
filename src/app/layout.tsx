import { RouteTransitions } from "@/components/effects";
import { Signature } from "@/components/layout";
import {
  openGraphBase,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/data";
import type { Metadata, Viewport } from "next";
import { Antonio, League_Spartan } from "next/font/google";
import "./globals.css";

const antonio = Antonio({
  variable: "--font-antonio",
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: openGraphBase,
  twitter: { card: "summary_large_image", images: openGraphBase.images },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070724",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${antonio.variable} ${leagueSpartan.variable} antialiased`}
    >
      <body className="relative">
        {children}
        <Signature />
        <RouteTransitions />
      </body>
    </html>
  );
}
