import { themes } from "../assets/exports";
import { useMyContext } from "../context";
import classNames from "classnames";
import { motion } from "framer-motion";

const Footer = () => {
  const { themeKey } = useMyContext();
  const T = themes[themeKey];
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4
              className={classNames("text-2xl font-bold mb-4", T.footerBrand)}
            >
              Fixora
            </h4>
            <p className="text-gray-300 text-sm">
              Connecting you with trusted professionals for all your service
              needs.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Services</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Plumbing", "Electrical", "House Cleaning", "Repairs"].map(
                (item) => (
                  <li
                    key={item}
                    className={classNames(
                      "transition-colors cursor-pointer",
                      T.footerHover
                    )}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Company</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                "About Us",
                "Careers",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li
                  key={item}
                  className={classNames(
                    "transition-colors cursor-pointer",
                    T.footerHover
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Support</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Help Center", "Contact Us", "Safety", "Community"].map(
                (item) => (
                  <li
                    key={item}
                    className={classNames(
                      "transition-colors cursor-pointer",
                      T.footerHover
                    )}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Fixora. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
