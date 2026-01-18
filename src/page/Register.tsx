import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { onAuthRegister } from "../services/apis/auth";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onAuthRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "注册失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-linear-to-r from-accent/10 via-base-200 to-primary/10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl animate__animated animate__fadeInUp">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
              创建账号
            </h1>
            <p className="text-base-content/60 mt-2">开启您的笔记之旅</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
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
                <span className="label-text">邮箱地址</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="input input-bordered w-full focus:input-primary"
                value={formData.email}
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
                placeholder="至少8位字符"
                className="input input-bordered w-full focus:input-primary"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  密码至少需要8位字符
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">确认密码</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="再次输入密码"
                className="input input-bordered w-full focus:input-primary"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-accent w-full ${isLoading ? "btn-disabled" : ""}`}
            >
              {isLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                "注册"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-base-content/60">已有账号? </span>
            <Link
              to="/login"
              className="link link-accent link-hover font-medium"
            >
              立即登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
