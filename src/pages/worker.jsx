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
} from "lucide-react";
import { useEffect } from "react";
import { themes } from "../assets/exports";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMyContext } from "../context";
import classNames from "classnames";
import EmptyStateCards from "../components/emptyCards";
import PincodeCard from "../components/pinCodeCard";

const WorkerCard = ({ worker, T }) => {
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
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-3 mb-2">
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
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-1">
            <User className="w-4 h-4 mr-2" />
            <span className="font-medium">{worker.contactPerson}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500">{worker.title}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            ${worker.hourlyRate}
            <span className="text-lg font-normal text-gray-500">/hr</span>
          </div>
          <div className="text-sm text-gray-500">
            Response: {worker.responseTime}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Star
              className="w-4 h-4 mr-1 text-yellow-400"
              fill="currentColor"
            />
            <span className="font-semibold text-gray-900">{worker.rating}</span>
          </div>
          <div className="text-xs text-gray-500">
            {worker.reviewCount} reviews
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
            <span className="font-semibold text-gray-900">
              {worker.distance}
            </span>
          </div>
          <div className="text-xs text-gray-500">away</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Shield className="w-4 h-4 mr-1 text-gray-600" />
            <span className="font-semibold text-gray-900">
              {worker.completedJobs}+
            </span>
          </div>
          <div className="text-xs text-gray-500">jobs completed</div>
        </div>
      </div>

      {/* Specializations */}
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

      {/* Certifications */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Certifications & Insurance
        </h4>
        <div className="flex flex-wrap gap-2">
          {worker.certifications.map((cert, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border"
            >
              {cert}
            </span>
          ))}
          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200">
            {worker.insurance}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <a
              href={`tel:${worker.phone}`}
              className={`${T.hoverColor} transition-colors`}
            >
              {worker.phone}
            </a>
          </div>
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            <a
              href={`mailto:${worker.email}`}
              className={`${T.hoverColor} transition-colors`}
            >
              {worker.email}
            </a>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-green-600" />
            <span className="text-green-600 font-medium text-sm">
              {worker.availability}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
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
      </div>
    </div>
  );
};

const Worker = () => {
  const { id } = useParams();
  const { themeKey, availWorkers } = useMyContext();
  const T = themes[themeKey];

  const selectedWorkers = id
    ? availWorkers.filter((w) =>
        w.services.some((service) => service._id === id)
      )
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
    document.title = "Workers | Fixora";
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
