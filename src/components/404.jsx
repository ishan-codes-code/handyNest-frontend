import { useState, useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Vector404Page() {
  const [float, setFloat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloat((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "anticipate" }}
      exit={{ x: "-100vw" }}
      className="min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden relative px-4"
    >
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 border-4 border-indigo-200 rounded-full opacity-30" />
        <div className="absolute bottom-20 right-10 w-80 h-80 border-4 border-purple-200 rounded-full opacity-30" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 border-4 border-pink-200 rounded-full opacity-30" />

        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-20 w-32 h-32 border-4 border-indigo-200 rotate-45 opacity-20" />
        <div className="absolute bottom-1/3 left-20 w-24 h-24 bg-purple-100 rotate-12 opacity-40" />
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-pink-100 rounded-full opacity-30" />
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        {/* Illustration Container */}
        <div className="mb-12 relative">
          {/* Main 404 Illustration */}
          <svg
            viewBox="0 0 800 300"
            className="w-full max-w-2xl mx-auto"
            style={{
              filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.1))",
            }}
          >
            {/* Number 4 */}
            <g>
              <path
                d="M 100 50 L 100 250 L 120 250 L 120 150 L 200 150 L 200 250 L 220 250 L 220 150 L 220 50 L 200 50 L 200 130 L 120 130 L 120 50 Z"
                fill="#6366f1"
                opacity="0.9"
              />
            </g>

            {/* Number 0 - with floating animation */}
            <g transform={`translate(0, ${Math.sin(float * 0.02) * 5})`}>
              <ellipse
                cx="400"
                cy="150"
                rx="80"
                ry="100"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="20"
                opacity="0.9"
              />
              <circle cx="400" cy="150" r="40" fill="#a78bfa" opacity="0.3" />
            </g>

            {/* Number 4 */}
            <g>
              <path
                d="M 580 50 L 580 250 L 600 250 L 600 150 L 680 150 L 680 250 L 700 250 L 700 150 L 700 50 L 680 50 L 680 130 L 600 130 L 600 50 Z"
                fill="#ec4899"
                opacity="0.9"
              />
            </g>

            {/* Decorative Elements */}
            <circle cx="300" cy="100" r="8" fill="#fbbf24" opacity="0.6" />
            <circle cx="500" cy="80" r="6" fill="#10b981" opacity="0.6" />
            <circle cx="250" cy="200" r="10" fill="#f97316" opacity="0.6" />
            <circle cx="550" cy="220" r="7" fill="#06b6d4" opacity="0.6" />

            {/* Dotted path */}
            <path
              d="M 230 150 Q 300 120 370 150"
              stroke="#6366f1"
              strokeWidth="3"
              strokeDasharray="5,5"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 430 150 Q 500 180 570 150"
              stroke="#ec4899"
              strokeWidth="3"
              strokeDasharray="5,5"
              fill="none"
              opacity="0.3"
            />
          </svg>

          {/* Abstract shapes around illustration */}
          <div
            className="absolute -top-10 left-1/4 w-20 h-20 border-l-4 border-t-4 border-indigo-300 opacity-40"
            style={{
              transform: `rotate(${float}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
          <div
            className="absolute -bottom-10 right-1/4 w-16 h-16 border-r-4 border-b-4 border-pink-300 opacity-40"
            style={{
              transform: `rotate(-${float}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
        </div>

        {/* Text Content */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NavLink
            to={"/"}
            className="group px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium text-base shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </NavLink>

          <button
            onClick={() => window.history.back()}
            className="group px-8 py-3 bg-white text-gray-700 rounded-lg font-medium text-base border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>
            Need help?{" "}
            <NavLink
              to="/contact"
              className="text-indigo-600 hover:text-indigo-700 underline"
            >
              Contact support
            </NavLink>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
