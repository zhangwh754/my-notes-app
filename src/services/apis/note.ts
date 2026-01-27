import request from "../request";
import { buildQuery } from "../utils";

/** 笔记数据结构 */
export interface Note {
  id: string;
  title: string;
  content: string; // Markdown 格式的字符串
  typeId?: string;
  typeName?: string;
  userId?: string;
  isFavorite?: boolean;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
  attachmentCount?: string;
}

/** 分页信息 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** 笔记列表响应 */
export interface NotesListResponse {
  notes: Note[];
  pagination: Pagination;
}

// ==================== API方法 ====================

/**
 * 根据分类ID获取笔记列表
 * @param params.id 分类ID
 * @param params.page 页码（默认1）
 * @param params.limit 每页数量（默认10）
 * @returns Promise<NotesListResponse>
 */
export const getNotesByType = async (params: {
  id: string;
  page?: number;
  limit?: number;
}): Promise<NotesListResponse> => {
  const query = buildQuery(params);
  return request(`/api/note-types/notes?${query}`);
};
