import classNames from "classnames";
import { User, Building, Users, Clock, IndianRupee } from "lucide-react";
import ComboboxSelect from "../components/combobox.jsx";
import ErrorMessage from "../components/errorMessage.jsx";
import { useFormContext, Controller } from "react-hook-form";

const ProfessionalInfo = ({ T, services }) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-center text-lg">Professional Details</h3>

      {/* select... */}
      <div className="flex-1 flex flex-col items-start gap-1">
        <label htmlFor="comboInput" className="text-sm font-semibold">
          Select Service
        </label>

        <Controller
          name="service"
          control={control}
          defaultValue={""}
          rules={{ required: "Please select a service" }}
          render={({ field, fieldState }) => (
            <>
              <ComboboxSelect
                T={T}
                selected={field.value}
                setSelected={field.onChange}
                opts={services.map((svc) => svc.name)}
              />
              <ErrorMessage message={fieldState.error?.message} />
            </>
          )}
        />
      </div>

      {/* experience */}
      <div className="flex-1 flex flex-col items-start gap-1">
        <label htmlFor="expNum" className="text-sm font-semibold">
          Experience
        </label>

        <Controller
          name="experience"
          control={control}
          defaultValue={{ num: "", period: "" }}
          rules={{
            validate: (value) => {
              if (!value.num) return "Experience cannot be empty";
              if (!value.period) return "Please select experience period";
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <div>
              <div className="flex gap-2 items-center">
                {/* Number input */}
                <div className="w-full relative">
                  <Clock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter value"
                    className={classNames(
                      "w-full pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all",
                      T.focusOutline
                    )}
                    value={field.value.num}
                    onChange={(e) =>
                      field.onChange({ ...field.value, num: e.target.value })
                    }
                  />
                </div>

                {/* Period select */}
                <ComboboxSelect
                  T={T}
                  selected={field.value.period}
                  setSelected={(val) =>
                    field.onChange({ ...field.value, period: val })
                  }
                  opts={["Months", "Years"]}
                />
              </div>
              {/* Error message */}

              <ErrorMessage message={fieldState.error?.message} />
            </div>
          )}
        />
      </div>

      {/* work type */}
      <div className="flex-1 flex flex-col items-start gap-1">
        <label htmlFor="" className="text-sm font-semibold">
          Work Type
        </label>
        <Controller
          name="workType"
          control={control}
          rules={{ required: "Please select a work type" }}
          render={({ field, fieldState }) => (
            <>
              <div className="grid grid-cols-3 gap-4 w-full">
                {[
                  ["Individual", User],
                  ["Team", Users],
                ].map(([label, Icon]) => {
                  const active = field.value === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => field.onChange(label)}
                      className={classNames(
                        "flex flex-col gap-4 items-center border-2 rounded-lg p-6 cursor-pointer transition-all ease-in duration-200 backdrop-blur-lg active:scale-95",
                        active && T.lightPrimaryBg,
                        active && T.borderColor,
                        active && T.primaryColor,
                        active && "shadow-xl"
                      )}
                    >
                      <Icon size={30} />
                      <span className="text-sm">{label}</span>
                    </button>
                  );
                })}
              </div>

              <ErrorMessage message={fieldState.error?.message} />
            </>
          )}
        />
      </div>

      {/* starting price */}
      <div className="flex-1 flex flex-col items-start gap-1">
        <label htmlFor="workerName" className="text-sm font-semibold">
          Daily wage (₹)
        </label>
        <div className="w-full relative">
          <IndianRupee
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            min="0"
            type="number"
            id="workerWage"
            name="workerWage"
            {...register("workerWage", {
              required: {
                value: true,
                message: "Starting price cannot be empty",
              },
            })}
            className={classNames(
              "w-full  pl-10 pr-4 py-3 border-2 rounded-xl outline-none transition-all",
              T.focusOutline,
              errors.workerWage && "border-red-600 focus:outline-red-500"
            )}
            placeholder="Eg: 500 , 200 ,350 ..."
          />
        </div>

        <ErrorMessage message={errors?.workerWage?.message} />
      </div>
    </div>
  );
};

export default ProfessionalInfo;
