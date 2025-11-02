import { motion } from "framer-motion";
import classNames from "classnames";
import { useMyContext } from "../context.jsx";
import { themes } from "../assets/exports.js";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const word = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "anticipate" },
  },
};

export default function AnimateTxt({ heroHeading, properties }) {
  // --- Safe defaults ---
  const text =
    typeof heroHeading === "string" ? heroHeading : String(heroHeading ?? "");

  const type = properties?.type ?? "txt";
  const classesProp = properties?.classes;

  // Accept both array or string for highlights.words
  const rawWords = properties?.highlights?.words;
  const wordsList = Array.isArray(rawWords)
    ? rawWords
    : typeof rawWords === "string"
    ? rawWords.split(/\s+/).filter(Boolean)
    : [];
  const highlightWords = new Set(wordsList);
  const highlightStyle =
    typeof properties?.highlights?.style === "string"
      ? properties.highlights.style
      : null;

  const { themeKey } = useMyContext();
  const T = themes?.[themeKey]; // may be undefined; use optional chaining later

  // Map types to motion tags (include both "lightHeading" and your earlier "ligthHeading")
  const MotionMap = {
    heading: motion.h1,
    lightHeading: motion.h3,
    txt: motion.p,
  };
  const MotionTag = MotionMap[type] || motion.div; // safe fallback

  // Default classes per type (override with properties.classes if provided)
  const defaultClasses = {
    heading: "text-4xl md:text-5xl font-bold leading-tight",
    lightHeading: "text-2xl md:text-3xl font-semibold leading-snug",
    txt: "text-base leading-relaxed",
  };
  const conClasses = classesProp || defaultClasses[type] || "";

  const isHeading = type === "heading";

  return (
    <MotionTag
      className={conClasses}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text
        .trim()
        .split(/\s+/)
        .map((txt, i) => (
          <motion.span
            key={i}
            variants={word}
            whileHover={{ y: -5, scale: 1.02 }}
            className={classNames(
              "inline-block",
              isHeading ? "mr-2" : "mr-1",
              highlightWords.has(txt) &&
                highlightStyle === "gradient" &&
                "bg-gradient-to-r bg-clip-text text-transparent",
              highlightWords.has(txt) &&
                highlightStyle === "gradient" &&
                T?.primaryGradient, // safe optional chaining
              highlightWords.has(txt) &&
                highlightStyle === "bold" &&
                "font-bold"
            )}
          >
            {txt}
          </motion.span>
        ))}
    </MotionTag>
  );
}
