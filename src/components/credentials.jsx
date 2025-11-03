import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, use } from "react";

import classNames from "classnames";
import { Eye, Mail, Lock } from "lucide-react";
import api from "../helper/apiService.jsx";

import ErrorMessage from "./errorMessage.jsx";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";

function Cooldown({ time, onCooldownComplete, isActive = false }) {
  const [timeLeft, setTimeLeft] = useState(time);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(time);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setTimeout(() => onCooldownComplete?.(), 0); //chnaged it
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current); // Stop timer if not active
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (timeLeft === 0) return null;

  return <span className="text-sm">{formatTime(timeLeft)}</span>;
}

const Credentials = ({ T }) => {
  const [mailOtpSent, setMailOtpSent] = useState(false);

  const [mailLoader, setMailLoader] = useState(false);
  const [inputMailOtp, setInputMailOtp] = useState("");
  const [coolActive, setCoolActive] = useState(false);
  const [editMail, setEditMail] = useState(null);

  const emailRef = useRef(null);

  const {
    watch,
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();

  const email = watch("email");
  const isMailVerified = watch("isMailVerified");

  const sendEmailOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return;

    setMailLoader(true);
    try {
      const res = await api.get(`/auth/verifyMail?mail=${email}`);
      setMailOtpSent(true);
      toast.success("Otp sent successfully to " + email);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Could not send otp. Please try again later."
      );
    } finally {
      setMailLoader(false);
      setCoolActive(true);
    }
  };

  const verifyMailOtp = async () => {
    setMailLoader(true);
    try {
      emailRef.current = email;
      const res = await api.post("/auth/verifyMailOtp", {
        userMail: email,
        inputOtp: inputMailOtp,
      });
      setValue("isMailVerified", true);
      setEditMail(false);
      trigger("email");
      toast.success("Email verified successfully!");
    } catch (err) {
      console.log(err);
      emailRef.current = null;
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setMailLoader(false);
    }
  };

  useEffect(() => {
    if (emailRef.current) {
      if (email !== emailRef.current) {
        console.log("email changed, unverify");
        setValue("isMailVerified", false);
        trigger("email");
      } else if (email === emailRef.current) {
        console.log("email matches, verified");
        setValue("isMailVerified", true);
        setEditMail(false);
        trigger("email");
      }
    }
  }, [email]);

  return (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-center text-lg">Credentials</h3>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex-1 flex flex-col items-start gap-1">
          <div className="flex items-center justify-between w-full">
            <label htmlFor="workerEmail" className="text-sm font-semibold">
              Email Address
            </label>
            {isMailVerified && (
              <button
                type="button"
                onClick={() => {
                  setEditMail(true);
                }}
                className={classNames(
                  T.primaryColor,
                  "ml-auto text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                )}
              >
                <i>Edit email</i>
              </button>
            )}
          </div>
          <div className="w-full relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              id="workerEmail"
              placeholder="Enter your email address"
              disabled={editMail === null ? isMailVerified : !editMail}
              className={classNames(
                "w-full  pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed",
                T.focusOutline,
                errors.email && "border-red-600 focus:outline-red-500"
              )}
              {...register("email", {
                required: { value: true, message: "Email is required" },
                validate: (value) => {
                  const isVerified = getValues("isMailVerified");
                  return isVerified || "Please verify your email";
                },
              })}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AnimatePresence>
                {isMailVerified && (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "anticipate" }}
                  >
                    ✔️
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <ErrorMessage message={errors?.email?.message} />

            {!isMailVerified && mailOtpSent && (
              <div className="ml-auto flex items-center gap-1">
                <Cooldown
                  time={30}
                  onCooldownComplete={() => {
                    setCoolActive(false);
                  }}
                  isActive={coolActive}
                />
                <button
                  type="button"
                  onClick={sendEmailOtp}
                  disabled={coolActive || mailLoader}
                  className={classNames(
                    T.primaryColor,
                    "text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <i>resend otp</i>
                </button>
              </div>
            )}
          </div>
        </div>
        {!isMailVerified && (
          <div className="flex-1 flex flex-col items-start gap-1 ">
            <label htmlFor="emailOtp" className="text-sm font-semibold">
              Verify Email Otp
            </label>
            <div className="w-full flex items-center gap-2">
              <div className="flex-1 relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="emailOtp"
                  type="number"
                  min="1000"
                  max="9999"
                  value={inputMailOtp}
                  disabled={mailLoader || !email}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 4) {
                      setInputMailOtp(value);
                    }
                  }}
                  className={classNames(
                    "w-full  pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed",
                    T.focusOutline
                  )}
                  placeholder="Enter otp sent to your email"
                />
              </div>
              {mailOtpSent ? (
                <button
                  type="button"
                  disabled={inputMailOtp.length < 4 || mailLoader}
                  onClick={verifyMailOtp}
                  className={classNames(
                    "p-2 rounded-lg text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                    T.primaryBg
                  )}
                >
                  Verify
                </button>
              ) : (
                <button
                  type="button"
                  onClick={sendEmailOtp}
                  disabled={mailLoader || !email}
                  className={classNames(
                    "p-2 rounded-lg text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                    T.primaryBg
                  )}
                >
                  {mailLoader && (
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-100 rounded-full animate-spin"></div>
                  )}
                  Send otp
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex-1 flex flex-col items-start gap-1">
          <label htmlFor="password" className="text-sm font-semibold">
            Set Password
          </label>
          <div className="w-full relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
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
              className={classNames(
                "w-full pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed",
                T.focusOutline,
                errors.password && "border-red-600 focus:outline-red-500"
              )}
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <ErrorMessage message={errors?.password?.message} />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start gap-1">
          <label htmlFor="cPassword" className="text-sm font-semibold">
            Confirm Password
          </label>
          <div className="w-full relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              id="cPassword"
              placeholder="Enter your password"
              {...register("cPassword", {
                required: { value: true, message: "Password is required" },
                validate: (value) => {
                  const password = getValues("password");
                  return value === password || "Passwords do not match";
                },
              })}
              className={classNames(
                "w-full pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed",
                T.focusOutline,
                errors.cPassword && "border-red-600 focus:outline-red-500"
              )}
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <ErrorMessage message={errors?.cPassword?.message} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
