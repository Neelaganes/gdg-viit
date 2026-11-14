import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Splash, { SPLASH_GATE_SCRIPT } from "@/components/Splash";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GDG on Campus · VIIT",
  description:
    "Google Developer Groups on Campus at Vignan's Institute of Information Technology (VIIT), Duvvada, Visakhapatnam. Build, break, and ship with 500+ student developers across Android, Web, Cloud, AI/ML, Flutter, and Firebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      // the splash gate script sets data-splash before hydration
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SPLASH_GATE_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink selection:bg-g-yellow selection:text-ink">
        <Splash />
        {children}
      </body>
    </html>
  );
}
