// src/components/Tiptap.tsx
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import content from "./Tiptap-content.ts";

const createCommands = (editor: Editor) => ({
  bold: () => editor.chain().focus().toggleBold().run(),
  italic: () => editor.chain().focus().toggleItalic().run(),
});

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const commands = createCommands(editor);

  return (
    <div className="relative h-full overflow-auto scroll-bar">
      <EditorContent className="tiptap" editor={editor} />

      <BubbleMenu editor={editor}>
        <button className="btn btn-primary" onClick={() => commands.bold()}>
          Bold
        </button>
      </BubbleMenu>
    </div>
  );
};

export default Tiptap;
