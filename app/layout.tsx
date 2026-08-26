import type { Metadata } from "next";
import {
  Inter,
  Geist_Mono,
  Instrument_Serif,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { MATERIAL_SYMBOLS_HREF } from "@/lib/icons";
import { ChatLauncher } from "@/components/ChatLauncher";

// Clean neo-grotesque used site-wide (headings + body).
const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Elegant serif for italic accent words inside headings.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Stitch homepage fonts: mono labels + Playfair accent italic.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: "500",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

export const metadata: Metadata = {
  // Resolves every relative URL below (canonicals, og:url, og:image) against
  // the production origin, which crawlers require to be absolute.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Enterprise AI, built to ship`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Enterprise AI, built to ship`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Enterprise AI, built to ship`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${jetbrains.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Warm the font origins before the stylesheet below asks for them. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/*
          Subsetted to the 48 icons the site actually renders — the unsubsetted
          variable font is 1.1 MB. `display=block` hides the glyph slot until
          the font lands rather than flashing the raw ligature text.
        */}
        <link rel="stylesheet" href={MATERIAL_SYMBOLS_HREF} />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Publisher + site entity, referenced by @id from every page graph. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ChatLauncher />
        </ThemeProvider>
      </body>
    </html>
  );
}
