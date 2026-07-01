import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../_components/PageHero";
import PageBody from "../../_components/PageBody";
import CTA from "../../_components/CTA";
import PostBody from "../PostBody";
import { formatDate } from "../posts";
import { getPublishedPost } from "@/lib/content";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "AAA News" };
  return {
    title: post.title,
    description: post.excerpt.trim() || undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const crumbTitle =
    post.title.length > 52 ? `${post.title.slice(0, 52).trimEnd()}…` : post.title;

  return (
    <>
      <PageHero
        eyebrow="AAA News"
        title={post.title}
        intro={post.excerpt.trim() || undefined}
        crumbs={[{ href: "/news", label: "AAA News" }, { label: crumbTitle }]}
        meta={[
          { k: "Published", v: formatDate(post.date) },
          { k: "Source", v: "AAA Newsroom" },
        ]}
      />
      <PageBody label="AAA Newsroom">
        <article>
          {post.coverImage && !/aaa-accreditation\.org/i.test(post.coverImage) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt="" className="cms-cover" />
          ) : null}
          <PostBody content={post.content} title={post.title} />
        </article>
        <p style={{ marginTop: 48 }}>
          <Link href="/news" className="ed-link">
            <span className="arrow" aria-hidden>
              ←
            </span>
            Back to all news
          </Link>
        </p>
      </PageBody>
      <CTA />
    </>
  );
}
