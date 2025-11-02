import { useState } from "react";
import ThemeSkeleton from "./themeSkeleton.jsx";
import { themes } from "../assets/exports.js";
import { X } from "lucide-react";
import classNames from "classnames";
import { useMyContext } from "../context";
import { AnimatePresence, motion } from "framer-motion";

const ThemeSelector = () => {
  const { themeKey, setThemeKey } = useMyContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(themeKey);

  const handleChange = (event) => {
    setSelected(event.target.value);
    setThemeKey(event.target.value);
    setIsOpen(false);
    localStorage.setItem("theme", event.target.value);
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="md:relative  my-auto"
    >
      <button
        type="button"
        className="text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        Themes
      </button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
    fixed top-0 left-0 w-screen h-screen md:absolute md:top-auto md:left-[-750%] md:h-[80vh] md:w-[70vw] bg-white overflow-auto p-6 md:border md:mt-1 md:rounded-lg shadow-lg z-10"
          >
            <div className={classNames("w-full flex justify-between")}>
              <h2 className="text-2xl font-bold mb-4">Select a Theme</h2>
              <button type="button" onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>
            <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-2">
              {Object.entries(themes).map(([key, T]) => (
                <div key={key}>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="theme"
                      id={key}
                      className={classNames(T.accentClr)}
                      value={key}
                      checked={selected === key}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={key}
                      className={classNames(
                        "bg-gradient-to-r bg-clip-text text-transparent font-semibold",
                        T.primaryGradient
                      )}
                    >
                      {T.name}
                    </label>
                  </div>
                  <label htmlFor={key}>
                    <ThemeSkeleton T={T} key={key} />
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
