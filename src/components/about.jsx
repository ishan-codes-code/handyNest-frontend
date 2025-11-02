import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import classNames from "classnames";
import { MapPin, LocateFixed, Smartphone, Mail, Lock } from "lucide-react";
import api from "../helper/apiService.jsx";

import ErrorMessage from "./errorMessage.jsx";
import { useFormContext } from "react-hook-form";

const About = ({ T }) => {
  const {
    watch,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-center text-lg">About Yourself</h3>
      <div className="flex-1 flex flex-col items-start gap-1">
        <label htmlFor="workerBio" className="text-sm font-semibold">
          Bio
        </label>
        <textarea
          rows="6"
          id="workerBio"
          name="workerBio"
          placeholder="Describe your experiences and services..."
          {...register("workerBio", {
            required: { value: true, message: "Bio cannot be empty" },
          })}
          className={classNames(
            "w-full px-4 py-3 border-2 rounded-xl outline-none transition-all",
            T.focusOutline,
            errors.workerBio && "border-red-600 focus:outline-red-500"
          )}
        ></textarea>

        <ErrorMessage message={errors?.workerBio?.message} />
      </div>
    </div>
  );
};

export default About;
