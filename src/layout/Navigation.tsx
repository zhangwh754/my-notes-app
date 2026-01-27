import { useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { Icon } from "../components/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { arrayToTree } from "../utils";
import { getTypeTree } from "../services/methods";

interface MenuItem {
  id: string;
  name: string;
  icon?: string;
  children?: MenuItem[];
}

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
        onClick={() => onSelect(node.id)}
      >
        {/* 展开/收起图标 - 只有点击图标才切换展开状态 */}
        {hasChildren ? (
          <Icon
            name={isExpanded ? "icon-unfold" : "icon-collapse"}
            className={`w-4 h-4 transition-transform cursor-pointer ${
              isSelected ? "text-rose-600" : "text-gray-400"
            }`}
            onClick={(e) => {
              e.stopPropagation(); // 阻止事件冒泡到父元素
              setIsExpanded(!isExpanded);
            }}
          />
        ) : (
          <span className="w-4 h-4" />
        )}

        {/* TODO 图标 */}
        {/* {node.icon && (
          <Icon
            name={`icon-${node.icon}`}
            className={
              isSelected
                ? "text-rose-600"
                : "text-gray-500 group-hover:text-rose-600"
            }
          />
        )} */}

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
        <div className="border-l border-[#E5E7EB] ml-6 animate__animated animate__fadeIn animate__faster">
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
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams<{ categoryId?: string }>();
  const selectedId = categoryId;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["treeMenu"],
    queryFn: () => getTypeTree({ userId: "1" }),
  });

  // 将后端扁平数据转换为树形结构
  const treeData = useMemo(() => {
    if (!data) return [];
    return arrayToTree(data, { parentId: "parentId" }) as MenuItem[];
  }, [data]);

  const handleSelect = (id: string) => {
    // 跳转到分类路由
    navigate(`/category/${id}`, { replace: true });
  };

  return (
    <aside className="w-56 bg-white border-r border-[#E5E7EB] h-full">
      {/* 标题区域 */}
      <div className="px-4 py-3 border-b border-[#E5E7EB]">
        <h2 className="text-sm font-semibold text-gray-700">笔记分类</h2>
      </div>

      {/* 菜单列表 */}
      <div className="py-2">
        {isPending ? (
          <div className="px-4 py-2 text-sm text-gray-400">加载中...</div>
        ) : isError ? (
          <div className="px-4 py-2 text-sm text-red-400">
            加载失败: {(error as Error).message}
          </div>
        ) : treeData.length === 0 ? (
          <div className="px-4 py-2 text-sm text-gray-400">暂无分类</div>
        ) : (
          treeData.map((item) => (
            <TreeNode
              key={item.id}
              node={item}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>
    </aside>
  );
}

export default Navigation;
