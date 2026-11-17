import { requireArea } from "@/lib/admin";
import Link from "next/link";
import { TermKind } from "@prisma/client";
import { getTerms } from "@/lib/taxonomy";
import PostForm from "../../../_components/PostForm";

export const metadata = { title: "New article" };

export default async function NewPostPage() {
  await requireArea("content");
  const [categoryTerms, tagTerms] = await Promise.all([getTerms(TermKind.POST_CATEGORY), getTerms(TermKind.POST_TAG)]);
  const categories = categoryTerms.map((c) => ({ name: c.name, section: c.section }));
  const tagSuggestions = tagTerms.map((t) => t.name);
  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs"><Link href="/admin/posts">News &amp; Blog</Link> / New</nav>
          <h1>New article</h1>
        </div>
      </header>
      <div className="adm-content">
        <PostForm categories={categories} tagSuggestions={tagSuggestions} />
      </div>
    </>
  );
}
