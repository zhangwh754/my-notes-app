// src/components/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getArticle } from "../../data";
import { useEffect } from "react";

const Tiptap = ({ id }: { id: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none prose-p:my-0",
      },
    },
  });

  // 当 id 变化时更新编辑器内容
  useEffect(() => {
    if (editor) {
      const content = getArticle(id);
      editor.commands.setContent(content || "");
      const mainElement = document.querySelector("main");
      if (mainElement) mainElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, editor]);

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
