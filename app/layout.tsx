import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import RevealClient from "./_components/RevealClient";
import SiteChrome from "./_components/SiteChrome";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={poppins.variable}>
      <body>
        <SiteChrome header={<Header />} footer={<Footer />}>
          {children}
        </SiteChrome>
        <RevealClient />
      </body>
    </html>
  );
}
