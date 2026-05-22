"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useMemo } from "react";

export default function MarkdownBody({ raw }: { raw: string }) {
  const body = useMemo(() => raw.replace(/^#[^\n]*\n/, ""), [raw]);
  return (
    <article className="prose-soft">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
        {body}
      </ReactMarkdown>
    </article>
  );
}
