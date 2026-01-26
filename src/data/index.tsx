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

/**
 * 从 Markdown 内容解析大纲预览
 * @param note 笔记对象（content 为 Markdown 格式字符串）
 * @returns 大纲预览对象
 */
export function parseOutlineFromMarkdown(note: {
  id: string;
  title: string;
  content: string;
}) {
  const result: OutlineItem[] = [];
  const lines = note.content.split("\n");

  for (let i = 0; i < lines.length && result.length < 5; i++) {
    const line = lines[i].trim();

    // 匹配标题 # ## ### 等
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      result.push({
        id: `h-${i}`,
        type: "heading",
        level,
        text,
      });
      continue;
    }

    // 匹配列表项 - 或 *
    const listItemMatch = line.match(/^[-*]\s+(.+)$/);
    if (listItemMatch && result.length < 5) {
      const text = listItemMatch[1].trim();
      result.push({
        id: `li-${i}`,
        type: "paragraph",
        text: text.slice(0, 50),
      });
      continue;
    }

    // 匹配普通段落（非空行）
    if (line && !line.startsWith("#") && result.length < 5) {
      result.push({
        id: `p-${i}`,
        type: "paragraph",
        text: line.slice(0, 50),
      });
    }
  }

  return { outlines: result, id: note.id, title: note.title };
}
