import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function HotToast() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1E1E1E", // deep neutral background
            color: "#F3F4F6", // light text
            borderRadius: "12px",
            border: "1px solid #2D2D2D", // subtle border
            boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
            fontFamily: "Poppins, sans-serif",
          },
          success: {
            iconTheme: {
              primary: "#7C3AED", // your HandyNest accent purple
              secondary: "#1E1E1E",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444", // red for error
              secondary: "#1E1E1E",
            },
          },
        }}
        containerStyle={{ pointerEvents: "none" }}
        components={{
          Toast: (props) => (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
            >
              {props.children}
            </motion.div>
          ),
        }}
      />
    </>
  );
}
