const TOKEN_KEY = "notes_auth_token";

/**
 * 获取存储的token
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * 设置token
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * 移除token
 */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * 检查用户是否已登录
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return token !== null && token !== "";
};

/**
 * 登出
 */
export const logout = (): void => {
  removeToken();
  // 可以在这里添加其他登出逻辑，比如清除用户信息等
};
