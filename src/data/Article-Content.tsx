import { type DocumentType, type JSONContent } from "@tiptap/react";

export type Article = {
  id: string;
  title: string;
  type: DocumentType["type"];
  content: JSONContent[];
};

const Articles: Article[] = [
  {
    id: "1",
    title: "测试",
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 2,
        },
        content: [
          {
            type: "text",
            text: "Hi there,",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "this is a basic ",
          },
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "basic",
          },
          {
            type: "text",
            text: " example of ",
          },
          {
            type: "text",
            marks: [
              {
                type: "bold",
              },
            ],
            text: "Tiptap",
          },
          {
            type: "text",
            text: ". Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "That’s a bullet list with one …",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "… or two list items.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:",
          },
        ],
      },
      {
        type: "codeBlock",
        attrs: {
          language: "css",
        },
        content: [
          {
            type: "text",
            text: "body {\n    display: none;\n  }",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.",
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Wow, that’s amazing. Good work, boy! 👏 ",
              },
              {
                type: "hardBreak",
              },
              {
                type: "text",
                text: "— Mom",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
      },
    ],
  },
  {
    id: "2",
    title: "探索Tiptap编辑器",
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "探索Tiptap编辑器欢迎使用Tiptap编辑器，这是一个功能丰富的文本编辑工具。它基于ProseMirror构建，提供了高度的可定制性。",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "支持基本的文本格式化",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "提供列表、表格等高级功能",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "你可以通过插件扩展编辑器的功能，例如：",
          },
        ],
      },
      {
        type: "codeBlock",
        attrs: {
          language: "js",
        },
        content: [
          {
            type: "text",
            text: "import { Editor } from '@tiptap/core'\nimport StarterKit from '@tiptap/starter-kit'\n\nconst editor = new Editor({\n extensions: [StarterKit],\n content: 'Hello World!'\n})",
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Tiptap的模块化设计使其非常适合现代Web应用开发。",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
      },
    ],
  },
  {
    id: "3",
    title: "Tiptap的高级功能",
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Tiptap的高级功能除了基本的文本编辑，Tiptap还支持许多高级功能，如图片管理、表格编辑和协作功能。",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "图片上传与拖拽排序",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "可调整列宽的表格",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "实时协同编辑",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "例如，插入图片的配置如下：",
          },
        ],
      },
      {
        type: "codeBlock",
        attrs: {
          language: "js",
        },
        content: [
          {
            type: "text",
            text: "import Image from '@tiptap/extension-image'\n\nextensions: [\n Image.configure({\n allowBase64: true,\n HTMLAttributes: {\n class: 'product-image',\n draggable: true\n }\n })\n]",
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "这些功能使得Tiptap在电商商品描述等场景中表现出色。",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
      },
    ],
  },
  {
    id: "4",
    title: "plain text",
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "It’s 19871. You can’t turn on a radio, or go to a mall without hearing Olivia Newton-John’s hit song, Physical.",
          },
        ],
      },
    ],
  },
];

export default Articles;
