import {
  Star,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Award,
  Shield,
  Calendar,
  Search,
  SlidersHorizontal,
  Languages,
  Users,
  Settings,
  IndianRupee,
} from "lucide-react";
import { useEffect } from "react";
import { themes } from "../assets/exports.js";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMyContext } from "../context";
import classNames from "classnames";
import EmptyStateCards from "../components/emptyCards";
import PincodeCard from "../components/pinCodeCard";
import profileImg from "../assets/blankProfileImg.svg";

export const WorkerCard = ({ worker, T }) => {
  if (!worker) return;
  return (
    <div
      key={worker._id}
      className={classNames(
        "rounded-xl shadow-sm border p-6 transition-all bg-white group",
        T.softBorder200
      )}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {profileImg && (
            <img
              src={profileImg}
              alt={worker.name}
              className="w-14 h-14 rounded-full object-cover border"
            />
          )}
          <div>
            <div className="flex items-center flex-wrap gap-3 mb-1">
              <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                {worker.name}
              </h3>
              {worker.verified && (
                <div
                  className={`flex items-center text-sm ${T.primaryColor} bg-white px-2 py-1 rounded-full border ${T.softBorder100}`}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  <span className="font-medium">Verified</span>
                </div>
              )}
              {worker.idProofVerified && (
                <div className="flex items-center text-xs text-green-600 border border-green-200 bg-green-50 px-2 py-0.5 rounded-full">
                  <Shield className="w-3 h-3 mr-1" />
                  ID Proof
                </div>
              )}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Settings className="w-4 h-4 mr-2" />
              <span className="text-gray-500">{worker.svcDesc}</span>
            </div>
          </div>
        </div>

        <div>
          <span
            className={`text-center inline-block px-3 py-1 ${T.lightAccent} text-sm rounded-full font-medium`}
          >
            {worker.service.name}
          </span>
        </div>
      </div>

      {/* Bio */}
      {worker.bio && (
        <p className="text-sm text-gray-600 mb-4 leading-snug">{worker.bio}</p>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Star
              className="w-4 h-4 mr-1 text-yellow-400"
              fill="currentColor"
            />
            <span className="font-semibold text-gray-900">
              {worker.rating || 0}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {worker.reviewCount || 0} reviews
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Award className="w-4 h-4 mr-1 text-gray-600" />
            <span className="font-semibold text-gray-900">
              {worker.experience}
            </span>
          </div>
          <div className="text-xs text-gray-500">experience</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <MapPin className="w-4 h-4 mr-1 text-gray-600" />
            <span className="font-semibold text-gray-900">{worker.city}</span>
          </div>
          <div className="text-xs text-gray-500">location</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <IndianRupee className="w-4 h-4 mr-1 text-gray-600" />
            <span className="font-semibold text-gray-900">
              {worker.workerWage}
            </span>
          </div>
          <div className="text-xs text-gray-500">daily wage</div>
        </div>
      </div>

      {/* Specializations */}
      {worker.specializations?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Specializations
          </h4>
          <div className="flex flex-wrap gap-2">
            {worker.specializations.map((spec, index) => (
              <span
                key={index}
                className={`px-3 py-1 ${T.lightAccent} text-xs rounded-full font-medium`}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages & Work Type */}
      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        {worker.languages?.length > 0 && (
          <div className="flex items-center text-gray-600">
            <Languages className="w-4 h-4 mr-2" />
            {worker.languages.join(", ")}
          </div>
        )}
        {worker.workType && (
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {worker.workType}
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div
            className={classNames(
              "flex items-center text-sm",
              worker.status === "active" ? "text-gray-600" : "text-red-600"
            )}
          >
            <Phone className="w-4 h-4 mr-2" />
            <a
              href={`tel:${worker.status === "active" ? worker.phone : "#"}`}
              className={`${T.hoverColor} transition-colors`}
            >
              {worker.status === "active" ? worker.phone : "**********"}
            </a>
          </div>
          <div
            className={classNames(
              "flex items-center text-sm",
              worker.status === "active" ? "text-gray-600" : "text-red-600"
            )}
          >
            <Mail className="w-4 h-4 mr-2" />
            <a
              href={`mailto:${worker.status === "active" ? worker.email : "#"}`}
              className={`${T.hoverColor} transition-colors`}
            >
              {worker.status === "active" ? worker.email : "**********"}
            </a>
          </div>
        </div>
        <div
          className={classNames(
            "flex items-center mt-2 ",
            worker.status === "active" ? "text-green-600" : "text-red-600"
          )}
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">
            {worker.status === "active"
              ? "Available Now"
              : "Currently Unavailable"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex gap-3">
        <button
          className={classNames(
            "flex-1 px-6 py-3 border text-white rounded-lg font-medium bg-gradient-to-r flex items-center justify-center gap-2",
            T.primaryGradient,
            T.primaryHoverGradient
          )}
        >
          <Star size={18} className="text-yellow-400" fill="currentColor" />
          Give Ratings
        </button>
      </div> */}
    </div>
  );
};

const Worker = () => {
  const { id } = useParams();
  const { themeKey, availWorkers } = useMyContext();
  const T = themes[themeKey];

  const selectedWorkers = id
    ? availWorkers.filter((w) => w.service._id === id)
    : availWorkers;

  //   const sortedWorkers = useMemo(() => {
  //   // if (!selectedService || !workers[selectedService]) return [];

  //   const serviceWorkers = [...workers[selectedService]];

  //   return serviceWorkers.sort((a, b) => {
  //     switch (sortBy) {
  //       case "rating":
  //         return b.rating - a.rating;
  //       case "price-low":
  //         return a.hourlyRate - b.hourlyRate;
  //       case "price-high":
  //         return b.hourlyRate - a.hourlyRate;
  //       case "distance":
  //         return parseFloat(a.distance) - parseFloat(b.distance);
  //       default:
  //         return b.rating - a.rating;
  //     }
  //   });
  // }, [selectedService, sortBy]);

  useEffect(() => {
    document.title = "Workers | Handynest";
  }, []);

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      exit={{ x: "-100vw" }}
      className="h-100% max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {availWorkers.length === 0 ? (
        <PincodeCard page={"workers"} />
      ) : (
        <>
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={"Search professionals..."}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${T.focusRing} focus:border-transparent transition-all`}
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <select
                  className={`px-4 py-3 border border-gray-300 rounded-lg ${T.focusRing} focus:border-transparent`}
                  // value={sortBy}
                  // onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="distance">Nearest</option>
                </select>

                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {selectedWorkers ? (
            <div className="w-full  grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {selectedWorkers.map((worker) => (
                <WorkerCard key={worker._id} worker={worker} T={T} />
              ))}
            </div>
          ) : (
            <EmptyStateCards emptyCardFor={"location-change-no-workers"} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default Worker;
