import { Outlet } from "react-router";

const SideNav = () => {
  return <aside className="w-48 bg-dark"></aside>;
};

const MiddleNav = () => {
  return <aside className="w-56 border-r border-grey bg-light"></aside>;
};

export function NotesLayout() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* 左侧边栏 - 类型导航 */}
      <SideNav />

      {/* 中间栏 - 笔记列表 */}
      <MiddleNav />

      {/* 右侧主内容区 - 笔记详情 */}
      <main className="flex-1 flex flex-col bg-light overflow-y-auto ">
        <Outlet />
      </main>
    </div>
  );
}
