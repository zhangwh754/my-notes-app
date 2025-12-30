export function NotesSkeleton() {
  return (
    <>
      {/* 标题骨架 */}
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>

      {/* 编辑器内容骨架 */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-4/5"></div>
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
      </div>
    </>
  );
}
