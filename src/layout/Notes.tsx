import { useMemo } from "react";
import { Outlet } from "react-router";
import { parseOutlineFromTiptapJSON } from "../data";
import Articles from "../data/Article-Content";
import { OutlinePreview } from "../components/Outline/Outline";
import Navigation from "./Navigation";

const MiddleNav = () => {
  const outlines = useMemo(() => {
    return Articles.map((article) => parseOutlineFromTiptapJSON(article));
  }, []);

  return (
    <aside className="w-56 p-4 flex flex-col border-r border-gray bg-light">
      {outlines.map((item) => {
        return (
          <OutlinePreview
            key={item.id}
            id={item.id}
            outline={item.outlines}
            title={item.title}
          />
        );
      })}
    </aside>
  );
};

export function NotesLayout() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* 左侧边栏 - 类型导航 */}
      <Navigation />

      {/* 中间栏 - 笔记列表 */}
      <MiddleNav />

      {/* 右侧主内容区 - 笔记详情 */}
      <main className="flex-1 bg-light overflow-auto scroll-bar">
        <Outlet />
      </main>
    </div>
  );
}
