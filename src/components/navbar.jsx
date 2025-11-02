import { Home as HomeIcon, Menu, X, CircleUserRound } from "lucide-react";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSelector from "./themeSelector.jsx";
import { useMyContext } from "../context.jsx";
import { themes } from "../assets/exports.js";
import { NavLink, useLocation } from "react-router-dom";

const AuthBtn = ({ T }) => {
  return (
    <>
      <NavLink to="/login">
        <div
          className={classNames(
            "inline-block transition-all duration-200 ease-in relative overflow-hidden z-10  px-4 py-2 cursor-pointer text-sm rounded-lg bg-white border  hover:text-white group active:scale-90",
            T.borderColor,
            T.primaryColor
          )}
        >
          Login
          <span
            className={classNames(
              "absolute left-1/2 top-full w-[140%] h-[180%] bg-black bg-opacity-5 rounded-full block transition-all duration-500 delay-100 ease-[cubic-bezier(0.55,0,0.1,1)] -z-10 transform -translate-x-1/2 scale-y-100 scale-x-125 group-hover:top-[-35%] group-hover:scale-y-[1.3] group-hover:scale-x-[0.8]",
              `group-hover:${T.primaryBg}`
            )}
          ></span>
          <span
            className={classNames(
              "absolute left-[55%] top-[180%] w-[160%] h-[190%] rounded-full block transition-all duration-500 delay-100 ease-[cubic-bezier(0.55,0,0.1,1)] -z-10 transform -translate-x-1/2 scale-y-100 scale-x-[1.45] group-hover:top-[-45%] group-hover:scale-y-[1.3] group-hover:scale-x-[0.8]",
              T.primaryBg
            )}
          ></span>
        </div>
      </NavLink>
      <NavLink to="/worker/login">
        <div
          className={classNames(
            "inline-block transition-all duration-200 ease-in relative overflow-hidden z-10 text-white px-4 py-2 cursor-pointer text-sm rounded-lg  border hover:border-white hover:text-black group active:scale-90",
            T.borderColor,
            T.primaryBg
          )}
        >
          Go online
          <span
            className={classNames(
              "absolute left-1/2 top-full w-[140%] h-[180%] bg-black bg-opacity-5 rounded-full block transition-all duration-500 delay-100 ease-[cubic-bezier(0.55,0,0.1,1)] -z-10 transform -translate-x-1/2 scale-y-100 scale-x-125 group-hover:top-[-35%] group-hover:scale-y-[1.3] group-hover:scale-x-[0.8]",
              `group-hover:bg-white`
            )}
          ></span>
          <span
            className={classNames(
              "absolute left-[55%] top-[180%] w-[160%] h-[190%] rounded-full block transition-all duration-500 delay-100 ease-[cubic-bezier(0.55,0,0.1,1)] -z-10 transform -translate-x-1/2 scale-y-100 scale-x-[1.45] group-hover:top-[-45%] group-hover:scale-y-[1.3] group-hover:scale-x-[0.8] bg-white"
            )}
          ></span>
        </div>
      </NavLink>
    </>
  );
};

const Navbar = () => {
  const location = useLocation();
  const { themeKey, user } = useMyContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const T = themes[themeKey];

  useEffect(() => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [location]);

  // if (location.pathname === "/worker/login") return null;
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
            Handynest
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
          {!user && (
            <div className="hidden md:flex items-center gap-4 ">
              <AuthBtn T={T} />
            </div>
          )}

          <div className="flex items-center gap-2">
            {user && (
              <div
                className={classNames(
                  "p-1.5 rounded-md text-gray-600 active:scale-95 transition"
                )}
                title={user.name}
              >
                <NavLink to="/profile" className="flex items-center gap-2 ">
                  <CircleUserRound />
                  <span className="hidden sm:block md:hidden lg:block max-w-[120px] truncate">
                    {user.name}
                  </span>
                </NavLink>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                {!user && (
                  <div className="flex items-center justify-center gap-2">
                    <AuthBtn T={T} />
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </nav>
  );
};

export default Navbar;
