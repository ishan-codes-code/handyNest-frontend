import { useState } from "react";
import { Search, MapPin, Zap, CheckCircle, Star } from "lucide-react";
import { useMyContext } from "../context";
import { services, themes } from "../assets/exports";
import classNames from "classnames";
import PinSearchBar from "./handlePinCode";
import { motion } from "framer-motion";

export default function PincodeCard({ page }) {
  const { themeKey } = useMyContext();

  const T = themes[themeKey];

  const heroText = {
    services: {
      txt: "Enter your city pincode to view available services in your area",
    },
    workers: {
      txt: "Enter your city pincode to view available workers in your area",
    },
  }[page];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, ease: "anticipate" }}
      className="min-h-[90dvh] max-w-6xl mx-auto my-auto sm:p-4"
    >
      <div
        className={classNames(
          "sm:p-8 sm:max-w-md m-auto px-4 py-10 sm:border rounded-3xl sm:shadow-md space-y-8",
          T.softBorder200
        )}
      >
        {/* Header */}
        <div className="sm:text-center ">
          <h2 className="text-2xl font-bold text-gray-800">{heroText.txt}</h2>
          {/* <p className="text-gray-600">
            Connect with skilled professionals in your area
          </p> */}
        </div>

        {/* Search Section */}

        <PinSearchBar T={T} classes={"sm:flex-col gap-6"} />

        {/* Popular Searches */}
      </div>
    </motion.div>
  );
}
