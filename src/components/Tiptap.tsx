// src/components/Tiptap.tsx
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { getArticle } from "../data";

const createCommands = (editor: Editor) => ({
  bold: () => editor.chain().focus().toggleBold().run(),
  italic: () => editor.chain().focus().toggleItalic().run(),
});

const Tiptap = ({ id }: { id?: string }) => {
  if (!id) return null;

  const editorContent = getArticle(+id)?.content;
  if (!editorContent) return null;

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none prose-p:my-0",
      },
    },
  });

  if (!editor) return null;

  const commands = createCommands(editor);

  return (
    <>
      <EditorContent editor={editor} />

      <BubbleMenu editor={editor}>
        <button className="btn btn-primary" onClick={() => commands.bold()}>
          Bold
        </button>
      </BubbleMenu>
    </>
  );
};

export default Tiptap;
