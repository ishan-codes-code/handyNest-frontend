// components/ErrorMessage.jsx
import { motion, AnimatePresence } from "framer-motion";

const ErrorMessage = ({ message }) => {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.span
          key={message} // ensures AnimatePresence recognizes changes
          className="text-red-600 text-sm inline-block"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, -8, 8, -6, 6, -4, 4, 0], // shake keyframes
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.2 },
            x: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          {message}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
