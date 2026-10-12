import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsListener } from "@/components/layout/AnalyticsListener";
import { RouteState } from "@/components/layout/RouteState";
import { buildNav } from "@/components/layout/nav-data";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { toSrgb } from "@/lib/color";
import { motionBootstrap } from "@/lib/motion-script";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["500", "600", "700"],
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Communication, automation and AI software`, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  // Browser chrome follows the system theme: paper in light, ink in dark.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: toSrgb("oklch(96.68% 0.0054 95.1)") },
    { media: "(prefers-color-scheme: dark)", color: toSrgb("oklch(16.86% 0.011 268.03)") },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header nav={buildNav()} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AnalyticsListener />
        <RouteState />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
