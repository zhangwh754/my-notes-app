/** 构建URL查询参数 */
export function buildQuery(
  params: Record<string, string | number | undefined>
): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  });
  return query.toString();
}
