import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Github, Wrench } from "lucide-react";
import classNames from "classnames";
import { useMyContext } from "../context.jsx";
import { themes } from "../assets/exports.js";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/errorMessage.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../helper/apiService";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { themeKey, setUser, user } = useMyContext();

  const T = themes[themeKey];

  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
    handleSubmit,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      let response;
      if (data.roleWorker) {
        response = await api.post("/auth/workerLogin", data);
      } else {
        response = await api.post("/auth/login", data);
      }
      setUser(response.data.user);
      // console.log(response.data.user);
      toast.success(response.data.message);

      setTimeout(
        () => toast.success(`Welcome back, ${response.data.user.name}!`),
        2000
      );
      if (data.roleWorker) {
        navigate("/profile");
        return;
      }
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Please try again later.");
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      toast.success(`Already logged in as ${user.name}`);
      navigate("/profile");
    }
  }, []);
  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      exit={{ x: "-100vw" }}
      className={classNames(
        "min-h-screen bg-gradient-to-br flex items-center justify-center p-4 relative overflow-hidden",
        T.heroBg
      )}
    >
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div
          className={classNames(
            "bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95",
            isSubmitted && !isSubmitSuccessful && "border-2 border-red-500"
          )}
        >
          {/* Header */}
          <div
            className={classNames(
              "bg-gradient-to-r p-8 text-center",
              T.primaryGradient
            )}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Wrench className={classNames("w-8 h-8 ", T.primaryColor)} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Handynest</h1>
            <p className="text-white">Welcome back, continue your journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block"
              >
                Email Address
              </label>

              <div className="w-full relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  disabled={isSubmitting}
                  placeholder="Enter your email address"
                  className={classNames(
                    "w-full  pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:border-transparent",
                    T.focusOutline,
                    errors.email && "border-red-600 focus:outline-red-500"
                  )}
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                />
              </div>

              <ErrorMessage message={errors?.email?.message} />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  disabled={isSubmitting}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className={classNames(
                    "w-full  pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:border-transparent",
                    T.focusOutline,
                    errors.password && "border-red-600 focus:outline-red-500"
                  )}
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    validate: {
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain at least one lowercase letter",
                      hasNumber: (value) =>
                        /\d/.test(value) ||
                        "Password must contain at least one number",
                      hasSpecialChar: (value) =>
                        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                        "Password must contain at least one special character",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <ErrorMessage message={errors?.password?.message} />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  {...register("roleWorker")}
                />
                <span className="text-gray-600">Login as worker</span>
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert("Forgot password clicked!");
                }}
                className={classNames(T.primaryColor, "font-medium")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              className={classNames(
                "w-full bg-gradient-to-r text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none",
                T.primaryGradient
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className={classNames(T.primaryColor, "font-semibold")}
              >
                Sign up for free
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
