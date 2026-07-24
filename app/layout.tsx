import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import { SiteHeader } from "@/src/components/layout/SiteHeader";
import { SkipLink } from "@/src/components/layout/SkipLink";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Nicole Borja — Executive Producer",
    template: "%s · Nicole Borja",
  },
  description:
    "Nicole Borja’s executive production portfolio for advertising, branded content, and music videos.",
  applicationName: "Nicole Borja — Executive Producer",
  keywords: [
    "executive producer",
    "advertising production",
    "music video production",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    title: "Nicole Borja — Executive Producer",
    description: "Producing work people remember.",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "Nicole Borja — executive production portfolio.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicole Borja — Executive Producer",
    description: "Producing work people remember.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon-nb.svg",
    shortcut: "/favicon-nb.svg",
  },
};

export const viewport = {
  themeColor: "#f6c2ce",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${cormorant.variable} ${caveat.variable}`}
      >
        <SkipLink />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
