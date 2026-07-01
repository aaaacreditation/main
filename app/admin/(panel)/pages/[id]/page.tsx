import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { deletePage } from "../../../actions";
import PageForm from "../../../_components/PageForm";
import DangerButton from "../../../_components/DangerButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit page" };

export default async function EditCmsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs"><Link href="/admin/pages">Pages</Link> / Edit</nav>
          <h1 className="adm-topbar-clamp">{page.title}</h1>
        </div>
        <div className="adm-topbar-actions">
          <form action={deletePage}>
            <input type="hidden" name="id" value={page.id} />
            <DangerButton confirmText={`Delete “${page.title}”? This cannot be undone.`}>
              Delete page
            </DangerButton>
          </form>
        </div>
      </header>
      <div className="adm-content">
        <PageForm
          page={{
            id: page.id,
            title: page.title,
            slug: page.slug,
            intro: page.intro,
            content: page.content,
            heroImage: page.heroImage,
            status: page.status,
            seoTitle: page.seoTitle,
            seoDescription: page.seoDescription,
          }}
        />
      </div>
    </>
  );
}
