import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../helper/apiService";
import { motion } from "framer-motion";

const VerifyMail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) {
    toast.error("Invalid verification link.", {
      description: "Please try registering again.",
    });
    navigate("/register");
    return null;
  }

  const verifyMail = async () => {
    try {
      const response = await api.get(`/auth/user/verifyMail?token=${token}`);
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      // console.log(err);
      toast.error(err.response?.data?.message || "Verification failed.");
      navigate("/register");
    }
  };

  useEffect(() => {
    if (!token) return;
    verifyMail();
  }, []);
  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      exit={{ x: "-100vw" }}
      className="h-screen w-screen fixed top-0 left-0 z-[70] flex items-center justify-center backdrop-blur-md bg-black/10"
    >
      <div className="bg-white/80 backdrop-blur-lg h-48 w-48 flex flex-col items-center justify-center border border-gray-200 rounded-2xl shadow-lg">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-gray-500"></div>
        <p className="mt-3 text-sm text-gray-600 font-medium tracking-wide">
          Verifying your email...
        </p>
      </div>
    </motion.div>
  );
};

export default VerifyMail;
