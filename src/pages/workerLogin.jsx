import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useMyContext } from "../context";
import { themes } from "../assets/exports.js";
import classNames from "classnames";
import { ChevronRight, ChevronLeft } from "lucide-react";
import api from "../helper/apiService";
import { useForm, FormProvider } from "react-hook-form";
import About from "../components/about.jsx";
import SelectLanguage from "../components/selectLang.jsx";
import ProfessionalInfo from "../components/proInfo.jsx";
import PersonalInfo from "../components/personalInfo.jsx";

import Credentials from "../components/credentials.jsx";
import { toast } from "sonner";

const stepFields = [
  // Step 0: Personal Info
  ["email", "password", "cPassword"],
  ["workerName", "workerPhn", "pincode", "workerCity"],

  // Step 1: Professional Info
  ["service", "experience", "workType", "workerWage"],

  // Step 2: Languages
  ["languages"],

  // Step 3: About
  ["workerBio"],
];
const WorkerLogin = () => {
  const { themeKey, setServices, services } = useMyContext();
  const T = themes[themeKey];

  const methods = useForm({ shouldUnregister: false, mode: "onChange" });

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    trigger,
  } = methods;

  const [steps, setSteps] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [stepValid, setStepValid] = useState(false);

  const contents = useMemo(
    () => [
      <Credentials T={T} />,
      <PersonalInfo T={T} />,
      <ProfessionalInfo T={T} services={services} />,
      <SelectLanguage T={T} />,
      <About T={T} />,
    ],
    [T, services]
  );

  const getServices = async () => {
    try {
      const response = await api.get("/services/get");
      const svcs = response.data.services;
      setServices(response.data.services);
    } catch (err) {
      // console.log(err);
      toast.error(
        err.response?.data?.message ||
          "Could not fetch services. Please try again later."
      );
    }
  };
  useEffect(() => {
    getServices();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/workers/register", data);
      // console.log(res);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    setIsLastStep(steps === contents.length - 1);
  }, [steps]);

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      exit={{ x: "-100vw" }}
      className="m-4  border max-w-4xl mx-auto  rounded-2xl overflow-hidden shadow-lg bg-white"
    >
      <div
        className={classNames(
          "text-center text-white space-y-2 p-4 bg-gradient-to-tr",
          T.primaryGradient
        )}
      >
        <h2 className="font-bold text-xl">Worker Profile Registration</h2>
        <p>
          Step {steps + 1} of {contents.length}
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={steps}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {contents[steps]}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between px-8 py-6 border-t">
            <button
              type="button"
              onClick={() => setSteps((prev) => Math.max(prev - 1, 0))}
              className={classNames(
                "p-3 bg-slate-600  text-slate-100 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50  disabled:cursor-not-allowed active:scale-95"
              )}
            >
              <ChevronLeft />
              Previous
            </button>

            {!isLastStep && (
              <button
                type="button"
                disabled={stepFields[steps].some((field) => errors[field])}
                onClick={async () => {
                  const isValid = await trigger(stepFields[steps]);
                  if (isValid)
                    setSteps((prev) => Math.min(prev + 1, contents.length - 1));
                }}
                className={classNames(
                  "p-3 text-white rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-semibold active:scale-95",
                  "bg-gradient-to-r disabled:opacity-50  disabled:cursor-not-allowed",
                  T.primaryGradient,
                  T.primaryHoverGradient
                )}
              >
                Next <ChevronRight />
              </button>
            )}
            {isLastStep && (
              <button
                type="submit"
                className={classNames(
                  "p-3 text-white rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-semibold active:scale-95",
                  "bg-gradient-to-r disabled:opacity-50  disabled:cursor-not-allowed",
                  T.primaryGradient,
                  T.primaryHoverGradient
                )}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </motion.div>
  );
};

export default WorkerLogin;
