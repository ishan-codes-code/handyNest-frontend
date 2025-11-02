import React, { useState } from "react";
import {
  Search,
  Users,
  Briefcase,
  Plus,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  BellRing,
} from "lucide-react";
import { useMyContext } from "../context";
import { themes } from "../assets/exports.js";
import classNames from "classnames";
import { motion } from "framer-motion";
import { scrollToTop } from "../components/scrollToTop";

const EmptyStateCards = ({ emptyCardFor, additional, clearSearch }) => {
  const { themeKey, setPinDetails } = useMyContext();

  const [currentState, setCurrentState] = useState("no-services-location");

  // Theme configuration object

  const T = themes[themeKey];

  const emptyStates = {
    "no-services-location": {
      title: "No Services Available in Your Area",
      description:
        "We don't currently offer services in your location. We're expanding our coverage area regularly.",
      icon: Briefcase,
      suggestions: [
        "Check nearby cities or areas",
        "Contact us to request service coverage",
        "Sign up for notifications when we expand",
        "Try adjusting your location settings",
      ],
      actions: [
        {
          label: "Change Location",
          type: "secondary",
          icon: Search,
          func: () => {
            setPinDetails(null);
          },
        },
        { label: "Notify Me", type: "primary", icon: BellRing },
      ],
    },
    "no-workers-service-location": {
      title: "No Professionals Available",
      description:
        "Currently, there are no verified professionals for this service in your location. This may be temporary.",
      icon: Users,
      suggestions: [
        "Try expanding your search radius",
        "Check nearby locations",
        "Consider similar services",
        "Request to be notified when professionals become available",
      ],
      actions: [
        { label: "Expand Search Area", type: "secondary", icon: Search },
        { label: "Notify When Available", type: "primary", icon: Plus },
      ],
    },
    "search-no-results": {
      title: "No Services Found",
      description:
        "Your search didn't return any services. Try different search terms or check if services are available in your area.",
      icon: Search,
      suggestions: [
        "Use more general search terms",
        "Check your location settings",
        "Try searching by category",
        "Browse all available services",
      ],
      actions: [
        {
          label: "Clear Search",
          type: "secondary",
          icon: RefreshCw,
          func: clearSearch,
        },
        {
          label: "Browse Services",
          type: "primary",
          icon: Briefcase,
          func: clearSearch,
        },
      ],
    },
    "location-change-no-services": {
      title: "Services Not Available Here",
      description:
        "The selected location doesn't have the services you're looking for. Try a different location or browse what's available.",
      icon: MapPin,
      suggestions: [
        "Try a nearby city or area",
        "Check if you entered the correct location",
        "Browse services available in this area",
        "Contact us about expanding service coverage",
      ],
      actions: [
        { label: "Change Location", type: "secondary", icon: Search },
        { label: "Browse Available", type: "primary", icon: Briefcase },
      ],
    },
    "location-change-no-workers": {
      title: "No Professionals in This Area",
      description:
        "We don't have verified professionals for this service in the selected location yet.",
      icon: Users,
      suggestions: [
        "Try expanding to nearby areas",
        "Check metropolitan areas nearby",
        "Consider remote or online services",
        "Request professionals for this area",
      ],
      actions: [
        { label: "Expand Area", type: "secondary", icon: Search },
        { label: "Request Coverage", type: "primary", icon: Plus },
      ],
    },
    "filter-no-results": {
      title: "No Matches for Current Filters",
      description:
        "No professionals in your area match the current filters. Try adjusting your requirements.",
      icon: Filter,
      suggestions: [
        "Increase your budget range",
        "Expand location radius",
        "Remove some specialization requirements",
        "Try different availability options",
      ],
      actions: [
        { label: "Reset Filters", type: "secondary", icon: RefreshCw },
        { label: "Modify Search", type: "primary", icon: Filter },
      ],
    },
  };

  const currentEmptyState = emptyStates[emptyCardFor];
  const IconComponent = currentEmptyState.icon;

  return additional ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="max-w-6xl mx-auto mt-12"
    >
      <div
        className={classNames(
          "bg-white rounded-lg border p-4 text-left transition-all hover:shadow-md",
          T.borderColor
        )}
      >
        <div
          className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${T.lightBg} rounded-lg mb-3`}
        >
          <currentEmptyState.icon className={`w-5 h-5 ${T.primaryColor}`} />
        </div>
        <h4 className="font-medium text-gray-900 mb-1 text-sm">
          {currentEmptyState.title}
        </h4>
        <p className="text-gray-600 text-xs leading-relaxed">
          {currentEmptyState.description}
        </p>
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${T.lightBg} rounded-full mb-6`}
        >
          <IconComponent className={`w-10 h-10 ${T.primaryColor}`} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {currentEmptyState.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          {currentEmptyState.description}
        </p>

        {/* Suggestions */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Here's what you can try:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {currentEmptyState.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`flex items-center justify-center p-3 ${T.lightAccent} rounded-lg text-sm`}
              >
                <span className="text-center">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          {currentEmptyState.actions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  if (action.func) {
                    scrollToTop();
                    action.func();
                  } else return null;
                }}
                className={classNames(
                  "flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200",
                  action.type === "primary"
                    ? `bg-gradient-to-r ${T.primaryGradient} ${T.primaryHoverGradient} text-white shadow-sm hover:shadow-md`
                    : `border ${T.softBorder200} text-gray-700 hover:bg-gray-50 bg-white`
                )}
              >
                <ActionIcon className="w-4 h-4 mr-2" />
                {action.label}
              </button>
            );
          })}
        </div>

        {/* Contact Support Section */}
        <div className={`mt-12 pt-8 border-t ${T.softBorder100}`}>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Let us help expand our services
            to your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm">
            <a
              href="mailto:expansion@example.com"
              className={`flex items-center ${T.primaryColor} ${T.hoverColor} transition-colors`}
            >
              <Mail className="w-4 h-4 mr-2" />
              expansion@example.com
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a
              href="tel:+1-555-123-4567"
              className={`flex items-center ${T.primaryColor} ${T.hoverColor} transition-colors`}
            >
              <Phone className="w-4 h-4 mr-2" />
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyStateCards;
