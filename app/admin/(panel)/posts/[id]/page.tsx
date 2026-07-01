import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { toEditorHtml } from "@/lib/mdish";
import { deletePost } from "../../../actions";
import PostForm from "../../../_components/PostForm";
import DangerButton from "../../../_components/DangerButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit article" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs"><Link href="/admin/posts">News &amp; Blog</Link> / Edit</nav>
          <h1 className="adm-topbar-clamp">{post.title}</h1>
        </div>
        <div className="adm-topbar-actions">
          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <DangerButton confirmText={`Delete “${post.title}”? This cannot be undone.`}>
              Delete article
            </DangerButton>
          </form>
        </div>
      </header>
      <div className="adm-content">
        <PostForm
          post={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            // Legacy markdown-ish posts are converted so they edit as rich text.
            content: toEditorHtml(post.content),
            coverImage: post.coverImage,
            category: post.category,
            tags: post.tags,
            status: post.status,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
          }}
        />
      </div>
    </>
  );
}
