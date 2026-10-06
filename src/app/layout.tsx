import type { Metadata, Viewport } from "next";
import { Chivo_Mono, Noto_Serif_Display, Press_Start_2P } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";


// Hero headline: Noto Serif "Display Medium" in Figma.
const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
  weight: ["500"],
});

// Brief labels and code values inside the process and CTA windows.
const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
});

// Cat Runner HUD.
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Dekstive Studio — Independent design studio",
  description:
    "Dekstive Studio is an independent design studio providing end-to-end solutions across digital design, motion, and creative direction.",
};

export const viewport: Viewport = {
  themeColor: "#1a5a9f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${notoSerifDisplay.variable} ${chivoMono.variable} ${pressStart.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
