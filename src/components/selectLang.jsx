import { useEffect, useState } from "react";

import { languages } from "../assets/exports.js";
import classNames from "classnames";
import { Search, X } from "lucide-react";

import ErrorMessage from "../components/errorMessage.jsx";
import { useFormContext, Controller } from "react-hook-form";

const SelectLanguage = ({ T }) => {
  const topLangs = [
    "Hindi",
    "English",
    "Bengali",
    "Marathi",
    "Telugu",
    "Tamil",
    "Gujarati",
    "Urdu",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punjabi",
    "Assamese",
    "Maithili",
    "Bhojpuri",
    "Rajasthani",
    "Chhattisgarhi",
    "Haryanvi",
    "Awadhi",
    "Magahi",
  ];

  const { control } = useFormContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLangs, setFilteredLangs] = useState(topLangs);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredLangs(topLangs);
    } else {
      const res = languages.filter((l) =>
        l.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredLangs(res);
    }
  }, [searchQuery]);

  // console.log(filteredLangs);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-center text-lg">Languages spoken</h3>
        <div className=" relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search languages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={classNames(
              "w-full  pl-10 pr-10 py-3 border-2 rounded-xl outline-none transition-all",
              T.focusOutline
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      <p className="text-center text-gray-600">
        Select the languages you speak from the list.
      </p>
      <Controller
        name="languages"
        control={control}
        defaultValue={[]}
        rules={{
          validate: (value) =>
            value.length > 0 || "Select at least one language",
        }}
        render={({ field, fieldState }) => (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {filteredLangs.length === 0 ? (
                <div className="col-span-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-slate-50 text-center">
                  <span className="text-red-600 text-sm sm:text-base">
                    🚫 No languages found
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={classNames(
                      "px-4 py-2 text-sm rounded-md border shadow-sm transition-all duration-150 ease-in-out hover:scale-105 active:scale-95",
                      T.lightAccent,
                      T.borderColor
                    )}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                [...new Set([...filteredLangs, ...field.value])].map((lang) => {
                  const active = field.value.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        field.onChange(
                          active
                            ? field.value.filter((l) => l !== lang)
                            : [...field.value, lang]
                        );
                      }}
                      className={classNames(
                        "border-2 p-2 text-center rounded-lg transition-all ease duration-100 backdrop-blur-lg active:scale-95",
                        active && T.lightPrimaryBg,
                        active && T.borderColor,
                        active && T.primaryColor,
                        active && "shadow-xl"
                      )}
                    >
                      {lang}
                    </button>
                  );
                })
              )}
            </div>

            <ErrorMessage message={fieldState.error?.message} />
          </>
        )}
      />
    </div>
  );
};

export default SelectLanguage;
