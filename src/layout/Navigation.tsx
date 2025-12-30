import { useState } from "react";
import { Icon } from "../components/Icon/Icon";

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
      { id: "1-1", name: "前端开发", icon: "web" },
      { id: "1-2", name: "后端开发", icon: "server" },
    ],
  },
  {
    id: "2",
    name: "生活记录",
    children: [
      { id: "2-1", name: "旅行", icon: "trip" },
      { id: "2-2", name: "美食", icon: "food" },
      { id: "2-3", name: "运动", icon: "sport" },
    ],
  },
];

function TreeNode({
  node,
  level = 0,
  selectedId,
  onSelect,
}: {
  node: MenuItem;
  level?: number;
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  return (
    <div className="select-none">
      {/* 节点内容 */}
      <div
        className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-all border-l-2 ${
          isSelected
            ? "bg-rose-50 border-rose-600"
            : "hover:bg-gray-50 border-transparent hover:border-[#E5E7EB]"
        }`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => {
          onSelect(node.id);
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        {/* 展开/收起图标 */}
        {hasChildren ? (
          <Icon
            name={isExpanded ? "icon-unfold" : "icon-collapse"}
            className={`w-4 h-4 transition-transform ${isSelected ? "text-rose-600" : "text-gray-400"}`}
          />
        ) : (
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   className={`w-4 h-4 transition-transform ${
          //     isSelected ? "text-rose-600" : "text-gray-400"
          //   }`}
          //   style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
          //   viewBox="0 0 20 20"
          //   fill="currentColor"
          // >
          //   <path
          //     fillRule="evenodd"
          //     d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          //     clipRule="evenodd"
          //   />
          // </svg>
          <span className="w-4 h-4" />
        )}

        {/* 图标 */}
        {node.icon && (
          <Icon
            name={`icon-${node.icon}`}
            className={
              isSelected
                ? "text-rose-600"
                : "text-gray-500 group-hover:text-rose-600"
            }
          />
        )}

        {/* 名称 */}
        <span
          className={`text-sm ${
            isSelected ? "text-rose-600 font-medium" : "text-gray-700"
          }`}
        >
          {node.name}
        </span>
      </div>

      {/* 子节点 */}
      {hasChildren && isExpanded && (
        <div className="border-l border-[#E5E7EB] ml-6">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <aside className="w-56 bg-white border-r border-[#E5E7EB] h-full">
      {/* 标题区域 */}
      <div className="px-4 py-3 border-b border-[#E5E7EB]">
        <h2 className="text-sm font-semibold text-gray-700">笔记分类</h2>
      </div>

      {/* 菜单列表 */}
      <div className="py-2">
        {mockData.map((item) => (
          <TreeNode
            key={item.id}
            node={item}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        ))}
      </div>
    </aside>
  );
}

export default Navigation;
