import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { saveAccessToken } from "../utils/cookies";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login({ email, password });
      console.log("login response:", response.raw);
      const token = response.token;
      if (token) {
        saveAccessToken(token);
        navigate("/");
      } else {
        setError("Login failed: no token returned.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 items-stretch gap-8 min-h-[82vh]">
        <div className="h-full w-full rounded-2xl overflow-hidden relative">
          <img
            src="/Login.png"
            className="w-full h-full object-cover"
            alt="login"
          />
        </div>

        <div className="h-full bg-white rounded-2xl shadow-lg p-10 -translate-x-10 relative">
          <button
            className="absolute cursor-pointer left-5 top-5 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            <CgClose className="text-blue-600" />
          </button>

          <h3 className="text-center text-blue-600 font-semibold mb-4">
            Login
          </h3>
          <h2 className="text-3xl font-bold mt-20 mb-6">Welcome Back</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full border border-gray-200 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-200 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <FaRegEyeSlash /> : <BsEye />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-blue-600 text-sm font-semibold">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-full font-semibold disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Log In"}
              </button>
            </div>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </form>

          <div className="text-center text-gray-600 mt-6">
            <p className="mb-3">Sign in With</p>
            <div className="flex items-center justify-center gap-5">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE1Yc6wAyFwIooidPHOf7VnVbQbIxDlFWllw&s"
                className="h-6 w-6"
                alt=""
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSifcM3HiwNTXF8iC4Ed8AnszWGngiFXkXBOA&s"
                className="h-6 w-6"
                alt=""
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                className="h-6 w-6"
                alt=""
              />
            </div>

            <p className="text-sm mt-4">
              First time here?{" "}
              <a href="/register" className="text-blue-600 font-semibold">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
