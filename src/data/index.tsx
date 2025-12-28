import { type JSONContent } from "@tiptap/react";
import Articles, { type Article } from "./Article-Content";

export const getArticle = (id: string) => {
  if (!id) return null;

  return Articles.find((article) => article.id === id);
};

function getText(node: JSONContent): string {
  if (!node.content) return "";
  return node.content
    .map((c: JSONContent) => (c.type === "text" ? c.text : getText(c)))
    .join("");
}

export type OutlineItem = {
  id: string;
  type: "heading" | "paragraph";
  level?: number; // h1-h6
  text: string;
};

export function parseOutlineFromTiptapJSON(doc: Article) {
  const result: OutlineItem[] = [];

  for (const [index, node] of doc.content.entries()) {
    if (result.length === 5) break;

    if (node.type === "heading") {
      result.push({
        id: `h-${index}`,
        type: "heading",
        level: node.attrs?.level,
        text: getText(node),
      });
    }

    if (node.type === "paragraph") {
      result.push({
        id: `p-${index}`,
        type: "paragraph",
        text: getText(node).slice(0, 50),
      });
    }
  }

  return { outlines: result, id: doc.id, title: doc.title };
}
