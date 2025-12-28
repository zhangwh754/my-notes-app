import request from "../request";
import { buildQuery } from "../utils";

/** 笔记类型数据结构 */
export interface NoteType {
  id: string;
  userId: string;
  name: string;
  description?: string;
  parentId?: string | null;
  sortOrder?: number;
  color?: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** 创建笔记类型参数 */
export interface CreateTypeParams {
  userId: string;
  name: string;
  description?: string;
  parentId?: string | null;
  sortOrder?: number;
  color?: string;
  icon?: string;
}

/** 更新笔记类型参数 */
export interface UpdateTypeParams {
  id: string;
  name?: string;
  description?: string;
  parentId?: string | null;
  sortOrder?: number;
  color?: string;
  icon?: string;
}

/** 笔记数量统计 */
export interface NoteCountResponse {
  count: number;
  childrenCount?: number;
  total?: number;
}

/** API响应基础类型 */
export interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ==================== API方法 ====================

/**
 * 获取所有笔记类型（平铺列表）
 * @param params.userId 用户ID
 * @returns Promise<NoteType[]>
 */
export const getAllTypes = async (params: {
  userId: string;
}): Promise<NoteType[]> => {
  const query = buildQuery(params);
  return request<NoteType[]>(`/api/note-types?${query}`);
};

/**
 * 获取树形结构的笔记类型
 * @param params.userId 用户ID
 * @returns Promise<NoteType[]>
 */
export const getTypeTree = async (params: {
  userId: string;
}): Promise<NoteType[]> => {
  const query = buildQuery(params);
  return request<NoteType[]>(`/api/note-types/tree?${query}`);
};

/**
 * 获取单个笔记类型
 * @param params.id 笔记类型ID
 * @returns Promise<NoteType>
 */
export const getTypeById = async (params: {
  id: string;
}): Promise<NoteType> => {
  return request<NoteType>(`/api/note-types/${params.id}`);
};

/**
 * 创建笔记类型
 * @param data 创建参数
 * @returns Promise<NoteType>
 */
export const createType = async (data: CreateTypeParams): Promise<NoteType> => {
  return request<NoteType>("/api/note-types", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * 更新笔记类型
 * @param params 更新参数
 * @returns Promise<NoteType>
 */
export const updateType = async (
  params: UpdateTypeParams
): Promise<NoteType> => {
  const { id, ...updateData } = params;

  return request<NoteType>(`/api/note-types/${id}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
};

/**
 * 删除笔记类型
 * @param params.id 笔记类型ID
 * @returns Promise<void>
 */
export const deleteType = async (params: { id: string }): Promise<void> => {
  return request<void>(`/api/note-types/${params.id}`, {
    method: "DELETE",
  });
};

/**
 * 获取笔记数量（包括子类型）
 * @param params.id 笔记类型ID
 * @returns Promise<NoteCountResponse>
 */
export const getTypeNoteCount = async (params: {
  id: string;
}): Promise<NoteCountResponse> => {
  return request<NoteCountResponse>(`/api/note-types/${params.id}/note-count`);
};
