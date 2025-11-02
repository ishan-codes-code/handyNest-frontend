import { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import { useMyContext } from "../context";
import api from "../helper/apiService";

export default function PinSearchBar({ T, classes }) {
  const { setPinDetails, setAvailWorkers, setAvailSvc } = useMyContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${formData.pincode}`
      );
      const data = await response.json();

      if (!data || !data[0] || !data[0].PostOffice) {
        throw new Error("Invalid Pincode");
      }

      const postOffices = data[0].PostOffice;

      // Priority: Head → Sub → Name includes "city" → first available
      let cityPO =
        postOffices.find((po) => po.BranchType === "Head Post Office") ||
        postOffices.find((po) => po.BranchType === "Sub Post Office") ||
        postOffices.find((po) => po.Name.toLowerCase().includes("city")) ||
        postOffices[0];

      const res = await api.get(`workers/getSW?pin=${cityPO.Pincode}`);

      const services = [
        ...new Map(
          res.data.workers.map((worker) => [worker.service._id, worker.service])
        ).values(),
      ];

      setAvailSvc(services);
      setAvailWorkers(res.data.workers);
      setPinDetails(cityPO);

      if (location.pathname === "/") navigate(`/services`);
    } catch (error) {
      setError("pincode", {
        type: "manual",
        message: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={classNames(
          "flex  flex-col sm:flex-row  gap-3",
          classes && classes
        )}
      >
        {/* <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="What service do you need? (plumber, electrician...)"
          className={classNames(
            "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none transition-all",
            T.focusRing
          )}
        />
      </div> */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative ">
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              disabled={isSubmitting}
              type="numbers"
              placeholder="6 digits to find you"
              className={classNames(
                "w-full  pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed",
                T.focusRing
              )}
              title="Enter your pincode"
              {...register("pincode", {
                required: { value: true, message: "Pincode is required" },
                minLength: {
                  value: 6,
                  message: "Code must be exactly 6 characters",
                },
                maxLength: {
                  value: 6,
                  message: "Code must be exactly 6 characters",
                },
                pattern: {
                  value: /^[0-9]+$/, // only digits 0-9
                  message: "Only numbers are allowed",
                },
              })}
            />
            {loading && (
              <motion.div
                role="status"
                aria-label="loading"
                className={classNames(
                  "w-5 h-5 border-[3px] rounded-full border-t-transparent absolute right-3 bottom-1/4 -translate-y-1/2",
                  T.borderColor
                )}
                animate={{ rotate: [0, 360] }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              />
            )}
          </div>
          {errors?.pincode && (
            <p className="bg-gradient-to-r bg-clip-text text-transparent from-red-600 via-red-800 to-red-600 mt-2">
              {errors?.pincode?.message}
            </p>
          )}
        </div>
        <motion.button
          disabled={isSubmitting}
          className={classNames(
            "px-6 py-3 text-white rounded-xl transition-all flex items-center justify-center gap-2 font-semibold shadow-lg",
            "bg-gradient-to-r disabled:opacity-60 disabled:cursor-not-allowed",
            T.primaryGradient,
            T.primaryHoverGradient
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          <Search size={20} />
          Find Local Help
        </motion.button>
      </div>
    </form>
  );
}
