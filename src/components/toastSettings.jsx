import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

function HotToast() {
  const [position, setPosition] = useState("top-right");

  // Update position based on screen size
  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 640)
        setPosition("top-center"); // mobile breakpoint (sm)
      else setPosition("top-right");
    };
    updatePosition(); // run once on mount
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Toaster
      position={position}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1E1E1E",
          color: "#F3F4F6",
          borderRadius: "12px",
          border: "1px solid #2D2D2D",
          boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
          fontFamily: "Poppins, sans-serif",
        },
        success: {
          iconTheme: {
            primary: "#7C3AED",
            secondary: "#1E1E1E",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
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
  );
}

export default HotToast;
