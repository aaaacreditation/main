import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import RevealClient from "./_components/RevealClient";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "American Accreditation Association — Internationally recognized accreditation",
    template: "%s — American Accreditation Association",
  },
  description:
    "AAA delivers internationally-recognized accreditation programs for healthcare, conformity assessment bodies, and training providers — built on ISO/IEC standards and trusted across 60+ countries.",
  metadataBase: new URL("https://aaa-accreditation.org"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <RevealClient />
      </body>
    </html>
  );
}
