import Link from "next/link";
import PageForm from "../../../_components/PageForm";

export const metadata = { title: "New page" };

export default function NewCmsPage() {
  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs"><Link href="/admin/pages">Pages</Link> / New</nav>
          <h1>New page</h1>
        </div>
      </header>
      <div className="adm-content">
        <PageForm />
      </div>
    </>
  );
}
