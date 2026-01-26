import { Suspense } from "react";
import { Outlet, useSearchParams } from "react-router";
import { parseOutlineFromMarkdown } from "../data";
import { OutlinePreview } from "../components/Outline/Outline";
import Navigation from "./Navigation";
import { NotesSkeleton } from "../components/Skeleton/NotesSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getNotesByType } from "../services/methods";

const MiddleNav = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  // 根据分类ID获取笔记列表
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["notes", categoryId],
    queryFn: () => getNotesByType({ id: categoryId! }),
    enabled: !!categoryId, // 只有当categoryId存在时才执行查询
  });

  const { notes = [], pagination = {} } = data || {};
  const { totalPages } = pagination;

  // 将笔记数据转换为大纲预览格式
  const outlines = notes ? notes.map(parseOutlineFromMarkdown) : [];

  return (
    <aside className="w-56 p-4 flex flex-col border-r border-gray bg-light">
      {!categoryId ? (
        <div className="px-4 py-2 text-sm text-gray-400">请选择一个分类</div>
      ) : isPending ? (
        <div className="px-4 py-2 text-sm text-gray-400">加载中...</div>
      ) : isError ? (
        <div className="px-4 py-2 text-sm text-red-400">
          加载失败: {(error as Error).message}
        </div>
      ) : outlines && outlines.length === 0 ? (
        <div className="px-4 py-2 text-sm text-gray-400">暂无文章</div>
      ) : (
        outlines.map((item, index) => (
          <OutlinePreview
            key={item.id}
            id={item.id}
            outline={item.outlines}
            title={item.title}
            className={`animate__animated animate__fadeIn`}
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))
      )}
    </aside>
  );
};

export function NotesLayout() {
  console.log("NotesLayout");

  return (
    <div className="flex h-full overflow-hidden">
      {/* 左侧边栏 - 类型导航 */}
      <Navigation />

      {/* 中间栏 - 笔记列表 */}
      <MiddleNav />

      {/* 右侧主内容区 - 笔记详情 */}
      <main className="flex-1 bg-light overflow-auto scroll-bar">
        <Suspense fallback={<NotesSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
