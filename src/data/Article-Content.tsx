type Article = {
  id: Number;
  title: String;
  content: String;
};

const Articles: Article[] = [
  {
    id: 1,
    title: "测试",
    content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `,
  },
  {
    id: 2,
    title: "探索Tiptap编辑器",
    content: `探索Tiptap编辑器欢迎使用Tiptap编辑器，这是一个功能丰富的文本编辑工具。它基于ProseMirror构建，提供了高度的可定制性。<ul><li>支持基本的文本格式化</li><li>提供列表、表格等高级功能</li></ul>你可以通过插件扩展编辑器的功能，例如：<pre><code class="language-js">import { Editor } from '@tiptap/core'\nimport StarterKit from '@tiptap/starter-kit'\n\nconst editor = new Editor({\n extensions: [StarterKit],\n content: 'Hello World!'\n})</code></pre><blockquote>Tiptap的模块化设计使其非常适合现代Web应用开发。</blockquote>`,
  },
  {
    id: 3,
    title: "Tiptap的高级功能",
    content: `Tiptap的高级功能除了基本的文本编辑，Tiptap还支持许多高级功能，如图片管理、表格编辑和协作功能。<ul><li>图片上传与拖拽排序</li><li>可调整列宽的表格</li><li>实时协同编辑</li></ul>例如，插入图片的配置如下：<pre><code class="language-js">import Image from '@tiptap/extension-image'\n\nextensions: [\n Image.configure({\n allowBase64: true,\n HTMLAttributes: {\n class: 'product-image',\n draggable: true\n }\n })\n]</code></pre><blockquote>这些功能使得Tiptap在电商商品描述等场景中表现出色。</blockquote>`,
  },
  {
    id: 4,
    title: "自定义与扩展Tiptap",
    content: `自定义与扩展TiptapTiptap的扩展性是其核心优势之一。你可以通过自定义扩展来满足特定的业务需求。<ul><li>自定义节点和标记</li><li>添加自定义工具栏按钮</li><li>集成AI辅助编辑等高级功能</li></ul>以下是一个自定义粗体扩展的示例：<pre><code class="language-js">import Bold from '@tiptap/extension-bold'\n\nconst CustomBold = Bold.extend({\n renderHTML({ HTMLAttributes }) {\n return ['b', HTMLAttributes, 0]\n },\n})</code></pre><blockquote>通过扩展，开发者可以构建出完全符合项目需求的编辑器。</blockquote>`,
  },
];

export default Articles;
