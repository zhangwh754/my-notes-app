import { useNavigate, useParams } from "react-router";

import type { OutlineItem } from "../../data";

export function OutlinePreview({
  outline,
  id,
  title,
  className = "",
  style,
}: {
  outline: OutlineItem[];
  id: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const isActive = params.id === id;

  return (
    <div
      className={`
        relative
        border-l border-l-gray-200
        border-b border-b-gray-200
        space-y-1
        my-1
        py-3 px-4
        rounded-lg
        cursor-pointer
        transition-colors
        ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}
        ${className}
      `}
      style={style}
      onClick={() => navigate(`/detail/${id}`)}
    >
      {/* 左侧红色指示器 - 仅在激活时显示 */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-lg" />
      )}

      {/* 文章标题 */}
      <div className="text-base font-semibold text-base-content mb-2">
        {title}
      </div>

      {outline
        .filter((item) => item.text)
        .map((item) => {
          const isHeading = item.type === "heading";
          return (
            <div key={item.id} className="relative py-1.5 rounded-md">
              <div
                className={`
                  leading-snug
                  ${
                    isHeading
                      ? "text-sm font-medium text-base-content"
                      : "text-xs text-base-content/80"
                  }
                `}
              >
                {item.text}
              </div>
            </div>
          );
        })}
    </div>
  );
}
