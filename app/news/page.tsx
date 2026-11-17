import type { Metadata } from "next";
import Archive from "./Archive";
import { seoPage } from "@/lib/seo-overrides";

/**
 * News & Announcements, page 1 (Resources menu). Pages 2+ live at
 * /news/archive/[page]; Articles have their own listing at /articles.
 */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "AAA News & Announcements",
    description:
      "Accreditation announcements, newly accredited organizations, recognitions, partnerships and events from the American Accreditation Association newsroom.",
    path: "/news",
    keywords: [
      "AAA news",
      "accreditation news",
      "newly accredited organizations",
      "American Accreditation Association announcements",
    ],
  });
}

export default function Page() {
  return <Archive page={1} scope={{ kind: "section", section: "news" }} />;
}
