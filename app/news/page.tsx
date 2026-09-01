import type { Metadata } from "next";
import Archive from "./Archive";
import { pageMeta } from "@/lib/seo";

/**
 * Page 1 of the newsroom archive. Pages 2+ live at /news/page/[page].
 */
export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: "AAA News & Accreditation Updates",
  description:
    "Accreditation announcements, recognitions, partnerships and standards guidance from the American Accreditation Association newsroom, updated year-round.",
  path: "/news",
  keywords: [
    "AAA news",
    "accreditation news",
    "newly accredited organizations",
    "American Accreditation Association announcements",
  ],
});

export default function Page() {
  return <Archive page={1} />;
}
