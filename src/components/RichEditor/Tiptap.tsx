// src/components/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getArticle } from "../../data";
import { useEffect, useRef } from "react";
// import EditorCommands from "./EditorCommands";

const Tiptap = ({ id }: { id?: string }) => {
  if (!id) return null;

  const editor = useRef(
    useEditor({
      extensions: [StarterKit],
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none prose-p:my-0",
        },
      },
    })
  );

  if (!editor.current) return null;

  useEffect(() => {
    const articleResult = getArticle(id);
    if (articleResult) {
      editor.current.commands.setContent({
        type: articleResult.type,
        content: articleResult.content,
      });
      editor.current.chain().focus(0);
    }
  }, [id]);

  return (
    <>
      <EditorContent editor={editor.current} />
      {/* <EditorCommands editor={editor} /> */}
    </>
  );
};

export default Tiptap;
