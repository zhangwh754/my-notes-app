import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { onAuthLogin } from "../../services/apis/auth";
import { setToken } from "../../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [isPersist, setIsPersist] = useState(() => {
    const persist = localStorage.getItem("persist");
    return persist === "true";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setLocalStorage();

    try {
      const response = await onAuthLogin(formData);
      setToken(response.token);
      navigate("/");
    } catch (err) {
      console.log(err);

      setError(
        err instanceof Error ? err.message : "登录失败，请检查用户名和密码"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const setPersist = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPersist(e.target.checked);
  };

  const setLocalStorage = () => {
    const loginPersist = JSON.stringify({
      persist: isPersist,
      ...formData,
    });
    localStorage.setItem("notes_login_persist", loginPersist);
  };

  useEffect(() => {
    try {
      const loginPersist = localStorage.getItem("notes_login_persist");
      if (loginPersist) {
        const { username, password, persist } = JSON.parse(loginPersist);
        setFormData({ username, password });
        setIsPersist(persist);
      }
    } catch (error) {
      console.log("读取本地存储的登录信息失败");
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full bg-linear-to-r from-primary/10 via-base-200 to-accent/10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl animate__animated animate__fadeInDown">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              欢迎回来
            </h1>
            <p className="text-base-content/60 mt-2">登录到您的笔记空间</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="alert alert-error">
                <AlertCircle className="h-6 w-6" />
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">用户名</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="请输入用户名"
                className="input input-bordered w-full focus:input-primary"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">密码</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full focus:input-primary"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  checked={isPersist}
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  onChange={(e) => setPersist(e)}
                />
                <span className="label-text">记住我</span>
              </label>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? "btn-disabled" : ""}`}
            >
              {isLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                "登录"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-base-content/60">还没有账号? </span>
            <Link
              to="/register"
              className="link link-primary link-hover font-medium"
            >
              立即注册
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
