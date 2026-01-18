import request from "../request";

// ==================== 类型定义 ====================

/** 登录响应数据 */
interface LoginResponse {
  token: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

/** 注册响应数据 */
interface RegisterResponse {
  token: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

// ==================== API方法 ====================

/**
 * 登录到笔记系统
 * @param params 登录参数
 * @returns Promise<LoginResponse>
 */
export const onAuthLogin = async (params: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  return request(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(params),
  });
};

/**
 * 注册笔记系统账号
 * @param params 注册参数
 * @returns Promise<RegisterResponse>
 *
 * 注册参数：
 * - username: string - 用户名
 * - password: string - 密码
 * - email: string - 电子邮件
 */
export const onAuthRegister = async (params: {
  username: string;
  password: string;
  email: string;
}): Promise<RegisterResponse> => {
  return request(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(params),
  });
};
