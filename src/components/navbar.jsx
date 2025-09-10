import { Home as HomeIcon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSelector from "./themeSelector.jsx";
import { useMyContext } from "../context.jsx";
import { themes } from "../assets/exports.jsx";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const { themeKey } = useMyContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const T = themes[themeKey];

  useEffect(() => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30">
      <header>
        <motion.div
          animate={{
            backgroundColor: isMobileMenuOpen ? "#ffffff" : undefined, // undefined means "don’t animate"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={classNames(
            "max-w-6xl mx-auto flex justify-between items-center p-4 relative z-10"
          )}
        >
          <motion.h1
            className={classNames("text-2xl font-bold", T.primaryColor)}
            whileHover={{ scale: 1.05 }}
          >
            Fixora
          </motion.h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-2 text-gray-700 font-medium">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["Workers", "/workers"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  classNames(
                    "relative px-3 py-1.5 transition-color",
                    isActive ? "text-white" : "text-black",
                    !isActive && T.hoverColor
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        className={classNames(
                          "absolute inset-0 rounded-xl -z-10",
                          T.primaryBg
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <ThemeSelector />
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className={classNames(
                "px-4 py-2 rounded-lg transition-colors",
                T.primaryColor,
                T.borderColor,
                T.mutedHoverBg,
                "border"
              )}
            >
              Login
            </button>
            <button
              className={classNames(
                "px-4 py-2 text-white rounded-lg transition-colors",
                T.primaryBg,
                T.primaryHover
              )}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute w-full border-t shadow-lg bg-white"
              initial={{ opacity: 1, y: -400 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: -400 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="flex flex-col p-4 space-y-3">
                {[
                  ["Home", "/"],
                  ["Services", "/services"],
                  ["Workers", "/workers"],
                  ["About", "#about"],
                  ["Contact", "#contact"],
                ].map(([label, to]) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={classNames("transition-colors", T.hoverColor)}
                  >
                    {label}
                  </NavLink>
                ))}
                <ThemeSelector />
                <div className="flex gap-3 pt-3 border-t">
                  <button
                    className={classNames(
                      "px-4 py-2 rounded-lg flex-1 border",
                      T.primaryColor,
                      T.borderColor
                    )}
                  >
                    Login
                  </button>
                  <button
                    className={classNames(
                      "px-4 py-2 rounded-lg flex-1 text-white",
                      T.primaryBg,
                      T.primaryHover
                    )}
                  >
                    Sign Up
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </nav>
  );
};

export default Navbar;

// import { useState } from "react";
// import { motion } from "framer-motion";

// const pages = [
//   { name: "Home", id: "home" },
//   { name: "About", id: "about" },
//   { name: "Services", id: "services" },
//   { name: "Contact", id: "contact" },
// ];

// export default function Navbar() {
//   const [active, setActive] = useState("home");

//   return (
//     <nav className="relative flex bg-gray-100 p-4 rounded-2xl shadow-md">
//       <ul className="flex gap-6 relative w-full justify-center">
//         {pages.map((page) => (
//           <li key={page.id} className="relative">
//             <button
//               onClick={() => setActive(page.id)}
//               className={`relative px-4 py-2 font-medium transition-colors z-10 ${
//                 active === page.id ? "text-white" : "text-gray-600"
//               }`}
//             >
//               {page.name}
//             </button>
//             {active === page.id && (
//               <motion.div
//                 layoutId="activeBackground"
//                 className="absolute inset-0 bg-purple-600 rounded-xl"
//                 transition={{ type: "spring", stiffness: 500, damping: 30 }}
//               />
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }
