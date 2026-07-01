import Link from "next/link";
import PostForm from "../../../_components/PostForm";

export const metadata = { title: "New article" };

export default function NewPostPage() {
  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs"><Link href="/admin/posts">News &amp; Blog</Link> / New</nav>
          <h1>New article</h1>
        </div>
      </header>
      <div className="adm-content">
        <PostForm />
      </div>
    </>
  );
}
