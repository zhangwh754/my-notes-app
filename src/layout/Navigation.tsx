import { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  icon?: string;
  children?: MenuItem[];
}

// 模拟数据用于展示UI
const mockData: MenuItem[] = [
  {
    id: "1",
    name: "技术笔记",
    children: [
      { id: "1-1", name: "前端开发" },
      { id: "1-2", name: "后端开发" },
    ],
  },
  {
    id: "2",
    name: "生活记录",
    children: [
      { id: "2-1", name: "旅行" },
      { id: "2-2", name: "美食" },
      { id: "2-3", name: "运动" },
    ],
  },
  {
    id: "3",
    name: "工作资料",
    children: [{ id: "3-1", name: "会议记录" }],
  },
];

function TreeNode({ node, level = 0 }: { node: MenuItem; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      {/* 节点内容 */}
      <div
        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-[#E5E7EB]"
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {/* 展开/收起图标 */}
        {hasChildren ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-400 transition-transform"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <span className="w-4 h-4" />
        )}

        {/* 图标占位 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>

        {/* 名称 */}
        <span className="text-sm text-gray-700">{node.name}</span>
      </div>

      {/* 子节点 */}
      {hasChildren && isExpanded && (
        <div className="border-l border-[#E5E7EB] ml-6">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  return (
    <aside className="w-56 bg-white border-r border-[#E5E7EB] h-full">
      {/* 标题区域 */}
      <div className="px-4 py-3 border-b border-[#E5E7EB]">
        <h2 className="text-sm font-semibold text-gray-700">笔记分类</h2>
      </div>

      {/* 菜单列表 */}
      <div className="py-2">
        {mockData.map((item) => (
          <TreeNode key={item.id} node={item} />
        ))}
      </div>
    </aside>
  );
}

export default Navigation;
