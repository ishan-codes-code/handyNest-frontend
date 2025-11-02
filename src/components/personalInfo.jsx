import { useEffect, useState } from "react";
import classNames from "classnames";
import { User, Smartphone, MapPin, LocateFixed } from "lucide-react";
import ErrorMessage from "./errorMessage.jsx";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

const PersonalInfo = ({ T }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [showTick, setShowTick] = useState(false);
  const [locLoader, setLocLoader] = useState(false);

  const pincode = watch("pincode");

  const fetchCity = async () => {
    setLocLoader(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
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

      const name =
        cityPO.BranchType === "Head Post Office"
          ? cityPO.Name
          : cityPO.District;

      setValue("workerCity", name, { shouldValidate: true });
    } catch (error) {
      console.log("Error fetching city:", error);
    } finally {
      setLocLoader(false);
      setShowTick(true);
    }
  };

  useEffect(() => {
    if (pincode && pincode.length === 6) {
      fetchCity();
    }
  }, [pincode]);

  useEffect(() => {
    let timer;
    if (showTick) {
      timer = setTimeout(() => setShowTick(false), 4000);
    }

    return () => clearTimeout(timer);
  }, [showTick]);

  return (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-center text-lg">Personal info</h3>
      <div className="flex-1 flex flex-col items-start gap-1">
        <label htmlFor="workerName" className="text-sm font-semibold">
          Full name
        </label>
        <div className="w-full relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            id="workerName"
            name="workerName"
            type="text"
            placeholder="Enter your full name"
            {...register("name", {
              required: { value: true, message: "Name cannot be empty" },
            })}
            className={classNames(
              "w-full  pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all",
              T.focusOutline,
              errors.name && "border-red-600 focus:outline-red-500"
            )}
          />
        </div>

        <ErrorMessage message={errors?.name?.message} />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex-1 flex flex-col items-start gap-1">
          <label htmlFor="workerPhn" className="text-sm font-semibold">
            Phone Number
          </label>
          <div className="w-full relative">
            <Smartphone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              id="workerPhn"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="Enter your phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              className={classNames(
                "w-full pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all",
                T.focusOutline,
                errors.phone && "border-red-600 focus:outline-red-500"
              )}
            />
          </div>
          <ErrorMessage message={errors?.phone?.message} />
        </div>
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex-1 flex flex-col items-start gap-1">
          <label htmlFor="workerPin" className="text-sm font-semibold">
            Pincode
          </label>
          <div className="w-full relative">
            <LocateFixed
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              id="workerPin"
              type="text"
              placeholder="Enter your area's pincode"
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
              className={classNames(
                "w-full  pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all",
                T.focusOutline,
                errors.pincode && "border-red-600 focus:outline-red-500"
              )}
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                {locLoader ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-5 h-5 border-2 border-slate-400 border-t-slate-100 rounded-full animate-spin"
                  />
                ) : showTick ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "anticipate" }}
                  >
                    ✔️
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          <ErrorMessage message={errors?.pincode?.message} />
        </div>
        <div className="flex-1 flex flex-col items-start gap-1">
          <label htmlFor="workerCity" className="text-sm font-semibold">
            City
          </label>
          <div className="w-full relative">
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              id="workerCity"
              placeholder="Enter the city you live in"
              {...register("workerCity", {
                required: { value: true, message: "City cannot be empty" },
              })}
              className={classNames(
                "w-full  pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all",
                T.focusOutline,
                errors.workerCity && "border-red-600 focus:outline-red-500"
              )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                {locLoader ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-5 h-5 border-2 border-slate-400 border-t-slate-100 rounded-full animate-spin"
                  />
                ) : showTick ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "anticipate" }}
                  >
                    ✔️
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          <ErrorMessage message={errors?.workerCity?.message} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
