import { useState, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const VerifyOtp = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const handleChange = (index, event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    if (!value && !event.target.value) {
      const nextCode = [...code];
      nextCode[index] = "";
      setCode(nextCode);
      return;
    }

    const nextCode = [...code];
    nextCode[index] = value.slice(-1);
    setCode(nextCode);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const otp = code.join("");

    if (otp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }

    try {
      const email = localStorage.getItem("otp_email");
      await authAPI.verifyEmail({
        email,
        otp,
      });
      navigate("/verify-successfull"); 
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-6xl w-full grid grid-cols-2 items-stretch gap-8 min-h-[82vh]">
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-white shadow-xl">
          <img
            src="/verify.png"
            className="w-full h-full object-cover"
            alt="verification"
          />
        </div>

        <div className="h-full bg-white rounded-3xl -translate-x-20 shadow-lg p-10 relative">
          <button
            className="absolute left-5 cursor-pointer top-5 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            <CgClose className="text-blue-600" />
          </button>

          <div className="max-w-lg mx-auto text-center">
            <p className="text-blue-600 text-sm font-semibold mb-4">
              Verification Code
            </p>
            <h1 className="text-xl font-bold text-slate-900">
              We’ve Sent A 6-Digit Verification Code To Your Email.
            </h1>
            <p className="text-sm text-slate-500">
              Please enter the code below to continue securely.
            </p>
          </div>

          <form className="mt-10" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  className="h-16 w-14 rounded-xl border border-slate-300 text-center text-xl font-semibold text-slate-900 focus:border-blue-500 focus:outline-none"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>Expire in 1:00</p>
              <button
                type="button"
                className="text-blue-600 font-semibold mt-2 inline-block"
              >
                Resend
              </button>
            </div>

            <button
              type="submit"
              className="mt-8 cursor-pointer w-full bg-blue-600 text-white py-3 rounded-full text-base font-semibold"
            >
              Continue
            </button>

            <div className="mt-4 text-center">
              <a href="/login" className="text-sm text-blue-600 font-semibold">
                Back to login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
