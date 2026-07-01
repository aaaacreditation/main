import ArticleBody from "./ArticleBody";
import { looksLikeHtml } from "@/lib/mdish";

/**
 * Renders both content generations: HTML written in the admin editor, and
 * markdown-ish plain text migrated from the old WordPress site.
 */
export default function PostBody({ content, title }: { content: string; title?: string }) {
  if (looksLikeHtml(content)) {
    return <div className="cms-prose" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <ArticleBody content={content} title={title} />;
}
