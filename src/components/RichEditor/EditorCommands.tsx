import { type Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";

const createCommands = (editor: Editor) => ({
  bold: () => editor.chain().focus().toggleBold().run(),
  italic: () => editor.chain().focus().toggleItalic().run(),
});

export default function EditorCommands({ editor }: { editor: Editor }) {
  const commands = createCommands(editor);

  return (
    <BubbleMenu editor={editor}>
      <button className="btn btn-primary" onClick={() => commands.bold()}>
        Bold
      </button>
    </BubbleMenu>
  );
}
