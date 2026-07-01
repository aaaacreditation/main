import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";
import CTA from "../_components/CTA";
import { getPublishedPage } from "@/lib/content";

/**
 * Catch-all renderer for CMS pages created in the admin. Built-in app routes
 * always take precedence over this dynamic segment, so admin-created pages
 * can never shadow the fixed site.
 */
export const revalidate = 300;

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) return {};
  const page = await getPublishedPage(slug);
  if (!page) return {};
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.intro || undefined,
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();

  const page = await getPublishedPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow="American Accreditation Association"
        title={page.title}
        intro={page.intro || undefined}
        image={page.heroImage || undefined}
        crumbs={[{ label: page.title }]}
      />
      <PageBody label="AAA">
        <article className="cms-prose" dangerouslySetInnerHTML={{ __html: page.content }} />
      </PageBody>
      <CTA />
    </>
  );
}
