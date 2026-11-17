import type { Metadata } from "next";
import Archive from "../news/Archive";
import { seoPage } from "@/lib/seo-overrides";

/**
 * Articles, page 1 (Resources menu, Nov 2026): the posts whose category
 * belongs to the Articles section in Admin → Categories & Tags. Each article
 * still lives at /news/{slug}.
 */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "AAA Articles: Accreditation & Quality Guidance",
    description:
      "Guidance and insight on accreditation, healthcare quality, training standards and conformity assessment from the American Accreditation Association team.",
    path: "/articles",
    keywords: ["accreditation articles", "accreditation guidance", "healthcare quality articles", "AAA insights"],
  });
}

export default function Page() {
  return <Archive page={1} scope={{ kind: "section", section: "articles" }} />;
}
