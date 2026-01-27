import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { Outlet, useParams } from "react-router";
import { parseOutlineFromMarkdown } from "../data";
import { OutlinePreview } from "../components/Outline/Outline";
import Navigation from "./Navigation";
import { NotesSkeleton } from "../components/Skeleton/NotesSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getNotesByType, type Note } from "../services/methods";

const MiddleNav = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();

  // 分页状态
  const [page, setPage] = useState(1);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // 滚动容器引用
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousCategoryId = useRef<string | null>(null);

  // 根据分类ID获取笔记列表
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["notes", categoryId, page],
    queryFn: () => getNotesByType({ id: categoryId!, page, limit: 10 }),
    enabled: !!categoryId,
  });

  // 当分类ID变化时，重置状态
  useEffect(() => {
    if (categoryId !== previousCategoryId.current) {
      setPage(1);
      setAllNotes([]);
      setTotalPages(0);
      previousCategoryId.current = categoryId;
    }
  }, [categoryId]);

  // 更新笔记列表
  useEffect(() => {
    if (data) {
      const { notes, pagination } = data;
      setTotalPages(pagination.totalPages);

      if (page === 1) {
        setAllNotes(notes);
      } else {
        setAllNotes((prev) => [...prev, ...notes]);
      }
      setIsFetchingMore(false);
    }
  }, [data, page]);

  // 滚动触底加载更多
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || isFetchingMore || !categoryId || page >= totalPages) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    // 距离底部50px时触发加载
    if (scrollHeight - scrollTop - clientHeight < 50) {
      setIsFetchingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [isFetchingMore, categoryId, page, totalPages]);

  // 添加滚动监听
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // 将笔记数据转换为大纲预览格式
  const outlines = allNotes.map(parseOutlineFromMarkdown);

  return (
    <aside
      ref={scrollContainerRef}
      className="w-56 p-4 flex flex-col border-r border-gray bg-light overflow-y-auto scroll-bar"
    >
      {!categoryId ? (
        <div className="px-4 py-2 text-sm text-gray-400">请选择一个分类</div>
      ) : isPending && page === 1 ? (
        <div className="px-4 py-2 text-sm text-gray-400">加载中...</div>
      ) : isError ? (
        <div className="px-4 py-2 text-sm text-red-400">
          加载失败: {(error as Error).message}
        </div>
      ) : outlines.length === 0 ? (
        <div className="px-4 py-2 text-sm text-gray-400">暂无文章</div>
      ) : (
        <>
          {outlines.map((item, index) => (
            <OutlinePreview
              key={`${item.id}-${page}-${index}`}
              id={item.id}
              outline={item.outlines}
              title={item.title}
              className={`animate__animated animate__fadeIn`}
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
          {isFetchingMore && (
            <div className="px-4 py-2 text-sm text-gray-400">加载更多...</div>
          )}
          {page >= totalPages && totalPages > 0 && (
            <div className="px-4 py-2 text-sm text-gray-400 text-center">
              没有更多了
            </div>
          )}
        </>
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
