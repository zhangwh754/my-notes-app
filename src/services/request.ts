const BASE_URL = "http://localhost:3001";

// ==================== 类型定义 ====================

/** 支持的HTTP方法 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/** API响应包装 */
interface ApiResponseWrapper<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

/** 带类型约束的请求选项 */
export interface RequestOptions extends Omit<RequestInit, "method"> {
  method?: HttpMethod;
  unwrapResponse?: boolean; // 是否自动解包响应，默认true
}

// ==================== 通用请求方法 ====================

/**
 * 封装的HTTP请求方法
 * @param endpoint API端点
 * @param options 请求选项
 * @returns Promise<T>
 */
async function request<T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const unwrapResponse = options?.unwrapResponse !== false; // 默认true

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const result = await response.json();

    // 自动解包 {success: true, data: ...} 格式
    if (unwrapResponse && typeof result === "object" && result !== null) {
      if ("success" in result && "data" in result) {
        const wrapped = result as ApiResponseWrapper<unknown>;
        if (!wrapped.success) {
          throw new Error(wrapped.message || "请求失败");
        }
        return wrapped.data as T;
      }
    }

    return result as T;
  } catch (error) {
    // 网络错误或JSON解析错误
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("请求失败");
  }
}

export default request;
