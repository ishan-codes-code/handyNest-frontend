import React, { useState, useMemo, useEffect } from "react";
import { Search, Clock, SquarePen } from "lucide-react";
import { useMyContext } from "../context";
import { themes } from "../assets/exports.js";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, scale } from "framer-motion";
import PincodeCard from "../components/pinCodeCard";
import classNames from "classnames";
import EmptyStateCards from "../components/emptyCards";
import Footer from "../components/footer";

const ServiceCard = ({ service, count, index, T }) => {
  return (
    <NavLink to={`/services/${service._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: index * 0.1,
        }}
        className={`bg-white rounded-xl shadow-sm border ${T.softBorder200} ${T.mutedHoverBg} hover:shadow-md transition-all cursor-pointer p-6 group`}
        // onClick={() => setSelectedService(service.id)}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {service.name}
            </h3>
            <span
              className={`inline-block px-3 py-1 ${T.lightAccent} text-sm rounded-full font-medium`}
            >
              {service.category}
            </span>
          </div>
          <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            {count} available
          </span>
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {service.avgDuration}
                            </div>
                            <div className="font-semibold text-gray-900">
                              {service.priceRange}
                            </div>
                          </div> */}
      </motion.div>
    </NavLink>
  );
};

const ServiceDirectory = () => {
  const { themeKey, pinDetails, setPinDetails, availSvc, availWorkers } =
    useMyContext();

  const [searchTerm, setSearchTerm] = useState("");

  const T = themes[themeKey];

  const filteredServices = useMemo(() => {
    if (!availSvc) return;
    return availSvc.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, availSvc]);

  useEffect(() => {
    document.title = "Services | Handynest";
  }, []);

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      exit={{ x: "-100vw" }}
      className={classNames("h-100%  bg-gradient-to-br", T.servicesBg)}
    >
      <AnimatePresence mode="wait">
        {pinDetails ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "anticipate" }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            <div className="mb-8 flex justify-between items-center gap-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 sm:mb-8">
                Showing services for{" "}
                <span
                  className={classNames(
                    "bg-gradient-to-r bg-clip-text text-transparent",
                    T.primaryGradient
                  )}
                >
                  {pinDetails?.Name}
                </span>{" "}
                <sub>
                  <button
                    className="text-sm font-light text-gray-500 inline-flex  items-center gap-1"
                    type="button"
                    onClick={() => setPinDetails(null)}
                  >
                    <SquarePen size={14} />
                    Change
                  </button>
                </sub>
              </h2>
              {/* Search */}

              <div className=" flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={"Search services..."}
                    className={classNames(
                      "w-full  pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none transition-all",
                      T.focusRing
                    )}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {availSvc.length > 0 ? (
              <AnimatePresence mode="wait">
                {filteredServices.length === 0 ? (
                  <EmptyStateCards
                    emptyCardFor={"search-no-results"}
                    clearSearch={() => setSearchTerm("")}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => {
                      const workersCount = availWorkers.filter(
                        (w) => w.service._id === service._id
                      ).length;

                      return (
                        <ServiceCard
                          key={service._id}
                          service={service}
                          count={workersCount}
                          index={index}
                          T={T}
                        />
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            ) : (
              <EmptyStateCards emptyCardFor={"no-services-location"} />
            )}
          </motion.div>
        ) : (
          <PincodeCard page={"services"} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServiceDirectory;
