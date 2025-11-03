import React, { useState } from "react";
import { LogOut, Feather } from "lucide-react";
import profileImg from "../assets/blankProfileImg.svg";
import { useMyContext } from "../context";
import { themes } from "../assets/exports";
import classNames from "classnames";
import { WorkerCard } from "./worker";
import { useNavigate } from "react-router-dom";
import api from "../helper/apiService";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, themeKey, setGlobalLoad, setUser } = useMyContext();
  const T = themes[themeKey];

  const logout = async () => {
    setGlobalLoad(true);
    try {
      const res = await api.post("/auth/logout");
      setUser(null);
      navigate("/");
      toast.success("Logged out successfully.");
    } catch (err) {
      // console.log(err);
      toast.error(
        err.response?.data?.message || "Logout failed. Please try again."
      );
    } finally {
      setGlobalLoad(false);
    }
  };

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      exit={{ x: "-100vw" }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
    >
      {/* Header with gradient */}
      <div
        className={classNames(
          "bg-gradient-to-r h-48 relative",
          T.primaryGradient
        )}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative px-6 sm:px-8 pt-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Image */}
              <div className="relative group">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>

              {/* Name and Title */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.name}
                </h1>

                <p className="sm:text-white mt-1">
                  {user?.workerDetails ? "Worker" : "User"} Profile
                </p>
              </div>

              {/* Edit/Save Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all shadow-md hover:shadow-lg  bg-red-600 hover:bg-red-700 outline-none active:scale-95 "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {user?.workerDetails ? (
            <div className="space-y-6 p-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <h3 className="px-4 text-lg bg-white text-gray-800">
                    Your profile card
                  </h3>
                </div>
              </div>
              <WorkerCard worker={user?.workerDetails} T={T} />
            </div>
          ) : (
            <div className="space-y-6 p-4">
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <h3 className="px-4 text-lg bg-white text-gray-800">
                    Account
                  </h3>
                </div>
              </div> */}
              <div className="border-2 flex items-center justify-center flex-col gap-4 border-dashed border-gray-300 rounded-lg p-8 m-4 ">
                <Feather className={classNames(T.primaryColor, "w-36 h-36")} />
                <i className="text-md">More feature coming soon...</i>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
