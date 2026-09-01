import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import RevealClient from "./_components/RevealClient";
import SiteChrome from "./_components/SiteChrome";
import JsonLd from "./_components/JsonLd";
import { SITE_URL, SITE_NAME, organizationSchema, websiteSchema } from "../lib/seo";
import { FACTS } from "../lib/facts";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "American Accreditation Association | Global Accreditation",
    // Short suffix on purpose: the old " — American Accreditation Association"
    // template added 37 characters to every child title and pushed several past
    // 100 chars, well beyond what search results and AI summaries display.
    template: "%s | AAA",
  },
  description: `AAA delivers internationally recognized accreditation for healthcare, conformity assessment bodies and training providers across ${FACTS.countriesLabel}.`,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  category: "Accreditation",
};

export const viewport: Viewport = {
  themeColor: "#173d73",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {/* Site-wide entity graph. Page-level JSON-LD (breadcrumbs, FAQs,
            services, articles) references these by @id. */}
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteChrome header={<Header />} footer={<Footer />}>
          {children}
        </SiteChrome>
        <RevealClient />
      </body>
    </html>
  );
}
