import request from "../request";

// ==================== API方法 ====================

/**
 * 登录到笔记系统
 * @param params 登录参数
 * @returns Promise<void>
 */
export const onAuthLogin = async (params: {
  username: string;
  password: string;
}): Promise<void> => {
  return request(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(params),
  });
};

/**
 * 注册笔记系统账号
 * @param params 注册参数
 * @returns Promise<void>
 *
 * 注册参数：
 * - username: string - 用户名
 * - password: string - 密
 * - email: string - 电子邮件
 */
export const onAuthRegister = async (params: {
  username: string;
  password: string;
  email: string;
}): Promise<void> => {
  return request(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(params),
  });
};
