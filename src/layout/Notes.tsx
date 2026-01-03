import { Suspense, useMemo } from "react";
import { Outlet, useSearchParams } from "react-router";
import { parseOutlineFromTiptapJSON } from "../data";
import Articles from "../data/Article-Content";
import { OutlinePreview } from "../components/Outline/Outline";
import Navigation from "./Navigation";
import { NotesSkeleton } from "../components/Skeleton/NotesSkeleton";

const MiddleNav = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const outlines = useMemo(() => {
    // 根据 categoryId 过滤文章
    const filteredArticles = categoryId
      ? Articles.filter((article) => article.categoryId === categoryId)
      : Articles; // 如果没有 categoryId，显示所有文章

    return filteredArticles.map((article) =>
      parseOutlineFromTiptapJSON(article)
    );
  }, [categoryId]);

  return (
    <aside className="w-56 p-4 flex flex-col border-r border-gray bg-light">
      {outlines.length === 0 ? (
        <div className="px-4 py-2 text-sm text-gray-400">暂无文章</div>
      ) : (
        outlines.map((item) => (
          <OutlinePreview
            key={item.id}
            id={item.id}
            outline={item.outlines}
            title={item.title}
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
