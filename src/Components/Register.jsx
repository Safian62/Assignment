import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FaRegEyeSlash } from "react-icons/fa";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { authAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

const PhoneInput =
  PhoneInputLib && PhoneInputLib.default
    ? PhoneInputLib.default
    : PhoneInputLib;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const payload = {
        email,
        fullName: name,
        password,
        phone,
      };

      const response = await authAPI.register(payload);
      localStorage.setItem("otp_email", email);

      const message = response.data?.message || "OTP sent to your email.";

      alert(message);
      navigate("/verify-otp");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-6xl w-full grid grid-cols-2 gap-8 items-center">
        <div className="h-full rounded-2xl overflow-hidden">
          <img
            src="/Register.png"
            className="w-full h-full object-cover"
            alt="register"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-20 -translate-x-15 relative">
          <button
            className="absolute cursor-pointer left-5 top-5 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            <CgClose className="text-blue-600" />
          </button>

          <h3 className="text-center text-blue-600 font-semibold mb-4">
            Create an account
          </h3>

          <h2 className="text-center text-2xl font-bold mb-6">
            Let's Get Your Account Set Up
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block font-medium text-sm mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium text-sm mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">
                Phone No <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country={"pk"}
                enableSearch={true}
                value={phone}
                onChange={(value) => setPhone(value)}
                containerClass="flex mt-2"
                buttonClass="rounded-l-md h-9 border border-gray-200 bg-white px-3 flex items-center"
                inputClass="flex-1 h-12 border border-gray-200 rounded-r-md px-4 outline-none"
                inputProps={{
                  name: "phone",

                  required: true,
                  placeholder: "Enter your contact number",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-medium text-sm mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-200 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 cursor-pointer top-3 text-gray-500"
                >
                  {showPassword ? <FaRegEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-full font-semibold disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Continue"}
              </button>
            </div>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </form>

          <div className="text-center text-gray-600 mt-6">
            <p className="mb-3">Sign in with</p>
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

            <p className="text-xs text-gray-500 max-w-[80%] mx-auto mt-4">
              By creating an account using email, Google or Apple, I agree to
              the{" "}
              <a href="#" className="text-blue-600">
                Terms & Conditions
              </a>{" "}
              and acknowledge the{" "}
              <a href="#" className="text-blue-600">
                Privacy Policy
              </a>
              .
            </p>

            <p className="text-sm mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 font-semibold">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
